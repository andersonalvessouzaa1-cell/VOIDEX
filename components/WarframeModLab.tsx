'use client';

import { useEffect, useMemo, useState } from 'react';
import { validateWarframeSlots } from '@/lib/data-engine/warframe-slots';
import { findWarframeModConflicts, WARFRAME_CONFLICT_FAMILIES } from '@/lib/data-engine/warframe-mod-conflicts';
import { summarizeWarframeCapacity, type AuraMod, type AuraSlot } from '@/lib/data-engine/aura-capacity';
import ItemImage from './ItemImage';
import { ABILITY_LABELS, abilityTotals, effectsAtRank, type AbilityKey, type LevelStat } from '@/lib/data-engine/mod-effects';

interface FrameRow { slug: string; name: string; imageName: string | null; health?: number; shield?: number; armor?: number; power?: number }
interface ModRow { isExilus?: boolean; slug: string; name: string; imageName: string | null; rarity?: string; polarity?: string; baseDrain?: number; fusionLimit: number; levelStats: LevelStat[] }

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
  const [selectionError, setSelectionError] = useState('');
  const [capacity, setCapacity] = useState(30);
  const [matchingSlots, setMatchingSlots] = useState<Record<string, boolean>>({});
  const [auras, setAuras] = useState<AuraMod[]>([]);
  const [auraSlug, setAuraSlug] = useState('');
  const [auraRank, setAuraRank] = useState(0);
  const [auraSlot, setAuraSlot] = useState<AuraSlot>('neutral');
  const [hasExilusAdapter, setHasExilusAdapter] = useState(false);
  const [exilusChoices, setExilusChoices] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let alive = true;
    Promise.all([fetch('/api/game-data/warframes').then(r => r.json()), fetch('/api/game-data/mods').then(r => r.json())])
      .then(([w, m]) => {
        if (!alive) return;
        if (w.error || m.error) { setError(w.error ?? m.error); return; }
        setFrames(w.items); setMods(m.items); setAuras(m.auras ?? []); setFetchedAt(w.fetchedAt);
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
  const slotLayout = validateWarframeSlots(chosen.map(({ mod }) => ({ slug: mod.slug, isExilus: mod.isExilus, slot: exilusChoices[mod.slug] === true ? 'exilus' : 'normal' })), hasExilusAdapter);
  const { totals } = abilityTotals(chosen.map(c => ({ levelStats: c.mod.levelStats, rank: c.rank })));
  const aura = auras.find(mod => mod.slug === auraSlug);
  let budget: ReturnType<typeof summarizeWarframeCapacity> | null = null;
  try { budget = summarizeWarframeCapacity(chosen.map(({ mod, rank }) => ({ slug: mod.slug, rank, baseDrain: mod.baseDrain ?? NaN, polarity: mod.polarity })), capacity, matchingSlots, aura ? { mod: aura, rank: auraRank, slot: auraSlot } : null); }
  catch { budget = null; }

  const toggle = (mod: ModRow) => {
    const next = { ...picks };
    if (mod.slug in next) delete next[mod.slug];
    else {
      next[mod.slug] = mod.fusionLimit;
      const conflict = findWarframeModConflicts(Object.keys(next))[0];
      if (conflict) {
        const names = conflict.members.map(slug => bySlug.get(slug)?.name ?? slug).join(' e ');
        setSelectionError(`Não adicionado: ${mod.name}. ${names} são variantes incompatíveis da família ${conflict.family}. Remova a variante atual antes de adicionar outra.`);
        return;
      }
    }
    setSelectionError(''); setPicks(next);
  };
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
            <h4 className="font-display font-bold text-2xl text-white">Mods escolhidos ({chosen.length})</h4>
            <p className="mt-2 text-sm">Vagas comuns: {slotLayout.normalUsed}/8 · Exilus: {slotLayout.exilusUsed}/1</p>
            <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={hasExilusAdapter} onChange={event => setHasExilusAdapter(event.target.checked)} />Adaptador Exilus instalado (simulação)</label>
            {slotLayout.errors.map((message, index) => <p key={`${index}-${message}`} role="alert" className="mt-2 text-sm text-amber-200">{message}</p>)}
            {selectionError && <p role="alert" className="mt-3 text-sm text-amber-100">{selectionError}</p>}
            {chosen.length === 0 && <p className="mt-2 text-sm text-slate-400">Nenhum mod escolhido. Clique em um mod da lista.</p>}
            <ul className="mt-3 space-y-3">
              {chosen.map(({ mod, rank }) => (
                <li key={mod.slug} className="flex flex-wrap items-start gap-3">
                  <ItemImage src={art(mod.imageName)} alt="" size={36} />
                  <div className="min-w-0 flex-1"><p className="truncate">{mod.name}</p><p className="text-xs text-slate-400">{effectsAtRank(mod.levelStats, rank)?.parsed.map(p => p.raw).join(' · ')}</p></div>
                  <label className="text-sm">Nível <select aria-label={`Nível de ${mod.name} no Warframe`} value={rank} onChange={e => setPicks(prev => ({ ...prev, [mod.slug]: Number(e.target.value) }))} className="bg-void-950 border border-void-border px-1 py-1">{Array.from({ length: mod.fusionLimit + 1 }, (_, i) => <option key={i} value={i}>{i}</option>)}</select></label>
                  <button type="button" onClick={() => toggle(mod)} aria-label={`Remover ${mod.name}`} className="px-2 py-1 border border-void-border hover:border-rose-400">×</button>
                  {mod.polarity && <label className="flex basis-full items-center gap-2 text-xs"><input type="checkbox" checked={matchingSlots[mod.slug] === true} onChange={event => { const checked = event.target.checked; setMatchingSlots(current => ({ ...current, [mod.slug]: checked })); }} />Vaga simulada igual para {mod.name} ({mod.polarity})</label>}
                  {mod.isExilus === true && <label className="flex basis-full items-center gap-2 text-xs"><input type="checkbox" checked={exilusChoices[mod.slug] === true} onChange={event => { const checked = event.target.checked; setExilusChoices(current => ({ ...current, [mod.slug]: checked })); }} />Usar vaga Exilus para {mod.name}</label>}
                  <p className="basis-full text-xs">Consumo: {budget?.rows.find(row => row.slug === mod.slug)?.cost ?? 'sem cálculo'} pontos</p>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => { setPicks({}); setSelectionError(''); setMatchingSlots({}); setExilusChoices({}); setAuraSlug(''); setAuraRank(0); setAuraSlot('neutral'); }} className="mt-4 border border-void-border px-3 py-2 text-sm">Limpar mods do Warframe</button>
            <section aria-label="Consumo parcial do Warframe" className="mt-5 border border-void-border p-4">
              <label htmlFor="warframe-aura" className="block text-sm">Aura revisada (somente capacidade)</label>
              <select id="warframe-aura" value={auraSlug} onChange={event => { const next = auras.find(mod => mod.slug === event.target.value); setAuraSlug(next?.slug ?? ''); setAuraRank(next?.maxRank ?? 0); setAuraSlot('neutral'); }} className={field}><option value="">Sem aura</option>{auras.map(mod => <option key={mod.slug} value={mod.slug}>{mod.name}</option>)}</select>
              {aura && <div className="my-4 space-y-3"><div className="flex items-center gap-3"><ItemImage src={art(aura.imageName)} alt="" size={64} /><p className="text-sm">{aura.name} · {aura.polarity}</p></div><label htmlFor="warframe-aura-rank" className="block text-sm">Nível da aura</label><select id="warframe-aura-rank" value={auraRank} onChange={event => setAuraRank(Number(event.target.value))} className={field}>{Array.from({ length: aura.maxRank + 1 }, (_, rank) => <option key={rank} value={rank}>{rank}</option>)}</select><label htmlFor="warframe-aura-slot" className="block text-sm">Polaridade simulada da vaga de aura</label><select id="warframe-aura-slot" value={auraSlot} onChange={event => setAuraSlot(event.target.value as AuraSlot)} className={field}><option value="neutral">Sem polaridade</option><option value="matching">Igual à aura</option><option value="different">Diferente da aura</option><option value="universal">Universal (Aura Forma)</option></select><p className="text-xs text-slate-400">Efeitos da aura sobre habilidades, dano, energia, inimigos ou aliados não são aplicados nesta tabela.</p></div>}
              <label htmlFor="warframe-capacity" className="block text-sm">Capacidade simulada do Warframe no nível 30</label>
              <select id="warframe-capacity" value={capacity} onChange={event => setCapacity(Number(event.target.value))} className={field}><option value={30}>30 — sem Reator Orokin</option><option value={60}>60 — com Reator Orokin</option></select>
              {budget ? <p role="status" className={`mt-3 text-sm ${budget.remaining < 0 ? 'text-rose-300' : 'text-energy-cyan'}`}>Consumo parcial: {budget.used}/{budget.capacity} pontos. Aura: +{budget.auraBonus}. {budget.remaining < 0 ? `Excede em ${-budget.remaining}.` : `Restam ${budget.remaining}.`}</p> : <p role="status" className="mt-3 text-sm text-amber-100">Há custos ou slots sem regra confirmada nesta seleção; consumo indisponível.</p>}
              <p className="mt-3 text-xs text-slate-400">Somente os mods selecionados, em vagas neutras ou simuladas iguais. A aura selecionada soma capacidade após o Reator. Universal simula Aura Forma, sem verificar seu uso no jogo. Não calcula polaridades diferentes dos mods comuns, outros slots especiais ou quantidade de Forma aplicada; não certifica vagas reais, todas as famílias incompatíveis ou encaixe completo.</p>
              <a href="https://support.warframe.com/hc/en-us/articles/200500194-Mod-Guide-Use-Fusion-Transmutation-Sale" target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-energy-cyan underline">Regra oficial de custo e polaridade</a>
              <a href="https://www.warframe.com/en/news/przewodnik-po-modach" target="_blank" rel="noreferrer" className="mt-2 block text-xs text-energy-cyan underline">Regra oficial do bônus de aura</a>
            </section>
            <p className="mt-3 text-xs text-slate-400">Validação parcial das vagas: Exilus usa a mesma capacidade dos mods comuns; o adaptador não adiciona pontos. Somente mods identificados como Exilus na base sincronizada podem usar essa vaga. Outras famílias incompatíveis e vagas reais continuam sem certificação.</p>
            <a href="https://github.com/WFCD/warframe-items" target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-energy-cyan underline">Fonte da elegibilidade Exilus: WFCD</a>
            <details className="mt-3 text-xs text-slate-400"><summary className="cursor-pointer">Incompatibilidades revisadas e fontes</summary><p className="mt-2">Intensify, Continuity e Stretch: variantes da mesma família não podem ser combinadas. Outras famílias continuam em revisão. Fontes comunitárias consultadas em 08/11/2026.</p>{WARFRAME_CONFLICT_FAMILIES.map(family => <a key={family.name} href={family.source} target="_blank" rel="noreferrer" className="mt-2 block text-energy-cyan underline">Família {family.name}</a>)}</details>
            <table className="w-full mt-5 text-sm tabular-nums">
              <caption className="sr-only">Atributos de habilidade antes e depois dos mods</caption>
              <thead><tr className="text-left text-slate-400"><th scope="col" className="py-2">Atributo</th><th scope="col">Antes</th><th scope="col">Depois</th><th scope="col">Variação</th></tr></thead>
              <tbody>{KEYS.map(k => { const diff = totals[k] - 100; return <tr key={k} className="border-t border-void-border"><th scope="row" className="py-2 text-left font-normal">{ABILITY_LABELS[k]}</th><td>100%</td><td className="font-bold">{fmt(totals[k])}%</td><td className={diff > 0 ? 'text-energy-cyan' : diff < 0 ? 'text-rose-300' : ''}>{diff > 0 ? '+' : ''}{fmt(diff)} pp</td></tr>; })}</tbody>
            </table>
            <p className="mt-4 text-xs text-slate-400">Soma aditiva sobre a base de 100%. Ainda não aplicados: limites do jogo (por exemplo, da eficiência), arcanos e fragmentos. O consumo parcial aparece separadamente e não comprova o encaixe da build. Não é simulador de combate.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
