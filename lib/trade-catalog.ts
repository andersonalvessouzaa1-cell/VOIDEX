import { readGenerated } from './data-engine/generated-reader';
import type { TradeItem } from './public-market';
interface Row { slug: string; name: string; imageName: string | null; tradable?: boolean; stats: { fusionLimit?: number; levelStats?: unknown[] } }
let cached: TradeItem[] | undefined;
export function getTradeCatalog(): TradeItem[] {
  if (cached) return cached;
  cached = ['mods', 'arcanes'].flatMap(category => readGenerated<Row>(category).items.flatMap(item => {
    const maxRank = category === 'mods' ? item.stats.fusionLimit : (item.stats.levelStats?.length ?? 0) - 1;
    if (item.tradable !== true || !/^[a-z0-9_]{1,120}$/.test(item.slug) || !Number.isInteger(maxRank) || maxRank! < 0 || maxRank! > 40 || !item.name.trim() || item.name.length > 160) return [];
    return [{ key: `${category === 'mods' ? 'mod' : 'arcane'}:${item.slug}`, name: item.name.replace(/\s+/g, ' ').trim(), imageName: item.imageName, maxRank: maxRank!, kind: category === 'mods' ? 'mod' as const : 'arcane' as const }];
  })).sort((a, b) => a.name.localeCompare(b.name));
  return cached;
}
