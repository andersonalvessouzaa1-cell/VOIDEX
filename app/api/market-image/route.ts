import { NextRequest, NextResponse } from 'next/server';
import { marketImageUrl } from '@/lib/live-market-data';

export const runtime = 'nodejs';

const BROWSER_HEADERS = { 'User-Agent': 'AcervoVoid/0.1 (+https://acervovoid.vercel.app)', Accept: 'image/*' };

// Reserva: entrega a imagem pelo próprio site quando o carregamento direto no navegador falha.
// A fonte pode bloquear pedidos de servidor (detecção de robô); nesse caso responde 502 e a tela mostra a marca.
export async function GET(request: NextRequest) {
  const url = marketImageUrl(request.nextUrl.searchParams.get('path'));
  if (!url) return NextResponse.json({ error: 'Caminho de imagem inválido.' }, { status: 400 });
  try {
    const upstream = await fetch(url, { headers: BROWSER_HEADERS, signal: AbortSignal.timeout(10000) });
    const type = upstream.headers.get('content-type') ?? '';
    if (!upstream.ok || !type.startsWith('image/')) return NextResponse.json({ error: 'A fonte não entregou a imagem.', status: upstream.status }, { status: 502 });
    const bytes = await upstream.arrayBuffer();
    if (bytes.byteLength > 1_000_000) return NextResponse.json({ error: 'Imagem grande demais.' }, { status: 502 });
    return new NextResponse(bytes, { headers: { 'Content-Type': type, 'Cache-Control': 'public, max-age=86400, immutable' } });
  } catch {
    return NextResponse.json({ error: 'Imagem indisponível.' }, { status: 502 });
  }
}
