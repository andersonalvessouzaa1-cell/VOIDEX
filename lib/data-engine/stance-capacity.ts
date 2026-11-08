import { slotCapacityBonus, type AuraMod, type AuraSlot } from './aura-capacity';
import { summarizeNormalModCapacity } from './normal-mod-capacity';
import type { LabWeapon } from './weapon-lab';
export interface StanceMod extends Omit<AuraMod, 'levelStats'> { compatName: 'Glaives' }
export const isReviewedGlaive = (weapon: Pick<LabWeapon, 'category' | 'slug'>) => weapon.category === 'melee' && ['glaive', 'glaive_prime'].includes(weapon.slug);
export function summarizeWeaponStanceCapacity(weapon: Pick<LabWeapon, 'category' | 'slug'>, mods: Parameters<typeof summarizeNormalModCapacity>[0], baseCapacity: number, matchingSlots: Record<string, boolean>, stance: { mod: StanceMod; rank: number; slot: AuraSlot } | null) {
  const normal = summarizeNormalModCapacity(mods, baseCapacity, matchingSlots);
  if (stance && (!isReviewedGlaive(weapon) || stance.mod.compatName !== 'Glaives')) throw new Error('Postura sem compatibilidade revisada para esta arma.');
  const stanceBonus = stance ? slotCapacityBonus(stance.mod, stance.rank, stance.slot) : 0;
  const capacity = baseCapacity + stanceBonus;
  if (!Number.isSafeInteger(capacity)) throw new Error('Capacidade inválida.');
  return { ...normal, baseCapacity, stanceBonus, capacity, remaining: capacity - normal.used };
}
