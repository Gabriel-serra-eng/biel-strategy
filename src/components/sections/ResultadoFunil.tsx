"use client";

import { useEffect, useRef } from "react";
import type { Caso } from "@/data/site";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

const num = (v: string) => parseInt(v.replace(/\D/g, ""), 10) || 0;

/**
 * Resultado de um case como funil: cada número real vira uma etapa (ex.: Clique → WhatsApp),
 * com barras na proporção verdadeira entre si. A etapa menor é desenhada sobre a "trilha" da
 * maior, para a relação ficar visível sem criar nenhuma métrica nova (sem %, sem taxa).
 *
 * Animação (GSAP ScrollTrigger, uma vez ao entrar na tela): as barras preenchem e os números
 * contam até o valor real. O valor real já vai no HTML; só é zerado quando a animação começa
 * (crawlers que não rolam a página nunca veem "0"). prefers-reduced-motion: estático.
 */
export function ResultadoFunil({ caso, delay = 0 }: { caso: Caso; /** atraso (s) antes de preencher */ delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const stats = caso.stats ?? [];
  const max = Math.max(...stats.map((s) => num(s.valor)), 1);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const fills = Array.from(root.querySelectorAll<HTMLElement>(".rf-fill"));
    const vals = Array.from(root.querySelectorAll<HTMLElement>(".rf-v"));
    gsap.set(fills, { scaleX: 0 });

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top 80%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ delay, defaults: { ease: "power3.out" } });
        fills.forEach((el, i) => tl.to(el, { scaleX: 1, duration: 1.6 }, i * 0.35));
        vals.forEach((el, i) => {
          const target = num(el.dataset.valor ?? "");
          const counter = { n: 0 };
          tl.call(() => (el.textContent = "0"), [], 0);
          tl.to(
            counter,
            {
              n: target,
              duration: 1.6,
              onUpdate: () => {
                el.textContent = String(Math.round(counter.n));
              },
            },
            i * 0.35,
          );
        });
      },
    });
    return () => {
      st.kill();
      gsap.set(fills, { clearProps: "transform" });
      vals.forEach((el) => (el.textContent = el.dataset.valor ?? ""));
    };
  }, [delay]);

  if (stats.length === 0) return null;

  return (
    <div className="rf" ref={ref}>
      <div className="rf-top">
        {caso.resultadosRotulo ? <span className="rf-badge">{caso.resultadosRotulo}</span> : null}
        {caso.funil ? (
          <span className="rf-path" aria-label="Funil do case">
            {caso.funil.join(" → ")}
          </span>
        ) : null}
      </div>

      <ol className="rf-steps">
        {stats.map((s) => {
          const pct = (num(s.valor) / max) * 100;
          return (
            <li key={s.rotulo} className="rf-step">
              <div className="rf-head">
                {s.etapa ? <span className="rf-etapa">{s.etapa}</span> : null}
                <span className="rf-v" data-valor={s.valor}>
                  {s.valor}
                </span>
                <span className="rf-l">{s.rotulo}</span>
              </div>
              <div className="rf-track" aria-hidden="true">
                <i className="rf-fill" style={{ width: `${Math.max(pct, 1.5)}%` }} />
              </div>
            </li>
          );
        })}
      </ol>

      {caso.statsNota ? <p className="rf-nota">{caso.statsNota}</p> : null}
    </div>
  );
}
