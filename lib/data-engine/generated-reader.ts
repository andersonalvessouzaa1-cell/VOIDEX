import fs from 'node:fs';
import path from 'node:path';

/** Lê os arquivos criados por scripts/sync-game-data.mjs (só no servidor). Falha com mensagem clara se faltarem. */
export interface GeneratedFile<T> { meta: { category: string; fetchedAt: string; count: number }; items: T[] }
const cache = new Map<string, GeneratedFile<unknown>>();

export function readGenerated<T>(category: string): GeneratedFile<T> {
  if (!/^[a-z_]+$/.test(category)) throw new Error('Categoria inválida.');
  const cached = cache.get(category);
  if (cached) return cached as GeneratedFile<T>;
  const file = path.join(process.cwd(), 'lib', 'data-engine', 'dataset', 'generated', `${category}.json`);
  if (!fs.existsSync(file)) throw new Error(`Base de dados não encontrada (${category}). Rode: node scripts/sync-game-data.mjs`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8')) as GeneratedFile<T>;
  cache.set(category, data);
  return data;
}
