/** Leitura dos efeitos de mods (texto da fonte) e soma dos atributos de habilidade. Nada é estimado. */
export type AbilityKey = 'forca' | 'duracao' | 'eficiencia' | 'alcance';
export const ABILITY_LABELS: Record<AbilityKey, string> = { forca: 'Força', duracao: 'Duração', eficiencia: 'Eficiência', alcance: 'Alcance' };
const ABILITY_STATS: Record<string, AbilityKey> = { 'ability strength': 'forca', 'ability duration': 'duracao', 'ability efficiency': 'eficiencia', 'ability range': 'alcance' };

export interface LevelStat { stats: string[] }
export interface ParsedEffect { stat: string; value: number; unit: '%' | ''; raw: string }

/** "+9% Ability Strength" -> { stat: 'Ability Strength', value: 9, unit: '%' }. Linhas fora do padrão devolvem null. */
export function parseEffectLine(line: string): ParsedEffect | null {
  const match = /^\s*([+-]?\d+(?:\.\d+)?)\s*(%?)\s+(.+?)\s*$/.exec(line);
  if (!match) return null;
  return { stat: match[3], value: Number(match[1]), unit: match[2] === '%' ? '%' : '', raw: line.trim() };
}

export function effectsAtRank(levelStats: LevelStat[] | undefined, rank: number): { parsed: ParsedEffect[]; unparsed: string[] } | null {
  const entry = levelStats?.[rank];
  if (!entry || !Array.isArray(entry.stats)) return null;
  const parsed: ParsedEffect[] = [];
  const unparsed: string[] = [];
  for (const line of entry.stats) {
    const effect = typeof line === 'string' ? parseEffectLine(line) : null;
    if (effect) parsed.push(effect); else unparsed.push(String(line));
  }
  return { parsed, unparsed };
}

const abilityKey = (effect: ParsedEffect): AbilityKey | undefined => (effect.unit === '%' ? ABILITY_STATS[effect.stat.toLowerCase()] : undefined);

export const hasAbilityEffect = (levelStats: LevelStat[] | undefined, rank: number): boolean =>
  effectsAtRank(levelStats, rank)?.parsed.some(effect => abilityKey(effect) !== undefined) ?? false;

export interface ModPick { levelStats?: LevelStat[]; rank: number }

/** Soma aditiva em pontos percentuais sobre a base de 100%. Efeitos que não são de habilidade ficam em `ignored`. */
export function abilityTotals(picks: ModPick[]): { totals: Record<AbilityKey, number>; ignored: string[] } {
  const totals: Record<AbilityKey, number> = { forca: 100, duracao: 100, eficiencia: 100, alcance: 100 };
  const ignored: string[] = [];
  for (const pick of picks) {
    const effects = effectsAtRank(pick.levelStats, pick.rank);
    if (!effects) continue;
    for (const effect of effects.parsed) {
      const key = abilityKey(effect);
      if (key) totals[key] += effect.value; else ignored.push(effect.raw);
    }
    ignored.push(...effects.unparsed);
  }
  return { totals, ignored };
}
