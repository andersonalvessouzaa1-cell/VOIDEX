import assert from 'node:assert/strict';
import { getReviewedAuras } from '../lib/data-engine/warframe-aura-reader';
import { auraCapacityBonus, summarizeWarframeCapacity } from '../lib/data-engine/aura-capacity';
export function runAuraCapacityTests() {
  let passed = 0;
  const eq = (a: unknown, b: unknown) => { assert.deepEqual(a, b); passed++; };
  const bad = (fn: () => unknown) => { assert.throws(fn); passed++; };
  const auras = getReviewedAuras();
  eq(auras.length, 4);
  const growing = auras.find(a => a.slug === 'growing_power')!;
  const steel = auras.find(a => a.slug === 'steel_charge')!;
  eq(auraCapacityBonus(growing, 5, 'neutral'), 7);
  eq(auraCapacityBonus(growing, 5, 'matching'), 14);
  eq(auraCapacityBonus(growing, 5, 'different'), 5);
  eq(auraCapacityBonus(steel, 5, 'matching'), 18);
  eq(auraCapacityBonus(steel, 5, 'different'), 7);
  eq(auraCapacityBonus(growing, 0, 'neutral'), 2);
  eq(summarizeWarframeCapacity([], 60, {}, { mod: growing, rank: 5, slot: 'matching' }).capacity, 74);
  eq(summarizeWarframeCapacity([], 30, {}, { mod: growing, rank: 5, slot: 'matching' }).capacity, 44);
  eq(summarizeWarframeCapacity([], 60, {}, null).capacity, 60);
  bad(() => auraCapacityBonus(growing, 6, 'neutral'));
  bad(() => auraCapacityBonus(growing, -1, 'neutral'));
  bad(() => auraCapacityBonus(growing, 1.5, 'neutral'));
  bad(() => auraCapacityBonus({ ...growing, baseDrain: 2 }, 0, 'neutral'));
  bad(() => auraCapacityBonus(growing, 5, 'unknown' as never));
  return { passed, failed: 0 };
}
