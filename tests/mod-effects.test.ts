/** Testes de lib/data-engine/mod-effects.ts com dados reais da fonte (Stretch e Blind Rage). */
import { parseEffectLine, effectsAtRank, abilityTotals, hasAbilityEffect, type LevelStat } from '../lib/data-engine/mod-effects';

const STRETCH: LevelStat[] = ['7.5', '15', '22.5', '30', '37.5', '45'].map(v => ({ stats: [`+${v}% Ability Range`] }));

export function runModEffectsTests() {
  let passed = 0, failed = 0;
  const assert = (ok: boolean, name: string) => { if (ok) { passed++; console.log('  ✅ [PASS] ' + name); } else { failed++; console.error('  ❌ [FAIL] ' + name); } };
  console.log('🧪 mod-effects');
  // Blind Rage real: nível n tem +(9n+9)% Força e -(5n+5)% Eficiência (nível 10: +99% e -55%).
  const blind: LevelStat[] = Array.from({ length: 11 }, (_, n) => ({ stats: [`+${9 * n + 9}% Ability Strength`, `-${5 * n + 5}% Ability Efficiency`] }));
  assert(blind.length === 11, 'fixture do Blind Rage tem 11 níveis');
  assert(JSON.stringify(parseEffectLine('+9% Ability Strength')) === '{"stat":"Ability Strength","value":9,"unit":"%","raw":"+9% Ability Strength"}', 'lê efeito positivo com %');
  assert(parseEffectLine('-55% Ability Efficiency')?.value === -55 && parseEffectLine('+7.5% Ability Range')?.value === 7.5, 'lê negativo e decimal');
  assert(parseEffectLine('On Energy Pickup:') === null && parseEffectLine('') === null, 'linha fora do padrão devolve nulo');
  assert(effectsAtRank(STRETCH, 5)?.parsed[0].value === 45 && effectsAtRank(STRETCH, 6) === null && effectsAtRank(undefined, 0) === null, 'efeito por nível e nível inexistente');
  assert(hasAbilityEffect(STRETCH, 5) && !hasAbilityEffect([{ stats: ['+10% Health'] }], 0), 'identifica mod de habilidade');
  const r = abilityTotals([{ levelStats: blind, rank: 10 }, { levelStats: STRETCH, rank: 5 }]);
  assert(r.totals.forca === 199 && r.totals.eficiencia === 45 && r.totals.alcance === 145 && r.totals.duracao === 100, 'Blind Rage 10 + Stretch 5: Força 199%, Eficiência 45%, Alcance 145% (igual à calculadora antiga)');
  const r2 = abilityTotals([{ levelStats: [{ stats: ['+10% Health', '+5% Ability Duration'] }], rank: 0 }]);
  assert(r2.totals.duracao === 105 && r2.ignored.includes('+10% Health'), 'efeito que não é de habilidade fica fora e é listado');
  assert(abilityTotals([]).totals.forca === 100, 'sem mods, tudo em 100%');
  return { passed, failed };
}
