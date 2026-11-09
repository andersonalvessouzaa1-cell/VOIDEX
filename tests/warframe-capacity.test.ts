import assert from 'node:assert/strict';
import { readGenerated } from '../lib/data-engine/generated-reader';
import { summarizeNormalModCapacity } from '../lib/data-engine/normal-mod-capacity';
export function runWarframeCapacityTests() {
  let passed = 0;
  const eq = (a: unknown, b: unknown) => { assert.deepEqual(a, b); passed++; };
  const items = readGenerated<{ slug: string; stats: { baseDrain: number; fusionLimit: number; polarity: string } }>('mods').items;
  const picks = ['blind_rage', 'intensify'].map(slug => {
    const item = items.find(item => item.slug === slug)!;
    return { slug, baseDrain: item.stats.baseDrain, rank: item.stats.fusionLimit, polarity: item.stats.polarity };
  });
  eq(summarizeNormalModCapacity(picks, 30, {}).used, 27);
  eq(summarizeNormalModCapacity(picks, 30, {}).remaining, 3);
  eq(summarizeNormalModCapacity(picks, 60, {}).remaining, 33);
  eq(summarizeNormalModCapacity(picks, 30, { blind_rage: true, intensify: true }).used, 14);
  return { passed, failed: 0 };
}
