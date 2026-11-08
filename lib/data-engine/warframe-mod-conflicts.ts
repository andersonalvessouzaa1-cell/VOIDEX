interface ConflictFamily { name: string; members: readonly string[]; source: string }
/** Lista explícita revisada; não agrupar mods só porque alteram o mesmo atributo. */
export const WARFRAME_CONFLICT_FAMILIES: readonly ConflictFamily[] = [
  { name: 'Intensify', members: ['intensify', 'intensify_avatarabilitystrengthmodbeginner', 'intensify_avatarabilitystrengthmodexpert', 'umbral_intensify', 'archon_intensify', 'precision_intensify'], source: 'https://wiki.warframe.com/w/Archon_Intensify' },
  { name: 'Continuity', members: ['continuity', 'continuity_avatarabilitydurationmodbeginner', 'primed_continuity', 'archon_continuity'], source: 'https://wiki.warframe.com/w/Archon_Continuity' },
  { name: 'Stretch', members: ['stretch', 'stretch_avatarabilityrangemodbeginner', 'stretch_avatarabilityrangemodexpert', 'archon_stretch'], source: 'https://wiki.warframe.com/w/Module%3AMods/data' },
];
export const WARFRAME_CONFLICTS_RETRIEVED_AT = '2026-11-08';
export function findWarframeModConflicts(slugs: readonly string[]) {
  const selected = new Set(slugs);
  return WARFRAME_CONFLICT_FAMILIES.flatMap(family => {
    const members = family.members.filter(slug => selected.has(slug));
    return members.length > 1 ? [{ family: family.name, members, source: family.source }] : [];
  });
}
