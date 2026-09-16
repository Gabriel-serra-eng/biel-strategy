"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Section, SectionTitle, Reveal, Callout, Pending, Button, scrollToSection } from "@/components/ui";
import { CASOS } from "@/data/site";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

/** Contagem de 0 até o valor ao entrar na viewport — mesmo gatilho de scroll do <Reveal>. */
function CasoStatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = parseInt(value.replace(/\D/g, ""), 10);
    if (Number.isNaN(target)) {
      el.textContent = value;
      return;
    }
    if (prefersReducedMotion()) {
      el.textContent = value;
      return;
    }
    el.textContent = "0";
    const { gsap, ScrollTrigger } = ensureGsap();
    const counter = { n: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          n: target,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(counter.n));
          },
        });
      },
    });
    return () => trigger.kill();
  }, [value]);

  return (
    <span className="caso-stat-v" ref={ref}>
      {value}
    </span>
  );
}

export function Casos() {
  const [ab, setAb] = useState(0);
  const [slide, setSlide] = useState(0);
  const c = CASOS[ab];
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstRender = useRef(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setSlide(0);
    const el = panelRef.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    gsap.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" });
  }, [ab]);

  const slides = c.carrossel?.slides;
  function goSlide(next: number) {
    if (!slides) return;
    setSlide(Math.max(0, Math.min(slides.length - 1, next)));
  }

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

      <div className="caso-panel" ref={panelRef}>
        <div className="caso">
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
              {c.funil ? (
                <div className="funil-flow">
                  {c.funil.map((step, i) => (
                    <span key={step} style={{ display: "contents" }}>
                      <span className="ff-step">{step}</span>
                      {i < c.funil!.length - 1 ? (
                        <span className="ff-arrow" aria-hidden="true">
                          ↓
                        </span>
                      ) : null}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="caso-block">
              <span className="caso-l">Participação</span>
              <p>{c.r}</p>
            </div>
            {c.stats ? (
              <div className="caso-block">
                <span className="caso-l">{c.resultadosRotulo ?? "Resultados"}</span>
                <div className="caso-stats">
                  {c.stats.map((s, i) => (
                    <Reveal key={s.rotulo} d={i * 120} className="caso-stat">
                      <CasoStatValue value={s.valor} />
                      <span className="caso-stat-l">{s.rotulo}</span>
                    </Reveal>
                  ))}
                </div>
                {c.statsNota ? <span className="caso-stats-nota">{c.statsNota}</span> : null}
              </div>
            ) : null}
            {c.nota ? (
              <Callout title="Importante">
                <span>{c.nota}</span>
              </Callout>
            ) : null}
          </div>
          <div className="caso-media-wrap">
            <div
              className="caso-media"
              style={slides && slides[slide].aspect ? { aspectRatio: slides[slide].aspect } : undefined}
              onTouchStart={
                slides
                  ? (e) => {
                      touchStartX.current = e.touches[0].clientX;
                    }
                  : undefined
              }
              onTouchEnd={
                slides
                  ? (e) => {
                      if (touchStartX.current == null) return;
                      const dx = e.changedTouches[0].clientX - touchStartX.current;
                      if (dx > 40) goSlide(slide - 1);
                      else if (dx < -40) goSlide(slide + 1);
                      touchStartX.current = null;
                    }
                  : undefined
              }
            >
              {slides && slides[slide].imagem ? (
                <div className="caso-media-photo">
                  <Image
                    src={slides[slide].imagem!}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 860px) 90vw, 40vw"
                    className="caso-media-photo-bg"
                  />
                  <Image
                    src={slides[slide].imagem!}
                    alt={`${slides[slide].rotulo} — ${slides[slide].legenda}`}
                    fill
                    sizes="(max-width: 860px) 90vw, 40vw"
                    className="caso-media-photo-fg"
                  />
                </div>
              ) : slides ? (
                <div className="media-placeholder">
                  <span>
                    {slides[slide].rotulo} — {slides[slide].legenda}
                    <br />
                    <Pending>IMAGEM A VALIDAR</Pending>
                  </span>
                </div>
              ) : (
                <>
                  <div className="media-placeholder">
                    <span>Imagem do caso — a validar</span>
                  </div>
                  <span className="portrait-cap">
                    <Pending>IMAGEM A VALIDAR</Pending>
                  </span>
                </>
              )}
            </div>
            {slides && slides[slide].imagem ? (
              <span className="caso-carrossel-cap">
                {slides[slide].rotulo} — {slides[slide].legenda}
              </span>
            ) : null}
            {slides ? (
              <div className="caso-carrossel-nav" role="tablist" aria-label="Imagens do caso">
                {slides.map((s, i) => (
                  <button
                    key={s.rotulo}
                    type="button"
                    role="tab"
                    aria-selected={i === slide}
                    aria-label={s.rotulo}
                    className={"caso-carrossel-dot" + (i === slide ? " on" : "")}
                    onClick={() => goSlide(i)}
                  />
                ))}
                <span className="caso-carrossel-count">
                  {String(slide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {c.metaTitulo ? (
          <Callout title={c.metaTitulo}>
            <span>{c.metaTexto}</span>
          </Callout>
        ) : null}

        {c.expansao ? (
          <div className="caso-block">
            <span className="caso-l">Expansão de aquisição</span>
            <div className="visao-grid">
              {c.expansao.map((e) => (
                <div key={e.canal} className="vc">
                  <h4>{e.canal}</h4>
                  <p>{e.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {c.cta ? (
          <div className="caso-cta">
            <h3 className="fim-title">{c.cta.titulo}</h3>
            <p className="fim-lede">{c.cta.texto1}</p>
            <p className="fim-lede">{c.cta.texto2}</p>
            <p className="fim-lede">{c.cta.texto3}</p>
            <p className="caso-cta-reforco">
              {c.cta.reforco1}
              <br />
              {c.cta.reforco2}
            </p>
            <span className="kicker kicker-accent">{c.cta.tag}</span>
            <div className="fim-cta">
              <Button variant="primary" size="lg" onClick={() => scrollToSection("contato")}>
                {c.cta.botao}
              </Button>
            </div>
            <p className="hero-note">{c.cta.nota}</p>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
