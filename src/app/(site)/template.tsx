import { PageTransition } from "@/components/ui/PageTransition";

/**
 * O template remonta a cada troca de área (ao contrário do layout, que persiste), então a
 * transição de entrada roda em toda navegação entre Home, Sobre, Serviços, Cases e Contato.
 */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
