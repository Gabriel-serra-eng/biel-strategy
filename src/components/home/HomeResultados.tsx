"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ResultadoFunil } from "@/components/sections/ResultadoFunil";
import { CASOS, WHATSAPP_URL } from "@/data/site";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";
import { ApogeeVideo } from "./ApogeeVideo";

// Case com resultados numéricos reais (Cássia) — dados em src/data/site.ts.
const CASO = CASOS.find((c) => c.stats && c.stats.length > 0);

/**
 * Home — 2. Resultados, na composição da referência Motion/Apogee adaptada à marca: vídeo de
 * nebulosa (recolorido), texto à esquerda e card de vidro à direita com o gráfico real do case.
 *
 * Entrada igual à referência (CSS puro: 300 / 500 / 700 / 900ms; barras a partir de 1,1s), mas
 * disparada quando a seção entra na tela — ela fica abaixo da dobra, então no carregamento a
 * sequência terminaria antes de alguém vê-la. A classe .ap-wait pausa as animações até lá
 * (sem JS, @media (scripting: none) libera tudo).
 */
export function HomeResultados() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.remove("ap-wait");
      return;
    }
    const { ScrollTrigger } = ensureGsap();
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 65%",
      once: true,
      onEnter: () => el.classList.remove("ap-wait"),
    });
    return () => st.kill();
  }, []);

  if (!CASO) return null;

  return (
    <section ref={ref} className="apg ap-wait" aria-labelledby="apg-title">
      <ApogeeVideo />
      <div className="apg-fade" aria-hidden="true" />
      <div className="apg-row">
        <div className="apg-copy">
          <div className="ap-in ap-up" style={{ animationDelay: "300ms" }}>
            <p className="apg-kicker">Resultados reais · {CASO.eixo}</p>
            <h2 id="apg-title" className="apg-title">
              {CASO.t}
            </h2>
          </div>
          <div className="ap-in ap-up" style={{ animationDelay: "500ms" }}>
            <p className="apg-sub">{CASO.sub}</p>
          </div>
          <div className="ap-in ap-up" style={{ animationDelay: "700ms" }}>
            <div className="apg-ctas">
              <a className="apg-btn apg-btn-primary" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Agende sua reunião
              </a>
              <Link href="/cases" className="apg-btn apg-btn-ghost">
                Ver case completo
              </Link>
            </div>
          </div>
        </div>

        <div className="ap-in ap-scale apg-card" style={{ animationDelay: "900ms" }}>
          <ResultadoFunil caso={CASO} delay={1.1} />
        </div>
      </div>
    </section>
  );
}
