const fs = require('fs');

let wfContent = fs.readFileSync('lib/data-engine/dataset/warframes.ts', 'utf8');
let wfMatches = 0;
wfContent.replace(/effects: \[/g, () => { wfMatches++; return 'mechanics: ['; });
console.log('Warframes "effects" to "mechanics" matches: ' + wfMatches);

let wfSampleBefore = wfContent.match(/effects: \[\{ type: 'damage', damage_type: 'corrosive'.+?\}\]/)[0];
let wfSampleAfter = wfSampleBefore.replace(/effects: \[/, 'mechanics: [')
  .replace(/\{ type: '([^']+)'/, "{ mechanic_type: '$1'")
  .replace(/base_value: ([\d\.]+)/g, "base_value: { value: $1, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }")
  .replace(/damage_type: '([^']+)'/g, "damage_type: { value: '$1', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }")
  .replace(/range_meters: ([\d\.]+)/g, "range: { value: $1, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }")
  .replace(/radius_meters: ([\d\.]+)/g, "radius: { value: $1, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }")
  .replace(/duration_seconds: ([\d\.]+)/g, "duration: { value: $1, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }");

console.log('\n--- WARFRAME SAMPLE ---');
console.log('BEFORE:\n' + wfSampleBefore);
console.log('AFTER:\n' + wfSampleAfter);


let wpContent = fs.readFileSync('lib/data-engine/dataset/weapons.ts', 'utf8');

// Match from damage_profile up to either projectile_type or accuracy, whichever is last in the block
let wpMatch = wpContent.match(/damage_profile:\s*\{[\s\S]*?accuracy:\s*[\d\.]+,?\s*(?:projectile_type:\s*'[^']+',?)?/);

if (wpMatch) {
  let wpSampleBefore = wpMatch[0];
  console.log('\n--- WEAPON SAMPLE BEFORE ---');
  console.log(wpSampleBefore);

  const wpTransform = (text) => {
     let dpMatch = text.match(/damage_profile:\s*\{([^}]+)\}/);
     let newDp = dpMatch[1].replace(/([a-z_]+):\s*([\d\.]+)/g, "$1: { value: $2, status: 'VERIFIED', confidence: 1.0 }");
     
     let out = text.replace(/damage_profile:\s*\{([^}]+)\}/, `attacks: [{\n      attack_id: 'default',\n      name: 'Default Attack',\n      attack_type: 'PRIMARY',\n      damage_profile: {${newDp}\n      }`);
     
     const statsToConvert = ['fire_rate', 'critical_chance', 'critical_multiplier', 'status_chance', 'multishot', 'magazine_size', 'max_ammo', 'reload_time_seconds', 'punch_through_meters', 'falloff_start', 'falloff_end', 'accuracy', 'projectile_type'];
     
     statsToConvert.forEach(stat => {
        let regex = new RegExp(stat + `:\\s*([\\d\\.]+|'[^']+')`);
        if (regex.test(out)) {
           let newStat = stat;
           if (stat === 'max_ammo') newStat = 'ammo_max';
           if (stat === 'punch_through_meters') newStat = 'punch_through';
           
           if (stat === 'projectile_type' || stat === 'accuracy') {
               // these might not need to be EvidenceValue depending on the types.ts, wait!
               // weapon types: accuracy is not in WeaponAttackInstance.
               // projectile_type IS in WeaponAttackInstance. 
               // let's leave projectile_type as is, just move it inside.
           } else {
               out = out.replace(regex, newStat + `: { value: $1, status: 'VERIFIED', confidence: 1.0 }`);
           }
        }
     });
     
     out += `\n    }]`;
     return out;
  };
  
  console.log('\n--- WEAPON SAMPLE AFTER ---');
  console.log(wpTransform(wpSampleBefore));
} else {
  console.log('Weapon pattern not found!');
}

