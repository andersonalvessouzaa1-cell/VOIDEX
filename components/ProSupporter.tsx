'use client';

import React from 'react';
import { Sparkles, Heart, BellRing, BarChart3, ShieldCheck, Check, Coffee } from 'lucide-react';

export default function ProSupporter() {
  return (
    <section id="pro" className="py-20 md:py-28 bg-void-950 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orokin-gold/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-void-900 border border-orokin-gold/30 text-orokin-gold text-xs font-semibold uppercase tracking-wider mb-3 shadow-glow-gold/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modelo Sustentável & 100% Legal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            VOIDEX Pro & <span className="text-gradient-gold">Apoio da Comunidade</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Sem taxas arbitrárias sobre seus trades no jogo. Mantemos você <strong className="text-white">100% seguro contra banimentos</strong> através de um modelo de apoio voluntário e recursos de inteligência avançada.
          </p>
        </div>

        {/* Pricing & Supporter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          
          {/* Free Tier */}
          <div className="rounded-2xl bg-void-900/80 border border-void-border p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Gratuito para Sempre</span>
                <span className="px-2.5 py-0.5 rounded bg-void-800 text-slate-300 text-xs font-mono">R$ 0</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">VOIDEX Free</h3>
              <p className="text-slate-300 text-sm mb-6">
                Todas as ferramentas fundamentais para nunca mais perder tempo negociando.
              </p>

              <div className="space-y-3 pt-4 border-t border-void-border">
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <Check className="w-4 h-4 text-energy-cyan shrink-0" />
                  <span>Busca e cotação instantânea ilimitada</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <Check className="w-4 h-4 text-energy-cyan shrink-0" />
                  <span>1-Click Whispers formatados</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <Check className="w-4 h-4 text-energy-cyan shrink-0" />
                  <span>Filtro de sellers online e ativos</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <Check className="w-4 h-4 text-energy-cyan shrink-0" />
                  <span>Calculadora expressa Ducats x Platina</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="#demo"
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-void-800 hover:bg-void-700 text-slate-200 text-sm font-semibold transition-all border border-void-border"
              >
                Usar Versão Gratuita
              </a>
            </div>
          </div>

          {/* Pro / Supporter Tier */}
          <div className="rounded-2xl bg-gradient-to-b from-void-850 to-void-900 border-2 border-orokin-gold/50 p-8 flex flex-col justify-between shadow-glow-gold/15 relative">
            <div className="absolute -top-3.5 right-6 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-orokin-light to-orokin-gold text-void-950 text-[11px] font-extrabold uppercase tracking-wider shadow-md">
              Apoie o Projeto
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-orokin-gold font-mono flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Market Intelligence Pro
                </span>
                <span className="px-2.5 py-0.5 rounded bg-orokin-gold/10 text-orokin-gold text-xs font-bold font-mono">
                  Simbólico
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">VOIDEX Pro / Supporter</h3>
              <p className="text-slate-300 text-sm mb-6">
                Para Tenno que negociam pesado e querem inteligência preditiva em primeira mão.
              </p>

              <div className="space-y-3 pt-4 border-t border-void-border">
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <Check className="w-4 h-4 text-orokin-gold shrink-0" />
                  <span className="font-semibold text-white">Alertas de Preço em Tempo Real no Discord / Telegram</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <Check className="w-4 h-4 text-orokin-gold shrink-0" />
                  <span>Histórico avançado de tendências e flutuação de Vault</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <Check className="w-4 h-4 text-orokin-gold shrink-0" />
                  <span>Navegação 100% livre de qualquer anúncio</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <Check className="w-4 h-4 text-orokin-gold shrink-0" />
                  <span>Emblema e tema exclusivo Orokin Gold no perfil</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <Check className="w-4 h-4 text-orokin-gold shrink-0" />
                  <span>Acesso prioritário a novas ferramentas e canais VIP</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="#early-access"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-orokin-gold to-orokin-dark text-void-950 text-sm font-bold uppercase tracking-wider hover:opacity-90 shadow-glow-gold transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Garantir Benefícios Pro
              </a>
            </div>
          </div>

        </div>

        {/* Crowdfunding Support Banner */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-void-900 border border-void-border p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 text-rose-400 fill-rose-400/20" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Prefere fazer uma doação avulsa?</h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Você pode apoiar o desenvolvimento e manutenção dos servidores via Apoia-se, Patreon ou Pix direto.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-3.5 py-2 rounded-lg bg-void-800 border border-void-border text-xs font-mono text-slate-300">
              Pix
            </span>
            <span className="px-3.5 py-2 rounded-lg bg-void-800 border border-void-border text-xs font-mono text-slate-300">
              Apoia-se
            </span>
            <span className="px-3.5 py-2 rounded-lg bg-void-800 border border-void-border text-xs font-mono text-slate-300">
              Patreon
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
