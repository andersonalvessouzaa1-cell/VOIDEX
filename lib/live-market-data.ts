export interface MarketCatalogItem { id: string; slug: string; name: string; englishName: string; ducats: number | null; thumb: string | null }
export interface MarketSummary { variant: string; lowestSell: number | null; highestBuy: number | null; sellCount: number; buyCount: number }
const record = (v: unknown): v is Record<string, any> => !!v && typeof v === 'object' && !Array.isArray(v);
const integer = (v: unknown): v is number => typeof v === 'number' && Number.isSafeInteger(v) && v >= 0;
export const validMarketSlug = (v: unknown): v is string => typeof v === 'string' && /^[a-z0-9_]{1,120}$/.test(v);
export function parseMarketCatalog(input: unknown): MarketCatalogItem[] {
  if (!Array.isArray(input)) throw new Error('Catálogo externo inválido.');
  return input.flatMap(item => {
    if (!record(item) || typeof item.id !== 'string' || !validMarketSlug(item.slug) || item.tradable === false) return [];
    const name = item.i18n?.pt?.name ?? item.i18n?.en?.name;
    if (typeof name !== 'string' || !name.trim()) return [];
    return [{ id: item.id, slug: item.slug, name, englishName: typeof item.i18n?.en?.name === 'string' ? item.i18n.en.name : name,
      ducats: integer(item.ducats) ? item.ducats : null,
      thumb: [item.i18n?.en?.thumb, item.i18n?.pt?.thumb, item.i18n?.en?.icon].find((v): v is string => typeof v === 'string' && v.length > 0) ?? null }];
  });
}
export function summarizeOrders(input: unknown): MarketSummary[] {
  if (!Array.isArray(input)) throw new Error('Ofertas externas inválidas.');
  const groups = new Map<string, MarketSummary>();
  for (const order of input) {
    if (!record(order) || order.visible !== true || !['sell', 'buy'].includes(order.type)
      || !integer(order.platinum) || order.platinum < 1 || !integer(order.quantity) || order.quantity < 1
      || !['online', 'ingame'].includes(order.user?.status)) continue;
    const perTrade = order.perTrade ?? 1;
    if (!integer(perTrade) || perTrade < 1 || perTrade > 6 || order.quantity < perTrade || order.quantity % perTrade !== 0) continue;
    const attrs = ['rank', 'charges', 'amberStars', 'cyanStars'] as const;
    if (attrs.some(key => order[key] !== undefined && !integer(order[key]))) continue;
    if (order.subtype !== undefined && (typeof order.subtype !== 'string' || order.subtype.length > 100)) continue;
    const variant = [...attrs.filter(key => order[key] !== undefined).map(key => `${key}=${order[key]}`), ...(order.subtype ? [`subtype=${order.subtype}`] : [])].join(' · ') || 'Padrão';
    const group = groups.get(variant) ?? { variant, lowestSell: null, highestBuy: null, sellCount: 0, buyCount: 0 };
    const unitPrice = order.platinum / perTrade;
    if (order.type === 'sell') { group.sellCount++; group.lowestSell = Math.min(group.lowestSell ?? Infinity, unitPrice); }
    else { group.buyCount++; group.highestBuy = Math.max(group.highestBuy ?? -Infinity, unitPrice); }
    groups.set(variant, group);
  }
  return Array.from(groups.values()).sort((a, b) => a.variant.localeCompare(b.variant));
}

const MARKET_ASSETS = 'https://warframe.market/static/assets/';
export function marketImageUrl(path: unknown): string | null {
  return typeof path === 'string' && /^[\w\-./]+\.(png|webp|jpe?g)$/i.test(path) && !path.includes('..') && !path.startsWith('/') ? MARKET_ASSETS + path : null;
}

export function marketImageProxyUrl(path: unknown): string | null {
  return marketImageUrl(path) ? `/api/market-image?path=${encodeURIComponent(path as string)}` : null;
}
export const validWarframeName = (v: unknown): v is string => typeof v === 'string' && /^[A-Za-z][A-Za-z0-9 '\-.]{0,39}$/.test(v);
export const validCdnImageName = (v: unknown): v is string => typeof v === 'string' && /^[\w\-.]{1,120}\.(png|webp|jpe?g)$/i.test(v) && !v.includes('..');

// Imagens de arte por nome em inglês (base warframestat.us): conjuntos e peças usam a imagem do item principal.
export const validArtName = (v: unknown): v is string => typeof v === 'string' && /^[A-Za-z0-9][A-Za-z0-9 '\-.:&()]{0,79}$/.test(v);
export function artQueryCandidates(name: string): string[] {
  const base = name.match(/^(.+?) Set$/)?.[1] ?? name.match(/^(.+? Prime)\s+\S.*$/)?.[1];
  return base && base !== name ? [name, base] : [name];
}
