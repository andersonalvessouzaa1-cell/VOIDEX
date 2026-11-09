import { readGenerated } from './generated-reader';
interface ExilusRow { uniqueName: string | null; stats: { isExilus?: boolean } }
export function getExilusUniqueNames(): Set<string> {
  return new Set(readGenerated<ExilusRow>('exilus').items
    .filter((item): item is ExilusRow & { uniqueName: string } => typeof item.uniqueName === 'string' && item.uniqueName.length > 0 && item.stats.isExilus === true)
    .map(item => item.uniqueName));
}
