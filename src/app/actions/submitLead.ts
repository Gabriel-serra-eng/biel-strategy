"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { leadSubmissionSchema, type LeadSubmissionInput } from "@/lib/leads/schema";
import { calculateLeadScore } from "@/lib/leads/score";
import { checkRateLimit } from "@/lib/leads/rateLimit";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export type SubmitLeadResult =
  | { ok: true; leadId: string | null }
  | { ok: false; error: "validation"; fieldErrors: Record<string, string> }
  | { ok: false; error: "consent" }
  | { ok: false; error: "rate_limited" }
  | { ok: false; error: "server_error" };

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}

export async function submitLead(input: LeadSubmissionInput): Promise<SubmitLeadResult> {
  // 1) honeypot — bots preenchem campos ocultos; humanos não veem esse campo.
  //    Resposta "de sucesso" sem gravar nada, para não ensinar o bot a se adaptar.
  if (input.hp_company_site && input.hp_company_site.trim() !== "") {
    return { ok: true, leadId: null };
  }

  // 2) rate limit por IP — ver limitações documentadas em rateLimit.ts
  const ip = await getClientIp();
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return { ok: false, error: "rate_limited" };
  }

  // 3) validação server-side — autoritativa, independe da validação de UX no client
  const parsed = leadSubmissionSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".") || "form";
      if (!fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    if (fieldErrors.consent) {
      return { ok: false, error: "consent" };
    }
    return { ok: false, error: "validation", fieldErrors };
  }

  const data = parsed.data;
  const score = calculateLeadScore(data);
  const nowIso = new Date().toISOString();

  // id gerado aqui (não via RETURNING do insert): a chave anon não tem
  // policy de SELECT — de propósito, para que um vazamento da chave nunca
  // permita ler leads de volta — e o Postgres/PostgREST exige permissão de
  // SELECT para devolver linhas de um INSERT ... RETURNING. Gerar o id no
  // servidor evita essa dependência sem abrir uma policy de leitura.
  const leadId = randomUUID();

  const record = {
    id: leadId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company || null,
    segment: data.segment || null,
    location: data.location || null,
    instagram_url: data.instagram_url || null,
    website_url: data.website_url || null,
    primary_need: data.primary_need || null,
    current_acquisition_channel: data.current_acquisition_channel || null,
    marketing_maturity: data.marketing_maturity || null,
    // boolean: `false` é uma resposta válida, não pode virar null via `||`
    previous_marketing_attempt: data.previous_marketing_attempt ?? null,
    previous_marketing_problem: data.previous_marketing_problem || null,
    business_goal: data.business_goal || null,
    purchase_timeline: data.purchase_timeline || null,
    marketing_budget_range: data.marketing_budget_range || null,
    preferred_contact_channel: data.preferred_contact_channel || null,
    status: "NEW" as const,
    consent: true,
    consent_version: data.consent_version,
    consent_timestamp: nowIso,
    score_version: score.score_version,
    lead_score: score.lead_score,
    lead_temperature: score.lead_temperature,
    utm_source: data.attribution.utm_source || null,
    utm_medium: data.attribution.utm_medium || null,
    utm_campaign: data.attribution.utm_campaign || null,
    utm_content: data.attribution.utm_content || null,
    utm_term: data.attribution.utm_term || null,
    gclid: data.attribution.gclid || null,
    gbraid: data.attribution.gbraid || null,
    wbraid: data.attribution.wbraid || null,
    fbclid: data.attribution.fbclid || null,
    landing_page: data.attribution.landing_page || null,
    referrer: data.attribution.referrer || null,
    first_contact_at: data.attribution.first_contact_at || nowIso,
  };

  try {
    const supabase = getSupabaseServerClient();
    // Sem .select() de propósito — ver comentário acima sobre leadId/RLS.
    const { error } = await supabase.from("leads").insert(record);

    if (error) {
      console.error("[submitLead] Supabase insert error:", error.message);
      return { ok: false, error: "server_error" };
    }

    return { ok: true, leadId };
  } catch (err) {
    console.error("[submitLead] unexpected error:", err);
    return { ok: false, error: "server_error" };
  }
}
