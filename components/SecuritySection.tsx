'use client';

import React, { type CSSProperties } from 'react';
import { Lock, AlertTriangle, FileCode2, Check } from 'lucide-react';

const items = [
  { icon: Lock, title: 'Sem injeção de código', note: 'Funciona no navegador',
    text: 'O Acervo Void é uma ferramenta puramente web. Ele não instala softwares, não injeta DLLs e não lê a memória do executável do Warframe.' },
  { icon: AlertTriangle, title: 'Zero RMT (Real Money Trading)', note: 'Não executa trocas',
    text: 'Não intermediamos transações financeiras por itens do jogo nem cobramos taxas de Platina in-game. Todo o trade ocorre manualmente dentro do jogo entre os dois jogadores.' },
  { icon: FileCode2, title: 'Projeto independente de fãs', note: 'Foco na comunidade Tenno',
    text: 'Warframe e suas marcas pertencem aos respectivos titulares. Preços e vendedores desta demonstração são exemplos, e os perfis locais não verificam identidade.' },
];

export default function SecuritySection() {
  return (
    <section id="seguranca" className="py-20 md:py-28 bg-void-900 border-t border-void-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="font-display font-extrabold leading-none text-4xl sm:text-6xl text-white">Uma ferramenta web, sem acesso à sua conta</h2>
          <p className="mt-2 text-sm text-slate-400">Como funciona esta demonstração</p>
          <p className="mt-4 text-slate-300 text-lg">O Acervo Void é um projeto independente de demonstração. Não possui aprovação oficial da Digital Extremes e não oferece garantia contra penalidades no jogo.</p>
        </div>
        <div className="chamfer" style={{ '--chamfer': '24px' } as CSSProperties}>
          <div className="chamfer-in grid md:grid-cols-3 md:divide-x divide-y md:divide-y-0 divide-void-border" style={{ '--chamfer': '23px' } as CSSProperties}>
            {items.map(({ icon: Icon, title, text, note }) => (
              <div key={title} className="p-7 sm:p-8">
                <Icon className="w-6 h-6 text-energy-cyan" aria-hidden="true" />
                <h3 className="mt-4 font-display font-bold text-2xl text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">{text}</p>
                <p className="mt-5 flex items-center gap-1.5 text-sm text-slate-400"><Check className="w-4 h-4 text-energy-cyan" aria-hidden="true" />{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
