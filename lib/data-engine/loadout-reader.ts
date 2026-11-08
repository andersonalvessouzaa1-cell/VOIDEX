import { compareCompanionStats, type CompanionComparison, type CompanionStatSource } from './companion-stat-comparison';
import { compareWeaponStats, type WeaponComparison, type WeaponStatSource } from './weapon-stat-comparison';
import { DANTE_BASE, DANTE_SOURCE } from '../build-simulator';
import { abilityTotals, parseEffectLine, type LevelStat } from './mod-effects';
import { readGenerated } from './generated-reader';
import { validateLoadout, type EquipmentSlot } from './loadout';
import type { CuratedEquipment, CuratedLoadout } from './curated-loadouts';

interface Row { slug: string; name: string; imageName: string | null; stats: WeaponStatSource & CompanionStatSource & { productCategory?: string; fusionLimit?: number; levelStats?: LevelStat[] } }
export interface ResolvedMod { slug: string; name: string; imageName: string | null; rank: number; maxRank: number; slot: string; effects: string[]; levelStats: LevelStat[]; publishedRank?: number }
export interface ResolvedArcane { slug: string; name: string; imageName: string | null; rank: number; maxRank: number; effects: string[] }
export interface ResolvedEquipment extends Omit<CuratedEquipment, 'mods' | 'arcanes'> { weaponComparison?: WeaponComparison; companionComparison?: CompanionComparison; name: string; imageName: string | null; mods: ResolvedMod[]; arcanes: ResolvedArcane[] }
export interface ResolvedLoadout extends Omit<CuratedLoadout, 'equipment' | 'shards'> { equipment: Record<string, ResolvedEquipment>; shards: (CuratedLoadout['shards'][number] & { imageName: string | null })[] }
const CATEGORIES: Record<EquipmentSlot, string[]> = { warframe: ['warframes'], primary: ['primary'], secondary: ['secondary'], melee: ['melee'], companion: ['sentinels', 'pets'], companion_weapon: ['sentinel_weapons'] };
const clean = (text: string) => text.replace(/<[^>]+>/g, '').replace(/\\n/g, '\n');

/** Resolve tudo antes de exibir: uma referência ausente nunca vira equipamento inventado. */
export function resolveLoadout(preset: CuratedLoadout): ResolvedLoadout {
  const errors = validateLoadout(preset);
  if (errors.length) throw new Error(errors.join(' '));
  const mods = new Map(readGenerated<Row>('mods').items.map(row => [row.slug, row]));
  const arcanes = new Map(readGenerated<Row>('arcanes').items.map(row => [row.slug, row]));
  const equipment: Record<string, ResolvedEquipment> = {};
  for (const [slot, part] of Object.entries(preset.equipment)) {
    if (!part) continue;
    const item = CATEGORIES[slot as EquipmentSlot].flatMap(category => readGenerated<Row>(category).items).find(row => row.slug === part.slug);
    if (!item) throw new Error(`Equipamento não encontrado na base: ${part.slug}.`);
    equipment[slot] = {
      ...structuredClone(part), name: item.name, imageName: item.imageName,
      mods: part.mods.map(selection => {
        const row = mods.get(selection.slug);
        if (!row || row.stats.fusionLimit !== selection.maxRank || (row.stats.levelStats && !row.stats.levelStats[selection.rank])) throw new Error(`Mod ou nível sem dado confirmado: ${selection.slug}.`);
        return { ...selection, name: row.name, imageName: row.imageName, effects: row.stats.levelStats?.[selection.rank]?.stats.map(clean) ?? [], levelStats: row.stats.levelStats ?? [], publishedRank: part.publishedRanks?.[selection.slug] };
      }),
      arcanes: part.arcanes.map(selection => {
        const row = arcanes.get(selection.slug);
        if (!row || (row.stats.levelStats?.length ?? 0) - 1 !== selection.maxRank || !row.stats.levelStats?.[selection.rank]) throw new Error(`Arcano ou nível sem dado confirmado: ${selection.slug}.`);
        return { ...selection, name: row.name, imageName: row.imageName, effects: row.stats.levelStats[selection.rank].stats.map(clean) };
      }),
    };
    if (slot === 'companion') equipment[slot].companionComparison = compareCompanionStats(item.stats, equipment[slot].mods, item.stats.productCategory === 'Sentinels' ? 'sentinels' : 'pets');
    if (['primary', 'secondary', 'melee', 'companion_weapon'].includes(slot)) equipment[slot].weaponComparison = compareWeaponStats(item.stats, equipment[slot].mods, { melee: slot === 'melee' });
  }
  const shardItems = readGenerated<Row>('shards').items;
  const shardColors: Record<string, string> = { ambar: 'amber', carmesim: 'crimson', azul: 'azure', violeta: 'violet', topazio: 'topaz', esmeralda: 'emerald' };
  const shards = preset.shards.map(shard => {
    const color = Object.prototype.hasOwnProperty.call(shardColors, shard.color) ? shardColors[shard.color] : null;
    const slug = color ? `${shard.tauforged ? 'tauforged_' : ''}${color}_archon_shard` : null;
    return { ...structuredClone(shard), imageName: shardItems.find(item => item.slug === slug)?.imageName ?? null };
  });
  return { ...structuredClone(preset), equipment, shards };
}

/** Cobertura inicial conferida contra o preset 817819: sem gatilhos ativos e só um mod Umbral. */
export function compareCuratedWarframe(preset: ResolvedLoadout) {
  if (preset.equipment.warframe.slug !== 'dante') return null;
  const mods = preset.equipment.warframe.mods;
  const { totals } = abilityTotals(mods.map(mod => ({ levelStats: mod.levelStats, rank: mod.rank })));
  const withoutShards = { strength: totals.forca, duration: totals.duracao, efficiency: totals.eficiencia, range: totals.alcance };
  const stats = { ...DANTE_BASE, ...withoutShards };
  let castingSpeedBonus = 0;
  for (const shard of preset.shards) {
    const duration = shard.color === 'carmesim' && shard.effect === 'ability_duration' && shard.value === (shard.tauforged ? 15 : 10);
    const casting = shard.color === 'ambar' && shard.effect === 'casting_speed' && shard.value === (shard.tauforged ? 37.5 : 25);
    if (shard.unit !== '%' || (!duration && !casting)) throw new Error('Fragmento sem regra numérica conferida nesta comparação.');
    if (duration) stats.duration += shard.value;
    else castingSpeedBonus += shard.value;
  }
  // Primed Flow desta configuração: bônus de energia máxima, sem efeito condicional.
  const flow = mods.find(mod => mod.slug === 'primed_flow');
  const energyEffect = flow?.effects.map(parseEffectLine).find(effect => effect?.stat === 'Energy Max' && effect.unit === '%');
  const rawEnergy = DANTE_BASE.energy * (1 + (energyEffect?.value ?? 0) / 100);
  stats.energy = rawEnergy;
  const roarDamageBonus = preset.helminth.kind === 'subsumed' && preset.helminth.ability === 'Roar' ? Math.round(30 * stats.strength) / 100 : null;
  return { base: { ...DANTE_BASE }, stats, withoutShards, rawEnergy, castingSpeedBonus, roarDamageBonus, conditionalEffectsActive: false, sources: [{ name: 'Atributos oficiais do Dante (nível 30)', url: DANTE_SOURCE }, { name: 'Roar subsumido: notas oficiais', url: 'https://www.warframe.com/en/patch-notes/switch/29-0-0' }] };
}
