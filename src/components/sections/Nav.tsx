"use client";

import { useRef } from "react";
import Image from "next/image";
import { scrollToSection } from "@/components/ui/Button";
import { NAV_LINKS } from "@/data/site";
import { useMagnetic } from "@/hooks/useMagnetic";

export function Nav() {
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  useMagnetic(ctaRef);

  return (
    <nav className="nav">
      <a href="#hero" className="nav-mark" aria-label="Biel Strategy — início">
        <Image
          src="/brand/eclipse-symbol-512.webp"
          alt="Biel Strategy"
          width={34}
          height={34}
          className="brand-mark-icon"
          priority
        />
      </a>
      <div className="nav-links">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
      <button ref={ctaRef} type="button" className="nav-cta" onClick={() => scrollToSection("contato")}>
        Agendar conversa
      </button>
    </nav>
  );
}
