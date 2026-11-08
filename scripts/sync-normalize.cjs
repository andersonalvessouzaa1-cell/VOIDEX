// Normalização dos dados de jogo (WFCD/warframe-items) para o formato do VOIDEX.
// Regras: só copia campos que a fonte trouxe; nada é estimado; campo ausente continua ausente.
'use strict';

const IMAGE_RE = /^[\w\-.]{1,120}\.(png|webp|jpe?g)$/i;
const CDN = 'https://cdn.warframestat.us/img/';

const WARFRAME_STATS = ['health', 'shield', 'armor', 'power', 'sprint', 'aura', 'polarities', 'passiveDescription', 'productCategory', 'releaseDate', 'vaulted', 'isPrime'];
const WEAPON_STATS = ['fireRate', 'criticalChance', 'criticalMultiplier', 'procChance', 'totalDamage', 'damage', 'damagePerShot', 'magazineSize', 'ammo', 'reloadTime', 'multishot', 'accuracy', 'trigger', 'noise', 'range', 'attacks', 'polarities', 'disposition', 'omegaAttenuation', 'slot', 'productCategory', 'comboDuration', 'followThrough', 'blockingAngle', 'stancePolarity', 'vaulted', 'isPrime', 'releaseDate'];
const MOD_STATS = ['polarity', 'rarity', 'baseDrain', 'fusionLimit', 'compatName', 'levelStats', 'isAugment', 'isUtility', 'modSet'];
const ARCANE_STATS = ['rarity', 'levelStats'];
const COMPANION_STATS = ['health', 'shield', 'armor', 'power', 'stamina', 'polarities', 'productCategory'];
const SHARD_STATS = ['rarity'];

function slugify(text) {
  return String(text ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}
const validImageName = (v) => typeof v === 'string' && IMAGE_RE.test(v) && !v.includes('..');
const imageUrl = (v) => (validImageName(v) ? CDN + v : null);

function pick(source, keys) {
  const out = {};
  for (const key of keys) if (source[key] !== undefined && source[key] !== null) out[key] = source[key];
  return out;
}

function base(item, category, statKeys, extra = {}) {
  return {
    slug: slugify(item.name),
    uniqueName: typeof item.uniqueName === 'string' ? item.uniqueName : null,
    name: String(item.name ?? ''),
    category,
    type: typeof item.type === 'string' ? item.type : null,
    imageName: validImageName(item.imageName) ? item.imageName : null,
    imageUrl: imageUrl(item.imageName),
    tradable: typeof item.tradable === 'boolean' ? item.tradable : null,
    masteryReq: Number.isFinite(item.masteryReq) ? item.masteryReq : null,
    description: typeof item.description === 'string' ? item.description : null,
    stats: { ...pick(item, statKeys), ...extra },
  };
}

function normalizeWarframe(item, category = 'warframes') {
  const abilities = Array.isArray(item.abilities) ? item.abilities.filter((a) => a && a.name).map((a) => ({ name: String(a.name), description: typeof a.description === 'string' ? a.description : null })) : undefined;
  return base(item, category, WARFRAME_STATS, abilities && abilities.length ? { abilities } : {});
}
const normalizeWeapon = (item, category) => base(item, category, WEAPON_STATS);
const normalizeMod = (item) => base(item, 'mods', MOD_STATS);
const normalizeArcane = (item) => base(item, 'arcanes', ARCANE_STATS);
const normalizeCompanion = (item, category) => base(item, category, COMPANION_STATS);
const normalizeShard = (item) => base(item, 'shards', SHARD_STATS);
const isArchonShard = (item) => typeof item?.name === 'string' && /archon shard/i.test(item.name);

// Garante slug único dentro da categoria.
function uniqueSlugs(items) {
  const seen = new Map();
  for (const item of items) {
    let slug = item.slug || slugify(item.uniqueName ?? 'item');
    if (seen.has(slug)) {
      const tail = slugify((item.uniqueName ?? '').split('/').pop() ?? '');
      slug = tail && !seen.has(`${slug}_${tail}`) ? `${slug}_${tail}` : `${slug}_${seen.size}`;
    }
    seen.set(slug, true);
    item.slug = slug;
  }
  return items;
}

function categoryStats(items) {
  const presence = {};
  for (const item of items) for (const key of Object.keys(item.stats)) presence[key] = (presence[key] ?? 0) + 1;
  const withoutImage = items.filter((item) => !item.imageName).map((item) => item.name);
  return { total: items.length, withImage: items.length - withoutImage.length, presence, withoutImageExamples: withoutImage.slice(0, 15) };
}

function coverageMarkdown(manifest, stats) {
  const lines = ['# Cobertura dos dados sincronizados', '', `Gerado por \`scripts/sync-game-data.mjs\` em ${manifest.generatedAt}. Fonte: ${manifest.source.repo} (${manifest.source.baseUsed ?? 'sem base'}). Não editar à mão.`, '', '| Categoria | Itens | Com imagem | Sem imagem |', '|---|---|---|---|'];
  for (const [key, s] of Object.entries(stats)) lines.push(`| ${key} | ${s.total} | ${s.withImage} | ${s.total - s.withImage} |`);
  for (const [key, s] of Object.entries(stats)) {
    lines.push('', `## ${key}`, '', '| Campo (stats) | Itens que trazem o campo | % |', '|---|---|---|');
    for (const [field, count] of Object.entries(s.presence).sort((a, b) => b[1] - a[1])) lines.push(`| ${field} | ${count} | ${s.total ? Math.round((count / s.total) * 100) : 0}% |`);
    if (s.withoutImageExamples.length) lines.push('', `Exemplos sem imagem: ${s.withoutImageExamples.join(', ')}.`);
  }
  if (manifest.failures.length) { lines.push('', '## Falhas'); for (const f of manifest.failures) lines.push(`- ${f.key}: ${f.error}`); }
  lines.push('', 'Campo ausente significa que a fonte não trouxe o dado: aparece como "sem dado" no site, nunca como zero.');
  return lines.join('\n') + '\n';
}

module.exports = { slugify, validImageName, imageUrl, pick, normalizeWarframe, normalizeWeapon, normalizeMod, normalizeArcane, normalizeCompanion, normalizeShard, isArchonShard, uniqueSlugs, categoryStats, coverageMarkdown };
