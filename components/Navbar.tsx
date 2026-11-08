'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Gamepad2, Sparkles, Menu, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-void-950/80 border-b border-void-border/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <svg viewBox="0 0 120 120" className="w-10 h-10 shrink-0" aria-hidden="true" fill="none"><polygon points="36,4 84,4 116,36 116,84 84,116 36,116 4,84 4,36" fill="#000000" stroke="#00FF41" strokeWidth="3" strokeLinejoin="miter"/> <polygon points="44,22 76,22 98,44 98,76 76,98 44,98 22,76 22,44" stroke="#008F11" strokeWidth="2" strokeLinejoin="miter"/> <polygon points="52,40 68,40 80,52 80,68 68,80 52,80 40,68 40,52" stroke="#00FF41" strokeWidth="2" strokeLinejoin="miter"/> <rect x="56" y="56" width="8" height="8" fill="#00FF41"/> <path d="M70 50L98 22M80 22H98V40M50 70L22 98M40 98H22V80" stroke="#DFFBE3" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter"/></svg>
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-extrabold tracking-wide text-white flex items-center leading-none">
                  Acervo Void

                </span>
                <span className="text-xs text-slate-400">
                  Market Intelligence
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-4 text-sm font-medium text-slate-300">
            <a href="#build-lab" className="hover:text-energy-cyan transition-colors">Build Lab</a>
            <a href="/mercado" className="hover:text-energy-cyan transition-colors">
              Mercado
            </a>
            <a href="#solucoes-crossplay" className="hover:text-orokin-gold flex items-center gap-1.5 transition-colors">
              <Gamepad2 className="w-4 h-4 text-orokin-gold" />
              {t('navCrossplay', 'PC & Consoles')}
            </a>
            <a href="#pilares" className="hover:text-energy-cyan transition-colors">
              {t('navPillars', 'Vantagens')}
            </a>
            <a href="#comparativo" className="hover:text-energy-cyan transition-colors">
              {t('navComparison', 'Comparativo')}
            </a>
            <a href="#sugestoes-ia" className="hover:text-energy-cyan flex items-center gap-1.5 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-energy-cyan" />
              {t('navAiFeedback', 'Sugestões')}
            </a>
            <a href="#apoio" className="hover:text-rose-400 flex items-center gap-1.5 transition-colors">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              {t('navSupport', 'Apoiar Servidores')}
            </a>
          </nav>

          {/* Right Controls: Language Selector & CTA */}
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link href="/conta" className="min-h-10 px-2 py-2 text-sm text-energy-cyan hover:underline">Conta</Link>

            <div className="hidden sm:flex items-center">
              <a
                href="/mercado"
                className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-void-950 bg-energy-cyan rounded-lg hover:opacity-95 hover:shadow-glow-cyan transition-all"
              >
                {t('navActionStart', 'Buscar Agora')}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-void-850"
                aria-label="Abrir menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-void-900/95 border-b border-void-border px-4 pt-3 pb-6 space-y-3 backdrop-blur-lg">
          <a href="/mercado" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-void-800">Mercado</a>
          <a href="#build-lab" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-void-800">Build Lab</a>
          <a
            href="/mercado"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-void-800"
          >
            {t('navDemo', 'Testar Cotação')}
          </a>
          <a
            href="#solucoes-crossplay"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-orokin-gold hover:bg-void-800"
          >
            {t('navCrossplay', 'Solução PC & Consoles')}
          </a>
          <a
            href="#pilares"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-void-800"
          >
            {t('navPillars', 'Vantagens')}
          </a>
          <a
            href="#comparativo"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-void-800"
          >
            {t('navComparison', 'Comparativo')}
          </a>
          <a
            href="#sugestoes-ia"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-energy-cyan hover:bg-void-800"
          >
            {t('navAiFeedback', 'Sugestões')}
          </a>
          <a
            href="#apoio"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-rose-400 hover:bg-void-800"
          >
            {t('navSupport', 'Apoiar Servidores')}
          </a>
          <div className="pt-2">
            <a
              href="/mercado"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-3 text-sm font-semibold text-void-950 bg-energy-cyan rounded-md shadow-glow-cyan"
            >
              {t('navActionStart', 'Buscar Agora')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
