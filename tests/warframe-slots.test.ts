import assert from 'node:assert/strict';
import { validateWarframeSlots } from '../lib/data-engine/warframe-slots';
import { getExilusUniqueNames } from '../lib/data-engine/exilus-reader';
import { summarizeNormalModCapacity } from '../lib/data-engine/normal-mod-capacity';
export function runWarframeSlotsTests() {
  let passed = 0;
  const eq = (a: unknown, b: unknown) => { assert.deepEqual(a, b); passed++; };
  const common = Array.from({ length: 8 }, (_, i) => ({ slug: `common_${i}`, isExilus: false, slot: 'normal' as const }));
  const exilus = { slug: 'power_drift', isExilus: true, slot: 'exilus' as const };
  eq(validateWarframeSlots([...common, exilus], true).errors, []);
  eq(validateWarframeSlots([...common, exilus], true).normalUsed, 8);
  eq(validateWarframeSlots([...common, exilus], true).exilusUsed, 1);
  eq(validateWarframeSlots([...common, exilus], false).errors.length, 1);
  eq(validateWarframeSlots([...common, { ...exilus, slot: 'normal' }], true).errors.length, 1);
  eq(validateWarframeSlots([exilus, { ...exilus, slug: 'cunning_drift' }], true).errors.length, 1);
  eq(validateWarframeSlots([{ ...exilus, isExilus: false }], true).errors.length, 1);
  eq(validateWarframeSlots([common[0], common[0]], true).errors.length, 1);
  eq(validateWarframeSlots([{ ...exilus, slot: 'invalid' as never }], true).errors.length, 1);
  const known = getExilusUniqueNames();
  eq(known.has('/Lotus/Upgrades/Mods/OrokinChallenge/OrokinChallengeModPower'), true);
  eq(known.has('/Lotus/Upgrades/Mods/Warframe/DualStat/CorruptedPowerEfficiencyWarframe'), false);
  const mods = [{ slug: 'regular', baseDrain: 27, rank: 0 }, { slug: 'exilus', baseDrain: 4, rank: 5 }];
  // Wolfram: 30-(27+9)=-6; 60-(27+9)=24. O adaptador não soma capacidade.
  eq(summarizeNormalModCapacity(mods, 30, {}).remaining, -6);
  eq(summarizeNormalModCapacity(mods, 60, {}).remaining, 24);
  return { passed, failed: 0 };
}
