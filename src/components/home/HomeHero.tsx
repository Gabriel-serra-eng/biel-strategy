"use client";

import { useEffect, useRef } from "react";
import { WHATSAPP_URL } from "@/data/site";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

type Linha = {
  /** Palavras da linha; alternam entre preenchida (branca) e contornada. */
  itens: string[];
  tam: "sm" | "md" | "xl";
  /** Duração do loop horizontal contínuo (s) — maior = mais lento. */
  dur: number;
  /** Sentido do loop contínuo. */
  dir: "esq" | "dir";
  /** Deslocamento extra ligado à rolagem (xPercent) — velocidades diferentes = profundidade. */
  scroll: number;
};

const LINHAS: Linha[] = [
  { itens: ["Meta Ads", "Google Ads", "Estratégia"], tam: "sm", dur: 70, dir: "esq", scroll: -9 },
  { itens: ["Tráfego pago"], tam: "xl", dur: 90, dir: "dir", scroll: 6 },
  { itens: ["Google Ads", "Estratégia", "Meta Ads"], tam: "md", dur: 55, dir: "esq", scroll: -14 },
];

function Grupo({ itens, tam }: Pick<Linha, "itens" | "tam">) {
  // Repete o conjunto para a faixa ser sempre mais larga que a tela (loop sem emenda).
  const seq = tam === "xl" ? [...itens, ...itens] : [...itens, ...itens, ...itens];
  return (
    <span className="kt-group">
      {seq.map((t, i) => (
        <span key={i} className="kt-item">
          <span className={i % 2 === 0 ? "kt-fill" : "kt-outline"}>{t}</span>
          <span className="kt-sep">•</span>
        </span>
      ))}
    </span>
  );
}

/**
 * Home — composição tipográfica cinematográfica: linhas de texto atravessando a tela,
 * alternando letras preenchidas e contornadas, com destaque para TRÁFEGO PAGO.
 * Dois movimentos independentes (sem conflito de transform):
 *  - .kt-track: loop horizontal contínuo em CSS puro (keyframes), velocidades diferentes por linha;
 *  - .kt-shift: deslocamento ligado à rolagem via GSAP ScrollTrigger (scrub), também por linha.
 * As faixas em movimento são decorativas (aria-hidden); o texto real fica no H1, no apoio e no CTA.
 * prefers-reduced-motion: composição estática.
 */
export function HomeHero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      const scroll = { trigger: root, start: "top top", end: "bottom top", scrub: 0.8 };
      root.querySelectorAll<HTMLElement>(".kt-shift").forEach((el) => {
        gsap.to(el, { xPercent: Number(el.dataset.scroll), ease: "none", scrollTrigger: scroll });
      });
      gsap.to(".kt-rule i", { scaleX: 1, ease: "none", scrollTrigger: scroll });
      gsap.to(".kt-foot-in", { yPercent: -30, opacity: 0, ease: "none", scrollTrigger: { ...scroll, start: "20% top" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" data-screen-label="Home" className="kt" ref={rootRef}>
      <div className="kt-glow" aria-hidden="true" />

      <h1 className="kt-kicker ap-in ap-up" style={{ animationDelay: "150ms" }}>
        <i aria-hidden="true" />
        Gestão de tráfego pago · Meta Ads · Google Ads
      </h1>

      <div className="kt-lines" aria-hidden="true">
        {LINHAS.map((l, i) => (
          <div
            key={i}
            className={`kt-line kt-${l.tam} ap-in ${l.dir === "esq" ? "kt-from-r" : "kt-from-l"}`}
            style={{ animationDelay: `${250 + i * 140}ms` }}
          >
            <div className="kt-shift" data-scroll={l.scroll}>
              <div className={`kt-track kt-${l.dir}`} style={{ animationDuration: `${l.dur}s` }}>
                <Grupo itens={l.itens} tam={l.tam} />
                <Grupo itens={l.itens} tam={l.tam} />
              </div>
            </div>
          </div>
        ))}
        <span className="kt-rule">
          <i />
        </span>
      </div>

      {/* ap-in (entrada em CSS) no wrapper; GSAP (rolagem) no filho — transforms separados. */}
      <div className="kt-foot ap-in ap-up" style={{ animationDelay: "750ms" }}>
        <div className="kt-foot-in">
        <p className="kt-sub">
          Estratégias de anúncios para atrair clientes e gerar oportunidades para o seu negócio.
        </p>
        <a className="kt-cta" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          Agende sua reunião
          <span aria-hidden="true">→</span>
        </a>
        </div>
      </div>
    </section>
  );
}
