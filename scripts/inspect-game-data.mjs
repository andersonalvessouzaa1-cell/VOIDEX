#!/usr/bin/env node
// Gera docs/DATA_SAMPLES.md com exemplos reais dos dados sincronizados (para conferir campos antes de calcular).
// Uso (na raiz do projeto, depois do sync):  node scripts/inspect-game-data.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'lib', 'data-engine', 'dataset', 'generated');
const WANT = {
  warframes: ['Dante', 'Nova Prime', 'Excalibur'],
  primary: ['Braton Prime'], secondary: ['Lato Prime'], melee: ['Glaive Prime'],
  mods: ['Stretch', 'Blind Rage', 'Primed Continuity', 'Transient Fortitude'],
  arcanes: ['Arcane Energize'], pets: [], sentinels: [],
};
const cut = (value, max) => { const s = JSON.stringify(value); return s.length > max ? s.slice(0, max) + ' ...(cortado)' : s; };

const out = ['# Exemplos dos dados sincronizados', '', 'Gerado por `scripts/inspect-game-data.mjs`. Só leitura dos arquivos em `lib/data-engine/dataset/generated`.', ''];
const files = ['warframes', 'primary', 'secondary', 'melee', 'mods', 'arcanes', 'sentinels', 'pets', 'sentinel_weapons', 'archwing', 'arch_gun', 'arch_melee', 'shards'];
for (const key of files) {
  let data;
  try { data = JSON.parse(await readFile(path.join(DIR, `${key}.json`), 'utf8')); } catch { out.push(`## ${key}`, '', 'Arquivo não encontrado.', ''); continue; }
  const items = data.items;
  out.push(`## ${key} (${items.length} itens)`, '');
  const first = items[0];
  if (first) out.push('Primeiro item:', '```json', cut(first, 1400), '```', '');
  for (const name of WANT[key] ?? []) {
    const hit = items.find((i) => i.name.toLowerCase() === name.toLowerCase());
    out.push(hit ? `Exemplo "${name}":` : `"${name}": não encontrado.`);
    if (hit) out.push('```json', cut(hit, 2200), '```');
    out.push('');
  }
  if (key === 'shards') for (const s of items) out.push(`- ${s.name}: ${cut(s.description, 200)} | stats: ${cut(s.stats, 200)}`);
  if (key === 'shards') out.push('');
}
await mkdir(path.join(ROOT, 'docs'), { recursive: true });
await writeFile(path.join(ROOT, 'docs', 'DATA_SAMPLES.md'), out.join('\n') + '\n', 'utf8');
console.log('Gerado docs/DATA_SAMPLES.md');
