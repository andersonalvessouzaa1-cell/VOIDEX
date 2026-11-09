'use client';

import React, { type CSSProperties } from 'react';
import { XCircle, CheckCircle2, Clock } from 'lucide-react';

const traditionalSteps = [
  'Procurar em listas longas cheias de filtros confusos',
  'Rolar por ofertas de pessoas que já saíram do jogo',
  'Digitar ou copiar mensagens manualmente',
  'Esperar sem resposta e ter que tentar vários outros contatos',
];
const voidexSteps = [
  'Digite o item na busca instantânea',
  'Copie a mensagem de um anúncio de exemplo',
  'Revise o texto; o protótipo não executa a troca',
];

export default function Comparison() {
  return (
    <section id="comparativo" className="py-20 md:py-28 bg-void-950 border-t border-void-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="font-display font-extrabold leading-none text-4xl sm:text-6xl text-white">Menos passos entre a busca e a mensagem</h2>
          <p className="mt-4 text-slate-300 text-lg">Veja a diferença prática entre o fluxo tradicional e o do Acervo Void.</p>
        </div>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start">
          <div>
            <h3 className="flex items-center gap-2 font-display font-bold text-2xl text-slate-300"><XCircle className="w-5 h-5 text-slate-500" aria-hidden="true" />O jeito tradicional</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><Clock className="w-3.5 h-3.5" aria-hidden="true" />Tempo variável</p>
            <ol className="mt-6 space-y-4 list-decimal pl-5 marker:text-slate-500 text-slate-400">
              {traditionalSteps.map(step => <li key={step} className="pl-1 leading-snug">{step}</li>)}
            </ol>
            <p className="mt-6 text-sm text-slate-400">Resultado: perda de tempo precioso entre as missões do jogo.</p>
          </div>
          <div className="chamfer" style={{ '--chamfer': '22px' } as CSSProperties}>
            <div className="chamfer-in p-7 sm:p-9" style={{ '--chamfer': '21px' } as CSSProperties}>
              <h3 className="font-display font-bold text-3xl text-white">Com o Acervo Void</h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-energy-cyan"><Clock className="w-3.5 h-3.5" aria-hidden="true" />Fluxo demonstrativo</p>
              <ol className="mt-6 space-y-5">
                {voidexSteps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-slate-100">
                    <span className="shrink-0 grid place-items-center w-7 h-7 rounded-md bg-energy-cyan text-void-950 text-sm font-bold">{i + 1}</span>
                    <span className="leading-snug pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 pt-5 border-t border-void-border flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-energy-cyan" aria-hidden="true" />Resultado: mensagem preparada para revisão e uso manual.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
