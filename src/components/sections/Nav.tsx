"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, WHATSAPP_URL } from "@/data/site";

/**
 * Menu principal no estilo da referência Motion/Apogee, na paleta da marca: pílulas de vidro
 * (links ao centro, CTA à direita) e, abaixo de 1024px, botão 44×44 com ícones Menu/X que se
 * cruzam. O painel mobile nunca é desmontado (só visibilidade), para animar ao abrir e fechar.
 * Cada área é uma rota da mesma aplicação (next/link: navegação client-side, mesma aba).
 * Entrada só no primeiro carregamento (o layout persiste entre as áreas): 0 / 100 / 200ms.
 */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Fecha o painel ao trocar de área.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("nav-locked");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("nav-locked");
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <nav className={"nav" + (open ? " nav-open" : "")} aria-label="Principal">
        <div className="ap-in ap-down" style={{ animationDelay: "0ms" }}>
          <Link href="/" className="nav-mark" aria-label="Biel Strategy — início">
            <Image
              src="/brand/eclipse-symbol-512.webp"
              alt="Biel Strategy"
              width={34}
              height={34}
              className="brand-mark-icon"
              priority
            />
          </Link>
        </div>

        <div className="nav-links ap-in ap-down" style={{ animationDelay: "100ms" }}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href) ? "on" : undefined}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="nav-auth ap-in ap-down" style={{ animationDelay: "200ms" }}>
          <Link href="/contato" className="nav-cta">
            Agendar conversa
          </Link>
        </div>

        <div className="nav-toggle-wrap ap-in ap-down" style={{ animationDelay: "100ms" }}>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="nav-panel"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-ico" aria-hidden="true">
              <svg className="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </span>
          </button>
        </div>
      </nav>

      {/* Fora do <nav> e sempre montado: abre/fecha só por visibilidade, com transição nos dois sentidos. */}
      <div id="nav-panel" className={"nav-overlay" + (open ? " open" : "")} inert={!open}>
        <div className="nav-backdrop" onClick={() => setOpen(false)} />
        <div className="nav-sheet">
          <div className="nav-sheet-links">
            {NAV_LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={isActive(l.href) ? "on" : undefined}
                aria-current={isActive(l.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="nav-sheet-div" />
          <div className="nav-sheet-ctas" style={{ transitionDelay: open ? "350ms" : "0ms" }}>
            <Link href="/contato" className="nav-sheet-primary" onClick={() => setOpen(false)}>
              Agendar conversa estratégica
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="nav-sheet-secondary">
              WhatsApp comercial
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
