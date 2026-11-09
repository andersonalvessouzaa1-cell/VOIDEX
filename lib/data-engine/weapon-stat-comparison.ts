import type { LevelStat } from './mod-effects';

export type WeaponMetric = 'criticalChance' | 'criticalMultiplier' | 'statusChance' | 'attackRate';
export interface SourceAttack { name?: string; crit_chance?: number; crit_mult?: number; status_chance?: number; speed?: number; charge_time?: number; shot_type?: string }
export interface WeaponStatSource { attacks?: SourceAttack[]; criticalChance?: number; criticalMultiplier?: number; procChance?: number; fireRate?: number; trigger?: string }
export interface WeaponStatMod { slug: string; name?: string; rank: number; maxRank: number; levelStats: LevelStat[] }
export interface WeaponStatRow { before: number | null; after: number | null; reason?: string }
export interface WeaponAttackComparison { name: string; rows: Record<WeaponMetric, WeaponStatRow> }
export interface WeaponComparison { coverage: 'PARCIAL'; attacks: WeaponAttackComparison[]; excludedMods: string[]; limitations: string[]; sources: { name: string; url: string }[] }

const LABELS: Record<WeaponMetric, string> = { criticalChance: 'Critical Chance', criticalMultiplier: 'Critical Damage', statusChance: 'Status Chance', attackRate: 'Fire Rate' };
// Operador relativo conferido para estes mods; os números vêm do rank da fonte.
// Uma frase percentual em um mod não listado NÃO autoriza inferir esse operador.
const RULES: Record<string, WeaponMetric[]> = {
  point_strike_weaponcritchancemod: ['criticalChance'], vital_sense_weaponcritdamagemod: ['criticalMultiplier'],
  speed_trigger_weaponfireratemod: ['attackRate'], rifle_aptitude_weaponstunchancemod: ['statusChance'],
  hammer_shot: ['criticalMultiplier', 'statusChance'], pistol_gambit_weaponcritchancemod: ['criticalChance'],
  target_cracker_weaponcritdamagemod: ['criticalMultiplier'], gunslinger_weaponfireratemod: ['attackRate'],
  sure_shot_weaponstunchancemod: ['statusChance'], true_steel_weaponcritchancemod: ['criticalChance'],
  organ_shatter_weaponcritdamagemod: ['criticalMultiplier'], melee_prowess_weaponstunchancemod: ['statusChance'],
  fury_weaponfireratemod: ['attackRate'], primed_fury: ['attackRate'],
  blunderbuss_weaponcritchancemod: ['criticalChance'], ravage_weaponcritdamagemod: ['criticalMultiplier'],
  shotgun_barrage_weaponfireratemod: ['attackRate'], primed_ravage: ['criticalMultiplier'],
  critical_deceleration: ['criticalChance', 'attackRate'], critical_delay: ['criticalChance', 'attackRate'],

  primed_target_cracker: ['criticalMultiplier'], primed_pistol_gambit: ['criticalChance'],
  lethal_torrent: ['attackRate'], pistol_pestilence: ['statusChance'], frostbite: ['statusChance'],
  galvanized_shot: ['statusChance'], galvanized_savvy: ['statusChance'],
  magnetic_strafe: ['attackRate'], magnetic_might: ['criticalMultiplier'],
  accelerated_isotope: ['attackRate'], scorch: ['statusChance'],
  creeping_bullseye: ['criticalChance', 'attackRate'],
  amalgam_organ_shatter: ['criticalMultiplier'], sacrificial_steel: ['criticalChance'],
  frigid_blast: ['statusChance'], toxic_barrage: ['statusChance'],
};
// Efeitos revisados, porém fora destes quatro atributos. Isso não significa ausência de efeito em combate.
const OUTSIDE_SCOPE = new Set([
  'shotgun_elementalist', 'primed_charged_shell', 'primed_cleanse_orokin', 'galvanized_hell',
  'galvanized_acceleration', 'primed_expel_orokin', 'galvanized_diffusion', 'primed_pistol_ammo_mutation',
  'melee_elementalist', 'primed_smite_grineer', 'volatile_quick_return', 'power_throw_weaponglaivepowerthrowmod',
  'galvanized_reflex', 'primed_pressure_point', 'astral_twilight', 'dispatch_overdrive',
  'augur_pact', 'augur_seeker', 'serration_weapondamageamountmod', 'split_chamber_weaponfireiterationsmod',
]);
const KEYS: WeaponMetric[] = ['criticalChance', 'criticalMultiplier', 'statusChance', 'attackRate'];
const number = (value: unknown): number | null => typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null;
const percent = (value: unknown): number | null => { const n = number(value); return n === null ? null : n * 100; };
const tidy = (value: number) => Math.round(value * 1e8) / 1e8;

export function compareWeaponStats(source: WeaponStatSource, mods: WeaponStatMod[], context: { melee?: boolean; bow?: boolean } = {}): WeaponComparison {
  const bonuses: Record<WeaponMetric, number> = { criticalChance: 0, criticalMultiplier: 0, statusChance: 0, attackRate: 0 };
  const blocked = new Map<WeaponMetric, string>();
  const excludedMods: string[] = [];
  const seen = new Set<string>();
  let unreviewed = false;
  for (const mod of mods) {
    if (!Number.isInteger(mod.rank) || !Number.isInteger(mod.maxRank) || mod.rank < 0 || mod.rank > mod.maxRank) throw new Error(`Mod com nível inválido: ${mod.slug}.`);
    if (seen.has(mod.slug)) throw new Error(`Mod repetido: ${mod.slug}.`);
    seen.add(mod.slug);
    const targets = Object.prototype.hasOwnProperty.call(RULES, mod.slug) ? RULES[mod.slug] : undefined;
    if (!targets) {
      excludedMods.push(mod.name ?? mod.slug);
      if (!OUTSIDE_SCOPE.has(mod.slug)) unreviewed = true;
      continue;
    }
    const lines = mod.levelStats[mod.rank]?.stats ?? [];
    const conditionIndex = lines.findIndex(line => /^\s*(?:On\b|While\b|After\b|When\b)/i.test(line));
    const staticLines = conditionIndex < 0 ? lines : lines.slice(0, conditionIndex);
    for (const key of targets) {
      const expression = new RegExp(`^\\s*([+-]\\d+(?:\\.\\d+)?)% ${key === 'attackRate' && ['fury_weaponfireratemod', 'primed_fury'].includes(mod.slug) ? 'Attack Speed' : LABELS[key]}${['sacrificial_steel', 'true_steel_weaponcritchancemod'].includes(mod.slug) ? '(?: \\(x2 for Heavy Attacks\\))?' : ['speed_trigger_weaponfireratemod', 'critical_delay'].includes(mod.slug) && key === 'attackRate' ? '(?: \\(x2 for Bows\\))?' : ''}\\s*$`);
      const line = staticLines.find(text => expression.test(text));
      const match = line?.match(expression);
      if (!match || !Number.isFinite(Number(match[1]))) blocked.set(key, `Efeito de ${mod.name ?? mod.slug} sem número estático conferido.`);
      else bonuses[key] += Number(match[1]);
    }
  }
  if (unreviewed) for (const key of KEYS) blocked.set(key, 'Há um mod sem regra revisada nesta combinação.');
  const hasModes = Array.isArray(source.attacks) && source.attacks.length > 0;
  const attacks: SourceAttack[] = hasModes ? source.attacks! : [{ name: 'Base geral da fonte', crit_chance: percent(source.criticalChance) ?? undefined, crit_mult: source.criticalMultiplier, status_chance: percent(source.procChance) ?? undefined, speed: source.fireRate }];
  return {
    coverage: 'PARCIAL', excludedMods,
    attacks: attacks.map(attack => {
      const name = typeof attack.name === 'string' && attack.name ? attack.name : 'Modo sem nome na fonte';
      const base: Record<WeaponMetric, number | null> = { criticalChance: number(attack.crit_chance), criticalMultiplier: number(attack.crit_mult), statusChance: number(attack.status_chance), attackRate: number(attack.speed) };
      const rows = {} as Record<WeaponMetric, WeaponStatRow>;
      for (const key of KEYS) {
        let reason = blocked.get(key);
        if (key === 'criticalChance' && context.melee && name !== 'Normal Attack' && mods.some(mod => ['sacrificial_steel', 'true_steel_weaponcritchancemod'].includes(mod.slug))) reason = 'Bônus crítico do mod ainda não conferido para este modo.';
        if (key === 'attackRate' && (context.bow || (hasModes && !['Normal Attack', 'Beam'].includes(name)) || attack.charge_time !== undefined || (context.melee ? name !== 'Normal Attack' : !['Auto', 'Held'].includes(source.trigger ?? '')))) reason = 'Cadência efetiva de rajada, carga ou ataque especial ainda não conferida.';
        const before = base[key];
        const candidate = before === null ? null : before * (1 + bonuses[key] / 100);
        if (before === null) reason = 'Atributo base ausente ou inválido na fonte.';
        if (candidate !== null && (!Number.isFinite(candidate) || candidate < 0)) reason = 'Resultado fora do intervalo suportado.';
        rows[key] = { before, after: reason || candidate === null ? null : tidy(candidate), ...(reason ? { reason } : {}) };
      }
      return { name, rows };
    }),
    limitations: [
      'Comparação parcial: somente os quatro atributos mostrados e os efeitos estáticos revisados.',
      'Dano, DPS, multishot, elementos, arcanos, bônus de Warframe/companheiro e gatilhos durante a missão não entram nesta conta.',
      'Cadência não representa uma estimativa de dano por segundo. Pequenas diferenças de arredondamento no jogo ainda não foram conferidas.',
    ],
    sources: [
      { name: 'Regras de crítico', url: 'https://wiki.warframe.com/w/Critical' },
      { name: 'Regras de status', url: 'https://wiki.warframe.com/w/Status_Effect' },
      { name: 'Cadência e modos de disparo', url: 'https://wiki.warframe.com/w/Fire_rate' },
    ],
  };
}

export function reviewedWeaponModSlugs(): string[] { return Object.keys(RULES).concat(Array.from(OUTSIDE_SCOPE)); }
