"use client";

import { Section, SectionTitle, Kicker, Reveal, Pending } from "@/components/ui";
import { scrollToSection } from "@/components/ui/Button";
import { CERTS } from "@/data/site";

export function Formacao() {
  return (
    <Section id="formacao" n="06" label="Credentials">
      <div className="two-col">
        <div>
          <SectionTitle accent="e credenciais selecionadas.">Formação</SectionTitle>
        </div>
        <div className="col-body">
          <Reveal d={80} className="grad">
            <h4>Graduação em andamento</h4>
            <p>
              Curso e instituição <Pending>VALIDAR</Pending>
            </p>
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
            <button type="button" className="link-quiet cred-more" onClick={() => scrollToSection("formacao")}>
              Ver credenciais →
            </button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
