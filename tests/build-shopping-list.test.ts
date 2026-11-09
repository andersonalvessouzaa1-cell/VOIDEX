import assert from 'node:assert/strict';
import { buildShoppingList, readOwnedCounts } from '../lib/build-shopping-list';
import { CURATED_LOADOUTS } from '../lib/data-engine/curated-loadouts';
import { resolveLoadout } from '../lib/data-engine/loadout-reader';
import { getTradeCatalog } from '../lib/trade-catalog';
export function runBuildShoppingListTests() {
 let passed=0; const eq=(a:unknown,b:unknown)=>{assert.deepEqual(a,b);passed++;};
 const preset=resolveLoadout(CURATED_LOADOUTS[0]); const catalog=getTradeCatalog();
 const list=buildShoppingList(preset,catalog);
 eq(list.length>20,true);
 eq(list.every(row=>row.quantity>0 && row.rank>=0),true);
 eq(list.some(row=>row.itemKey==='mod:blind_rage' && row.rank===10),true);
 eq(list.some(row=>row.itemKey.includes('shard')),false);
 eq(buildShoppingList(preset,[]).every(row=>row.marketUrl===null),true);
 const copy=structuredClone(preset); const mod=copy.equipment.warframe.mods[0];
 copy.equipment.primary.mods.push({...mod});
 const both=buildShoppingList(copy,catalog).find(row=>row.id===`mod:${mod.slug}:${mod.rank}`)!;
 eq(both.quantity,1); eq(both.usedBy.length,2);
 copy.equipment.primary.mods.push({...mod,rank:0});
 eq(buildShoppingList(copy,catalog).filter(row=>row.itemKey===`mod:${mod.slug}`).length,2);
 const owned=readOwnedCounts(JSON.stringify({[list[0].id]:999,unknown:7,[list[1].id]:-1}),list);
 eq(owned[list[0].id],list[0].quantity); eq(owned.unknown,undefined); eq(owned[list[1].id],undefined);
 eq(readOwnedCounts('invalid',list),{}); eq(readOwnedCounts('null',list),{});
 eq(readOwnedCounts('{"__proto__":5}',list),{});
 eq(list.filter(row=>row.marketUrl).every(row=>row.marketUrl!.startsWith('/mercado?item_key=')),true);
 return {passed,failed:0};
}
