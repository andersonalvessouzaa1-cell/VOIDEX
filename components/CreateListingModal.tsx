'use client';

import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Tag, ShoppingBag, Shield, Coins, UploadCloud } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  items: any[];
  defaultItemId?: string;
  onListingCreated: (listing: any) => void;
}

export default function CreateListingModal({
  isOpen,
  onClose,
  currentUser,
  items,
  defaultItemId,
  onListingCreated,
}: CreateListingModalProps) {
  const { t } = useLanguage();
  const [orderType, setOrderType] = useState<'wts' | 'wtb'>('wts');
  const [selectedItemId, setSelectedItemId] = useState(defaultItemId || (items[0]?.id || 'gyre-prime-set'));
  const [selectedCompName, setSelectedCompName] = useState('');
  const [price, setPrice] = useState(50);
  const [quantity, setQuantity] = useState(1);
  const [statusType, setStatusType] = useState('ingame');

  const currentItem = items.find((i) => i.id === selectedItemId) || items[0];

  useEffect(() => {
    if (currentItem && currentItem.components?.length > 0) {
      setSelectedCompName(currentItem.components[0].name);
      setPrice(currentItem.components[0].price);
    }
  }, [selectedItemId, currentItem]);

  if (!isOpen) return null;

  const currentComp = currentItem?.components?.find((c: any) => c.name === selectedCompName) || currentItem?.components?.[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !price || price <= 0) return;

    const newListing = {
      id: 'ord_' + Date.now(),
      itemId: currentItem.id,
      itemName: currentItem.name,
      componentName: selectedCompName || currentItem.name,
      orderType,
      price,
      quantity,
      username: currentUser.nickname,
      platform: currentUser.platform,
      crossplay: currentUser.crossplay,
      reputation: currentUser.reputation || 15,
      status: 'active',
      statusType: statusType === 'ingame' ? 'In-Game' : 'Online',
      createdAt: new Date().toISOString(),
    };

    onListingCreated(newListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-void-900 border border-orokin-gold/50 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-void-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-orokin-gold/10 border border-orokin-gold/40 text-orokin-gold flex items-center justify-center shrink-0">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Publicar Anúncio no Mercado</h3>
            <p className="text-slate-400 text-xs">Crie sua oferta de venda ou pedido de compra em segundos.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Order Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Tipo de Negociação</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('wts')}
                className={`py-2.5 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  orderType === 'wts'
                    ? 'border-emerald-500/60 bg-emerald-950/60 text-emerald-300 shadow-sm'
                    : 'border-void-border bg-void-950 text-slate-400 hover:text-white'
                }`}
              >
                <Tag className="w-4 h-4 text-emerald-400" /> Quero Vender (WTS)
              </button>
              <button
                type="button"
                onClick={() => setOrderType('wtb')}
                className={`py-2.5 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  orderType === 'wtb'
                    ? 'border-energy-cyan/60 bg-cyan-950/60 text-energy-cyan shadow-sm'
                    : 'border-void-border bg-void-950 text-slate-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-energy-cyan" /> Quero Comprar (WTB)
              </button>
            </div>
          </div>

          {/* Item Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Selecione o Item</label>
            <select
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              className="w-full px-3 py-2.5 bg-void-950 border border-void-border rounded-xl text-white text-sm focus:border-orokin-gold focus:outline-none"
            >
              {items.map((it) => (
                <option key={it.id} value={it.id}>
                  {it.name} ({it.category})
                </option>
              ))}
            </select>
          </div>

          {/* Sub-component */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Parte / Componente</label>
            <select
              value={selectedCompName}
              onChange={(e) => {
                setSelectedCompName(e.target.value);
                const found = currentItem?.components?.find((c: any) => c.name === e.target.value);
                if (found) setPrice(found.price);
              }}
              className="w-full px-3 py-2.5 bg-void-950 border border-void-border rounded-xl text-slate-200 text-sm focus:border-orokin-gold focus:outline-none"
            >
              {currentItem?.components?.map((comp: any) => (
                <option key={comp.name} value={comp.name}>
                  {comp.name} — Sugestão: {comp.price}p
                </option>
              ))}
            </select>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Preço em Platina (p)</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full pl-3 pr-8 py-2.5 bg-void-950 border border-void-border rounded-xl text-white font-mono text-base font-bold focus:border-orokin-gold focus:outline-none"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-energy-cyan font-bold pointer-events-none">
                  Plat
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Quantidade</label>
              <input
                type="number"
                min="1"
                max="99"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
                className="w-full px-3 py-2.5 bg-void-950 border border-void-border rounded-xl text-white font-mono text-base font-bold focus:border-orokin-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Seu Status Atual</label>
            <select
              value={statusType}
              onChange={(e) => setStatusType(e.target.value)}
              className="w-full px-3 py-2.5 bg-void-950 border border-void-border rounded-xl text-slate-200 text-sm focus:border-orokin-gold focus:outline-none"
            >
              <option value="ingame">🟢 Online no Jogo (In-Game - Pronto para Troca)</option>
              <option value="online">🟡 Online no Site</option>
            </select>
          </div>

          {/* Live In-Game Info */}
          <div className="p-3 rounded-xl bg-void-950 border border-void-border text-xs flex items-center justify-between text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-orokin-gold" />
              <span>{currentItem?.mr === 0 ? 'MR 0 Requerido' : `MR ${currentItem?.mr} Requerido`}</span>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-energy-cyan" />
              <span>Taxa: {currentComp?.tax || '2.000 Créditos'}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orokin-gold to-yellow-500 text-void-950 font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-glow-gold hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Publicar Oferta Agora</span>
          </button>
        </form>
      </div>
    </div>
  );
}
