"use client";

import { useEffect, useRef } from "react";
import { checkSafeBrowsing } from "@/app/actions/checkSafeBrowsing";

const TRANSPARENCY_REPORT_URL =
  "https://transparencyreport.google.com/safe-browsing/search?url=https%3A%2F%2Fbielstrategy.com";

/**
 * Link direto para a verificação oficial do Google Safe Browsing — não depende de nenhuma
 * chamada assíncrona para funcionar. A verificação automática (server-side, via
 * src/app/actions/checkSafeBrowsing.ts) continua rodando em segundo plano quando o rodapé entra
 * na viewport, mas apenas como checagem própria do site; o link sempre abre a página oficial do
 * Google para o visitante conferir o status real.
 */
export function SafeBrowsingStatus() {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || triggered.current) return;
        triggered.current = true;
        checkSafeBrowsing().catch(() => {});
        observer.disconnect();
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      className="fim-safebrowsing"
      href={TRANSPARENCY_REPORT_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Abre a verificação oficial deste domínio em transparencyreport.google.com."
    >
      <span className="fim-safebrowsing-label">
        <span aria-hidden="true">✓</span> Google Safe Browsing
      </span>
      <span className="fim-safebrowsing-status">Verificar status de segurança →</span>
    </a>
  );
}
