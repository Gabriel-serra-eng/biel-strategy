"use client";

import { useEffect, useRef, useState } from "react";
import { Section, SectionTitle } from "@/components/ui";
import { FASES } from "@/data/site";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

interface JornadaProps {
  n?: string;
}

/** Método — as 5 fases. O texto de apresentação que abria esta seção agora abre a área Sobre. */
export function Jornada({ n = "01" }: JornadaProps) {
  const [ativa, setAtiva] = useState(0);
  const railRef = useRef<HTMLDivElement | null>(null);
  const flowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const flow = flowRef.current;
    if (!flow || prefersReducedMotion()) return;
    const { ScrollTrigger } = ensureGsap();
    const fases = Array.from(flow.querySelectorAll<HTMLElement>(".fase"));
    const triggers = fases.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setAtiva(i);
        },
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    railRef.current?.style.setProperty("--rail-fill", (ativa / (FASES.length - 1)) * 100 + "%");
  }, [ativa]);

  return (
    <Section id="jornada" n={n} label="Método" className="sec-jornada">
      <div className="traj-intro">
        <SectionTitle accent="entender o negócio." size="lg">
          Antes de anunciar,
        </SectionTitle>
      </div>
      <div className="traj">
        <aside className="traj-rail" aria-hidden="true">
          <div className="rail-inner" ref={railRef}>
            {FASES.map((f, i) => (
              <div key={f.n} className={"rail-item" + (i === ativa ? " on" : "")}>
                <span className="rail-n">{f.n}</span>
                <span className="rail-line" />
                <span className="rail-w">{f.w}</span>
              </div>
            ))}
          </div>
        </aside>
        <div className="traj-flow" ref={flowRef}>
          {FASES.map((f, i) => (
            <article key={f.n} data-i={i} className={"fase" + (i === ativa ? " fase-on" : "")}>
              <header>
                <span className="fase-n">{f.n}</span>
                <span className="fase-w">{f.w}</span>
              </header>
              <h3>{f.t}</h3>
              <p className="fase-ctx">{f.d}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
