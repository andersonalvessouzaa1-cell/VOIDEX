'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, MessageSquare, Shield } from 'lucide-react';

export default function EarlyAccessForm() {
  const [identifier, setIdentifier] = useState('');
  const [platform, setPlatform] = useState('PC');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="early-access" className="py-20 md:py-28 relative bg-void-gradient border-t border-void-border overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-energy-cyan/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-void-850 border border-energy-cyan/30 text-energy-cyan text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-cyan/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vagas Limitadas para o Alpha Fechado</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
          Seja um dos Primeiros a Usar o <span className="text-gradient-cyan">VOIDEX</span>
        </h2>
        
        <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          Cadastre seu E-mail ou Discord para receber o link de acesso antecipado antes do lançamento público e garantir o emblema de <strong>Fundador VIP</strong>.
        </p>

        {/* Form Container */}
        <div className="mt-10 max-w-xl mx-auto bg-void-900/90 border border-void-border p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Acesso VIP Reservado!</h3>
              <p className="text-sm text-slate-300">
                Obrigado, Tenno. Você foi adicionado à lista de pioneiros do <strong>VOIDEX: Market Intelligence</strong>. Fique atento às notificações!
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setIdentifier('');
                  }}
                  className="text-xs text-energy-cyan hover:underline font-mono"
                >
                  Cadastrar outro e-mail / Discord
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              
              {/* Identifier Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Seu E-mail ou Usuário do Discord
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="ex: seuemail@dominio.com ou tenno#1234"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-void-950 border border-void-border text-white placeholder-slate-500 focus:outline-none focus:border-energy-cyan focus:ring-1 focus:ring-energy-cyan text-sm font-medium transition-all"
                  />
                </div>
              </div>

              {/* Platform Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Plataforma Principal de Jogo
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {['PC (Steam/DE)', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile / iOS'].map((plat) => (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => setPlatform(plat)}
                      className={`py-2 px-2 text-center rounded-lg text-xs font-semibold transition-all truncate ${
                        platform === plat
                          ? 'bg-energy-cyan text-void-950 font-bold shadow-glow-cyan/40'
                          : 'bg-void-950 border border-void-border text-slate-400 hover:text-white hover:border-slate-600'
                      }`}
                    >
                      {plat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-energy-cyan to-energy-glow text-void-950 text-sm font-extrabold uppercase tracking-wider hover:opacity-95 shadow-glow-cyan flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Processando...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Garantir Meu Acesso VIP Gratuito
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center pt-2">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>Zero spam. Seus dados nunca serão compartilhados com terceiros.</span>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
