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

export interface Caso {
  eixo: string;
  t: string;
  sub: string;
  p: string;
  a: string;
  r: string;
  nota?: string;
}

export const CASOS: Caso[] = [
  {
    eixo: "Marketing / Acquisition",
    t: "Studio Unna Nail Spa",
    sub: "Estética premium · Mandaqui, São Paulo",
    p: "Demanda e serviço prontos; faltava aparecer no momento exato da busca local.",
    a: "Google Ads de intenção, segmentação por bairro, funil busca → WhatsApp → agendamento, em ciclos de três meses.",
    r: "Planejador e gestor integral da estratégia. Números comerciais omitidos por governança.",
    nota:
      'Nome do cliente sujeito a aprovação — alternativa: "Studio de Beleza & Estética Premium (São Paulo)"',
  },
  {
    eixo: "Marketing / Conversão",
    t: "Máquina de aquisição para restaurantes",
    sub: "Modelo VSL + qualificação multi-etapas",
    p: "Restaurantes anunciam sem material forte ou contratam conteúdo sem distribuição.",
    a: "Landing page em formato VSL com qualificação em oito passos por cards, revelando o investimento só ao fim do filtro.",
    r: "Autor da arquitetura de aquisição, da copy e da lógica do funil.",
  },
  {
    eixo: "Technology / AI",
    t: "Lead Radar",
    sub: "Inteligência comercial B2B",
    p: "Listas frias genéricas geram abordagem sem contexto e rejeição acima de 95%.",
    a: "Varredura de sinais públicos e score transparente de Fit, Necessidade, Intenção e Timing antes do contato humano.",
    r: "Produto próprio. Fórmulas de pontuação e chaves permanecem internas.",
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

export const SITE_META = {
  title: "Biel Strategy | Marketing de Aquisição, Tecnologia & IA",
  description:
    "Estrategista de aquisição e soluções digitais: mídia de intenção, engenharia de conversão e inteligência artificial em uma operação única.",
};
