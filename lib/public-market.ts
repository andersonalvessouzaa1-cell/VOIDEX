export const TRADE_PLATFORMS = { pc: 'PC', ps4: 'PlayStation', xbox: 'Xbox', switch: 'Switch', mobile: 'Mobile' };
export type TradePlatform = keyof typeof TRADE_PLATFORMS;
export interface TradeItem { key: string; name: string; imageName: string | null; maxRank: number; kind: 'mod' | 'arcane' }
export interface PublicListing { id: string; item_key: string; side: 'buy' | 'sell'; item_rank: number; platinum: number; quantity: number; public_nickname: string; platform: TradePlatform; created_at: string }
export const PUBLIC_LISTING_FIELDS = 'id,item_key,side,item_rank,platinum,quantity,public_nickname,platform,created_at';
const integer = (value: unknown, min: number, max: number) => {
  if (typeof value !== 'string' || !/^(0|[1-9]\d*)$/.test(value)) return null;
  const n = Number(value); return Number.isSafeInteger(n) && n >= min && n <= max ? n : null;
};
export function parseListingInput(input: unknown) {
  if (!input || typeof input !== 'object') return null;
  const row = input as Record<string, unknown>;
  if (row.consent !== true || typeof row.item_key !== 'string' || !/^(mod|arcane):[a-z0-9_]{1,120}$/.test(row.item_key) || (typeof row.side !== 'string' || !['buy', 'sell'].includes(row.side))) return null;
  const item_rank = integer(row.item_rank, 0, 40), platinum = integer(row.platinum, 1, 1000000), quantity = integer(row.quantity, 1, 999);
  if (item_rank === null || platinum === null || quantity === null) return null;
  return { item_key: row.item_key, side: row.side as 'buy' | 'sell', item_rank, platinum, quantity };
}
export function parseListingEdit(input: unknown) {
  if (!input || typeof input !== 'object') return null;
  const row = input as Record<string, unknown>;
  if (typeof row.id !== 'string' || !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(row.id)) return null;
  const platinum = integer(row.platinum, 1, 1000000), quantity = integer(row.quantity, 1, 999);
  return platinum === null || quantity === null ? null : { id: row.id, platinum, quantity };
}
export function buildTradeWhisper(input: { nickname: string; side: 'buy' | 'sell'; name: string; rank: number; platinum: number; quantity: number }) {
  if (!/^[A-Za-z0-9_.-]{3,32}$/.test(input.nickname) || !['buy', 'sell'].includes(input.side) || !input.name.trim() || input.name.length > 160 || !Number.isInteger(input.rank) || input.rank < 0 || !Number.isInteger(input.platinum) || input.platinum < 1 || !Number.isInteger(input.quantity) || input.quantity < 1) return null;
  const name = input.name.replace(/\s+/g, ' ').trim();
  return `/w ${input.nickname} Hi! I want to ${input.side === 'sell' ? 'buy your' : 'sell you'} ${input.quantity}x ${name} (rank ${input.rank}) for ${input.platinum} platinum each. (Acervo Void)`;
}
