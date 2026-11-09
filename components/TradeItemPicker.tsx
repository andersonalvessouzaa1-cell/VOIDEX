'use client';
import { useEffect, useRef, useState } from 'react';
import type { TradeItem } from '@/lib/public-market';
export default function TradeItemPicker({ id, value, onChange, required = false }: { id: string; value: TradeItem | null; onChange: (item: TradeItem | null) => void; required?: boolean }) {
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(value?.name ?? '');
  const [items, setItems] = useState<TradeItem[]>([]);
  const [status, setStatus] = useState('');
  useEffect(() => { input.current?.setCustomValidity(query.trim() && !value ? 'Selecione um item da lista ou limpe a busca.' : ''); }, [query, value]);
  useEffect(() => {
    const abort = new AbortController();
    if (query.trim().length < 2 || query === value?.name) { setItems([]); setStatus(''); return; }
    const timer = setTimeout(() => {
      setStatus('Buscando itens…');
      fetch(`/api/trade-items?q=${encodeURIComponent(query.trim())}`, { signal: abort.signal }).then(async response => {
        if (!response.ok) throw new Error();
        const data = await response.json(); if (!Array.isArray(data.items)) throw new Error();
        if (!abort.signal.aborted) { setItems(data.items); setStatus(data.items.length ? 'Selecione um item da lista.' : 'Nenhum item negociável encontrado.'); }
      }).catch(() => { if (!abort.signal.aborted) setStatus('Busca indisponível. Tente novamente.'); });
    }, 300);
    return () => { clearTimeout(timer); abort.abort(); };
  }, [query, value?.name]);
  return <div className="min-w-0">
    <label htmlFor={id} className="block text-sm">Buscar mod ou arcano negociável</label>
    <input ref={input} id={id} type="search" value={query} maxLength={80} required={required} autoComplete="off" onChange={event => { setQuery(event.target.value); onChange(null); }} className="mt-2 w-full border border-void-border bg-void-950 p-3" placeholder="Digite pelo menos 2 letras" />
    <input type="hidden" name="item_key" value={value?.key ?? ''} />
    {value && <p className="mt-2 text-sm text-energy-cyan">Selecionado: {value.name} · nível máximo {value.maxRank} <button type="button" className="ml-2 underline" onClick={() => { setQuery(''); onChange(null); }}>Limpar item</button></p>}
    {status && <p role="status" className="mt-2 text-xs text-slate-400">{status}</p>}
    {items.length > 0 && <ul className="mt-2 max-h-64 overflow-y-auto border border-void-border">{items.map(item => <li key={item.key}><button type="button" className="w-full px-3 py-3 text-left text-sm hover:bg-void-800 focus-visible:outline focus-visible:outline-energy-cyan" onClick={() => { onChange(item); setQuery(item.name); setItems([]); setStatus(''); }}>{item.name} · {item.kind === 'mod' ? 'Mod' : 'Arcano'} · máximo {item.maxRank}</button></li>)}</ul>}
  </div>;
}
