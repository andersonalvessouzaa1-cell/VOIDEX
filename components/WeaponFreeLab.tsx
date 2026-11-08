'use client';

import { useEffect, useMemo, useState } from 'react';
import { summarizeNormalModCapacity } from '@/lib/data-engine/normal-mod-capacity';
import ItemImage from './ItemImage';
import WeaponStatComparison from './WeaponStatComparison';
import { resolveWeaponDraft, type LabMod, type LabWeapon, type WeaponCategory, type WeaponIndexItem, type WeaponModPick } from '@/lib/data-engine/weapon-lab';

const CATEGORIES: { value: WeaponCategory; label: string }[] = [{ value: 'primary', label: 'Armas primárias' }, { value: 'secondary', label: 'Armas secundárias' }, { value: 'melee', label: 'Corpo a corpo' }, { value: 'sentinel_weapons', label: 'Armas dos companheiros' }];
const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const clean = (text: string) => text.replace(/<[^>]+>/g, '').replace(/\\n/g, '\n');
const art = (name: string | null) => name ? `/api/cdn-image?name=${encodeURIComponent(name)}` : undefined;
const field = 'w-full border border-void-border bg-void-950 px-3 py-2.5 text-slate-100';

export default function WeaponFreeLab() {
  const [category, setCategory] = useState<WeaponCategory>('primary');
  const [items, setItems] = useState<WeaponIndexItem[]>([]);
  const [slug, setSlug] = useState('');
  const [query, setQuery] = useState('');
  const [weapon, setWeapon] = useState<LabWeapon | null>(null);
  const [mods, setMods] = useState<LabMod[]>([]);
  const [picks, setPicks] = useState<WeaponModPick[]>([]);
  const [candidate, setCandidate] = useState('');
  const [loadingIndex, setLoadingIndex] = useState(true);
  const [loadingWeapon, setLoadingWeapon] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState(30);
  const [matchingSlots, setMatchingSlots] = useState<Record<string, boolean>>({});
  const resetDraft = () => { setWeapon(null); setMods([]); setPicks([]); setMatchingSlots({}); setCandidate(''); setNotice(''); setError(''); };

  useEffect(() => {
    let alive = true;
    setLoadingIndex(true);
    fetch(`/api/game-data/weapon-lab?category=${category}`).then(response => response.json()).then(data => {
      if (!alive) return;
      if (data.error || !Array.isArray(data.items)) throw new Error(data.error || 'Catálogo indisponível.');
      setItems(data.items);
      setSlug(data.items.find((item: WeaponIndexItem) => item.slug === 'phantasma_prime')?.slug ?? data.items[0]?.slug ?? '');
    }).catch((reason: unknown) => { if (alive) setError(reason instanceof Error ? reason.message : 'Não foi possível carregar as armas.'); }).finally(() => { if (alive) setLoadingIndex(false); });
    return () => { alive = false; };
  }, [category]);
  useEffect(() => {
    if (!slug) { setLoadingWeapon(false); return; }
    let alive = true;
    setLoadingWeapon(true);
    fetch(`/api/game-data/weapon-lab?category=${category}&weapon=${encodeURIComponent(slug)}`).then(response => response.json()).then(data => {
      if (!alive) return;
      if (data.error || !data.weapon || !Array.isArray(data.mods)) throw new Error(data.error || 'Arma indisponível.');
      setWeapon(data.weapon); setMods(data.mods); setDate(data.fetchedAt);
    }).catch((reason: unknown) => { if (alive) setError(reason instanceof Error ? reason.message : 'Não foi possível carregar a arma.'); }).finally(() => { if (alive) setLoadingWeapon(false); });
    return () => { alive = false; };
  }, [category, slug]);
  const draft = useMemo(() => {
    if (!weapon) return null;
    try { const value = resolveWeaponDraft(weapon, mods, picks); return { value, capacity: summarizeNormalModCapacity(value.mods, capacity, matchingSlots), error: '' }; }
    catch (reason) { return { value: null, error: reason instanceof Error ? reason.message : 'Seleção inválida.' }; }
  }, [weapon, mods, picks, capacity, matchingSlots]);
  const update = (next: WeaponModPick[]) => {
    if (!weapon) return;
    try { resolveWeaponDraft(weapon, mods, next); setPicks(next); setNotice(''); setCandidate(''); }
    catch (reason) { setNotice(reason instanceof Error ? reason.message : 'Não foi possível usar essa seleção.'); }
  };
  const matches = items.filter(item => item.slug === slug || normalize(item.name).includes(normalize(query)));
  return (
    <section className="mb-14 border-b border-void-border pb-8" aria-labelledby="weapon-free-title">
      <h3 id="weapon-free-title" className="font-display text-3xl text-white">Modo livre: teste de armas</h3>
      <p className="mt-2 max-w-3xl text-sm text-slate-400">Escolha uma arma, adicione mods e altere os níveis. Rascunho temporário desta tela: não altera os presets nem recebe selo de teste.</p>
      <p role="note" className="mt-3 border-l-2 border-orokin-gold pl-3 text-sm text-amber-100">Catálogo de armas da base sincronizada, com seleção inicial de mods revisados. Esta versão verifica grupos gerais e algumas famílias incompatíveis. O consumo parcial está disponível para vagas neutras ou simuladas iguais. Vagas reais, slots especiais, Incarnon e montagem de armas modulares ainda não são validados. A comparação cobre quatro atributos, sem dano/DPS ou arcanos.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="free-weapon-category" className="mb-2 block text-sm">Categoria da arma livre</label><select id="free-weapon-category" value={category} onChange={event => { setCategory(event.target.value as WeaponCategory); setItems([]); setSlug(''); setQuery(''); resetDraft(); }} className={field}>{CATEGORIES.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>
        <div><label htmlFor="free-weapon-search" className="mb-2 block text-sm">Filtrar armas pelo nome</label><input id="free-weapon-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Ex.: Braton Prime, Spectra Vandal" className={field} /></div>
      </div>
      <label htmlFor="free-weapon-item" className="mt-4 mb-2 block text-sm">Arma do modo livre ({items.length} na categoria)</label>
      <select id="free-weapon-item" value={slug} disabled={loadingIndex || !items.length} onChange={event => { setSlug(event.target.value); resetDraft(); }} className={field}>{!items.length && <option value="">{loadingIndex ? 'Carregando armas…' : 'Nenhuma arma disponível'}</option>}{matches.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>
      {query && <p className="mt-1 text-xs text-slate-400">A lista mantém a arma atual até você escolher outra.</p>}
      {(loadingIndex || loadingWeapon) && <p role="status" className="mt-4 text-sm text-slate-400">Carregando dados da arma…</p>}
      {error && <p role="alert" className="mt-4 text-sm text-rose-300">{error}</p>}
      {weapon && <>
        <div className="mt-5 flex items-center gap-3"><ItemImage key={weapon.slug} src={art(weapon.imageName)} alt="" size={64} /><div><h4 className="font-display text-2xl text-white">{weapon.name}</h4><p className="text-xs text-slate-400">Dados WFCD/warframe-items{date ? `, ${new Date(date).toLocaleDateString('pt-BR')}` : ''} · combinação não testada</p></div></div>
        <div className="mt-5 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)]">
          <div className="min-w-0">
            {!weapon.modGroup && <p className="mb-3 text-sm text-amber-100">A compatibilidade de mods desta arma ainda não foi conferida. Você pode consultar seus atributos base.</p>}
            <label htmlFor="free-weapon-mod" className="mb-2 block text-sm">Mod para adicionar ao modo livre ({mods.length} revisados)</label>
            <select id="free-weapon-mod" value={candidate} disabled={!mods.length} onChange={event => setCandidate(event.target.value)} className={field}><option value="">{mods.length ? 'Escolha um mod' : 'Nenhum mod revisado disponível'}</option>{mods.filter(mod => !picks.some(pick => pick.slug === mod.slug)).map(mod => <option key={mod.slug} value={mod.slug}>{mod.name} · máximo {mod.maxRank}</option>)}</select>
            <button type="button" disabled={!candidate} onClick={() => { const mod = mods.find(item => item.slug === candidate); if (mod) update([...picks, { slug: mod.slug, rank: mod.maxRank }]); }} className="mt-3 border border-energy-cyan px-4 py-2 text-energy-cyan disabled:opacity-40">Adicionar mod à arma</button>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><h4 className="font-display text-2xl text-white">Mods escolhidos ({picks.length}/8 comuns)</h4><button type="button" disabled={!picks.length} onClick={() => update([])} className="border border-void-border px-3 py-2 text-sm disabled:opacity-40">Limpar mods da arma</button></div>
            {notice && <p role="alert" className="mt-3 text-sm text-amber-100">{notice}</p>}
            {!picks.length && <p className="mt-3 text-sm text-slate-400">Sem mods: a comparação começa nos atributos da fonte.</p>}
            <ul className="mt-3 divide-y divide-void-border">{draft?.value?.mods.map(mod => <li key={mod.slug} className="py-4"><div className="flex flex-wrap items-center gap-3"><ItemImage src={art(mod.imageName)} alt="" size={40} /><span className="min-w-0 flex-1 text-white">{mod.name}</span><label className="text-sm">Nível de {mod.name} no modo livre<select value={mod.rank} onChange={event => update(picks.map(pick => pick.slug === mod.slug ? { ...pick, rank: Number(event.target.value) } : pick))} className="ml-2 border border-void-border bg-void-950 px-2 py-1">{Array.from({ length: mod.maxRank + 1 }, (_, rank) => <option key={rank} value={rank}>{rank}</option>)}</select></label><button type="button" aria-label={`Remover ${mod.name} do modo livre`} onClick={() => update(picks.filter(pick => pick.slug !== mod.slug))} className="border border-void-border px-2 py-1">×</button></div><p className="mt-2 whitespace-pre-line text-xs text-slate-400">{mod.levelStats[mod.rank]?.stats.map(clean).join(' · ') || 'Efeito sem descrição na base.'}</p>{mod.polarity && <label className="mt-3 flex items-center gap-2 text-xs"><input type="checkbox" checked={matchingSlots[mod.slug] === true} onChange={event => { const checked = event.target.checked; setMatchingSlots(current => ({ ...current, [mod.slug]: checked })); }} />Vaga simulada com a mesma polaridade ({mod.polarity})</label>}<p className="mt-2 text-xs">Consumo: {draft?.capacity?.rows.find(row => row.slug === mod.slug)?.cost ?? 'sem cálculo'} pontos</p></li>)}</ul>
          </div>
          <div className="min-w-0">{draft?.capacity && <section aria-label="Consumo parcial da arma" className="mb-5 border border-void-border p-4"><label htmlFor="weapon-capacity" className="block text-sm">Capacidade simulada da arma no nível 30</label><select id="weapon-capacity" value={capacity} onChange={event => setCapacity(Number(event.target.value))} className={field}><option value={30}>30 — sem Catalisador Orokin</option><option value={60}>60 — com Catalisador Orokin</option></select><p role="status" className={`mt-3 text-sm ${draft.capacity.remaining < 0 ? 'text-rose-300' : 'text-energy-cyan'}`}>Consumo parcial: {draft.capacity.used}/{draft.capacity.capacity} pontos. {draft.capacity.remaining < 0 ? `Excede em ${-draft.capacity.remaining}.` : `Restam ${draft.capacity.remaining}.`}</p><p className="mt-3 text-xs text-slate-400">Somente os mods comuns selecionados. Vagas sem polaridade por padrão; a opção por mod simula polaridade igual. Não verifica as vagas reais ou Forma. Posturas, Exilus, polaridades diferentes e capacidade acima do nível 30 ainda não são calculados.</p><a href="https://support.warframe.com/hc/en-us/articles/200500194-Mod-Guide-Use-Fusion-Transmutation-Sale" target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-energy-cyan underline">Regra oficial de custo e polaridade</a></section>}{draft?.error && <p role="alert" className="text-sm text-rose-300">{draft.error}</p>}{draft?.value && <WeaponStatComparison key={weapon.slug} id={`free-mode-${weapon.slug}`} name={`${weapon.name} — modo livre`} comparison={draft.value.comparison} />}</div>
        </div>
      </>}
    </section>
  );
}
