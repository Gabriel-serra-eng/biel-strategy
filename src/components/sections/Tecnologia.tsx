import { Section, SectionTitle, Reveal } from "@/components/ui";
import { COMPETENCIAS_TECNOLOGIA } from "@/data/site";

export function Tecnologia() {
  return (
    <Section id="tecnologia" n="04" label="Tecnologia · segundo eixo">
      <div className="two-col">
        <div>
          <SectionTitle accent="constrói a máquina.">Tecnologia</SectionTitle>
        </div>
        <div className="col-body">
          <Reveal d={80} as="p" className="lede">
            Página lenta e formulário genérico matam mídia paga. Por isso a mesma pessoa que
            estrutura a campanha também constrói a página — em React, sem atrito.
          </Reveal>
          <Reveal d={160} className="chips">
            <div className="chips-row">
              {COMPETENCIAS_TECNOLOGIA.map((t) => (
                <span key={t} className="chip">
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
