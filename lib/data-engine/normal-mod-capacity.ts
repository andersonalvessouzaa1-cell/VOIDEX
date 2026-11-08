interface CapacityMod { slug: string; baseDrain: number; rank: number; polarity?: string }
/** Somente mods comuns e orçamento simulado de nível 30; sem auras/posturas. */
export function summarizeNormalModCapacity(mods: CapacityMod[], capacity: number, matchingSlots: Record<string, boolean>) {
  if (capacity !== 30 && capacity !== 60) throw new Error('Capacidade inválida para esta simulação de nível 30.');
  const seen = new Set<string>();
  const rows = mods.map(mod => {
    const raw = mod.baseDrain + mod.rank;
    const matching = matchingSlots[mod.slug] === true;
    if (seen.has(mod.slug) || !Number.isSafeInteger(mod.baseDrain) || mod.baseDrain < 0 || !Number.isSafeInteger(mod.rank) || mod.rank < 0 || !Number.isSafeInteger(raw) || (matching && !mod.polarity)) throw new Error('Mod, custo ou polaridade inválidos.');
    seen.add(mod.slug);
    return { slug: mod.slug, cost: matching ? Math.ceil(raw / 2) : raw };
  });
  const used = rows.reduce((total, row) => total + row.cost, 0);
  if (!Number.isSafeInteger(used)) throw new Error('Consumo fora do limite numérico.');
  return { rows, used, capacity, remaining: capacity - used };
}
