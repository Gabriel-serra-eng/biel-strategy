"use client";

import { useEffect, useRef, useState } from "react";
import { Section, SectionTitle, Reveal } from "@/components/ui";
import { FASES } from "@/data/site";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

export function Jornada() {
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
    <Section id="jornada" n="01" label="Método" className="sec-jornada">
      <div className="two-col traj-intro">
        <div>
          <SectionTitle accent="entender o negócio." size="lg">
            Antes de anunciar,
          </SectionTitle>
        </div>
        <Reveal d={80} className="col-body">
          <p className="lede">
            Ajudo empresas a atrair clientes com estratégia de marketing digital e tráfego pago,
            organizando a aquisição do primeiro clique até a conversa comercial. Cada negócio tem um contexto, um público e um momento diferentes,
            por isso não existe estratégia pronta que sirva para todos. Primeiro entendo o seu
            cenário. Depois defino o caminho.
          </p>
        </Reveal>
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
