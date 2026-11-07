import assert from 'node:assert/strict';
import { CalculationEngine } from '../lib/data-engine/calculation-engine';
import { WARFRAMES_DATASET } from '../lib/data-engine/dataset/warframes';
import type { ModEffect, WeaponAttackInstance } from '../lib/data-engine/types';
export function runCalculationEvidenceTests() {
  const base = WARFRAMES_DATASET[0].base_stats;
  assert.equal(CalculationEngine.calculateWarframeStats(base, [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 25, condition: 'condicao_desconhecida' }]).powerStrengthPercent, base.power_strength);
  const attack = { damage_profile: { slash: { value: 100, status: 'VERIFIED', confidence: 1 } } } as WeaponAttackInstance;
  const engine = new CalculationEngine();
  const effect: ModEffect = { stat: 'damage_raw', operator: 'ADD_PERCENT', value: { value: 50, status: 'VERIFIED', confidence: 1 }, condition: 'on kill' };
  const conditional = engine.calculateWeaponDamage('fixture', attack, [effect]);
  assert.equal(conditional.value, 100);
  assert.equal(conditional.status, 'PARTIALLY_CALCULATED');
  const unsupported = engine.calculateWeaponDamage('fixture', attack, [{ ...effect, condition: undefined, stat: 'critical_chance' }]);
  assert.equal(unsupported.value, 100);
  assert.equal(unsupported.status, 'PARTIALLY_CALCULATED');
  const known = engine.calculateWeaponDamage('fixture', attack, [{ ...effect, condition: undefined }]);
  assert.equal(known.value, 150);
  const lowEvidence = engine.calculateWeaponDamage('fixture', { ...attack, damage_profile: { slash: { value: 100, status: 'PARTIALLY_VERIFIED', confidence: 0.5 } } }, []);
  assert.equal(lowEvidence.status, 'PARTIALLY_CALCULATED');
  console.log('calculation-evidence: 7 verificações passaram');
  return { passed: 7, failed: 0 };
}
