'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { publishListing, type MarketActionResult } from '@/app/conta/anuncios/actions';
import { TRADE_PLATFORMS, type TradeItem, type TradePlatform } from '@/lib/public-market';
import TradeItemPicker from './TradeItemPicker';
export default function MarketListingForm({ nickname, platform }: { nickname: string; platform: TradePlatform }) {
  const router = useRouter();
  const [item, setItem] = useState<TradeItem | null>(null);
  const [pickerKey, setPickerKey] = useState(0);
  const [rank, setRank] = useState(0);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<MarketActionResult>({});
  return <form className="mt-6 space-y-5 border border-void-border p-5" onSubmit={async event => {
    event.preventDefault(); const form = event.currentTarget;
    if (!item) { setResult({ error: 'Selecione um item da lista de busca.' }); return; }
    const data = new FormData(form); setBusy(true); setResult({});
    try { const next = await publishListing(data); setResult(next); if (next.success) { form.reset(); setItem(null); setRank(0); setPickerKey(key => key + 1); router.refresh(); } }
    catch { setResult({ error: 'Falha de conexão. Tente novamente.' }); } finally { setBusy(false); }
  }}>
    <h2 className="font-display text-3xl">Publicar anúncio</h2>
    <fieldset disabled={busy} className="space-y-5">
      <TradeItemPicker key={pickerKey} id="listing-item" value={item} onChange={next => { setItem(next); setRank(0); }} required />
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm">Tipo<select name="side" className="mt-2 w-full border border-void-border bg-void-950 p-3"><option value="sell">Quero vender</option><option value="buy">Quero comprar</option></select></label><label className="text-sm">Nível do item<select name="item_rank" value={rank} disabled={!item} onChange={event => setRank(Number(event.target.value))} className="mt-2 w-full border border-void-border bg-void-950 p-3">{Array.from({ length: (item?.maxRank ?? 0) + 1 }, (_, n) => <option key={n} value={n}>{n}</option>)}</select></label><label className="text-sm">Platina por unidade<input type="number" name="platinum" min={1} max={1000000} step={1} required className="mt-2 w-full border border-void-border bg-void-950 p-3" /></label><label className="text-sm">Quantidade<input type="number" name="quantity" min={1} max={999} step={1} defaultValue={1} required className="mt-2 w-full border border-void-border bg-void-950 p-3" /></label></div>
      <p className="text-sm text-slate-300">Serão públicos: <strong>{nickname}</strong>, {TRADE_PLATFORMS[platform]}, item, nível, tipo, preço, quantidade e data. Seu e-mail permanece privado.</p>
      <label className="flex items-start gap-3 text-sm"><input type="checkbox" name="publish_consent" value="yes" required className="mt-1" />Autorizo publicar estes dados no mercado. Confirmo que o nickname e a plataforma estão corretos. O site não verifica minha conta do jogo.</label>
      <button type="submit" disabled={!item || busy} className="border border-energy-cyan px-5 py-3 text-energy-cyan disabled:opacity-40">{busy ? 'Publicando…' : 'Publicar anúncio'}</button>
    </fieldset>
    {result.error && <p role="alert" className="text-sm text-rose-300">{result.error}</p>}{result.success && <p role="status" className="text-sm text-energy-cyan">{result.success}</p>}
  </form>;
}
