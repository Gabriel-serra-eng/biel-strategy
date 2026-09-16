import Image from "next/image";
import { Wordmark } from "./Wordmark";

interface BrandMarkProps {
  /** Tamanho do ícone Eclipse em px. */
  iconSize?: number;
  /** Tamanho tipográfico do wordmark textual ao lado do ícone. */
  wordmarkSize?: number;
  className?: string;
}

/**
 * Marca Biel Strategy — símbolo Eclipse (planeta negro, anel de eclipse
 * branco, órbita elíptica, ponto de energia vermelho) ao lado do wordmark
 * textual já existente. Usado nos pontos de branding do site (nav, rodapé);
 * o wordmark sozinho (sem ícone) continua em uso nos lugares mais discretos
 * (Hero, topo da página de privacidade) para não sobrecarregar essas telas.
 */
export function BrandMark({ iconSize = 26, wordmarkSize = 13, className = "" }: BrandMarkProps) {
  return (
    <span className={("brand-mark " + className).trim()}>
      <Image
        src="/brand/eclipse-symbol-512.webp"
        alt=""
        width={iconSize}
        height={iconSize}
        className="brand-mark-icon"
        priority
      />
      <Wordmark size={wordmarkSize} />
    </span>
  );
}
