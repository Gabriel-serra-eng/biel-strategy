import { Section, SectionTitle, Reveal } from "@/components/ui";
import { COMPETENCIAS_IA } from "@/data/site";

export function IA() {
  return (
    <Section id="ia" n="05" label="IA como apoio" className="sec-ia">
      <div className="two-col">
        <div>
          <SectionTitle accent="amplia o que já existe.">A IA</SectionTitle>
        </div>
        <div className="col-body">
          <Reveal d={80} as="p" className="lede">
            Uso IA como apoio ao marketing, onde ela realmente ajuda: analisar informações, acelerar a criação e
            automatizar rotinas. É uma camada sobre a estratégia, não um substituto para ela.
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
