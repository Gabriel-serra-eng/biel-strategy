"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useLeadTracking } from "@/hooks/useLeadTracking";
import { submitLead } from "@/app/actions/submitLead";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";
import {
  ACQUISITION_CHANNEL_OPTIONS,
  BUDGET_RANGE_OPTIONS,
  BUSINESS_GOAL_QUICK_OPTIONS,
  CONSENT_VERSION,
  CONTACT_CHANNEL_OPTIONS,
  FORM_STEP_LABELS,
  MARKETING_MATURITY_OPTIONS,
  PRIMARY_NEED_OPTIONS,
  PURCHASE_TIMELINE_OPTIONS,
  SEGMENT_OPTIONS,
} from "@/data/leadForm";
import { ChoiceGroup, ConsentField, FieldShell, HoneypotField, TextAreaField, TextField, YesNoField } from "./fields";

const DRAFT_KEY = "bs_lead_form_draft";
const STEP_COUNT = FORM_STEP_LABELS.length;

interface Draft {
  company: string;
  segment: string;
  location: string;
  instagram_url: string;
  website_url: string;
  primary_need: string;
  current_acquisition_channel: string;
  marketing_maturity: string;
  previous_marketing_attempt: boolean | undefined;
  previous_marketing_problem: string;
  business_goal: string;
  purchase_timeline: string;
  marketing_budget_range: string;
  name: string;
  email: string;
  phone: string;
  preferred_contact_channel: string;
  consent: boolean;
}

const EMPTY_DRAFT: Draft = {
  company: "",
  segment: "",
  location: "",
  instagram_url: "",
  website_url: "",
  primary_need: "",
  current_acquisition_channel: "",
  marketing_maturity: "",
  previous_marketing_attempt: undefined,
  previous_marketing_problem: "",
  business_goal: "",
  purchase_timeline: "",
  marketing_budget_range: "",
  name: "",
  email: "",
  phone: "",
  preferred_contact_channel: "",
  consent: false,
};

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Lê o rascunho salvo de forma lazy (só na primeira renderização do client).
 * No servidor `window` não existe, então cai no draft vazio — sem efeito
 * colateral, já que nada é exibido antes de `started` virar true (o valor do
 * draft não influencia o HTML da primeira pintura, então uma eventual
 * diferença entre server/client aqui não causa mismatch de hidratação).
 */
function readInitialDraft(): Draft {
  if (typeof window === "undefined") return EMPTY_DRAFT;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return EMPTY_DRAFT;
    return { ...EMPTY_DRAFT, ...(JSON.parse(raw) as Partial<Draft>) };
  } catch {
    return EMPTY_DRAFT;
  }
}

export function LeadForm() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(readInitialDraft);
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const { getAttribution } = useLeadTracking();
  const stepRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!started) return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // localStorage indisponível — segue sem persistir
    }
  }, [draft, started]);

  // crossfade entre etapas (mesmo espírito do crossfade de Casos.tsx)
  useEffect(() => {
    const el = stepRef.current;
    if (!el) return;
    headingRef.current?.focus();
    if (prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" });
  }, [step]);

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
    setFieldErrors((e) => ({ ...e, [key]: "" }));
  }

  function goNext() {
    setFormError(null);
    setStep((s) => Math.min(STEP_COUNT - 1, s + 1));
  }

  function goBack() {
    setFormError(null);
    setStep((s) => Math.max(0, s - 1));
  }

  async function handleSubmit() {
    if (status === "submitting") return;
    setFormError(null);
    setFieldErrors({});

    if (!draft.consent) {
      setFieldErrors({ consent: "É necessário aceitar a política de privacidade para enviar" });
      return;
    }

    setStatus("submitting");
    try {
      const result = await submitLead({
        hp_company_site: hp,
        company: draft.company,
        segment: draft.segment,
        location: draft.location,
        instagram_url: draft.instagram_url,
        website_url: draft.website_url,
        primary_need: draft.primary_need,
        current_acquisition_channel: draft.current_acquisition_channel,
        marketing_maturity: draft.marketing_maturity,
        previous_marketing_attempt: draft.previous_marketing_attempt,
        previous_marketing_problem: draft.previous_marketing_problem,
        business_goal: draft.business_goal,
        purchase_timeline: draft.purchase_timeline,
        marketing_budget_range: draft.marketing_budget_range,
        name: draft.name,
        email: draft.email,
        phone: draft.phone,
        preferred_contact_channel: draft.preferred_contact_channel,
        consent: draft.consent,
        consent_version: CONSENT_VERSION,
        attribution: getAttribution(),
      });

      if (result.ok) {
        setStatus("success");
        try {
          window.localStorage.removeItem(DRAFT_KEY);
        } catch {
          // sem problema se não der para limpar
        }
        return;
      }

      setStatus("error");
      if (result.error === "validation") {
        setFieldErrors(result.fieldErrors);
        setFormError("Revise os campos destacados.");
        setStep(STEP_COUNT - 1);
      } else if (result.error === "consent") {
        setFieldErrors({ consent: "É necessário aceitar a política de privacidade para enviar" });
        setStep(STEP_COUNT - 1);
      } else if (result.error === "rate_limited") {
        setFormError("Muitas tentativas em pouco tempo. Aguarde um instante e tente novamente.");
      } else {
        setFormError("Não conseguimos enviar agora. Tente novamente em instantes.");
      }
    } catch {
      setStatus("error");
      setFormError("Não conseguimos enviar agora. Tente novamente em instantes.");
    }
  }

  if (!started) {
    return (
      <div className="fim-cta">
        <Button variant="outline" size="lg" onClick={() => setStarted(true)}>
          Agendar conversa estratégica
        </Button>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="lf-card lf-status-success" role="status">
        <p className="lf-step-kicker">Recebido</p>
        <h3 className="lf-step-title">Sua mensagem chegou.</h3>
        <p className="lf-status-text">
          Vou analisar com calma o que você contou sobre o seu negócio e retorno pelo canal que você
          escolheu para combinarmos a conversa estratégica.
        </p>
      </div>
    );
  }

  const isLastStep = step === STEP_COUNT - 1;

  return (
    <div className="lf-wrap">
      <div className="lf-progress" aria-hidden="true">
        {FORM_STEP_LABELS.map((_, i) => (
          <i key={i} className={i <= step ? "on" : ""} />
        ))}
      </div>

      <div className="lf-card" ref={stepRef}>
        <p className="lf-step-kicker">
          Etapa {String(step + 1).padStart(2, "0")} / {String(STEP_COUNT).padStart(2, "0")}
        </p>
        <h3 className="lf-step-title" ref={headingRef} tabIndex={-1}>
          {FORM_STEP_LABELS[step]}
        </h3>

        <div className="lf-step-body">
          {step === 0 ? (
            <>
              <TextField id="company" label="Empresa / marca" value={draft.company} onChange={(v) => set("company", v)} placeholder="Nome do seu negócio" />
              <ChoiceGroup label="Segmento" name="segment" options={SEGMENT_OPTIONS} value={draft.segment} onChange={(v) => set("segment", v)} />
              <TextField id="location" label="Cidade / região" value={draft.location} onChange={(v) => set("location", v)} placeholder="Ex.: São Paulo, Zona Norte" />
              <TextField id="instagram_url" label="Instagram (opcional)" value={draft.instagram_url} onChange={(v) => set("instagram_url", v)} placeholder="@seuusuario" />
              <TextField id="website_url" label="Site (opcional)" value={draft.website_url} onChange={(v) => set("website_url", v)} placeholder="https://" type="url" />
            </>
          ) : null}

          {step === 1 ? (
            <ChoiceGroup
              label="O que você mais quer melhorar no seu negócio hoje?"
              name="primary_need"
              options={PRIMARY_NEED_OPTIONS}
              value={draft.primary_need}
              onChange={(v) => set("primary_need", v)}
            />
          ) : null}

          {step === 2 ? (
            <>
              <ChoiceGroup
                label="Como você consegue a maior parte dos seus clientes hoje?"
                name="current_acquisition_channel"
                options={ACQUISITION_CHANNEL_OPTIONS}
                value={draft.current_acquisition_channel}
                onChange={(v) => set("current_acquisition_channel", v)}
              />
              <ChoiceGroup
                label="Você já investe em marketing ou anúncios?"
                name="marketing_maturity"
                options={MARKETING_MATURITY_OPTIONS}
                value={draft.marketing_maturity}
                onChange={(v) => set("marketing_maturity", v)}
              />
            </>
          ) : null}

          {step === 3 ? (
            <>
              <YesNoField
                label="Você já tentou alguma estratégia de marketing que não funcionou como esperava?"
                name="previous_marketing_attempt"
                value={draft.previous_marketing_attempt}
                onChange={(v) => set("previous_marketing_attempt", v)}
              />
              {draft.previous_marketing_attempt ? (
                <TextAreaField
                  id="previous_marketing_problem"
                  label="O que aconteceu?"
                  value={draft.previous_marketing_problem}
                  onChange={(v) => set("previous_marketing_problem", v)}
                  placeholder="Conte rapidamente o que não funcionou"
                  rows={2}
                />
              ) : null}
            </>
          ) : null}

          {step === 4 ? (
            <>
              <TextAreaField
                id="business_goal"
                label="Se essa estratégia desse certo, o que você gostaria de alcançar nos próximos 3 meses?"
                value={draft.business_goal}
                onChange={(v) => set("business_goal", v)}
                placeholder="Ex.: aumentar agendamentos, gerar mais orçamentos, vender mais, atrair clientes de uma região específica..."
                rows={3}
              />
              <FieldShell label="Ou escolha um atalho">
                <div className="lf-choice-grid">
                  {BUSINESS_GOAL_QUICK_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={"lf-choice" + (draft.business_goal === opt.label ? " selected" : "")}
                      onClick={() => set("business_goal", opt.label)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </FieldShell>
            </>
          ) : null}

          {step === 5 ? (
            <ChoiceGroup
              label="Quando você gostaria de começar a trabalhar nisso?"
              name="purchase_timeline"
              options={PURCHASE_TIMELINE_OPTIONS}
              value={draft.purchase_timeline}
              onChange={(v) => set("purchase_timeline", v)}
            />
          ) : null}

          {step === 6 ? (
            <ChoiceGroup
              label="Você já possui um orçamento destinado para marketing/anúncios?"
              name="marketing_budget_range"
              options={BUDGET_RANGE_OPTIONS}
              value={draft.marketing_budget_range}
              onChange={(v) => set("marketing_budget_range", v)}
            />
          ) : null}

          {isLastStep ? (
            <>
              <TextField id="name" label="Nome" value={draft.name} onChange={(v) => set("name", v)} required autoComplete="name" error={fieldErrors.name} />
              <TextField id="phone" label="WhatsApp" value={draft.phone} onChange={(v) => set("phone", v)} placeholder="(11) 90000-0000" type="tel" required autoComplete="tel" error={fieldErrors.phone} />
              <TextField id="email" label="E-mail" value={draft.email} onChange={(v) => set("email", v)} type="email" required autoComplete="email" error={fieldErrors.email} />
              <ChoiceGroup
                label="Qual a melhor forma de falar com você?"
                name="preferred_contact_channel"
                options={CONTACT_CHANNEL_OPTIONS}
                value={draft.preferred_contact_channel}
                onChange={(v) => set("preferred_contact_channel", v)}
              />
              <HoneypotField value={hp} onChange={setHp} />
              <ConsentField checked={draft.consent} onChange={(v) => set("consent", v)} error={fieldErrors.consent} />
            </>
          ) : null}
        </div>

        {formError ? (
          <p className="lf-error lf-form-error" role="alert">
            {formError}
          </p>
        ) : null}

        <div className="lf-nav">
          {step > 0 ? (
            <button type="button" className="link-quiet" onClick={goBack} disabled={status === "submitting"}>
              ← Voltar
            </button>
          ) : (
            <span />
          )}

          {isLastStep ? (
            <Button variant="primary" size="lg" onClick={handleSubmit} magnetic={false}>
              {status === "submitting" ? "Enviando…" : "Enviar"}
            </Button>
          ) : (
            <Button variant="outline" size="md" onClick={goNext} magnetic={false}>
              Continuar →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
