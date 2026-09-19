import { Section, SectionTitle, Reveal } from "@/components/ui";
import { COMPETENCIAS_TECNOLOGIA } from "@/data/site";

export function Tecnologia() {
  return (
    <Section id="tecnologia" n="04" label="Execução">
      <div className="two-col">
        <div>
          <SectionTitle accent="que sustenta a estratégia.">Tecnologia</SectionTitle>
        </div>
        <div className="col-body">
          <Reveal d={80} as="p" className="lede">
            A campanha de tráfego pago traz o clique. A landing page, o formulário e o rastreamento
            decidem o que acontece depois. Por isso a estrutura é construída sob medida para a sua
            oferta: rápida, clara e conectada aos seus canais de contato, com foco em conversão.
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
