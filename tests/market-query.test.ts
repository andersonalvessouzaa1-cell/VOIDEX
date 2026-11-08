import assert from 'node:assert/strict';
import { searchMarketItems, sortMarketOffers, matchesPlatform } from '../lib/market-query';

export function runMarketQueryTests() {
  const items = [
    { id: 'a', name: 'Árvore Prime', subName: 'Suporte', aliases: ['conjunto raro'], category: 'Warframe', categoryGroup: 'warframe', components: [{ name: 'Neurovisores' }] },
    { id: 'b', name: 'Arma Prime', subName: '', aliases: [], category: 'Primária', categoryGroup: 'primary', components: [] },
  ];
  assert.deepEqual(searchMarketItems(items, ' ARVORE ', 'all').map(i => i.id), ['a']);
  assert.deepEqual(searchMarketItems(items, 'conjunto raro', 'warframe').map(i => i.id), ['a']);
  assert.deepEqual(searchMarketItems(items, 'neurovisores', 'all').map(i => i.id), ['a']);
  assert.deepEqual(searchMarketItems(items, '', 'primary').map(i => i.id), ['b']);
  assert.equal(searchMarketItems(items, 'arvore', 'primary').length, 0);
  assert.equal(searchMarketItems(items, 'inexistente', 'all').length, 0);
  assert.equal(searchMarketItems(items, '', 'all').length, 2);
  const offers = [{ price: 100, username: 'A' }, { price: 50, username: 'B' }];
  assert.deepEqual(sortMarketOffers(offers, 'wts').map(o => o.price), [50, 100]);
  assert.deepEqual(sortMarketOffers(offers, 'wtb').map(o => o.price), [100, 50]);
  assert.equal(offers[0].price, 100);
  assert.equal(matchesPlatform({ platform: 'pc', crossplay: false }, 'pc', false), true);
  assert.equal(matchesPlatform({ platform: 'xbox', crossplay: true }, 'pc', false), false);
  assert.equal(matchesPlatform({ platform: 'xbox', crossplay: false }, 'pc', true), false);
  assert.equal(matchesPlatform({ platform: 'xbox', crossplay: true }, 'pc', true), true);
  assert.equal(matchesPlatform({ platform: undefined, crossplay: true }, 'pc', true), false);
  console.log('market-query: 15 verificações passaram');
  return { passed: 15, failed: 0 };
}
