'use client';

import React, { useState } from 'react';
import { User, Lock, Globe, X, Check, UserPlus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
  initialMode?: 'register' | 'login';
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess, initialMode = 'register' }: AuthModalProps) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'register' | 'login'>(initialMode);
  const [nickname, setNickname] = useState('');
  const [platform, setPlatform] = useState('pc');
  const [crossplay, setCrossplay] = useState(true);
  const [pin, setPin] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !pin.trim()) return;

    const user = {
      nickname: nickname.trim(),
      platform,
      crossplay,
      reputation: 15,
      joinedAt: new Date().toISOString()
    };

    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-void-900 border border-energy-cyan/40 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-void-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-energy-cyan/10 border border-energy-cyan/40 text-energy-cyan flex items-center justify-center mx-auto mb-3 shadow-glow-cyan/20">
            <UserPlus className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            {mode === 'register' ? 'Criar Conta Tenno' : 'Entrar na Conta Tenno'}
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            Conecte seu Nickname do Warframe para postar anúncios de compra e venda.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-void-950 rounded-xl border border-void-border mb-5">
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-energy-cyan text-void-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Cadastrar
          </button>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-energy-cyan text-void-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Entrar (Login)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Nickname Oficial no Warframe <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4 text-energy-cyan" />
              </div>
              <input
                type="text"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Ex: ExcaliburPrime_BR"
                className="w-full pl-9 pr-4 py-2.5 bg-void-950 border border-void-border rounded-xl text-white placeholder-slate-600 text-sm focus:border-energy-cyan focus:outline-none"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Digite exatamente o seu nome no jogo para os whispers funcionarem.</p>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Plataforma Principal <span className="text-rose-400">*</span>
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-3 py-2.5 bg-void-950 border border-void-border rounded-xl text-slate-200 text-sm focus:border-energy-cyan focus:outline-none"
                >
                  <option value="pc">PC (Steam / Epic / Standalone)</option>
                  <option value="playstation">PlayStation (PS5 / PS4)</option>
                  <option value="xbox">Xbox Series X|S / Xbox One</option>
                  <option value="switch">Nintendo Switch</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-void-950 border border-void-border">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-xs font-bold text-white">Cross-Play Ativado no Jogo</div>
                    <div className="text-[10px] text-slate-400">Permite negociar com todas as plataformas</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={crossplay}
                  onChange={(e) => setCrossplay(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 bg-void-900 border-void-border focus:ring-0 cursor-pointer"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Senha / PIN de Acesso (4 a 8 dígitos) <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4 text-energy-cyan" />
              </div>
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full pl-9 pr-4 py-2.5 bg-void-950 border border-void-border rounded-xl text-white placeholder-slate-600 text-sm focus:border-energy-cyan focus:outline-none font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-energy-cyan to-energy-glow text-void-950 font-extrabold uppercase tracking-wider text-xs rounded-xl shadow-glow-cyan hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <Check className="w-4 h-4" />
            <span>{mode === 'register' ? 'Concluir Cadastro' : 'Acessar VOIDEX'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
