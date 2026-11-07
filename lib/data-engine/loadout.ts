/** Contrato estrutural de equipamento completo. Não certifica regras nem testes no jogo. */
export interface BuildSource { name: string; url: string; retrievedAt: string; author?: string }
export type EquipmentSlot = 'warframe' | 'primary' | 'secondary' | 'melee' | 'companion' | 'companion_weapon';
export interface EquippedMod { slug: string; rank: number; maxRank: number; slot: string }
export interface EquippedArcane { slug: string; rank: number; maxRank: number }
export interface EquipmentBuild { slug: string; category: EquipmentSlot; mods: EquippedMod[]; arcanes: EquippedArcane[]; source: BuildSource }
export interface LoadoutShard { color: 'carmesim' | 'ambar' | 'azul' | 'violeta' | 'topazio' | 'esmeralda'; tauforged: boolean; effect: string; value: number; unit: string; source: BuildSource }
export type HelminthChoice = { kind: 'original'; note: string } | { kind: 'subsumed'; ability: string; replacedAbility: string; source: BuildSource };
export interface CompleteLoadout {
  id: string;
  name: string;
  role: string;
  status: 'FONTE_COMUNITARIA' | 'TESTADO_NO_JOGO' | 'NAO_TESTADO';
  source: BuildSource;
  equipment: Record<Exclude<EquipmentSlot, 'companion_weapon'>, EquipmentBuild> & { companion_weapon?: EquipmentBuild };
  shards: LoadoutShard[];
  helminth: HelminthChoice;
  test?: { by: string; at: string; gameVersion: string; proof: string };
}
const object = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const text = (v: unknown): v is string => typeof v === 'string' && !!v.trim();
const https = (v: unknown): boolean => { try { return text(v) && new URL(v).protocol === 'https:'; } catch { return false; } };
const date = (v: unknown): boolean => text(v) && /^\d{4}-\d{2}-\d{2}$/.test(v) && Number.isFinite(Date.parse(v)) && new Date(v).toISOString().slice(0, 10) === v;
const source = (v: unknown): boolean => object(v) && text(v.name) && https(v.url) && date(v.retrievedAt);
const rankValid = (v: Record<string, unknown>): boolean => typeof v.rank === 'number' && Number.isInteger(v.rank) && typeof v.maxRank === 'number' && Number.isInteger(v.maxRank) && v.maxRank >= 0 && v.rank >= 0 && v.rank <= v.maxRank;

export function validateLoadout(value: unknown): string[] {
  if (!object(value)) return ['Equipamento completo inválido.'];
  const errors: string[] = [];
  if (!text(value.id) || !text(value.name) || !text(value.role)) errors.push('Identificação incompleta.');
  if (!source(value.source)) errors.push('Fonte exige nome, URL https e data válida.');
  if (!['FONTE_COMUNITARIA', 'TESTADO_NO_JOGO', 'NAO_TESTADO'].includes(value.status as string)) errors.push('Estado inválido.');
  if (value.status === 'TESTADO_NO_JOGO' && !(object(value.test) && text(value.test.by) && date(value.test.at) && text(value.test.gameVersion) && https(value.test.proof))) errors.push('Teste exige autor, data, versão e prova.');
  const equipment = object(value.equipment) ? value.equipment : {};
  for (const slot of ['warframe', 'primary', 'secondary', 'melee', 'companion', 'companion_weapon']) {
    const entry = equipment[slot];
    if (slot === 'companion_weapon' && entry === undefined) continue;
    if (!object(entry) || !text(entry.slug) || entry.category !== slot || !source(entry.source)) { errors.push(`Equipamento ou fonte inválida: ${slot}.`); continue; }
    if (!Array.isArray(entry.mods) || !entry.mods.length) errors.push(`Mods ausentes: ${slot}.`);
    else {
      const slugs = new Set<string>(), slots = new Set<string>();
      for (const mod of entry.mods) {
        if (!object(mod) || !text(mod.slug) || !text(mod.slot) || !rankValid(mod)) { errors.push(`Mod ou nível inválido: ${slot}.`); continue; }
        if (slugs.has(mod.slug) || slots.has(mod.slot)) errors.push(`Mod ou vaga repetida: ${slot}.`);
        slugs.add(mod.slug); slots.add(mod.slot);
      }
    }
    if (!Array.isArray(entry.arcanes)) errors.push(`Arcanos ausentes: ${slot}.`);
    else {
      const seen = new Set<string>();
      for (const arcane of entry.arcanes) {
        if (!object(arcane) || !text(arcane.slug) || !rankValid(arcane)) { errors.push(`Arcano inválido: ${slot}.`); continue; }
        if (seen.has(arcane.slug)) errors.push(`Arcano repetido: ${slot}.`);
        seen.add(arcane.slug);
      }
    }
  }
  if (!Array.isArray(value.shards) || value.shards.length > 5) errors.push('Fragmentos: máximo de cinco.');
  else for (const shard of value.shards) {
    if (!object(shard) || !['carmesim', 'ambar', 'azul', 'violeta', 'topazio', 'esmeralda'].includes(shard.color as string) || typeof shard.tauforged !== 'boolean' || !text(shard.effect) || typeof shard.value !== 'number' || !Number.isFinite(shard.value) || !text(shard.unit) || !source(shard.source)) errors.push('Fragmento sem efeito, valor ou fonte válido.');
  }
  const h = value.helminth;
  if (!object(h) || !(h.kind === 'original' ? text(h.note) : h.kind === 'subsumed' && text(h.ability) && text(h.replacedAbility) && source(h.source))) errors.push('Helminth exige habilidade original ou troca documentada.');
  return errors;
}

/** Uma edição livre não herda a prova de teste do preset original. */
export function personalizeLoadout(loadout: CompleteLoadout): CompleteLoadout {
  const copy = structuredClone(loadout);
  copy.status = 'NAO_TESTADO';
  delete copy.test;
  return copy;
}
