# Biel_Strategy — Implementation

## 1. Objetivo

Este documento estabelece as diretrizes arquiteturais, técnicas e operacionais para a implementação do projeto Biel_Strategy. Ele atua como um **contrato técnico entre o `RESEARCH.md` e o Design Aprovado**:

* O **`RESEARCH.md`** é a fonte de verdade sobre *o que* o Biel_Strategy é, seus fatos, projetos, trajetória e competências.
* O **Design Aprovado** é a fonte de verdade visual e experiencial: define com precisão o layout, composição, hierarquia, tipografia, paleta de cores, proporções, espaçamentos e identidade visual.
* O **`IMPLEMENTATION.md`** define *como* transformar esse Design em uma experiência web real, funcional, responsiva, performática, acessível e sustentável, preservando a essência do Research.

O papel da implementação (executada via Claude Code) é dar vida ao Design aprovado com **máxima fidelidade**, utilizando o Research como fonte de verdade para todo o conteúdo textual e estratégico.

---

## 2. Contexto e Posicionamento Estratégico

A experiência digital não deve seguir os formatos convencionais de:
* Portfólio genérico de desenvolvedor (dominado por logos, badges e jargões puramente técnicos);
* Site tradicional de agência ou serviços de marketing;
* Landing page padronizada de gestor de tráfego;
* Dashboard ou SaaS;
* Currículo convencional / template de freelancer.

A hierarquia conceitual obrigatória é:

```
MARKETING (Eixo Protagonista)
   ↓
TECNOLOGIA (Segundo Eixo / Diferencial de Engenharia)
   ↓
INTELIGÊNCIA ARTIFICIAL (Camada Complementar / Acelerador)
   ↓
BASE TÉCNICA (Fundação de Redes, Infraestrutura e Lógica)
```

A **trajetória profissional** é o fio condutor que conecta esses pilares. A tecnologia e a inteligência artificial não aparecem como produtos isolados ou mero exibicionismo técnico, mas como as ferramentas que Biel utiliza para resolver gargalos críticos de marketing, conversão e geração de negócios.

---

## 3. Princípios Fundamentais de Engenharia e Design Fidelity

1. **Regra de Design Fidelity (Fidelidade Absoluta):** O Design aprovado é a autoridade visual e de experiência definitiva. O implementador (Claude Code) deve executá-lo com máxima fidelidade. **Implementar não significa redesenhar, reinterpretar ou simplificar.** É expressamente vedado alterar por iniciativa própria o layout, a composição, a hierarquia, a tipografia, as cores, os espaçamentos, as proporções, a estrutura das seções, o posicionamento dos elementos ou a identidade visual. Eventuais desafios técnicos devem ser solucionados exclusivamente por meio de engenharia, preservando intacta a intenção visual original. Qualquer alteração visual só poderá ocorrer mediante solicitação explícita.
2. **Separação Rígida entre Conteúdo, Apresentação e Experiência:** Manter dados (Research), componentes estruturais (Design) e interações (Animações/Scroll) desacoplados para permitir manutenção e evolução sem quebras.
3. **Alto Impacto com Baixa Complexidade Desnecessária:** Priorizar soluções nativas e leves; efeitos visuais e microinterações devem servir à narrativa do Design aprovado e não à demonstração vazia de tecnologia.
4. **Respeito aos Dados Reais:** Nenhuma métrica, cliente, case, cargo ou nível de domínio técnico deve ser inflado ou inventado além do que está expressamente suportado no `RESEARCH.md`.

---

## 4. Arquitetura Técnica

A arquitetura deve priorizar sustentabilidade, performance em Core Web Vitals e modularidade.

### 4.1 Stack Tecnológica e Critérios
* **Ecossistema:** Baseado em ecossistema moderno em TypeScript/JavaScript (Next.js App Router ou Vite + React, conforme o ambiente do projeto).
* **Estilização:** Sistema de estilização utilitário e baseado em tokens (Tailwind CSS / Vanilla CSS moderno com variáveis), garantindo customização total para absorver com exatidão os tokens definidos pelo Design aprovado.
* **Interações:** Biblioteca de animação focada em composição declarativa e performance de GPU (GSAP com ScrollTrigger e/ou Framer Motion), utilizada para dar vida às interações previstas no Design.
* **Estrutura Modular:** Código desacoplado em camadas claras (`data/`, `components/`, `hooks/`, `layouts/`).

### 4.2 Arquitetura de Navegação
A experiência estrutura-se conforme o fluxo concebido no Design aprovado (arquitetura contínua e narrativa, com suporte modular para seções ou subpáginas quando aplicável), assegurando carregamento instantâneo e transições fluidas.

---

## 5. Separação entre Conteúdo, Apresentação e Experiência

Para garantir fidelidade ao Design aprovado e manutenibilidade contínua, a implementação adota três camadas independentes:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. CAMADA DE CONTEÚDO (Data Layer)                          │
│ Fontes tipadas com dados do RESEARCH.md (projetos, bio, etc)│
└──────────────────────────────┬──────────────────────────────┘
                               │ alimenta
┌──────────────────────────────▼──────────────────────────────┐
│ 2. CAMADA DE APRESENTAÇÃO (Presentation Layer)              │
│ Componentes semânticos e fiéis ao DESIGN APROVADO           │
└──────────────────────────────┬──────────────────────────────┘
                               │ orquestra
┌──────────────────────────────▼──────────────────────────────┐
│ 3. CAMADA DE EXPERIÊNCIA (Interaction / Motion Layer)       │
│ Animações, GSAP/ScrollTrigger, transições e microações      │
└─────────────────────────────────────────────────────────────┘
```

* **Camada de Conteúdo (`src/data/`):** Estruturas de dados tipadas (TypeScript) que refletem fielmente o `RESEARCH.md` (trajetória, competências de marketing, projetos, stack, certificações). Atualizações de texto ou novos cases não afetam o layout visual.
* **Camada de Apresentação (`src/components/`):** Componentes semânticos que implementam com rigor a composição visual, proporções e tipografia estabelecidas no Design aprovado.
* **Camada de Experiência (`src/animations/` ou `src/hooks/`):** Wrappers, triggers de scroll e regras de interação que conferem dinamismo e ritmo cinematográfico sem misturar lógica de animação pesada dentro da semântica do markup.

---

## 6. Arquitetura de Conteúdo

A infraestrutura de dados deve modelar as entidades descritas no Research de forma estruturada:

* **Identidade & Posicionamento:** Nome profissional, marca (Biel Strategy), tese central e proposta de valor como Estrategista de Aquisição & Soluções Digitais.
* **Trajetória (The Journey):** Marcos cronológicos e lógicos (Base Técnica/Redes → Tráfego de Intenção → Gargalo de Páginas → Engenharia Web → IA & Automação).
* **Marketing (Eixo Principal):** Competências de tráfego (Google Ads, Meta Ads), funis de conversão, qualificação progressiva, análise de métricas reais e otimização contínua.
* **Tecnologia Aplicada:** Soluções de engenharia frontend (Next.js, React, Tailwind, TypeScript) voltadas a resolver lentidão e atrito de conversão.
* **Inteligência Artificial:** Aplicações de automação comercial e enriquecimento (Claude SDK, Gemini, Ollama, engenharia de prompts estruturados).
* **Projetos e Casos Reais:** Detalhamento conforme as evidências do Research (Studio Unna, Máquina de Aquisição VSL, Lead Radar, VYRO).
* **Formação e Credenciais:** Graduação em andamento e certificações auditáveis com status claro (concluído, em andamento, planejado).
* **Toolkit / Arsenal Técnico:** Tecnologias organizadas pela hierarquia estratégica (Marketing → Tech → IA → Automação → Base).
* **Visão / Presente:** O que está sendo desenvolvido e direcionamento futuro.
* **Contato / Ação:** Pontos de contato profissionais diretos (WhatsApp comercial, perfis profissionais).

---

## 7. Estrutura de Componentes

Os componentes devem ser semânticos, modulares e estruturados para reproduzir fielmente os blocos e composições determinados pelo Design aprovado, preservando alta manutenibilidade.

### Componentes Sugeridos:
* **`Navigation`:** Controle de navegação e pontos de ancoragem, adaptável ao layout e comportamento aprovados no Design.
* **`Hero`:** Região de impacto inicial que materializa a tipografia, proporções e chamadas para ação do Design aprovado.
* **`Section`:** Wrapper padronizado que gerencia os espaçamentos exatos, limites de leitura e semântica de seção (`<section>`).
* **`Journey`:** Mecanismo estrutural para comportar a evolução temporal/lógica conforme diagramada no Design aprovado.
* **`CapabilityShowcase`:** Componente versátil para expor disciplinas de marketing, diferenciais tecnológicos ou aplicações de IA com a hierarquia visual definida.
* **`ProjectCard / ProjectView`:** Componente para representação de cases e estudos de operação com suporte a contexto, problema, solução, tecnologias e métricas.
* **`CredentialList`:** Estrutura flexível para exibir formação acadêmica e certificações com seus respectivos status.
* **`ToolGroup`:** Apresentação categorizada de ferramentas do toolkit técnico.
* **`ActionCall / CTA`:** Elemento de fechamento comercial e direcionamento para conversa direta.
* **`Footer`:** Encerramento institucional com créditos e links institucionais.
* **`AnimationWrapper`:** Componentes de alta ordem (HOCs) ou hooks para encapsular efeitos de reveal, scroll e transição de estado sem poluir o markup semântico.

---

## 8. Animações, Interações e Scroll Storytelling

O sistema deve materializar a experiência cinematográfica e fluida definida pelo Design aprovado, orientada à narrativa e sem excessos.

### 8.1 Diretrizes de Animação
* **Propósito Narrativo:** Animações existem exclusivamente para conduzir a leitura, enfatizar contrastes de valor e dar fluidez, nunca como demonstração vazia de código.
* **Fidelidade ao Design Aprovado:** O Design aprovado determina o momento, tipo (fade, reveal, scale, parallax, spring) e intensidade de cada interação.
* **Uso de GSAP + ScrollTrigger:** O ecossistema **GSAP + ScrollTrigger** (ou bibliotecas complementares de alta performance como Framer Motion / Motion) pode ser plenamente utilizado para materializar, sincronizar e aprimorar a experiência visual e narrativa estabelecida pelo Design aprovado. O uso de GSAP deve assegurar física refinada e controle temporal preciso, sem transformar a implementação em um redesign e sem adicionar efeitos supérfluos desprovidos de propósito narrativo.
* **Performance de GPU:** Animar estritamente propriedades não bloqueantes do ciclo de renderização (`transform`, `opacity`).
* **Preservação do Scroll:** O scroll storytelling, quando presente (capítulos persistentes, timeline progressiva, transições de estado por viewport), deve respeitar a física de rolagem nativa e **evitar scroll hijacking agressivo**.

---

## 9. Responsividade e Adaptação de Contexto

A experiência deve refletir as especificações de responsividade definidas no Design aprovado, concebida como uma adaptação autêntica a cada dispositivo:

* **Desktop:** Fidelidade total ao ritmo editorial, composições imersivas, proporções display e eventuais microinterações sutis.
* **Tablet:** Reorganização equilibrada de colunas e manutenção da hierarquia de leitura estipulada pelo Design.
* **Mobile:**
  * Prioridade absoluta para velocidade, legibilidade imediata e ergonomia de toque.
  * Alvos de toque mínimos de 48px × 48px para botões de conversão e menus.
  * Eliminação de elementos dependentes de mouse (cursores personalizados, hover states indispensáveis).
  * Conversão de estruturas horizontais em fluxos verticais naturais conforme o layout mobile aprovado.

---

## 10. Performance e Qualidade Técnica

A meta é garantir um site veloz e leve, mantendo a integridade visual aprovada:

* **Carregamento Inicial Otimizado:** Priorização dos recursos críticos da primeira dobra para entrega imediata do conteúdo textual.
* **Tratamento de Mídia:** Imagens em formatos modernos (WebP, AVIF) com dimensionamento explícito para evitar Layout Shift (CLS).
* **Gerenciamento de Bundle:** Code splitting em componentes pesados e importação modular seletiva de bibliotecas (ex: plugins do GSAP).
* **Prevenção de Travamentos:** Handlers de eventos passivos e ausência de cálculos complexos no thread principal durante a rolagem.

---

## 11. Acessibilidade (A11y)

Uma experiência moderna e cinematográfica deve ser acessível a todos os usuários:

* **Navegação por Teclado:** Ordem lógica de foco (tabindex natural) e indicadores visíveis de foco ativo em todos os elementos interativos.
* **Leitores de Tela e Semântica:** Uso correto da árvore semântica do HTML5 (`<h1>` a `<h6>`, `<main>`, `<nav>`, `<article>`), rótulos ARIA para elementos iconográficos e texto alternativo expressivo para imagens.
* **Respeito a Preferências do Usuário:** Suporte nativo à consulta `@media (prefers-reduced-motion: reduce)`, desligando transições e animações contínuas quando solicitado pelo sistema do usuário.
* **Contraste de Cores:** Manutenção de taxa mínima de contraste (WCAG AA — 4.5:1 para texto normal) preservando a paleta visual do Design aprovado.

---

## 12. SEO e Indexação

* **Estrutura de Metadados:** Título e descrição que comuniquem com exatidão o posicionamento (`Biel Strategy | Marketing de Aquisição, Tecnologia & IA`).
* **Hierarquia Semântica:** Distribuição clara de cabeçalhos refletindo a prioridade temática (Marketing no centro).
* **Social Graph:** Suporte completo a tags Open Graph (OG) e Twitter Cards para renderização profissional de links em redes e mensageiros (WhatsApp, LinkedIn).
* **Rastreabilidade:** Conteúdo principal renderizado de forma legível para crawlers de motores de busca.

---

## 13. Governança e Privacidade dos Dados

A implementação deve seguir regras rigorosas de proteção de dados sensíveis:

* **Informações Públicas:** Biografia profissional, metodologia conceitual de funil, competências técnicas e conceitos dos projetos próprios (Lead Radar, VYRO, Máquina VSL).
* **Casos com Clientes (ex: Studio Unna):** Apresentação restrita à estratégia de busca local, funil e raciocínio metodológico. **Proibição expressa de exibir faturamento, orçamento diário de campanhas, dados privados de clientes ou taxas financeiras confidenciais.**
* **Segurança de Código:** Bloqueio total de inclusão de credenciais, chaves de API (`ANTHROPIC_API_KEY`, etc.), rotinas internas de scraping ou dados confidenciais nos arquivos do cliente frontend.
* **Dados Pessoais:** Evitar exposição de dados de contato estritamente pessoais desnecessários.

---

## 14. Modelagem Estruturada de Projetos

A arquitetura deve permitir que cada projeto ou estudo de caso seja armazenado como um objeto estruturado contendo:

* `id`: Identificador único;
* `title`: Nome do projeto ou denominação do case;
* `category`: Categoria de atuação (ex: Marketing de Aquisição, Engenharia Frontend, Inteligência Comercial);
* `context`: Cenário inicial e segmento atendido;
* `problem`: O gargalo comercial ou técnico diagnosticado;
* `approach`: A estratégia adotada conectando os eixos da trajetória;
* `solution`: O que foi construído tecnicamente ou operado em mídia;
* `results`: Indicadores validados (quando disponíveis no Research);
* `technologies`: Ferramentas e tecnologias envolvidas;
* `status`: Nível de exposição permitido (`PUBLIC` ou `PUBLIC_WITH_APPROVAL`).

Campos não preenchidos ou sem validação no Research não devem ser inventados.

---

## 15. DESIGN HANDOFF (Protocolo de Absorção do Design Aprovado)

Estando o Design do Biel_Strategy já criado, refinado e aprovado, o implementador deve seguir o seguinte protocolo de absorção e fidelidade:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. ANÁLISE DO DESIGN APROVADO                               │
│ Extração fiel de tokens (cores, fontes, espaçamentos, grid) │
└──────────────────────────────┬──────────────────────────────┘
                               │ mapeia
┌──────────────────────────────▼──────────────────────────────┐
│ 2. MAPEAMENTO: DESIGN APROVADO → COMPONENTES                │
│ Construção da estrutura semântica correspondente a cada tela│
└──────────────────────────────┬──────────────────────────────┘
                               │ integra
┌──────────────────────────────▼──────────────────────────────┐
│ 3. CONEXÃO COM A CAMADA DE DADOS                            │
│ Injeção estrita do conteúdo validado no RESEARCH.md         │
└──────────────────────────────┬──────────────────────────────┘
                               │ anima
┌──────────────────────────────▼──────────────────────────────┐
│ 4. COREOGRAFIA DE EXPERIÊNCIA (GSAP / SCROLLTRIGGER)        │
│ Materialização das interações definidas no Design           │
└──────────────────────────────┬──────────────────────────────┘
                               │ valida
┌──────────────────────────────▼──────────────────────────────┐
│ 5. VALIDAÇÃO VISUAL RIGOROSA                                │
│ Confronto direto entre Design aprovado e código executado   │
└─────────────────────────────────────────────────────────────┘
```

### Regras do Handoff e Validação Visual:
1. **Fidelidade Visual 1:1:** O implementador deve traduzir a experiência visual com máxima precisão de layout, tipografia, pesos, cores e respiros. Não é permitido simplificar o Design sob pretexto de facilidade de código.
2. **Desafios Técnicos Solucionados na Engenharia:** Caso algum comportamento ou elemento gráfico encontre restrições de ambiente ou browser, o desafio deve ser resolvido tecnicamente, preservando intacta a intenção visual aprovada.
3. **Etapa de Validação Visual Contínua:** Antes de considerar qualquer seção como concluída, realiza-se a comparação visual direta entre a implementação e o Design aprovado, corrigindo quaisquer desvios de alinhamento, escala ou contraste.
4. **Conteúdo do Research:** O Design organiza a forma e a estética; o conteúdo textual provém unicamente do `RESEARCH.md`.

---

## 16. Ordem de Implementação Técnica

O fluxo de desenvolvimento deve seguir uma sequência técnica estável, guiada pelo Design aprovado:

* **FASE 1 — Fundação e Arquitetura:** Configuração do ambiente, ferramentas de build, tipagem central e estrutura de diretórios.
* **FASE 2 — Camada de Conteúdo:** Estruturação dos dados e textos validados a partir do `RESEARCH.md`.
* **FASE 3 — Sistema Visual e Tokens:** Configuração exata de tipografia, paleta de cores, espaçamentos e estilos base extraídos diretamente do Design aprovado.
* **FASE 4 — Estrutura e Componentes:** Construção dos componentes semânticos e montagem das seções reproduzindo fielmente o Design aprovado.
* **FASE 5 — Camada de Experiência:** Implementação de microinterações, transições e regras de scroll storytelling utilizando GSAP + ScrollTrigger ou Motion.
* **FASE 6 — Responsividade e Adaptação Mobile:** Refinamento ergonômico para smartphones e tablets conforme as diretrizes do Design.
* **FASE 7 — Acessibilidade e Semântica:** Validação de navegação por teclado, leitor de telas, contraste e tags ARIA.
* **FASE 8 — SEO e Metadados:** Inclusão de tags Open Graph, títulos, descrições e semântica adequada.
* **FASE 9 — Performance e Otimização:** Auditoria de carregamento, compressão de assets e lazy loading.
* **FASE 10 — Validação Visual e QA:** Testes integrados de experiência, validação visual comparativa rigorosa com o Design aprovado e alinhamento com os critérios de aceitação.

---

## 17. Critérios de Aceitação da Implementação

A entrega técnica final será considerada completa se atender aos seguintes requisitos:

* **Fidelidade Absoluta ao Design:** A experiência implementada expressa com rigor o layout, composição, hierarquia, tipografia, cores, espaçamentos e interações do Design aprovado, sem desvios, simplificações ou alterações não autorizadas.
* **Comunicação do Posicionamento:** O usuário compreende imediatamente o papel de Gabriel como Estrategista de Aquisição & Soluções Digitais.
* **Hierarquia Clara:** O Marketing é percebido como o protagonista, apoiado pela Tecnologia e acelerado pela IA.
* **Fidelidade ao Research:** Todo o conteúdo apresentado é verídico, fundamentado e livre de invenções.
* **Fluidez e Responsividade:** Navegação impecável em todas as resoluções sem travamentos no scroll.
* **Sustentabilidade de Código:** Separação limpa entre dados, componentes e animações, facilitando atualizações futuras.
* **Proteção de Dados:** Nenhuma informação privada, credencial ou dado confidencial de cliente é exposto.

---

## 18. Pontos Pendentes de Validação (`[VALIDAR]`)

Informações que permanecem marcadas para confirmação durante a evolução do projeto:

* `[VALIDAR]` Sobrenome oficial para metadados e comunicação institucional (ou se a assinatura será estritamente Gabriel / Biel Strategy).
* `[VALIDAR]` Número oficial de WhatsApp para o roteamento do CTA de contato.
* `[VALIDAR]` Links finais de perfis públicos (LinkedIn, GitHub).
* `[VALIDAR]` Denominação exata e instituição do curso de graduação em andamento em TI.
* `[VALIDAR]` Links e credenciais auditáveis de certificações (Google Skillshop, Coursera, etc.).
* `[VALIDAR]` Confirmação final da menção explícita ao nome "Studio Unna Nail Spa" vs. uso de denominação institucional genérica.

---

## 19. Próxima Etapa

Com o **Design do Biel_Strategy devidamente criado, refinado e aprovado**, e o **`RESEARCH.md` consolidado como fonte de conteúdo**, a próxima etapa é a **execução técnica da implementação no código pelo Claude Code**, iniciando pela FASE 1 (Fundação e Arquitetura) e aplicando o protocolo de Handoff com validação visual contínua e fidelidade estrita ao Design aprovado.
