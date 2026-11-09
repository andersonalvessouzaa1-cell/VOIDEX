import * as fs from 'fs';
import * as path from 'path';

export function runIngestion1_7() {
  const dataDir = path.join(process.cwd(), 'lib', 'data-engine', 'pipeline', 'raw', 'wfcd');
  const reports = { weapons: 0, mods: 0, arcanes: 0, incarnons: 0, verified: 0, partial: 0, unknown: 0 };

  const readJson = (file) => {
    try { return JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8')); }
    catch { return []; }
  };

  const primary = readJson('Primary.json');
  const secondary = readJson('Secondary.json');
  const melee = readJson('Melee.json');
  const mods = readJson('Mods.json');
  const arcanes = readJson('Arcanes.json');

  const weapons = [...primary, ...secondary, ...melee];

  // MAP WEAPONS
  for (const w of weapons) {
    reports.weapons++;
    const attacks = w.attacks || [{ name: 'Primary' }];
    // MAP ATTACKS -> damage profiles
    for (const attack of attacks) {
       reports.partial++;
    }
    // Incarnon Check
    if (w.name.includes('Incarnon') || (w.description && w.description.includes('Incarnon'))) {
      reports.incarnons++;
    }
  }

  // MAP MODS
  for (const m of mods) {
    reports.mods++;
    reports.unknown++; // All math ops are unknown from Tier 2 description text
  }

  // MAP ARCANES
  for (const a of arcanes) {
    reports.arcanes++;
    reports.unknown++;
  }

  console.log(JSON.stringify(reports));
  return reports;
}

runIngestion1_7();
