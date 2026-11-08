import { readGenerated } from './generated-reader';
import { getCompanionCategory, type CompanionStatSource } from './companion-stat-comparison';
import type { CompanionLabData, CompanionLabMod } from './companion-lab';
import type { LevelStat } from './mod-effects';
interface Row { slug: string; name: string; imageName: string | null; stats: CompanionStatSource & { productCategory?: string } }
interface ModRow extends Omit<CompanionLabMod, 'maxRank' | 'levelStats'> { stats: { compatName?: string; fusionLimit?: number; levelStats?: LevelStat[] } }
export function getCompanionLab(): CompanionLabData {
  const items = ['sentinels', 'pets'].flatMap(category => readGenerated<Row>(category).items)
    .filter(item => ['Sentinels', 'KubrowPets', 'SpecialItems'].includes(item.stats.productCategory ?? '') || /_(hound|moa)$/.test(item.slug))
    .map(item => ({ slug: item.slug, name: item.name, imageName: item.imageName, category: getCompanionCategory(item.slug, item.stats.productCategory), stats: { health: item.stats.health, shield: item.stats.shield, armor: item.stats.armor } }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const allowed = new Set(['enhanced_vitality', 'calculated_redirection', 'metal_fiber']);
  const mods = readGenerated<ModRow>('mods').items.filter(mod => allowed.has(mod.slug) && mod.stats.compatName === 'COMPANION').map(mod => {
    const maxRank = mod.stats.fusionLimit;
    const levelStats = mod.stats.levelStats;
    if (!Number.isInteger(maxRank) || !levelStats || !levelStats[maxRank!]) throw new Error('Mod de companheiro sem níveis completos.');
    return { slug: mod.slug, name: mod.name, imageName: mod.imageName, maxRank: maxRank!, levelStats };
  });
  if (mods.length !== 3) throw new Error('Catálogo de mods revisados incompleto.');
  return { items, mods };
}
