import { readGenerated } from './generated-reader';
import { isReviewedGlaive, type StanceMod } from './stance-capacity';
import type { LabWeapon } from './weapon-lab';
interface Row extends Pick<StanceMod, 'slug' | 'name' | 'imageName'> { stats: { compatName?: string; baseDrain?: number; fusionLimit?: number; polarity?: string } }
export function getReviewedStances(weapon: Pick<LabWeapon, 'category' | 'slug'>): StanceMod[] {
  if (!isReviewedGlaive(weapon)) return [];
  const items = readGenerated<Row>('mods').items;
  return ['astral_twilight', 'gleaming_talon'].map(slug => {
    const row = items.find(item => item.slug === slug && item.stats.compatName === 'Glaives');
    if (!row || !Number.isSafeInteger(row.stats.baseDrain) || row.stats.baseDrain! >= 0 || !Number.isInteger(row.stats.fusionLimit) || row.stats.fusionLimit! < 0 || !row.stats.polarity) throw new Error('Postura revisada sem dados completos.');
    return { slug: row.slug, name: row.name, imageName: row.imageName, compatName: 'Glaives', baseDrain: row.stats.baseDrain!, maxRank: row.stats.fusionLimit!, polarity: row.stats.polarity };
  });
}
