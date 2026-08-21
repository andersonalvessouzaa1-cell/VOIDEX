'use client';

import React from 'react';
import { XCircle, CheckCircle2, Clock, Zap } from 'lucide-react';

export default function Comparison() {
  const traditionalSteps = [
    'Procurar em listas longas cheias de filtros confusos',
    'Rolar por ofertas de pessoas que já saíram do jogo',
    'Digitar ou copiar mensagens manualmente',
    'Esperar sem resposta e ter que tentar vários outros contatos',
  ];

  const voidexSteps = [
    'Digite o item na busca instantânea',
    'Clique em "Copiar Mensagem" no menor preço verificado',
    'Cole no chat do Warframe (Ctrl + V) e faça o trade',
  ];

  return (
    <section id="comparativo" className="py-20 bg-void-900/40 border-y border-void-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-void-800 border border-void-border text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Economia de Tempo</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Menos Passos. <span className="text-gradient-gold">Mais Velocidade.</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Veja a diferença prática entre o fluxo tradicional e a agilidade do VOIDEX.
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Traditional Flow Card */}
          <div className="rounded-2xl bg-void-950 border border-rose-500/20 p-6 sm:p-8 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-void-border mb-6">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-lg">
                  <XCircle className="w-5 h-5" />
                  <span>O Jeito Tradicional</span>
                </div>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> ~2 a 4 minutos
                </span>
              </div>

              <div className="space-y-4">
                {traditionalSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-rose-950 text-rose-400 border border-rose-800/40 text-xs flex items-center justify-center font-mono shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-void-border/60 text-xs text-rose-400/90 font-medium flex items-center gap-2">
              <span>Resultado: Perda de tempo precioso entre as missões do jogo.</span>
            </div>
          </div>

          {/* VOIDEX Flow Card */}
          <div className="rounded-2xl bg-gradient-to-b from-void-850 to-void-900 border-2 border-energy-cyan/40 p-6 sm:p-8 flex flex-col justify-between shadow-glow-cyan/15 relative">
            <div className="absolute -top-3.5 right-6 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-energy-cyan to-energy-glow text-void-950 text-[11px] font-extrabold uppercase tracking-wider shadow-md">
              Com o VOIDEX
            </div>

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-void-border mb-6">
                <div className="flex items-center gap-2 text-energy-cyan font-bold text-lg">
                  <Zap className="w-5 h-5" />
                  <span>Direto ao Ponto</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> ~15 segundos
                </span>
              </div>

              <div className="space-y-5">
                {voidexSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm text-slate-200 font-medium">
                    <span className="w-6 h-6 rounded-full bg-energy-cyan text-void-950 text-xs flex items-center justify-center font-bold font-mono shrink-0 mt-0.5 shadow-glow-cyan/40">
                      {index + 1}
                    </span>
                    <span className="leading-snug text-slate-100">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-energy-cyan/30 text-xs text-emerald-300 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Resultado: Negociação concluída rapidamente e sem stress.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
