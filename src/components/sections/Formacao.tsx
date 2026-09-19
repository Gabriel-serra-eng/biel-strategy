"use client";

import { Section, SectionTitle, Kicker, Reveal } from "@/components/ui";
import { CERTS } from "@/data/site";

export function Formacao() {
  return (
    <Section id="formacao" n="06" label="Formação">
      <div className="two-col">
        <div>
          <SectionTitle accent="que sustenta a prática.">Formação</SectionTitle>
        </div>
        <div className="col-body">
          <Reveal d={80} className="grad">
            <h4>Graduação em andamento</h4>
          </Reveal>
          <Reveal d={140}>
            <Kicker tone="accent" style={{ marginTop: "8px" }}>
              Certificações selecionadas
            </Kicker>
            <div className="chips-row">
              {CERTS.map((t) => (
                <span key={t} className="chip chip-sm">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
