import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import https from 'https';

const oldPath = path.join(__dirname, 'raw', 'wfcd', 'snapshot_1.6.1.json');
const newPath = path.join(__dirname, 'raw', 'wfcd', 'latest.json');

function hashFile(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

async function fetchGithubMeta() {
  return new Promise<any>((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: '/repos/WFCD/warframe-items/commits/master',
      headers: { 'User-Agent': 'VOIDEX-Data-Engine' }
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function runAudit() {
  const oldHash = hashFile(oldPath);
  const newHash = hashFile(newPath);

  console.log(`[AUDIT] Old SHA-256: ${oldHash}`);
  console.log(`[AUDIT] New SHA-256: ${newHash}`);

  const oldData = JSON.parse(fs.readFileSync(oldPath, 'utf8'));
  const newData = JSON.parse(fs.readFileSync(newPath, 'utf8'));

  // Diff
  let added = 0, removed = 0, modified = 0, unchanged = 0;
  const oldMap = new Map(oldData.map((e: any) => [e.uniqueName, e]));
  for (const n of newData) {
    const o = oldMap.get(n.uniqueName);
    if (!o) added++;
    else {
      if (JSON.stringify(o) === JSON.stringify(n)) unchanged++;
      else modified++;
      oldMap.delete(n.uniqueName);
    }
  }
  removed = oldMap.size;

  // Determine game patch from patchlogs
  let latestPatch = 'UNKNOWN';
  for (const item of newData) {
    if (item.patchlogs && item.patchlogs.length > 0) {
      for (const log of item.patchlogs) {
        if (log.name && log.name.includes('Update')) {
          const match = log.name.match(/Update (\d+\.\d+(\.\d+)?)/);
          if (match && match[1]) {
            if (latestPatch === 'UNKNOWN' || match[1] > latestPatch) {
              latestPatch = match[1];
            }
          }
        }
      }
    }
  }

  // Sample items
  const samples = {
    Warframes: [] as any[],
    Weapons: [] as any[],
    Mods: [] as any[],
    Arcanes: [] as any[],
    Companions: [] as any[],
    Tradable: [] as any[]
  };

  for (const item of newData) {
    if (samples.Warframes.length < 10 && item.category === 'Warframes' && item.productCategory === 'Suits') samples.Warframes.push(item);
    else if (samples.Weapons.length < 10 && (item.category === 'Primary' || item.category === 'Secondary' || item.category === 'Melee')) samples.Weapons.push(item);
    else if (samples.Mods.length < 10 && item.category === 'Mods') samples.Mods.push(item);
    else if (samples.Arcanes.length < 5 && item.category === 'Arcanes') samples.Arcanes.push(item);
    else if (samples.Companions.length < 5 && item.category === 'Pets') samples.Companions.push(item);
    else if (samples.Tradable.length < 5 && item.tradable) samples.Tradable.push(item);
  }

  let commitData;
  try {
     commitData = await fetchGithubMeta();
  } catch (e) {
     commitData = { sha: 'UNKNOWN', commit: { author: { date: 'UNKNOWN' } } };
  }

  const report = {
    old_sha: oldHash,
    new_sha: newHash,
    commit_sha: commitData.sha,
    commit_date: commitData.commit?.author?.date,
    game_patch_detected: latestPatch,
    old_total: oldData.length,
    new_total: newData.length,
    added, removed, modified, unchanged,
    samples: [
      ...samples.Warframes, ...samples.Weapons, ...samples.Mods, 
      ...samples.Arcanes, ...samples.Companions, ...samples.Tradable
    ].map(s => ({
      uniqueName: s.uniqueName,
      name: s.name,
      category: s.category,
      tradable: s.tradable || false
    }))
  };

  fs.writeFileSync(path.join(__dirname, 'audit_report_1.6.3.json'), JSON.stringify(report, null, 2));
  console.log('[AUDIT] Complete. Written to audit_report_1.6.3.json');
}

runAudit().catch(console.error);
