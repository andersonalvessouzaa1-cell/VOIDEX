'use client';

import React from 'react';
import { ShieldCheck, Lock, AlertTriangle, FileCode2, Check } from 'lucide-react';

export default function SecuritySection() {
  return (
    <section id="seguranca" className="py-20 bg-void-900/50 border-t border-void-border/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Segurança & Diretrizes da Digital Extremes</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Zero Risco de BAN. <span className="text-emerald-400">100% ToS Compliant.</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Sabemos o quanto você valoriza suas milhares de horas e itens raros no Warframe. O VOIDEX opera em total conformidade com as regras oficiais do jogo.
          </p>
        </div>

        {/* Security Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          <div className="p-6 rounded-2xl bg-void-950 border border-emerald-500/30 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Sem Injeção de Código</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                O VOIDEX é uma ferramenta puramente web. Ele não instala softwares, não injeta DLLs e não lê a memória do executável do Warframe.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-void-border text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4" /> 100% Seguro no Anti-Cheat
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-void-950 border border-emerald-500/30 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Zero RMT (Real Money Trading)</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Não intermediamos transações financeiras por itens do jogo nem cobramos taxas de Platina in-game. Todo o trade ocorre manualmente dentro do jogo entre os dois jogadores.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-void-border text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Sem Violação de EULA
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-void-950 border border-emerald-500/30 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                <FileCode2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Padrão de Fã-Site Oficial</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Operamos estritamente sob as diretrizes de Fan Content Policy da Digital Extremes, respeitando marcas registradas e mantendo total transparência com a comunidade.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-void-border text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Foco na Comunidade Tenno
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
