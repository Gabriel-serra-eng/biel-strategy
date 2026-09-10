// Conteúdo do formulário de pré-diagnóstico — fiel à especificação aprovada
// (LEAD_SYSTEM_RESEARCH.md, seção 01-A). Nenhuma pergunta/opção inventada aqui.

export const CONSENT_VERSION = "v1-2026-09";

export interface ChoiceOption {
  value: string;
  label: string;
}

export const SEGMENT_OPTIONS: ChoiceOption[] = [
  { value: "saude", label: "Saúde" },
  { value: "beleza_estetica", label: "Beleza / Estética" },
  { value: "alimentacao", label: "Alimentação" },
  { value: "varejo", label: "Varejo" },
  { value: "servicos", label: "Serviços" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "educacao", label: "Educação" },
  { value: "tecnologia", label: "Tecnologia" },
  { value: "outro", label: "Outro" },
];

export const PRIMARY_NEED_OPTIONS: ChoiceOption[] = [
  { value: "atrair_clientes", label: "Atrair mais clientes" },
  { value: "gerar_leads_agendamentos", label: "Gerar mais leads / agendamentos" },
  { value: "aumentar_vendas", label: "Aumentar as vendas" },
  { value: "melhorar_campanhas", label: "Melhorar minhas campanhas de anúncios" },
  { value: "comecar_investir_anuncios", label: "Começar a investir em anúncios" },
  { value: "melhorar_presenca_digital", label: "Melhorar minha presença digital" },
  { value: "melhorar_posicionamento", label: "Melhorar o posicionamento da marca" },
  { value: "criar_melhorar_site", label: "Criar ou melhorar meu site" },
  { value: "estruturar_estrategia", label: "Estruturar melhor minha estratégia de marketing" },
  { value: "outro", label: "Outro" },
];

export const ACQUISITION_CHANNEL_OPTIONS: ChoiceOption[] = [
  { value: "indicacao", label: "Indicação" },
  { value: "instagram", label: "Instagram" },
  { value: "google", label: "Google" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "meta_ads", label: "Meta Ads" },
  { value: "google_ads", label: "Google Ads" },
  { value: "site", label: "Site" },
  { value: "varios_canais", label: "Vários canais" },
  { value: "sem_estrategia", label: "Não tenho uma estratégia definida" },
  { value: "outro", label: "Outro" },
];

export const MARKETING_MATURITY_OPTIONS: ChoiceOption[] = [
  { value: "ainda_nao", label: "Ainda não" },
  { value: "ja_investi_parei", label: "Já investi, mas parei" },
  { value: "invisto_ocasionalmente", label: "Invisto ocasionalmente" },
  { value: "invisto_todos_meses", label: "Invisto todos os meses" },
  { value: "ja_tenho_estrutura", label: "Já tenho uma estrutura de marketing" },
];

export const BUSINESS_GOAL_QUICK_OPTIONS: ChoiceOption[] = [
  { value: "mais_clientes", label: "Mais clientes" },
  { value: "mais_agendamentos", label: "Mais agendamentos" },
  { value: "mais_vendas", label: "Mais vendas" },
  { value: "mais_orcamentos", label: "Mais orçamentos" },
  { value: "melhor_posicionamento", label: "Melhor posicionamento" },
  { value: "estruturar_marketing", label: "Estruturar o marketing" },
  { value: "outro", label: "Outro" },
];

export const PURCHASE_TIMELINE_OPTIONS: ChoiceOption[] = [
  { value: "quanto_antes", label: "O quanto antes" },
  { value: "proximos_7_dias", label: "Próximos 7 dias" },
  { value: "proximos_30_dias", label: "Próximos 30 dias" },
  { value: "proximos_3_meses", label: "Próximos 3 meses" },
  { value: "apenas_pesquisando", label: "Estou apenas pesquisando" },
  { value: "sem_certeza", label: "Ainda não tenho certeza" },
];

export const BUDGET_RANGE_OPTIONS: ChoiceOption[] = [
  { value: "ainda_nao", label: "Ainda não" },
  { value: "ate_500", label: "Até R$500/mês" },
  { value: "500_1000", label: "R$500–R$1.000/mês" },
  { value: "1000_3000", label: "R$1.000–R$3.000/mês" },
  { value: "3000_mais", label: "R$3.000+/mês" },
  { value: "prefiro_conversar", label: "Prefiro conversar antes" },
];

export const CONTACT_CHANNEL_OPTIONS: ChoiceOption[] = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "ligacao", label: "Ligação" },
  { value: "email", label: "E-mail" },
];

export const FORM_STEP_LABELS = [
  "O negócio",
  "O desafio",
  "Situação atual",
  "Histórico",
  "O objetivo",
  "O momento",
  "Investimento",
  "Contato",
] as const;
