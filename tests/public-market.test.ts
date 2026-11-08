import assert from 'node:assert/strict';
import { parseListingInput, parseListingEdit, buildTradeWhisper } from '../lib/public-market';
import { getTradeCatalog } from '../lib/trade-catalog';
export function runPublicMarketTests() {
  let passed = 0;
  const eq = (a: unknown, b: unknown) => { assert.deepEqual(a, b); passed++; };
  const input = { item_key: 'mod:blind_rage', side: 'sell', item_rank: '10', platinum: '25', quantity: '2', consent: true, owner_id: 'forged' };
  eq(parseListingInput(input), { item_key: 'mod:blind_rage', side: 'sell', item_rank: 10, platinum: 25, quantity: 2 });
  for (const patch of [{ side: { toString: () => 'sell' } }, { consent: false }, { platinum: '0' }, { platinum: '1.5' }, { platinum: '1000001' }, { quantity: '1000' }, { side: 'trade' }, { item_rank: '-1' }, { item_key: '../profiles' }]) eq(parseListingInput({ ...input, ...patch }), null);
  eq(parseListingEdit({ id: 'bad', platinum: '10', quantity: '1' }), null);
  const catalog = getTradeCatalog();
  eq(catalog.length > 1000, true);
  eq(catalog.some(item => item.key === 'mod:blind_rage' && item.maxRank === 10), true);
  eq(catalog.some(item => item.key.includes('archon_shard')), false);
  const text = buildTradeWhisper({ nickname: 'Player_1', side: 'sell', name: 'Blind Rage', rank: 10, platinum: 25, quantity: 2 });
  eq(text!.includes('/w Player_1 '), true); eq(text!.includes('buy'), true); eq(text!.includes('25 platinum each'), true);
  eq(buildTradeWhisper({ nickname: 'Bad\n/w other', side: 'sell', name: 'X', rank: 0, platinum: 1, quantity: 1 }), null);
  return { passed, failed: 0 };
}
