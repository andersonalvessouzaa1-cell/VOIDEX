import { compareCompanionStats, type CompanionStatSource, type getCompanionCategory } from './companion-stat-comparison';
import type { LevelStat } from './mod-effects';
export interface CompanionLabItem { slug: string; name: string; imageName: string | null; category: ReturnType<typeof getCompanionCategory>; stats: CompanionStatSource }
export interface CompanionLabMod { slug: string; name: string; imageName: string | null; maxRank: number; levelStats: LevelStat[]; baseDrain: number; polarity: string }
export interface CompanionLabData { items: CompanionLabItem[]; mods: CompanionLabMod[] }
export interface CompanionModPick { slug: string; rank: number }
export function resolveCompanionDraft(item: CompanionLabItem, options: CompanionLabMod[], input: unknown) {
  if (!Array.isArray(input) || input.length > 3) throw new Error('Selecione até três mods revisados.');
  const seen = new Set<string>();
  const mods = input.map(pick => {
    if (!pick || typeof pick !== 'object' || typeof pick.slug !== 'string' || !Number.isInteger(pick.rank)) throw new Error('Seleção inválida.');
    const mod = options.find(option => option.slug === pick.slug);
    if (!mod || seen.has(mod.slug) || pick.rank < 0 || pick.rank > mod.maxRank || !mod.levelStats[pick.rank]) throw new Error('Mod ou nível inválido.');
    seen.add(mod.slug);
    return { ...mod, rank: pick.rank };
  });
  return compareCompanionStats(item.stats, mods, item.category);
}

export function summarizeCompanionCapacity(item: CompanionLabItem, options: CompanionLabMod[], picks: CompanionModPick[], capacity: number, matchingSlots: Record<string, boolean>) {
  if (capacity !== 30 && capacity !== 60) throw new Error('Capacidade inválida para esta simulação de nível 30.');
  resolveCompanionDraft(item, options, picks);
  if (item.category === 'unsupported') return null;
  const rows = picks.map(pick => {
    const mod = options.find(option => option.slug === pick.slug)!;
    const raw = mod.baseDrain + pick.rank;
    if (!Number.isSafeInteger(mod.baseDrain) || mod.baseDrain < 0 || !Number.isSafeInteger(raw) || !mod.polarity) throw new Error('Custo ou polaridade sem dado confirmado.');
    return { slug: mod.slug, cost: matchingSlots[mod.slug] === true ? Math.ceil(raw / 2) : raw };
  });
  const used = rows.reduce((total, row) => total + row.cost, 0);
  return { rows, used, capacity, remaining: capacity - used };
}
