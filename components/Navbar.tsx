'use client';

import React, { useState } from 'react';
import { Zap, Heart, Gamepad2, Sparkles, Menu, X } from 'lucide-react';
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
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-void-800 to-void-900 border border-energy-cyan/40 flex items-center justify-center shadow-glow-cyan/20 group-hover:border-energy-cyan transition-all">
                <Zap className="w-5 h-5 text-energy-cyan group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider text-slate-100 flex items-center gap-1.5 font-mono">
                  VOIDEX
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-energy-cyan animate-pulse"></span>
                </span>
                <span className="text-[10px] tracking-[0.2em] font-semibold text-orokin-gold uppercase">
                  Market Intelligence
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#demo" className="hover:text-energy-cyan transition-colors">
              {t('navDemo', 'Testar Cotação')}
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
              {t('navAiFeedback', 'Sugestões & IA')}
            </a>
            <a href="#apoio" className="hover:text-rose-400 flex items-center gap-1.5 transition-colors">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              {t('navSupport', 'Apoiar Servidores')}
            </a>
          </nav>

          {/* Right Controls: Language Selector & CTA */}
          <div className="flex items-center gap-3">
            <LanguageSelector />

            <div className="hidden sm:flex items-center">
              <a
                href="#demo"
                className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-void-950 bg-gradient-to-r from-energy-cyan to-energy-glow rounded-lg shadow-glow-cyan/50 hover:opacity-95 hover:shadow-glow-cyan transition-all"
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
          <a
            href="#demo"
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
            {t('navAiFeedback', 'Sugestões & IA')}
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
              href="#demo"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-3 text-sm font-bold uppercase tracking-wider text-void-950 bg-gradient-to-r from-energy-cyan to-energy-glow rounded-md shadow-glow-cyan"
            >
              {t('navActionStart', 'Buscar Agora')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
