"use client";

import { useEffect, useState } from "react";

/**
 * Verificações reais, feitas pelo próprio navegador nesta página — não é um selo, certificação
 * ou serviço de terceiros. Cada item só aparece se puder ser confirmado tecnicamente, e o texto
 * exibido descreve exatamente o que foi checado (nunca uma garantia genérica de "segurança"):
 * - HTTPS Encrypted: `location.protocol` do carregamento atual é "https:".
 * - No Mixed Content: HTTPS + nenhum recurso da página apontando para `http://`.
 * - Security Headers Present: cabeçalhos lidos de uma requisição real à própria origem (mesma
 *   origem, sem credenciais, sem chave de API), confirmando o que o servidor de fato enviou.
 */
export function SecurityStatus() {
  const [checks, setChecks] = useState<string[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const found: string[] = [];
      const isHttps = window.location.protocol === "https:";
      if (isHttps) found.push("HTTPS Encrypted");

      const hasInsecureResource = Array.from(document.querySelectorAll("[src],[href]")).some((el) => {
        const url = el.getAttribute("src") || el.getAttribute("href") || "";
        return url.startsWith("http://");
      });
      if (isHttps && !hasInsecureResource) found.push("No Mixed Content");

      try {
        const res = await fetch(window.location.origin + "/", { method: "HEAD", cache: "no-store" });
        const hasSecurityHeader = [
          "strict-transport-security",
          "x-content-type-options",
          "referrer-policy",
          "x-frame-options",
        ].some((header) => res.headers.get(header));
        if (hasSecurityHeader) found.push("Security Headers Present");
      } catch {
        // Sem rede ou bloqueado: não afirma nada sobre cabeçalhos que não pôde confirmar.
      }

      if (!cancelled) setChecks(found);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!checks || checks.length === 0) return null;

  return (
    <span
      className="fim-security"
      title="Verificações reais feitas pelo navegador nesta página — não é um selo ou certificação de terceiros."
      aria-label={`Security status: ${checks.join(", ")}. Verificação feita em tempo real por este navegador.`}
    >
      <span className="fim-security-label">Security Status</span>
      {checks.map((c) => (
        <span key={c} className="fim-security-check">
          <span aria-hidden="true">✓</span> {c}
        </span>
      ))}
    </span>
  );
}
