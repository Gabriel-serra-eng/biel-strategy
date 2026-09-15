-- Biel_Strategy — tabela de leads (formulário nativo: captura + pré-diagnóstico + atribuição)
-- Ver LEAD_SYSTEM_RESEARCH.md (seções 01-A, 05, 06) e LEAD_FORM_IMPLEMENTATION.md para o racional.
--
-- Aplicada no projeto Supabase "Gabriel-serra-eng's Project" (xhntobdbpzsvfblmihnf) em
-- setembro/2026, via MCP do Supabase. Este arquivo é a cópia versionada dessa migration —
-- mantenha-o em sincronia com o banco caso alguém precise recriar o ambiente do zero.

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- contato
  name text not null,
  email text not null,
  phone text not null,

  -- etapa 01 — negócio
  company text,
  segment text,
  location text,
  instagram_url text,
  website_url text,

  -- etapa 02 — desafio
  primary_need text,

  -- etapa 03 — situação atual
  current_acquisition_channel text,
  marketing_maturity text,

  -- etapa 04 — histórico
  previous_marketing_attempt boolean,
  previous_marketing_problem text,

  -- etapa 05 — objetivo
  business_goal text,

  -- etapa 06 — momento
  purchase_timeline text,

  -- etapa 07 — investimento
  marketing_budget_range text,

  -- etapa 08 — contato (preferência)
  preferred_contact_channel text,

  -- ciclo comercial (nunca setado como QUALIFIED pelo formulário — só por ação humana)
  status text not null default 'NEW'
    check (status in ('NEW','CONTACTED','QUALIFIED','PROPOSAL','WON','LOST')),
  qualified_at timestamptz,
  converted_at timestamptz,
  conversion_value numeric,

  -- consentimento LGPD
  consent boolean not null,
  consent_version text not null,
  consent_timestamp timestamptz not null,

  -- lead score — estrutura pronta, cálculo neutro/desativado ([VALIDAR SCORE], ver score.ts)
  score_version text,
  lead_score integer,
  lead_temperature text,

  -- atribuição de marketing
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  gclid text,
  gbraid text,
  wbraid text,
  fbclid text,
  landing_page text,
  referrer text,
  first_contact_at timestamptz
);

comment on table public.leads is 'Leads capturados pelo formulário nativo do Biel_Strategy (contato + pré-diagnóstico + atribuição). Fonte de verdade para o ciclo NEW→CONTACTED→QUALIFIED→PROPOSAL→WON/LOST.';

create index leads_status_idx on public.leads (status);
create index leads_created_at_idx on public.leads (created_at desc);
create index leads_email_idx on public.leads (email);
create index leads_gclid_idx on public.leads (gclid) where gclid is not null;
create index leads_fbclid_idx on public.leads (fbclid) where fbclid is not null;

alter table public.leads enable row level security;

-- Apenas INSERT é permitido via chave pública (anon). Sem policy de SELECT/UPDATE/DELETE:
-- por padrão do Postgres/Supabase, RLS habilitado sem policy = acesso negado nessas operações,
-- mesmo que a anon key vaze. Leitura/atualização de status só via service_role (painel do
-- Supabase ou um backoffice futuro), nunca a partir do frontend.
create policy "anon_can_insert_leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);
