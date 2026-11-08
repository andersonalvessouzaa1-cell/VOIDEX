import { readGenerated } from './generated-reader';
import { reviewedWeaponModSlugs, type WeaponStatSource } from './weapon-stat-comparison';
import { isModCompatible, isWeaponCategory, weaponModGroup, type LabMod, type LabWeapon, type WeaponCategory, type WeaponIndexItem } from './weapon-lab';
import type { LevelStat } from './mod-effects';

interface WeaponRow { slug: string; name: string; imageName: string | null; type: string | null; stats: WeaponStatSource }
interface ModRow { slug: string; name: string; imageName: string | null; uniqueName: string | null; stats: { compatName?: string; baseDrain?: number; fusionLimit?: number; levelStats?: LevelStat[] } }
// Identidades completas dos novos mods normais: não confundir com entradas Beginner/Expert de mesmo nome.
const NORMAL_PATHS: Record<string, string> = {
  power_throw_weaponglaivepowerthrowmod: 'Melee/WeaponGlaivePowerthrowMod',
  point_strike_weaponcritchancemod: 'Rifle/WeaponCritChanceMod', vital_sense_weaponcritdamagemod: 'Rifle/WeaponCritDamageMod',
  speed_trigger_weaponfireratemod: 'Rifle/WeaponFireRateMod', rifle_aptitude_weaponstunchancemod: 'Rifle/WeaponStunChanceMod',
  pistol_gambit_weaponcritchancemod: 'Pistol/WeaponCritChanceMod', target_cracker_weaponcritdamagemod: 'Pistol/WeaponCritDamageMod',
  gunslinger_weaponfireratemod: 'Pistol/WeaponFireRateMod', sure_shot_weaponstunchancemod: 'Pistol/WeaponStunChanceMod',
  true_steel_weaponcritchancemod: 'Melee/WeaponCritChanceMod', organ_shatter_weaponcritdamagemod: 'Melee/WeaponCritDamageMod',
  melee_prowess_weaponstunchancemod: 'Melee/WeaponStunChanceMod', fury_weaponfireratemod: 'Melee/WeaponFireRateMod',
  blunderbuss_weaponcritchancemod: 'Shotgun/WeaponCritChanceMod', ravage_weaponcritdamagemod: 'Shotgun/WeaponCritDamageMod',
  shotgun_barrage_weaponfireratemod: 'Shotgun/WeaponFireRateMod', serration_weapondamageamountmod: 'Rifle/WeaponDamageAmountMod',
  split_chamber_weaponfireiterationsmod: 'Rifle/WeaponFireIterationsMod',
};
function weapons(category: WeaponCategory) {
  if (!isWeaponCategory(category)) throw new Error('Categoria de arma inválida.');
  return readGenerated<WeaponRow>(category);
}
export function getWeaponIndex(category: WeaponCategory) {
  const file = weapons(category);
  const items: WeaponIndexItem[] = file.items.filter(item => item.type !== 'Zaw Component').map(item => ({ slug: item.slug, name: item.name, imageName: item.imageName, type: item.type, category })).sort((a, b) => a.name.localeCompare(b.name));
  return { items, fetchedAt: file.meta.fetchedAt };
}
export function getWeaponDetails(category: WeaponCategory, slug: string) {
  const row = weapons(category).items.find(item => item.slug === slug && item.type !== 'Zaw Component');
  if (!row) throw new Error('Arma não encontrada nesta categoria.');
  const indexItem = { slug: row.slug, name: row.name, imageName: row.imageName, type: row.type, category };
  const weapon: LabWeapon = { ...indexItem, stats: row.stats, modGroup: weaponModGroup(indexItem) };
  const reviewed = new Set(reviewedWeaponModSlugs());
  const mods: LabMod[] = readGenerated<ModRow>('mods').items.filter(mod => {
    const identity = NORMAL_PATHS[mod.slug];
    return !mod.uniqueName?.includes('/Beginner/') && reviewed.has(mod.slug) && (!identity || mod.uniqueName === `/Lotus/Upgrades/Mods/${identity}`)
      && typeof mod.stats.fusionLimit === 'number' && Number.isInteger(mod.stats.fusionLimit) && mod.stats.fusionLimit >= 0
      && !!mod.stats.levelStats?.[mod.stats.fusionLimit] && typeof mod.stats.compatName === 'string'
      && isModCompatible(weapon, { compatName: mod.stats.compatName, baseDrain: mod.stats.baseDrain ?? NaN });
  }).map(mod => ({ slug: mod.slug, name: mod.name, imageName: mod.imageName, uniqueName: mod.uniqueName, compatName: mod.stats.compatName!, baseDrain: mod.stats.baseDrain!, rank: mod.stats.fusionLimit!, maxRank: mod.stats.fusionLimit!, levelStats: mod.stats.levelStats! })).sort((a, b) => a.name.localeCompare(b.name));
  return { weapon, mods, fetchedAt: weapons(category).meta.fetchedAt };
}
