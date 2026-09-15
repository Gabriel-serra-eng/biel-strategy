import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase server-only. Nunca importar este módulo a partir de um
 * componente client ("use client") — o import de "server-only" faz o build
 * falhar caso isso aconteça, como cinto de segurança adicional.
 *
 * Usa a chave "anon", que só tem permissão de INSERT na tabela `leads`
 * (RLS — ver migration 0001_create_leads_table). Não é a service_role key:
 * mesmo rodando só no servidor, manter o escopo mínimo é defesa em
 * profundidade (ver LEAD_SYSTEM_RESEARCH.md, seção 11).
 */
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_ANON_KEY não configuradas. Copie .env.example para .env.local e preencha.",
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
