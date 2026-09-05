import { Section, SectionTitle, Reveal } from "@/components/ui";
import { COMPETENCIAS_IA } from "@/data/site";

export function IA() {
  return (
    <Section id="ia" n="05" label="IA · camada complementar" className="sec-ia">
      <div className="two-col">
        <div>
          <SectionTitle accent="amplia o que já existe.">A IA</SectionTitle>
        </div>
        <div className="col-body">
          <Reveal d={80} as="p" className="lede">
            Não é a profissão principal. LLMs pontuam a prontidão de leads antes do contato humano
            e aceleram a prototipagem de interface — uma camada sobre Marketing e Tecnologia, não
            acima deles.
          </Reveal>
          <Reveal d={160} className="chips">
            <div className="chips-row">
              {COMPETENCIAS_IA.map((t) => (
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
