'use client';

import React from 'react';
import { UserCheck, Smartphone, Calculator, CheckCircle2 } from 'lucide-react';

export default function CorePillars() {
  const pillars = [
    { icon: UserCheck, title: 'Organize anúncios locais', accent: 'border-energy-cyan', iconColor: 'text-energy-cyan',
      description: 'Crie, pause, reative e exclua anúncios demonstrativos neste navegador. O status é informado por você e não verifica presença no jogo.',
      benefits: ['Status demonstrativo', 'Anúncios salvos neste navegador', 'Sem envio a outros jogadores'] },
    { icon: Calculator, title: 'Compare Ducats e Platina', accent: 'border-orokin-gold', iconColor: 'text-orokin-gold',
      description: 'Veja a relação entre Ducats e o preço de exemplo do componente escolhido. Essa relação não determina o melhor destino para o item.',
      benefits: ['Comparação instantânea de valor', 'Relação por componente', 'Sem promessa de lucro'] },
    { icon: Smartphone, title: 'Perfeito para Celular e 2ª Tela', accent: 'border-energy-cyan', iconColor: 'text-energy-cyan',
      description: 'Desenvolvido para abrir num piscar de olhos enquanto você joga. Sem menus confusos, sem anúncios que travam a tela e sem poluição.',
      benefits: ['Interface adaptada a telas pequenas', 'Botões grandes e fáceis de tocar', '100% gratuito e sem popups invasivos'] },
  ];

  return (
    <section id="pilares" className="py-20 md:py-28 bg-void-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <h2 className="font-display font-extrabold leading-none text-4xl sm:text-6xl text-white">Trading sem perda de tempo</h2>
          <p className="mt-4 text-slate-300 text-lg">O Acervo Void elimina o que atrapalha para entregar uma experiência limpa, leve e direta.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
          {pillars.map(({ icon: Icon, title, accent, iconColor, description, benefits }) => (
            <article key={title} className={`border-t-2 ${accent} pt-6`}>
              <Icon className={`w-7 h-7 ${iconColor}`} aria-hidden="true" />
              <h3 className="mt-5 font-display font-bold text-3xl leading-tight text-white">{title}</h3>
              <p className="mt-3 text-slate-300 leading-relaxed">{description}</p>
              <ul className="mt-6 space-y-2.5">
                {benefits.map(b => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${iconColor}`} aria-hidden="true" /><span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
