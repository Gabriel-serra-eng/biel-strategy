import { Marketing } from "@/components/sections/Marketing";
import { ServicosCards } from "@/components/sections/ServicosCards";
import { Jornada } from "@/components/sections/Jornada";
import { Tecnologia } from "@/components/sections/Tecnologia";
import { CtaBand } from "@/components/home/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Serviços de Marketing e Tráfego Pago | Biel Strategy",
  description:
    "Estratégia de marketing digital e aquisição de clientes, tráfego pago com Google Ads e Meta Ads, landing pages para conversão e rastreamento e mensuração.",
  path: "/servicos",
});

export default function ServicosPage() {
  return (
    <>
      <Marketing n="01" titleAs="h1" />
      <ServicosCards n="02" />
      <Jornada n="03" />
      <Tecnologia n="04" />
      <CtaBand />
    </>
  );
}
