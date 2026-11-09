'use client';

import ItemImage from './ItemImage';
import React, { useState, useEffect } from 'react';
import { Search, Flame, Copy, Check, User, Smartphone, Shield, Coins, Plus, Filter, Tag, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { WARFRAME_ITEMS_DB, WarframeItem } from '@/lib/warframe-items-db';
import { copyText } from '@/lib/browser-actions';
import { isLocalProfile, isLocalListing } from '@/lib/local-market-data';
import { searchMarketItems, sortMarketOffers, matchesPlatform } from '@/lib/market-query';
import AuthModal from '@/components/AuthModal';
import CreateListingModal from '@/components/CreateListingModal';
import UserDashboardModal from '@/components/UserDashboardModal';

const CATEGORIES = [
  { id: 'all', label: 'Todos os itens' }, { id: 'warframe', label: 'Warframes Prime' }, { id: 'primary', label: 'Primárias' },
  { id: 'secondary', label: 'Secundárias' }, { id: 'melee', label: 'Melee' }, { id: 'companion', label: 'Companions e pets' },
  { id: 'necramech', label: 'Necramechs' }, { id: 'mods', label: 'Mods' }, { id: 'arcanes', label: 'Arcanos' },
  { id: 'shards', label: 'Fragmentos' }, { id: 'ayatan', label: 'Ayatan e Foco' }, { id: 'fish_gems', label: 'Peixes e gemas' },
];

export default function MarketDemo() {
  const { t } = useLanguage();
  const [items] = useState<WarframeItem[]>(WARFRAME_ITEMS_DB);
  const [selectedItem, setSelectedItem] = useState<WarframeItem>(WARFRAME_ITEMS_DB[0]);
  const [selectedCompIndex, setSelectedCompIndex] = useState<number>(0);
  const [platform, setPlatform] = useState<'pc' | 'playstation' | 'xbox' | 'switch'>('pc');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [marketMode, setMarketMode] = useState<'wts' | 'wtb'>('wts');
  const [searchTerm, setSearchTerm] = useState('');
  const [includeCrossplay, setIncludeCrossplay] = useState(false);
  const [showAllPills, setShowAllPills] = useState(false);
  const [copiedSeller, setCopiedSeller] = useState<string | null>(null);
  const [copiedNick, setCopiedNick] = useState<string | null>(null);

  const [actionError, setActionError] = useState('');

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userListings, setUserListings] = useState<any[]>([]);
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('voidex_current_user') || 'null');
      if (isLocalProfile(user)) setCurrentUser(user);
      const listings = JSON.parse(localStorage.getItem('voidex_user_listings') || '[]');
      const validListings = Array.isArray(listings) ? listings.filter(isLocalListing) : [];
      setUserListings(validListings);
      if ((user !== null && !isLocalProfile(user)) || !Array.isArray(listings) || validListings.length !== listings.length) {
        setActionError('Alguns dados locais estavam inválidos e não foram carregados. Você pode criar um novo perfil ou anúncio.');
      }
    } catch { setActionError('Não foi possível carregar os dados locais deste navegador.'); }
  }, []);

  // Modal States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [isListingOpen, setIsListingOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  const saveListingsToStorage = (updated: any[]) => {
    setUserListings(updated);
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('voidex_user_listings', JSON.stringify(updated)); } catch { setActionError('Anúncios atualizados nesta sessão, mas o navegador não permitiu salvá-los.'); }
    }
  };

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('voidex_current_user', JSON.stringify(user)); } catch { setActionError('Perfil ativo nesta sessão, mas o navegador não permitiu salvá-lo.'); }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      try { localStorage.removeItem('voidex_current_user'); } catch { setActionError('Você saiu desta sessão, mas não foi possível apagar o perfil salvo no navegador.'); }
    }
  };

  const handleListingCreated = (newListing: any) => {
    const updated = [newListing, ...userListings];
    saveListingsToStorage(updated);
  };

  const handleToggleStatus = (id: string) => {
    const updated = userListings.map((l) =>
      l.id === id ? { ...l, status: l.status === 'active' ? 'paused' : 'active' } : l
    );
    saveListingsToStorage(updated);
  };

  const handleDeleteListing = (id: string) => {
    const updated = userListings.filter((l) => l.id !== id);
    saveListingsToStorage(updated);
  };

  const currentComp = selectedItem.components[selectedCompIndex] || {
    name: selectedItem.name,
    price: selectedItem.minPrice,
    tax: selectedItem.tradeTax,
    ducats: selectedItem.ducats,
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // O cartão do item acompanha a busca: se o item aberto saiu da lista, abre o primeiro resultado.
    const matches = searchMarketItems(items, term, categoryFilter);
    if (matches.length > 0 && !matches.some((i) => i.id === selectedItem.id)) {
      setSelectedItem(matches[0]);
      setSelectedCompIndex(0);
    }
  };

  const handleCategorySelect = (cat: string) => {
    setCategoryFilter(cat);
    if (cat !== 'all') {
      const firstInCat = items.find((i) => i.categoryGroup === cat);
      if (firstInCat && selectedItem.categoryGroup !== cat) {
        setSelectedItem(firstInCat);
        setSelectedCompIndex(0);
      }
    }
  };

  const handleCopyWhisper = async (username: string, price: number) => {
    const fullItemName = currentComp.name === 'Conjunto Completo' ? selectedItem.name : `${selectedItem.name} (${currentComp.name})`;
    const actionVerb = marketMode === 'wts' ? 'comprar' : 'vender';
    const msg = `/w ${username} Olá! Gostaria de ${actionVerb} [${fullItemName}] por ${price} platina. (via Acervo Void)`;
    setActionError('');
    setCopiedSeller(null);
    if (!(await copyText(msg))) { setActionError('Não foi possível copiar. Permita o acesso à área de transferência e tente novamente.'); return; }
    setCopiedSeller(username);
    setTimeout(() => setCopiedSeller(null), 2000);
  };

  const handleCopyNick = async (username: string) => {
    setActionError('');
    setCopiedNick(null);
    if (!(await copyText(username))) { setActionError('Não foi possível copiar. Selecione o nickname e copie manualmente.'); return; }
    setCopiedNick(username);
    setTimeout(() => setCopiedNick(null), 2000);
  };

  // Filter listings
  const filteredPillItems = searchMarketItems(items, searchTerm, categoryFilter);

  const activeUserListings = userListings.filter(
    (l) =>
      l.itemId === selectedItem.id &&
      l.componentName === currentComp.name &&
      l.orderType === marketMode &&
      l.status === 'active' && matchesPlatform(l, platform, includeCrossplay)
  );

  const baseListings = marketMode === 'wts'
    ? selectedItem.sellers.map((s, idx) => ({
        username: s.username,
        price: idx === 0 ? currentComp.price : currentComp.price + idx * 2,
        reputation: s.reputation,
        statusType: 'In-Game',
        lastSeen: s.lastSeen,
        isOwnPost: false, isUserPost: false,
      }))
    : [
        { username: 'VoidBuyer_99', price: Math.max(5, currentComp.price - 10), reputation: 120, statusType: 'In-Game', lastSeen: 'Agora mesmo', isOwnPost: false, isUserPost: false },
        { username: 'DucatCollector', price: Math.max(5, currentComp.price - 15), reputation: 85, statusType: 'Online', lastSeen: 'Há 5 min', isOwnPost: false, isUserPost: false },
      ];

  const formattedUserListings = activeUserListings.map((l) => ({
    username: l.username,
    price: l.price,
    reputation: l.reputation,
    statusType: l.statusType,
    lastSeen: 'Salvo neste navegador',
    isUserPost: true,
    isOwnPost: currentUser && currentUser.nickname.toLowerCase() === l.username.toLowerCase(),
  }));

  const mergedListings = sortMarketOffers([...formattedUserListings, ...baseListings], marketMode);
  const bestPrice = mergedListings[0]?.price ?? currentComp.price;

  const ducatRatio = currentComp.ducats > 0 && currentComp.price > 0
    ? (currentComp.ducats / currentComp.price).toFixed(2) : null;

  return (
    <section id="mercado-real" className="py-16 md:py-24 bg-void-900 border-y border-void-border relative">
      {actionError && <p role="alert" className="px-4 text-center text-rose-300 mb-4">{actionError}</p>}
      <p role="note" className="max-w-7xl mx-auto px-4 mb-6 text-center text-sm text-amber-200">Demonstração: preços e vendedores são exemplos. Perfis e anúncios ficam apenas neste navegador; não há autenticação nem negociação online.</p>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-void-800 border border-orokin-gold/30 text-orokin-gold text-xs font-semibold mb-3">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{t('terminalTag', 'Terminal Interativo Acervo Void')}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-none">
            {t('terminalTitle', 'Explore o mercado com')}{' '}
            <span className="text-energy-cyan">
              {t('terminalTitleGradient', 'Dados de exemplo')}
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            {t('terminalSubtitle', 'Compare preços demonstrativos e consulte informações do catálogo local. Confirme os dados no jogo antes de negociar.')}
          </p>
        </div>

        {/* Terminal Container */}
        <div className="bg-void-950/90 border border-void-border rounded-lg p-4 sm:p-6 lg:p-8">

          {/* Top Platform Switcher & Auth status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-void-border mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-400 mr-2">
                {t('platformPrompt', 'Onde você joga?')}
              </span>
              <div className="grid grid-cols-2 sm:flex gap-1.5 w-full sm:w-auto">
                {(['pc', 'playstation', 'xbox', 'switch'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      platform === p
                        ? 'bg-energy-cyan text-void-950 font-bold'
                        : 'bg-void-900 border border-void-border text-slate-300 hover:text-white'
                    }`}
                  >
                    {p === 'pc' && 'PC'}
                    {p === 'playstation' && 'PlayStation'}
                    {p === 'xbox' && 'Xbox'}
                    {p === 'switch' && 'Switch'}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Action Button for User Post */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              {!currentUser ? (
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setIsAuthOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-energy-cyan text-void-950 hover:opacity-90 transition-all flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Criar perfil local</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsOrdersOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-void-900 border border-energy-cyan/40 hover:border-energy-cyan flex items-center gap-2 transition-all shadow-sm"
                >
                  <span className="text-xs font-bold text-white">{currentUser.nickname}</span>
                  <span className="px-1.5 py-0.2 bg-emerald-950 text-emerald-300 text-[10px] font-mono border border-emerald-800">
                    {userListings.filter((l) => l.username.toLowerCase() === currentUser.nickname.toLowerCase() && l.status === 'active').length} ativas
                  </span>
                </button>
              )}

              <button
                onClick={() => {
                  if (!currentUser) {
                    setAuthMode('login');
                    setIsAuthOpen(true);
                  } else {
                    setIsListingOpen(true);
                  }
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-orokin-gold text-void-950 shadow-glow-gold/30 hover:opacity-95 transition-all flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Anunciar</span>
              </button>
            </div>
          </div>

          {/* Filtros: busca, categoria e crossplay */}
          <div className="grid md:grid-cols-[1fr_15rem] gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-energy-cyan pointer-events-none" aria-hidden="true" />
              <input
                type="text"
                aria-label="Buscar item ou peça no catálogo local"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Buscar item ou peça (ex: Gyre, Glaive, Shard)"
                className="w-full pl-10 pr-4 py-3 bg-void-950 border border-void-border text-white placeholder-slate-500 focus:outline-none focus:border-energy-cyan"
              />
            </div>
            <select
              aria-label="Categoria"
              value={categoryFilter}
              onChange={(e) => handleCategorySelect(e.target.value)}
              className="w-full px-3 py-3 bg-void-950 border border-void-border text-slate-100 focus:outline-none focus:border-energy-cyan"
            >
              {CATEGORIES.map((cat) => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
            </select>
          </div>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-1">
            <label className="flex items-center gap-2 text-sm text-slate-200 shrink-0">
              <input type="checkbox" className="w-4 h-4 accent-energy-cyan" checked={includeCrossplay} onChange={event => setIncludeCrossplay(event.target.checked)} />
              Incluir anúncios crossplay
            </label>
            <p className="text-xs text-slate-400">Filtro de anúncios locais: não certifica compatibilidade de troca. Vendedores de exemplo não têm plataforma real.</p>
          </div>

          <div className="mt-5 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">{t('highlights', 'Itens')} ({filteredPillItems.length})</span>
              {filteredPillItems.length > 8 && (
                <button type="button" onClick={() => setShowAllPills(v => !v)} className="text-sm text-energy-cyan underline">
                  {showAllPills ? 'Mostrar menos' : 'Ver todos'}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {(showAllPills ? filteredPillItems : filteredPillItems.slice(0, 8)).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === selectedItem.id}
                  onClick={() => { setSelectedItem(item); setSelectedCompIndex(0); }}
                  className="px-3 py-1.5 text-sm border border-void-border text-slate-300 hover:text-white hover:border-energy-cyan aria-pressed:bg-energy-cyan aria-pressed:border-energy-cyan aria-pressed:text-void-950 aria-pressed:font-semibold"
                >
                  {item.name}
                </button>
              ))}
              {filteredPillItems.length === 0 && <p role="status" className="text-sm text-amber-200">Nenhum item encontrado nesta categoria. Altere a busca ou a categoria.</p>}
            </div>
          </div>

          {/* Main Item Card */}
          <div className="p-4 sm:p-6 rounded-lg bg-void-900/90 border border-void-border mb-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

              {/* Left: Item Info */}
              <div className="flex items-center gap-4">
                <ItemImage name={selectedItem.name} alt="" size={80} />

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-orokin-gold font-mono">
                      {selectedItem.category}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 bg-void-950 text-slate-300 border border-void-border">
                      {selectedItem.trend}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">{selectedItem.name}</h3>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1.5 flex-wrap">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Shield className="w-3.5 h-3.5 text-orokin-gold" />
                      {selectedItem.mr === 0 ? 'MR 0 (Sem restrição)' : `MR ${selectedItem.mr} Requerido`}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Coins className="w-3.5 h-3.5 text-energy-cyan" />
                      Taxa do Jogo: {currentComp.tax}
                    </span>
                    {currentComp.ducats > 0 && (
                      <>
                        <span>•</span>
                        <span className="px-2 py-0.5 rounded bg-void-950 border border-void-border text-orokin-gold font-mono text-[11px]">
                          {currentComp.ducats} Ducats
                        </span>
                      </>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-slate-300" aria-live="polite">
                    Ducats por platina: {ducatRatio ?? 'indisponível'}.
                    {' '}Relação entre os Ducats e o preço de exemplo deste componente; não indica lucro garantido.
                  </p>
                </div>
              </div>

              {/* Right: Quick Price Highlights */}
              <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                <div className="p-3 sm:p-4 rounded-lg bg-void-950 border border-emerald-500/30 text-center min-w-[120px]">
                  <div className="text-[11px] font-bold text-slate-400">{marketMode === 'wts' ? 'Menor oferta exibida' : 'Maior oferta exibida'}</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-0.5">{bestPrice} Plat</div>
                  <p className="text-xs text-slate-400">Exemplos e anúncios locais</p>
                </div>
                <div className="p-3 sm:p-4 rounded-lg bg-void-950 border border-void-border text-center min-w-[120px]">
                  <div className="text-[11px] font-bold text-slate-400">Ofertas exibidas</div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-200 font-mono mt-0.5">{mergedListings.length}</div>
                </div>
              </div>
            </div>

            {/* Sub-components list */}
            {selectedItem.components && selectedItem.components.length > 0 && (
              <div className="mt-6 pt-5 border-t border-void-border">
                <div className="text-xs font-bold text-slate-400 mb-2">
                  Peças / Componentes do Conjunto:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.components.map((comp, idx) => (
                    <button
                      key={comp.name}
                      onClick={() => setSelectedCompIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        idx === selectedCompIndex
                          ? 'bg-orokin-gold text-void-950 font-bold shadow-glow-gold/30'
                          : 'bg-void-950 border border-void-border text-slate-300 hover:border-orokin-gold/50'
                      }`}
                    >
                      <span>{comp.name}</span>
                      <span className="ml-1 opacity-80 font-mono">({comp.price}p)</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Market Feed: WTS vs WTB Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-2 border-b border-void-border">
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <span className="text-xs font-bold text-white">Modo de Negociação:</span>
              <div className="flex rounded-lg p-0.5 bg-void-900 border border-void-border">
                <button
                  onClick={() => setMarketMode('wts')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                    marketMode === 'wts'
                      ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-300 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5 text-emerald-400" /> Vendedores (WTS)
                </button>
                <button
                  onClick={() => setMarketMode('wtb')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                    marketMode === 'wtb'
                      ? 'bg-cyan-950 border border-cyan-500/50 text-energy-cyan shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-energy-cyan" /> Compradores (WTB)
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                if (!currentUser) {
                  setAuthMode('login');
                  setIsAuthOpen(true);
                } else {
                  setIsListingOpen(true);
                }
              }}
              className="text-xs font-bold text-orokin-gold hover:text-orokin-light flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Anunciar este Item</span>
            </button>
          </div>

          {/* Listings Table */}
          <div className="space-y-3">
            {mergedListings.map((seller) => {
              const isOwn = seller.isOwnPost;
              return (
                <div
                  key={seller.username + seller.price}
                  className={`p-3.5 sm:p-4 rounded-lg bg-void-900 border ${
                    seller.isUserPost
                      ? 'border-energy-cyan/60'
                      : 'border-void-border hover:border-energy-cyan/40'
                  } flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-lg bg-void-800 border border-void-border flex items-center justify-center font-bold text-slate-200 text-sm">
                        {seller.username.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-void-900" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-sm font-mono">{seller.username}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-mono">
                          {seller.statusType}
                        </span>
                        {seller.isUserPost && (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                              isOwn ? 'bg-orokin-gold text-void-950' : 'bg-energy-cyan/20 text-energy-cyan border border-energy-cyan/40'
                            } font-mono`}
                          >
                            {isOwn ? 'Seu Anúncio' : 'Oferta local'}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="text-orokin-gold">★ {seller.reputation} reps</span>
                        <span>•</span>
                        <span>{seller.lastSeen}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap">
                    <div className="text-xl font-extrabold text-energy-cyan font-mono mr-2">{seller.price} Plat</div>

                    {platform !== 'pc' && (
                      <button
                        onClick={() => handleCopyNick(seller.username)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                          copiedNick === seller.username
                            ? 'bg-emerald-600 text-white'
                            : 'bg-void-800 hover:bg-orokin-gold hover:text-void-950 text-slate-200 border border-void-border'
                        }`}
                      >
                        {copiedNick === seller.username ? <Check className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                        <span>{copiedNick === seller.username ? 'Copiado!' : 'Copiar Nick'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleCopyWhisper(seller.username, seller.price)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                        copiedSeller === seller.username
                          ? 'bg-emerald-600 text-white'
                          : 'bg-void-800 hover:bg-energy-cyan hover:text-void-950 text-slate-100 border border-void-border hover:border-energy-cyan'
                      }`}
                    >
                      {copiedSeller === seller.username ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>
                        {copiedSeller === seller.username
                          ? 'Copiado!'
                          : platform === 'pc'
                          ? marketMode === 'wts'
                            ? 'Copiar Whisper (/w)'
                            : 'Vender para Comprador'
                          : 'Mensagem Completa'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />

      {isListingOpen && <CreateListingModal
        isOpen={isListingOpen}
        onClose={() => setIsListingOpen(false)}
        currentUser={currentUser}
        items={items}
        defaultItemId={selectedItem.id}
        onListingCreated={handleListingCreated}
      />}

      <UserDashboardModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        currentUser={currentUser}
        userListings={userListings}
        onToggleStatus={handleToggleStatus}
        onDeleteListing={handleDeleteListing}
        onOpenCreateListing={() => setIsListingOpen(true)}
        onLogout={handleLogout}
      />
    </section>
  );
}
