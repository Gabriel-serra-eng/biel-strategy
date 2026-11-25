import { HomeHero } from "@/components/home/HomeHero";
import { HomeResultados } from "@/components/home/HomeResultados";
import { HomeMetodo } from "@/components/home/HomeMetodo";
import { CtaBand } from "@/components/home/CtaBand";
import { LegacyHashRedirect } from "@/components/home/LegacyHashRedirect";

// Metadata da Home = a do layout raiz (title, description, canonical "/" e Open Graph).
// Sequência: 1. proposta de valor · 2. resultados · 3. como funciona · 4. contato.
export default function Home() {
  return (
    <>
      <LegacyHashRedirect />
      <HomeHero />
      <HomeResultados />
      <HomeMetodo />
      <CtaBand whatsapp />
    </>
  );
}
