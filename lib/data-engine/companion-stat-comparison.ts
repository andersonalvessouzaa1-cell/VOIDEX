import type { LevelStat } from './mod-effects';
export type CompanionMetric = 'health' | 'shields' | 'armor';
export interface CompanionStatSource { health?: number; shield?: number; armor?: number }
interface Mod { slug: string; name?: string; rank: number; maxRank: number; levelStats: LevelStat[] }
export interface CompanionComparison {
  coverage: 'PARCIAL';
  rows: Record<CompanionMetric, { before: number | null; after: number | null }>;
  excludedMods: string[];
  limitations: string[];
  sources: { name: string; url: string }[];
}
const RULES: Record<string, { metric: CompanionMetric; label: string }> = {
  enhanced_vitality: { metric: 'health', label: 'Health' },
  calculated_redirection: { metric: 'shields', label: 'Shield Capacity' },
  metal_fiber: { metric: 'armor', label: 'Armor' },
};
// Preceitos, utilidade e efeitos condicionais não entram nos três atributos estáticos.
// Lista explícita: nomes desconhecidos bloqueiam o resultado, nunca viram bônus inventado.
const OUTSIDE = new Set(['primed_regen', 'manifold_bond', 'duplex_bond', 'tenacious_bond', 'vacuum', 'arc_coil', 'primed_animal_instinct', 'momentous_bond', 'synth_deconstruct', 'guardian', 'synth_fiber']);
const valid = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v >= 0;
export function getCompanionCategory(slug: string, productCategory?: string): 'sentinels' | 'beasts' | 'unsupported' {
  if (productCategory === 'Sentinels') return 'sentinels';
  if (productCategory === 'KubrowPets' && (/_(kavat|kubrow)$/.test(slug) || slug === 'helminth_charger')) return 'beasts';
  return 'unsupported';
}
export function compareCompanionStats(source: CompanionStatSource, mods: Mod[], category: string): CompanionComparison {
  const base = { health: source.health, shields: source.shield, armor: source.armor };
  const bonus = { health: 0, shields: 0, armor: 0 };
  const blocked = new Set<CompanionMetric>();
  const excludedMods: string[] = [];
  const keys: CompanionMetric[] = ['health', 'shields', 'armor'];
  if (category !== 'sentinels' && category !== 'beasts') keys.forEach(k => blocked.add(k));
  for (const mod of mods) {
    const rule = Object.prototype.hasOwnProperty.call(RULES, mod.slug) ? RULES[mod.slug] : undefined;
    if (!rule) {
      excludedMods.push(mod.name ?? mod.slug);
      if (mod.slug === 'link_vitality') blocked.add('health');
      else if (mod.slug === 'link_redirection') blocked.add('shields');
      else if (mod.slug === 'link_fiber') blocked.add('armor');
      else if (!OUTSIDE.has(mod.slug)) keys.forEach(k => blocked.add(k));
      continue;
    }
    const lines = Number.isInteger(mod.rank) && mod.rank >= 0 && mod.rank <= mod.maxRank ? mod.levelStats[mod.rank]?.stats : undefined;
    const match = lines?.length === 1 ? lines[0].match(/^\+(\d+(?:\.\d+)?)% (Health|Shield Capacity|Armor)$/) : null;
    if (!match || match[2] !== rule.label || !valid(Number(match[1]))) blocked.add(rule.metric);
    else bonus[rule.metric] += Number(match[1]);
  }
  const rows = {} as CompanionComparison['rows'];
  for (const key of keys) {
    const before = valid(base[key]) ? base[key]! : null;
    const result = before === null || blocked.has(key) ? null : before * (1 + bonus[key] / 100);
    rows[key] = { before, after: result !== null && Number.isFinite(result) ? result : null };
  }
  return {
    coverage: 'PARCIAL', rows, excludedMods,
    limitations: [
      'Base do catálogo sincronizado em 07/11/2026. Sem multiplicar por nível: a revisão de companheiros removeu os bônus de vida e escudos por rank.',
      'Cobertura estática: sentinelas, Kavats, Kubrows e Helminth Charger. Venari, Vulpaphylas, Predasites e companheiros modulares aguardam regras próprias.',
      'Enhanced Vitality, Calculated Redirection e Metal Fiber usam o percentual do rank selecionado sobre a base. Linked mods dependem do Warframe e deixam o atributo sem cálculo.',
      'Gatilhos de preceitos e Bond, cura, regeneração, invulnerabilidade, arcanos e bônus de outros equipamentos não são simulados. Não representa sobrevivência em combate nem teste dentro do jogo.',
      'Sem cálculo indica dado ausente ou regra ainda não revisada. A arma do companheiro tem comparação separada.',
    ],
    sources: [
      { name: 'Digital Extremes: revisão dos companheiros e atributos do Diriga', url: 'https://www.warframe.com/en/patch-notes/pc/34-0-0' },
      { name: 'WFCD: catálogo e valores dos mods por rank', url: 'https://github.com/WFCD/warframe-items' },
    ],
  };
}
