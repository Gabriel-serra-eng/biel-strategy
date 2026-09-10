# BIEL_STRATEGY — Formulário Nativo + Lead Intelligence (registro de implementação)

> **Este documento registra o que foi efetivamente implementado**, em complemento a
> [`LEAD_SYSTEM_RESEARCH.md`](./LEAD_SYSTEM_RESEARCH.md) (o "porquê"/pesquisa) e sem alterar
> `RESEARCH.md` nem `IMPLEMENTATION.md`. Implementado em setembro/2026.

---

## 1. O que foi implementado

Formulário nativo de pré-diagnóstico comercial, embutido na seção `#contato` (Fechamento) do
site, em 8 etapas, gravando direto no Supabase. Nenhuma ferramenta externa (Google Forms,
Typeform, iframe) — a UI é 100% componentes React do próprio projeto, usando os tokens de
design já existentes.

Fluxo real, funcionando ponta a ponta e testado:

```
Visitante → UI do formulário (Design existente) → Server Action (Next.js)
  → validação (Zod) + honeypot + rate limit → Supabase (tabela `leads`, RLS)
```

## 2. Arquivos criados

| Arquivo | Papel |
| :--- | :--- |
| `src/data/leadForm.ts` | Opções de cada pergunta (segmento, desafio, canal, etc.) e rótulos das 8 etapas |
| `src/lib/leads/schema.ts` | Schema Zod de validação server-side (autoritativa) |
| `src/lib/leads/score.ts` | Estrutura de `lead_score`/`lead_temperature` — cálculo **neutro/desativado**, `[VALIDAR SCORE]` |
| `src/lib/leads/rateLimit.ts` | Rate limiting em memória, por IP (limitação documentada no próprio arquivo) |
| `src/lib/supabase/server.ts` | Cliente Supabase server-only (`import "server-only"` barra uso acidental no client) |
| `src/app/actions/submitLead.ts` | Server Action: honeypot → rate limit → validação → insert no Supabase |
| `src/hooks/useLeadTracking.ts` | Captura UTM/gclid/gbraid/wbraid/fbclid/landing_page/referrer no client, first-touch, persistido em `localStorage` |
| `src/components/sections/lead-form/fields.tsx` | Primitivas de campo (texto, textarea, seleção em chips, sim/não, consentimento, honeypot) |
| `src/components/sections/lead-form/LeadForm.tsx` | Orquestrador: estado das 8 etapas, rascunho persistido, estados idle/submitting/success/error |
| `supabase/migrations/0001_create_leads_table.sql` | Migration aplicada (cópia do que rodou via MCP do Supabase) |
| `.env.example` | Documenta as variáveis necessárias, sem valores reais |

## 3. Arquivos modificados

| Arquivo | Mudança |
| :--- | :--- |
| `src/components/sections/Fechamento.tsx` | O botão estático "Vamos começar?" virou `<LeadForm />` — mesmo texto/aparência inicial, agora funcional |
| `src/app/globals.css` | Bloco `/* formulário de pré-diagnóstico (lead form) */` — classes novas (`.lf-*`), todas construídas com os tokens já existentes (cores, spacing, radius, motion). Nenhuma classe ou estilo pré-existente foi alterado |
| `.gitignore` | Exceção `!.env.example` (o padrão `.env*` já existia e continua protegendo `.env.local`) |
| `package.json` | +`@supabase/supabase-js`, +`zod`, +`server-only` (as três dependências estritamente necessárias; nenhuma outra foi adicionada) |

**Nada mais foi tocado** — Hero, Jornada, Marketing, Casos, Tecnologia, IA, Stack, Formação e
Visão permanecem exatamente como estavam.

## 4. Schema Supabase

Projeto reaproveitado (já existia, vazio): `Gabriel-serra-eng's Project`
(`xhntobdbpzsvfblmihnf`, região `us-east-1`).

Tabela `public.leads` — colunas conforme a seção 05 de `LEAD_SYSTEM_RESEARCH.md` (contato,
etapas 01-08 do pré-diagnóstico, ciclo `status`, consentimento, `lead_score`/`lead_temperature`,
atribuição de marketing completa). Ver a migration completa em
[`supabase/migrations/0001_create_leads_table.sql`](./supabase/migrations/0001_create_leads_table.sql).

**Índices:** `status`, `created_at desc`, `email`, `gclid` (parcial, `where not null`), `fbclid`
(parcial).

**RLS (Row Level Security):**
- Habilitado na tabela.
- **Única policy: `INSERT` para os papéis `anon`/`authenticated`, `with check (true)`.**
- **Nenhuma policy de `SELECT`/`UPDATE`/`DELETE`** — por padrão do Postgres, RLS habilitado sem
  policy para uma operação = acesso negado nessa operação. Ou seja: mesmo que a chave `anon`
  vaze, ninguém lê, atualiza ou apaga leads com ela. Leitura/gestão de status hoje só é possível
  via SQL Editor do painel do Supabase (usando a role `postgres`, que tem acesso total,
  independente de RLS) — não existe ainda um backoffice no frontend, e não deveria existir sem
  autenticação própria (fora do escopo deste pedido).
- Confirmado via `get_advisors` (type: security) — os dois avisos retornados (`rls_auto_enable`)
  são de uma função interna do Supabase, pré-existente ao projeto, não relacionada à tabela
  `leads` ou a este trabalho.

**Detalhe técnico não-óbvio, documentado para quem for mexer aqui depois:** o `id` do lead é
gerado no servidor (`crypto.randomUUID()`, em `submitLead.ts`) e enviado já dentro do `insert`,
em vez de usar `RETURNING` (ou `.select()` do supabase-js). Motivo: `INSERT ... RETURNING`
exige policy de `SELECT` para devolver a linha inserida — como decidimos deliberadamente não
ter nenhuma policy de leitura para a chave anônima, usar `.select()` após o insert quebra com
`"new row violates row-level security policy"`, mesmo o insert em si sendo permitido. Gerar o
id no servidor resolve isso sem abrir uma policy de leitura só para satisfazer o `RETURNING`.

## 5. Fluxo do formulário (UI)

- 8 etapas (`FORM_STEP_LABELS`), renderizadas dentro do mesmo `.lf-card`, com crossfade GSAP
  entre etapas (mesmo espírito do crossfade já usado em `Casos.tsx`) — desativado sob
  `prefers-reduced-motion`.
- Só a última etapa (Contato) bloqueia avanço/envio por validação — nome, WhatsApp, e-mail e
  consentimento. As 7 etapas de qualificação **não bloqueiam**: dá para chegar ao fim do
  formulário sem responder nenhuma delas, por design (baixa fricção — ver seção 01-A do
  research).
- Lógica condicional implementada exatamente como pedido: "Já tentou alguma estratégia?" = Sim
  revela "O que aconteceu?"; nada além disso (sem cascata de condicionais).
- Atalhos de resposta rápida na etapa "Objetivo": clicar um chip preenche o campo aberto, que
  continua editável — a resposta final gravada é sempre a que ficou no campo, nunca uma
  reinterpretação automática.
- Estados `idle` → `submitting` (botão mostra "Enviando…", reenvio bloqueado por guarda no
  `handleSubmit`) → `success` (painel de confirmação, mesma linguagem visual do site) ou
  `error` (mensagem genérica — nunca stack trace/erro técnico bruto).
- Rascunho: cada mudança de campo é salva em `localStorage` (`bs_lead_form_draft`) e restaurada
  na volta/reload; limpo só após envio confirmado com sucesso.

## 6. Tracking / atribuição

`useLeadTracking` captura, na primeira renderização client, os parâmetros da URL
(`utm_source/medium/campaign/content/term`, `gclid`, `gbraid`, `wbraid`, `fbclid`) +
`landing_page` (`window.location.href`) + `referrer` (`document.referrer`) +
`first_contact_at`, com modelo **first-touch**: só grava um campo se ele ainda não tiver valor
salvo — uma visita de retorno sem UTM não apaga a campanha original. Persistido em
`localStorage` (`bs_lead_attribution`) até o envio, independente da URL ainda conter os
parâmetros ou não.

## 7. Variáveis de ambiente

Ver [`.env.example`](./.env.example). Duas variáveis, **nenhuma com prefixo `NEXT_PUBLIC_`**
(lidas só em `src/lib/supabase/server.ts`, server-only):

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` — a chave "anon"; só tem permissão de `INSERT` (ver RLS acima).

`.env.local` (com os valores reais) foi criado localmente e **não é commitado**
(`.gitignore` já tinha `.env*`; adicionamos a exceção `!.env.example`).

## 8. Segurança — o que foi implementado

- **Validação server-side com Zod** (`schema.ts`) — autoritativa, independente da UX no client.
- **Honeypot** (`hp_company_site`) — campo real no DOM, oculto via CSS (`position:absolute;
  left:-9999px`, não `display:none`) + `aria-hidden`, `tabIndex={-1}`, `autoComplete="off"`.
  Se vier preenchido, a Server Action retorna sucesso "de mentira" **sem gravar nada** — testado
  (seção 10).
- **Rate limiting por IP**, em memória, 5 req/min. Limitação documentada no próprio
  `rateLimit.ts`: é por instância do processo Node, não compartilhado entre múltiplas instâncias
  serverless — adequado ao volume atual, não a uma escala maior (ver research, seção 11, para o
  caminho de evolução).
- **RLS** restrito a `INSERT` (seção 4).
- **Segredos só no servidor** — nenhuma chave em `NEXT_PUBLIC_*`; `import "server-only"` no
  cliente Supabase quebra o build se algum dia alguém importar esse módulo de um Client
  Component por engano.
- **CAPTCHA/Turnstile: não implementado.** A especificação pedia "rate limiting se compatível" e
  honeypot como obrigatórios; Turnstile precisaria de site key/secret key reais (uma conta
  Cloudflare configurada), que não existiam para este projeto — em vez de simular ou inventar
  uma integração, ficou de fora. `[VALIDAR]`: adicionar se o volume de spam superar o que
  honeypot + rate limit seguram.

## 9. Testes executados (reais, neste ambiente)

Todos os itens abaixo foram executados de fato no navegador (via automação) contra o Supabase
real do projeto, não simulados:

| # | Teste | Resultado |
| :-- | :--- | :--- |
| 1 | Envio válido, fim a fim | ✅ Linha gravada no Supabase com todos os campos corretos |
| 2 | Campos obrigatórios vazios (nome/telefone/e-mail) | ✅ Erros específicos por campo, mapeados via Zod |
| 3 | E-mail inválido | ✅ Bloqueado com mensagem "E-mail inválido" |
| 4 | Consentimento não marcado | ✅ Bloqueado no client antes mesmo de chamar o servidor |
| 5 | Erro de backend | ✅ Encontrado de verdade (RLS bloqueando `RETURNING`, seção 4) e corrigido — não foi um teste simulado, foi um bug real pego em produção do teste |
| 6 | Honeypot preenchido | ✅ UI mostra sucesso, **nenhuma linha gravada** (confirmado por contagem no Supabase) |
| 7 | UTM (`utm_source/medium/campaign`) | ✅ Persistidos e gravados corretamente |
| 8 | GCLID | ✅ Persistido e gravado |
| 9 | FBCLID | ✅ Persistido e gravado |
| 10 | Persistência dos parâmetros até o envio | ✅ Capturados no load, sobreviveram à navegação entre etapas |
| 11 | Inserção no Supabase | ✅ Confirmada via SQL direto no projeto |
| 12 | Duplicação de envio (duplo clique) | `[VALIDAR]` — protegido por guarda síncrona (`if (status === "submitting") return`) no client; **não foi testado sob condição de corrida real** (dois cliques simultâneos disparados no mesmo instante) nem existe hoje uma constraint de idempotência no banco (ex.: chave única por `email+created_at` numa janela curta). Suficiente para uso humano normal; não é uma garantia formal |
| 13 | Mobile (375px) | ✅ Sem overflow, sem corte de texto, campos e botões acessíveis ao toque |
| 14 | Desktop | ✅ Layout e crossfade entre etapas funcionando |
| — | Rate limiting (5 req/min) | ✅ Testado além do pedido: 6ª tentativa em sequência foi bloqueada com a mensagem correta |
| — | Lógica condicional (histórico) | ✅ Campo "O que aconteceu?" só aparece quando a resposta é "Sim" |

Teclado/leitor de tela: os controles são elementos semânticos nativos (`<button>`, `<input>`,
`<label htmlFor>`, `<textarea>`), com `role="radiogroup"`/`role="radio"` nos grupos de escolha
e `aria-describedby` ligando cada campo ao seu erro (corrigido durante os testes — o `id` do
`<span>` de erro não existia até a primeira rodada de teste expor isso). **Não testado com um
leitor de tela real** (rule 27 pede não fingir testes que não rodaram) — a base semântica está
lá, mas isso é uma verificação manual que fica pendente.

## 10. Pendências (`[VALIDAR]`)

- `[VALIDAR]` **Link da Política de Privacidade** (`/politica-de-privacidade`, no consentimento)
  **aponta para uma rota que ainda não existe.** Não escrevi uma política de privacidade
  fictícia — isso é conteúdo jurídico real, fora do que posso inventar (mesma régua de
  `LEAD_SYSTEM_RESEARCH.md`, seção 12). **Isso é bloqueante para publicar o formulário em
  produção**: hoje o link dá 404.
- `[VALIDAR SCORE]` `lead_score`/`lead_temperature` gravados como `null`, `score_version =
  "unscored-v0"` — estrutura pronta, cálculo desativado, exatamente como pedido. Ativar exige
  validar a metodologia proposta em `LEAD_SYSTEM_RESEARCH.md` (seção 01-A) com o autor do
  projeto.
- `[VALIDAR LIBRA CRM]` Nenhuma integração foi criada ou simulada. Quando existir API/webhook
  real do Libra CRM, o próximo passo é ler leads do Supabase (por `status`) e enviar.
- `[VALIDAR]` Google Ads / Meta Ads: `gclid`/`gbraid`/`wbraid`/`fbclid` são capturados e
  persistidos — nenhuma chamada às APIs do Google ou da Meta foi implementada (exigiria
  credenciais/configuração reais, conforme já registrado na pesquisa).
- `[VALIDAR]` Cloudflare Turnstile — ver seção 8.
- `[VALIDAR]` Duplicação de envio sob condição de corrida real — ver item 12 da tabela de testes.
- `[VALIDAR]` UI de gestão de leads (mudar status, ver leads) — hoje só existe via SQL Editor do
  Supabase. Fora do escopo deste pedido (que pedia explicitamente para não criar CRM/dashboard).

## 11. Como rodar/testar localmente

```bash
npm install
cp .env.example .env.local   # preencher com os valores reais (pedir ao autor do projeto)
npm run dev
```

O formulário aparece ao clicar em "Vamos começar?" na seção final do site (`#contato`).
