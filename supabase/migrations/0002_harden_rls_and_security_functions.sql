-- Biel_Strategy — endurece RLS e funções SECURITY DEFINER (avisos do Supabase Security Advisor).
--
-- Aplicada no projeto Supabase do Biel Strategy em
-- setembro/2026, via MCP do Supabase. Este arquivo é a cópia versionada dessa migration.

-- 1) rls_auto_enable() é a função do event trigger `ensure_rls` (liga RLS em toda tabela nova do
--    schema public). Não é chamada pelo site e não deve ser exposta em /rest/v1/rpc. O event
--    trigger continua funcionando: o EXECUTE só é checado na criação do trigger, não a cada disparo.
--    O ACL padrão do Supabase dá EXECUTE a PUBLIC, anon, authenticated e service_role — anon e
--    authenticated herdam também de PUBLIC, então PUBLIC precisa ser revogado junto.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;

-- 2) A policy de INSERT dos leads deixa de aceitar qualquer linha (with check (true)). Agora só
--    aceita o que o formulário realmente envia (ver src/app/actions/submitLead.ts e
--    src/lib/leads/schema.ts): consentimento dado, status NEW, campos do ciclo comercial vazios e
--    contato com tamanho/formato válidos. Só `anon`: o site não usa login (chave anon no servidor).
drop policy "anon_can_insert_leads" on public.leads;

create policy "anon_can_insert_leads"
  on public.leads
  for insert
  to anon
  with check (
    consent is true
    and status = 'NEW'
    and qualified_at is null
    and converted_at is null
    and conversion_value is null
    and char_length(btrim(name)) between 2 and 200
    and char_length(email) <= 300
    and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
    and char_length(phone) between 8 and 30
    and char_length(consent_version) > 0
  );
