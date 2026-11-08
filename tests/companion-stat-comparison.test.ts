import assert from 'node:assert/strict';
import { compareCompanionStats } from '../lib/data-engine/companion-stat-comparison';
export function runCompanionStatComparisonTests() {
  let passed = 0;
  const eq = (a: unknown, b: unknown) => { assert.deepEqual(a, b); passed++; };
  const base = { health: 700, shield: 150, armor: 80 };
  const mod = (slug: string, line: string) => ({ slug, rank: 0, maxRank: 0, levelStats: [{ stats: [line] }] });
  eq(compareCompanionStats(base, [], 'sentinels').rows.health, { before: 700, after: 700 });
  const enhanced = compareCompanionStats(base, [mod('enhanced_vitality', '+250% Health'), mod('metal_fiber', '+250% Armor')], 'sentinels');
  eq(enhanced.rows.health.after, 2450); eq(enhanced.rows.armor.after, 280); eq(enhanced.rows.shields.after, 150);
  eq(compareCompanionStats(base, [mod('link_vitality', "Increase Health by +125% of Warframe's Max Health")], 'sentinels').rows.health.after, null);
  eq(compareCompanionStats(base, [mod('unknown', '+999% Health')], 'sentinels').rows.health.after, null);
  eq(compareCompanionStats(base, [mod('enhanced_vitality', 'On Kill: +250% Health')], 'sentinels').rows.health.after, null);
  eq(compareCompanionStats(base, [{ ...mod('enhanced_vitality', '+250% Health'), rank: 9 }], 'sentinels').rows.health.after, null);
  eq(compareCompanionStats({ health: NaN, shield: 0, armor: -1 }, [], 'sentinels').rows.health.after, null);
  eq(compareCompanionStats(base, [], 'pets').rows.health.after, null);
  eq(compareCompanionStats(base, [mod('synth_fiber', 'Health Orbs increase Armor for Companions by 100% for 12s.')], 'sentinels').rows.armor.after, 80);
  return { passed, failed: 0 };
}
