/**
 * Rate limiting em memória, por IP, janela fixa.
 *
 * Limitação conhecida e documentada (honesta, não escondida): isto vive na
 * memória do processo Node. Funciona corretamente em `next start`/um único
 * servidor de longa duração. Em hospedagem serverless com múltiplas
 * instâncias (ex.: Vercel Functions escalando horizontalmente), cada
 * instância tem seu próprio contador — o limite passa a ser "por instância",
 * não global. Suficiente para o estágio atual do site (baixo volume); se o
 * volume de spam justificar, a evolução recomendada é mover para um contador
 * compartilhado (ex.: Upstash Redis), conforme já registrado em
 * LEAD_SYSTEM_RESEARCH.md (seção 11).
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Evita crescimento ilimitado do Map em processos de longa duração.
function sweepExpired(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function checkRateLimit(identifier: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  if (buckets.size > 5000) sweepExpired(now);

  const bucket = buckets.get(identifier);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, retryAfterMs: bucket.resetAt - now };
  }

  bucket.count += 1;
  return { allowed: true };
}
