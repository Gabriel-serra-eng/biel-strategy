import { Section, Kicker, Reveal, Quote } from "@/components/ui";
import { COMPETENCIAS_MARKETING, FUNIL_STEPS } from "@/data/site";

interface MarketingProps {
  n?: string;
  /** h1 quando a seção abre a área Serviços. */
  titleAs?: "h1" | "h2";
}

export function Marketing({ n = "02", titleAs: H = "h2" }: MarketingProps) {
  return (
    <Section id="marketing" n={n} label="Estratégia de aquisição" className="sec-mkt">
      <div className="mkt-open">
        <Reveal>
          <H className="mega">
            Estratégia antes da mídia.
            <br />
            Dados antes da decisão.
            <br />
            <span className="ac">Otimização antes da escala.</span>
          </H>
        </Reveal>
      </div>

      <div className="funil">
        <Reveal className="funil-head">
          <Kicker tone="accent">O funil de aquisição</Kicker>
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
        <Kicker>Onde atuo</Kicker>
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
