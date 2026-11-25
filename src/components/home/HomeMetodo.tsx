"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Kicker } from "@/components/ui";
import { FASES } from "@/data/site";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Home — 3. Como funciona: as 5 fases do método (mesmos textos da área Serviços) num trilho
 * que preenche com a rolagem (GSAP ScrollTrigger, scrub); cada fase acende quando a linha passa.
 * Horizontal no desktop, vertical no celular.
 */
export function HomeMetodo() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>(".hm-step"));
    if (prefersReducedMotion()) {
      root.style.setProperty("--hm-p", "1");
      steps.forEach((s) => s.classList.add("on"));
      return;
    }
    const { ScrollTrigger } = ensureGsap();
    const st = ScrollTrigger.create({
      trigger: root.querySelector(".hm-track"),
      start: "top 78%",
      end: "bottom 45%",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        root.style.setProperty("--hm-p", p.toFixed(4));
        steps.forEach((s, i) => s.classList.toggle("on", p >= i / (steps.length - 1) - 0.02));
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section className="sec hm" ref={rootRef} aria-labelledby="hm-title">
      <div className="hm-head">
        <Kicker tone="accent">Como funciona</Kicker>
        <h2 id="hm-title" className="sec-title sec-title-lg">
          Antes de anunciar,
          <br />
          <span className="ac">entender o negócio.</span>
        </h2>
      </div>
      <div className="hm-track">
        <span className="hm-line" aria-hidden="true">
          <i />
        </span>
        <ol className="hm-steps">
          {FASES.map((f) => (
            <li key={f.n} className="hm-step">
              <span className="hm-dot" aria-hidden="true" />
              <span className="hm-n">{f.n}</span>
              <h3 className="hm-t">{f.t}</h3>
              <p className="hm-d">{f.d}</p>
            </li>
          ))}
        </ol>
      </div>
      <Link href="/servicos" className="link-quiet hm-link">
        Ver serviços →
      </Link>
    </section>
  );
}
