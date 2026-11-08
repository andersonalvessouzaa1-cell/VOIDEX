import assert from 'node:assert/strict';
import { isLocalListing, isLocalProfile } from '../lib/local-market-data';

export function runLocalMarketDataTests() {
  let passed = 0;
  const check = (actual: boolean, expected: boolean) => { assert.equal(actual, expected); passed++; };
  const profile = { nickname: 'Tenno', platform: 'pc', crossplay: true, reputation: 15, joinedAt: '2026-11-07T12:00:00.000Z' };
  const listing = { id: 'ord_1', itemId: 'gyre-prime-set', itemName: 'Gyre Prime', componentName: 'Conjunto Completo', orderType: 'wts', price: 50, quantity: 1, username: 'Tenno', platform: 'pc', crossplay: true, reputation: 15, status: 'active', statusType: 'In-Game', createdAt: profile.joinedAt };
  check(isLocalProfile(profile), true);
  check(isLocalListing(listing), true);
  for (const value of [null, [], {}, 'perfil']) { check(isLocalProfile(value), false); check(isLocalListing(value), false); }
  for (const key of Object.keys(profile)) { const copy: Record<string, unknown> = { ...profile }; delete copy[key]; check(isLocalProfile(copy), false); }
  for (const key of Object.keys(listing)) { const copy: Record<string, unknown> = { ...listing }; delete copy[key]; check(isLocalListing(copy), false); }
  for (const patch of [{ price: 0 }, { price: -1 }, { price: 1.5 }, { price: NaN }, { price: Infinity }, { price: '50' }, { quantity: 0 }, { quantity: 100 }, { quantity: 1.5 }, { platform: 'invalid' }, { username: '   ' }, { status: 'invalid' }, { statusType: 'invalid' }, { crossplay: 'true' }, { reputation: -1 }, { createdAt: 'invalid' }]) check(isLocalListing({ ...listing, ...patch }), false);
  check(isLocalListing({ ...listing, quantity: 99, status: 'paused', statusType: 'Online', orderType: 'wtb' }), true);
  for (const platform of ['pc', 'playstation', 'xbox', 'switch']) check(isLocalProfile({ ...profile, platform }), true);
  console.log(`local-market-data: ${passed} verificações passaram`);
  return { passed, failed: 0 };
}
