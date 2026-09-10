import type { LeadSubmission } from "./schema";

/**
 * Lead score / temperatura — estrutura pronta, cálculo NEUTRO/DESATIVADO.
 *
 * [VALIDAR SCORE]: o projeto não possui, em RESEARCH.md nem IMPLEMENTATION.md,
 * uma metodologia de pontuação validada. LEAD_SYSTEM_RESEARCH.md (seção 01-A)
 * registra uma PROPOSTA inicial (soma simples de sinais: FIT/DOR/INTENÇÃO/
 * MATURIDADE/CAPACIDADE/OBJETIVO/HISTÓRICO), mas ela não foi confirmada pelo
 * autor do projeto — por isso não é ativada aqui. Ativar essa função para
 * calcular um score de verdade é uma tarefa futura, condicionada a essa
 * validação (ver `[VALIDAR SCORE]` em LEAD_SYSTEM_RESEARCH.md e no README
 * desta feature).
 *
 * Enquanto isso, todo lead é gravado com lead_score/lead_temperature nulos e
 * score_version = SCORE_VERSION, para que o schema já exista e nenhuma
 * migração futura seja necessária só para "ligar" o score.
 */
export const SCORE_VERSION = "unscored-v0";

export interface LeadScoreResult {
  score_version: string;
  lead_score: number | null;
  lead_temperature: "LOW" | "MEDIUM" | "HIGH" | null;
}

export function calculateLeadScore(_submission: LeadSubmission): LeadScoreResult {
  void _submission; // assinatura pronta para quando o cálculo for validado e ativado
  return {
    score_version: SCORE_VERSION,
    lead_score: null,
    lead_temperature: null,
  };
}
