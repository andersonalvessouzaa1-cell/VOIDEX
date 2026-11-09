/** Testes da normalização de dados (scripts/sync-normalize.cjs) com exemplos simulados. */
declare const require: (id: string) => any;
declare const process: { cwd(): string };

export function runSyncNormalizeTests() {
  const n = require(process.cwd().replace(/\\/g, '/') + '/scripts/sync-normalize.cjs');
  let passed = 0, failed = 0;
  const assert = (ok: boolean, name: string) => { if (ok) { passed++; console.log('  ✅ [PASS] ' + name); } else { failed++; console.error('  ❌ [FAIL] ' + name); } };
  console.log('🧪 sync-normalize');
  assert(n.slugify('Nova Prime') === 'nova_prime' && n.slugify('Gauss Prime: Neurovisor') === 'gauss_prime_neurovisor' && n.slugify('Ação Épica!') === 'acao_epica', 'slugify remove acentos e símbolos');
  const dante = n.normalizeWarframe({ name: 'Dante', uniqueName: '/Lotus/Powersuits/Dante/Dante', health: 130, shield: 80, armor: 145, power: 180, imageName: 'dante-ee41f5e9cc.png', abilities: [{ name: 'Noctua', description: 'Tomo' }], campoDesconhecido: 'x' });
  assert(dante.slug === 'dante' && dante.stats.health === 130 && dante.stats.armor === 145 && dante.stats.abilities.length === 1, 'Warframe: copia os campos conhecidos');
  assert(!('campoDesconhecido' in dante.stats) && !('campoDesconhecido' in dante), 'campos desconhecidos não são copiados');
  assert(dante.imageUrl === 'https://cdn.warframestat.us/img/dante-ee41f5e9cc.png', 'monta o endereço da imagem');
  const semDados = n.normalizeWarframe({ name: 'Sem Dados' });
  assert(Object.keys(semDados.stats).length === 0 && semDados.imageUrl === null && semDados.tradable === null, 'campo ausente continua ausente (nada estimado)');
  assert(n.normalizeWarframe({ name: 'X', imageName: '../x.png' }).imageName === null, 'nome de imagem inseguro é descartado');
  const mod = n.normalizeMod({ name: 'Stretch', polarity: 'madurai', rarity: 'Common', baseDrain: 2, fusionLimit: 5, levelStats: [{ stats: ['+5% Ability Range'] }] });
  assert(mod.category === 'mods' && mod.stats.fusionLimit === 5 && mod.stats.levelStats.length === 1, 'Mod: guarda polaridade, dreno e efeitos por nível');
  assert(n.isArchonShard({ name: 'Crimson Archon Shard' }) && !n.isArchonShard({ name: 'Ayatan Star' }) && !n.isArchonShard(null), 'identifica fragmentos de Archon');
  assert(n.normalizeMod({ name: 'Exilus fixture', isExilus: true }).stats.isExilus === true, 'preserva indicador Exilus atual');
  assert(n.normalizeMod({ name: 'Utility fixture', isUtility: true }).stats.isExilus === undefined, 'não presume Exilus pelo indicador antigo');
  const dup = n.uniqueSlugs([n.normalizeMod({ name: 'Rage', uniqueName: '/Lotus/A/Rage' }), n.normalizeMod({ name: 'Rage', uniqueName: '/Lotus/B/RageB' })]);
  assert(dup[0].slug !== dup[1].slug, 'slug duplicado ganha sufixo');
  const st = n.categoryStats([dante, semDados]);
  assert(st.total === 2 && st.withImage === 1 && st.presence.health === 1 && st.withoutImageExamples[0] === 'Sem Dados', 'estatística de cobertura');
  const md = n.coverageMarkdown({ generatedAt: 'agora', source: { repo: 'r', baseUsed: 'b' }, failures: [] }, { warframes: st });
  assert(md.includes('| warframes | 2 | 1 | 1 |') && md.includes('sem dado'), 'relatório de cobertura em Markdown');
  return { passed, failed };
}
