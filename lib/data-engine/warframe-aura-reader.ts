import { readGenerated } from './generated-reader';
import type { AuraMod } from './aura-capacity';
interface Row extends Pick<AuraMod, 'slug' | 'name' | 'imageName'> { stats: { compatName?: string; baseDrain?: number; fusionLimit?: number; polarity?: string; levelStats?: AuraMod['levelStats'] } }
const REVIEWED = ['corrosive_projection', 'energy_siphon', 'steel_charge', 'growing_power'];
export function getReviewedAuras(): AuraMod[] {
  const rows = readGenerated<Row>('mods').items;
  return REVIEWED.map(slug => {
    const row = rows.find(item => item.slug === slug && item.stats.compatName === 'AURA');
    if (!row || !Number.isSafeInteger(row.stats.baseDrain) || row.stats.baseDrain! >= 0 || !Number.isInteger(row.stats.fusionLimit) || row.stats.fusionLimit! < 0 || !row.stats.polarity || !row.stats.levelStats?.[row.stats.fusionLimit!]) throw new Error('Aura revisada sem dados completos.');
    return { slug: row.slug, name: row.name, imageName: row.imageName, baseDrain: row.stats.baseDrain!, maxRank: row.stats.fusionLimit!, polarity: row.stats.polarity, levelStats: row.stats.levelStats! };
  });
}
