import { NextRequest, NextResponse } from 'next/server';
import { isWeaponCategory } from '@/lib/data-engine/weapon-lab';
import { getWeaponIndex, getWeaponDetails } from '@/lib/data-engine/weapon-lab-reader';

export const runtime = 'nodejs';
export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get('category');
  const slug = request.nextUrl.searchParams.get('weapon');
  if (!isWeaponCategory(category) || (slug !== null && !/^[a-z0-9_]{1,160}$/.test(slug))) return NextResponse.json({ error: 'Selecione uma categoria e uma arma válidas.' }, { status: 400 });
  try {
    return NextResponse.json(slug === null ? getWeaponIndex(category) : getWeaponDetails(category, slug));
  } catch (error) {
    const notFound = error instanceof Error && error.message.startsWith('Arma não encontrada');
    return NextResponse.json({ error: notFound ? 'Arma não encontrada nesta categoria.' : 'Os dados desta categoria estão indisponíveis nesta cópia.' }, { status: notFound ? 404 : 503 });
  }
}
