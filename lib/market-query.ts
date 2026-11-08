import { isPlatform, type Platform } from './local-market-data';

interface SearchableItem {
  name: string;
  subName: string;
  aliases: string[];
  category: string;
  categoryGroup: string;
  components: { name: string }[];
}
const normalize = (value: string): string => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export function searchMarketItems<T extends SearchableItem>(items: readonly T[], query: string, category: string): T[] {
  const term = normalize(query);
  return items.filter(item => (category === 'all' || item.categoryGroup === category)
    && (!term || normalize([item.name, item.subName, item.category, ...item.aliases, ...item.components.map(component => component.name)].join(' ')).includes(term)));
}
/** Venda: menor preço primeiro. Compra: maior preço primeiro. Preserva a entrada. */
export function sortMarketOffers<T extends { price: number }>(offers: readonly T[], mode: 'wts' | 'wtb'): T[] {
  return [...offers].sort((a, b) => mode === 'wts' ? a.price - b.price : b.price - a.price);
}
export function matchesPlatform(offer: { platform?: unknown; crossplay?: unknown }, platform: Platform, includeCrossplay: boolean): boolean {
  return isPlatform(offer.platform) && (offer.platform === platform || (includeCrossplay && offer.crossplay === true));
}
