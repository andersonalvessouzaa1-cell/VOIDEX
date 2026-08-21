import fs from 'fs';
import path from 'path';

function compareVersions(a: string, b: string): number {
  const parse = (v: string) => v.split('.').map(Number);
  const [aMajor = 0, aMinor = 0, aPatch = 0, aHotfix = 0] = parse(a);
  const [bMajor = 0, bMinor = 0, bPatch = 0, bHotfix = 0] = parse(b);

  if (aMajor !== bMajor) return aMajor - bMajor;
  if (aMinor !== bMinor) return aMinor - bMinor;
  if (aPatch !== bPatch) return aPatch - bPatch;
  return aHotfix - bHotfix;
}

const rawPath = path.join(__dirname, 'raw', 'wfcd', 'latest.json');
const data = JSON.parse(fs.readFileSync(rawPath, 'utf8'));

let maxPatch = '0.0.0';
let patchEvidence = '';
let entityEvidence = '';

for (const item of data) {
  if (item.patchlogs && Array.isArray(item.patchlogs)) {
    for (const log of item.patchlogs) {
      if (log.name && log.name.match(/Update (\d+(\.\d+)+)/)) {
        const match = log.name.match(/Update (\d+(\.\d+)+)/);
        if (match && match[1]) {
          const version = match[1];
          if (compareVersions(version, maxPatch) > 0) {
            maxPatch = version;
            patchEvidence = log.name;
            entityEvidence = item.uniqueName || item.name;
          }
        }
      }
    }
  }
}

console.log(JSON.stringify({
  game_patch_detected: maxPatch,
  game_patch_confidence: maxPatch !== '0.0.0' ? 'HIGH' : 'UNKNOWN',
  evidence_log: patchEvidence,
  evidence_entity: entityEvidence
}, null, 2));
