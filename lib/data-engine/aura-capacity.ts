import type { LevelStat } from './mod-effects';
import { summarizeNormalModCapacity } from './normal-mod-capacity';
export interface AuraMod { slug: string; name: string; imageName: string | null; baseDrain: number; maxRank: number; polarity: string; levelStats: LevelStat[] }
export type AuraSlot = 'neutral' | 'matching' | 'different';
export function slotCapacityBonus(mod: Pick<AuraMod, 'baseDrain' | 'maxRank'>, rank: number, slot: AuraSlot) {
  if (!Number.isSafeInteger(mod.baseDrain) || mod.baseDrain >= 0 || !Number.isInteger(mod.maxRank) || mod.maxRank < 0 || !Number.isInteger(rank) || rank < 0 || rank > mod.maxRank || !['neutral', 'matching', 'different'].includes(slot)) throw new Error('Mod especial, nível ou vaga sem regra confirmada.');
  const raw = -mod.baseDrain + rank;
  const bonus = slot === 'matching' ? raw * 2 : slot === 'different' ? Math.floor(raw * 0.8) : raw;
  if (!Number.isSafeInteger(bonus)) throw new Error('Bônus de capacidade inválido.');
  return bonus;
}
export function auraCapacityBonus(mod: AuraMod, rank: number, slot: AuraSlot) {
  if (!mod.levelStats[rank]) throw new Error('Aura sem dados para este nível.');
  return slotCapacityBonus(mod, rank, slot);
}

export function summarizeWarframeCapacity(mods: Parameters<typeof summarizeNormalModCapacity>[0], baseCapacity: number, matchingSlots: Record<string, boolean>, aura: { mod: AuraMod; rank: number; slot: AuraSlot } | null) {
  const normal = summarizeNormalModCapacity(mods, baseCapacity, matchingSlots);
  const auraBonus = aura ? auraCapacityBonus(aura.mod, aura.rank, aura.slot) : 0;
  const capacity = baseCapacity + auraBonus;
  if (!Number.isSafeInteger(capacity)) throw new Error('Capacidade fora do limite numérico.');
  return { ...normal, baseCapacity, auraBonus, capacity, remaining: capacity - normal.used };
}
