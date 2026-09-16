import type { CSSProperties, ReactNode } from "react";
import dynamic from "next/dynamic";
import { Reveal } from "./Reveal";

const RuleWipeClient = dynamic(() => import("./RuleWipeClient").then((m) => m.RuleWipeClient));

interface KickerProps {
  tone?: "muted" | "accent";
  children: ReactNode;
  style?: CSSProperties;
}

export function Kicker({ tone = "muted", children, style }: KickerProps) {
  return (
    <div className={"kicker " + (tone === "accent" ? "kicker-accent" : "")} style={style}>
      {children}
    </div>
  );
}

interface SectionTitleProps {
  children: ReactNode;
  accent?: ReactNode;
  size?: "lg";
  rule?: boolean;
  id?: string;
}

/** Título de seção: caixa alta, última palavra em carmesim. */
export function SectionTitle({ children, accent, size = "lg", rule = false, id }: SectionTitleProps) {
  return (
    <div className="sec-title-wrap">
      <h2 id={id} className={"sec-title sec-title-" + size}>
        {children}
        {accent ? (
          <>
            <br />
            <span className="ac">{accent}</span>
          </>
        ) : null}
      </h2>
      {rule ? <RuleWipeClient /> : null}
    </div>
  );
}

export function ChapterMark({ n, label }: { n: string; label: string }) {
  return (
    <div className="chapmark">
      <span className="chapmark-n">{n}</span>
      <span className="chapmark-l">{label}</span>
    </div>
  );
}

interface SectionProps {
  id: string;
  label: string;
  n?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, label, n, children, className = "" }: SectionProps) {
  return (
    <section id={id} data-screen-label={label} className={"sec " + className}>
      {n ? (
        <Reveal as="div" className="sec-head">
          <ChapterMark n={n} label={label} />
        </Reveal>
      ) : null}
      {children}
    </section>
  );
}

/** Nível de evidência — vocabulário do Research, nunca inventado. */
const EVIDENCE_MAP: Record<string, [string, "accent" | "neutral"]> = {
  pratica: ["EXPERIÊNCIA PRÁTICA", "accent"],
  dominio: ["DOMÍNIO PRÁTICO", "accent"],
  estudo: ["ESTUDO", "neutral"],
  teoria: ["CONHECIMENTO TEÓRICO", "neutral"],
  base: ["CONHECIMENTO BÁSICO", "neutral"],
  exp: ["EXPERIMENTAÇÃO", "neutral"],
  utiliza: ["UTILIZA", "accent"],
  estudando: ["ESTUDANDO / PRÁTICO", "neutral"],
};

export function Evidence({ level }: { level: string }) {
  const [txt, tone] = EVIDENCE_MAP[level] || [level, "neutral"];
  return <span className={"ev " + (tone === "accent" ? "ev-ac" : "")}>{txt}</span>;
}

export function Pending({ children = "CONTEÚDO A VALIDAR" }: { children?: ReactNode }) {
  return <span className="pending">[{children}]</span>;
}
