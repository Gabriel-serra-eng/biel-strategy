import { Section, Reveal } from "@/components/ui";
import { SERVICOS } from "@/data/site";

/** Serviços em cards — mesmos nomes e descrições do JSON-LD (fonte única em site.ts). */
export function ServicosCards({ n = "02" }: { n?: string }) {
  return (
    <Section id="servicos" n={n} label="Serviços" className="sec-svc">
      <h2 className="sr-only">Serviços</h2>
      <div className="svc-grid">
        {SERVICOS.map((s, i) => (
          <Reveal key={s.slug} d={i * 90} as="article" className="svc-card">
            <span className="svc-n">{String(i + 1).padStart(2, "0")}</span>
            <h3>{s.name}</h3>
            <p>{s.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
