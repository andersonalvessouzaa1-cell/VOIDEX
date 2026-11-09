import assert from 'node:assert/strict';
import { summarizeNormalModCapacity } from '../lib/data-engine/normal-mod-capacity';
export function runNormalModCapacityTests() {
  let passed = 0;
  const eq = (a: unknown, b: unknown) => { assert.deepEqual(a, b); passed++; };
  const bad = (fn: () => unknown) => { assert.throws(fn); passed++; };
  const mod = { slug: 'fixture', baseDrain: 4, rank: 9, polarity: 'madurai' };
  eq(summarizeNormalModCapacity([mod], 30, {}).used, 13);
  eq(summarizeNormalModCapacity([mod], 30, { fixture: true }).used, 7);
  eq(summarizeNormalModCapacity([mod], 60, {}).remaining, 47);
  eq(summarizeNormalModCapacity([{ ...mod, baseDrain: 30 }], 30, {}).remaining, -9);
  bad(() => summarizeNormalModCapacity([{ ...mod, rank: -1 }], 30, {}));
  bad(() => summarizeNormalModCapacity([{ ...mod, baseDrain: -1 }], 30, {}));
  bad(() => summarizeNormalModCapacity([{ ...mod, rank: 1.5 }], 30, {}));
  bad(() => summarizeNormalModCapacity([mod, mod], 30, {}));
  bad(() => summarizeNormalModCapacity([{ ...mod, polarity: undefined }], 30, { fixture: true }));
  bad(() => summarizeNormalModCapacity([mod], 45, {}));
  return { passed, failed: 0 };
}
