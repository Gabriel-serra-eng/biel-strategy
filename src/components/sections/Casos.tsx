"use client";

import { useEffect, useRef, useState } from "react";
import { Section, SectionTitle, Reveal, Callout, Pending } from "@/components/ui";
import { CASOS } from "@/data/site";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

export function Casos() {
  const [ab, setAb] = useState(0);
  const c = CASOS[ab];
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = panelRef.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    gsap.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" });
  }, [ab]);

  return (
    <Section id="casos" n="03" label="Selected work" className="sec-hero">
      <div className="two-col traj-intro">
        <div>
          <SectionTitle accent="e projetos construídos.">Casos de marketing</SectionTitle>
        </div>
      </div>

      <Reveal className="casos-nav" role="tablist">
        {CASOS.map((x, i) => (
          <button
            key={x.t}
            role="tab"
            aria-selected={i === ab}
            className={"caso-tab" + (i === ab ? " on" : "")}
            onClick={() => setAb(i)}
          >
            <span className="caso-tab-e">{x.eixo}</span>
            <span className="caso-tab-t">{x.t}</span>
          </button>
        ))}
      </Reveal>

      <div className="caso" ref={panelRef}>
        <div className="caso-main">
          <span className="caso-eixo">{c.eixo}</span>
          <h3>{c.t}</h3>
          <p className="caso-sub">{c.sub}</p>
          <div className="caso-block">
            <span className="caso-l">Problema</span>
            <p>{c.p}</p>
          </div>
          <div className="caso-block">
            <span className="caso-l">Abordagem</span>
            <p>{c.a}</p>
          </div>
          <div className="caso-block">
            <span className="caso-l">Participação</span>
            <p>{c.r}</p>
          </div>
          {c.nota ? (
            <Callout title="Importante">
              <span>{c.nota}</span>
            </Callout>
          ) : null}
        </div>
        <div className="caso-media">
          <div className="media-placeholder">
            <span>Imagem do caso — a validar</span>
          </div>
          <span className="portrait-cap">
            <Pending>IMAGEM A VALIDAR</Pending>
          </span>
        </div>
      </div>
    </Section>
  );
}
