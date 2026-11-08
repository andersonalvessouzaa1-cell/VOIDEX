'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { readOwnedCounts, type ShoppingItem } from '@/lib/build-shopping-list';
const SLOTS:Record<string,string>={warframe:'Warframe',primary:'Primária',secondary:'Secundária',melee:'Corpo a corpo',companion:'Companheiro',companion_weapon:'Arma do companheiro'};
export default function BuildShoppingList({presetId,items}:{presetId:string;items:ShoppingItem[]}) {
 const [owned,setOwned]=useState<Record<string,number>>({});
 const [ready,setReady]=useState(false); const [notice,setNotice]=useState('');
 const storageKey=`acervo-void:checklist:v1:${presetId}`;
 useEffect(()=>{try {setOwned(readOwnedCounts(localStorage.getItem(storageKey),items));} catch {setNotice('Armazenamento indisponível; as marcações durarão somente nesta visita.');} setReady(true);},[storageKey,items]);
 const missing=items.filter(item=>!owned[item.id]);
 const toggle=(id:string,checked:boolean)=>{const next={...owned}; if(checked) next[id]=1; else delete next[id]; setOwned(next);try {localStorage.setItem(storageKey,JSON.stringify(next));} catch {setNotice('Não foi possível salvar no navegador. As marcações continuam nesta visita.');}};
 return <details className="mt-6 border border-void-border p-4">
  <summary className="cursor-pointer font-display text-3xl">O que falta para esta build?</summary>
  <p className="mt-3 text-sm text-slate-300">Marque os mods e arcanos que você já possui no nível indicado. Esta lista é manual e fica neste navegador; não acessa o inventário do jogo nem sincroniza com sua conta.</p>
  <p className="mt-2 text-xs text-slate-400">Lista por item e nível, sem calcular cópias simultâneas, fusão, fragmentos, armas ou companheiros. Consulte o conjunto acima para os demais requisitos. Nas ofertas, confira o nível exato; nenhum preço ou custo total foi estimado.</p>
  {ready && <p role="status" className="mt-4 text-sm text-energy-cyan">{missing.length} de {items.length} itens ainda não marcados como possuídos.</p>}
  {notice && <p role="status" className="mt-2 text-sm text-amber-100">{notice}</p>}
  <ul className="mt-4 divide-y divide-void-border">{items.map(item=><li key={item.id} className="flex flex-wrap items-start justify-between gap-3 py-3">
   <label className="flex min-w-0 flex-1 items-start gap-3 text-sm"><input type="checkbox" disabled={!ready} checked={Boolean(owned[item.id])} onChange={event=>toggle(item.id,event.target.checked)} className="mt-1"/><span><span className="break-words">{item.name} · nível {item.rank}</span><span className="mt-1 block text-xs text-slate-400">{item.usedBy.map(slot=>SLOTS[slot]??slot).join(', ')}</span></span></label>
   {!owned[item.id] && (item.marketUrl?<Link href={item.marketUrl} className="text-xs text-energy-cyan underline">Ver ofertas · confira o nível</Link>:<span className="text-xs text-slate-400">Sem consulta de mercado disponível</span>)}
  </li>)}</ul>
 </details>;
}
