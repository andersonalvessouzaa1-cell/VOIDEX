import { NextRequest, NextResponse } from 'next/server';
import { getTradeCatalog } from '@/lib/trade-catalog';
export const runtime = 'nodejs';
export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get('q') ?? '').trim().toLowerCase();
  if (q.length < 2 || q.length > 80) return NextResponse.json({ items: [] });
  return NextResponse.json({ items: getTradeCatalog().filter(item => item.name.toLowerCase().includes(q)).slice(0, 20) }, { headers: { 'Cache-Control': 'public, max-age=60' } });
}
