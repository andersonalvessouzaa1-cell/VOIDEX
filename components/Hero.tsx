'use client';

import React from 'react';
import { Search, ClipboardCopy, Swords, Gamepad2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  // Sequência real do produto: consultar, copiar, negociar no jogo.
  const steps = [
    { Icon: Search, title: t('heroStep1', 'Consulte ofertas'), text: t('heroStep1Text', 'Preços públicos do Warframe Market, por plataforma e Cross-Play.') },
    { Icon: ClipboardCopy, title: t('heroStep2', 'Copie a mensagem'), text: t('heroStep2Text', 'O whisper sai pronto para colar no chat do jogo.') },
    { Icon: Swords, title: t('heroStep3', 'Negocie no jogo'), text: t('heroStep3Text', 'A troca é manual. O Acervo Void não acessa sua conta.') },
  ];

  return (
    <section className="relative pt-14 pb-20 md:pt-24 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <h1 className="font-display font-extrabold text-white leading-[0.95] tracking-tight text-6xl sm:text-8xl lg:text-[7rem]">
            {t('heroTitle1', 'Trading no Warframe')} {t('heroTitleGradient', 'em demonstração.')}
          </h1>
          <p className="mt-5 text-xl sm:text-2xl font-display font-bold text-slate-400 leading-tight">
            {t('heroTitle2', 'Em qualquer plataforma. Sem enrolação.')}
          </p>
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
            {t(
              'heroSubtitle',
              'Consulte ofertas públicas do Warframe Market e experimente a primeira versão do Build Lab. Anúncios próprios continuam locais; o Acervo Void não acessa sua conta nem executa trocas.'
            )}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a
              href="#mercado-real"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-void-950 bg-energy-cyan rounded-md hover:brightness-110 active:brightness-95 transition"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              <span>{t('btnTest', 'Buscar itens agora')}</span>
            </a>
            <a
              href="#sugestoes-ia"
              className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-slate-100 border border-void-border rounded-md hover:bg-void-850 transition"
            >
              {t('btnAiSuggestions', 'Sugerir melhorias')}
            </a>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2"><Gamepad2 className="w-4 h-4 text-energy-cyan" aria-hidden="true" />{t('heroTag', 'Cross-Play: Feito para PC, PlayStation, Xbox & Switch')}</li>
            <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-energy-cyan" aria-hidden="true" />{t('badgeAntiBan', 'Sem acesso à conta do jogo')}</li>
          </ul>
        </div>

        <div className="chamfer" style={{ '--chamfer': '22px' } as React.CSSProperties}>
          <div className="chamfer-in p-7 sm:p-9" style={{ '--chamfer': '21px' } as React.CSSProperties}>
            <h2 className="font-display font-bold text-2xl text-white">{t('heroPanelTitle', 'Do preço à negociação')}</h2>
            <ol className="mt-6 space-y-6">
              {steps.map(({ Icon, title, text }, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 grid place-items-center w-10 h-10 rounded-md bg-void-800 text-energy-cyan">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm text-slate-400 leading-relaxed">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
