import { Section, Kicker, Reveal, Quote } from "@/components/ui";
import { COMPETENCIAS_MARKETING, FUNIL_STEPS } from "@/data/site";

export function Marketing() {
  return (
    <Section id="marketing" n="02" label="Marketing · eixo protagonista" className="sec-mkt">
      <div className="mkt-open">
        <Reveal>
          <h2 className="mega">
            Estratégia antes da mídia.
            <br />
            Dados antes da decisão.
            <br />
            <span className="ac">Otimização antes da escala.</span>
          </h2>
        </Reveal>
      </div>

      <div className="funil">
        <Reveal className="funil-head">
          <Kicker tone="accent">O funil</Kicker>
          <h3>
            Aparecer. Atrair. <span className="ac">Converter.</span>
          </h3>
        </Reveal>
        <Reveal d={280} className="funil-flow">
          {FUNIL_STEPS.map((s, i) => (
            <span key={s} style={{ display: "contents" }}>
              <span className="ff-step">{s}</span>
              {i < FUNIL_STEPS.length - 1 ? (
                <span className="ff-arrow" aria-hidden="true">
                  ↓
                </span>
              ) : null}
            </span>
          ))}
        </Reveal>
      </div>

      <Reveal d={120} className="met-quote">
        <Quote author="Tese fundamental — Biel Strategy">
          Os números não servem apenas para mostrar o que aconteceu. Servem para decidir o que
          fazer depois.
        </Quote>
      </Reveal>

      <Reveal d={160} className="chips">
        <Kicker>Competências</Kicker>
        <div className="chips-row">
          {COMPETENCIAS_MARKETING.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
