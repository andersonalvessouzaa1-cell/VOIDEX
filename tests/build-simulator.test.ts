import assert from 'node:assert/strict';
import { calculateBuild, DANTE_BASE } from '../lib/build-simulator';
export function runBuildSimulatorTests() {
  let passed = 0;
  assert.deepEqual(DANTE_BASE, { health: 390, shields: 240, armor: 145, energy: 270, strength: 100, duration: 100, efficiency: 100, range: 100 }); passed++;
  assert.deepEqual(calculateBuild([]).stats, DANTE_BASE); passed++;
  const selections = [{ id: 'blind-rage', rank: 10 }, { id: 'stretch', rank: 5 }];
  const result = calculateBuild(selections);
  assert.equal(result.stats.strength, 199); passed++;
  assert.equal(result.stats.efficiency, 45); passed++;
  assert.equal(result.stats.range, 145); passed++;
  assert.equal(calculateBuild([{ id: 'blind-rage', rank: 0 }]).stats.strength, 109); passed++;
  assert.equal(result.trace.length, 3); passed++;
  for (const input of [null, {}, [{ id: 'inexistente', rank: 1 }], [{ id: 'stretch', rank: -1 }], [{ id: 'stretch', rank: 6 }], [{ id: 'stretch', rank: 1.5 }], [{ id: 'stretch', rank: '5' }], [{ id: 'stretch', rank: 5 }, { id: 'stretch', rank: 5 }]]) { assert.throws(() => calculateBuild(input)); passed++; }
  result.selections[0].rank = 0;
  assert.equal(selections[0].rank, 10); passed++;
  assert.equal(DANTE_BASE.strength, 100); passed++;
  console.log(`build-simulator: ${passed} verificações passaram`);
  return { passed, failed: 0 };
}
