'use client';
import { useState } from 'react';
import { buildTradeWhisper, type PublicListing } from '@/lib/public-market';
import { copyText } from '@/lib/browser-actions';
export default function TradeContact({ listing, itemName }: { listing: PublicListing; itemName: string }) {
  const [status, setStatus] = useState('');
  const message = buildTradeWhisper({ nickname: listing.public_nickname, side: listing.side, name: itemName, rank: listing.item_rank, platinum: listing.platinum, quantity: listing.quantity });
  return <div className="mt-4"><button disabled={!message} type="button" className="border border-energy-cyan px-4 py-2 text-sm text-energy-cyan disabled:opacity-40" onClick={async () => { if (message) { try { const copied = await copyText(message); setStatus(copied ? 'Mensagem copiada. Cole no chat do jogo; nada foi enviado automaticamente.' : 'Não foi possível copiar. Selecione a mensagem abaixo.'); } catch { setStatus('Não foi possível copiar. Selecione a mensagem abaixo.'); } } }}>Copiar mensagem para o jogo</button>{status && <p role="status" className="mt-2 text-xs text-slate-400">{status}</p>}{message && <details className="mt-2 text-xs text-slate-400"><summary>Ver mensagem</summary><p className="mt-2 break-words select-all">{message}</p></details>}</div>;
}
