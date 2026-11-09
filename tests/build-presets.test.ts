/** Testes de lib/data-engine/build-presets.ts: todo preset cadastrado precisa ser válido e ter origem. */
import { BUILD_PRESETS, presetsFor, validatePreset, type BuildPreset } from '../lib/data-engine/build-presets';

export function runBuildPresetsTests() {
  let passed = 0, failed = 0;
  const assert = (ok: boolean, name: string) => { if (ok) { passed++; console.log('  ✅ [PASS] ' + name); } else { failed++; console.error('  ❌ [FAIL] ' + name); } };
  console.log('🧪 build-presets');
  const base = BUILD_PRESETS[0];
  assert(BUILD_PRESETS.every(p => validatePreset(p).length === 0), 'todos os presets cadastrados são válidos');
  assert(new Set(BUILD_PRESETS.map(p => p.id)).size === BUILD_PRESETS.length, 'ids são únicos');
  assert(BUILD_PRESETS.every(p => p.status !== 'TESTADO_NO_JOGO'), 'nenhum preset consta como testado sem prova registrada');
  assert(presetsFor('dante', 'dano').length === 2 && presetsFor('dante', 'suporte').length === 2 && presetsFor('dante', 'controle').length === 0, 'filtra por alvo e papel (controle ainda vazio)');
  assert(validatePreset({ ...base, status: 'TESTADO_NO_JOGO' }).length > 0, 'testada sem prova é recusada');
  assert(validatePreset({ ...base, source: { ...base.source, url: 'http://x' } }).length > 0, 'fonte sem https é recusada');
  assert(validatePreset({ ...base, source: { ...base.source, retrievedAt: 'ontem' } }).length > 0, 'fonte sem data válida é recusada');
  const many: BuildPreset = { ...base, shards: [{ count: 3, color: 'ambar', tauforged: null, effect: 'a' }, { count: 3, color: 'carmesim', tauforged: null, effect: 'b' }] };
  assert(validatePreset(many).includes('mais de 5 fragmentos'), 'mais de 5 fragmentos é recusado');
  assert(validatePreset({ ...base, shards: [{ count: 1, color: 'rosa' as never, tauforged: null, effect: 'a' }] }).length > 0, 'cor inválida é recusada');
  return { passed, failed };
}
