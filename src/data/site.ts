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
    t: "Entender o negócio",
    w: "ENTENDER",
    d: "Oferta, público, momento e contexto. O ponto de partida é como o seu negócio funciona hoje e onde estão as oportunidades.",
  },
  {
    n: "02",
    t: "Definir o caminho",
    w: "DEFINIR",
    d: "Canais, mensagem e prioridades escolhidos para o seu caso, e não um pacote pronto.",
  },
  {
    n: "03",
    t: "Construir a estrutura",
    w: "CONSTRUIR",
    d: "Landing pages, formulários e rastreamento pensados para o percurso completo, do anúncio até o contato.",
  },
  {
    n: "04",
    t: "Colocar no ar",
    w: "EXECUTAR",
    d: "Campanhas de Google Ads e Meta Ads com segmentação, criativos e testes, acompanhadas de perto desde o primeiro dia.",
  },
  {
    n: "05",
    t: "Medir e ajustar",
    w: "EVOLUIR",
    d: "Rastreamento e mensuração mostram o que funciona. O investimento passa a ir para o que apresenta potencial.",
  },
];

export const COMPETENCIAS_MARKETING: string[] = [
  "Estratégia de marketing digital",
  "Tráfego pago: Google Ads",
  "Tráfego pago: Meta Ads",
  "Geração de leads e WhatsApp",
  "Landing pages e conversão",
  "Rastreamento e mensuração",
];

export const FUNIL_STEPS: string[] = ["Busca", "Anúncio", "Clique", "Contato", "Oportunidade"];

export const COMPETENCIAS_TECNOLOGIA: string[] = [
  "Landing pages rápidas e sob medida",
  "Formulários que qualificam o contato",
  "Integrações com suas ferramentas",
  "Rastreamento de origem e conversão",
];

export const COMPETENCIAS_IA: string[] = [
  "Análise de informações",
  "Apoio à criação",
  "Automação de rotinas",
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
  { t: "Aquisição", d: "Atrair as pessoas certas" },
  { t: "Conversão", d: "Landing pages e formulários sob medida" },
  { t: "Dados", d: "Rastreamento e mensuração para decidir" },
  { t: "Automação", d: "Menos trabalho manual" },
  { t: "IA", d: "Apoio à análise e à criação" },
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
    eixo: "Marketing / Tráfego pago",
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
      tag: "Conversa estratégica",
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
    eixo: "Landing Page / Conversão",
    t: "O site não é o destino. É parte da estratégia.",
    sub: "Landing pages para tráfego pago: estratégia, texto e desenvolvimento em uma única entrega.",
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
];

export const NAV_LINKS: { href: string; label: string }[] = [
  { href: "#jornada", label: "Método" },
  { href: "#marketing", label: "Marketing" },
  { href: "#casos", label: "Cases" },
  { href: "#tecnologia", label: "Tecnologia" },
  { href: "#ia", label: "IA" },
  { href: "#formacao", label: "Formação" },
];

export const CHAPTER_IDS: string[] = [
  "hero",
  "jornada",
  "marketing",
  "casos",
  "tecnologia",
  "ia",
  "formacao",
  "contato",
];

/** Domínio de produção validado — usado como metadataBase, canonical, robots.txt e sitemap.xml. */
export const SITE_URL = "https://bielstrategy.com";

/** Imagem de compartilhamento (Open Graph / Twitter) — 1200×630, formato padrão de link preview. */
export const OG_IMAGE = {
  url: "/images/og-biel-strategy.jpg",
  width: 1200,
  height: 630,
  alt: "Biel Strategy — Marketing sob medida. Aquisição de clientes, tráfego pago, landing pages e geração de leads.",
};

export const SITE_META = {
  title: "Marketing de Aquisição e Tráfego Pago | Biel Strategy",
  description:
    "Estratégia de marketing digital para empresas no Brasil e para brasileiros no exterior: Google Ads, Meta Ads, landing pages e rastreamento para gerar leads e converter.",
};
