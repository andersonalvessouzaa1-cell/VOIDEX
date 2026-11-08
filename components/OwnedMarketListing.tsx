'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { editListing, removeListing, type MarketActionResult } from '@/app/conta/anuncios/actions';
import type { PublicListing } from '@/lib/public-market';
export default function OwnedMarketListing({ listing, itemName }: { listing: PublicListing; itemName: string }) {
  const router = useRouter(); const [busy, setBusy] = useState(false); const [result, setResult] = useState<MarketActionResult>({});
  const run = async (remove: boolean, data: FormData) => {
    setBusy(true); setResult({});
    try { const next = await (remove ? removeListing(data) : editListing(data)); setResult(next); if (next.success) router.refresh(); }
    catch { setResult({ error: 'Falha de conexão. Tente novamente.' }); } finally { setBusy(false); }
  };
  return <article className="border-b border-void-border py-5">
    <h3 className="font-display text-2xl">{itemName}</h3><p className="mt-1 text-sm text-slate-400">{listing.side === 'sell' ? 'Venda' : 'Compra'} · nível {listing.item_rank} · {listing.public_nickname} · {listing.platform}</p>
    <form className="mt-3 grid gap-3 sm:grid-cols-2" onSubmit={event => { event.preventDefault(); void run(false, new FormData(event.currentTarget)); }}>
      <input type="hidden" name="id" value={listing.id} />
      <label className="text-sm">Platina por unidade<input name="platinum" type="number" min={1} max={1000000} step={1} defaultValue={listing.platinum} required className="mt-2 w-full border border-void-border bg-void-950 p-2" /></label>
      <label className="text-sm">Quantidade<input name="quantity" type="number" min={1} max={999} step={1} defaultValue={listing.quantity} required className="mt-2 w-full border border-void-border bg-void-950 p-2" /></label>
      <button type="submit" disabled={busy} className="border border-energy-cyan px-3 py-2 text-sm text-energy-cyan disabled:opacity-40">Salvar preço e quantidade</button>
      <button type="button" disabled={busy} className="border border-void-border px-3 py-2 text-sm text-rose-300 disabled:opacity-40" onClick={() => { if (window.confirm(`Retirar o anúncio de ${itemName}? Ele será excluído do mercado.`)) { const form = new FormData(); form.set('id', listing.id); void run(true, form); } }}>Retirar anúncio</button>
    </form>
    {result.error && <p role="alert" className="mt-2 text-sm text-rose-300">{result.error}</p>}{result.success && <p role="status" className="mt-2 text-sm text-energy-cyan">{result.success}</p>}
  </article>;
}
