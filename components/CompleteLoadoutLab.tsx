'use client';

import { useEffect, useState } from 'react';
import ItemImage from './ItemImage';
import WeaponStatComparison from './WeaponStatComparison';
import type { ResolvedLoadout, compareCuratedWarframe } from '@/lib/data-engine/loadout-reader';

type Comparison = ReturnType<typeof compareCuratedWarframe>;
interface Entry { preset: ResolvedLoadout; comparison: Comparison }
const LABELS: Record<string, string> = { warframe: 'Warframe', primary: 'Arma primária', secondary: 'Arma secundária', melee: 'Corpo a corpo', companion: 'Companheiro', companion_weapon: 'Arma do companheiro' };
const SLOT_LABELS: Record<string, string> = { aura: 'Aura', exilus: 'Exilus', stance: 'Postura' };
const SHARD_LABELS: Record<string, string> = { ambar: 'Âmbar', carmesim: 'Carmesim' };
const EFFECT_LABELS: Record<string, string> = { casting_speed: 'Velocidade de lançamento', ability_duration: 'Duração de habilidade' };
const STAT_LABELS = { health: 'Vida', shields: 'Escudos', armor: 'Armadura', energy: 'Energia (valor bruto)', strength: 'Força', duration: 'Duração', efficiency: 'Eficiência', range: 'Alcance' };
const fmt = (value: number) => value.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
const art = (name: string | null) => name ? `/api/cdn-image?name=${encodeURIComponent(name)}` : undefined;

export default function CompleteLoadoutLab() {
  const [frames, setFrames] = useState<{ slug: string; name: string }[]>([]);
  const [frame, setFrame] = useState('dante');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let alive = true;
    fetch('/api/game-data/warframes').then(response => response.json()).then(data => {
      if (!alive) return;
      if (data.error || !Array.isArray(data.items)) throw new Error(data.error || 'Catálogo indisponível.');
      setFrames(data.items);
    }).catch(() => { if (alive) setError('Não foi possível carregar o catálogo de Warframes.'); });
    return () => { alive = false; };
  }, []);
  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch(`/api/game-data/loadouts?warframe=${encodeURIComponent(frame)}`).then(response => response.json()).then(data => {
      if (!alive) return;
      if (data.error || !Array.isArray(data.presets)) throw new Error(data.error || 'Presets indisponíveis.');
      setEntries(data.presets);
    }).catch((reason: unknown) => { if (alive) setError(reason instanceof Error ? reason.message : 'Não foi possível carregar os presets.'); }).finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [frame]);
  const entry = entries.find(item => item.preset.id === selected);
  const preset = entry?.preset;
  const comparison = entry?.comparison;
  return (
    <div className="mb-14 border-y border-void-border py-6">
      <h3 className="font-display text-3xl text-white">Presets de equipamento completo</h3>
      <p className="mt-2 max-w-3xl text-sm text-slate-400">O seletor usa todo o catálogo sincronizado. A curadoria começa pelo Dante; os demais personagens aparecem como ainda sem preset completo.</p>
      <label htmlFor="loadout-frame" className="mt-5 mb-2 block text-white">Personagem do preset</label>
      <select id="loadout-frame" value={frame} disabled={!frames.length} onChange={event => { setFrame(event.target.value); setEntries([]); setSelected(''); setError(''); }} className="w-full max-w-md border border-void-border bg-void-950 px-3 py-3 text-slate-100">
        {!frames.length && <option value="dante">Carregando catálogo…</option>}
        {frames.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}
      </select>
      {error && <p role="alert" className="mt-4 text-rose-300">{error}</p>}
      {loading && <p role="status" className="mt-4 text-slate-400">Carregando presets…</p>}
      {!loading && !error && entries.length === 0 && <p role="status" className="mt-4 text-slate-300">Ainda sem preset completo curado para este personagem. O modo livre abaixo continua disponível.</p>}
      <div className="mt-4 flex flex-wrap gap-3" role="group" aria-label="Selecionar preset completo">
        {entries.map(item => <button type="button" key={item.preset.id} aria-pressed={selected === item.preset.id} onClick={() => setSelected(item.preset.id)} className="border border-void-border px-4 py-3 text-left hover:border-energy-cyan aria-pressed:border-energy-cyan aria-pressed:text-energy-cyan">{item.preset.name}</button>)}
      </div>
      {preset && <>
        <p className="mt-5 border-l-2 border-orokin-gold pl-3 text-sm text-amber-100">Composição baseada em fontes comunitárias. Este conjunto e os ajustes da VOIDEX não foram testados no jogo.</p>
        <details className="mt-4 border-b border-void-border pb-4"><summary className="cursor-pointer text-sm text-slate-300">Fontes, ajustes e limites desta composição</summary><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-400">{preset.notes.map(note => <li key={note}>{note}</li>)}</ul></details>
        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.75fr)]">
          <div className="min-w-0">
            {Object.entries(preset.equipment).map(([slot, part]) => <details key={slot} open className="border-b border-void-border py-4">
              <summary className="cursor-pointer font-display text-2xl text-white">{LABELS[slot] ?? slot}: {part.name}</summary>
              <div className="mt-3 flex items-center gap-3"><ItemImage src={art(part.imageName)} alt="" size={56} /><div className="text-sm"><a href={part.source.url} target="_blank" rel="noreferrer" className="text-energy-cyan underline">Fonte: {part.source.author ?? part.source.name}</a><p className="text-slate-400">Consultada em {part.source.retrievedAt.split('-').reverse().join('/')}</p></div></div>
              {part.weaponComparison && <WeaponStatComparison key={`${slot}-${part.slug}`} id={`weapon-mode-${slot}-${part.slug}`} name={part.name} comparison={part.weaponComparison} />}
              <ul className="mt-4 divide-y divide-void-border">
                {part.mods.map(mod => <li key={mod.slug} className="flex gap-3 py-3"><ItemImage src={art(mod.imageName)} alt="" size={40} /><div className="min-w-0"><p className="text-white">{mod.name} <span className="text-xs text-slate-400">{SLOT_LABELS[mod.slot] ?? 'Mod'} · nível {mod.rank}/{mod.maxRank}</span></p><p className="mt-1 whitespace-pre-line text-xs text-slate-400">{mod.effects.length ? mod.effects.join(' · ') : 'Efeito não descrito na base sincronizada; consulte a fonte.'}</p>{mod.publishedRank !== undefined && mod.publishedRank !== mod.rank && <p className="mt-1 text-xs text-amber-100">Ajuste VOIDEX: a fonte usa nível {mod.publishedRank}; aqui está no máximo.</p>}</div></li>)}
              </ul>
              <h4 className="mt-4 font-display text-xl text-white">Arcanos</h4>
              {part.arcanes.length ? <ul className="mt-2 space-y-3">{part.arcanes.map(arcane => <li key={arcane.slug} className="text-sm"><p>{arcane.name} · nível {arcane.rank}/{arcane.maxRank}</p><p className="mt-1 whitespace-pre-line text-xs text-slate-400">{arcane.effects.join(' · ')}</p></li>)}</ul> : <p className="mt-1 text-sm text-slate-400">A configuração da fonte não equipa arcanos nesta parte.</p>}
            </details>)}
            <section className="border-b border-void-border py-5" aria-label="Fragmentos do preset"><h4 className="font-display text-2xl text-white">Fragmentos de Archon</h4><ol className="mt-3 space-y-3">{preset.shards.map((shard, index) => <li key={index} className="text-sm"><p>Vaga {index + 1}: {SHARD_LABELS[shard.color] ?? shard.color} {shard.tauforged ? 'tauforjado' : 'normal'} — {EFFECT_LABELS[shard.effect] ?? shard.effect} +{fmt(shard.value)}{shard.unit}</p><a href={shard.source.url} target="_blank" rel="noreferrer" className="text-xs text-energy-cyan underline">Fonte do efeito</a></li>)}</ol></section>
            <section className="py-5" aria-label="Helminth do preset"><h4 className="font-display text-2xl text-white">Helminth</h4>{preset.helminth.kind === 'subsumed' ? <><p className="mt-2">{preset.helminth.ability} no lugar de {preset.helminth.replacedAbility}.</p><a href={preset.helminth.source.url} target="_blank" rel="noreferrer" className="text-sm text-energy-cyan underline">Fonte da troca</a></> : <p>{preset.helminth.note}</p>}</section>
          </div>
          <aside className="order-first min-w-0 border border-void-border bg-void-900 p-5 lg:order-last lg:sticky lg:top-24" aria-label="Resultado do preset">
            <h4 className="font-display text-3xl text-white">Antes e depois: Warframe</h4>
            {comparison ? <>
              <p className="mt-2 text-sm text-slate-400">Dante nível 30, sem mods → mods máximos e fragmentos desta composição. Gatilhos condicionais inativos.</p>
              <div className="mt-4 overflow-x-auto"><table className="w-full text-sm tabular-nums"><caption className="sr-only">Comparação do preset completo do Dante</caption><thead><tr className="text-left text-slate-400"><th className="py-2">Atributo</th><th>Antes</th><th>Depois</th><th>Diferença</th></tr></thead><tbody>{(Object.keys(STAT_LABELS) as (keyof typeof STAT_LABELS)[]).map(key => { const delta = comparison.stats[key] - comparison.base[key]; const suffix = ['strength', 'duration', 'efficiency', 'range'].includes(key) ? '%' : ''; return <tr key={key} className="border-t border-void-border"><th className="py-3 pr-2 text-left font-normal">{STAT_LABELS[key]}</th><td>{fmt(comparison.base[key])}{suffix}</td><td className="font-bold text-white">{fmt(comparison.stats[key])}{suffix}</td><td className={delta < 0 ? 'text-rose-300' : delta > 0 ? 'text-energy-cyan' : 'text-slate-400'}>{delta > 0 ? '+' : ''}{fmt(delta)}{suffix ? ' pp' : ''}</td></tr>; })}</tbody></table></div>
              <p className="mt-4 text-sm">Bônus dos fragmentos à velocidade de lançamento: +{fmt(comparison.castingSpeedBonus)}%.</p>
              {comparison.roarDamageBonus !== null && <p className="mt-3 text-sm">Ao lançar Roar com esta força: +{fmt(comparison.roarDamageBonus)}% de bônus de dano. Esse bônus não foi aplicado às armas nesta tabela.</p>}
              <p className="mt-4 text-xs text-slate-400">A energia é o valor matemático antes de arredondar; a fonte exibe 769. O arredondamento dentro do jogo ainda não foi conferido.</p>
              <p className="mt-3 text-xs text-slate-400">Ainda fora da conta: efeitos condicionais de mods e arcanos, sinergias do companheiro, dano das armas e regras de capacidade/polaridade. Esta tabela não certifica o encaixe nem o desempenho em combate.</p>
              <div className="mt-4 space-y-2">{comparison.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="block text-xs text-energy-cyan underline">{source.name}</a>)}</div>
            </> : <p className="mt-3 text-sm text-slate-400">Comparação numérica ainda indisponível para este preset.</p>}
            <p className="mt-5 border-t border-void-border pt-4 text-xs text-slate-400">As armas agora mostram comparações parciais dentro de cada configuração, com seletor de modo. Dano/DPS, atributos do companheiro e sinergias entre equipamentos continuam pendentes.</p>
          </aside>
        </div>
      </>}
    </div>
  );
}
