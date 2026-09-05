import { Reveal } from "@/components/ui";
import { NIVEIS } from "@/data/site";

export function StackStrip() {
  return (
    <div className="stack-strip">
      {NIVEIS.map(({ t, d }, i) => (
        <Reveal key={t} d={i * 50} className="ss-item">
          <span className="ss-t">{t}</span>
          <span className="ss-d">{d}</span>
        </Reveal>
      ))}
    </div>
  );
}
