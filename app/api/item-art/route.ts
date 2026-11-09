import { NextRequest, NextResponse } from 'next/server';
import { artQueryCandidates, validArtName, validCdnImageName } from '@/lib/live-market-data';

export const runtime = 'nodejs';

const HEADERS = { 'User-Agent': 'VOIDEX/0.1 (local read-only market analysis)' };
const found = new Map<string, { imageName: string | null; expiresAt: number }>();
const pending = new Map<string, Promise<string | null>>();

async function findImageName(name: string): Promise<string | null> {
  for (const query of artQueryCandidates(name)) {
    const response = await fetch(`https://api.warframestat.us/items/search/${encodeURIComponent(query)}?language=en`, { headers: { ...HEADERS, Accept: 'application/json' }, signal: AbortSignal.timeout(10000) });
    if (!response.ok) continue;
    const list = (await response.json().catch(() => null)) as { name?: unknown; imageName?: unknown }[] | null;
    if (!Array.isArray(list)) continue;
    const exact = list.find(item => typeof item.name === 'string' && item.name.toLowerCase() === query.toLowerCase() && validCdnImageName(item.imageName));
    if (exact) return exact.imageName as string;
  }
  return null;
}

// Arte do item pela base warframestat.us (a fonte do Warframe Market bloqueia pedidos de servidor).
export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name');
  if (!validArtName(name)) return NextResponse.json({ error: 'Nome inválido.' }, { status: 400 });
  try {
    const key = name.toLowerCase();
    let entry = found.get(key);
    if (!entry || entry.expiresAt < Date.now()) {
      let task = pending.get(key);
      if (!task) { task = findImageName(name).finally(() => pending.delete(key)); pending.set(key, task); }
      const imageName = await task;
      entry = { imageName, expiresAt: Date.now() + (imageName ? 86400000 : 3600000) };
      found.set(key, entry);
    }
    if (!entry.imageName) return NextResponse.json({ error: 'Sem imagem para este item.' }, { status: 404 });
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
