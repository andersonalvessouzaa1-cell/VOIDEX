'use client';

import { useState } from 'react';
import ItemImage from './ItemImage';
import { presetsFor, ROLE_LABELS, STATUS_LABELS, SHARD_COLOR_LABELS, type BuildRole, type BuildStatus } from '@/lib/data-engine/build-presets';

const ROLES: BuildRole[] = ['dano', 'suporte', 'controle'];
const STATUS_STYLE: Record<BuildStatus, string> = {
  TESTADO_NO_JOGO: 'border-energy-cyan text-energy-cyan',
  FONTE_COMUNITARIA: 'border-orokin-gold text-orokin-gold',
  NAO_TESTADO: 'border-rose-400 text-rose-300',
};
const date = (iso: string) => iso.split('-').reverse().join('/');

export default function BuildPresets() {
  const [role, setRole] = useState<BuildRole>('dano');
  const list = presetsFor('dante', role);
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4">
        <ItemImage src="/api/warframe-image?name=Dante" alt="" size={64} />
        <div>
          <h3 className="font-display font-bold text-3xl text-white">Presets de build: Dante</h3>
          <p className="text-sm text-slate-400">Mais Warframes, armas e companheiros entram quando a base de dados completa for sincronizada.</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Tipo de build">
        {ROLES.map(r => (
          <button key={r} type="button" aria-pressed={role === r} onClick={() => setRole(r)}
            className="px-4 py-2 border border-void-border text-slate-300 hover:text-white hover:border-energy-cyan aria-pressed:bg-energy-cyan aria-pressed:border-energy-cyan aria-pressed:text-void-950 aria-pressed:font-semibold">
            {ROLE_LABELS[r]} ({presetsFor('dante', r).length})
          </button>
        ))}
      </div>
      {list.length === 0 && <p role="status" className="mt-5 text-amber-200">Nenhum preset de {ROLE_LABELS[role]} cadastrado para o Dante. Isso significa que ainda não foi curado, não que não exista.</p>}
      <div className="mt-5 grid md:grid-cols-2 gap-4">
        {list.map(p => (
          <article key={p.id} className="border border-void-border bg-void-900 p-5 min-w-0">
            <span className={`inline-block px-2 py-0.5 border text-xs ${STATUS_STYLE[p.status]}`}>{STATUS_LABELS[p.status]}</span>
            <h4 className="mt-3 font-display font-bold text-2xl text-white break-words">{p.name}</h4>
            <p className="mt-1 text-sm text-slate-400">
              Fonte: <a href={p.source.url} target="_blank" rel="noreferrer" className="text-energy-cyan underline">{p.source.name}{p.source.author ? `, de ${p.source.author}` : ''}</a>. Consultada em {date(p.source.retrievedAt)}.
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="text-slate-400">Fragmentos de Archon</dt>
                <dd className="text-slate-100">{p.shards.length ? p.shards.map((s, i) => <span key={i} className="block">{s.count}× {SHARD_COLOR_LABELS[s.color]}{s.tauforged === true ? ' tauforjado' : ''}: {s.effect}{s.tauforged === null ? ' (a fonte não diz se é tauforjado)' : ''}</span>) : 'A fonte não informa.'}</dd></div>
              <div><dt className="text-slate-400">Arcanos</dt><dd className="text-slate-100">{p.arcanes.length ? p.arcanes.join(', ') : 'A fonte não informa nesta etapa.'}</dd></div>
              <div><dt className="text-slate-400">Helminth</dt><dd className="text-slate-100">{p.helminthNote ?? 'A fonte não informa nesta etapa.'}</dd></div>
            </dl>
            <p className="mt-4 text-xs text-slate-400">{p.modsNote}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
