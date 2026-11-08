#!/usr/bin/env node
// Sincroniza Warframes, armas, mods, arcanos, companheiros e fragmentos de Archon a partir do WFCD/warframe-items.
// Uso (na raiz do projeto, com internet):  node scripts/sync-game-data.mjs [--only=mods,arcanes] [--base=URL]
// Saída: lib/data-engine/dataset/generated/*.json, manifest.json e docs/DATA_COVERAGE.md. Não editar essas saídas à mão.
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const n = require('./sync-normalize.cjs');
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'lib', 'data-engine', 'dataset', 'generated');
const DOCS = path.join(ROOT, 'docs');
const REPO = 'https://github.com/WFCD/warframe-items';
const BASES = ['https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/', 'https://cdn.jsdelivr.net/gh/WFCD/warframe-items@master/data/json/'];

const CATEGORIES = [
  { key: 'warframes', file: 'Warframes.json', map: (i) => n.normalizeWarframe(i, 'warframes') },
  { key: 'primary', file: 'Primary.json', map: (i) => n.normalizeWeapon(i, 'primary') },
  { key: 'secondary', file: 'Secondary.json', map: (i) => n.normalizeWeapon(i, 'secondary') },
  { key: 'melee', file: 'Melee.json', map: (i) => n.normalizeWeapon(i, 'melee') },
  { key: 'mods', file: 'Mods.json', map: n.normalizeMod },
  { key: 'arcanes', file: 'Arcanes.json', map: n.normalizeArcane },
  { key: 'sentinels', file: 'Sentinels.json', map: (i) => n.normalizeCompanion(i, 'sentinels'), optional: true },
  { key: 'pets', file: 'Pets.json', map: (i) => n.normalizeCompanion(i, 'pets'), optional: true },
  { key: 'sentinel_weapons', file: 'SentinelWeapons.json', map: (i) => n.normalizeWeapon(i, 'sentinel_weapons'), optional: true },
  { key: 'archwing', file: 'Archwing.json', map: (i) => n.normalizeWarframe(i, 'archwing'), optional: true },
  { key: 'arch_gun', file: 'Arch-Gun.json', map: (i) => n.normalizeWeapon(i, 'arch_gun'), optional: true },
  { key: 'arch_melee', file: 'Arch-Melee.json', map: (i) => n.normalizeWeapon(i, 'arch_melee'), optional: true },
  { key: 'shards', file: 'Misc.json', map: n.normalizeShard, filter: n.isArchonShard, optional: true },
];

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')).map(([k, v]) => [k, v ?? true]));
const only = typeof args.only === 'string' ? new Set(args.only.split(',')) : null;
const bases = typeof args.base === 'string' ? [args.base.endsWith('/') ? args.base : args.base + '/'] : BASES;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(file) {
  let lastError = 'sem tentativa';
  for (const base of bases) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetch(base + file, { headers: { 'User-Agent': 'VOIDEX-sync/0.1', Accept: 'application/json' }, signal: AbortSignal.timeout(120000) });
        if (!response.ok) { lastError = `HTTP ${response.status} em ${base}${file}`; if (response.status === 404) break; throw new Error(lastError); }
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('A resposta não é uma lista');
        return { data, base };
      } catch (error) {
        lastError = String(error?.message ?? error);
        await sleep(1000 * (attempt + 1) * (attempt + 1));
      }
    }
  }
  throw new Error(lastError);
}

async function repoVersion() {
  try {
    const r = await fetch('https://raw.githubusercontent.com/WFCD/warframe-items/master/package.json', { signal: AbortSignal.timeout(20000) });
    return r.ok ? (await r.json()).version ?? null : null;
  } catch { return null; }
}

function serialize(meta, items) {
  return `{"meta":${JSON.stringify(meta)},"items":[\n${items.map((i) => JSON.stringify(i)).join(',\n')}\n]}\n`;
}

await mkdir(OUT, { recursive: true });
await mkdir(DOCS, { recursive: true });
const generatedAt = new Date().toISOString();
const manifest = { generatedAt, source: { name: 'WFCD/warframe-items', repo: REPO, version: await repoVersion(), baseUsed: null, licenseNote: 'Dados comunitários extraídos do jogo. Conferir a licença do repositório e os direitos da Digital Extremes antes de publicar.' }, categories: {}, failures: [] };
const stats = {};

for (const cat of CATEGORIES) {
  if (only && !only.has(cat.key)) continue;
  process.stdout.write(`- ${cat.key} (${cat.file}) ... `);
  try {
    const { data, base } = await getJson(cat.file);
    manifest.source.baseUsed = manifest.source.baseUsed ?? base;
    const raw = cat.filter ? data.filter(cat.filter) : data;
    const items = n.uniqueSlugs(raw.filter((i) => i && i.name).map(cat.map));
    const meta = { category: cat.key, sourceFile: cat.file, sourceRepo: REPO, fetchedAt: generatedAt, count: items.length };
    await writeFile(path.join(OUT, `${cat.key}.json`), serialize(meta, items), 'utf8');
    stats[cat.key] = n.categoryStats(items);
    manifest.categories[cat.key] = { file: `${cat.key}.json`, count: items.length, withImage: stats[cat.key].withImage };
    console.log(`${items.length} itens (${stats[cat.key].withImage} com imagem)`);
  } catch (error) {
    const message = String(error?.message ?? error);
    manifest.failures.push({ key: cat.key, optional: !!cat.optional, error: message });
    console.log(`${cat.optional ? 'ignorado (opcional)' : 'FALHOU'}: ${message}`);
  }
}

await writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
await writeFile(path.join(DOCS, 'DATA_COVERAGE.md'), n.coverageMarkdown(manifest, stats), 'utf8');
const hard = manifest.failures.filter((f) => !f.optional);
console.log(`\nConcluído. Arquivos em ${path.relative(ROOT, OUT)}; relatório em docs/DATA_COVERAGE.md.`);
if (hard.length) { console.log(`Falhas obrigatórias: ${hard.map((f) => f.key).join(', ')}. Copie a mensagem acima e envie para análise.`); process.exit(1); }
