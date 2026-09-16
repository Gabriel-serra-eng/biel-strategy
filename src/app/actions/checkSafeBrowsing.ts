"use server";

import { SITE_URL } from "@/data/site";

export type SafeBrowsingResult =
  | { status: "no_threat" }
  | { status: "threat"; threatTypes: string[] }
  | { status: "unavailable" };

interface ThreatMatchesResponse {
  matches?: { threatType?: string }[];
}

// Cache em memória do processo — evita bater na API do Google a cada visitante que rola até o
// rodapé. Suficiente para o volume de tráfego do site; reinicia a cada deploy/restart do servidor.
const CACHE_MS = 15 * 60 * 1000;
let cache: { result: SafeBrowsingResult; at: number } | null = null;

/**
 * Consulta real à Google Safe Browsing Lookup API v4 (API oficial e documentada — não é
 * scraping do Transparency Report). A chave (SAFE_BROWSING_API_KEY) só existe aqui, em código
 * "use server": nunca é enviada ao bundle do cliente. Sem a chave configurada, retorna
 * "unavailable" — o status exibido nunca é fixado como positivo no código, depende sempre da
 * resposta real (ou da ausência dela).
 */
export async function checkSafeBrowsing(): Promise<SafeBrowsingResult> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.result;

  const apiKey = process.env.SAFE_BROWSING_API_KEY;
  if (!apiKey) return { status: "unavailable" };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: { clientId: "biel-strategy-site", clientVersion: "1.0.0" },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url: SITE_URL }],
        },
      }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!res.ok) return { status: "unavailable" };

    const data = (await res.json()) as ThreatMatchesResponse;
    const result: SafeBrowsingResult = data.matches?.length
      ? { status: "threat", threatTypes: [...new Set(data.matches.map((m) => m.threatType ?? "UNKNOWN"))] }
      : { status: "no_threat" };

    cache = { result, at: Date.now() };
    return result;
  } catch {
    return { status: "unavailable" };
  }
}
