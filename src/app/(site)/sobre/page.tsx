import Image from "next/image";
import { ChapterMark, Reveal } from "@/components/ui";
import { StackStrip } from "@/components/sections/StackStrip";
import { IA } from "@/components/sections/IA";
import { Formacao } from "@/components/sections/Formacao";
import { CtaBand } from "@/components/home/CtaBand";
import { SOBRE_LEDE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sobre Gabriel Serra | Biel Strategy",
  description:
    "Gabriel Serra, estrategista de marketing e aquisição de clientes: estratégia de marketing digital e tráfego pago, tecnologia que sustenta a estratégia, IA como apoio e formação.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <section className="sec sec-hero sobre" data-screen-label="Sobre">
        <div className="sobre-grid">
          <div className="sobre-copy">
            <Reveal className="sec-head">
              <ChapterMark n="01" label="Sobre" />
            </Reveal>
            <Reveal as="h1" className="sec-title sec-title-lg">
              Gabriel <span className="ac">Serra</span>
            </Reveal>
            <Reveal d={80} as="p" className="hero-role sobre-role">
              Estrategista de marketing e aquisição de clientes
            </Reveal>
            <Reveal d={160} as="p" className="lede sobre-lede">
              {SOBRE_LEDE}
            </Reveal>
          </div>
          <Reveal d={120} className="hero-portrait sobre-portrait">
            <div className="media">
              <Image
                src="/images/biel-retrato.webp"
                alt="Retrato profissional de Gabriel Serra, fundador da Biel Strategy"
                fill
                sizes="(max-width: 860px) 90vw, 40vw"
                preload
                loading="eager"
                fetchPriority="high"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
        </div>
      </section>
      <StackStrip />
      <IA n="02" />
      <Formacao n="03" />
      <CtaBand />
    </>
  );
}
