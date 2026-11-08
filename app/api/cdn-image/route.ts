import { NextRequest, NextResponse } from 'next/server';
import { validCdnImageName } from '@/lib/live-market-data';

export const runtime = 'nodejs';

// Entrega pelo próprio site a imagem da base warframestat.us a partir do nome do arquivo (campo imageName dos dados sincronizados).
export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name');
  if (!validCdnImageName(name)) return NextResponse.json({ error: 'Nome de imagem inválido.' }, { status: 400 });
  try {
    const upstream = await fetch(`https://cdn.warframestat.us/img/${name}`, { headers: { 'User-Agent': 'VOIDEX/0.1 (local read-only market analysis)', Accept: 'image/*' }, signal: AbortSignal.timeout(10000) });
    const type = upstream.headers.get('content-type') ?? '';
    if (!upstream.ok || !type.startsWith('image/')) return NextResponse.json({ error: 'A CDN não entregou a imagem.', status: upstream.status }, { status: 502 });
    const bytes = await upstream.arrayBuffer();
    if (bytes.byteLength > 2_000_000) return NextResponse.json({ error: 'Imagem grande demais.' }, { status: 502 });
    return new NextResponse(bytes, { headers: { 'Content-Type': type, 'Cache-Control': 'public, max-age=604800, immutable' } });
  } catch {
    return NextResponse.json({ error: 'Imagem indisponível.' }, { status: 502 });
  }
}
