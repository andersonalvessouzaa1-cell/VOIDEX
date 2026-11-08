'use client';
import { useEffect, useState } from 'react';
import ItemImage from './ItemImage';
import CompanionStatComparison from './CompanionStatComparison';
import { resolveCompanionDraft, type CompanionLabData, type CompanionModPick } from '@/lib/data-engine/companion-lab';
const art = (name: string | null) => name ? `/api/cdn-image?name=${encodeURIComponent(name)}` : undefined;
export default function CompanionFreeLab() {
  const [data, setData] = useState<CompanionLabData | null>(null);
  const [slug, setSlug] = useState('diriga');
  const [picks, setPicks] = useState<CompanionModPick[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/game-data/companion-lab', { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error();
      const result: CompanionLabData = await response.json();
      if (!Array.isArray(result.items) || !Array.isArray(result.mods)) throw new Error();
      setData(result);
    }).catch(() => { if (!controller.signal.aborted) setError('Não foi possível carregar os companheiros. Recarregue a página para tentar novamente.'); });
    return () => controller.abort();
  }, []);
  if (error) return <p role="alert" className="text-rose-300">{error}</p>;
  if (!data) return <p role="status">Carregando companheiros…</p>;
  const item = data.items.find(entry => entry.slug === slug);
  const comparison = item ? resolveCompanionDraft(item, data.mods, picks) : null;
  return <div>
    <h3 className="font-display text-3xl text-white">Teste livre de companheiros</h3>
    <p className="mt-2 text-sm text-slate-400">Compare três mods estáticos revisados por nível. Capacidade, polaridades, preceitos, arcanos e sinergias não são simulados. Este teste não recomenda uma build completa.</p>
    <label htmlFor="companion-lab-choice" className="mt-5 block text-sm">Companheiro</label>
    <select id="companion-lab-choice" value={slug} onChange={event => { setSlug(event.target.value); setPicks([]); }} className="mt-2 w-full border border-void-border bg-void-950 p-3 text-slate-100">{data.items.map(entry => <option key={entry.slug} value={entry.slug}>{entry.name}{entry.category === 'unsupported' ? ' — cálculo pendente' : ''}</option>)}</select>
    {item && <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-2">
      <div><div className="mb-5 flex items-center gap-4"><ItemImage src={art(item.imageName)} alt="" size={96} /><h4 className="font-display text-3xl">{item.name}</h4></div>
        {item.category === 'unsupported' ? <p role="status" className="text-sm text-amber-100">Este tipo depende de regras ou peças ainda não revisadas. Nenhum resultado foi estimado.</p> : <fieldset className="space-y-4"><legend className="mb-3 text-sm">Mods disponíveis para este teste</legend>{data.mods.map(mod => {
          const pick = picks.find(entry => entry.slug === mod.slug);
          return <div key={mod.slug} className="flex flex-wrap items-center gap-3 border-b border-void-border pb-4"><ItemImage src={art(mod.imageName)} alt="" size={64} /><div className="min-w-0 flex-1"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(pick)} onChange={event => setPicks(current => event.target.checked ? [...current, { slug: mod.slug, rank: mod.maxRank }] : current.filter(entry => entry.slug !== mod.slug))} />{mod.name}</label>{pick && <><label htmlFor={`companion-rank-${mod.slug}`} className="mt-2 block text-xs">Nível</label><select id={`companion-rank-${mod.slug}`} value={pick.rank} onChange={event => { const rank = Number(event.target.value); setPicks(current => current.map(entry => entry.slug === mod.slug ? { ...entry, rank } : entry)); }} className="mt-1 w-full border border-void-border bg-void-950 p-2">{Array.from({ length: mod.maxRank + 1 }, (_, rank) => <option key={rank} value={rank}>{rank}{rank === mod.maxRank ? ' (máximo)' : ''}</option>)}</select><p className="mt-2 text-xs text-slate-400">{mod.levelStats[pick.rank]?.stats.join(' · ')}</p></>}</div></div>;
        })}<button type="button" onClick={() => setPicks([])} className="border border-void-border px-4 py-2 text-sm text-energy-cyan">Limpar mods</button></fieldset>}
      </div>
      {comparison && <div className="min-w-0"><CompanionStatComparison name={item.name} comparison={comparison} /></div>}
    </div>}
  </div>;
}
