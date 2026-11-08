import { NextResponse } from 'next/server';
import { readGenerated } from '@/lib/data-engine/generated-reader';
import { hasAbilityEffect, type LevelStat } from '@/lib/data-engine/mod-effects';

export const runtime = 'nodejs';

interface Row { slug: string; name: string; imageName: string | null; stats: { polarity?: string; rarity?: string; baseDrain?: number; fusionLimit?: number; compatName?: string; levelStats?: LevelStat[] } }

// Mods de Warframe (compatibilidade geral) com efeito de habilidade lido no nível máximo.
export async function GET() {
  try {
    const file = readGenerated<Row>('mods');
    const items = file.items
      .filter(item => item.stats.compatName?.toUpperCase() === 'WARFRAME' && Number.isInteger(item.stats.fusionLimit) && hasAbilityEffect(item.stats.levelStats, item.stats.fusionLimit as number))
      .map(item => ({ slug: item.slug, name: item.name, imageName: item.imageName, rarity: item.stats.rarity, polarity: item.stats.polarity, baseDrain: item.stats.baseDrain, fusionLimit: item.stats.fusionLimit as number, levelStats: item.stats.levelStats as LevelStat[] }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return NextResponse.json({ fetchedAt: file.meta.fetchedAt, items });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Base indisponível.' }, { status: 503 });
  }
}
