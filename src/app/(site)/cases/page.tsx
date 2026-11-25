import { Casos } from "@/components/sections/Casos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cases de Marketing e Geração de Leads | Biel Strategy",
  description:
    "Cases reais de marketing e geração de leads: 830 cliques e 129 contatos iniciados pelo WhatsApp em 30 dias com Meta Ads, e landing pages pensadas para tráfego pago.",
  path: "/cases",
});

export default function CasesPage() {
  return <Casos n="01" titleAs="h1" />;
}
