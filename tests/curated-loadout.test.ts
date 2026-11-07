import assert from 'node:assert/strict';
import { CURATED_LOADOUTS, loadoutsForWarframe } from '../lib/data-engine/curated-loadouts';
import { resolveLoadout, compareCuratedWarframe } from '../lib/data-engine/loadout-reader';
import { validateLoadout } from '../lib/data-engine/loadout';
export function runCuratedLoadoutTests() {
  let passed = 0;
  const check = (actual: unknown, expected: unknown) => { assert.deepEqual(actual, expected); passed++; };
  const preset = CURATED_LOADOUTS[0];
  check(validateLoadout(preset), []);
  check(loadoutsForWarframe('dante').length, 1);
  check(loadoutsForWarframe('nova').length, 0);
  check(loadoutsForWarframe('../dante').length, 0);
  check(preset.status, 'NAO_TESTADO');
  const resolved = resolveLoadout(preset);
  check(Object.keys(resolved.equipment).length, 6);
  for (const slot of ['primary', 'secondary', 'melee', 'companion_weapon']) check((resolved.equipment[slot].weaponComparison?.attacks.length ?? 0) > 0, true);
  check(resolved.equipment.warframe.weaponComparison, undefined);
  check(resolved.equipment.companion.weaponComparison, undefined);
  for (const part of Object.values(resolved.equipment)) {
    check(part.mods.every(mod => mod.rank === mod.maxRank && mod.name.length > 0), true);
    check(part.source.url.startsWith('https://overframe.gg/build/'), true);
  }
  const result = compareCuratedWarframe(resolved);
  check(result?.stats.strength, 313);
  check(result?.stats.duration, 181.5);
  check(result?.stats.efficiency, 45);
  check(result?.stats.range, 145);
  check(result?.castingSpeedBonus, 112.5);
  check(result?.roarDamageBonus, 93.9);
  check(result?.rawEnergy, 769.5);
  check(result?.withoutShards.duration, 151.5);
  check(resolved.equipment.secondary.mods.filter(mod => mod.publishedRank === 0).length, 2);
  check(resolved.equipment.companion.arcanes.length, 0);
  const bad = structuredClone(preset); bad.equipment.primary.mods[0].slug = 'mod_inexistente';
  assert.throws(() => resolveLoadout(bad), /Mod/); passed++;
  const badRank = structuredClone(preset); badRank.equipment.primary.mods[0].rank = 999;
  assert.throws(() => resolveLoadout(badRank), /nível|Mod/); passed++;
  const badShard = structuredClone(resolved); badShard.shards[0].value = 999;
  assert.throws(() => compareCuratedWarframe(badShard), /Fragmento/); passed++;
  console.log(`curated-loadout: ${passed} verificações passaram`);
  return { passed, failed: 0 };
}
