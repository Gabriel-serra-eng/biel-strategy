# Relatório Técnico de Auditoria: Biel Strategy App
**Arquivo de Contexto Técnico & Diagnóstico para Integração LIBRA**  
**Data da Auditoria:** 14 de setembro de 2026  
**Workspace:** `Gabriel-serra-eng/biel-strategy`  
**Autor do Relatório:** Antigravity (Auditoria Estrita de Código)

---

## Sumário Executivo

Esta auditoria técnica analisou integralmente o workspace do projeto **Biel Strategy**, com foco na avaliação do estado atual da aplicação e na prontidão para operar no funil planejado:

$$\text{Meta Ads / Google Ads} \longrightarrow \text{Landing Page} \longrightarrow \text{Tracking} \longrightarrow \text{Formulário} \longrightarrow \text{API} \longrightarrow \text{LIBRA} \longrightarrow \text{CRM / Venda}$$

**Conclusão imediata da auditoria:**  
O projeto possui uma **Landing Page completa e funcional**, com design system proprietário implementado em Vanilla CSS, componentes modulares em Next.js 16 (App Router), e um **Formulário de Pré-Diagnóstico nativo em 8 etapas conectado a um banco Supabase real (PostgreSQL com RLS)** via Server Actions.  
Contudo, o elo de conexão com o **LIBRA NÃO ESTÁ IMPLEMENTADO**. Não há no código nenhuma rota, cliente HTTP, webhook, payload ou credencial direcionada ao LIBRA. Adicionalmente, as tags de mídia paga (**Meta Pixel, Google Tag Manager, GA4 e APIs de Conversão CAPI/Enhanced Conversions**) **NÃO ESTÃO IMPLEMENTADAS** no frontend ou backend, existindo apenas a captura no navegador de parâmetros de URL (`utm_*`, `gclid`, `fbclid`, etc.) gravados no Supabase junto com o lead.

---

## 1. Estrutura do Projeto

### 1.1 Árvore de Diretórios do Workspace
```
c:\Users\gabri\OneDrive\Documentos\Meu site biel_strategy
├── .claude/
├── .env.example
├── .env.local                          [Ignorado no Git, credenciais Supabase]
├── .git/
├── .gitignore
├── .next/                              [Build artifacts]
├── AGENTS.md                           [Instruções de ambiente Next.js]
├── CLAUDE.md                           [Diretrizes do Claude Code]
├── IMPLEMENTATION.md                   [Contrato arquitetural e de design fidelity]
├── LEAD_FORM_IMPLEMENTATION.md         [Registro de implementação do formulário de leads]
├── README.md                           [Visão geral do projeto]
├── RESEARCH.md                         [Fonte de verdade de conteúdo e competências]
├── design_import/                      [Artefatos de referência de design importados]
│   └── corre-o-da-se-o-jornada/
├── eslint.config.mjs                   [Configuração ESLint 9 + Next.js]
├── next-env.d.ts
├── next.config.ts                      [Configuração Next.js]
├── node_modules/
├── package-lock.json
├── package.json                        [Manifesto de dependências e scripts]
├── public/
│   └── images/
│       └── biel-retrato.webp           [Retrato oficial do fundador]
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── submitLead.ts           [Server Action: validação, honeypot, rate limit, Supabase]
│   │   ├── favicon.ico
│   │   ├── globals.css                 [Estilos globais, utilitários e CSS do formulário]
│   │   ├── layout.tsx                  [Root Layout: metadados, fontes, schema JSON-LD]
│   │   └── page.tsx                    [Página principal: orquestração das seções da LP]
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Casos.tsx               [Seção: Selected work / Casos de estudo]
│   │   │   ├── CursorSpotlight.tsx     [Efeito: Spotlight interativo nos cards]
│   │   │   ├── Fechamento.tsx          [Seção final: chamada e container do formulário]
│   │   │   ├── Formacao.tsx            [Seção: Formação acadêmica e certificações]
│   │   │   ├── Hero.tsx                [Seção: Apresentação principal, proposta de valor]
│   │   │   ├── HeroBackground.tsx      [Vídeo cinematográfico em loop + véus e glow]
│   │   │   ├── IA.tsx                  [Seção: Aplicação prática de IA como acelerador]
│   │   │   ├── Jornada.tsx             [Seção: Trajetória profissional em 5 fases com timeline]
│   │   │   ├── Marketing.tsx           [Seção: Eixo protagonista, funil e competências]
│   │   │   ├── Nav.tsx                 [Barra de navegação fixa com botão magnético]
│   │   │   ├── ProgressRail.tsx        [Trilho lateral indicador de progresso por capítulo]
│   │   │   ├── StackStrip.tsx          [Faixa de categorias do stack tecnológico]
│   │   │   ├── Tecnologia.tsx          [Seção: Engenharia frontend e conversão]
│   │   │   ├── Visao.tsx               [Seção: Projetos atuais e convergência operacional]
│   │   │   └── lead-form/
│   │   │       ├── LeadForm.tsx        [Orquestrador do formulário nativo em 8 etapas]
│   │   │       └── fields.tsx          [Componentes de campo: texto, seleção, consentimento, honeypot]
│   │   └── ui/
│   │       ├── Button.tsx              [Botões primário, outline, invert e função de scroll]
│   │       ├── Callout.tsx             [Caixas de destaque para observações]
│   │       ├── Quote.tsx               [Citação destacada]
│   │       ├── Reveal.tsx              [Wrapper de revelação com animação CSS/GSAP]
│   │       ├── RuleWipeClient.tsx      [Linha divisória animada]
│   │       ├── Section.tsx             [Primitivas de seção, kicker, título, badges]
│   │       ├── Wordmark.tsx            [Logotipo tipográfico do Biel Strategy]
│   │       └── index.ts                [Exportador unificado dos componentes UI]
│   ├── data/
│   │   ├── leadForm.ts                 [Constantes, opções de seleção e etapas do formulário]
│   │   └── site.ts                     [Dados estruturados da LP: fases, cases, stack, links]
│   ├── hooks/
│   │   ├── useLeadTracking.ts          [Captura first-touch de UTMs, gclid, fbclid e persistência]
│   │   └── useMagnetic.ts              [Interação de atração magnética do cursor nos botões]
│   ├── lib/
│   │   ├── gsap.ts                     [Registro de plugins GSAP/ScrollTrigger e prefers-reduced-motion]
│   │   ├── leads/
│   │   │   ├── rateLimit.ts            [Controle de taxa em memória por IP: 5 req/min]
│   │   │   ├── schema.ts               [Validação de schemas com Zod: lead e atribuição]
│   │   │   └── score.ts                [Estrutura de pontuação de lead: cálculo desativado/neutro]
│   │   └── supabase/
│   │       └── server.ts               [Instanciação do cliente Supabase server-only]
│   └── styles/
│       └── tokens/
│           ├── base.css                [Variáveis de layout e estilos base]
│           ├── colors.css              [Paleta de cores e acentos carmesim]
│           ├── elevation.css           [Sombras e camadas de profundidade]
│           ├── motion.css              [Curvas bezier e tempos de transição]
│           ├── radius.css              [Raios de arredondamento de bordas]
│           ├── spacing.css             [Escala de espaçamentos em pixels/rems]
│           └── typography.css          [Definições tipográficas e tamanhos]
└── supabase/
    └── migrations/
        └── 0001_create_leads_table.sql [Script SQL da tabela public.leads, índices e RLS]
```

### 1.2 Páginas e Rotas
- **Páginas existentes:**
  - `/` (`src/app/page.tsx`): Página única (Single Page Application com âncoras de navegação contínua).
  - `/_not-found` (Página padrão de erro 404 gerada automaticamente pelo Next.js).
- **Rotas adicionais:**
  - **NÃO EXISTEM** outras rotas de página no diretório `src/app`.
  - **PENDÊNCIA CRÍTICA:** O link da Política de Privacidade no formulário aponta para `/politica-de-privacidade`. Essa rota **não existe** no código, resultando em erro 404 ao ser acessada.
- **Rotas de API (Endpoints HTTP REST):**
  - **NÃO EXISTE** nenhum arquivo de API Route (`route.ts` ou pasta `src/app/api/`). A comunicação cliente-servidor ocorre exclusivamente por Next.js Server Actions.

### 1.3 Documentação Existente no Repositório
- `RESEARCH.md`: Documentação aprofundada (41 KB) de posicionamento, trajetória do fundador, cases reais (Studio Unna, Lead Radar, VYRO), teses de conversão e competências.
- `IMPLEMENTATION.md`: Diretrizes arquiteturais de engenharia, regras de fidelidade ao design aprovado, desacoplamento de camadas e padrões técnicos.
- `LEAD_FORM_IMPLEMENTATION.md`: Registro da implementação do formulário nativo em 8 etapas, schema do Supabase, políticas de segurança, testes manuais executados e pendências de validação (incluindo explicitamente a pendência do LIBRA).
- `README.md`: Apresentação geral do projeto, stack utilizada e guia de inicialização local.

---

## 2. Stack Tecnológica

As tecnologias identificadas diretamente no `package.json` e confirmadas no código-fonte são:

| Categoria | Tecnologia / Biblioteca | Versão Declarada | Papel no Projeto |
|---|---|---|---|
| **Framework Web** | Next.js (App Router, Turbopack) | `16.3.4` | Renderização híbrida (RSC), roteamento e Server Actions |
| **Biblioteca de UI** | React / React DOM | `19.2.8` | Biblioteca base de componentes de interface |
| **Linguagem** | TypeScript | `^5` | Tipagem estática em 100% dos arquivos do projeto |
| **Estilização** | Vanilla CSS modular com Tokens | N/A | Variáveis CSS em `src/styles/tokens/` e `globals.css` |
| **Tailwind CSS** | **NÃO UTILIZADO** | Ausente | O projeto não utiliza classes Tailwind |
| **Bibliotecas de UI Prontas** | **NÃO UTILIZADO** | Ausente | Componentes customizados nativos (sem Radix, MUI ou Shadcn) |
| **Motor de Animações** | GSAP + ScrollTrigger | `^3.15.0` | Orquestração de scroll cinematográfico, timelines e reveals |
| **Validação de Dados** | Zod | `^4.6.1` | Validação estrita do payload de leads e atribuição |
| **Segurança Backend** | `server-only` | `^0.0.1` | Bloqueio em tempo de build de importações de servidor no client |
| **Cliente de Banco** | `@supabase/supabase-js` | `^2.116.0` | Conexão server-side com banco PostgreSQL Supabase |
| **Linter de Código** | ESLint + `eslint-config-next` | `^9` / `16.3.4` | Verificação estática de código e Core Web Vitals |
| **Framework de Testes** | **NÃO IDENTIFICADO** | Ausente | Sem Jest, Vitest, Cypress ou Playwright no `package.json` |

---

## 3. Landing Page: Mapeamento de Seções

A página inicial (`src/app/page.tsx`) é uma narrativa contínua estruturada nas seguintes seções:

### 3.1 `Nav` (`src/components/sections/Nav.tsx`)
- **Função:** Barra de navegação fixa com blur de fundo (`backdrop-filter`).
- **Componentes:** `Wordmark`, links de âncoras, botão CTA.
- **CTA:** Botão "Conversa estratégica" com efeito magnético (`useMagnetic`) que rola até `#contato`.
- **Links:** `#hero`, `#jornada`, `#marketing`, `#casos`, `#tecnologia`, `#ia`, `#formacao`.
- **Responsividade:** Links de navegação são ocultados em telas `<= 1080px`, preservando o logotipo e o botão de ação rápida.

### 3.2 `ProgressRail` (`src/components/sections/ProgressRail.tsx`)
- **Função:** Indicador lateral discreto fixo na borda direita, destacando o capítulo ativo conforme o scroll.
- **Componentes:** Elementos de traço vertical (`<i>`) sincronizados via GSAP ScrollTrigger com os IDs das seções.
- **Responsividade:** Ocultado em telas `<= 1100px`.

### 3.3 `CursorSpotlight` (`src/components/sections/CursorSpotlight.tsx`)
- **Função:** Efeito visual que projeta um halo luminoso carmesim sobre elementos interativos (`.chip`, `.caso-tab`, etc.) acompanhando o ponteiro do mouse.
- **Responsividade:** Desativado nativamente em dispositivos touch (`(hover: none)`).

### 3.4 `Hero` (`src/components/sections/Hero.tsx` e `HeroBackground.tsx`)
- **Função:** Abertura e proposta de valor central: "Marketing que pensa. Tecnologia que constrói. IA que acelera."
- **Componentes:** `Wordmark`, títulos balanceados, botões de ação, retrato em WebP (`next/image`), `HeroBackground` (vídeo MP4 hospedado em CloudFront rodando em loop suave com sobreposição de gradientes e pulso carmesim).
- **CTA:** Botão primário "Iniciar conversa estratégica" (rola para `#contato`) e link discreto "Ver a trajetória ↓" (rola para `#jornada`).
- **Animações:** Timeline de entrada do GSAP (`expo.out`) sequenciando kicker, headline, portrait e botões. Pausado sob `prefers-reduced-motion`.

### 3.5 `Jornada` (`src/components/sections/Jornada.tsx`)
- **Função:** Narrativa da trajetória profissional em 5 marcos lógicos (01 Base técnica, 02 Tráfego de intenção, 03 O gargalo, 04 Engenharia de conversão, 05 Amplificação com IA).
- **Componentes:** `Section`, `SectionTitle`, `Reveal`, trilho lateral de progresso (`traj-rail`) e artigos de fase (`traj-flow`).
- **Animações:** ScrollTrigger monitora a rolagem e atualiza a fase ativa e o preenchimento da linha vertical.

### 3.6 `Marketing` (`src/components/sections/Marketing.tsx`)
- **Função:** Apresentação do eixo protagonista de mídia paga, funil de intenção e metodologia de testes analíticos.
- **Componentes:** Headline em destaque, representação do fluxo de funil ("Busca → Anúncio → Clique → Contato → Oportunidade"), citação estilizada (`Quote`) e chips de competências (Google Ads, Meta Ads, GA4/GTM, etc.).
- **CTA:** Sem CTA direto nesta seção (conduz o usuário pelo scroll).

### 3.7 `Casos` (`src/components/sections/Casos.tsx`)
- **Função:** Demonstração de cases e projetos práticos (Studio Unna, Máquina de Aquisição para Restaurantes, Lead Radar).
- **Componentes:** Abas de seleção (`role="tablist"`), painel de detalhes com problema, abordagem e participação, caixa de aviso (`Callout`) e bloco de imagem do case.
- **Animações:** Transição suave com GSAP `fromTo` entre abas ativas.
- **Observação:** Imagens dos cases constam como `[IMAGEM A VALIDAR]` (placeholders estruturados).

### 3.8 `Tecnologia` (`src/components/sections/Tecnologia.tsx`)
- **Função:** Posicionamento de engenharia frontend e páginas sob medida para estancar o desperdício de tráfego pago gerado por templates lentos.
- **Componentes:** `SectionTitle`, `Reveal` com texto explicativo e chips de tecnologias (React, Next.js, TypeScript, Formulários multi-step, APIs & webhooks).

### 3.9 `IA` (`src/components/sections/IA.tsx`)
- **Função:** Demonstração de uso pragmático de modelos de linguagem como amplificadores operacionais (pontuação de leads, prototipagem acelerada).
- **Componentes:** Texto reflexivo e chips de ferramentas (Claude / Anthropic SDK, Google Gemini API, Ollama local).

### 3.10 `StackStrip` (`src/components/sections/StackStrip.tsx`)
- **Função:** Faixa horizontal categorizando os níveis de domínio técnico (Marketing, Build, AI, Automação, Fundação).

### 3.11 `Formacao` (`src/components/sections/Formacao.tsx`)
- **Função:** Credenciais acadêmicas e certificações de mercado (Google Ads Search / GA4, IA & Data Science IBM, Redes Cisco, Azure).

### 3.12 `Visao` (`src/components/sections/Visao.tsx`)
- **Função:** Apresentação das iniciativas atuais em desenvolvimento (VYRO Site Factory, consolidação do Lead Radar, automações em n8n).

### 3.13 `Fechamento` (`src/components/sections/Fechamento.tsx`)
- **Função:** Conclusão da landing page, ponto focal de conversão de leads e rodapé institucional.
- **Componentes:** Headline de fechamento, container do formulário (`<LeadForm />`), canais de contato com badges pendentes (`WhatsApp`, `E-mail`, `LinkedIn/GitHub`) e copyright com `Wordmark`.

---

## 4. Formulário Nativo de Pré-Diagnóstico

O formulário localizado em `src/components/sections/lead-form/LeadForm.tsx` substituiu o CTA estático e opera como um formulário multi-etapas progressivo.

### 4.1 Campos e Etapas

```
[Etapa 00: Botão Gatilho Inicial] ──> "Vamos começar?"
   ↓
[Etapa 01: O Negócio] ───────────────> company, segment, location, instagram_url, website_url
   ↓
[Etapa 02: O Desafio] ───────────────> primary_need
   ↓
[Etapa 03: Situação Atual] ──────────> current_acquisition_channel, marketing_maturity
   ↓
[Etapa 04: Histórico] ───────────────> previous_marketing_attempt (Sim/Não)
                                       ↳ Se Sim: previous_marketing_problem
   ↓
[Etapa 05: O Objetivo] ──────────────> business_goal (Texto livre ou Chips rápidos)
   ↓
[Etapa 06: O Momento] ───────────────> purchase_timeline
   ↓
[Etapa 07: Investimento] ────────────> marketing_budget_range
   ↓
[Etapa 08: Contato & Envio] ─────────> name, phone, email, preferred_contact_channel,
                                       hp_company_site (Honeypot), consent (LGPD)
```

- **Campos ocultos:**
  - `hp_company_site`: Honeypot contra bots (invisível via CSS `position: absolute; left: -9999px; width: 1px; height: 1px`).
  - `attribution`: Objeto contendo UTMs, gclid, fbclid, referrer e landing page.
  - `consent_version`: Identificador da versão do termo (`v1-2026-09`).

### 4.2 Validações e Mensagens de Erro
- **Client-side:**
  - O consentimento LGPD é validado antes da submissão: se desmarcado, impede o disparo e exibe: *"É necessário aceitar a política de privacidade para enviar"*.
  - Atributos HTML5 `required` e tipos específicos (`email`, `tel`, `url`).
- **Server-side (Zod - `src/lib/leads/schema.ts`):**
  - As etapas 01 a 07 são tratadas como opcionais (baixa fricção para não abandonar o preenchimento).
  - A etapa 08 possui validação obrigatória:
    - `name`: string com no mínimo 2 caracteres (*"Informe seu nome"*).
    - `email`: formato válido de e-mail (*"E-mail inválido"*).
    - `phone`: no mínimo 8 caracteres e regex numérico/símbolos (*"Telefone inválido"*).
    - `consent`: literal estrito `true` (*"É necessário aceitar a política de privacidade para enviar"*).
    - `urls`: regex validando protocolo `http://` ou `https://` sem espaços (*"URL inválida"*).

### 4.3 Mecanismo de Submissão e Comunicação
- **Endpoint:** Não utiliza rota HTTP REST (`/api/*`). A submissão ocorre via **Next.js Server Action** (`submitLead`).
- **Método HTTP:** `POST` interno do protocolo RPC do Next.js.
- **Payload:** Objeto tipado `LeadSubmissionInput` encaminhado via chamada assíncrona direta:
  ```typescript
  submitLead({
    hp_company_site, company, segment, location, instagram_url, website_url,
    primary_need, current_acquisition_channel, marketing_maturity,
    previous_marketing_attempt, previous_marketing_problem, business_goal,
    purchase_timeline, marketing_budget_range, name, email, phone,
    preferred_contact_channel, consent, consent_version, attribution
  })
  ```
- **Resposta Esperada:**
  - Sucesso: `{ ok: true, leadId: string | null }`
  - Falhas tratadas: `{ ok: false, error: "validation" | "consent" | "rate_limited" | "server_error", fieldErrors?: Record<string, string> }`
- **Tratamento de Sucesso:** A interface exibe a mensagem *"Sua mensagem chegou. Vou olhar com calma o que você contou sobre o seu negócio e retorno pelo canal que você preferiu"*. O rascunho em `localStorage` é apagado.
- **Tratamento de Erro:** Exibição de alertas amigáveis na UI (*"Revise os campos destacados"*, *"Muitas tentativas em pouco tempo. Aguarde um instante e tente novamente"* ou *"Não conseguimos enviar agora. Tente novamente em instantes"*).
- **Estado de Loading:** `status === "submitting"` altera o botão de envio para *"Enviando…"*, e uma trava no início de `handleSubmit` impede submissões duplicadas por cliques múltiplos.
- **Proteção contra Spam:**
  1. *Honeypot:* Se `hp_company_site` contiver texto, a Server Action retorna `{ ok: true, leadId: null }` imediatamente, descartando o lead sem persistir no banco e sem alertar o bot.
  2. *Rate Limiting:* Limitador em memória por IP (`checkRateLimit`), permitindo no máximo 5 requisições por janela de 60 segundos por instância de processo.
- **Consentimento e LGPD:** Caixa de seleção explícita obrigatória com gravação de carimbo de data/hora (`consent_timestamp: nowIso`), versão (`v1-2026-09`) e flag booleana. **Ressalva:** o link de leitura aponta para uma página 404 inexistente.

---

## 5. Tracking e Telemetria

Uma das principais verificações solicitadas foi o rastreamento de campanhas e tags de mídia.

### 5.1 O que EXISTE no Código
O único mecanismo de tracking em execução é o hook customizado **`useLeadTracking`** (`src/hooks/useLeadTracking.ts`):

- **Arquivo:** `src/hooks/useLeadTracking.ts`
- **Função:** `useLeadTracking()`
- **O que captura:**
  - Parâmetros de consulta da URL (`window.location.search`):
    - `utm_source`
    - `utm_medium`
    - `utm_campaign`
    - `utm_content`
    - `utm_term`
    - `gclid` (Google Click ID)
    - `gbraid` (Google App/Web iOS identifier)
    - `wbraid` (Google Web to App iOS identifier)
    - `fbclid` (Facebook Click ID)
  - URL da página de destino: `window.location.href`
  - Documento de referência anterior: `document.referrer`
  - Carimbo do primeiro acesso: `new Date().toISOString()`
- **Onde armazena:** No `window.localStorage` do navegador do visitante sob a chave:
  ```
  "bs_lead_attribution"
  ```
- **Quando dispara:** Executado no primeiro efeito de montagem do componente client no navegador (`useEffect`). Adota a estratégia **first-touch**: se os parâmetros já foram gravados anteriormente em `localStorage`, eles são preservados caso o usuário navegue ou retorne via busca orgânica direta sem sobrescrever os parâmetros da campanha original.

### 5.2 O que NÃO EXISTE no Código
- **Google Tag Manager (GTM):** **NÃO IMPLEMENTADO**. Nenhum script `gtm.js`, nenhum `<noscript>` iframe, nenhum ID `GTM-XXXXXXX` no HTML ou layout. As menções a GTM restringem-se ao texto de competências em `site.ts`.
- **Google Analytics / GA4:** **NÃO IMPLEMENTADO**. Nenhum script `gtag.js`, nenhum ID `G-XXXXXXXXXX`, nenhum evento configurado.
- **Meta Pixel (Facebook Pixel):** **NÃO IMPLEMENTADO**. Nenhuma tag `fbq('init')`, nenhum Pixel ID, nenhum `fbevents.js`.
- **dataLayer:** **NÃO IMPLEMENTADO**. Nenhuma inicialização de `window.dataLayer = window.dataLayer || []` ou comandos `dataLayer.push()`.
- **Meta Conversions API (CAPI):** **NÃO IMPLEMENTADO**. Nenhuma chamada de backend para os servidores da Meta enviando eventos `Lead`.
- **Google Ads Enhanced Conversions:** **NÃO IMPLEMENTADO**. Nenhum disparo de conversão offline ou API do Google Ads.
- **Cookies de Terceiros / Primários:** **NÃO IMPLEMENTADO**. Não há leitura ou gravação em `document.cookie` ou via cabeçalho `Set-Cookie`.
- **sessionStorage:** **NÃO IMPLEMENTADO**.

---

## 6. Atribuição de Tráfego

Avaliação detalhada da capacidade do projeto de capturar e preservar atributos de tráfego pago e orgânico:

| Parâmetro de Atribuição | Status | Onde é Capturado | Onde é Preservado | Onde é Gravado |
|---|---|---|---|---|
| `utm_source` | **IMPLEMENTADO** | `useLeadTracking.ts` | `localStorage` (`bs_lead_attribution`) | Supabase `leads.utm_source` |
| `utm_medium` | **IMPLEMENTADO** | `useLeadTracking.ts` | `localStorage` (`bs_lead_attribution`) | Supabase `leads.utm_medium` |
| `utm_campaign` | **IMPLEMENTADO** | `useLeadTracking.ts` | `localStorage` (`bs_lead_attribution`) | Supabase `leads.utm_campaign` |
| `utm_content` | **IMPLEMENTADO** | `useLeadTracking.ts` | `localStorage` (`bs_lead_attribution`) | Supabase `leads.utm_content` |
| `utm_term` | **IMPLEMENTADO** | `useLeadTracking.ts` | `localStorage` (`bs_lead_attribution`) | Supabase `leads.utm_term` |
| `fbclid` | **IMPLEMENTADO** | `useLeadTracking.ts` | `localStorage` (`bs_lead_attribution`) | Supabase `leads.fbclid` |
| `gclid` | **IMPLEMENTADO** | `useLeadTracking.ts` | `localStorage` (`bs_lead_attribution`) | Supabase `leads.gclid` |
| `gbraid` / `wbraid` | **IMPLEMENTADO** | `useLeadTracking.ts` | `localStorage` (`bs_lead_attribution`) | Supabase `leads.gbraid` / `wbraid` |
| `referrer` | **IMPLEMENTADO** | `useLeadTracking.ts` (`document.referrer`) | `localStorage` (`bs_lead_attribution`) | Supabase `leads.referrer` |
| `landing_page` | **IMPLEMENTADO** | `useLeadTracking.ts` (`window.location.href`) | `localStorage` (`bs_lead_attribution`) | Supabase `leads.landing_page` |
| `first_contact_at` | **IMPLEMENTADO** | `useLeadTracking.ts` (ISO string) | `localStorage` (`bs_lead_attribution`) | Supabase `leads.first_contact_at` |
| Origem (Canal Agrupado) | **PARCIAL** | Inferível via `utm_source`/`referrer` | Não há normalização automática no código | Supabase recebe texto cru |
| Campanha | **IMPLEMENTADO** | Capturado via `utm_campaign` | `localStorage` | Supabase `leads.utm_campaign` |
| Conjunto de Anúncios | **NÃO IMPLEMENTADO** | Não há campo específico (ex.: `adset_id`, `utm_id`) | N/A | N/A |
| Anúncio Específico | **PARCIAL** | Pode ser passado genericamente em `utm_content` | Não há parsing de `ad_id` | Gravado em `utm_content` |

---

## 7. Integração com o LIBRA

Realizou-se uma varredura completa no repositório em busca de qualquer menção, integração ou ponto de contato com o sistema **LIBRA**:

- **URLs do LIBRA:** **NÃO IMPLEMENTADO** (nenhuma URL identificada).
- **Endpoints de Integração:** **NÃO IMPLEMENTADO**.
- **Chamadas `fetch` / `axios` / HTTP:** **NÃO IMPLEMENTADO** (não existe código realizando requisições para APIs externas do LIBRA).
- **Métodos HTTP (POST/GET/PUT):** **NÃO IMPLEMENTADO**.
- **Headers e Autenticação:** **NÃO IMPLEMENTADO**.
- **Payload para o LIBRA:** **NÃO IMPLEMENTADO**.
- **Tratamento de Erros de Envio ao LIBRA:** **NÃO IMPLEMENTADO**.
- **Filas, Retentativas (Retry) e Dead-Letter:** **NÃO IMPLEMENTADO**.
- **Idempotência e Deduplicação:** **NÃO IMPLEMENTADO**.
- **Credenciais do LIBRA:** **NÃO IDENTIFICADO** (nenhuma chave ou credencial configurada).

### Evidência Documental Encontrada no Projeto
A única menção ao LIBRA em todo o código e documentação consta explicitamente no arquivo `LEAD_FORM_IMPLEMENTATION.md` (linhas 189–190):
> *"- `[VALIDAR LIBRA CRM]` Nenhuma integração foi criada ou simulada. Quando existir API/webhook real do Libra CRM, o próximo passo é ler leads do Supabase (por `status`) e enviar."*

Portanto, **a integração com o LIBRA está em estado ZERO (NÃO IMPLEMENTADA)**.

---

## 8. Variáveis de Ambiente

As variáveis de ambiente do projeto foram analisadas nos arquivos `.env.example` e `.env.local`:

- Nomes de variáveis declarados no projeto:
  1. `SUPABASE_URL`
  2. `SUPABASE_ANON_KEY`
- **Prefixos Públicos:** Nenhuma variável utiliza o prefixo `NEXT_PUBLIC_`. Todas operam em escopo estrito de servidor (`server-only`).
- **Credenciais configuradas:**
  - *Credencial configurada em `.env.local`* (URL e Anon JWT do projeto Supabase).
  - Nenhuma outra variável (LIBRA, Meta, Google) está configurada ou presente no ambiente.

---

## 9. Infraestrutura e Deploy

### 9.1 Build e Configuração
- **Build Executado na Auditoria:** `next build` (Next.js 16.3.4 com motor Turbopack).
- **Resultado do Build:** Compilação bem-sucedida em 747ms, verificação de tipagem TypeScript em 2.4s, geração estática concluída com sucesso (código de saída 0).
- **Páginas compiladas:**
  - `○ /` (Prerenderizada como conteúdo estático)
  - `○ /_not-found` (Página 404 padrão)
- **Aviso de Build Identificado:**
  ```
  ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000".
  ```
- **Hospedagem Alvo:** Configuração padrão compatível com Vercel ou Node.js autohospedado (`next start`). O arquivo `.gitignore` inclui referências a `.vercel`.

### 9.2 Roteamento, SEO e Arquivos Especiais
- **Redirects / Rewrites / Custom Headers:** Nenhum configurado em `next.config.ts`.
- **Sitemap (`sitemap.xml` ou `sitemap.ts`):** **NÃO IMPLEMENTADO**.
- **Robots (`robots.txt` ou `robots.ts`):** **NÃO IMPLEMENTADO**.
- **Metadados e SEO:**
  - Título: *"Biel Strategy | Marketing de Aquisição, Tecnologia & IA"*
  - Descrição configurada.
  - OpenGraph e Twitter Cards configurados para imagem local `/images/biel-retrato.webp`.
  - Dados estruturados Schema.org (`@type: ProfessionalService`) injetados via script JSON-LD no `layout.tsx`.
  - Falta configuração explícita de `metadataBase` com a URL final de produção.

---

## 10. Performance e Qualidade Técnica

### 10.1 Ativos e Recursos
- **Imagens:** O projeto utiliza o componente otimizado `next/image` para a imagem principal (`/images/biel-retrato.webp`), configurada com `priority`, formatos modernos e responsividade (`sizes`). Os cases utilizam placeholders tipográficos sem imagens pesadas.
- **Vídeo da Hero:** Hospedado remotamente em CDN AWS CloudFront (`https://d8j0ntlcm91z4.cloudfront.net/...`). O elemento `<video>` opera com `autoPlay`, `muted`, `loop`, `playsInline` e pausa imediata caso o usuário tenha ativado redução de movimento no sistema operacional.
- **Fontes:** Carregadas via `next/font/google` (Montserrat e Inter) com `display: "swap"`, eliminando bloqueio de renderização por download de fontes externas.
- **Scripts de Terceiros:** Não há scripts externos bloqueantes no `layout.tsx` (sem tags pesadas de tag managers).
- **Animações:** O GSAP e ScrollTrigger são instanciados exclusivamente sob demanda no client-side via wrapper `ensureGsap()`. As propriedades animadas são limitadas a `transform` e `opacity` (renderizadas via GPU sem causar re-layouts na thread principal).
- **Separação Client vs. Server:**
  - *Server-Side:* `layout.tsx`, `page.tsx`, `submitLead.ts`, `server.ts`.
  - *Client-Side:* Componentes interativos marcados com `"use client"` (`Hero`, `Nav`, `Jornada`, `Casos`, `LeadForm`, etc.).

### 10.2 Possíveis Gargalos e Limitações Técnicas Identificadas
1. **Rate Limiting em Memória (`src/lib/leads/rateLimit.ts`):**  
   O controle de taxa de envio de formulários está armazenado em um `Map` na memória do processo Node.js. Em uma infraestrutura serverless com escala horizontal (como Vercel Functions), cada função mantém sua própria memória, permitindo contornos de limite caso as requisições atinjam instâncias diferentes. Conforme documentado no próprio arquivo, para escala superior será necessário migrar para um storage distribuído (ex.: Upstash Redis).
2. **Dependência de CDN Externa para Vídeo de Fundo:**  
   Se o arquivo de vídeo no CloudFront sofrer lentidão ou indisponibilidade, a experiência da dobra inicial dependerá do degradê de fallback da classe `.hero-bg`.
3. **Ausência de Cache Headers Personalizados:**  
   `next.config.ts` não possui regras customizadas de cache para assets estáticos.

---

## 11. Análise Visual e de Interface (UI/UX)

- **Identidade Visual:** Estética sóbria e cinematográfica em Dark Theme, com forte inspiração em interfaces editoriais e de tecnologia avançada. Acentos estratégicos em Carmesim (`--carmesim-500: #e21d48`) sobre fundos pretos profundos (`--surface-page: #050505`).
- **Tipografia:** Hierarquia bem demarcada combinando Montserrat (para kickers, títulos em caixa alta, tracking alargado e numerais técnicos) e Inter (para leitura de parágrafos, dados e campos de formulário).
- **Espaçamento e Grid:** Sistema de tokens modulares (`spacing.css`) com margens fluidas calculadas via `clamp(20px, 7vw, 104px)` e largura máxima de leitura limitada a `1320px`.
- **Interatividade:** Microinterações de alto nível de acabamento visual:
  - Botão magnético na barra de navegação.
  - Cursor spotlight destacando cartões e chips sob o cursor.
  - Crossfades entre etapas do formulário e estudos de caso.
- **Experiência Mobile:**
  - Layout adaptado para toque único vertical.
  - Alvos de toque (`.btn`, `.lf-choice`, `.lf-input`) com altura mínima respeitando 44px–48px.
  - Supressão de elementos dependentes de ponteiro do mouse.
- **Acessibilidade:**
  - Suporte completo a `@media (prefers-reduced-motion: reduce)`.
  - Link de salto para conteúdo principal (`.skip-link: "Pular para o conteúdo"`).
  - Campos do formulário com `<label>`, `role="radiogroup"`, `role="radio"`, `aria-checked` e `aria-describedby` apontando para IDs de erro.

---

## 12. Qualidade de Código e Testes

Durante a auditoria, foram executadas as rotinas de verificação do código:

- **Testes Automatizados (Unitários / E2E):** **NÃO EXISTEM**. Não há suite de testes configurada no repositório (`package.json` não possui script de test).
- **Testes Manuais de Regressão:** Conforme documentado em `LEAD_FORM_IMPLEMENTATION.md`, foram realizados testes manuais no navegador cobrindo submissão completa, honeypot, rejeição de e-mail inválido, bloqueio de consentimento e validação de RLS no Supabase.
- **Compilação TypeScript:** Executado `npx tsc --noEmit`. **Resultado: 0 erros.** O código está em estrita conformidade de tipos.
- **Linter (ESLint):** Executado `npm run lint`. **Resultado: 0 avisos, 0 erros.** Código aderente às regras de Core Web Vitals do Next.js.

---

## 13. Arquitetura Real (Diagrama Textual)

Diagrama estritamente baseado no que **realmente existe** no código hoje:

```
[Visitante: Anúncio / Tráfego Orgânico / Direto]
       ↓
[Landing Page (Next.js 16 - App Router / SSR + Client Components)]
       ↓
[Tracking Nativo (useLeadTracking: UTMs, gclid, fbclid, referrer -> localStorage)]
       ↓
[Formulário de Pré-Diagnóstico (LeadForm: 8 etapas + validação client)]
       ↓
[Next.js Server Action (submitLead: honeypot + rate limit + validação Zod)]
       ↓
[Supabase PostgreSQL (Tabela `public.leads` via RLS / status 'NEW')]
       ↓
[LIBRA: NÃO IMPLEMENTADO]
       ↓
[CRM / Qualificação / Reunião / Venda: NÃO IMPLEMENTADO]
```

---

## 14. Matriz de Status dos Componentes

| Área | Status | Evidência Técnica |
|---|---|---|
| **Landing Page** | **IMPLEMENTADO** | Código completo em `src/app/page.tsx`, seções Hero, Jornada, Casos, etc., design system CSS e animações GSAP. |
| **Formulário** | **IMPLEMENTADO** | Componente `LeadForm.tsx` em 8 etapas, com persistência de rascunho em `localStorage` e submissão funcional. |
| **Tracking de Mídia** | **NÃO IMPLEMENTADO** | Sem scripts, sem dataLayer, sem Meta Pixel, sem Google Tag Manager, sem GA4 no código. |
| **Captura de UTM** | **IMPLEMENTADO** | Hook `useLeadTracking.ts` captura 5 parâmetros `utm_*` da URL e salva em `localStorage`. |
| **Captura de fbclid** | **IMPLEMENTADO** | Hook `useLeadTracking.ts` captura `fbclid` e o preserva até o envio do formulário. |
| **Captura de gclid** | **IMPLEMENTADO** | Hook `useLeadTracking.ts` captura `gclid`, `gbraid` e `wbraid` da URL. |
| **Atribuição de Leads** | **IMPLEMENTADO** | Objeto de atribuição completo é enviado pela Server Action e gravado nas colunas dedicadas da tabela `leads`. |
| **API Backend** | **PARCIAL** | Não há API REST pública/aberta (`/api/*`), mas há a Server Action `submitLead` atuando como RPC segura no servidor. |
| **Integração LIBRA** | **NÃO IMPLEMENTADO** | Nenhuma chamada, rota, webhook, cliente HTTP ou menção a endpoint do LIBRA existe no código. |
| **Meta Pixel** | **NÃO IMPLEMENTADO** | Ausência total de scripts da biblioteca `fbevents.js` ou chamadas `fbq`. |
| **GA4 / GTM** | **NÃO IMPLEMENTADO** | Ausência total de tags de rastreamento Google (apenas citados como texto em `site.ts`). |
| **LGPD (Consentimento)** | **PARCIAL** | Checkbox obrigatório e carimbo de auditoria gravados no banco; porém o link da política leva a uma página 404 (inexistente). |
| **Deploy e Produção** | **PARCIAL** | Build testado e validado com sucesso (`next build`), mas faltam `metadataBase`, `robots.txt`, `sitemap.xml` e domínio final. |

---

## 15. Comparação com o Contexto do Projeto & Prontidão para o LIBRA

### O que este projeto já possui para funcionar como origem de leads do LIBRA?
1. **Camada de Captura Completa e Estável:** Um formulário de qualificação profundo em 8 etapas que coleta dados ricos do lead (porte, segmento, canal atual de aquisição, maturidade, histórico de problemas, objetivos para 3 meses, prazo de compra, faixa de orçamento, dados de contato e canal preferido).
2. **Banco de Dados Relacional Estruturado (Supabase):** O banco de dados PostgreSQL já possui a tabela `public.leads` modelada com colunas dedicadas para cada resposta do formulário, carimbos de data/hora, status do ciclo de vendas (`NEW`, `CONTACTED`, `QUALIFIED`, `PROPOSAL`, `WON`, `LOST`), pontuação (`lead_score`, `lead_temperature`) e parâmetros completos de mídia.
3. **Persistência Confiável de Parâmetros de Tráfego:** Os identificadores de clique de anúncio (`fbclid`, `gclid`, `gbraid`, `wbraid`) e parâmetros de campanha (`utm_*`) são preservados no navegador mesmo se o visitante navegar pela página antes de preencher o formulário, sendo persistidos no banco de dados junto com o lead.
4. **Camada de Segurança Ativa:** Honeypot anti-spam funcional, rate limiting por IP no envio e políticas de Row Level Security (RLS) que impedem qualquer leitura não autorizada de dados de leads através da chave pública.

---

### O que ainda precisa ser implementado para completar o fluxo?

Para que o fluxo planejado funcione ponta a ponta:

$$\text{Ads} \longrightarrow \text{LP} \longrightarrow \text{Tracking} \longrightarrow \text{Form} \longrightarrow \text{API} \longrightarrow \text{LIBRA} \longrightarrow \text{CRM}$$

As seguintes etapas técnicas estão pendentes de implementação:

1. **Instalação das Tags de Mídia e Conversão (Tracking Frontend):**
   - Inserção do container do **Google Tag Manager (GTM)** ou scripts diretos de **GA4** e **Meta Pixel** no `layout.tsx`.
   - Implementação de disparos de eventos de conversão no frontend (ex.: disparo de `fbq('track', 'Lead')` e evento customizado do GA4 ao atingir o estado de sucesso do formulário).
2. **Integração Direta com a API / Webhook do LIBRA:**
   - Obtenção da documentação da API do LIBRA (URL do endpoint, método de autenticação por API Key/Bearer Token, formato de payload esperado e regras de validação).
   - Definição da arquitetura de envio para o LIBRA:
     - *Opção A (Síncrona na Server Action):* A própria Server Action `submitLead.ts`, após gravar no Supabase, realiza uma requisição HTTP POST para o endpoint do LIBRA.
     - *Opção B (Assíncrona via Webhook/Database Trigger do Supabase):* Configuração de um Database Webhook no Supabase disparado no evento `INSERT` da tabela `leads`, encaminhando o registro para um serviço intermediário ou direto para o LIBRA.
3. **Mecanismo de Retentativa e Idempotência:**
   - Adicionar tratamento de falhas caso a API do LIBRA esteja fora do ar ou com instabilidade (fila de retentativas com status `SYNCED_WITH_LIBRA` / `FAILED_LIBRA` na tabela `leads`).
4. **Resolução de Pendências Legais e de Deploy:**
   - Criação da página real de **Política de Privacidade** (`/politica-de-privacidade`) para eliminar o erro 404 do link de consentimento.
   - Configuração de `robots.txt`, `sitemap.xml` e da propriedade `metadataBase` para validação definitiva do domínio de produção.
