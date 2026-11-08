/** Testes de lib/data-engine/generated-reader.ts com uma pasta temporária. */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { readGenerated } from '../lib/data-engine/generated-reader';

export function runGeneratedReaderTests() {
  let passed = 0, failed = 0;
  const assert = (ok: boolean, name: string) => { if (ok) { passed++; console.log('  ✅ [PASS] ' + name); } else { failed++; console.error('  ❌ [FAIL] ' + name); } };
  console.log('🧪 generated-reader');
  const original = process.cwd();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'voidex-'));
  try {
    fs.mkdirSync(path.join(tmp, 'lib', 'data-engine', 'dataset', 'generated'), { recursive: true });
    fs.writeFileSync(path.join(tmp, 'lib', 'data-engine', 'dataset', 'generated', 'teste.json'), JSON.stringify({ meta: { category: 'teste', fetchedAt: 'x', count: 1 }, items: [{ slug: 'a' }] }));
    process.chdir(tmp);
    assert(readGenerated<{ slug: string }>('teste').items[0].slug === 'a', 'lê um arquivo sincronizado');
    let message = '';
    try { readGenerated('inexistente'); } catch (e) { message = e instanceof Error ? e.message : ''; }
    assert(message.includes('sync-game-data'), 'arquivo ausente dá mensagem com o comando do sync');
    let invalid = false;
    try { readGenerated('../x'); } catch { invalid = true; }
    assert(invalid, 'categoria com caminho inseguro é recusada');
  } finally { process.chdir(original); fs.rmSync(tmp, { recursive: true, force: true }); }
  return { passed, failed };
}
