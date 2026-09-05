import { Section, SectionTitle, Reveal } from "@/components/ui";
import { VISAO_ITEMS } from "@/data/site";

export function Visao() {
  return (
    <Section id="visao" n="07" label="Currently building" className="sec-visao">
      <div className="two-col">
        <div>
          <SectionTitle accent="continua sendo construída.">A operação</SectionTitle>
        </div>
      </div>
      <div className="visao-grid">
        {VISAO_ITEMS.map(({ t, d }, i) => (
          <Reveal key={t} d={i * 70} className="vc">
            <h4>{t}</h4>
            <p>{d}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
