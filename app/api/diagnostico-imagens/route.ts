import { NextResponse } from 'next/server';
import { readMarket } from '@/lib/market-api';
import { parseMarketCatalog, marketImageUrl } from '@/lib/live-market-data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BROWSER = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
  Referer: 'https://warframe.market/',
};

// Só para desenvolvimento: mostra um exemplo real de caminho de imagem e o que a fonte responde ao servidor.
export async function GET() {
  if (process.env.NODE_ENV === 'production') return NextResponse.json({ error: 'Indisponível em produção.' }, { status: 404 });
  try {
    const catalog = parseMarketCatalog((await readMarket('items')).data);
    const sample = catalog.find(item => item.slug === 'nova_prime_set') ?? catalog[0];
    const url = marketImageUrl(sample?.thumb);
    const tentativas: unknown[] = [];
    if (url) {
      for (const [nome, headers] of [['UA do VOIDEX', { 'User-Agent': 'VOIDEX/0.1' }], ['UA de navegador', BROWSER]] as const) {
        try {
          const r = await fetch(url, { headers, signal: AbortSignal.timeout(10000) });
          const type = r.headers.get('content-type');
          tentativas.push({ tentativa: nome, status: r.status, contentType: type, cfMitigated: r.headers.get('cf-mitigated'), corpo: type?.startsWith('image/') ? '(imagem recebida)' : (await r.text()).slice(0, 200) });
        } catch (error) { tentativas.push({ tentativa: nome, erro: String(error) }); }
      }
    }
    return NextResponse.json({ itens: catalog.length, comImagem: catalog.filter(item => item.thumb).length, amostra: { slug: sample?.slug, thumb: sample?.thumb }, urlCompleta: url, tentativas }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Catálogo indisponível.' }, { status: 503 });
  }
}
