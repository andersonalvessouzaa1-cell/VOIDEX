'use client';

import React from 'react';
import { Smartphone, UserCheck, Globe, Check, Gamepad2 } from 'lucide-react';

export default function ConsoleSolutions() {
  return (
    <section id="solucoes-crossplay" className="py-20 bg-void-950 border-t border-void-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-void-900 border border-orokin-gold/30 text-orokin-gold text-xs font-semibold uppercase tracking-wider mb-3">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Inovação para quem joga no Sofá</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Como o VOIDEX resolve a dor de quem joga em <span className="text-gradient-gold">Consoles</span>?
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Digitar no teclado virtual do PlayStation, Xbox ou Switch com o direcional do controle é horrível. Criamos 3 soluções diretas para você negociar rápido pelo celular ou TV.
          </p>
        </div>

        {/* 3 Console Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Solution 1: Companion App */}
          <div className="p-6 sm:p-8 rounded-2xl bg-void-900 border border-void-border hover:border-energy-cyan/40 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-energy-cyan/10 border border-energy-cyan/30 text-energy-cyan flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Segunda Tela no Celular</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Abra o VOIDEX no celular ao lado do sofá. Ao copiar a mensagem, você pode usar o teclado do <strong>PS App</strong> ou <strong>Xbox App</strong> no smartphone para colar direto no chat da TV com 1 toque!
              </p>
            </div>
            <div className="pt-4 border-t border-void-border text-xs text-energy-cyan font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Compatível com PS App / Xbox App
            </div>
          </div>

          {/* Solution 2: Nick in Big Highlight */}
          <div className="p-6 sm:p-8 rounded-2xl bg-void-900 border border-void-border hover:border-orokin-gold/40 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orokin-gold/10 border border-orokin-gold/30 text-orokin-gold flex items-center justify-center mb-6">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Nick em Destaque Fácil</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Se preferir usar o controle, o VOIDEX destaca apenas o <strong>Nickname limpo</strong> em destaque para você digitar apenas o nome do jogador no chat do jogo, sem ter que escrever frases longas.
              </p>
            </div>
            <div className="pt-4 border-t border-void-border text-xs text-orokin-gold font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Digitação rápida no controle
            </div>
          </div>

          {/* Solution 3: Cross-Play Filter */}
          <div className="p-6 sm:p-8 rounded-2xl bg-void-900 border border-void-border hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Filtro de Cross-Play Ativo</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Mostra apenas vendedores que possuem <strong>Cross-Play e Cross-Save</strong> ativados, garantindo que qualquer jogador de console consiga negociar com jogadores de PC ou outros videogames.
              </p>
            </div>
            <div className="pt-4 border-t border-void-border text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4" /> 100% de trades compatíveis
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
