# BIEL STRATEGY — Design System

Sistema de design da **BIEL STRATEGY**, consultoria de **Google Ads & Estratégia Digital** que vende por meio de **propostas comerciais** apresentadas ao cliente. O material de origem é uma proposta real para o **Studio Unna Nail Spa** (Mandaqui, São Paulo).

O produto da marca, na prática, é **a própria apresentação**: uma peça editorial escura, minimalista, com muito espaço negativo, tipografia branca grande e um único acento carmesim. Ela precisa parecer consultoria estratégica de alto nível — nunca um orçamento comum.

## Fontes usadas para montar este sistema
- `uploads/Proposta Comercial BIEL STRATEGY.pdf` — 10 páginas, enviado pelo usuário. Como o PDF não tem camada de texto, cada página foi rasterizada e lida visualmente; as páginas ficaram em `scraps/page-01…10.png`.
- `uploads/Use_the_attached_animated_grap.mp4` — vídeo do gráfico de crescimento (slide "Como a estratégia evolui"), copiado para `assets/video/evolucao-estrategica.mp4`.
- Instruções escritas do usuário sobre estética, animação e a regra do verde.
- **Não houve** acesso a Figma, código-fonte, guia de marca ou arquivos de fonte/logo.

## Estrutura do deck de origem (10 slides)
1. Capa — PROPOSTA COMERCIAL · Google Ads & Estratégia Digital · Studio Unna Nail Spa
2. Sua cliente já está **procurando.** — argumento de intenção + foto + funil BUSCA→OPORTUNIDADE
3. Aparecer. Atrair. **Converter.** — três cards + citação
4. Gestão completa **do Google Ads** — lista de escopo + foto sangrada
5. Primeiro, vamos entender **o que funciona.** — ciclo de 6 etapas
6. Decisões baseadas em **dados.** — 6 métricas + citação
7. Como a estratégia **evolui** — gráfico animado (vídeo) + 3 meses
8. **Investimento** — R$ 1.000 riscado, condição R$ 735,40 em verde
9. Fechamento — frase de virada + assinatura + "Vamos começar?"
10. Image sources — créditos das imagens

---

## CONTENT FUNDAMENTALS

**Idioma:** português do Brasil, sempre. Nada de inglês além de termos técnicos consagrados (Google Ads, CTR, CPC, WhatsApp) e do título da página de créditos ("Image sources", mantido como está no original).

**Voz:** a agência fala como especialista sereno, não como vendedor. Usa **"nós implícito"** — "Vamos analisar", "O objetivo do Google Ads é…" — e trata o cliente pelo nome próprio ("o Studio Unna", "sua cliente"). Nunca usa "eu". Nunca usa "a gente".

**Estrutura das frases:** curtas, afirmativas, uma ideia por frase. Parágrafos de 2 a 3 linhas no máximo. O texto explica um conceito e para.

**Títulos:** caixa alta, tom declarativo, quase sempre com **ponto final** — "APARECER. ATRAIR. CONVERTER." A última palavra (ou o último bloco) vai em carmesim: "SUA CLIENTE JÁ ESTÁ **PROCURANDO.**", "DECISÕES BASEADAS EM **DADOS.**" Esse é o gesto verbal-visual mais característico da marca.

**Citações:** cada slide de conceito fecha com uma frase entre aspas retas, em itálico, duas linhas, com filete carmesim à esquerda — "Os números não servem apenas para mostrar o que aconteceu. Servem para decidir o que fazer depois."

**Rótulos e etapas:** substantivos ou verbos no infinitivo, uma palavra, caixa alta com tracking largo — BUSCA, ANÚNCIO, CLIQUE, CONTATO, OPORTUNIDADE / ESTRUTURAR, TESTAR, MEDIR, OTIMIZAR, APRENDER, REINVESTIR.

**Números e dinheiro:** padrão brasileiro — R$ 735,40, R$ 1.000/mês. Valores riscados mostram a âncora de preço.

**Ressalvas:** aparecem em bloco próprio, abertas por **\*Importante:** em negrito, com o ponto sensível em caixa alta ("a verba… **NÃO** está incluída"). A marca é transparente sobre o que não está no preço.

**CTA:** um só, em forma de pergunta convidativa — "Vamos começar?".

**Emoji: nunca.** Não há um único emoji no material original e eles quebrariam o tom.

**O que evitar:** superlativos ("o melhor", "incrível"), promessas de resultado, jargão de growth, exclamações, ícones decorativos, texto em bloco corrido.

---

## VISUAL FOUNDATIONS

**Fundo.** Preto quase puro (`#0A0A0A`), plano, em 100% dos slides. Uma textura de ruído sutil (pontos de 1px a 2,5% de branco) evita o banding em telas grandes. **Nunca** gradiente decorativo de fundo; o único gradiente permitido é o de proteção sobre foto.

**Cor.** Três camadas apenas: preto/cinzas, branco, carmesim `#E21D48`. O carmesim é raro e proposital — última palavra do título, filete de 2px, seta ↓, bullet de 7px, círculo da etapa, borda do CTA, termo da métrica. Nada é colorido "para decorar".

**Regra do verde (obrigatória).** Verde é **proibido** em toda a apresentação, com uma única exceção: o valor `R$ 735,40` no slide de Investimento, em `--verde-valor #24B888`. Isso está codificado no sistema: só o componente `ValueFigure` usa esse token. Estados de sucesso, confirmação e "check" usam carmesim ou branco.

**Tipografia.** Títulos em **Montserrat 800**, caixa alta, tracking -2%, entrelinha 1.02–1.14, com quebras de linha manuais que constroem o ritmo. Corpo em **Inter 400**, 15–19px, entrelinha 1.7, cinza `#B3B3B3`, medida máxima ~64 caracteres. Rótulos em Inter 700, 11–14px, caixa alta, tracking .18–.22em. Uma citação em itálico é a única inflexão de estilo.

**Espaçamento.** Escala base 4px. Margem de slide fixa em ~8% da largura (104px em 1280). O espaço negativo é o principal indicador de "alto padrão": um slide com quatro elementos e metade da área vazia é o padrão, não a exceção.

**Cards.** Fundo `#141414`, borda hairline `#242424` de 1px, **cantos praticamente retos** (2px), **sem sombra**. Variante de conceito ganha filete carmesim de 2px no topo e um número fantasma ("01") a 4,5% de branco atrás do título. Mídia é a única coisa com raio maior (12px).

**Sombras.** Praticamente inexistentes. Em fundo preto, a separação vem da borda de 1px, não de sombra. Sombra só em elementos flutuantes (modal, toast), e sempre difusa e preta — nunca "elevação" cinza.

**Fotografia.** Escura, quente, contrastada, com foco fechado (rosto, mãos). Nunca clara, nunca corporativa de banco de imagens. Duas aplicações: quadrada com raio de 12px ao lado do texto, ou sangrada até a borda com **gradiente de proteção** horizontal (`--protect-left`) para o texto respirar. Texto nunca fica sobre foto sem proteção.

**Transparência e blur.** Só no scrim de modal (preto a 72% + blur 12px). Nada de "glassmorphism".

**Animação.** Uma única gramática: **fade-in + subida de 18px**, 900ms, `cubic-bezier(.16,1,.3,1)`, escalonada em 90ms entre elementos irmãos. Sem bounce, sem zoom, sem parallax, sem rotação. Transição entre slides é a rolagem com scroll-snap. O gráfico do slide 7 é vídeo em `autoplay loop muted playsinline`, que pausa quando sai da tela. `prefers-reduced-motion` desliga tudo.

**Hover.** Superfícies clareiam um passo (`#1F1F1F`); o botão carmesim clareia para `#F04A6C`; o CTA de contorno preenche de carmesim; links vão para carmesim claro. Nunca opacidade como hover.

**Press.** Escurece um passo (`#C2143E`) e desloca 1px para baixo. Sem "shrink".

**Bordas e filetes.** 1px `#242424` para separação, 2px carmesim para ênfase, 3px carmesim à esquerda para citação e observação. A régua de 64×2px sob o título é assinatura da marca.

**Layout fixo.** Assinatura BIEL STRATEGY no topo à esquerda (escondida na capa, que já traz o kicker), contador de slide no topo à direita, traços de progresso no rodapé central — o traço ativo se alonga em carmesim.

## Iconografia
O material original **não usa biblioteca de ícones**. O vocabulário gráfico é: seta unicode **↓** em carmesim (funil), **bullet circular de 7px** em carmesim (listas), **círculo vazado de 44–46px com número** (etapas do ciclo), **filetes** e o **número fantasma** nos cards. Não há ícone de app, não há emoji, não há PNG de ícone.

Se um projeto futuro precisar de ícones de interface (fechar, seta, download), use **Lucide** via CDN (`https://unpkg.com/lucide@latest`) em traço de 1.5px, tamanho 20–24px, cor `currentColor` — é a substituição mais próxima do traço fino do sistema. **Isso é uma substituição, não algo observado na marca.** Nenhum SVG foi desenhado à mão neste sistema.

## Logo
**Não existe arquivo de logo nas fontes fornecidas.** A marca aparece somente como o nome em tipo: `BIEL` em branco + `STRATEGY` em carmesim, Inter 700, caixa alta, tracking .22em. O componente `Wordmark` reproduz exatamente isso. Nenhum símbolo foi inventado.

---

## Índice

**Raiz**
- `styles.css` — ponto de entrada; só linhas `@import`.
- `readme.md` — este guia. `SKILL.md` — versão Agent Skill. `thumbnail.html` — capa do sistema.

**`tokens/`** — `fonts.css` (Montserrat + Inter via Google Fonts), `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `elevation.css`, `motion.css`, `base.css`.

**`guidelines/`** — 17 cards de fundamentos (Colors, Type, Spacing, Brand) exibidos na aba Design System.

**`components/`** — 23 componentes React, cada um com `.d.ts` e `.prompt.md`:
- `core/`: **Button**, **IconButton**, **Card**, **Badge**, **Tag**, **Callout**, **Quote**
- `forms/`: **Input**, **Select**, **Checkbox**, **Radio**, **Switch**
- `navigation/`: **Tabs**, **SlideProgress**
- `feedback/`: **Dialog**, **Toast**, **Tooltip**
- `brand/`: **Wordmark**
- `proposal/`: **Stat**, **ValueFigure**, **PricingTier**, **PhaseStep**, **MetricCard**

**`slides/`** — 9 modelos de slide 1280×720 (capa, texto+foto, três cards, lista sangrada, trilho de etapas, métricas, gráfico em vídeo, investimento, fechamento).

**`ui_kits/proposta-web/`** — a apresentação web completa e interativa (o "link leve" pedido pelo cliente): `index.html`, `proposta.css`, `proposta.js`, `README.md`.

**`assets/`** — `img/cliente-busca.png`, `img/unhas-gestao.png`, `img/grafico-poster.png`, `video/evolucao-estrategica.mp4`. As duas fotos foram extraídas do PDF; os créditos originais estão no slide 10 (higgsfield.ai e shangmengnails.com).

## Adições intencionais
Como não havia biblioteca de componentes de origem, o inventário foi derivado dos elementos que a proposta realmente usa, mais o conjunto padrão de formulário necessário para prototipar (Input, Select, Checkbox, Radio, Switch). Específicos da marca: **ValueFigure** (isola a regra do verde), **MetricCard**, **PhaseStep**, **Quote**, **SlideProgress** e **Wordmark** (substitui o logo inexistente).

## Substituições sinalizadas
- **Fontes**: nenhum binário foi fornecido. Montserrat (títulos) e Inter (texto) vêm do Google Fonts e são as correspondências mais próximas do PDF. Se as fontes reais forem outras (ex.: Poppins, Sora, Gilroy), envie os arquivos e o sistema é reapontado em um arquivo.
- **Ícones**: Lucide como substituto documentado; a marca em si não usa ícones.
- **Logo**: ausente por decisão — não foi inventado.
