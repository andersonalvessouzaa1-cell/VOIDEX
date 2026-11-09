import assert from 'node:assert/strict';
import { findWarframeModConflicts, WARFRAME_CONFLICT_FAMILIES } from '../lib/data-engine/warframe-mod-conflicts';
import { resolveLoadout } from '../lib/data-engine/loadout-reader';
import { CURATED_LOADOUTS } from '../lib/data-engine/curated-loadouts';
export function runWarframeModConflictTests() {
  let passed = 0;
  const eq = (a: unknown, b: unknown) => { assert.deepEqual(a, b); passed++; };
  for (const family of WARFRAME_CONFLICT_FAMILIES) {
    for (let a = 0; a < family.members.length; a++) for (let b = a + 1; b < family.members.length; b++) {
      eq(findWarframeModConflicts([family.members[a], family.members[b]]).length, 1);
    }
  }
  eq(findWarframeModConflicts(['umbral_intensify', 'blind_rage', 'transient_fortitude']), []);
  eq(findWarframeModConflicts(['stretch', 'cunning_drift', 'overextended']), []);
  eq(findWarframeModConflicts(['archon_intensify', 'archon_continuity', 'archon_stretch']), []);
  eq(findWarframeModConflicts(['unknown', 'intensify']), []);
  const picks = ['precision_intensify', 'archon_intensify'];
  const before = [...picks]; findWarframeModConflicts(picks); eq(picks, before);
  const invalid = structuredClone(CURATED_LOADOUTS[0]);
  invalid.equipment.warframe.mods = [
    { slug: 'intensify', rank: 5, maxRank: 5, slot: 'normal-1' },
    { slug: 'umbral_intensify', rank: 10, maxRank: 10, slot: 'normal-2' },
  ];
  assert.throws(() => resolveLoadout(invalid), /incompatíveis/); passed++;
  return { passed, failed: 0 };
}
