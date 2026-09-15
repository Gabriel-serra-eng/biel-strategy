# SITE PROJECT CONTEXT

> Levantamento de estado real do projeto **Biel Strategy**, gerado em 2026-09-14, sem alterar
> nenhum arquivo além deste. Serve para transferir contexto completo a outra IA/pessoa sem que
> ela precise reanalisar o código do zero.
>
> **Estado do git no momento deste levantamento:** branch atual `feature/lead-form-supabase`,
> working tree limpo. Existem **dois Pull Requests abertos e ainda NÃO mesclados** em `master`:
> - PR #1 `research/lead-system-architecture` — só documentação de pesquisa (`LEAD_SYSTEM_RESEARCH.md`).
> - PR #2 `feature/lead-form-supabase` — a implementação do formulário nativo + Supabase descrita
>   neste documento.
>
> **Ou seja: o `master` público hoje contém só o site institucional (sem formulário funcional).**
> Tudo que este documento descreve sobre formulário/Supabase/tracking existe no branch
> `feature/lead-form-supabase`, não em produção/`master`.

---

## 1. Resumo do projeto

Site pessoal de **Biel Strategy** — Estrategista de Aquisição & Soluções Digitais (Gabriel,
sobrenome ainda não validado). É uma **SPA de página única** (`/`) em Next.js, construída a
partir de um design aprovado no Claude Design, com narrativa Marketing → Tecnologia → IA.
Sobre essa base, foi implementado (em branch separado, não mesclado) um formulário nativo de
pré-diagnóstico comercial de 8 etapas que grava leads em um banco Supabase.

## 2. Stack atual

| Camada | Tecnologia | Versão |
| :--- | :--- | :--- |
| Framework | Next.js (App Router) | 16.3.4 |
| UI | React | 19.2.8 |
| Linguagem | TypeScript | ^5 |
| Estilo | CSS vanilla orientado a tokens (custom properties) — **sem Tailwind** | — |
| Animação | GSAP + ScrollTrigger | ^3.15.0 |
| Validação | Zod | ^4.6.1 |
| Banco de dados | Supabase (Postgres gerenciado) via `@supabase/supabase-js` | ^2.116.0 |
| Fontes | `next/font/google` (Montserrat + Inter, self-hosted) | — |
| Lint | ESLint (`eslint-config-next`) | ^9 |
| Package manager | npm (só existe `package-lock.json`) | — |
| Runtime Node local | v24.18.0 (sem `engines` fixado no `package.json`) | — |

Nenhum framework de teste (Jest/Vitest/Playwright/Cypress) está configurado. Nenhum CMS.
Nenhum ORM (o acesso ao Postgres é direto via SDK do Supabase, sem Prisma/Drizzle).

## 3. Estrutura do projeto

```
src/
  app/
    layout.tsx        — fontes, metadata, JSON-LD (Person/ProfessionalService)
    page.tsx           — única página, compõe todas as seções em ordem fixa
    globals.css         — tokens + todo o CSS do site (uma folha só, sem CSS Modules)
    actions/
      submitLead.ts      — Server Action do formulário (honeypot → rate limit → Zod → Supabase)
  components/
    ui/                 — primitivas do design system (Button, Quote, Callout, Section, Reveal, Wordmark...)
    sections/            — uma seção por arquivo (Hero, Jornada, Marketing, Casos, Tecnologia, IA,
                            StackStrip, Formacao, Visao, Fechamento, Nav, ProgressRail, CursorSpotlight,
                            HeroBackground)
    sections/lead-form/  — LeadForm.tsx (orquestrador das 8 etapas) + fields.tsx (campos reutilizáveis)
  data/
    site.ts              — conteúdo narrativo do site (fases da jornada, casos, stack etc.)
    leadForm.ts           — opções de cada pergunta do formulário + rótulos das 8 etapas
  hooks/
    useMagnetic.ts        — efeito de botão magnético (GSAP)
    useLeadTracking.ts     — captura/persistência de UTM e click-ids
  lib/
    gsap.ts                — registro único do GSAP/ScrollTrigger + guarda de reduced-motion
    supabase/server.ts       — cliente Supabase server-only
    leads/
      schema.ts              — schema Zod de validação do envio
      score.ts                — estrutura de lead score (cálculo desativado)
      rateLimit.ts             — rate limiter em memória, por IP
  styles/tokens/           — cópia fiel dos tokens de design (cores, tipografia, spacing, radius,
                              elevation, motion) — origem: handoff do Claude Design
public/
  images/biel-retrato.webp — único asset de imagem real do site
supabase/
  migrations/0001_create_leads_table.sql — migration versionada da tabela `leads`
```

Documentos na raiz (não-código): `RESEARCH.md` (fonte de verdade de conteúdo/negócio),
`IMPLEMENTATION.md` (contrato técnico original), `LEAD_SYSTEM_RESEARCH.md` (pesquisa de
arquitetura de lead tracking), `LEAD_FORM_IMPLEMENTATION.md` (registro as-built do formulário),
`README.md`. `AGENTS.md`/`CLAUDE.md` são arquivos de instrução para agentes de IA, não
documentação de produto.

## 4. Páginas e rotas

**Uma única rota: `/`.** Não há App Router com múltiplas páginas — tudo é uma SPA de seção
única navegada por âncoras (`#hero`, `#jornada`, `#marketing`, `#casos`, `#tecnologia`, `#ia`,
`#formacao`, `#contato`).

Existe um link para `/politica-de-privacidade` no campo de consentimento do formulário —
**essa rota não existe no projeto** (não há `src/app/politica-de-privacidade/`). Hoje esse link
resulta em 404. Nenhuma outra rota (admin, dashboard, API REST própria) existe.

## 5. Arquitetura do frontend

- Site renderizado como Server Components por padrão; componentes que precisam de estado,
  efeitos ou GSAP são explicitamente `"use client"` (Nav, ProgressRail, CursorSpotlight, Hero,
  HeroBackground, Jornada, Casos, Formacao, Fechamento, LeadForm, fields de formulário, hooks).
- Camadas separadas por convenção do projeto: `data/` (conteúdo tipado) → `components/ui`
  (primitivas de design system) → `components/sections` (composição por seção) → `app/page.tsx`
  (montagem final).
- Animações: reveal genérico ao rolar (`Reveal`, via ScrollTrigger), rail de progresso da seção
  "Jornada", crossfade entre etapas do formulário e entre abas de "Casos", CTA magnético em
  botões, glow pulsante de fundo na Hero — tudo com fallback total sob
  `prefers-reduced-motion: reduce`.
- Sem gerenciador de estado global (Redux/Zustand/Context de app) — cada seção é autocontida;
  o formulário usa `useState` local + `localStorage` para rascunho.

## 6. Backend e APIs

**Não há uma API REST própria nem rotas `app/api/*`.** A única peça de "backend" é uma **Server
Action** do Next.js: `src/app/actions/submitLead.ts`, chamada diretamente do componente client
`LeadForm.tsx` (não é um endpoint HTTP tradicional documentável por URL — é uma função server-side
invocada via o mecanismo de Server Actions do React/Next).

Fluxo dessa função, em ordem:
1. **Honeypot**: se o campo oculto `hp_company_site` vier preenchido, retorna sucesso falso sem
   tocar no banco.
2. **Rate limit por IP** (extraído de `x-forwarded-for`/`x-real-ip`, com fallback `"unknown"`)
   — 5 requisições/minuto, em memória (não distribuído entre instâncias — ver seção 20).
3. **Validação Zod** (`leadSubmissionSchema`) — autoritativa, independente da validação de UX no
   client.
4. Monta o registro (contato + qualificação + atribuição + score neutro) e insere na tabela
   `leads` do Supabase, usando um `id` gerado no servidor (`crypto.randomUUID()`), sem usar
   `RETURNING`/`.select()` (motivo técnico documentado no próprio arquivo e em
   `LEAD_FORM_IMPLEMENTATION.md`, seção 4).
5. Retorna um resultado tipado (`SubmitLeadResult`): sucesso com `leadId`, ou erro categorizado
   (`validation` | `consent` | `rate_limited` | `server_error`) — nunca vaza stack trace/erro
   técnico bruto ao client.

Não existe nenhuma chamada de saída (outbound) a APIs externas — nem Google, nem Meta, nem Libra.

## 7. Formulário de captação

**Localização:** embutido na seção `#contato` (`Fechamento.tsx`), que antes só tinha um botão
estático "Vamos começar?"; esse botão agora abre o `<LeadForm />` inline, na mesma área, mesma
aparência de entrada.

**Estrutura:** 8 etapas dentro de um único `.lf-card`, com barra de progresso (8 marcadores) e
crossfade entre etapas:

| # | Etapa | Campos | Obrigatório? |
| :-- | :--- | :--- | :--- |
| 1 | O negócio | empresa, segmento (chip único), cidade/região, Instagram, site | Não |
| 2 | O desafio | necessidade principal (chip único, 10 opções) | Não |
| 3 | Situação atual | canal de aquisição atual + maturidade de marketing (2 grupos de chips) | Não |
| 4 | Histórico | já tentou estratégia sem sucesso? (sim/não) → se sim, campo aberto "o que aconteceu" | Não |
| 5 | Objetivo | texto livre + atalhos rápidos que preenchem o campo (editável depois) | Não |
| 6 | Momento | prazo desejado para começar (chip único, 6 opções) | Não |
| 7 | Investimento | faixa de orçamento (chip único, 6 opções) | Não |
| 8 | Contato | nome, WhatsApp, e-mail, canal preferido, **consentimento** | **Sim** (nome/telefone/e-mail/consentimento) |

**Validações:** client-side só bloqueia por falta de consentimento (checagem síncrona antes de
chamar o servidor); nome/telefone/e-mail são validados no servidor via Zod (nome ≥2 caracteres,
e-mail com formato válido, telefone com regex numérica). Nenhuma etapa de qualificação (1-7)
bloqueia avanço — dá para chegar ao fim sem responder nenhuma delas.

**Mensagens de erro:** por campo (`aria-describedby` ligado ao span de erro) + uma mensagem
genérica de formulário ("Revise os campos destacados." / "É necessário aceitar a política de
privacidade para enviar." / "Muitas tentativas em pouco tempo..." / "Não conseguimos enviar
agora. Tente novamente em instantes."). Nunca expõe erro técnico bruto.

**Comportamento após envio:** estado `submitting` (botão mostra "Enviando…", reenvio duplo
bloqueado por guarda síncrona no client) → `success` (painel de confirmação com a mesma
linguagem visual do site, rascunho limpo do `localStorage`) ou `error` (mensagem + formulário
permanece preenchido para nova tentativa).

**Endpoint/payload:** não é um endpoint HTTP com URL fixa — é a Server Action `submitLead`,
chamada com um objeto (não FormData) contendo todos os campos das 8 etapas + `attribution`
(objeto com UTMs/click-ids, ver seção 8) + `hp_company_site` (honeypot) + `consent_version`.

**Proteção contra spam/bots:** honeypot (campo oculto fora da viewport, `aria-hidden`,
`tabIndex={-1}`) + rate limiting por IP. **Não há CAPTCHA/Cloudflare Turnstile implementado.**

**Consentimento/LGPD:** checkbox **não pré-marcado**, obrigatório para envio, com texto de
finalidade e link para política de privacidade (rota inexistente — ver seção 4). Persistidos:
`consent` (boolean), `consent_version` (constante `"v1-2026-09"`), `consent_timestamp` (gerado
no servidor no momento do envio, não confiado ao relógio do client).

## 8. Tracking e atribuição

**Não há Google Tag Manager, Google Analytics/GA4, Meta Pixel, `dataLayer` ou `gtag` instalados
no projeto.** As únicas menções a "GTM"/"GA4"/"Meta Ads" no código são texto de conteúdo do
próprio site (`src/data/site.ts`) — chips que listam competências do Biel Strategy na narrativa
do site ("Google Ads · Meta Ads · GA4 · GTM") — **não são scripts de tracking reais**, foi
confirmado por busca no código-fonte.

O que **existe de verdade** é um hook próprio, client-side: `src/hooks/useLeadTracking.ts`.

- Executa uma vez, no mount da página (dentro do `LeadForm`).
- Lê da URL (`URLSearchParams`): `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`,
  `utm_term`, `gclid`, `gbraid`, `wbraid`, `fbclid`.
- Captura também `landing_page` (`window.location.href`), `referrer` (`document.referrer`) e
  `first_contact_at` (timestamp ISO gerado no client nesse momento).
- **Modelo first-touch**: só grava um campo se ele ainda não tiver valor salvo — visitas de
  retorno sem UTM não sobrescrevem a campanha original.
- Persistência: `localStorage`, chave `bs_lead_attribution`, como JSON simples. Não usa cookies.
- Esse objeto é lido (`getAttribution()`) só no momento do envio do formulário e enviado junto
  no payload da Server Action — não há nenhum envio de evento em tempo real de navegação
  (nenhum "page view", nenhum evento de scroll, nenhum evento de clique em botão além do
  submit do formulário em si).

Não há nenhum outro mecanismo de atribuição (sem fingerprinting, sem sessionStorage, sem
cookies de terceiros, sem Server-Side Tagging).

## 9. Dados capturados

Ver a tabela completa de campos na seção 13 (schema do banco). Resumo por categoria:
- **Identificação/contato:** nome, e-mail, telefone/WhatsApp, canal de contato preferido.
- **Qualificação comercial (pré-diagnóstico):** empresa, segmento, localização, Instagram, site,
  necessidade principal, canal de aquisição atual, maturidade de marketing, tentativa anterior
  de marketing (+ o que deu errado), objetivo de negócio (texto livre), prazo desejado, faixa de
  orçamento.
- **Ciclo comercial:** status (enum), `qualified_at`, `converted_at`, `conversion_value`.
- **Consentimento:** `consent`, `consent_version`, `consent_timestamp`.
- **Score (estrutura pronta, não calculada):** `score_version`, `lead_score`, `lead_temperature`
  — todos gravados como `null`/`"unscored-v0"` hoje.
- **Atribuição de marketing:** as 5 UTMs, `gclid`, `gbraid`, `wbraid`, `fbclid`, `landing_page`,
  `referrer`, `first_contact_at`.
- **Metadados:** `id` (uuid), `created_at`.

## 10. Integração com LIBRA

**Não existe.** Busca no código-fonte por "libra" não retorna nenhuma chamada de API, endpoint,
variável de ambiente, header ou payload relacionado a um CRM Libra — apenas duas menções em
texto de documentação (`LEAD_FORM_IMPLEMENTATION.md`), listando isso como pendência futura:
> "Nenhuma integração foi criada ou simulada. Quando existir API/webhook real do Libra CRM, o
> próximo passo é ler leads do Supabase (por `status`) e enviar."

Não há endpoint, método HTTP, autenticação, headers, payload, retry ou deduplicação a
documentar, porque nada disso foi implementado.

## 11. Fluxo atual do lead

O fluxo real e funcional hoje (no branch `feature/lead-form-supabase`, não em produção) é:

```
Visitante chega ao site (com ou sem UTM/gclid/fbclid na URL)
  → useLeadTracking captura e persiste a atribuição em localStorage (first-touch)
  → Visitante clica "Vamos começar?" na seção de contato
  → Preenche até 8 etapas (só contato + consentimento são obrigatórios)
  → Server Action `submitLead`: honeypot → rate limit → validação Zod
  → INSERT direto na tabela `leads` do Supabase (status = 'NEW', score = null)
  → Painel de sucesso exibido ao visitante
```

**O fluxo para aí.** Não há: nenhum e-mail/notificação disparado ao receber um lead, nenhuma
automação que move o `status` adiante, nenhuma integração que leia os leads de volta para
CRM/Ads. Avançar o `status` de `NEW` para `CONTACTED`/`QUALIFIED`/etc. só é possível hoje
manualmente, via SQL Editor do painel do Supabase (não existe UI de gestão no frontend nem
API própria para isso — nem deveria haver, segundo o pedido original que gerou esta
implementação: nada de CRM/dashboard embutido no site).

## 12. Integrações externas

| Serviço | Status |
| :--- | :--- |
| Supabase | **Configurado e em uso** — armazenamento dos leads (ver seção 13) |
| Google Ads (Enhanced Conversions / Data Manager API) | Não implementado — só os identificadores (`gclid`) são capturados e guardados |
| Meta Ads (Conversions API) | Não implementado — só `fbclid` é capturado e guardado |
| Google Tag Manager / GA4 | Não implementado |
| Meta Pixel | Não implementado |
| Libra CRM | Não implementado (seção 10) |
| Cloudflare Turnstile / reCAPTCHA | Não implementado |
| E-mail transacional (ex.: Resend/SendGrid) | Não implementado — nenhuma notificação é enviada ao receber lead |
| Hospedagem/CI-CD (Vercel, Docker, GitHub Actions) | Nenhuma configuração encontrada no repositório (sem `vercel.json`, `Dockerfile` ou workflows de CI) |

## 13. Banco de dados

**Supabase** (Postgres gerenciado). Projeto: `Gabriel-serra-eng's Project`
(ref `xhntobdbpzsvfblmihnf`, região `us-east-1`) — reaproveitado de um projeto já existente e
vazio, não criado especificamente para isto.

**Tabela única: `public.leads`.** Migration versionada em
`supabase/migrations/0001_create_leads_table.sql`. Colunas (todas as de qualificação/atribuição
são opcionais no banco; contato + consentimento são `not null`):

`id` (uuid, PK) · `created_at` · `name` · `email` · `phone` · `company` · `segment` ·
`location` · `instagram_url` · `website_url` · `primary_need` · `current_acquisition_channel` ·
`marketing_maturity` · `previous_marketing_attempt` (bool) · `previous_marketing_problem` ·
`business_goal` · `purchase_timeline` · `marketing_budget_range` · `preferred_contact_channel` ·
`status` (enum via CHECK: `NEW`/`CONTACTED`/`QUALIFIED`/`PROPOSAL`/`WON`/`LOST`, default `NEW`) ·
`qualified_at` · `converted_at` · `conversion_value` · `consent` (bool, not null) ·
`consent_version` (not null) · `consent_timestamp` (not null) · `score_version` · `lead_score` ·
`lead_temperature` · `utm_source/medium/campaign/content/term` · `gclid` · `gbraid` · `wbraid` ·
`fbclid` · `landing_page` · `referrer` · `first_contact_at`.

Índices: `status`, `created_at desc`, `email`, `gclid` (parcial, `where not null`), `fbclid`
(parcial).

**RLS (Row Level Security):** habilitado. **Única policy existente: `INSERT` para os papéis
`anon`/`authenticated`, `with check (true)`.** Não há policy de `SELECT`, `UPDATE` nem `DELETE`
— por padrão do Postgres isso significa acesso negado nessas operações para qualquer papel que
não seja `postgres`/`service_role`. Na prática: mesmo que a chave pública do site vaze, ela só
consegue criar leads, nunca ler, alterar ou apagar. Confirmado via advisor de segurança do
Supabase (os únicos avisos existentes são de uma função interna do próprio Supabase,
pré-existente, não relacionada a esta tabela).

**Estado atual dos dados:** tabela existe e está **vazia (0 linhas)** neste momento — os dados
inseridos durante os testes de implementação foram removidos manualmente depois.

Não há outro banco de dados, cache (Redis) ou fila de mensagens no projeto.

## 14. Variáveis de ambiente e configurações

*(Nenhum valor secreto é revelado abaixo — só nomes e onde estão.)*

| Variável | Onde é lida | Prefixo `NEXT_PUBLIC_`? |
| :--- | :--- | :--- |
| `SUPABASE_URL` | `src/lib/supabase/server.ts` (server-only, `import "server-only"`) | Não |
| `SUPABASE_ANON_KEY` | idem | Não |

Ambas documentadas (sem valor) em `.env.example`, versionado no git. Os valores reais existem
em `.env.local`, que **existe no ambiente local mas está no `.gitignore` e não é commitado**
(confirmado: `.gitignore` tem `.env*` com exceção explícita só para `!.env.example`). Nenhuma
outra variável de ambiente é usada pelo projeto — não há chave de Google, Meta, Libra, Turnstile
ou qualquer outro serviço configurada, porque essas integrações não existem.

`next.config.ts` está praticamente vazio (config default do Next.js, sem `output: "export"`,
sem `distDir` customizado, sem rewrites/redirects).

## 15. Testes

**Não há suíte de testes automatizados no repositório** — nenhum framework de teste
(Jest/Vitest/Playwright/Cypress/Testing Library) está instalado ou configurado, nenhum arquivo
`*.test.ts(x)` ou pasta `__tests__` existe.

O que existe é um **registro manual de testes exploratórios** feito durante a implementação do
formulário (documentado em `LEAD_FORM_IMPLEMENTATION.md`, seção 9): envio válido, campos
obrigatórios, e-mail inválido, consentimento, honeypot, rate limiting, captura de UTM/GCLID/
FBCLID, mobile e desktop — todos executados manualmente contra o Supabase real durante aquela
sessão, com resultado anotado, mas **não são testes repetíveis/automatizados** — não há como
rodá-los novamente com um comando (`npm test` não existe no `package.json`).

## 16. Parte visual e UX

- **Identidade:** fundo quase preto (`--surface-page: #0A0A0A`), tipografia display Montserrat
  (700/800) em caixa alta para títulos, Inter para corpo de texto, único acento de cor —
  "carmesim" (`--carmesim-500: #E21D48`) — usado em links, bordas ativas, CTAs e destaques.
  Existe também um "verde-valor" (`#24B888`) nos tokens, mas reservado (por convenção do design
  system original) exclusivamente para valores de investimento — não usado em nenhum componente
  atual do site.
- **Seções da página (nessa ordem):** Hero (com vídeo de fundo cinematográfico + glow carmesim
  pulsante) → Jornada (trajetória em 5 fases, rail de progresso sincronizado ao scroll) →
  Marketing → Casos (3 cases, navegação em abas) → Tecnologia → IA → StackStrip (faixa de
  categorias de stack) → Formação (cursos/certificações) → Visão (o que está em construção) →
  Fechamento (CTA final + formulário + dados de contato pendentes).
- **Componentes reutilizáveis:** `Button` (variantes primary/outline/invert/ghost, com efeito
  magnético via GSAP), `Wordmark`, `Quote`, `Callout`, `Section`/`SectionTitle`/`Kicker`/
  `ChapterMark`, `Reveal` (fade+translateY ao entrar na viewport), `Pending` (selo "[VALIDAR]"
  usado em todo dado ainda não confirmado), e agora os campos do formulário
  (`TextField`/`TextAreaField`/`ChoiceGroup`/`YesNoField`/`ConsentField`/`HoneypotField`).
- **Responsividade:** mobile-first testado manualmente em 375px — sem overflow horizontal,
  chips de escolha com `min-height: 44px` (alvo de toque), grid de 1 coluna em telas estreitas.
- **Animações:** GSAP + ScrollTrigger para reveals de seção, rail da Jornada, wipe da régua dos
  títulos, crossfade entre abas de Casos e entre etapas do formulário, CTA magnético, glow de
  fundo da Hero — todas desativadas sob `prefers-reduced-motion: reduce`.
- **UX do formulário/CTA:** formulário abre inline (sem modal, sem redirecionamento), baixa
  fricção nas 7 primeiras etapas (nada obrigatório), barra de progresso visual, atalhos de
  resposta rápida na etapa de objetivo. O botão de conversão final é "Enviar" — não há
  link direto de WhatsApp funcional no CTA (o número ainda está como `[VALIDAR]`).

## 17. O que está funcionando

- Site institucional completo (todas as 10 seções), fiel ao design aprovado, responsivo,
  com animações GSAP.
- Formulário de 8 etapas renderizando, navegando, validando e **gravando leads reais no
  Supabase** — testado ponta a ponta.
- Captura e persistência de UTM/gclid/gbraid/wbraid/fbclid/landing_page/referrer até o envio.
- Honeypot (confirmado: não grava linha quando acionado) e rate limiting por IP (confirmado:
  bloqueia a partir da 6ª tentativa em um minuto).
- RLS do Supabase restringindo a chave pública a `INSERT`, sem nenhuma leitura possível por ela.
- Estrutura de `lead_score`/`status` pronta no banco, mesmo sem cálculo/automação ativa.

## 18. O que está parcialmente implementado

- **Lead score:** colunas existem (`lead_score`, `lead_temperature`, `score_version`), a função
  `calculateLeadScore()` existe e é chamada em todo envio, mas **sempre retorna valores nulos**
  — o cálculo em si está desligado de propósito, aguardando validação da metodologia.
- **Consentimento LGPD:** o mecanismo técnico (checkbox, versão, timestamp) está completo, mas
  o link obrigatório para a Política de Privacidade aponta para uma **página que não existe**.
- **Rate limiting:** funciona, mas é em memória de processo único — não é confiável se o site
  rodar em múltiplas instâncias (ex.: várias funções serverless escalando horizontalmente).
- **Segurança anti-bot:** honeypot + rate limit implementados; **CAPTCHA/Turnstile não**.

## 19. O que ainda não existe

- Nenhuma integração com Google Ads, Meta Ads, GTM, GA4 ou Meta Pixel (só os identificadores de
  clique são capturados e guardados, nada é enviado de volta a essas plataformas).
- Nenhuma integração com Libra CRM (ou qualquer CRM).
- Nenhuma UI de gestão/visualização de leads (dashboard, admin, backoffice) — acesso aos dados
  só via SQL Editor do Supabase.
- Nenhuma automação de avanço de `status` (tudo manual, hoje só via SQL direto).
- Nenhuma notificação (e-mail, Slack, WhatsApp) disparada ao receber um lead.
- Página de Política de Privacidade.
- Suíte de testes automatizados.
- Configuração de deploy/produção (hospedagem, CI/CD, domínio, `metadataBase`).
- Dados de contato reais (WhatsApp comercial, e-mail profissional, LinkedIn/GitHub) — todos
  ainda como `[VALIDAR]` no site, herdados do `RESEARCH.md` original.

## 20. Riscos, limitações e pontos de atenção

- **PRs não mesclados**: tudo isto está em branches separados (`feature/lead-form-supabase`
  sobre `research/lead-system-architecture`), não em `master`. Quem for continuar o projeto
  precisa saber que o `master` atual não tem formulário funcional.
- **Rate limiter não distribuído**: se o deploy final usar múltiplas instâncias serverless
  (comum em Vercel sob carga), o limite de 5 req/min passa a ser "por instância", não global —
  pode não segurar um ataque de spam distribuído.
- **Sem CAPTCHA**: honeypot + rate limit seguram bots simples, mas não um ataque direcionado.
- **Link de privacidade quebrado**: é um bloqueador real para publicar o formulário em produção
  — hoje o checkbox de consentimento aponta para uma rota 404.
- **Sem `metadataBase`** configurado em `layout.tsx` — gera aviso de build sobre resolução de
  imagens Open Graph (usa `localhost:3000` como fallback); precisa do domínio de produção real.
- **Sem observabilidade**: nenhum log estruturado, nenhum alerta se o Supabase ficar
  indisponível — o único tratamento é um `console.error` no servidor e uma mensagem genérica ao
  usuário.
- **Dados de identidade pendentes**: nome completo, WhatsApp e e-mail comerciais ainda não
  confirmados no conteúdo do site (isso é uma pendência de negócio, não técnica).

## 21. Próximos passos recomendados

1. Mesclar (ou decidir não mesclar) os PRs #1 e #2 em `master` — hoje o trabalho fica invisível
   fora dos branches.
2. Criar a página de Política de Privacidade (conteúdo jurídico real — fora do que uma IA deveria
   redigir sozinha sem revisão humana/jurídica).
3. Decidir e validar a metodologia de `lead_score` (está documentada como proposta em
   `LEAD_SYSTEM_RESEARCH.md`, seção 01-A) antes de ativar o cálculo.
4. Definir domínio de produção, hospedagem e `metadataBase`.
5. Priorizar entre CAPTCHA (Turnstile) e/ou um rate limiter distribuído, dependendo do volume de
   spam observado após publicar.
6. Só então avaliar integrações de retorno (Google Ads Data Manager API, Meta Conversions API,
   Libra CRM) — a base de dados (UTMs/click-ids/status) já está pronta para alimentá-las.

## 22. Mapa técnico do fluxo

Usando somente componentes que **realmente existem** no projeto hoje:

```
Visitante (com ou sem utm_*/gclid/fbclid na URL de chegada)
  → useLeadTracking (captura + persiste em localStorage, first-touch)
  → LeadForm (8 etapas, UI React, dentro da seção Fechamento do site)
  → Server Action submitLead (honeypot → rate limit → validação Zod)
  → Supabase, tabela public.leads (INSERT via RLS restrito a anon/authenticated)
  → [FIM DO FLUXO — nada além disso existe hoje]
```

Não existe (ainda) nenhum trecho depois do Supabase: sem Libra, sem CRM, sem retorno a
Google/Meta Ads, sem notificação. O "próximo elo" da cadeia, quando existir, parte de uma
leitura manual/futura da tabela `leads` por `status`.

## 23. Resumo executivo para outra IA

Você está herdando um site Next.js 16 (App Router, React 19, TypeScript, CSS vanilla com
tokens, GSAP) de página única para "Biel Strategy", um estrategista de marketing/tecnologia.
O `master` do repositório tem só o site institucional (10 seções, fiel a um design aprovado no
Claude Design). **Sobre um branch separado ainda não mesclado
(`feature/lead-form-supabase`, PR #2 aberto)**, foi implementado um formulário nativo de
8 etapas embutido na última seção do site (`Fechamento.tsx` → `LeadForm.tsx`), que captura
contato + um pré-diagnóstico comercial (segmento, dor, maturidade, orçamento, timeline etc.) e
grava tudo numa tabela `leads` num projeto Supabase real e já configurado (`SUPABASE_URL`/
`SUPABASE_ANON_KEY` em `.env.local`, não commitado). A tabela tem RLS restrito a `INSERT` — a
chave pública nunca lê dados de volta. Um hook próprio (`useLeadTracking`) captura UTMs e
click-ids (`gclid`/`gbraid`/`wbraid`/`fbclid`) da URL de chegada e persiste em `localStorage`
até o envio — **não existe GTM, GA4 ou Meta Pixel instalados**, apesar de aparecerem como texto
de conteúdo do site. Segurança do formulário: validação Zod server-side, honeypot (testado,
funciona), rate limiting por IP em memória (funciona, mas não é distribuído entre múltiplas
instâncias). Não há CAPTCHA. O campo `lead_score` existe no schema mas seu cálculo está
deliberadamente desligado (retorna sempre `null`) até alguém validar a metodologia proposta em
`LEAD_SYSTEM_RESEARCH.md`. **Não existe nenhuma integração de saída** — nem com Google Ads, nem
Meta Ads, nem um CRM chamado "Libra" (mencionado como destino futuro na documentação, mas zero
linhas de código relacionadas a ele existem). Não há testes automatizados, não há configuração
de deploy/produção, e o link de "Política de Privacidade" no formulário aponta para uma página
que ainda não foi criada — isso é um bloqueador real antes de publicar. Toda a lógica de negócio
sensível (chaves, validação, rate limit, inserção no banco) roda só no servidor, via uma única
Server Action (`src/app/actions/submitLead.ts`); o frontend nunca fala com o Supabase
diretamente. Os arquivos `LEAD_SYSTEM_RESEARCH.md` (porquê das decisões de arquitetura) e
`LEAD_FORM_IMPLEMENTATION.md` (o que foi de fato construído e testado, com resultados reais de
cada teste) têm o detalhamento completo por trás deste resumo.
