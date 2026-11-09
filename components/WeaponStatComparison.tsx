'use client';

import { useState } from 'react';
import type { WeaponComparison, WeaponMetric } from '@/lib/data-engine/weapon-stat-comparison';

const LABELS: Record<WeaponMetric, string> = { criticalChance: 'Chance crítica', criticalMultiplier: 'Multiplicador crítico', statusChance: 'Chance de status', attackRate: 'Cadência' };
const MODES: Record<string, string> = {
  'Normal Attack': 'Ataque normal', Beam: 'Feixe', Throw: 'Arremesso',
  'Throw Bounce Explosion': 'Explosão no ricochete', 'Throw Recall Explosion': 'Detonação do arremesso',
  'Charged Throw': 'Arremesso carregado', 'Charged Throw Bounce Explosion': 'Explosão do arremesso carregado no ricochete',
  'Charged Throw Recall Explosion': 'Detonação do arremesso carregado',
  'Slam Attack': 'Ataque de queda', 'Heavy Slam Attack': 'Ataque pesado de queda',
  'Plasma Bomb Impact': 'Bomba de plasma: impacto', 'Plasma Bomb Explosion': 'Bomba de plasma: explosão',
  'Cluster Bombs Impact': 'Bombas secundárias: impacto', 'Cluster Bombs Explosion': 'Bombas secundárias: explosão',
};
const fmt = (value: number) => value.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
const unit = (key: WeaponMetric) => key === 'criticalMultiplier' ? '×' : key === 'attackRate' ? '/s' : '%';

export default function WeaponStatComparison({ id, name, comparison }: { id: string; name: string; comparison: WeaponComparison }) {
  const [modeIndex, setModeIndex] = useState(0);
  const index = Math.min(modeIndex, comparison.attacks.length - 1);
  const attack = comparison.attacks[index];
  if (!attack) return <p className="mt-4 text-sm text-slate-400">Comparação indisponível: a fonte não descreve o modo de ataque.</p>;
  return (
    <section className="mt-5 border-y border-void-border py-4" aria-label={`Comparação parcial de ${name}`}>
      <h4 className="font-display text-2xl text-white">Antes e depois: atributos da arma</h4>
      <p className="mt-2 text-xs text-slate-400">Comparação parcial, sem gatilhos condicionais, arcanos ou bônus dos outros equipamentos. Não representa dano ou DPS.</p>
      <label htmlFor={id} className="mt-4 mb-2 block text-sm">Modo de ataque de {name}</label>
      <select id={id} value={index} onChange={event => setModeIndex(Number(event.target.value))} className="w-full border border-void-border bg-void-950 px-2 py-2 text-sm text-slate-100">
        {comparison.attacks.map((item, i) => <option key={`${item.name}-${i}`} value={i}>{MODES[item.name] ?? item.name}</option>)}
      </select>
      <div className="mt-3 overflow-x-auto"><table className="w-full text-sm tabular-nums"><caption className="sr-only">Comparação parcial de {name}: {MODES[attack.name] ?? attack.name}</caption><thead><tr className="text-left text-slate-400"><th scope="col" className="py-2 pr-2">Atributo</th><th scope="col">Antes</th><th scope="col">Depois</th><th scope="col">Diferença</th></tr></thead><tbody>
        {(Object.keys(LABELS) as WeaponMetric[]).map(key => {
          const row = attack.rows[key];
          const delta = row.before === null || row.after === null ? null : row.after - row.before;
          return <tr key={key} className="border-t border-void-border align-top"><th scope="row" className="py-3 pr-3 text-left font-normal">{LABELS[key]}</th><td className="py-3 pr-2">{row.before === null ? 'sem dado' : `${fmt(row.before)}${unit(key)}`}</td><td className="py-3 pr-2"><span className="font-bold text-white">{row.after === null ? 'sem cálculo' : `${fmt(row.after)}${unit(key)}`}</span>{row.reason && <span className="mt-1 block max-w-52 text-xs font-normal text-slate-400">{row.reason}</span>}</td><td className={`py-3 ${delta === null || delta === 0 ? 'text-slate-400' : delta < 0 ? 'text-rose-300' : 'text-energy-cyan'}`}>{delta === null ? '—' : `${delta > 0 ? '+' : ''}${fmt(delta)}${key === 'criticalChance' || key === 'statusChance' ? ' pp' : unit(key)}`}</td></tr>;
        })}
      </tbody></table></div>
      <details className="mt-3 text-xs text-slate-400"><summary className="cursor-pointer">Cobertura e fontes desta comparação</summary><ul className="mt-3 list-disc space-y-2 pl-4">{comparison.limitations.map(note => <li key={note}>{note}</li>)}</ul>{comparison.excludedMods.length > 0 && <p className="mt-3">Efeitos fora destes quatro atributos ou ainda sem regra revisada: {comparison.excludedMods.join(', ')}.</p>}<div className="mt-3 space-y-2">{comparison.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="block text-energy-cyan underline">{source.name}</a>)}</div></details>
    </section>
  );
}
