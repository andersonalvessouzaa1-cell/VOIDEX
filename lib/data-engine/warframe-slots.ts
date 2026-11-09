interface WarframeSlotMod { slug: string; isExilus?: boolean; slot: 'normal' | 'exilus' }
/** Validação parcial: oito vagas comuns e uma Exilus; não certifica a build completa. */
export function validateWarframeSlots(mods: WarframeSlotMod[], hasAdapter: boolean) {
  let normalUsed = 0, exilusUsed = 0;
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const mod of mods) {
    if (seen.has(mod.slug)) errors.push('Mod repetido em mais de uma vaga.');
    seen.add(mod.slug);
    if (mod.slot === 'normal') normalUsed++;
    else if (mod.slot === 'exilus') {
      exilusUsed++;
      if (mod.isExilus !== true) errors.push('Mod sem elegibilidade Exilus confirmada na base.');
    } else errors.push('Vaga inválida.');
  }
  if (normalUsed > 8) errors.push('Mais de oito mods em vagas comuns.');
  if (exilusUsed > 1) errors.push('Apenas um mod pode ocupar a vaga Exilus.');
  if (exilusUsed > 0 && !hasAdapter) errors.push('A vaga Exilus exige o adaptador instalado na simulação.');
  return { normalUsed, exilusUsed, errors };
}
