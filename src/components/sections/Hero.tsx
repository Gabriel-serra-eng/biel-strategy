"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button, scrollToSection } from "@/components/ui/Button";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const sel = (s: string) => root.querySelector(s);
    const targets = [
      { el: sel(".hero-kicker"), at: 0 },
      { el: sel(".hl-1"), at: 0.09 },
      { el: sel(".hl-2"), at: 0.26 },
      { el: sel(".hl-3"), at: 0.4 },
      { el: sel(".hero-cta"), at: 0.64 },
      { el: sel(".hero-note"), at: 0.72 },
    ].filter((t) => t.el) as { el: Element; at: number }[];

    const portrait = sel(".hero-portrait");

    const { gsap } = ensureGsap();
    gsap.set(
      targets.map((t) => t.el),
      { opacity: 0, y: 18 },
    );
    if (portrait) gsap.set(portrait, { opacity: 0, y: 18, scale: 0.97 });

    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 0.9 } });
    targets.forEach((t) => tl.to(t.el, { opacity: 1, y: 0 }, t.at));
    if (portrait) tl.to(portrait, { opacity: 1, y: 0, scale: 1, duration: 1.15 }, 0.35);
  }, []);

  return (
    <section id="hero" data-screen-label="Hero" className="hero" ref={rootRef}>
      <HeroBackground />
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-kicker">
            <Wordmark size={13} />
            <span className="hero-role">Estrategista de marketing e aquisição de clientes</span>
          </div>
          <h1 className="hero-title">
            <span className="hl hl-1">
              Marketing
              <br />
              sob medida<span className="ac">.</span>
            </span>
            <span className="hl hl-2">
              Tecnologia que constrói<span className="ac">.</span>
            </span>
            <span className="hl hl-3">
              IA que acelera<span className="ac">.</span>
            </span>
          </h1>
          <div className="hero-cta">
            <Button variant="primary" size="lg" onClick={() => scrollToSection("contato")}>
              Agendar conversa estratégica
            </Button>
            <a className="link-quiet" href="#jornada">
              Ver como eu trabalho ↓
            </a>
          </div>
          <p className="hero-note">
            Gabriel Serra · WhatsApp comercial{" "}
            <a href="https://wa.me/5511920115354" target="_blank" rel="noopener noreferrer">
              +55 11 92011-5354
            </a>
          </p>
        </div>
        <div className="hero-portrait">
          <div className="media">
            <Image
              src="/images/biel-retrato.webp"
              alt="Retrato profissional de Gabriel Serra, fundador da Biel Strategy"
              fill
              sizes="(max-width: 860px) 90vw, 40vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <div className="hero-foot">
        <span className="axis axis-1">Marketing</span>
        <span className="axis axis-2">Tecnologia</span>
        <span className="axis axis-3">IA</span>
        <span className="axis axis-4">Brasil · Exterior · Aquisição</span>
      </div>
    </section>
  );
}
