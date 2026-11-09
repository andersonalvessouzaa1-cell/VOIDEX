import { unstable_cache } from 'next/cache';
import { createPublicMarketClient } from './supabase/public';
import { PUBLIC_LISTING_FIELDS, type PublicListing } from './public-market';
export const getPublicListings = unstable_cache(async (item: string, platform: string, side: string, page: number) => {
  const db = createPublicMarketClient();
  if (!db) return { rows: [] as PublicListing[], hasMore: false, unavailable: true };
  let query = db.from('market_listings').select(PUBLIC_LISTING_FIELDS).order('created_at', { ascending: false }).order('id').range((page - 1) * 50, page * 50);
  if (item) query = query.eq('item_key', item);
  if (platform) query = query.eq('platform', platform);
  if (side) query = query.eq('side', side);
  const { data, error } = await query;
  return { rows: error ? [] : (data?.slice(0, 50) ?? []) as PublicListing[], hasMore: !error && (data?.length ?? 0) > 50, unavailable: Boolean(error) };
}, ['public-market-v1'], { revalidate: 30, tags: ['public-market'] });
