/** Calculadora legada restrita a quatro mods; não certifica capacidade ou combate. */
export type AbilityStat = 'strength' | 'duration' | 'efficiency' | 'range';
export interface ModSelection { id: string; rank: number }
export const DANTE_SOURCE = 'https://www.warframe.com/en/game/warframes/dante';
export const SOURCE_REVIEW_DATE = '07/11/2026';
// A página oficial distingue nível 0 e 30. Estes são os valores do nível 30.
export const DANTE_BASE = Object.freeze<{ health: number; shields: number; armor: number; energy: number } & Record<AbilityStat, number>>({ health: 390, shields: 240, armor: 145, energy: 270, strength: 100, duration: 100, efficiency: 100, range: 100 });
interface SimulatorMod { id: string; name: string; maxRank: number; perRank: Partial<Record<AbilityStat, number>>; source: string }
// Efeitos conferidos nos levelStats de WFCD/warframe-items sincronizados em 07/11/2026.
export const SIMULATOR_MODS: readonly SimulatorMod[] = [
  { id: 'intensify', name: 'Intensify', maxRank: 5, perRank: { strength: 5 }, source: 'https://github.com/WFCD/warframe-items/blob/master/data/json/Mods.json' },
  { id: 'continuity', name: 'Continuity', maxRank: 5, perRank: { duration: 5 }, source: 'https://github.com/WFCD/warframe-items/blob/master/data/json/Mods.json' },
  { id: 'stretch', name: 'Stretch', maxRank: 5, perRank: { range: 7.5 }, source: 'https://github.com/WFCD/warframe-items/blob/master/data/json/Mods.json' },
  { id: 'blind-rage', name: 'Blind Rage', maxRank: 10, perRank: { strength: 9, efficiency: -5 }, source: 'https://github.com/WFCD/warframe-items/blob/master/data/json/Mods.json' },
];
export function calculateBuild(input: unknown): { stats: typeof DANTE_BASE; selections: ModSelection[]; trace: { mod: string; stat: AbilityStat; delta: number }[] } {
  if (!Array.isArray(input) || input.length > 8) throw new Error('Seleção de mods inválida.');
  const stats = { ...DANTE_BASE };
  const selections: ModSelection[] = [];
  const trace: { mod: string; stat: AbilityStat; delta: number }[] = [];
  const seen = new Set<string>();
  for (const entry of input) {
    if (!entry || typeof entry !== 'object') throw new Error('Mod inválido.');
    const mod = SIMULATOR_MODS.find(m => m.id === entry.id);
    if (!mod || seen.has(entry.id) || typeof entry.rank !== 'number' || !Number.isInteger(entry.rank) || entry.rank < 0 || entry.rank > mod.maxRank) throw new Error('Mod, nível ou repetição inválida.');
    seen.add(entry.id);
    selections.push({ id: entry.id, rank: entry.rank });
    for (const stat of Object.keys(mod.perRank) as AbilityStat[]) {
      const delta = mod.perRank[stat]! * (entry.rank + 1);
      stats[stat] += delta;
      trace.push({ mod: mod.name, stat, delta });
    }
  }
  return { stats, selections, trace };
}
