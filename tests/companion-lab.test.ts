import assert from 'node:assert/strict';
import { getCompanionLab } from '../lib/data-engine/companion-lab-reader';
import { resolveCompanionDraft } from '../lib/data-engine/companion-lab';
export function runCompanionLabTests() {
  let passed = 0;
  const eq = (a: unknown, b: unknown) => { assert.deepEqual(a, b); passed++; };
  const bad = (fn: () => unknown) => { assert.throws(fn); passed++; };
  const data = getCompanionLab();
  eq(data.items.some(item => item.slug === 'adra_mutagen'), false);
  const cat = data.items.find(item => item.slug === 'adarza_kavat')!;
  const mod = data.mods.find(item => item.slug === 'enhanced_vitality')!;
  eq(cat.category, 'beasts');
  eq(resolveCompanionDraft(cat, data.mods, [{ slug: mod.slug, rank: mod.maxRank }]).rows.health.after, 1085);
  eq(resolveCompanionDraft(cat, data.mods, []).rows.health.after, 310);
  const moa = data.items.find(item => item.slug === 'lambeo_moa')!;
  eq(moa.category, 'unsupported');
  eq(resolveCompanionDraft(moa, data.mods, []).rows.health.after, null);
  bad(() => resolveCompanionDraft(cat, data.mods, [{ slug: mod.slug, rank: -1 }]));
  bad(() => resolveCompanionDraft(cat, data.mods, [{ slug: mod.slug, rank: mod.maxRank + 1 }]));
  bad(() => resolveCompanionDraft(cat, data.mods, [{ slug: mod.slug, rank: 0.5 }]));
  bad(() => resolveCompanionDraft(cat, data.mods, [{ slug: 'unknown', rank: 0 }]));
  bad(() => resolveCompanionDraft(cat, data.mods, [{ slug: mod.slug, rank: 0 }, { slug: mod.slug, rank: 0 }]));
  bad(() => resolveCompanionDraft(cat, data.mods, null));
  return { passed, failed: 0 };
}
