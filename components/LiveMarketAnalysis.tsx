'use client';

import { useState } from 'react';
import { Search, RefreshCw, ExternalLink } from 'lucide-react';
import ItemImage from './ItemImage';
import type { MarketCatalogItem, MarketSummary } from '@/lib/live-market-data';

type ApiBody<T> = { error?: string; data?: T; fetchedAt?: string };
const PLATFORMS = [['pc', 'PC'], ['ps4', 'PlayStation'], ['xbox', 'Xbox'], ['switch', 'Switch'], ['mobile', 'Mobile']] as const;

export default function LiveMarketAnalysis() {
  const [items, setItems] = useState<MarketCatalogItem[]>([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<MarketCatalogItem | null>(null);
  const [platform, setPlatform] = useState('pc');
  const [crossplay, setCrossplay] = useState(false);
  const [summaries, setSummaries] = useState<MarketSummary[] | null>(null);
  const [fetchedAt, setFetchedAt] = useState('');
  const [catalogAt, setCatalogAt] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const matches = query.trim() ? items.filter(item => `${item.name} ${item.englishName} ${item.slug}`.toLowerCase().includes(query.trim().toLowerCase())) : [];
  const resetResult = () => { setSummaries(null); setFetchedAt(''); };
  async function requestCatalog() {
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/market', { signal: AbortSignal.timeout(25000) });
      const body = (await response.json()) as ApiBody<MarketCatalogItem[]>;
      if (!response.ok) throw new Error(body.error);
      setItems(body.data ?? []); setCatalogAt(body.fetchedAt ?? '');
    } catch (e) { setError(e instanceof Error ? e.message : 'Catálogo indisponível.'); }
    finally { setBusy(false); }
  }
  async function analyze() {
    if (!selected) return;
    setBusy(true); setError(''); resetResult();
    try {
      const params = new URLSearchParams({ item: selected.slug, platform, crossplay: String(crossplay) });
      const response = await fetch(`/api/market?${params}`, { signal: AbortSignal.timeout(25000) });
      const body = (await response.json()) as ApiBody<MarketSummary[]>;
      if (!response.ok) throw new Error(body.error);
      setSummaries(body.data ?? []); setFetchedAt(body.fetchedAt ?? '');
    } catch (e) { setError(e instanceof Error ? e.message : 'Ofertas indisponíveis.'); }
    finally { setBusy(false); }
  }
  const price = (value: number | null) => value === null ? 'Sem oferta' : `${value.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} plat/un.`;
  const field = 'w-full px-3 py-2.5 rounded-md bg-void-950 border border-void-border text-slate-100 placeholder:text-slate-500 disabled:opacity-50';

  return <section id="mercado-real" aria-labelledby="real-market-title" className="scroll-mt-24 py-20 bg-void-900 border-y border-void-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 id="real-market-title" className="font-display text-4xl sm:text-5xl text-white font-extrabold leading-none">Análise de ofertas reais</h2>
      <p className="mt-4 max-w-2xl text-slate-300">Compare preços por unidade e variações do mesmo item. Fonte: Warframe Market. Os anúncios continuam publicados lá; esta área não cria anúncios nem movimenta platina.</p>
      <p className="mt-2 max-w-2xl text-sm text-slate-400">Mostramos ofertas de usuários online ou no jogo. Preço anunciado não é preço de venda concluída. A consulta não usa os dados de exemplo da demonstração.</p>

      <div className="mt-10 grid lg:grid-cols-[1.1fr_1fr] gap-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <button disabled={busy} onClick={requestCatalog} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-energy-cyan text-energy-cyan font-semibold hover:bg-void-850 disabled:opacity-50">
              <RefreshCw className="w-4 h-4" aria-hidden="true" />{items.length ? 'Atualizar catálogo' : 'Carregar catálogo do Warframe Market'}
            </button>
            {catalogAt && <p className="text-sm text-slate-400">{items.length} itens ({items.filter(item => item.thumb).length} com imagem), consultados em {new Date(catalogAt).toLocaleString('pt-BR')}. Cache de até uma hora.</p>}
          </div>
          <label htmlFor="real-market-search" className="block mt-6 mb-2 font-medium text-white">Buscar item</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" aria-hidden="true" />
            <input id="real-market-search" disabled={!items.length || busy} value={query} onChange={event => setQuery(event.target.value)} placeholder={items.length ? 'Nome em português ou inglês' : 'Carregue o catálogo para buscar'} className={`${field} pl-9`} />
          </div>
          {query.trim() && <p role="status" className="mt-2 text-sm text-slate-400">{matches.length} resultados. {matches.length > 30 ? 'Exibindo 30; refine a busca.' : ''}</p>}
          <ul className="mt-3 max-h-72 overflow-y-auto divide-y divide-void-border border border-void-border rounded-md empty:hidden">
            {matches.slice(0, 30).map(item => <li key={item.id}>
              <button disabled={busy} aria-pressed={selected?.id === item.id} onClick={() => { setSelected(item); resetResult(); setError(''); }} className="w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-void-850 aria-pressed:bg-void-800 aria-pressed:text-energy-cyan">
                <ItemImage key={item.id} path={item.thumb} name={item.englishName || item.name} alt="" size={40} />
                <span className="min-w-0">{item.name}{item.englishName && item.englishName !== item.name && <span className="ml-2 text-sm text-slate-400">{item.englishName}</span>}</span>
              </button>
            </li>)}
          </ul>
        </div>

        <div className="chamfer self-start" style={{ '--chamfer': '20px' } as React.CSSProperties}>
          <div className="chamfer-in p-6 sm:p-7 min-w-0" style={{ '--chamfer': '19px' } as React.CSSProperties}>
            <p className="text-sm text-slate-400">Item selecionado</p>
            <div className="mt-2 flex items-center gap-4">
              {selected && <ItemImage key={selected.id} path={selected.thumb} name={selected.englishName || selected.name} alt="" size={72} />}
              <p className="font-display text-3xl font-bold text-white break-words">{selected?.name ?? 'Escolha um resultado da busca'}</p>
            </div>
            <label htmlFor="real-market-platform" className="block mt-6 mb-2 font-medium text-white">Plataforma das ofertas</label>
            <select id="real-market-platform" disabled={busy} value={platform} onChange={event => { setPlatform(event.target.value); resetResult(); }} className={field}>
              {PLATFORMS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <label className="flex items-center gap-2 mt-4 text-slate-200"><input type="checkbox" disabled={busy} checked={crossplay} onChange={event => { setCrossplay(event.target.checked); resetResult(); }} className="w-4 h-4 accent-energy-cyan" />Incluir ofertas Cross-Play</label>
            <button disabled={!selected || busy} onClick={analyze} className="mt-6 w-full px-4 py-3 rounded-md bg-energy-cyan text-void-950 font-semibold hover:brightness-110 disabled:opacity-50">Comparar ofertas</button>
            {busy && <p role="status" className="mt-4 text-energy-cyan">Consultando a fonte…</p>}
            {error && <p role="alert" className="mt-4 text-rose-300">{error}</p>}
          </div>
        </div>
      </div>

      {summaries !== null && <div className="mt-12">
        <p className="text-sm text-slate-400">Ofertas consultadas em {new Date(fetchedAt).toLocaleString('pt-BR')}. Cache de até um minuto. Valores por unidade; níveis, cargas e subtipos são separados.</p>
        {!summaries.length && <p role="status" className="mt-3 text-amber-100">Nenhuma oferta online utilizável para este item e filtro. Isso não significa preço zero.</p>}
        <div className="mt-4 grid md:grid-cols-2 gap-4">{summaries.map(group => <div key={group.variant} className="p-6 bg-void-950 border border-void-border rounded-lg min-w-0">
          <h3 className="font-semibold text-white break-words">{group.variant}</h3>
          <dl className="mt-4 grid grid-cols-2 gap-4">
            <div><dt className="text-sm text-slate-400">Menor preço de venda ({group.sellCount} ofertas)</dt><dd className="mt-1 font-display text-3xl font-bold text-orokin-gold">{price(group.lowestSell)}</dd></div>
            <div><dt className="text-sm text-slate-400">Maior preço de compra ({group.buyCount} ofertas)</dt><dd className="mt-1 font-display text-3xl font-bold text-orokin-gold">{price(group.highestBuy)}</dd></div>
          </dl>
          {selected?.ducats !== null && selected?.ducats !== undefined && selected.ducats > 0 && group.lowestSell !== null && <p className="mt-4 text-sm text-slate-300">{(selected.ducats / group.lowestSell).toFixed(2)} Ducats por platina no menor anúncio. Não inclui taxas nem garante disponibilidade.</p>}
        </div>)}</div>
        {selected && <a href={`https://warframe.market/items/${selected.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-6 text-energy-cyan underline">Abrir {selected.name} no Warframe Market para conferir os anúncios e negociar<ExternalLink className="w-4 h-4" aria-hidden="true" /></a>}
      </div>}
    </div>
  </section>;
}
