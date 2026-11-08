import { compareWeaponStats, type WeaponStatSource, type WeaponStatMod } from './weapon-stat-comparison';

export const WEAPON_CATEGORIES = ['primary', 'secondary', 'melee', 'sentinel_weapons'] as const;
export type WeaponCategory = typeof WEAPON_CATEGORIES[number];
export type WeaponModGroup = 'Rifle' | 'Shotgun' | 'Pistol' | 'Melee';
export interface WeaponIndexItem { slug: string; name: string; imageName: string | null; type: string | null; category: WeaponCategory }
export interface LabWeapon extends WeaponIndexItem { stats: WeaponStatSource; modGroup: WeaponModGroup | null }
export interface LabMod extends WeaponStatMod { name: string; imageName: string | null; uniqueName: string | null; compatName: string; baseDrain: number; polarity?: string }
export interface WeaponModPick { slug: string; rank: number }
export const isWeaponCategory = (value: unknown): value is WeaponCategory => typeof value === 'string' && (WEAPON_CATEGORIES as readonly string[]).includes(value);

const ROBOT_GROUPS: Record<string, WeaponModGroup> = { burst_laser: 'Pistol', burst_laser_prime: 'Pistol', prisma_burst_laser: 'Pistol', artax: 'Rifle', vulklok: 'Rifle', vulcax: 'Rifle', laser_rifle: 'Rifle', prime_laser_rifle: 'Rifle' };
export function weaponModGroup(item: WeaponIndexItem): WeaponModGroup | null {
  if (item.category === 'primary') return item.type === 'Shotgun' ? 'Shotgun' : ['Rifle', 'Sniper', 'Launcher', 'Bow'].includes(item.type ?? '') ? 'Rifle' : null;
  if (item.category === 'secondary') return ['Pistol', 'Dual Pistols', 'Throwing'].includes(item.type ?? '') ? 'Pistol' : null;
  if (item.category === 'melee') return item.type === 'Zaw Component' ? null : 'Melee';
  return Object.prototype.hasOwnProperty.call(ROBOT_GROUPS, item.slug) ? ROBOT_GROUPS[item.slug] : null;
}
export function isModCompatible(weapon: LabWeapon, mod: Pick<LabMod, 'compatName' | 'baseDrain'>): boolean {
  if (!weapon.modGroup || !Number.isFinite(mod.baseDrain) || mod.baseDrain < 0) return false;
  const group = mod.compatName.trim().toLowerCase();
  if (group === weapon.modGroup.toLowerCase()) return true;
  return weapon.category === 'melee' && group === 'thrown melee' && !!weapon.stats.attacks?.some(attack => attack.shot_type === 'Thrown');
}
// Famílias conferidas. Não substitui as demais regras específicas de encaixe do jogo.
const FAMILIES = [
  ['Point Strike', 'Critical Delay'], ['Pistol Gambit', 'Primed Pistol Gambit', 'Creeping Bullseye'],
  ['Blunderbuss', 'Primed Blunderbuss', 'Critical Deceleration'], ['True Steel', 'Sacrificial Steel'],
  ['Target Cracker', 'Primed Target Cracker'], ['Ravage', 'Primed Ravage'],
  ['Organ Shatter', 'Amalgam Organ Shatter'], ['Fury', 'Primed Fury'],
  ['Serration', 'Amalgam Serration'], ["Hell's Chamber", 'Galvanized Hell'],
  ['Split Chamber', 'Galvanized Chamber'], ['Barrel Diffusion', 'Amalgam Barrel Diffusion', 'Galvanized Diffusion'],
];
export function resolveWeaponDraft(weapon: LabWeapon, options: LabMod[], input: unknown) {
  if (!Array.isArray(input)) throw new Error('Seleção de mods inválida.');
  if (input.length > 8) throw new Error('Esta versão permite até oito mods comuns.');
  const seen = new Set<string>();
  const families = new Map<number, string>();
  const mods = input.map(value => {
    if (!value || typeof value !== 'object' || typeof value.slug !== 'string') throw new Error('Seleção de mod inválida.');
    const mod = options.find(option => option.slug === value.slug);
    if (!mod || !isModCompatible(weapon, mod)) throw new Error('O mod não está disponível como compatível para esta arma nesta versão.');
    if (seen.has(mod.slug)) throw new Error('Mod repetido: escolha apenas uma cópia.');
    seen.add(mod.slug);
    if (typeof value.rank !== 'number' || !Number.isInteger(value.rank) || value.rank < 0 || value.rank > mod.maxRank || !mod.levelStats[value.rank]) throw new Error(`Confira o nível de ${mod.name}.`);
    const family = FAMILIES.findIndex(names => names.includes(mod.name));
    if (family >= 0) {
      const previous = families.get(family);
      if (previous) throw new Error(`Mods incompatíveis entre si: ${previous} e ${mod.name}.`);
      families.set(family, mod.name);
    }
    return { ...structuredClone(mod), rank: value.rank };
  });
  return { status: 'NAO_TESTADO' as const, mods, comparison: compareWeaponStats(weapon.stats, mods, { melee: weapon.category === 'melee', bow: weapon.type === 'Bow' }) };
}
