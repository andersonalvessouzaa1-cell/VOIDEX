'use client';

import React, { useState } from 'react';
import { User, Globe, X, Check, UserPlus } from 'lucide-react';
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


  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;

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
    <div role="dialog" aria-modal="true" aria-label="Perfil local" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-void-900 border border-energy-cyan/40 rounded-lg max-w-md w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          aria-label="Fechar perfil"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-void-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-lg bg-energy-cyan/10 border border-energy-cyan/40 text-energy-cyan flex items-center justify-center mx-auto mb-3">
            <UserPlus className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            {mode === 'register' ? 'Criar perfil local' : 'Usar perfil local'}
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            Perfil de demonstração salvo neste navegador. Não verifica sua identidade nem conecta à conta do Warframe. Não informe sua senha.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-void-950 rounded-lg border border-void-border mb-5">
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-energy-cyan text-void-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Novo perfil
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
            Usar nickname
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="profile-nickname" className="block text-xs font-bold text-slate-300 mb-1">
              Nickname Oficial no Warframe <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4 text-energy-cyan" />
              </div>
              <input
                id="profile-nickname"
                name="nickname"
                autoComplete="nickname"
                spellCheck={false}
                type="text"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Ex: ExcaliburPrime_BR"
                className="w-full pl-9 pr-4 py-2.5 bg-void-950 border border-void-border rounded-lg text-white placeholder-slate-600 text-sm focus:border-energy-cyan focus:outline-none"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Digite exatamente o seu nome no jogo para os whispers funcionarem.</p>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label htmlFor="profile-platform" className="block text-xs font-bold text-slate-300 mb-1">
                  Plataforma Principal <span className="text-rose-400">*</span>
                </label>
                <select
                  id="profile-platform"
                  name="platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-3 py-2.5 bg-void-950 border border-void-border rounded-lg text-slate-200 text-sm focus:border-energy-cyan focus:outline-none"
                >
                  <option value="pc">PC (Steam / Epic / Standalone)</option>
                  <option value="playstation">PlayStation (PS5 / PS4)</option>
                  <option value="xbox">Xbox Series X|S / Xbox One</option>
                  <option value="switch">Nintendo Switch</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-void-950 border border-void-border">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <div>
                    <label htmlFor="profile-crossplay" className="text-xs font-bold text-white">Cross-Play Ativado no Jogo</label>
                    <div className="text-[10px] text-slate-400">Preferência declarada; compatibilidade não verificada</div>
                  </div>
                </div>
                <input
                  id="profile-crossplay"
                  name="crossplay"
                  type="checkbox"
                  checked={crossplay}
                  onChange={(e) => setCrossplay(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 bg-void-900 border-void-border focus:ring-0 cursor-pointer"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-energy-cyan text-void-950 font-extrabold text-xs rounded-lg shadow-glow-cyan hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <Check className="w-4 h-4" />
            <span>Salvar perfil local</span>
          </button>
        </form>
      </div>
    </div>
  );
}
