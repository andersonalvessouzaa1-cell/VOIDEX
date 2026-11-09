import assert from 'node:assert/strict';
import { validateLoadout, personalizeLoadout, type CompleteLoadout } from '../lib/data-engine/loadout';

export function runLoadoutTests() {
  const source = { name: 'Autor de teste (fixture)', url: 'https://example.com/build', retrievedAt: '2026-11-07' };
  const equipment = (category: string) => ({ slug: category, category, mods: [{ slug: 'fixture-mod', rank: 5, maxRank: 5, slot: 'normal-1' }], arcanes: [], source });
  // Dados sintéticos usados só para testar validação, nunca exibidos como build.
  const loadout = { id: 'fixture', name: 'Fixture', role: 'dano', status: 'FONTE_COMUNITARIA', source, equipment: { warframe: equipment('warframe'), primary: equipment('primary'), secondary: equipment('secondary'), melee: equipment('melee'), companion: equipment('companion') }, shards: [], helminth: { kind: 'original', note: 'Mantém habilidades originais' } } as CompleteLoadout;
  let passed = 0;
  const valid = (value: unknown, expected: boolean) => { assert.equal(validateLoadout(value).length === 0, expected); passed++; };
  valid(loadout, true);
  for (const value of [null, [], {}, 'build']) valid(value, false);
  valid({ ...loadout, status: 'TESTADO_NO_JOGO' }, false);
  valid({ ...loadout, status: 'TESTADO_NO_JOGO', test: { by: 'Autor', at: '2026-11-07', gameVersion: 'fixture', proof: 'https://example.com/proof' } }, true);
  valid({ ...loadout, source: { ...source, url: 'javascript:alert(1)' } }, false);
  valid({ ...loadout, source: { ...source, retrievedAt: 'amanhã' } }, false);
  for (const slot of ['warframe', 'primary', 'secondary', 'melee', 'companion']) { const copy = structuredClone(loadout); delete (copy.equipment as Record<string, unknown>)[slot]; valid(copy, false); }
  valid({ ...loadout, equipment: { ...loadout.equipment, primary: equipment('secondary') } }, false);
  for (const rank of [-1, 1.5, 6]) { const copy = structuredClone(loadout); copy.equipment.warframe.mods[0].rank = rank; valid(copy, false); }
  const duplicate = structuredClone(loadout); duplicate.equipment.warframe.mods.push({ ...duplicate.equipment.warframe.mods[0] }); valid(duplicate, false);
  valid({ ...loadout, shards: Array(6).fill({ color: 'carmesim', tauforged: true, effect: 'fixture', value: 15, unit: '%', source }) }, false);
  valid({ ...loadout, helminth: { kind: 'subsumed', ability: 'Roar' } }, false);
  const edited = personalizeLoadout({ ...loadout, status: 'TESTADO_NO_JOGO', test: { by: 'Autor', at: '2026-11-07', gameVersion: 'fixture', proof: 'https://example.com/proof' } });
  assert.equal(edited.status, 'NAO_TESTADO'); passed++;
  assert.equal(edited.test, undefined); passed++;
  assert.equal(loadout.status, 'FONTE_COMUNITARIA'); passed++;
  console.log(`loadout: ${passed} verificações passaram`);
  return { passed, failed: 0 };
}
