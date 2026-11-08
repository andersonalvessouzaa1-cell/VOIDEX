'use client';
import { useState } from 'react';
import { TRADE_PLATFORMS, type TradeItem } from '@/lib/public-market';
import TradeItemPicker from './TradeItemPicker';
export default function MarketFilters({ item, platform, side }: { item: TradeItem | null; platform: string; side: string }) {
  const [selected, setSelected] = useState(item);
  return <form method="get" className="mt-6 grid gap-4 border-y border-void-border py-6 md:grid-cols-2">
    <TradeItemPicker id="market-item" value={selected} onChange={setSelected} />
    <div className="grid grid-cols-2 gap-3"><label className="text-sm">Plataforma<select name="platform" defaultValue={platform} className="mt-2 w-full border border-void-border bg-void-950 p-3"><option value="">Todas</option>{Object.entries(TRADE_PLATFORMS).map(([key, name]) => <option key={key} value={key}>{name}</option>)}</select></label><label className="text-sm">Tipo<select name="side" defaultValue={side} className="mt-2 w-full border border-void-border bg-void-950 p-3"><option value="">Compra e venda</option><option value="sell">Venda</option><option value="buy">Compra</option></select></label></div>
    <button className="border border-energy-cyan px-5 py-3 text-energy-cyan md:col-span-2" type="submit">Filtrar anúncios</button>
  </form>;
}
