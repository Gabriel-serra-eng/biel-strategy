"use client";

import type { ReactNode } from "react";
import type { ChoiceOption } from "@/data/leadForm";

interface FieldShellProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function FieldShell({ label, htmlFor, error, hint, children }: FieldShellProps) {
  return (
    <div className="lf-field">
      <label className="lf-label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && !error ? <span className="lf-hint">{hint}</span> : null}
      {error ? (
        <span className="lf-error" id={htmlFor ? `${htmlFor}-error` : undefined} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "url";
  error?: string;
  hint?: string;
  required?: boolean;
  autoComplete?: string;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  hint,
  required,
  autoComplete,
}: TextFieldProps) {
  return (
    <FieldShell label={label} htmlFor={id} error={error} hint={hint}>
      <input
        id={id}
        name={id}
        type={type}
        className="lf-input"
        value={value}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
    </FieldShell>
  );
}

interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  rows?: number;
}

export function TextAreaField({ id, label, value, onChange, placeholder, hint, rows = 3 }: TextAreaFieldProps) {
  return (
    <FieldShell label={label} htmlFor={id} hint={hint}>
      <textarea
        id={id}
        name={id}
        className="lf-input lf-textarea"
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
      />
    </FieldShell>
  );
}

interface ChoiceGroupProps {
  label: string;
  name: string;
  options: ChoiceOption[];
  value?: string;
  onChange: (v: string) => void;
}

/** Seleção única em chips — mesma linguagem visual de `.chip`/`.caso-tab`. */
export function ChoiceGroup({ label, name, options, value, onChange }: ChoiceGroupProps) {
  return (
    <div className="lf-field" role="radiogroup" aria-label={label}>
      <span className="lf-label" id={`${name}-label`}>
        {label}
      </span>
      <div className="lf-choice-grid">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              className={"lf-choice" + (selected ? " selected" : "")}
              onClick={() => onChange(opt.value)}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface YesNoProps {
  label: string;
  name: string;
  value?: boolean;
  onChange: (v: boolean) => void;
}

export function YesNoField({ label, name, value, onChange }: YesNoProps) {
  return (
    <div className="lf-field" role="radiogroup" aria-label={label}>
      <span className="lf-label">{label}</span>
      <div className="lf-choice-grid">
        <button
          type="button"
          role="radio"
          aria-checked={value === true}
          className={"lf-choice" + (value === true ? " selected" : "")}
          onClick={() => onChange(true)}
        >
          Sim
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={value === false}
          className={"lf-choice" + (value === false ? " selected" : "")}
          onClick={() => onChange(false)}
          data-name={name}
        >
          Não
        </button>
      </div>
    </div>
  );
}

interface ConsentFieldProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
}

export function ConsentField({ checked, onChange, error }: ConsentFieldProps) {
  return (
    <div className="lf-field">
      <label className="lf-consent">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby={error ? "consent-error" : undefined}
        />
        <span className="lf-consent-box" aria-hidden="true">
          {checked ? "✓" : ""}
        </span>
        <span className="lf-consent-text">
          Autorizo o uso dos meus dados de contato para que a Biel Strategy entre em contato
          comercial comigo, conforme a{" "}
          <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">
            Política de Privacidade
          </a>
          .
        </span>
      </label>
      {error ? (
        <span className="lf-error" id="consent-error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

/** Honeypot — invisível para pessoas, atraente para bots que preenchem tudo. */
export function HoneypotField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="lf-hp" aria-hidden="true">
      <label htmlFor="hp_company_site">Deixe este campo em branco</label>
      <input
        id="hp_company_site"
        name="hp_company_site"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
