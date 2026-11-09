import { NextRequest, NextResponse } from 'next/server';
import { validWarframeName, validCdnImageName } from '@/lib/live-market-data';

export const runtime = 'nodejs';

const HEADERS = { 'User-Agent': 'VOIDEX/0.1 (local read-only market analysis)' };
const names = new Map<string, { imageName: string; expiresAt: number }>();

// Descobre o arquivo de imagem do Warframe na base warframestat.us e entrega a imagem pelo próprio site.
export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name');
  if (!validWarframeName(name)) return NextResponse.json({ error: 'Nome de Warframe inválido.' }, { status: 400 });
  try {
    const key = name.toLowerCase();
    let entry = names.get(key);
    if (!entry || entry.expiresAt < Date.now()) {
      const info = await fetch(`https://api.warframestat.us/warframes/${encodeURIComponent(name)}?language=en`, { headers: { ...HEADERS, Accept: 'application/json' }, signal: AbortSignal.timeout(10000) });
      const body = (await info.json().catch(() => null)) as { imageName?: unknown } | null;
      if (!info.ok || !body || !validCdnImageName(body.imageName)) return NextResponse.json({ error: 'A base de dados não informou a imagem deste Warframe.', status: info.status }, { status: 502 });
      entry = { imageName: body.imageName, expiresAt: Date.now() + 86400000 };
      names.set(key, entry);
    }
    const upstream = await fetch(`https://cdn.warframestat.us/img/${entry.imageName}`, { headers: { ...HEADERS, Accept: 'image/*' }, signal: AbortSignal.timeout(10000) });
    const type = upstream.headers.get('content-type') ?? '';
    if (!upstream.ok || !type.startsWith('image/')) return NextResponse.json({ error: 'A CDN não entregou a imagem.', status: upstream.status }, { status: 502 });
    const bytes = await upstream.arrayBuffer();
    if (bytes.byteLength > 2_000_000) return NextResponse.json({ error: 'Imagem grande demais.' }, { status: 502 });
    return new NextResponse(bytes, { headers: { 'Content-Type': type, 'Cache-Control': 'public, max-age=86400' } });
  } catch {
    return NextResponse.json({ error: 'Imagem indisponível.' }, { status: 502 });
  }
}
