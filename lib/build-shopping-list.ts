import type { ResolvedLoadout } from './data-engine/loadout-reader';
import type { TradeItem } from './public-market';
export interface ShoppingItem { id: string; itemKey: string; name: string; kind: 'mod' | 'arcane'; rank: number; quantity: 1; usedBy: string[]; marketUrl: string | null }
/** Checklist por item/nível: não calcula cópias simultâneas, fusão ou custo. */
export function buildShoppingList(preset: Pick<ResolvedLoadout, 'equipment'>, catalog: TradeItem[]): ShoppingItem[] {
 const tradable=new Map(catalog.map(item=>[item.key,item])); const rows=new Map<string,ShoppingItem>();
 for (const [slot,part] of Object.entries(preset.equipment)) {
  for (const kind of ['mod','arcane'] as const) for (const item of kind==='mod'?part.mods:part.arcanes) {
   const itemKey=`${kind}:${item.slug}`, id=`${itemKey}:${item.rank}`;
   const existing=rows.get(id); if(existing) { if(!existing.usedBy.includes(slot)) existing.usedBy.push(slot); continue; }
   const source=tradable.get(itemKey);
   rows.set(id,{id,itemKey,name:item.name,kind,rank:item.rank,quantity:1,usedBy:[slot],marketUrl:source && item.rank<=source.maxRank?`/mercado?${new URLSearchParams({item_key:itemKey,side:'sell'})}`:null});
  }
 }
 return Array.from(rows.values()).sort((a,b)=>a.name.localeCompare(b.name)||a.rank-b.rank);
}
export function readOwnedCounts(raw: string | null, items: ShoppingItem[]): Record<string,number> {
 try {
  const data:unknown=JSON.parse(raw??'{}'); if(!data || typeof data!=='object' || Array.isArray(data)) return {};
  const result:Record<string,number>={};
  for(const item of items) { const value=(data as Record<string,unknown>)[item.id]; if(typeof value==='number' && Number.isSafeInteger(value) && value>0) result[item.id]=Math.min(value,item.quantity); }
  return result;
 } catch { return {}; }
}
