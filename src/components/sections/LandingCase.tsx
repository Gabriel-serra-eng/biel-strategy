"use client";

import { Section, Kicker, Reveal, Button, scrollToSection } from "@/components/ui";
import { LANDING_FUNIL_STEPS, LANDING_COMPETENCIAS } from "@/data/site";

export function LandingCase() {
  return (
    <Section id="landing" label="Landing page · aquisição">
      <Reveal>
        <Kicker tone="accent">Case — Landing page / Aquisição</Kicker>
        <h2 className="mega">
          O site não é o destino.
          <br />
          <span className="ac">É parte da estratégia.</span>
        </h2>
      </Reveal>

      <Reveal d={80} className="landing-lede">
        <p>Um anúncio pode gerar o clique.</p>
        <p>Mas é a experiência depois dele que pode transformar atenção em oportunidade.</p>
        <p>
          Uno <strong>desenvolvimento, marketing e estratégia de conversão</strong> para criar
          páginas pensadas desde a origem para receber tráfego pago.
        </p>
      </Reveal>

      <Reveal d={140} className="chips">
        <Kicker>Competências</Kicker>
        <div className="chips-row">
          {LANDING_COMPETENCIAS.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="funil landing-funil">
        <Reveal d={180} className="funil-flow">
          {LANDING_FUNIL_STEPS.map((s, i) => (
            <span key={s} style={{ display: "contents" }}>
              <span className="ff-step">{s}</span>
              {i < LANDING_FUNIL_STEPS.length - 1 ? (
                <span className="ff-arrow" aria-hidden="true">
                  →
                </span>
              ) : null}
            </span>
          ))}
        </Reveal>
        <Reveal d={220} as="p" className="landing-funil-p">
          A página considera <strong>objetivo, público, oferta e comportamento</strong>, criando
          uma experiência orientada à conversão.
        </Reveal>
      </div>

      <Reveal className="caso-cta">
        <h3 className="fim-title">Do clique ao lead.</h3>
        <p className="fim-lede">Não basta comprar tráfego.</p>
        <p className="fim-lede">
          É preciso ter uma estrutura preparada para{" "}
          <strong>recebê-lo e transformá-lo em oportunidade.</strong>
        </p>
        <span className="kicker kicker-accent">Marketing · Tecnologia · IA · Conversão</span>
        <div className="fim-cta">
          <Button variant="primary" size="lg" onClick={() => scrollToSection("contato")}>
            → Quero construir minha estrutura de aquisição
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
