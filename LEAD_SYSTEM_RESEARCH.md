# BIEL_STRATEGY — RESEARCH: Sistema de Formulário + Lead Tracking

> **Documento:** Relatório de pesquisa técnica — não é especificação de implementação.
> **Status:** Pesquisa concluída. Nenhum código, dependência, configuração ou conteúdo do projeto foi alterado.
> **Não altera:** `RESEARCH.md`, `IMPLEMENTATION.md`, componentes, design, layout, estilos, dependências.
> **Metodologia:** pesquisa feita com WebSearch/WebFetch em três frentes paralelas (Google Ads, Meta Ads, Armazenamento+LGPD+Segurança), priorizando documentação oficial (`support.google.com`, `developers.google.com`, `developers.facebook.com`) e, quando não disponível oficialmente, fontes técnicas secundárias sinalizadas como tal. Pesquisa realizada em setembro/2026.

---

## 01. Captura e Atribuição — o que precisamos guardar

### Captura (dados do lead)

| Campo | Necessário para |
| :--- | :--- |
| Nome | Contato humano, personalização |
| Empresa | Qualificação B2B (quando aplicável) |
| E-mail | Contato + **chave de match** para Enhanced Conversions (Google) e Conversions API (Meta) |
| Telefone/WhatsApp | Canal de fechamento principal do Biel_Strategy (conforme `RESEARCH.md`) + segunda chave de match para Ads |
| Interesse/necessidade | Qualificação, roteamento |
| Mensagem | Contexto livre |
| Consentimento | Base legal LGPD — ver seção 12 |

### Atribuição (de onde o lead veio)

Os identificadores de clique/campanha só têm valor se forem **capturados no primeiro contato** (na URL de chegada) e **persistidos junto com o lead até o envio do formulário** — não dá para reconstruir depois. Isso é feito lendo os parâmetros de URL no carregamento da página e gravando em cookie de primeira parte (ou `localStorage`) até o submit.

| Parâmetro | Necessário para | Prioridade |
| :--- | :--- | :--- |
| `utm_source`, `utm_medium`, `utm_campaign` | Relatório de canal/campanha em qualquer plataforma de analytics | Essencial |
| `utm_content`, `utm_term` | Granularidade extra (variação de anúncio/criativo, palavra-chave) | Complementar |
| `gclid` | **Obrigatório** para Google Ads Enhanced Conversions / Offline Conversion Import | Essencial se roda Google Ads |
| `gbraid` / `wbraid` | Cliques vindos de **apps iOS** (não navegador) — praticamente não se aplica a um site institucional acessado via browser, mas custa pouco capturar se vier na URL | Baixa/condicional |
| `fbclid` | Chave de match para Meta Conversions API (vira `fbc`) | Essencial se roda Meta Ads |
| `landing_page` | Contexto da primeira página vista | Recomendado |
| `referrer` | Debug de origem quando não há UTM | Opcional |
| `timestamp` do primeiro contato | Base para a janela de atribuição (Google: 90 dias) | Essencial |

---

## 02. Armazenamento — comparação

| Critério | (a) Apps Script + Sheets | (b) Supabase (Postgres) | (c) Firebase (Firestore) | (d) CRM leve + automação |
| :--- | :--- | :--- | :--- | :--- |
| Custo inicial | R$0 | R$0 (Free tier) | R$0 (Spark) | HubSpot Free R$0; Pipedrive sem free tier; n8n self-host ~US$5-7/mês |
| Quando passa a cobrar | Ao estourar cota da API do Sheets | Pro US$25/mês/projeto ao passar 500MB / 50k MAU / 5GB banda, ou projeto pausa após 1 semana sem uso | Blaze pay-as-you-go acima de 50k leituras/dia, 20k escritas/dia, 1GiB | Automações/relatórios avançados exigem plano pago; Pipedrive cobra por usuário desde o início |
| Limites de API | Sheets API: 300 req/min/projeto, 60 req/min/usuário; Apps Script Web App: 6 min de execução máxima | Dentro dos limites do plano; até 200 conexões concorrentes no free tier | 50k leituras/20k escritas/20k exclusões por dia (Spark) | HubSpot 190 req/10s (Pro+); Pipedrive tem orçamento diário de tokens |
| Integração com Next.js | Média — sem SDK oficial; requer expor Web App ou usar Service Account | **Alta** — SDK oficial `@supabase/supabase-js`, uso direto em Route Handlers/Server Actions | Alta — `firebase-admin` no server, mas modelo NoSQL exige mais lógica | Variável — APIs REST bem documentadas; n8n como camada intermediária via webhook |
| Segurança de credenciais | Chave de Service Account (JSON) só no server; Web App do Apps Script não pode ficar aberto sem validação | `service_role` key só no server; `anon` key + Row Level Security no client | Admin SDK só no server; Security Rules do Firestore | Tokens de API só no server (Pipedrive: API key simples; HubSpot: OAuth) |
| Consultar/atualizar status do lead | Trabalhoso — busca linear por linha, sem índice real | **Nativo** — banco relacional real (`UPDATE ... WHERE`), índices, filtros, joins | Possível, mas sem joins nativos | Nativo — UI de pipeline pronta para o time comercial |
| Caminho para alimentar Google Ads/Meta depois | Manual — script precisa ler, normalizar e hashear antes de chamar as APIs | Bom — Edge Function/cron lê o Postgres, hasheia (SHA-256) e envia | Similar ao Supabase via Cloud Functions, mais lógica por causa do NoSQL | Mais direto em CRMs maduros (integrações nativas); n8n tem nodes prontos para Google Ads/Meta |

**Leitura dessa comparação:** Google Sheets serve como MVP zero-custo, mas escala mal para consulta/atualização de status (peça central do ciclo de vida do lead, seção 06). Firebase é comparável a Supabase em custo/segurança, mas o modelo NoSQL do Firestore é menos natural para consultas relacionais tipo funil/relatório. Um CRM leve resolve gestão comercial pronta, mas amarra a base de dados a uma ferramenta de terceiros desde o início. Supabase aparece como o meio-termo: grátis para começar, banco relacional real (facilita exatamente o ciclo `NEW → ... → WON/LOST`), SDK oficial para Next.js, e caminho natural de crescimento para "CRM próprio" sem reescrever a camada de dados.

**Fontes:** [Google Sheets API limits](https://developers.google.com/workspace/sheets/api/limits) · [Apps Script quotas](https://medium.com/@stackarchitect123/google-apps-script-quotas-2026-official-limits-6-minute-rule-consumer-vs-workspace-d18245035715) · [Supabase pricing](https://uibakery.io/blog/supabase-pricing) · [Firebase pricing](https://blog.back4app.com/firebase-pricing/) · [Pipedrive vs HubSpot](https://www.business.com/articles/pipedrive-vs-hubspot/) · [n8n pricing](https://www.nocode.mba/articles/n8n-pricing)

---

## 03. Google Ads

### Enhanced Conversions for Leads (ECL) — mecanismo recomendado atual

Fluxo oficial: **(1)** visitante clica no anúncio → chega no site com `gclid` na URL (auto-tagging) → **(2)** no envio do formulário, o site envia ao Google (via Google tag/gtag.js ou GTM) o e-mail e/ou telefone do usuário junto com o `gclid` — em hash SHA-256 no cliente, **ou** em texto puro que o próprio Google normaliza e hasheia no lado dele (ambos suportados oficialmente) — **(3)** o lead é salvo no seu banco com o `gclid` e os dados de contato **(4)** quando o lead é qualificado/vira cliente, você reimporta esses mesmos dados (hash + `gclid` + evento de conversão + timestamp) via **Google Ads API, Data Manager, upload de arquivo/Sheets ou integração de CRM** — o Google casa os dois envios para atribuir a conversão qualificada ao clique original.

- **Hashing é obrigatório** para PII (SHA-256, após normalizar: minúsculas, sem espaços, telefone em E.164).
- **Campos:** obrigatório pelo menos um identificador (e-mail ou telefone), nome/categoria/timestamp da conversão; recomendado fortemente incluir o `gclid` e múltiplos identificadores (maximiza taxa de match).

### GCLID / GBRAID / WBRAID

- `gclid`: clique padrão web→web. `gbraid`: clique web→conversão em app iOS. `wbraid`: clique em app iOS→conversão web. Os dois últimos existem por causa das restrições do iOS 14.5+ (ATT) e raramente se aplicam a um site institucional acessado por navegador.
- Captura: auto-tagging anexa o parâmetro à URL da landing page após o clique; a tag do site/Conversion Linker do GTM grava em cookie de primeira parte.
- **Janela de validade: 90 dias** entre o clique e o upload da conversão offline — depois disso o Google não aceita a importação.

### Google Tag / GTM / Data Manager

- **Google tag / GTM**: ponto de captura em tempo real no site (o que dispara no momento do formulário).
- **Data Manager**: interface do Google Ads para conectar fontes de dados de primeira parte (upload, Sheets, BigQuery, CRM, API) e reutilizar essa conexão em múltiplos destinos (Enhanced Conversions, Customer Match) sem recriar a integração. É hoje o caminho recomendado/centralizador para dados first-party sem código.

### ⚠️ Mudança estrutural para 2026 (já em curso)

- **Abril/2026**: os três métodos de entrada de dados (tag do site, Data Manager, API) convergem num único fluxo de aceitação.
- **Junho/2026**: Enhanced Conversions for web e for leads viram uma única configuração.
- **15 de junho de 2026**: uploads de Offline Conversion Import e Enhanced Conversions for Leads são **migrados para a Data Manager API**; o endpoint clássico (`UploadClickConversions` da Google Ads API) é descontinuado.

➡️ **Implicação prática:** qualquer integração nova deve mirar a **Data Manager API**, não a Google Ads API clássica de upload — a arquitetura recomendada neste relatório (seção 09) já considera isso.

### Consentimento (Consent Mode v2)

- `ad_user_data`: controla se dados de usuário (incluindo PII hasheada para Enhanced Conversions) podem ser enviados ao Google. Se negado, os dados hasheados **não são enviados** — sem esse consentimento, Enhanced Conversions não funciona.
- `ads_data_redaction`: quando `ad_storage` é negado, remove identificadores de clique das requisições e evita cookies de anúncio.
- Consent Mode v2 é necessário para operar Enhanced Conversions/import de PII em regiões que exigem consentimento explícito.

### Cookies de terceiros — atualização 2026

O Google **encerrou o Privacy Sandbox em outubro/2025** e decidiu **manter** cookies de terceiros no Chrome (ao invés de removê-los), introduzindo um prompt de escolha ao usuário. Isso não muda a recomendação: o fluxo baseado em `gclid` + dados first-party hasheados **já é** uma estratégia de first-party data, independente do destino dos cookies de terceiros.

**Fontes:** [About enhanced conversions for leads](https://support.google.com/google-ads/answer/15713840?hl=en) · [Configure the Google tag for ECL](https://support.google.com/google-ads/answer/11021502?hl=en) · [Configure GTM for ECL](https://support.google.com/google-ads/answer/11347292) · [Upgrade offline import to ECL](https://support.google.com/google-ads/answer/14274408) · [Updates to enhanced conversions settings](https://support.google.com/google-ads/answer/16884284?hl=en) · [Changes to Offline Click Conversion Import (dev blog)](https://ads-developers.googleblog.com/2026/05/changes-to-offline-click-conversion.html) · [About Data Manager](https://support.google.com/google-ads-data-manager/answer/13761872?hl=en) · [Data Manager + ECL](https://support.google.com/google-ads/answer/15707550?hl=en) · [Guidelines for importing offline conversions](https://support.google.com/google-ads/answer/15081888?hl=en) · [Manage offline conversions | Ads API](https://developers.google.com/google-ads/api/docs/conversions/upload-offline) · [About consent mode](https://support.google.com/google-ads/answer/10000067?hl=en) · [Consent mode overview | Tag Platform](https://developers.google.com/tag-platform/security/concepts/consent-mode) · [Next steps for Privacy Sandbox](https://privacysandbox.google.com/blog/privacy-sandbox-next-steps)

---

## 04. Meta Ads

### Pixel + Conversions API (CAPI), com deduplicação — prática recomendada atual

Pixel (client-side) sozinho perde eventos (ad blockers, ITP/ETP, falhas de JS). CAPI (server-side) sozinha perde alguns sinais só disponíveis no navegador. **A combinação, deduplicada por `event_id`, é a recomendação oficial da Meta.**

- **`event_id`**: string única enviada tanto pelo Pixel quanto pela CAPI para o mesmo evento; a Meta deduplica quando `event_name` + `event_id` + `action_source` coincidem. **Janela de deduplicação: 48 horas.**
- Isso significa que um evento de "lead qualificado" enviado dias/semanas depois **não é** o mesmo evento para fins de dedup — ele deve ser tratado como uma nova conversão associada ao lead original (não como client/server do mesmo evento).

### Eventos e sinalização de "lead qualificado"

Meta tem eventos-padrão fixos, incluindo `Lead` (envio de formulário) e `CompleteRegistration`. **Não existe evento nativo "lead qualificado"** — o caminho é a **Conversions API for CRM**: reenviar à Meta, quando o funil avança, um evento associado ao **Meta Lead ID** (armazenado no seu CRM) ou aos identificadores do cliente (e-mail/telefone/`fbclid`), permitindo à Meta reotimizar por qualidade real, não só volume de formulário. Funcionalmente equivalente ao Offline Conversion Import do Google.

### user_data — o que hashear

**Deve ser hasheado (SHA-256, após normalizar)**: `em` (email), `ph` (telefone, E.164), `fn`, `ln`, `ge`, `db`, `ct`, `st`, `zp`, `country`.
**Não deve ser hasheado**: `fbc` (derivado do `fbclid` da URL), `fbp` (cookie de primeira parte do Pixel), `client_ip_address`, `client_user_agent`. Enviar múltiplos identificadores juntos aumenta a "Event Match Quality" (EMQ) — e-mail costuma ter o maior impacto isolado.

### CAPI direta vs Conversions API Gateway

O **Conversions API Gateway** é uma ferramenta self-serve (deploy em nuvem própria — AWS/GCP) que atua como middleware entre Pixel e Meta, cuidando de transformação e deduplicação automaticamente, sem desenvolvimento customizado. Faz mais sentido para quem não tem backend próprio. Para o Biel_Strategy — que já terá um backend Next.js (API route/server action) recebendo o formulário — **implementar a CAPI diretamente nesse backend** é o caminho mais direto: não adiciona infraestrutura de nuvem extra e dá controle fino sobre quando enviar cada dado.

### Consentimento / LDU

CAPI **não contorna** exigência legal de consentimento — dados só podem ser enviados para usuários que consentiram ao rastreamento (GDPR/UK: opt-in explícito). Para leis estaduais dos EUA existe o mecanismo **Limited Data Use (LDU)** (`data_processing_options`), que restringe uso dos dados a relatório sem permitir segmentação — não é o modelo aplicável ao Brasil/LGPD, mas mostra que a Meta já modela "modo restrito" de processamento por regulação regional.

⚠️ Dois pontos levantados na pesquisa **não confirmados em fonte primária oficial** (sinalizados pelo agente de pesquisa): a suposta descontinuação da "Offline Conversions API" standalone em maio/2025, e a página oficial específica de LDU no Business Help Center — vale confirmar diretamente no Events Manager da conta antes de fechar a arquitetura.

**Fontes:** [Conversions API — docs](https://developers.facebook.com/docs/marketing-api/conversions-api/) · [About Conversions API](https://www.facebook.com/business/help/AboutConversionsAPI) · [Get Started CAPI](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started/) · [Conversions API for CRM](https://developers.facebook.com/documentation/ads-commerce/conversions-api/conversion-leads-integration) · [Parameters — CAPI](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters) · [About deduplication](https://www.facebook.com/business/help/823677331451951) · [Meta Pixel reference](https://developers.facebook.com/docs/meta-pixel/reference/) · [Conversions API Gateway](https://developers.facebook.com/documentation/ads-commerce/gateway-products/conversions-api-gateway)

---

## 05. Arquitetura de dados — quais campos são realmente necessários

| Campo | Classificação | Por quê |
| :--- | :--- | :--- |
| `lead_id` | **Obrigatório** | Chave primária, referência única para atualizações de status e reenvio de conversão |
| `created_at` | **Obrigatório** | Base da janela de atribuição (90 dias Google), auditoria LGPD |
| `name` | **Obrigatório** | Contato humano mínimo |
| `email` | **Obrigatório** | Contato + chave de match Google/Meta |
| `phone` | **Obrigatório** | Canal de fechamento (WhatsApp) + segunda chave de match |
| `company` | Recomendado | Qualificação, mas nem todo lead é B2B |
| `interest` / `message` | Recomendado / Opcional | Ajuda a qualificação; mensagem livre é sempre opcional |
| `source`, `medium`, `campaign` | **Obrigatório** (se há mídia paga) | Sem isso não há relatório de canal/campanha algum |
| `content`, `term` | Opcional | Granularidade extra, só usada em otimizações finas |
| `gclid` | Recomendado (condicional) | Obrigatório *se* o lead veio de um clique do Google Ads; nulo para tráfego orgânico/direto |
| `gbraid`, `wbraid` | Opcional | Só relevante se algum dia existir app — improvável para este site |
| `fbclid` | Recomendado (condicional) | Idem `gclid`, mas para Meta |
| `landing_page` | Recomendado | Contexto, debug de campanha |
| `referrer` | Opcional | Só usado quando não há UTM |
| `status` | **Obrigatório** | Motor do ciclo de vida (seção 06) |
| `qualified_at`, `converted_at` | Recomendado | Necessário para reenviar conversão a Google/Meta com o timestamp correto |
| `conversion_value` | Opcional | Só relevante se algum dia houver otimização por valor (ROAS) — hoje não há dado de ticket exposto publicamente (ver `RESEARCH.md`, governança de dados financeiros) |
| `consent` (bool) + `consent_text_version` + `consent_at` | **Obrigatório** | Base legal LGPD — precisa ser auditável, não só um booleano solto |

Campos como `gbraid`/`wbraid` e `conversion_value` aparecem no diagrama conceitual do pedido original, mas **não deveriam ser tratados como obrigatórios por padrão** — construir o schema para exigi-los sem necessidade real adiciona complexidade sem benefício.

---

## 06. Ciclo de vida do lead

```
NEW → CONTACTED → QUALIFIED → PROPOSAL → WON
                                        → LOST
```

Essa estrutura (idêntica ao padrão de pipeline de CRMs como HubSpot/Pipedrive) é **adequada** para o Biel_Strategy: é simples o suficiente para operação solo, mas rica o bastante para diferenciar "alguém preencheu o formulário" de "isso virou negócio" — que é exatamente o requisito do pedido original (seção 07). Dois ajustes valem considerar, sem que sejam obrigatórios:

- **`LOST` pode ocorrer a partir de qualquer estágio**, não só de `PROPOSAL` — vale modelar como um status terminal alcançável de `CONTACTED` ou `QUALIFIED` também (nem todo lead que não responde chega a receber proposta).
- Cada transição de status relevante para Ads (`QUALIFIED`, `WON`) precisa gravar seu próprio timestamp (`qualified_at`, `converted_at`) — é isso que alimenta o reenvio de conversão às plataformas (seção 07), não o status em si.

---

## 07. Retorno para campanhas — o caminho inverso

```
ANÚNCIO → SITE → LEAD (NEW) → ARMAZENAMENTO → QUALIFICADO → CONVERTIDO
                                                     │             │
                                                     ▼             ▼
                                    Google: reenvio via Data Manager API
                                    (Enhanced Conversions for Leads)
                                    Meta: reenvio via Conversions API for CRM
                                    (evento associado ao Lead ID / email+phone hash)
```

Tecnicamente isso **não é um webhook em tempo real disparado pelo formulário** — é um processo **assíncrono e desacoplado**, disparado pela *mudança de status* do lead (quando alguém marca `QUALIFIED` ou `WON`), não pelo envio do formulário em si:

1. Alguém (ou uma automação) muda o `status` do lead no armazenamento.
2. Um job separado (cron, Edge Function, ou acionado manualmente) lê leads com status alterado e `gclid`/`fbclid`/e-mail/telefone preenchidos.
3. Esse job normaliza e hasheia (SHA-256) os dados de contato.
4. Envia para a **Data Manager API** (Google) e/ou **Conversions API for CRM** (Meta), com o timestamp da qualificação/conversão — respeitando a janela de 90 dias do Google.

Isso mantém a "lógica de envio para plataformas de anúncio" **fora** do fluxo síncrono de submit do formulário (ver separação de camadas, seção 10) — importante porque essa etapa só acontece bem depois do envio original, muitas vezes dias ou semanas.

---

## 08. Comparação de arquiteturas

### Opção A — Google Apps Script + Google Sheets
- **Vantagens:** custo zero, setup rápido, qualquer pessoa não-técnica consegue ver os leads numa planilha.
- **Desvantagens:** sem query real (busca linear), atualização de status manual/trabalhosa, sem caminho nativo de segurança de credenciais robusto (Web App exposto), reenvio a Ads exige script customizado do zero.
- **Custo:** R$0 até estourar cota.
- **Complexidade:** baixa para montar, alta para manter conforme cresce.
- **Adequação ao Biel_Strategy:** boa só como piloto ultrarrápido; não é destino final recomendado.

### Opção B — Supabase
- **Vantagens:** banco relacional real (Postgres), SDK oficial para Next.js, Row Level Security, Edge Functions para os jobs de reenvio a Ads, caminho natural de evolução para "CRM próprio".
- **Desvantagens:** exige alguma configuração inicial (schema, RLS), projeto free pausa após inatividade prolongada.
- **Custo:** R$0 para o volume inicial de um site pessoal; US$25/mês quando crescer.
- **Complexidade:** média — mas é complexidade que se paga (queries, status, auditoria).
- **Adequação ao Biel_Strategy:** **alta** — é exatamente o meio-termo entre "grátis e simples" e "sustenta um CRM futuro".

### Opção C — CRM + automação (HubSpot free / Pipedrive / n8n)
- **Vantagens:** gestão comercial pronta (pipeline visual), integrações nativas com Google Ads/Meta em CRMs maduros, sem precisar construir UI de gestão de leads.
- **Desvantagens:** amarra a "fonte de verdade" dos dados a uma ferramenta de terceiros desde o início; Pipedrive não tem tier gratuito; automações mais ricas do HubSpot são pagas.
- **Custo:** HubSpot Free R$0 (com limites de automação); Pipedrive paga desde o primeiro usuário.
- **Complexidade:** baixa para operar, média para integrar profundamente com o site.
- **Adequação ao Biel_Strategy:** viável como **destino futuro** quando o volume de leads justificar um CRM de verdade — prematuro como primeira peça hoje.

### Opção D — Arquitetura híbrida (Supabase como fonte de verdade + automação leve para Ads)
- **Vantagens:** combina o melhor de B (dono dos dados, barato, relacional) com a automação de C (ex.: n8n ou uma Edge Function agendada) só para a etapa de reenvio a Google/Meta — sem depender de um CRM de terceiros para os dados brutos.
- **Desvantagens:** mais uma peça no sistema (o orquestrador de automação) do que a Opção B pura.
- **Custo:** o de B + custo marginal da automação (n8n self-host ~US$5-7/mês, ou Edge Function do próprio Supabase, que é R$0 dentro do free tier).
- **Complexidade:** média — mas concentra a complexidade exatamente onde ela é necessária (o job de reenvio), sem inflar o resto.
- **Adequação ao Biel_Strategy:** **alta**, e é essencialmente a Opção B evoluída — não uma arquitetura concorrente.

---

## 09. Recomendação final

### Arquitetura principal: **Supabase como armazenamento, com Edge Function/cron para o reenvio a Google Ads (Data Manager API) e Meta (Conversions API for CRM)** — Opção B/D

Motivos: custo zero para o estágio atual do Biel_Strategy, banco relacional real (essencial para o ciclo `NEW → ... → WON/LOST` e para consultas/relatórios futuros), SDK oficial e leve para integrar a um App Router do Next.js sem alterar o Design, e Row Level Security para blindar as credenciais. O reenvio a Ads fica isolado num processo assíncrono (Edge Function agendada ou acionada por webhook de mudança de status), o que já nasce alinhado com o novo requisito técnico do Google (Data Manager API a partir de junho/2026) e com a janela de deduplicação de 48h da Meta — nenhum dos dois exige resposta em tempo real no submit do formulário.

### Alternativa secundária: **Google Sheets + Apps Script**, só como piloto de validação

Se o objetivo for validar o formulário e o funil de conteúdo/copy **antes** de investir tempo em schema/RLS do Supabase, Sheets serve como ponte de curtíssimo prazo — mas deveria ser tratado como descartável, migrando para a Opção B assim que o volume ou a necessidade de status/relatório justificarem (tipicamente nas primeiras semanas de operação).

Não recomendo Firebase (redundante com Supabase, mas com modelo de dados menos adequado a relatórios de funil) nem começar direto por um CRM de terceiros (prematuro para o volume atual e amarra a base de dados a uma ferramenta externa antes de precisar).

---

## 10. Integração com o front-end — separação de camadas

A pesquisa confirma que é possível (e recomendado) manter o Design atual **intocado**, isolando quatro camadas:

```
┌─────────────────────────────────────────────┐
│ 1. UI do formulário (Design atual)           │  ← já existe / não muda
│    campos visuais, validação de UX no client │
└───────────────────┬───────────────────────────┘
                     │ onSubmit → chama a camada 2
┌────────────────────▼──────────────────────────┐
│ 2. Lógica de envio (thin handler)             │  ← novo, mínimo
│    Server Action / Route Handler do Next.js   │
└───────────────────┬───────────────────────────┘
                     │
      ┌──────────────┼───────────────┐
      ▼              ▼               ▼
┌───────────┐  ┌────────────┐  ┌──────────────┐
│ 3. Captura │  │ 4. Armazena │  │ (assíncrono) │
│ de tracking│  │ no Supabase │  │ 5. Integração │
│ (UTM/click │  │             │  │ com Ads       │
│ ids já     │  │             │  │ (job separado,│
│ salvos no  │  │             │  │ não bloqueia  │
│ client)    │  │             │  │ o submit)     │
└───────────┘  └────────────┘  └──────────────┘
```

- **Camada 1 (UI)** permanece exatamente como está — nenhuma alteração visual necessária para essa arquitetura funcionar.
- **Camada 2 (envio)** é um handler fino: valida com Zod, chama a camada 3 e 4, retorna sucesso/erro para a UI.
- **Camada 3 (tracking)** é um módulo independente que lê UTM/`gclid`/`fbclid` da URL/cookie no carregamento da página (antes mesmo do submit) — desacoplado da lógica de envio.
- **Camada 4 (armazenamento)** é uma função repositório (`salvarLead(...)`) que abstrai o Supabase — troca de banco no futuro não vaza para a UI.
- **Camada 5 (integração com Ads)** roda fora do ciclo de request/response do formulário — é um job agendado ou disparado por mudança de status, nunca síncrono ao submit.

Essa separação é o que permite implementar o sistema depois **sem tocar em nenhum componente visual já aprovado**.

---

## 11. Segurança

- **Validação/sanitização:** Zod como padrão de fato para schemas de request no Next.js — validação real acontece no server, nunca só no client.
- **Rate limiting:** por IP, centralizado em `middleware.ts` (evita duplicar em cada handler); geralmente apoiado em um contador persistente (ex.: Upstash Redis) porque funções serverless não mantêm estado entre invocações.
- **Honeypot:** campo invisível que só bots preenchem — útil, mas insuficiente sozinho (bots avançados enviam POST direto no endpoint, pulando o formulário React inteiro).
- **CAPTCHA/Turnstile:** Cloudflare Turnstile é a escolha mais citada para 2026 (gratuito, sem cookies, majoritariamente invisível); reCAPTCHA segue válido se já há dependência do ecossistema Google. Verificação do token **sempre no server**, nunca só no client.
- **Segredos:** nunca em variáveis `NEXT_PUBLIC_*` (essas vão para o bundle do browser); credenciais (service role key do Supabase, tokens de API de Ads) só em variáveis server-only, referenciadas apenas dentro do handler/Edge Function que as usa.
- **CORS:** API routes do Next.js já seguem same-origin por padrão; se for preciso liberar explicitamente, usar allowlist comparando o header `Origin`, nunca `*` com credenciais. CORS não substitui autenticação — client não-browser ignora CORS.
- **Camadas, não uma bala de prata:** a combinação honeypot + validação server-side + rate limiting (+ Turnstile se houver abuso real) é o padrão recomendado — nenhuma técnica isolada é suficiente.

---

## 12. Privacidade / LGPD (requisitos técnicos — não é parecer jurídico)

- **Consentimento (Art. 7º/8º, Lei 13.709/2018):** quando a base legal for consentimento, ele precisa ser uma ação afirmativa e separada (checkbox **não pré-marcado**), com finalidade específica e informada — não um texto genérico de "aceito os termos". O sistema deve **registrar evidência** do consentimento: timestamp, versão do texto aceito.
- **Política de privacidade:** deve estar acessível a partir do próprio formulário e **citar nominalmente** o compartilhamento de dados com Google Ads/Meta (via hash), não só um texto genérico de rastreamento. Não há checklist único oficial da ANPD encontrado para o conteúdo mínimo — recomenda-se validação jurídica.
- **Retenção:** a LGPD não define prazo numérico fixo para leads de marketing — o sistema deve suportar um campo de data de coleta e permitir expurgo/anonimização automatizado após um período a ser definido pela política de privacidade (decisão de negócio/jurídica, não técnica).
- **Exclusão/portabilidade (Art. 18):** a arquitetura escolhida precisa suportar, no mínimo: localizar todos os registros de um titular por e-mail/telefone, apagar ou anonimizar sob demanda, e exportar em formato legível (JSON/CSV). Um banco relacional (Supabase) faz isso com uma query; Sheets exige busca manual.
- **Dado hasheado enviado a Google/Meta — é dado pessoal?** Não há posicionamento direto e explícito da ANPD encontrado na pesquisa. Hash SHA-256 não-salgado de um e-mail é reversível por força bruta/dicionário — a leitura técnica prudente (alinhada à interpretação europeia de GDPR) é tratar como **dado pessoal pseudonimizado**, não anonimizado, e portanto ainda sujeito à LGPD. **Este ponto específico precisa de validação jurídica antes da implementação.**

**Fontes:** [Lei 13.709/2018 (Planalto)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) · [Direitos do titular — ANPD](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares) · [FAQ ANPD (PDF oficial)](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/201105-faq-anpd-finalrev.pdf/@@display-file/file) · [Art. 18 — LGPD Brasil](https://lgpd-brasil.info/capitulo_03/artigo_18) · [Art. 7º/8º — LGPD Brasil](https://lgpd-brasil.info/capitulo_02/artigo_07) · [Como ajudar usuários a obedecer à LGPD — Google Ads Help](https://support.google.com/google-ads/answer/9943919?hl=pt-BR)

---

## 13. Fontes (consolidado)

**Google (oficial):** support.google.com/google-ads (Enhanced Conversions for Leads, GTM config, Data Manager, offline conversion imports, consent mode), developers.google.com/google-ads/api, developers.google.com/tag-platform, ads-developers.googleblog.com, privacysandbox.google.com.

**Meta (oficial):** developers.facebook.com/docs/marketing-api/conversions-api (get started, parameters, gateway), developers.facebook.com/documentation/ads-commerce (CRM integration), developers.facebook.com/docs/meta-pixel, facebook.com/business/help (about CAPI, deduplication).

**Armazenamento (mistas — sinalizadas onde não-oficiais):** developers.google.com/workspace/sheets/api/limits (oficial), documentação de pricing de Supabase/Firebase (fontes de mercado, 2026), business.com e comparativos de mercado para HubSpot/Pipedrive/n8n.

**LGPD (oficial + mercado):** planalto.gov.br (texto da lei), gov.br/anpd (direitos do titular, FAQ oficial), lgpd-brasil.info (compilado não-oficial mas amplamente usado como referência de artigos).

**Segurança (mercado/comunidade, sem fonte "oficial" única por ser prática de engenharia):** guias técnicos 2025/2026 sobre rate limiting, CORS e variáveis de ambiente em Next.js, e comparativos Turnstile vs reCAPTCHA.

*(Lista completa de URLs por tópico está inline em cada seção acima.)*

---

## 14. Resultado

### ARQUITETURA RECOMENDADA

```
                         VISITANTE
                             │
                             ▼
          (Camada 3) captura UTM / gclid / fbclid
             na URL de chegada → cookie 1ª parte
                             │
                             ▼
                  UI do FORMULÁRIO (Design atual, intocado)
                             │  onSubmit
                             ▼
        (Camada 2) Server Action / Route Handler — Next.js
             valida (Zod) + honeypot + rate limit
                             │
                             ▼
        (Camada 4) grava em SUPABASE (Postgres)
        lead_id, dados de contato, UTMs, gclid/fbclid,
        consent + timestamp, status = NEW
                             │
              ┌──────────────┴───────────────┐
              ▼                               ▼
     time comercial atualiza          (assíncrono, não bloqueia
     status manualmente                 o submit do formulário)
     NEW→CONTACTED→QUALIFIED→
        PROPOSAL→WON/LOST
              │
              ▼
   (Camada 5) Edge Function / cron agendado
   lê leads com status alterado + gclid/fbclid presentes
   normaliza + hasheia (SHA-256) e-mail/telefone
              │
      ┌───────┴────────┐
      ▼                ▼
 Google Ads:        Meta Ads:
 Data Manager API   Conversions API for CRM
 (Enhanced          (evento associado ao
 Conversions for    Lead ID / email+phone
 Leads)             hash)
```

### Por que essa arquitetura?

Supabase dá um banco relacional real por custo zero no estágio atual, com caminho direto de crescimento para "CRM próprio" sem re-arquitetar nada — e o reenvio a Google/Meta acontece isolado, como processo assíncrono, o que já é compatível com a mudança do Google para a Data Manager API (junho/2026) e com a janela de deduplicação de 48h da Meta (que de qualquer forma não se aplica a um evento de qualificação enviado dias depois).

### O que será necessário posteriormente (fora do escopo desta pesquisa)

- Desenhar o schema real da tabela `leads` no Supabase (incluindo índices e RLS).
- Escrever o handler de submit (Camada 2) e o módulo de captura de tracking (Camada 3).
- Escrever a Edge Function/cron de reenvio a Ads (Camada 5), incluindo a lógica de hashing SHA-256.
- Decidir e implementar a UI de gestão de status do lead (painel interno simples, ou uso direto do editor de tabelas do Supabase no início).

### O que precisa ser configurado manualmente (fora do código)

- Conta no Supabase + criação do projeto.
- No Google Ads: ativar Enhanced Conversions for Leads na conta, configurar Consent Mode v2 no site (se ainda não houver), e (quando disponível) configurar a conexão via Data Manager.
- No Meta: configurar o Pixel + CAPI no Events Manager, obter o token de acesso da Conversions API, configurar a integração Conversions API for CRM.
- Redigir/ajustar a política de privacidade citando explicitamente o compartilhamento com Google Ads/Meta (revisão jurídica).
- Definir a política de retenção/expurgo de leads (decisão de negócio + jurídica).

### O que será implementado no código (quando for a hora de implementar — fora do escopo desta pesquisa)

- Camadas 2 a 5 descritas na seção 10 — todas server-side/backend, nenhuma mudança na Camada 1 (UI/Design).

### O que fica fora do frontend

- Toda credencial (Supabase service role key, tokens de Google Ads/Meta) — só em variáveis de ambiente server-only.
- Toda lógica de hashing SHA-256 e chamada às APIs de Ads — roda em Edge Function/cron, nunca no client.
- Regras de rate limiting e verificação de CAPTCHA/Turnstile — validadas no server.

### Quais informações ainda precisam ser decididas

- `[VALIDAR]` Qual plataforma de anúncios entra primeiro (Google Ads, Meta Ads, ou ambas desde o início) — afeta a ordem de implementação da Camada 5.
- `[VALIDAR]` Prazo de retenção de leads não convertidos (decisão de negócio + jurídica).
- `[VALIDAR]` Se have alguém dedicado a atualizar manualmente o status do lead (`CONTACTED`→`WON`/`LOST`) ou se isso precisa de uma UI própria desde o início.
- `[VALIDAR]` Texto final de consentimento e política de privacidade (revisão jurídica antes de publicar).
- `[VALIDAR]` Se `conversion_value` será usado (exige decidir se/como expor valor de negócio, respeitando a governança de dados financeiros já definida no `RESEARCH.md`).

---

**Encerramento:** este é um relatório de pesquisa. Nenhum código, componente, estilo, dependência ou arquivo do projeto (`RESEARCH.md`, `IMPLEMENTATION.md`, `src/`) foi alterado.
