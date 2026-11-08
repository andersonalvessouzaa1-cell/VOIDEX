// Runner de testes do VOIDEX: compila lib/ e tests/ com o TypeScript do projeto e executa tests/*.test.ts.
// Cada teste exporta funcoes run*() que devolvem { passed, failed }. Falha se houver teste falhando ou nenhum teste.
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const out = path.join(root, '.test-build');
const opts = { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } };

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.ts$/.test(entry.name) && !/\.d\.ts$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

fs.rmSync(out, { recursive: true, force: true });
for (const file of [...walk(path.join(root, 'lib')), ...walk(path.join(root, 'tests'))]) {
  const target = path.join(out, path.relative(root, file)).replace(/\.ts$/, '.js');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, ts.transpileModule(fs.readFileSync(file, 'utf8'), opts).outputText);
}

const suites = walk(path.join(root, 'tests')).filter(f => /\.test\.ts$/.test(f));
if (!suites.length) { console.error('Nenhum arquivo tests/*.test.ts encontrado.'); process.exit(1); }

(async () => {
let passed = 0, failed = 0;
for (const suite of suites) {
  const compiled = path.join(out, path.relative(root, suite)).replace(/\.ts$/, '.js');
  const mod = require(compiled);
  for (const [name, fn] of Object.entries(mod)) {
    if (!/^run/.test(name) || typeof fn !== 'function') continue;
    try {
      const result = (await fn()) || {};
      passed += result.passed || 0;
      failed += result.failed || 0;
    } catch (error) {
      failed += 1;
      console.error(`FALHA em ${path.basename(suite)}:${name}:`, error);
    }
  }
}
fs.rmSync(out, { recursive: true, force: true });
console.log(`\nTotal: ${passed} passaram, ${failed} falharam.`);
process.exit(failed ? 1 : 0);
})();
