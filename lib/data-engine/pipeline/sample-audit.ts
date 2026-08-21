import fs from 'fs';
import path from 'path';

const newPath = path.join(__dirname, 'raw', 'wfcd', 'latest.json');
const data = JSON.parse(fs.readFileSync(newPath, 'utf8'));

// Determine Game Patch
let maxPatch = '0.0.0';
let patchSource = 'UNKNOWN';
for (const item of data) {
  if (item.patchlogs && Array.isArray(item.patchlogs)) {
    for (const log of item.patchlogs) {
      if (log.name && log.name.includes('Update')) {
        const match = log.name.match(/Update (\d+\.\d+(\.\d+)?)/);
        if (match && match[1]) {
          // simple string compare works fine for 37.0.0 > 36.9.0
          if (parseFloat(match[1]) > parseFloat(maxPatch)) {
            maxPatch = match[1];
            patchSource = log.name;
          }
        }
      }
    }
  }
}

console.log(`Detected Game Patch: Update ${maxPatch} (Source: ${patchSource})`);

const sample = [];
let frames = 0, weapons = 0, mods = 0, arcanes = 0, companions = 0, tradable = 0;

for (const item of data) {
  if (frames < 10 && item.category === 'Warframes' && item.productCategory === 'Suits') {
    sample.push({ uniqueName: item.uniqueName, name: item.name, category: item.category, tradable: item.tradable });
    frames++;
  } else if (weapons < 10 && ['Primary', 'Secondary', 'Melee'].includes(item.category)) {
    sample.push({ uniqueName: item.uniqueName, name: item.name, category: item.category, tradable: item.tradable });
    weapons++;
  } else if (mods < 10 && item.category === 'Mods') {
    sample.push({ uniqueName: item.uniqueName, name: item.name, category: item.category, tradable: item.tradable });
    mods++;
  } else if (arcanes < 5 && item.category === 'Arcanes') {
    sample.push({ uniqueName: item.uniqueName, name: item.name, category: item.category, tradable: item.tradable });
    arcanes++;
  } else if (companions < 5 && item.category === 'Pets') {
    sample.push({ uniqueName: item.uniqueName, name: item.name, category: item.category, tradable: item.tradable });
    companions++;
  } else if (tradable < 5 && item.tradable && !['Warframes', 'Primary', 'Mods', 'Arcanes', 'Pets'].includes(item.category)) {
    sample.push({ uniqueName: item.uniqueName, name: item.name, category: item.category, tradable: item.tradable });
    tradable++;
  }
}

fs.writeFileSync(path.join(__dirname, 'sample_output.json'), JSON.stringify({ gamePatch: maxPatch, patchSource, sample }, null, 2));
