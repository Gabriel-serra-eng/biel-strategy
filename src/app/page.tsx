import { Nav } from "@/components/sections/Nav";
import { ProgressRail } from "@/components/sections/ProgressRail";
import { CursorSpotlight } from "@/components/sections/CursorSpotlight";
import { Hero } from "@/components/sections/Hero";
import { Jornada } from "@/components/sections/Jornada";
import { Marketing } from "@/components/sections/Marketing";
import { Casos } from "@/components/sections/Casos";
import { Tecnologia } from "@/components/sections/Tecnologia";
import { IA } from "@/components/sections/IA";
import { StackStrip } from "@/components/sections/StackStrip";
import { Formacao } from "@/components/sections/Formacao";
import { Visao } from "@/components/sections/Visao";
import { Fechamento } from "@/components/sections/Fechamento";

export default function Home() {
  return (
    <>
      <Nav />
      <ProgressRail />
      <CursorSpotlight />
      <main id="main">
        <Hero />
        <Jornada />
        <Marketing />
        <Casos />
        <Tecnologia />
        <IA />
        <StackStrip />
        <Formacao />
        <Visao />
        <Fechamento />
      </main>
    </>
  );
}
