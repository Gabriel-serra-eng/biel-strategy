import { Nav } from "@/components/sections/Nav";
import { CursorSpotlight } from "@/components/sections/CursorSpotlight";
import { SiteFooter } from "@/components/sections/SiteFooter";

/**
 * Estrutura comum às áreas do site (Home, Sobre, Serviços, Cases, Contato). O layout persiste
 * entre as rotas — o menu não recarrega; só o conteúdo (template.tsx) troca, com transição.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <CursorSpotlight />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
