'use client';

import React from 'react';
import { X, ClipboardList, PackageOpen, Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  userListings: any[];
  onToggleStatus: (id: string) => void;
  onDeleteListing: (id: string) => void;
  onOpenCreateListing: () => void;
  onLogout: () => void;
}

export default function UserDashboardModal({
  isOpen,
  onClose,
  currentUser,
  userListings,
  onToggleStatus,
  onDeleteListing,
  onOpenCreateListing,
  onLogout,
}: UserDashboardModalProps) {
  const { t } = useLanguage();

  if (!isOpen || !currentUser) return null;

  const myListings = userListings.filter(
    (l) => l.username.toLowerCase() === currentUser.nickname.toLowerCase()
  );

  return (
    <div role="dialog" aria-modal="true" aria-label="Painel de anúncios locais" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-void-900 border border-void-border rounded-lg max-w-2xl w-full p-6 sm:p-8 relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-void-border mb-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-void-800 border border-void-border flex items-center justify-center text-energy-cyan">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-white flex flex-wrap items-center gap-2">
                <span>Painel de Negociações</span>
                <span className="px-2 py-0.5 bg-energy-cyan/20 text-energy-cyan text-xs font-mono">
                  {myListings.filter((l) => l.status === 'active').length} ativas
                </span>
              </h3>
              <p className="text-slate-400 text-xs break-all">
                Tenno: {currentUser.nickname} ({currentUser.platform.toUpperCase()})
              </p>
            </div>
          </div>

          <button
            aria-label="Fechar painel"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-void-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Listings List */}
        <div className="space-y-3 overflow-y-auto pr-1 flex-1 min-h-0">
          {myListings.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-lg bg-void-950 border border-void-border">
              <PackageOpen className="w-10 h-10 text-slate-500 mx-auto mb-2" />
              <h4 className="text-white font-bold text-sm">Nenhum anúncio criado ainda</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Crie um anúncio de exemplo. Ele ficará salvo apenas neste navegador.
              </p>
            </div>
          ) : (
            myListings.map((order) => (
              <div
                key={order.id}
                className={`p-3.5 rounded-lg bg-void-950 border ${
                  order.status === 'active'
                    ? 'border-void-border hover:border-energy-cyan/40'
                    : 'border-slate-800 opacity-60'
                } flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded font-mono ${
                      order.orderType === 'wts'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-cyan-950 text-energy-cyan border border-cyan-800'
                    }`}
                  >
                    {order.orderType.toUpperCase()}
                  </span>
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <span>{order.itemName}</span>
                      <span className="text-xs text-orokin-gold font-normal">({order.componentName})</span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="text-energy-cyan font-mono font-bold">{order.price} Plat</span>
                      <span>•</span>
                      <span>Qtd: {order.quantity}</span>
                      <span>•</span>
                      <span className={order.status === 'active' ? 'text-emerald-400' : 'text-slate-500'}>
                        {order.status === 'active' ? '● ' + order.statusType : '○ Pausado'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => onToggleStatus(order.id)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-void-900 border border-void-border hover:border-slate-500 text-slate-300 hover:text-white transition-all cursor-pointer"
                  >
                    {order.status === 'active' ? 'Pausar' : 'Reativar'}
                  </button>
                  <button
                    onClick={() => onDeleteListing(order.id)}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/60 border border-transparent hover:border-rose-500/30 transition-all cursor-pointer"
                    title="Excluir Anúncio"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-void-border mt-4 flex flex-wrap gap-3 items-center justify-between shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenCreateListing();
            }}
            className="px-4 py-2.5 rounded-lg bg-orokin-gold hover:bg-orokin-light text-void-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Criar anúncio</span>
          </button>
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="px-3.5 py-2 rounded-lg bg-void-950 hover:bg-rose-950 border border-void-border hover:border-rose-500/40 text-slate-400 hover:text-rose-300 font-semibold text-xs transition-all cursor-pointer"
          >
            Sair do perfil
          </button>
        </div>
      </div>
    </div>
  );
}
