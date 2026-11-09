import { NextRequest, NextResponse } from 'next/server';
import { loadoutsForWarframe } from '@/lib/data-engine/curated-loadouts';
import { resolveLoadout, compareCuratedWarframe } from '@/lib/data-engine/loadout-reader';

import { buildShoppingList } from '@/lib/build-shopping-list';
import { getTradeCatalog } from '@/lib/trade-catalog';

export const runtime = 'nodejs';
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('warframe') ?? '';
  if (!/^[a-z0-9_]{1,96}$/.test(slug)) return NextResponse.json({ error: 'Selecione um Warframe válido.' }, { status: 400 });
  try {
    const presets = loadoutsForWarframe(slug).map(preset => {
      const resolved = resolveLoadout(preset);
      return { preset: resolved, comparison: compareCuratedWarframe(resolved), shoppingList: buildShoppingList(resolved, getTradeCatalog()) };
    });
    return NextResponse.json({ warframe: slug, presets });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Preset indisponível.' }, { status: 503 });
  }
}
