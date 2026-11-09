/** Testes de lib/live-market-data.ts: catálogo com imagem e URL segura de imagem. */
import { parseMarketCatalog, marketImageUrl, marketImageProxyUrl, validWarframeName, validCdnImageName, artQueryCandidates, validArtName } from '../lib/live-market-data';

export function runLiveMarketDataTests() {
  let passed = 0, failed = 0;
  const assert = (ok: boolean, name: string) => { if (ok) { passed++; console.log('  ✅ [PASS] ' + name); } else { failed++; console.error('  ❌ [FAIL] ' + name); } };
  console.log('🧪 live-market-data');
  const catalog = parseMarketCatalog([
    { id: 'a', slug: 'nova_prime_set', tradable: true, ducats: 100, i18n: { en: { name: 'Nova Prime Set', thumb: 'items/images/en/thumbs/nova_prime_set.png' }, pt: { name: 'Nova Prime: Conjunto' } } },
    { id: 'b', slug: 'sem_imagem', i18n: { en: { name: 'Sem Imagem' } } },
    { id: 'c', slug: 'fora', tradable: false, i18n: { en: { name: 'Fora' } } },
    { id: 'd', slug: 'so_icon', i18n: { en: { name: 'So Icon', icon: 'items/images/en/so_icon.webp' } } },
  ]);
  assert(catalog.length === 3, 'itens não negociáveis são removidos');
  assert(catalog[0].thumb === 'items/images/en/thumbs/nova_prime_set.png' && catalog[0].name === 'Nova Prime: Conjunto', 'usa thumb e nome em português');
  assert(catalog[1].thumb === null, 'item sem imagem fica com thumb nulo');
  assert(catalog[2].thumb === 'items/images/en/so_icon.webp', 'sem thumb, usa o icon');
  assert(marketImageUrl('items/images/en/a.png') === 'https://warframe.market/static/assets/items/images/en/a.png', 'monta a URL no domínio fixo');
  assert(marketImageUrl('../a.png') === null && marketImageUrl('items/../a.png') === null, 'rejeita caminho com ..');
  assert(marketImageUrl('https://evil.com/a.png') === null && marketImageUrl('/a.png') === null, 'rejeita URL externa e caminho absoluto');
  assert(marketImageUrl('items/a.svg') === null && marketImageUrl(undefined) === null && marketImageUrl(42) === null, 'rejeita extensão inválida e tipos errados');
  assert(marketImageProxyUrl('items/a b.png') === '/api/market-image?path=items%2Fa%20b.png' || marketImageProxyUrl('items/a b.png') === null, 'proxy só monta URL para caminho válido');
  assert(marketImageProxyUrl('items/images/en/a.png') === '/api/market-image?path=items%2Fimages%2Fen%2Fa.png' && marketImageProxyUrl('../a.png') === null, 'proxy codifica o caminho e rejeita o inválido');
  assert(validWarframeName('Dante') && validWarframeName('Excalibur Umbra') && !validWarframeName('../x') && !validWarframeName('') && !validWarframeName(7), 'valida nome de Warframe');
  assert(validCdnImageName('dante-ee41f5e9cc.png') && !validCdnImageName('a/b.png') && !validCdnImageName('x..png') && !validCdnImageName('a.svg'), 'valida nome de arquivo de imagem da CDN');
  assert(JSON.stringify(artQueryCandidates('Glaive Prime Set')) === '["Glaive Prime Set","Glaive Prime"]', 'conjunto usa o item principal como reserva');
  assert(JSON.stringify(artQueryCandidates('Nova Prime Neuroptics Blueprint')) === '["Nova Prime Neuroptics Blueprint","Nova Prime"]', 'peça usa o item principal como reserva');
  assert(JSON.stringify(artQueryCandidates('Stretch')) === '["Stretch"]' && JSON.stringify(artQueryCandidates('Primed Continuity')) === '["Primed Continuity"]' && JSON.stringify(artQueryCandidates('Glaive Prime')) === '["Glaive Prime"]', 'mod e item principal não geram reserva');
  assert(validArtName('Archon Stretch') && validArtName("Kuva Nukor (Riven)") && !validArtName('../x') && !validArtName('') && !validArtName(3), 'valida nome de arte');
  return { passed, failed };
}
