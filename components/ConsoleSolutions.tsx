'use client';

import React from 'react';
import { Smartphone, UserCheck, Globe, Check } from 'lucide-react';

const solutions = [
  { icon: Smartphone, title: 'Segunda tela no celular', note: 'Cópia de texto no navegador',
    text: 'Consulte itens e copie texto pelo navegador do celular. O Acervo Void não envia mensagens para aplicativos de console; confira onde você pode colar o texto antes de usá-lo.' },
  { icon: UserCheck, title: 'Nick em destaque fácil', note: 'Digitação rápida no controle',
    text: 'Se preferir usar o controle, o Acervo Void destaca apenas o nickname limpo, para você digitar só o nome do jogador no chat do jogo, sem escrever frases longas.' },
  { icon: Globe, title: 'Seleção de plataforma', note: 'Compatibilidade não verificada',
    text: 'A seleção adapta os botões de mensagem e nickname. Ela não verifica Cross-Play, Cross-Save ou compatibilidade de troca entre jogadores.' },
];

export default function ConsoleSolutions() {
  return (
    <section id="solucoes-crossplay" className="py-20 md:py-28 bg-void-950 border-t border-void-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
        <div className="lg:sticky lg:top-28 self-start">
          <h2 className="font-display font-extrabold leading-none text-4xl sm:text-6xl text-white">Negociar pelo console sem sofrer com o teclado</h2>
          <p className="mt-5 text-slate-300 text-lg leading-relaxed">Digitar no teclado virtual do PlayStation, Xbox ou Switch com o direcional do controle é lento. Estas três soluções ajudam a negociar pelo celular ou pela TV.</p>
        </div>
        <ul className="divide-y divide-void-border border-y border-void-border">
          {solutions.map(({ icon: Icon, title, text, note }) => (
            <li key={title} className="flex gap-5 py-8">
              <span className="shrink-0 grid place-items-center w-11 h-11 rounded-md bg-void-850 text-energy-cyan"><Icon className="w-5 h-5" aria-hidden="true" /></span>
              <div>
                <h3 className="font-display font-bold text-2xl text-white">{title}</h3>
                <p className="mt-2 text-slate-300 leading-relaxed">{text}</p>
                <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-400"><Check className="w-4 h-4 text-energy-cyan" aria-hidden="true" />{note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
