// Conteúdo tipado, fiel ao RESEARCH.md — nenhum dado inventado.
// Campos marcados como `pending: true` ainda dependem de validação ([VALIDAR] no Research).

export type EvidenceLevel =
  | "pratica"
  | "dominio"
  | "estudo"
  | "teoria"
  | "base"
  | "exp"
  | "utiliza"
  | "estudando";

export interface Fase {
  n: string;
  t: string;
  w: string;
  d: string;
}

export const FASES: Fase[] = [
  {
    n: "01",
    t: "Base técnica",
    w: "ORIGEM",
    d: "Redes, protocolos e primeiros passos em Python — a lógica que depois leria tráfego, UTMs e tags de campanha.",
  },
  {
    n: "02",
    t: "Tráfego de intenção",
    w: "MARKETING",
    d: "Gestão de Google Ads para negócios locais. Diagnóstico: campanha boa falha quando a página não acompanha.",
  },
  {
    n: "03",
    t: "O gargalo",
    w: "VIRADA",
    d: "Templates lentos e formulários genéricos custavam clique pago. A resposta exigia engenharia própria.",
  },
  {
    n: "04",
    t: "Engenharia de conversão",
    w: "TECNOLOGIA",
    d: "React, Next.js e formulários multi-step sob medida — sem o atrito que derruba quem chega pelo anúncio.",
  },
  {
    n: "05",
    t: "Amplificação com IA",
    w: "IA",
    d: "LLMs entram para pontuar leads e acelerar prototipagem: Lead Radar e VYRO nascem daqui.",
  },
];

export const COMPETENCIAS_MARKETING: string[] = [
  "Google Ads · Search",
  "Meta Ads",
  "Funis de conversão",
  "WhatsApp como canal",
  "Copywriting & VSL",
  "GA4 / GTM",
];

export const FUNIL_STEPS: string[] = ["Busca", "Anúncio", "Clique", "Contato", "Oportunidade"];

export const COMPETENCIAS_TECNOLOGIA: string[] = [
  "React & Next.js",
  "TypeScript",
  "Formulários multi-step",
  "APIs & webhooks",
];

export const COMPETENCIAS_IA: string[] = [
  "Claude / Anthropic SDK",
  "Google Gemini API",
  "Ollama (local)",
];

export const LANDING_FUNIL_STEPS: string[] = ["Anúncio", "Landing page", "Ação", "Lead"];

export const LANDING_COMPETENCIAS: string[] = [
  "Copy",
  "UX/UI",
  "Performance",
  "SEO",
  "Rastreamento",
  "Integrações",
];

export interface NivelStack {
  t: string;
  d: string;
}

export const NIVEIS: NivelStack[] = [
  { t: "Marketing", d: "Google Ads · Meta Ads · GA4 · GTM" },
  { t: "Build", d: "React · TypeScript · APIs · Git" },
  { t: "AI", d: "Claude · Gemini · Ollama" },
  { t: "Automação", d: "Apps Script · Sheets · n8n" },
  { t: "Fundação", d: "Redes · Linux · Python" },
];

export interface CasoStat {
  valor: string;
  rotulo: string;
}

export interface CasoCarrosselSlide {
  rotulo: string;
  legenda: string;
  /** Caminho da imagem real (opcional) — sem isso, o slide usa o placeholder padrão. */
  imagem?: string;
  /** Caminho de um vídeo real (opcional) — autoplay/loop/mudo, no lugar da imagem. */
  video?: string;
  /** Proporção real da imagem/vídeo (largura/altura) — o frame se adapta a cada slide para minimizar espaço morto. */
  aspect?: number;
}

export interface CasoCarrossel {
  slides: CasoCarrosselSlide[];
}

export interface CasoExpansaoItem {
  canal: string;
  descricao: string;
}

export interface CasoCta {
  titulo: string;
  texto1: string;
  texto2: string;
  texto3?: string;
  reforco1?: string;
  reforco2?: string;
  tag?: string;
  botao: string;
  nota?: string;
}

export interface Caso {
  eixo: string;
  t: string;
  sub: string;
  p: string;
  a: string;
  r: string;
  nota?: string;
  /** Funil de conversão do case (opcional — nem todo case tem essa visualização). */
  funil?: string[];
  /** Resultados numéricos do case (opcional). */
  resultadosRotulo?: string;
  stats?: CasoStat[];
  statsNota?: string;
  /** Carrossel de imagens do case (opcional — sem isso, cai no placeholder único padrão). */
  carrossel?: CasoCarrossel;
  /** Próxima meta do case — sempre tratado como meta, nunca como resultado obtido. */
  metaTitulo?: string;
  metaTexto?: string;
  /** Canais de expansão de aquisição planejados para o case. */
  expansao?: CasoExpansaoItem[];
  /** Fechamento/CTA específico do case, como continuação natural. */
  cta?: CasoCta;
  /** Oculta o case da navegação/renderização sem remover os dados (reversível). */
  oculto?: boolean;
}

export const CASOS: Caso[] = [
  {
    eixo: "Marketing / Aquisição",
    t: "Cássia · Beleza & Cachos",
    sub: "Estética especializada · Zona Norte, São Paulo",
    p: "Transformar presença digital em conversas reais com potenciais clientes. A oportunidade existia — o desafio era criar um caminho entre o anúncio e o contato, colocando a empresa diante das pessoas certas e levando o interesse direto para o WhatsApp.",
    a: "Construção e gestão de campanhas de Meta Ads orientadas à geração de conversas: segmentação local, testes de criativos, análise de comportamento e otimização contínua do percurso. A estratégia combina marketing, dados e tecnologia para identificar o que gera atenção, interesse e ação — direcionando o investimento para aquilo que apresenta potencial.",
    r: "Estruturação e gestão integral da campanha de Meta Ads — da segmentação e criativos à otimização contínua do funil anúncio → WhatsApp.",
    funil: ["Anúncio", "Clique", "WhatsApp", "Oportunidade"],
    resultadosRotulo: "Em 30 dias",
    stats: [
      { valor: "830", rotulo: "cliques gerados pelos anúncios" },
      { valor: "129", rotulo: "contatos iniciados pelo WhatsApp através dos anúncios" },
    ],
    statsNota: "Dados registrados no Gerenciador de Anúncios.",
    carrossel: {
      slides: [
        {
          rotulo: "Gerenciador de anúncios",
          legenda: "Print real da campanha",
          imagem: "/casos/cassia-ads-manager-zoom.webp",
          aspect: 610 / 88,
        },
        {
          rotulo: "Salão / Cássia",
          legenda: "Foto real do salão e da Cássia",
          imagem: "/casos/cassia-salao.webp",
          aspect: 2299 / 1200,
        },
      ],
    },
    metaTitulo: "+100 leads em 60 dias",
    metaTexto:
      "Uma meta de aquisição construída a partir de mídia paga, otimização contínua e uma estrutura preparada para transformar atenção em oportunidades.",
    expansao: [
      { canal: "Meta Ads", descricao: "Geração de demanda e conversas." },
      { canal: "Google Ads", descricao: "Captura de pessoas que já estão procurando por uma solução." },
      {
        canal: "TikTok Ads",
        descricao: "Nova frente de expansão para descoberta, alcance e geração de demanda.",
      },
    ],
    cta: {
      titulo: "Seu negócio tem um potencial que você ainda não consegue enxergar.",
      texto1:
        "Eu entro para descobrir onde ele está, transformar dados em estratégia e usar marketing, tecnologia e IA para construir o caminho até o resultado.",
      texto2: "Não se trata apenas de colocar anúncios no ar.",
      texto3:
        "É entender o seu negócio, o seu público, suas oportunidades e aquilo que pode estar sendo desperdiçado — e transformar isso em uma operação de aquisição capaz de evoluir com os dados.",
      reforco1: "Você já tem potencial.",
      reforco2: "Eu vou usar o que você ainda não sabe usar para chegar mais longe.",
      tag: "Marketing · Tecnologia · IA · Aquisição",
      botao: "→ Quero descobrir meu potencial",
      nota:
        "Uma conversa estratégica para entender onde sua empresa está e quais caminhos podem fazer sentido para o próximo estágio do seu negócio.",
    },
  },
  {
    eixo: "Marketing / Conversão",
    t: "Máquina de aquisição para restaurantes",
    sub: "Modelo VSL + qualificação multi-etapas",
    p: "Restaurantes anunciam sem material forte ou contratam conteúdo sem distribuição.",
    a: "Landing page em formato VSL com qualificação em oito passos por cards, revelando o investimento só ao fim do filtro.",
    r: "Autor da arquitetura de aquisição, da copy e da lógica do funil.",
    oculto: true,
  },
  {
    eixo: "Technology / AI",
    t: "Lead Radar",
    sub: "Inteligência comercial B2B",
    p: "Listas frias genéricas geram abordagem sem contexto e rejeição acima de 95%.",
    a: "Varredura de sinais públicos e score transparente de Fit, Necessidade, Intenção e Timing antes do contato humano.",
    r: "Produto próprio. Fórmulas de pontuação e chaves permanecem internas.",
    oculto: true,
  },
  {
    eixo: "Landing Page / Aquisição",
    t: "O site não é o destino. É parte da estratégia.",
    sub: "Copy · UX/UI · Performance · SEO · Rastreamento · Integrações",
    p: "Um anúncio pode gerar o clique. Mas é a experiência depois dele que pode transformar atenção em oportunidade.",
    a: "Uno desenvolvimento, marketing e estratégia de conversão para criar páginas pensadas desde a origem para receber tráfego pago. A página considera objetivo, público, oferta e comportamento, criando uma experiência orientada à conversão.",
    funil: ["Anúncio", "Landing page", "Ação", "Lead"],
    r: "Planejamento e execução de páginas pensadas para conversão desde a origem — copy, UX/UI, performance, SEO, rastreamento e integrações reunidos em uma única entrega.",
    carrossel: {
      slides: [
        {
          rotulo: "Landing page em ação",
          legenda: "Demonstração real da experiência",
          video: "/casos/landing-demo.mp4",
          aspect: 720 / 1280,
        },
      ],
    },
    cta: {
      titulo: "Do clique ao lead.",
      texto1: "Não basta comprar tráfego.",
      texto2: "É preciso ter uma estrutura preparada para recebê-lo e transformá-lo em oportunidade.",
      botao: "→ Quero construir minha estrutura de aquisição",
    },
  },
];

export const CERTS: string[] = [
  "Google Ads Search / GA4",
  "IA & Data Science (Coursera/IBM)",
  "Automação & Suporte de TI",
  "Networking (Cisco)",
  "Azure Fundamentals",
];

export interface VisaoItem {
  t: string;
  d: string;
}

export const VISAO_ITEMS: VisaoItem[] = [
  { t: "VYRO Site Factory", d: "Motor de prototipagem visual acelerada — hoje em ampliação." },
  { t: "Lead Radar", d: "Consolidação dos scores explicáveis de prontidão comercial." },
  { t: "Automação de operação", d: "n8n e Apps Script unindo captura, qualificação e relatório." },
  {
    t: "Convergência",
    d: "Marketing lidera. Tecnologia constrói. IA acelera. Em um só ponto de responsabilidade.",
  },
];

export const NAV_LINKS: { href: string; label: string }[] = [
  { href: "#jornada", label: "Jornada" },
  { href: "#marketing", label: "Marketing" },
  { href: "#casos", label: "Work" },
  { href: "#tecnologia", label: "Tecnologia" },
  { href: "#ia", label: "IA" },
  { href: "#formacao", label: "Credentials" },
];

export const CHAPTER_IDS: string[] = [
  "hero",
  "jornada",
  "marketing",
  "casos",
  "tecnologia",
  "ia",
  "formacao",
  "visao",
  "contato",
];

/** Domínio de produção validado — usado como metadataBase, canonical, robots.txt e sitemap.xml. */
export const SITE_URL = "https://bielstrategy.com";

export const SITE_META = {
  title: "Biel Strategy | Marketing de Aquisição, Tecnologia & IA",
  description:
    "Estrategista de aquisição e soluções digitais: mídia de intenção, engenharia de conversão e inteligência artificial em uma operação única.",
};
