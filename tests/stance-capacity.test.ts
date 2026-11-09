import assert from 'node:assert/strict';
import { getWeaponDetails } from '../lib/data-engine/weapon-lab-reader';
import { getReviewedStances } from '../lib/data-engine/stance-reader';
import { summarizeWeaponStanceCapacity } from '../lib/data-engine/stance-capacity';
export function runStanceCapacityTests() {
  let passed = 0;
  const eq = (a: unknown, b: unknown) => { assert.deepEqual(a, b); passed++; };
  const bad = (fn: () => unknown) => { assert.throws(fn); passed++; };
  const glaive = getWeaponDetails('melee', 'glaive_prime').weapon;
  const rifle = getWeaponDetails('primary', 'braton_prime').weapon;
  const stances = getReviewedStances(glaive);
  eq(stances.length, 2); eq(getReviewedStances(rifle), []);
  const pick = { mod: stances[0], rank: 3, slot: 'neutral' as const };
  eq(summarizeWeaponStanceCapacity(glaive, [], 30, {}, pick).capacity, 35);
  eq(summarizeWeaponStanceCapacity(glaive, [], 60, {}, pick).capacity, 65);
  eq(summarizeWeaponStanceCapacity(glaive, [], 60, {}, { ...pick, slot: 'matching' }).capacity, 70);
  eq(summarizeWeaponStanceCapacity(glaive, [], 60, {}, { ...pick, slot: 'different' }).capacity, 64);
  eq(summarizeWeaponStanceCapacity(glaive, [], 60, {}, { ...pick, rank: 0, slot: 'matching' }).capacity, 64);
  eq(summarizeWeaponStanceCapacity(glaive, [], 60, {}, null).capacity, 60);
  bad(() => summarizeWeaponStanceCapacity(rifle, [], 60, {}, pick));
  bad(() => summarizeWeaponStanceCapacity(glaive, [], 60, {}, { ...pick, rank: 4 }));
  for (const slug of ['cerata', 'coda_pathocyst', 'falcor', 'glaive', 'glaive_prime', 'halikar', 'halikar_wraith', 'kestrel', 'kestrel_prime', 'orvius', 'pathocyst', 'xoris']) {
    const weapon = getWeaponDetails('melee', slug).weapon;
    eq(getReviewedStances(weapon).length, 2);
  }
  eq(getReviewedStances(getWeaponDetails('melee', 'wolf_sledge').weapon), []);
  eq(getReviewedStances(getWeaponDetails('melee', 'skana').weapon), []);
  eq(summarizeWeaponStanceCapacity(glaive, [], 60, {}, { ...pick, slot: 'universal' }).capacity, 70);
  return { passed, failed: 0 };
}
