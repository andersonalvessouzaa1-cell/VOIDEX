'use client';

import React from 'react';
import { Zap, ShieldCheck, Gamepad2, Sparkles, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-pattern">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-energy-cyan/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-orokin-gold/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-void-900 border border-energy-cyan/30 text-energy-cyan text-xs font-semibold uppercase tracking-wider mb-6 shadow-glow-cyan/20">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>{t('heroTag', 'Cross-Play: Feito para PC, PlayStation, Xbox & Switch')}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          <span>{t('heroTitle1', 'Trading no Warframe')}</span>{' '}
          <span className="text-gradient-cyan block sm:inline">{t('heroTitleGradient', 'em Segundos.')}</span>
          <br />
          <span className="text-slate-300 text-3xl sm:text-5xl font-bold">
            {t('heroTitle2', 'Em qualquer plataforma. Sem enrolação.')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t(
            'heroSubtitle',
            'O VOIDEX sincroniza com a base de dados oficial do Warframe e conecta você ao menor preço ativo com fricção zero, sem menus poluídos e sem vendedores ausentes.'
          )}
        </p>

        {/* Feature Badges */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-void-900 border border-void-border">
            <Zap className="w-4 h-4 text-energy-cyan" />
            <span>{t('badgeWhisper', '1-Click Whisper (PC)')}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-void-900 border border-void-border">
            <Gamepad2 className="w-4 h-4 text-orokin-gold" />
            <span>{t('badgeConsole', 'Modo Console Rápido')}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-void-900 border border-emerald-500/30 text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t('badgeAntiBan', '100% Anti-Ban (DE ToS Safe)')}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-void-900 border border-void-border">
            <Sparkles className="w-4 h-4 text-orokin-gold" />
            <span>{t('badgeFree', '100% Gratuito')}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider text-void-950 bg-gradient-to-r from-energy-cyan to-energy-glow rounded-lg shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Search className="w-4 h-4" />
            <span>{t('btnTest', 'Buscar Itens Agora')}</span>
          </a>
          <a
            href="#sugestoes-ia"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-slate-200 bg-void-900/80 hover:bg-void-850 border border-void-border hover:border-slate-600 rounded-lg transition-all"
          >
            <Sparkles className="w-4 h-4 text-energy-cyan" />
            <span>{t('btnAiSuggestions', 'Sugerir Melhorias (IA)')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
