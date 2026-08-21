'use client';

import React from 'react';
import { UserCheck, Smartphone, Calculator, CheckCircle2 } from 'lucide-react';

export default function CorePillars() {
  const pillars = [
    {
      icon: UserCheck,
      title: 'Sem Vendedores Fantasmas',
      tag: 'Anti-Fricção',
      color: 'from-rose-500/20 to-rose-500/5',
      borderColor: 'border-rose-500/30',
      iconColor: 'text-rose-400',
      description:
        'Nada de mandar 10 mensagens e ficar no vácuo esperando quem saiu do PC há horas. O VOIDEX prioriza quem realmente está ativo e jogando no momento.',
      benefits: [
        'Status ativo verificado em tempo real',
        'Menos tempo esperando resposta no chat',
        'Negociações fechadas de primeira',
      ],
    },
    {
      icon: Calculator,
      title: 'Decisão: Baro vs Platina',
      tag: 'Economia',
      color: 'from-orokin-gold/20 to-orokin-gold/5',
      borderColor: 'border-orokin-gold/30',
      iconColor: 'text-orokin-gold',
      description:
        'Evite desperdiçar partes Prime valiosas como "junk". O VOIDEX calcula na hora se compensa mais vender para o Baro Ki\'Teer ou no mercado.',
      benefits: [
        'Comparação instantânea de valor',
        'Sugestão do melhor destino para cada item',
        'Mais Platina no seu inventário',
      ],
    },
    {
      icon: Smartphone,
      title: 'Perfeito para Celular e 2ª Tela',
      tag: 'Leve & Limpo',
      color: 'from-energy-cyan/20 to-energy-cyan/5',
      borderColor: 'border-energy-cyan/30',
      iconColor: 'text-energy-cyan',
      description:
        'Desenvolvido para abrir num piscar de olhos enquanto você joga. Sem menus confusos, sem anúncios que travam a tela e sem poluição.',
      benefits: [
        'Carregamento ultrarrápido em < 0.3s',
        'Botões grandes e fáceis de tocar',
        '100% gratuito e sem popups invasivos',
      ],
    },
  ];

  return (
    <section id="pilares" className="py-20 md:py-28 relative bg-void-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-void-900 border border-void-border text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>O que Torna o VOIDEX Melhor</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Trading Sem Perda de Tempo
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Eliminamos tudo o que atrapalha para entregar uma experiência limpa, leve e direta.
          </p>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className={`rounded-2xl bg-gradient-to-b ${pillar.color} bg-void-900/90 border ${pillar.borderColor} p-8 flex flex-col justify-between hover:scale-[1.02] transition-all shadow-xl`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-void-850 border border-void-border flex items-center justify-center shadow-md">
                      <Icon className={`w-6 h-6 ${pillar.iconColor}`} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-void-950/80 border border-void-border text-slate-300 font-mono">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-void-border/50">
                  {pillar.benefits.map((benefit, bIndex) => (
                    <div key={bIndex} className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${pillar.iconColor}`} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
