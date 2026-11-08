/** Testes de lib/market-api.ts com fetch simulado: retry, Retry-After, cooldown, cache e validação. */
import { readMarket, marketApiConfig, resetMarketApiForTests } from '../lib/market-api';

type Step = { status?: number; headers?: Record<string, string>; body?: unknown; networkError?: boolean };

export async function runMarketApiTests() {
  let passed = 0, failed = 0;
  const assert = (ok: boolean, name: string) => { if (ok) { passed++; console.log('  ✅ [PASS] ' + name); } else { failed++; console.error('  ❌ [FAIL] ' + name); } };
  const realFetch = globalThis.fetch;
  let calls = 0;
  const script = (steps: Step[]) => {
    calls = 0;
    globalThis.fetch = (async () => {
      const step = steps[Math.min(calls++, steps.length - 1)];
      if (step.networkError) throw new TypeError('fetch failed');
      const status = step.status ?? 200;
      return new Response(JSON.stringify(step.body ?? { data: { ok: true } }), { status, headers: step.headers });
    }) as typeof fetch;
  };
  const fail = async (path: string) => { try { await readMarket(path); return ''; } catch (e) { return e instanceof Error ? e.message : String(e); } };
  const fresh = () => { resetMarketApiForTests(); Object.assign(marketApiConfig, { minGapMs: 0, retryBaseMs: 0, maxRetries: 2, maxRetryAfterMs: 10000, cooldownMs: 60000 }); };

  console.log('🧪 market-api');
  try {
    fresh(); script([{ status: 503 }, { status: 200 }]);
    const ok = await readMarket('t1');
    assert(calls === 2 && (ok.data as { ok: boolean }).ok === true, '503 seguido de 200 faz retry e devolve os dados');

    fresh(); script([{ status: 429, headers: { 'Retry-After': '0.06' } }, { status: 200 }]);
    const started = Date.now(); await readMarket('t2');
    assert(calls === 2 && Date.now() - started >= 55, 'Retry-After é respeitado antes da nova tentativa');

    fresh(); script([{ status: 429 }]);
    const message = await fail('t3');
    assert(calls === 3 && message.includes('429'), '429 persistente esgota 2 retries (3 chamadas) e informa o status');
    const before = calls; const blocked = await fail('t3b');
    assert(calls === before && blocked.includes('Fonte'), 'Após esgotar, o cooldown bloqueia novas chamadas sem acessar a fonte');

    fresh(); script([{ status: 404 }]);
    await fail('t4');
    assert(calls === 1, '404 não sofre retry');

    fresh(); script([{ networkError: true }, { networkError: true }, { status: 200 }]);
    await readMarket('t5');
    assert(calls === 3, 'Erro de rede é repetido até o limite e se recupera');

    fresh(); script([{ networkError: true }]);
    const net = await fail('t6');
    assert(calls === 3 && net.includes('inacessível'), 'Erro de rede persistente devolve mensagem clara em português');

    fresh(); script([{ status: 200 }]);
    await readMarket('t7'); await readMarket('t7');
    assert(calls === 1, 'Segunda leitura da mesma consulta usa o cache');

    fresh(); script([{ status: 200, body: { error: 'x' } }]);
    assert((await fail('t8')).includes('inválida'), 'Resposta com erro no corpo é rejeitada');
  } catch (error) {
    failed++; console.error('❌ exceção inesperada:', error);
  } finally { globalThis.fetch = realFetch; resetMarketApiForTests(); }
  console.log(`  market-api: ${passed} passaram, ${failed} falharam`);
  return { passed, failed };
}
