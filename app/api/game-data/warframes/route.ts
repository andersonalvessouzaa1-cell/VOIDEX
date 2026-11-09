import { NextResponse } from 'next/server';
import { readGenerated } from '@/lib/data-engine/generated-reader';

export const runtime = 'nodejs';

interface Row { slug: string; name: string; imageName: string | null; stats: { health?: number; shield?: number; armor?: number; power?: number } }

export async function GET() {
  try {
    const file = readGenerated<Row>('warframes');
    const items = file.items
      .map(item => ({ slug: item.slug, name: item.name, imageName: item.imageName, health: item.stats.health, shield: item.stats.shield, armor: item.stats.armor, power: item.stats.power }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return NextResponse.json({ fetchedAt: file.meta.fetchedAt, items });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Base indisponível.' }, { status: 503 });
  }
}
