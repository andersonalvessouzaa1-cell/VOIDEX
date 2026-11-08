'use client';

import { useEffect, useMemo, useState } from 'react';
import ItemImage from './ItemImage';
import { ABILITY_LABELS, abilityTotals, effectsAtRank, type AbilityKey, type LevelStat } from '@/lib/data-engine/mod-effects';

interface FrameRow { slug: string; name: string; imageName: string | null; health?: number; shield?: number; armor?: number; power?: number }
interface ModRow { slug: string; name: string; imageName: string | null; rarity?: string; polarity?: string; baseDrain?: number; fusionLimit: number; levelStats: LevelStat[] }

const art = (imageName: string | null) => (imageName ? `/api/cdn-image?name=${encodeURIComponent(imageName)}` : undefined);
const KEYS: AbilityKey[] = ['forca', 'duracao', 'eficiencia', 'alcance'];
const fmt = (n: number) => `${Math.round(n * 10) / 10}`;
const show = (n: number | undefined) => (n === undefined ? 'sem dado' : String(n));

export default function WarframeModLab() {
  const [frames, setFrames] = useState<FrameRow[]>([]);
  const [mods, setMods] = useState<ModRow[]>([]);
  const [fetchedAt, setFetchedAt] = useState('');
  const [error, setError] = useState('');
  const [frameSlug, setFrameSlug] = useState('dante');
  const [frameQuery, setFrameQuery] = useState('');
  const [modQuery, setModQuery] = useState('');
  const [picks, setPicks] = useState<Record<string, number>>({});

  useEffect(() => {
    let alive = true;
    Promise.all([fetch('/api/game-data/warframes').then(r => r.json()), fetch('/api/game-data/mods').then(r => r.json())])
      .then(([w, m]) => {
        if (!alive) return;
        if (w.error || m.error) { setError(w.error ?? m.error); return; }
        setFrames(w.items); setMods(m.items); setFetchedAt(w.fetchedAt);
        if (!w.items.some((f: FrameRow) => f.slug === 'dante') && w.items[0]) setFrameSlug(w.items[0].slug);
      })
      .catch(() => alive && setError('Não foi possível carregar a base de dados local.'));
    return () => { alive = false; };
  }, []);

  const frame = frames.find(f => f.slug === frameSlug);
  const bySlug = useMemo(() => new Map(mods.map(m => [m.slug, m])), [mods]);
  const frameMatches = frameQuery.trim() ? frames.filter(f => f.name.toLowerCase().includes(frameQuery.trim().toLowerCase())).slice(0, 8) : [];
  const modMatches = (modQuery.trim() ? mods.filter(m => m.name.toLowerCase().includes(modQuery.trim().toLowerCase())) : mods).slice(0, 10);
  const chosen = Object.entries(picks).map(([slug, rank]) => ({ mod: bySlug.get(slug), rank })).filter((c): c is { mod: ModRow; rank: number } => !!c.mod);
  const { totals } = abilityTotals(chosen.map(c => ({ levelStats: c.mod.levelStats, rank: c.rank })));
  const toggle = (mod: ModRow) => setPicks(prev => { const next = { ...prev }; if (mod.slug in next) delete next[mod.slug]; else next[mod.slug] = mod.fusionLimit; return next; });
  const field = 'w-full px-3 py-2.5 bg-void-950 border border-void-border text-slate-100 placeholder:text-slate-500';

  if (error) return <div role="alert" className="mb-12 border border-rose-400 p-5 text-rose-300">{error} Rode <code>node scripts/sync-game-data.mjs</code> na pasta do projeto e recarregue.</div>;
  return (
    <div className="mb-14">
      <h3 className="font-display font-bold text-3xl text-white">Calculadora de mods de habilidade: qualquer Warframe</h3>
      <p className="mt-1 text-sm text-slate-400 max-w-3xl">Escolha o Warframe e os mods. Os efeitos vêm da base sincronizada (WFCD/warframe-items{fetchedAt ? `, ${new Date(fetchedAt).toLocaleDateString('pt-BR')}` : ''}). Só mods com efeito de força, duração, eficiência ou alcance aparecem aqui.</p>

      <div className="mt-6 grid lg:grid-cols-[1fr_1fr] gap-8">
        <div className="min-w-0">
          <label htmlFor="lab-frame" className="block mb-2 font-medium text-white">Warframe</label>
          <div className="flex items-center gap-3">
            <ItemImage src={art(frame?.imageName ?? null)} alt="" size={64} />
            <div className="min-w-0"><p className="font-display text-3xl text-white break-words">{frame?.name ?? 'Carregando…'}</p>
              {frame && <p className="text-sm text-slate-400">Base na fonte: vida {show(frame.health)}, escudo {show(frame.shield)}, armadura {show(frame.armor)}, energia {show(frame.power)}. Nível desses valores não confirmado.</p>}</div>
          </div>
          <input id="lab-frame" value={frameQuery} onChange={e => setFrameQuery(e.target.value)} placeholder="Buscar outro Warframe (ex.: Nova, Saryn)" className={`${field} mt-3`} />
          {frameMatches.length > 0 && <ul className="mt-2 border border-void-border divide-y divide-void-border">
            {frameMatches.map(f => <li key={f.slug}><button type="button" onClick={() => { setFrameSlug(f.slug); setFrameQuery(''); }} className="w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-void-850"><ItemImage src={art(f.imageName)} alt="" size={36} />{f.name}</button></li>)}
          </ul>}

          <label htmlFor="lab-mod" className="block mt-8 mb-2 font-medium text-white">Adicionar mod</label>
          <input id="lab-mod" value={modQuery} onChange={e => setModQuery(e.target.value)} placeholder="Buscar mod (ex.: Stretch, Blind Rage)" className={field} />
          <ul className="mt-2 max-h-80 overflow-y-auto border border-void-border divide-y divide-void-border">
            {modMatches.map(m => {
              const fx = effectsAtRank(m.levelStats, m.fusionLimit)?.parsed.map(p => p.raw).join(' · ');
              return <li key={m.slug}><button type="button" aria-pressed={m.slug in picks} onClick={() => toggle(m)} className="w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-void-850 aria-pressed:bg-void-800 aria-pressed:text-energy-cyan">
                <ItemImage src={art(m.imageName)} alt="" size={40} />
                <span className="min-w-0"><span className="block">{m.name} <span className="text-xs text-slate-400">{m.rarity} · {m.polarity} · dreno base {show(m.baseDrain)}</span></span><span className="block text-xs text-slate-400">{fx}</span></span>
              </button></li>;
            })}
            {modMatches.length === 0 && <li className="px-3 py-2 text-sm text-amber-200" role="status">Nenhum mod encontrado.</li>}
          </ul>
        </div>

        <div className="chamfer self-start" style={{ '--chamfer': '20px' } as React.CSSProperties}>
          <div className="chamfer-in p-6 min-w-0" style={{ '--chamfer': '19px' } as React.CSSProperties}>
            <h4 className="font-display font-bold text-2xl text-white">Mods escolhidos ({chosen.length}/8 vagas comuns)</h4>
            {chosen.length > 8 && <p role="alert" className="mt-1 text-sm text-amber-200">O Warframe tem 8 vagas comuns de mod (fora aura e exilus). Conferir antes de usar esta combinação.</p>}
            {chosen.length === 0 && <p className="mt-2 text-sm text-slate-400">Nenhum mod escolhido. Clique em um mod da lista.</p>}
            <ul className="mt-3 space-y-3">
              {chosen.map(({ mod, rank }) => (
                <li key={mod.slug} className="flex items-center gap-3">
                  <ItemImage src={art(mod.imageName)} alt="" size={36} />
                  <div className="min-w-0 flex-1"><p className="truncate">{mod.name}</p><p className="text-xs text-slate-400">{effectsAtRank(mod.levelStats, rank)?.parsed.map(p => p.raw).join(' · ')}</p></div>
                  <label className="text-sm">Nível <select value={rank} onChange={e => setPicks(prev => ({ ...prev, [mod.slug]: Number(e.target.value) }))} className="bg-void-950 border border-void-border px-1 py-1">{Array.from({ length: mod.fusionLimit + 1 }, (_, i) => <option key={i} value={i}>{i}</option>)}</select></label>
                  <button type="button" onClick={() => toggle(mod)} aria-label={`Remover ${mod.name}`} className="px-2 py-1 border border-void-border hover:border-rose-400">×</button>
                </li>
              ))}
            </ul>
            <table className="w-full mt-5 text-sm tabular-nums">
              <caption className="sr-only">Atributos de habilidade antes e depois dos mods</caption>
              <thead><tr className="text-left text-slate-400"><th scope="col" className="py-2">Atributo</th><th scope="col">Antes</th><th scope="col">Depois</th><th scope="col">Variação</th></tr></thead>
              <tbody>{KEYS.map(k => { const diff = totals[k] - 100; return <tr key={k} className="border-t border-void-border"><th scope="row" className="py-2 text-left font-normal">{ABILITY_LABELS[k]}</th><td>100%</td><td className="font-bold">{fmt(totals[k])}%</td><td className={diff > 0 ? 'text-energy-cyan' : diff < 0 ? 'text-rose-300' : ''}>{diff > 0 ? '+' : ''}{fmt(diff)} pp</td></tr>; })}</tbody>
            </table>
            <p className="mt-4 text-xs text-slate-400">Soma aditiva sobre a base de 100%. Ainda não aplicados: limites do jogo (por exemplo, da eficiência), capacidade e polaridades, arcanos e fragmentos. Não é simulador de combate.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
