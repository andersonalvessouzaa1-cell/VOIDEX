/** Server-side, read-only integration. One local process; deployment needs a shared limiter. */
const API = 'https://api.warframe.market/v2/';
const cache = new Map<string, { data: unknown; fetchedAt: string; expiresAt: number }>();
const pending = new Map<string, Promise<{ data: unknown; fetchedAt: string }>>();
let gate: Promise<void> = Promise.resolve();
let nextRequestAt = 0;
let cooldownUntil = 0;

export const marketApiConfig = { minGapMs: 1000, retryBaseMs: 1000, maxRetries: 2, maxRetryAfterMs: 10000, cooldownMs: 60000 };
export function resetMarketApiForTests() { cache.clear(); pending.clear(); gate = Promise.resolve(); nextRequestAt = 0; cooldownUntil = 0; }
const retryable = (status: number) => status === 429 || status >= 500;
function retryDelay(response: Response | null, attempt: number) {
  const header = Number(response?.headers.get('Retry-After'));
  const wait = Number.isFinite(header) && header > 0 ? header * 1000 : marketApiConfig.retryBaseMs * 2 ** attempt;
  return Math.min(wait, marketApiConfig.maxRetryAfterMs);
}
async function fetchWithRetry(url: string, init: RequestInit): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    let response: Response | null = null;
    try {
      response = await fetch(url, { ...init, signal: AbortSignal.timeout(12000) });
      if (!retryable(response.status) || attempt >= marketApiConfig.maxRetries) return response;
    } catch {
      if (attempt >= marketApiConfig.maxRetries) throw new Error('A fonte de mercado está inacessível. Tente novamente em instantes.');
    }
    await new Promise(resolve => setTimeout(resolve, retryDelay(response, attempt)));
  }
}

export async function readMarket(path: string, platform = 'pc', crossplay = false) {
  const key = `${path}:${platform}:${crossplay}`;
  const cached = cache.get(key);
  if (cached && cached.expiresAt > Date.now()) return { data: cached.data, fetchedAt: cached.fetchedAt };
  const inflight = pending.get(key);
  if (inflight) return inflight;
  if (pending.size >= 8 || cooldownUntil > Date.now()) throw new Error('Fonte ocupada. Aguarde um minuto antes de consultar novamente.');
  const task = (async () => {
    const previous = gate;
    let release!: () => void;
    gate = new Promise<void>(resolve => { release = resolve; });
    try {
      await previous;
      if (cooldownUntil > Date.now()) throw new Error('Fonte temporariamente indisponível.');
      const delay = Math.max(0, nextRequestAt - Date.now());
      if (delay) await new Promise(resolve => setTimeout(resolve, delay));
      nextRequestAt = Date.now() + marketApiConfig.minGapMs;
      const response = await fetchWithRetry(API + path, {
        headers: { 'User-Agent': 'VOIDEX/0.1 (local read-only market analysis)', Language: 'pt', Platform: platform, Crossplay: String(crossplay) },
        cache: 'no-store',
      });
      if (!response.ok) {
        if (retryable(response.status)) cooldownUntil = Date.now() + marketApiConfig.cooldownMs;
        throw new Error(`A fonte de mercado não respondeu à consulta (${response.status}).`);
      }
      const body = (await response.json()) as { error?: unknown; data?: unknown } | null;
      if (!body || body.error || body.data === undefined || body.data === null) throw new Error('Resposta de mercado inválida.');
      const result = { data: body.data as unknown, fetchedAt: new Date().toISOString() };
      if (cache.size >= 64) cache.delete(cache.keys().next().value!);
      cache.set(key, { ...result, expiresAt: Date.now() + (path === 'items' ? 3600000 : 60000) });
      return result;
    } catch (error) {
      cooldownUntil = Math.max(cooldownUntil, Date.now() + 10000);
      throw error;
    } finally { release(); }
  })();
  pending.set(key, task);
  try { return await task; } finally { pending.delete(key); }
}
