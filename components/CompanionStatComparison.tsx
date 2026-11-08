import type { CompanionComparison, CompanionMetric } from '@/lib/data-engine/companion-stat-comparison';
const LABELS: Record<CompanionMetric, string> = { health: 'Vida', shields: 'Escudos', armor: 'Armadura' };
const fmt = (v: number | null) => v === null ? 'sem cálculo' : v.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
export default function CompanionStatComparison({ name, comparison }: { name: string; comparison: CompanionComparison }) {
  return <section className="mt-5 border-y border-void-border py-4" aria-label={`Comparação parcial de ${name}`}>
    <h4 className="font-display text-2xl text-white">Antes e depois: companheiro</h4>
    <p className="mt-2 text-xs text-slate-400">Atributos estáticos, sem efeitos condicionais ou sinergias. Unidade: pontos. Os números não representam desempenho testado em combate.</p>
    <div className="mt-3 overflow-x-auto"><table className="w-full text-sm tabular-nums"><caption className="sr-only">Vida, escudos e armadura de {name}</caption><thead><tr className="text-left text-slate-400"><th scope="col" className="py-2 pr-2">Atributo</th><th scope="col">Antes</th><th scope="col">Depois</th><th scope="col">Diferença</th></tr></thead><tbody>{(Object.keys(LABELS) as CompanionMetric[]).map(key => {
      const row = comparison.rows[key]; const delta = row.before === null || row.after === null ? null : row.after - row.before;
      return <tr key={key} className="border-t border-void-border"><th scope="row" className="py-3 pr-2 text-left font-normal">{LABELS[key]}</th><td>{row.before === null ? 'sem dado' : fmt(row.before)}</td><td className="font-bold text-white">{fmt(row.after)}</td><td>{delta === null ? '—' : `${delta > 0 ? '+' : ''}${fmt(delta)}`}</td></tr>;
    })}</tbody></table></div>
    <details className="mt-3 text-xs text-slate-400"><summary className="cursor-pointer">Cobertura e fontes do companheiro</summary><ul className="mt-3 list-disc space-y-2 pl-4">{comparison.limitations.map(note => <li key={note}>{note}</li>)}</ul>{comparison.excludedMods.length > 0 && <p className="mt-3">Fora da conta estática ou sem regra revisada: {comparison.excludedMods.join(', ')}.</p>}<div className="mt-3 space-y-2">{comparison.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="block text-energy-cyan underline">{source.name}</a>)}</div></details>
  </section>;
}
