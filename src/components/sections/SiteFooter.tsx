import Link from "next/link";
import { BrandMark } from "@/components/ui";
import { SecurityStatus } from "@/components/sections/SecurityStatus";
import { SafeBrowsingStatus } from "@/components/sections/SafeBrowsingStatus";

/**
 * Rodapé comum a todas as áreas — o mesmo bloco que antes ficava no fim da página única
 * (Fechamento), sem alteração de conteúdo, Security Status ou Safe Browsing.
 */
export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="fim-foot">
        <span>
          <BrandMark iconSize={20} wordmarkSize={12} />
        </span>
        <span>Marketing de aquisição · Tecnologia · IA</span>
        <SecurityStatus />
        <SafeBrowsingStatus />
        <Link className="fim-legal" href="/politica-de-privacidade">
          Política de Privacidade
        </Link>
      </div>
    </footer>
  );
}
