const fs = require('fs');

// 1. WARFRAMES
let wfContent = fs.readFileSync('lib/data-engine/dataset/warframes.ts', 'utf8');
wfContent = wfContent.replace(/effects: \[/g, 'mechanics: [');
wfContent = wfContent.replace(/\{ type: '([^']+)'/g, "{ mechanic_type: '$1'");
wfContent = wfContent.replace(/base_value: ([\d\.]+)/g, "base_value: { value: $1, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }");
wfContent = wfContent.replace(/damage_type: '([^']+)'/g, "damage_type: { value: '$1', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }");
wfContent = wfContent.replace(/range_meters: ([\d\.]+)/g, "range: { value: $1, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }");
wfContent = wfContent.replace(/radius_meters: ([\d\.]+)/g, "radius: { value: $1, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }");
wfContent = wfContent.replace(/duration_seconds: ([\d\.]+)/g, "duration: { value: $1, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }");

fs.writeFileSync('lib/data-engine/dataset/warframes.ts', wfContent);

// 2. WEAPONS
let wpContent = fs.readFileSync('lib/data-engine/dataset/weapons.ts', 'utf8');

const regex = /damage_profile:\s*\{[\s\S]*?accuracy:\s*[\d\.]+,?\s*(?:projectile_type:\s*'[^']+',?)?/g;

wpContent = wpContent.replace(regex, (match) => {
  let dpMatch = match.match(/damage_profile:\s*\{([^}]+)\}/);
  let newDp = dpMatch[1].replace(/([a-z_]+):\s*([\d\.]+)/g, "$1: { value: $2, status: 'VERIFIED', confidence: 1.0 }");
  
  let out = match.replace(/damage_profile:\s*\{([^}]+)\}/, `attacks: [{\n      attack_id: 'default',\n      name: 'Default Attack',\n      attack_type: 'PRIMARY',\n      damage_profile: {${newDp}\n      }`);
  
  const statsToConvert = ['fire_rate', 'critical_chance', 'critical_multiplier', 'status_chance', 'multishot', 'magazine_size', 'max_ammo', 'reload_time_seconds', 'punch_through_meters', 'falloff_start', 'falloff_end', 'accuracy', 'projectile_type'];
  
  statsToConvert.forEach(stat => {
    let statRegex = new RegExp(stat + `:\\s*([\\d\\.]+|'[^']+')`);
    if (statRegex.test(out)) {
       let newStat = stat;
       if (stat === 'max_ammo') newStat = 'ammo_max';
       if (stat === 'punch_through_meters') newStat = 'punch_through';
       
       if (stat === 'projectile_type' || stat === 'accuracy') {
           // leave as is, just format
       } else {
           out = out.replace(statRegex, newStat + `: { value: $1, status: 'VERIFIED', confidence: 1.0 }`);
       }
    }
  });
  
  out += `\n    }]`;
  // We need to move accuracy outside? No, accuracy was at the bottom of the block. If we just wrap the block in attacks: [], accuracy goes inside. We can leave it inside for now as WeaponAttackInstance might need it, or we can just let TS complain and fix it.
  return out;
});

fs.writeFileSync('lib/data-engine/dataset/weapons.ts', wpContent);
console.log('Datasets updated.');
