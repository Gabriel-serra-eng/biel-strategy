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
    const { gsap, ScrollTrigger } = ensureGsap();
    const counter = { n: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        // Só zera o número quando a animação realmente vai rodar (elemento entrou na viewport).
        // Se isso rodasse incondicionalmente no mount, um crawler que renderiza a página sem
        // rolar a tela (ex.: Googlebot) poderia indexar "0" no lugar do valor real do resultado.
        el.textContent = "0";
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

const VISIBLE_CASOS = CASOS.filter((c) => !c.oculto);

export function Casos() {
  const [ab, setAb] = useState(0);
  const [slide, setSlide] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const c = VISIBLE_CASOS[ab];
  const panelRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const incomingRef = useRef<HTMLDivElement | null>(null);
  const outgoingRef = useRef<HTMLDivElement | null>(null);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const firstRender = useRef(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setSlide(0);
    setOutgoing(null);
    const el = panelRef.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    gsap.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" });
  }, [ab]);

  const slides = c.carrossel?.slides;
  // Ao trocar de aba (ab), `c`/`slides` já refletem o novo caso no mesmo render, mas o estado
  // `slide` só é resetado para 0 em um useEffect (que roda depois do render). Se o caso anterior
  // tinha mais slides que o novo (ex.: Cássia no slide 2 → Landing Page com 1 slide só), `slide`
  // fica temporariamente fora dos limites do novo array e `slides[slide]` é `undefined` — indexar
  // direto quebra o render inteiro. `activeSlide` mantém o índice sempre válido para o array atual.
  const activeSlide = slides && slides.length > 0 ? Math.min(slide, slides.length - 1) : 0;
  function goSlide(next: number) {
    if (!slides || outgoing !== null) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, next));
    if (clamped === slide) return;
    if (prefersReducedMotion()) {
      setSlide(clamped);
      return;
    }
    setOutgoing(slide);
    setSlide(clamped);
  }

  // Crossfade do carrossel: mesma engine/easing já usada no crossfade de troca de case (expo.out) e no
  // contador de resultados (power2.out) — micro zoom-out no slide que sai, fade+scale suave no que entra,
  // o frame acompanha a proporção da imagem nova e o indicador 01/02 pisca discretamente junto.
  useEffect(() => {
    if (outgoing === null || !slides) return;
    const { gsap } = ensureGsap();
    const frameEl = frameRef.current;
    const inEl = incomingRef.current;
    const outEl = outgoingRef.current;
    const fromAspect = slides[outgoing]?.aspect;
    const toAspect = slides[slide]?.aspect;
    gsap.killTweensOf([frameEl, inEl, outEl, countRef.current].filter(Boolean));
    const tl = gsap.timeline({ onComplete: () => setOutgoing(null) });
    if (frameEl && fromAspect && toAspect && fromAspect !== toAspect) {
      tl.fromTo(frameEl, { aspectRatio: fromAspect }, { aspectRatio: toAspect, duration: 0.6, ease: "expo.out" }, 0);
    }
    if (outEl) {
      tl.to(outEl, { opacity: 0, scale: 0.97, duration: 0.45, ease: "power2.out" }, 0);
    }
    if (inEl) {
      tl.fromTo(inEl, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" }, 0);
    }
    if (countRef.current) {
      tl.fromTo(countRef.current, { opacity: 0.25 }, { opacity: 1, duration: 0.4, ease: "power1.out" }, 0.08);
    }
    // Rede de segurança: garante que o slide anterior nunca fique preso na tela mesmo se o
    // onComplete do GSAP não disparar (ex.: dupla invocação de efeitos em desenvolvimento).
    const safety = window.setTimeout(() => setOutgoing(null), 900);
    return () => {
      tl.kill();
      window.clearTimeout(safety);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide]);

  // Avanço automático do carrossel — reaproveita o mesmo goSlide/crossfade acima, sem nenhuma
  // lógica de transição nova. Só agenda o próximo avanço depois que o crossfade anterior termina
  // (outgoing volta a null), para o goSlide agendado nunca ler um "outgoing" desatualizado da
  // troca anterior. Qualquer interação manual (clique/swipe) também reagenda a partir dali —
  // nunca quebra o loop.
  useEffect(() => {
    if (!slides || slides.length < 2 || prefersReducedMotion() || outgoing !== null) return;
    const timer = window.setTimeout(() => {
      goSlide((slide + 1) % slides.length);
    }, 3800);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide, slides, outgoing]);

  return (
    <Section id="casos" n="03" label="Selected work" className="sec-hero">
      <div className="two-col traj-intro">
        <div>
          <SectionTitle accent="e projetos construídos.">Casos de marketing</SectionTitle>
        </div>
      </div>

      <Reveal className="casos-nav" role="tablist">
        {VISIBLE_CASOS.map((x, i) => (
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
              ref={frameRef}
              style={
                slides && (slides[activeSlide].imagem || slides[activeSlide].video)
                  ? { aspectRatio: slides[activeSlide].aspect, overflow: "hidden" }
                  : undefined
              }
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
              {slides && slides[activeSlide].video ? (
                <div className="caso-media-photo">
                  <video
                    className="caso-media-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-label={`${slides[activeSlide].rotulo} — ${slides[activeSlide].legenda}`}
                  >
                    {/* WebM/VP9 primeiro (bem mais leve, mesmo conteúdo/qualidade); MP4/H.264 como
                        fallback para navegadores sem suporte a VP9 — o browser escolhe a primeira
                        fonte compatível sozinho, sem baixar as duas. */}
                    <source src={slides[activeSlide].video!.replace(/\.mp4$/, ".webm")} type="video/webm" />
                    <source src={slides[activeSlide].video} type="video/mp4" />
                  </video>
                </div>
              ) : slides && slides[activeSlide].imagem ? (
                <>
                  {outgoing !== null && slides[outgoing]?.imagem ? (
                    <div className="caso-media-photo" ref={outgoingRef}>
                      <Image
                        src={slides[outgoing].imagem!}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="128px"
                        className="caso-media-photo-bg"
                      />
                      <Image
                        src={slides[outgoing].imagem!}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(max-width: 860px) 90vw, 40vw"
                        className="caso-media-photo-fg"
                      />
                    </div>
                  ) : null}
                  <div className="caso-media-photo" ref={incomingRef}>
                    <Image
                      src={slides[activeSlide].imagem!}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="128px"
                      className="caso-media-photo-bg"
                    />
                    <Image
                      src={slides[activeSlide].imagem!}
                      alt={`${slides[activeSlide].rotulo} — ${slides[activeSlide].legenda}`}
                      fill
                      sizes="(max-width: 860px) 90vw, 40vw"
                      className="caso-media-photo-fg"
                    />
                  </div>
                </>
              ) : slides ? (
                <div className="media-placeholder">
                  <span>
                    {slides[activeSlide].rotulo} — {slides[activeSlide].legenda}
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
            {slides && (slides[activeSlide].imagem || slides[activeSlide].video) ? (
              <span className="caso-carrossel-cap">
                {slides[activeSlide].rotulo} — {slides[activeSlide].legenda}
              </span>
            ) : null}
            {slides ? (
              <div className="caso-carrossel-nav" role="tablist" aria-label="Imagens do caso">
                {slides.map((s, i) => (
                  <button
                    key={s.rotulo}
                    type="button"
                    role="tab"
                    aria-selected={i === activeSlide}
                    aria-label={s.rotulo}
                    className={"caso-carrossel-dot" + (i === activeSlide ? " on" : "")}
                    onClick={() => goSlide(i)}
                  />
                ))}
                <span className="caso-carrossel-count" ref={countRef}>
                  {String(activeSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
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
            {c.cta.texto3 ? <p className="fim-lede">{c.cta.texto3}</p> : null}
            {c.cta.reforco1 ? (
              <p className="caso-cta-reforco">
                {c.cta.reforco1}
                {c.cta.reforco2 ? (
                  <>
                    <br />
                    {c.cta.reforco2}
                  </>
                ) : null}
              </p>
            ) : null}
            {c.cta.tag ? <span className="kicker kicker-accent">{c.cta.tag}</span> : null}
            <div className="fim-cta">
              <Button variant="primary" size="lg" onClick={() => scrollToSection("contato")}>
                {c.cta.botao}
              </Button>
            </div>
            {c.cta.nota ? <p className="hero-note">{c.cta.nota}</p> : null}
          </div>
        ) : null}
      </div>
    </Section>
  );
}
