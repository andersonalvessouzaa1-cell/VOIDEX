/** Presets de build com origem e estado de verificação. Nenhum número entra sem fonte. */
export type BuildRole = 'dano' | 'suporte' | 'controle';
export type BuildStatus = 'TESTADO_NO_JOGO' | 'FONTE_COMUNITARIA' | 'NAO_TESTADO';
export type ShardColor = 'carmesim' | 'ambar' | 'azul' | 'violeta' | 'topazio' | 'esmeralda';

export interface ShardSlot { count: number; color: ShardColor; tauforged: boolean | null; effect: string }
export interface BuildPreset {
  id: string;
  targetType: 'warframe';
  targetSlug: string;
  name: string;
  role: BuildRole;
  status: BuildStatus;
  source: { name: string; url: string; retrievedAt: string; author?: string };
  shards: ShardSlot[];
  arcanes: string[];
  helminthNote?: string;
  modsNote: string;
  test?: { by: string; at: string; proof: string };
}

export const ROLE_LABELS: Record<BuildRole, string> = { dano: 'Dano', suporte: 'Suporte', controle: 'Controle' };
export const STATUS_LABELS: Record<BuildStatus, string> = {
  TESTADO_NO_JOGO: 'Testada no jogo',
  FONTE_COMUNITARIA: 'Fonte comunitária, não testada por nós',
  NAO_TESTADO: 'Não testada: só cálculo',
};
export const SHARD_COLOR_LABELS: Record<ShardColor, string> = { carmesim: 'Carmesim', ambar: 'Âmbar', azul: 'Azul', violeta: 'Violeta', topazio: 'Topázio', esmeralda: 'Esmeralda' };

const MODS_NOTE = 'Lista completa de mods e níveis: ver na fonte. Ainda não há dados de efeito sincronizados para calcular este preset.';
const CONSULTA = '2026-11-07';

// Resumos em palavras próprias de builds publicadas na Overframe, consultadas em CONSULTA.
// O que a fonte não informa fica como null ou ausente.
export const BUILD_PRESETS: BuildPreset[] = [
  {
    id: 'dante-dano-infernal-symphony', targetType: 'warframe', targetSlug: 'dante', name: 'Infernal Symphony (uso geral: Slash, dano e buff)', role: 'dano', status: 'FONTE_COMUNITARIA',
    source: { name: 'Overframe', url: 'https://overframe.gg/build/638612/dante/infernal-symphony-general-use-dante-slash-nuke-dps-buff-non-helminth-and-variants/', retrievedAt: CONSULTA },
    shards: [{ count: 3, color: 'ambar', tauforged: null, effect: 'velocidade de lançamento' }, { count: 2, color: 'carmesim', tauforged: null, effect: 'duração' }],
    arcanes: ['Arcane Velocity', 'Arcane Avenger'], helminthNote: 'A fonte descreve opções com Helminth e variantes sem Helminth.', modsNote: MODS_NOTE,
  },
  {
    id: 'dante-dano-noctua-endgame', targetType: 'warframe', targetSlug: 'dante', name: "Noctua: Slash em tudo (endgame)", role: 'dano', status: 'FONTE_COMUNITARIA',
    source: { name: 'Overframe', author: 'Drakolaura', url: 'https://overframe.gg/build/640299/dante/dantes-noctua-slash-everything-endgame-build-all-purpose-sp/', retrievedAt: CONSULTA },
    shards: [{ count: 3, color: 'carmesim', tauforged: null, effect: 'chance de crítico da secundária' }, { count: 2, color: 'ambar', tauforged: null, effect: 'velocidade de lançamento' }],
    arcanes: ['Arcane Energize', 'Arcane Precision'], helminthNote: 'A fonte não usa Helminth.', modsNote: MODS_NOTE,
  },
  {
    id: 'dante-suporte-wiznerd', targetType: 'warframe', targetSlug: 'dante', name: 'WizNerd: apoio ao grupo e Solo SP', role: 'suporte', status: 'FONTE_COMUNITARIA',
    source: { name: 'Overframe', author: 'realsoupersand', url: 'https://overframe.gg/build/675985/dante/wiznerd-squad-support-solo-sp-netracells-endurance/', retrievedAt: CONSULTA },
    shards: [{ count: 1, color: 'carmesim', tauforged: true, effect: 'força de habilidade' }, { count: 2, color: 'ambar', tauforged: true, effect: 'velocidade de lançamento' }, { count: 1, color: 'ambar', tauforged: true, effect: 'energia inicial' }],
    arcanes: [], modsNote: MODS_NOTE,
  },
  {
    id: 'dante-suporte-paradiso', targetType: 'warframe', targetSlug: 'dante', name: 'Paradiso: suporte e dano de uso geral', role: 'suporte', status: 'FONTE_COMUNITARIA',
    source: { name: 'Overframe', url: 'https://overframe.gg/build/941528/dante/paradiso-a-general-use-support-nuke-dante/', retrievedAt: CONSULTA },
    shards: [{ count: 2, color: 'ambar', tauforged: true, effect: 'velocidade de lançamento' }, { count: 1, color: 'carmesim', tauforged: true, effect: 'duração' }, { count: 2, color: 'carmesim', tauforged: true, effect: 'força de habilidade' }],
    arcanes: [], modsNote: MODS_NOTE,
  },
];

export function presetsFor(targetSlug: string, role: BuildRole): BuildPreset[] {
  return BUILD_PRESETS.filter(p => p.targetSlug === targetSlug && p.role === role);
}

export function validatePreset(p: BuildPreset): string[] {
  const errors: string[] = [];
  if (!p.id || !p.name || !p.targetSlug) errors.push('id, nome e alvo são obrigatórios');
  if (!(p.role in ROLE_LABELS)) errors.push('papel inválido');
  if (!(p.status in STATUS_LABELS)) errors.push('estado inválido');
  if (p.status === 'TESTADO_NO_JOGO' && !(p.test?.by && p.test.at && p.test.proof)) errors.push('build testada exige quem, quando e prova');
  if (p.status === 'FONTE_COMUNITARIA' && !(p.source.url.startsWith('https://') && /^\d{4}-\d{2}-\d{2}$/.test(p.source.retrievedAt))) errors.push('fonte comunitária exige link https e data de consulta');
  let shards = 0;
  for (const s of p.shards) {
    if (!Number.isInteger(s.count) || s.count < 1 || s.count > 5) errors.push('quantidade de fragmentos inválida');
    if (!(s.color in SHARD_COLOR_LABELS)) errors.push('cor de fragmento inválida');
    if (!s.effect.trim()) errors.push('fragmento sem efeito descrito');
    shards += s.count;
  }
  if (shards > 5) errors.push('mais de 5 fragmentos');
  return errors;
}
