import assert from 'node:assert/strict';
import { TRANSLATIONS } from '../lib/translations';
export function runPublicCopyTests() {
 let passed=0;
 for (const lang of ['pt-BR','en']) {
  const copy=TRANSLATIONS[lang];
  assert.doesNotMatch([copy.badgeAntiBan,copy.s1Tag,copy.footerDeSafe].join(' '), /100%|Anti-Ban|Anti-Cheat Safe/i);passed++;
  assert.match(copy.heroSubtitle, /demonstra|demo|example|exemplo/i);passed++;
  assert.doesNotMatch(copy.cpCard3Desc, /garantindo|ensuring/i);passed++;
 }
 console.log(`public-copy: ${passed} verificações passaram`);return {passed,failed:0};
}
