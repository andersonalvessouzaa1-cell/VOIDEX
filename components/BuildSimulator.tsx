'use client';

import { useState, type CSSProperties } from 'react';
import ItemImage from './ItemImage';
import BuildPresets from './BuildPresets';
import WarframeModLab from './WarframeModLab';
import { calculateBuild, DANTE_BASE, DANTE_SOURCE, SIMULATOR_MODS, SOURCE_REVIEW_DATE, ModSelection, AbilityStat } from '@/lib/build-simulator';

const labels: Record<keyof typeof DANTE_BASE, string> = { health: 'Vida', shields: 'Escudos', armor: 'Armadura', energy: 'Energia', strength: 'Força', duration: 'Duração', efficiency: 'Eficiência', range: 'Alcance' };
const abilityStats = new Set(['strength', 'duration', 'efficiency', 'range']);
const storageKey = 'voidex_build_dante_v1';

export default function BuildSimulator() {
  const [mods, setMods] = useState<ModSelection[]>([]);
  const [baseline, setBaseline] = useState<ModSelection[]>([]);
  const [message, setMessage] = useState('');
  const result = calculateBuild(mods);
  const before = calculateBuild(baseline);
  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ frame: 'dante', schema: 1, mods }));
      setMessage('Build salva neste navegador.');
    } catch { setMessage('Não foi possível salvar: o navegador recusou o armazenamento.'); }
  }
  function restore() {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) { setMessage('Nenhuma build salva neste navegador.'); return; }
      const data = JSON.parse(raw);
      if (data?.schema !== 1 || data?.frame !== 'dante') throw new Error('Formato incompatível');
      const restored = calculateBuild(data.mods);
      setMods(restored.selections);
      setMessage('Build restaurada; cálculos refeitos com o catálogo disponível.');
    } catch { setMessage('A build salva é incompatível ou inválida. A seleção atual foi preservada.'); }
  }
  return (
    <section id="build-lab" aria-labelledby="build-lab-title" className="scroll-mt-24 py-20 md:py-28 border-y border-void-border bg-void-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="build-lab-title" className="font-display font-extrabold leading-none text-4xl sm:text-6xl text-white">Build Lab</h2>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">Compare alterações nos atributos do Dante, no nível 30, antes de investir recursos. Escolha os mods e seus níveis para ver ganhos e perdas.</p>
        <p role="note" className="my-6 pl-4 py-1 border-l-2 border-orokin-gold text-sm text-amber-100">
          Cobertura inicial: Dante e quatro mods. Cálculo baseado em fontes, sem teste no jogo registrado. Não é um simulador completo de combate. Compatibilidade com o patch atual ainda não certificada.
        </p>
        <WarframeModLab />
        <BuildPresets />
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8">
          <fieldset className="min-w-0 border-t border-void-border pt-4">
            <legend className="px-2 font-semibold text-white">Mods disponíveis ({mods.length}/8 selecionados)</legend>
            <div className="space-y-4">
              {SIMULATOR_MODS.map(mod => {
                const selected = mods.find(entry => entry.id === mod.id);
                return <div key={mod.id} className="border-b border-void-border pb-4 last:border-0">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <label className="flex items-center gap-2 text-white">
                      <input type="checkbox" className="w-4 h-4 accent-energy-cyan" checked={!!selected} onChange={event => { setMessage(''); setMods(event.target.checked ? [...mods, { id: mod.id, rank: mod.maxRank }] : mods.filter(entry => entry.id !== mod.id)); }} />
                      {mod.name}
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      Nível
                      <select aria-label={`Nível de ${mod.name}`} disabled={!selected} value={selected?.rank ?? mod.maxRank} onChange={event => setMods(mods.map(entry => entry.id === mod.id ? { ...entry, rank: Number(event.target.value) } : entry))} className="rounded-md bg-void-950 border border-void-border px-2 py-1.5 disabled:opacity-40">
                        {Array.from({ length: mod.maxRank + 1 }, (_, rank) => <option key={rank} value={rank}>{rank}</option>)}
                      </select>
                    </label>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">
                    {Object.entries(mod.perRank).map(([stat, value]) => `${labels[stat as AbilityStat]}: ${value > 0 ? '+' : ''}${value * ((selected?.rank ?? mod.maxRank) + 1)} pontos percentuais`).join(' · ')}
                  </p>
                  <a href={mod.source} target="_blank" rel="noreferrer" className="text-xs text-energy-cyan underline">Fonte dos efeitos: WFCD</a>
                </div>;
              })}
            </div>
          </fieldset>
          <div className="chamfer self-start" style={{ '--chamfer': '20px' } as CSSProperties}><div className="chamfer-in min-w-0 p-6" style={{ '--chamfer': '19px' } as CSSProperties}>
            <div className="flex items-center gap-4">
              <ItemImage src="/api/warframe-image?name=Dante" alt="" size={72} />
              <div>
                <h3 className="font-display font-bold text-3xl text-white">Antes e depois</h3>
            <p className="mt-1 text-sm text-slate-400">Antes: {baseline.length ? 'seleção fixada para comparação' : 'Dante sem mods'}. Depois: seleção atual.</p>
              </div>
            </div>
            <table className="w-full mt-4 text-sm tabular-nums">
              <caption className="sr-only">Comparação dos atributos do Dante</caption>
              <thead><tr className="text-slate-400"><th scope="col" className="text-left py-2">Atributo</th><th scope="col">Antes</th><th scope="col">Depois</th><th scope="col">Variação</th></tr></thead>
              <tbody>{(Object.keys(labels) as (keyof typeof DANTE_BASE)[]).map(stat => {
                const delta = result.stats[stat] - before.stats[stat];
                const suffix = abilityStats.has(stat) ? '%' : '';
                return <tr key={stat} className="border-t border-void-border"><th scope="row" className="text-left font-medium py-3">{labels[stat]}</th><td className="text-center">{before.stats[stat]}{suffix}</td><td className="text-center font-semibold text-white">{result.stats[stat]}{suffix}</td><td className={`text-center ${delta < 0 ? 'text-rose-300' : delta > 0 ? 'text-energy-cyan' : 'text-slate-400'}`}>{delta > 0 ? '+' : ''}{delta}{abilityStats.has(stat) ? ' pp' : ''}</td></tr>;
              })}</tbody>
            </table>
            <div className="flex flex-wrap gap-2 mt-5">
              <button className="px-3 py-2 border border-void-border rounded-md hover:bg-void-850" onClick={() => { setBaseline(mods.map(mod => ({ ...mod }))); setMessage('Seleção atual fixada como referência. Altere os mods para comparar.'); }}>Fixar como antes</button>
              <button className="px-3 py-2 border border-void-border rounded-md hover:bg-void-850" onClick={() => { setMods([]); setBaseline([]); setMessage('Comparação reiniciada. A build salva foi preservada.'); }}>Reiniciar</button>
              <button className="px-3 py-2 bg-energy-cyan text-void-950 font-semibold rounded-md hover:brightness-110" onClick={save}>Salvar localmente</button>
              <button className="px-3 py-2 border border-void-border rounded-md hover:bg-void-850" onClick={restore}>Carregar salva</button>
            </div>
            <p role="status" className="mt-3 text-sm text-energy-cyan min-h-5">{message}</p>
          </div></div>
        </div>
        <details className="mt-8 border-t border-void-border pt-4">
          <summary className="cursor-pointer font-semibold text-white">Como calculamos e o que falta validar</summary>
          <p className="mt-3 text-sm text-slate-300">Os quatro atributos de habilidade começam em 100%. Somamos os bônus e as penalidades dos mods selecionados em pontos percentuais. Vida, escudos, armadura e energia permanecem na base, pois os mods disponíveis não alteram esses atributos.</p>
          <ul className="list-disc pl-5 mt-3 space-y-1 text-sm">{result.trace.map(entry => <li key={`${entry.mod}-${entry.stat}`}>{entry.mod}: {labels[entry.stat]} {entry.delta > 0 ? '+' : ''}{entry.delta} pp.</li>)}</ul>
          <p className="mt-3 text-sm text-slate-400">Ainda não calculados: dano, habilidades individuais, armas, arcanos, fragmentos, Helminth, capacidade e polaridades. Esta seleção não certifica que uma build cabe nos slots do jogo. Outros Warframes e mods serão liberados conforme suas regras forem verificadas.</p>
          <p className="mt-3 text-sm"><a href={DANTE_SOURCE} target="_blank" rel="noreferrer" className="text-energy-cyan underline">Atributos do Dante: fonte oficial</a>. Fontes consultadas em {SOURCE_REVIEW_DATE}; essa data não identifica a versão do jogo.</p>
        </details>
      </div>
    </section>
  );
}
