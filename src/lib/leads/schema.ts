import { z } from "zod";
import { CONSENT_VERSION } from "@/data/leadForm";

// Validação server-side (autoritativa) do envio do formulário de leads.
// Espelha os campos definidos em LEAD_SYSTEM_RESEARCH.md (seções 01-A/05).
// Campos de qualificação são opcionais no schema: não bloqueiam o envio
// (baixa fricção), mas contato + consentimento são sempre exigidos.

// Campos opcionais: string vazia é tratada como "não preenchido" no momento
// de montar o registro (submitLead.ts usa `|| null`), não aqui no schema —
// isso mantém o tipo inferido simples (`string | undefined`, chave opcional).
const optionalText = (max: number) => z.string().trim().max(max).optional();

const optionalUrl = z
  .string()
  .trim()
  .max(300)
  .optional()
  .refine((v) => !v || v === "" || /^https?:\/\//i.test(v) || !v.includes(" "), {
    message: "URL inválida",
  });

export const attributionSchema = z.object({
  utm_source: optionalText(200),
  utm_medium: optionalText(200),
  utm_campaign: optionalText(200),
  utm_content: optionalText(200),
  utm_term: optionalText(200),
  gclid: optionalText(300),
  gbraid: optionalText(300),
  wbraid: optionalText(300),
  fbclid: optionalText(300),
  landing_page: optionalText(500),
  referrer: optionalText(500),
  first_contact_at: z.string().datetime().optional(),
});

export type Attribution = z.infer<typeof attributionSchema>;

export const leadSubmissionSchema = z.object({
  // honeypot — deve chegar vazio; se vier preenchido, é bot (ver submitLead.ts)
  hp_company_site: z.string().max(500).optional().default(""),

  // etapa 01 — negócio
  company: optionalText(200),
  segment: optionalText(100),
  location: optionalText(200),
  instagram_url: optionalUrl,
  website_url: optionalUrl,

  // etapa 02 — desafio
  primary_need: optionalText(100),

  // etapa 03 — situação atual
  current_acquisition_channel: optionalText(100),
  marketing_maturity: optionalText(100),

  // etapa 04 — histórico
  previous_marketing_attempt: z.boolean().optional(),
  previous_marketing_problem: optionalText(1000),

  // etapa 05 — objetivo
  business_goal: optionalText(1000),

  // etapa 06 — momento
  purchase_timeline: optionalText(100),

  // etapa 07 — investimento
  marketing_budget_range: optionalText(100),

  // etapa 08 — contato
  name: z.string().trim().min(2, "Informe seu nome").max(200),
  email: z.string().trim().toLowerCase().email("E-mail inválido").max(300),
  phone: z
    .string()
    .trim()
    .min(8, "Telefone inválido")
    .max(30)
    .regex(/^[\d()+\-.\s]+$/, "Telefone inválido"),
  preferred_contact_channel: optionalText(50),

  // consentimento — obrigatório
  consent: z.literal(true, {
    message: "É necessário aceitar a política de privacidade para enviar",
  }),
  consent_version: z.string().default(CONSENT_VERSION),

  // atribuição (capturada no client, ver useLeadTracking)
  attribution: attributionSchema.optional().default({}),
});

export type LeadSubmissionInput = z.input<typeof leadSubmissionSchema>;
export type LeadSubmission = z.output<typeof leadSubmissionSchema>;
