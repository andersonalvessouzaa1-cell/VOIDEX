'use client';

import React, { useState } from 'react';
import { Heart, Zap, Sparkles, Check, Copy, ExternalLink } from 'lucide-react';
import { DONATION_CONFIG } from '@/lib/donation-config';
import { useLanguage } from '@/context/LanguageContext';

export default function CommunitySupport() {
  const { t } = useLanguage();
  const [copiedPix, setCopiedPix] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(DONATION_CONFIG.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  return (
    <section id="apoio" className="py-20 md:py-28 bg-void-950 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-void-900 border border-rose-500/30 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-rose-400/20" />
            <span>{t('supportTag', '100% Gratuito & Sustentado pela Comunidade')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            <span>{t('supportTitle', 'Apoie os')}</span>{' '}
            <span className="text-gradient-gold">{t('supportTitleGradient', 'Servidores do VOIDEX')}</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            {t(
              'supportSubtitle',
              'O VOIDEX é totalmente gratuito para todos os jogadores. Não cobramos taxas in-game e não vendemos recursos essenciais. Para manter a infraestrutura rápida e sem anúncios no ar, contamos com o apoio voluntário da comunidade Tenno.'
            )}
          </p>
        </div>

        {/* Support Options Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          
          {/* Pix Card */}
          <div className="rounded-2xl bg-void-900/90 border border-void-border p-6 text-center hover:border-energy-cyan/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-energy-cyan/10 border border-energy-cyan/30 text-energy-cyan flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{t('pixTitle', 'Pix Direto')}</h3>
              <p className="text-xs text-slate-400 mb-4">
                {t('pixDesc', 'Qualquer valor simbólico ajuda a pagar a hospedagem dos servidores.')}
              </p>
              <div className="mb-6 p-2 rounded-lg bg-void-950 border border-void-border text-[11px] font-mono text-slate-300 truncate">
                {DONATION_CONFIG.pixKey}
              </div>
            </div>
            <button
              onClick={handleCopyPix}
              className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border flex items-center justify-center gap-2 cursor-pointer ${
                copiedPix
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'bg-void-800 hover:bg-energy-cyan hover:text-void-950 text-slate-200 border-void-border'
              }`}
            >
              {copiedPix ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t('copied', 'Chave Copiada!')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t('pixBtn', 'Copiar Chave Pix')}</span>
                </>
              )}
            </button>
          </div>

          {/* Apoia.se Card */}
          <div className="rounded-2xl bg-void-900/90 border border-void-border p-6 text-center hover:border-rose-500/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{t('apoiaTitle', 'Apoia.se')}</h3>
              <p className="text-xs text-slate-400 mb-6">
                {t('apoiaDesc', 'Contribuição mensal recorrente para manter a plataforma sempre atualizada.')}
              </p>
            </div>
            <a
              href={DONATION_CONFIG.apoiaSeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-void-800 hover:bg-rose-500 hover:text-white text-slate-200 text-xs font-bold uppercase tracking-wider transition-all border border-void-border flex items-center justify-center gap-1.5"
            >
              <span>{t('apoiaBtn', 'Acessar Apoia.se')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Patreon Card */}
          <div className="rounded-2xl bg-void-900/90 border border-void-border p-6 text-center hover:border-orokin-gold/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orokin-gold/10 border border-orokin-gold/30 text-orokin-gold flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{t('patreonTitle', 'Patreon')}</h3>
              <p className="text-xs text-slate-400 mb-6">
                {t('patreonDesc', 'Para apoiadores internacionais e membros que querem apoiar o projeto.')}
              </p>
            </div>
            <a
              href={DONATION_CONFIG.patreonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-void-800 hover:bg-orokin-gold hover:text-void-950 text-slate-200 text-xs font-bold uppercase tracking-wider transition-all border border-void-border flex items-center justify-center gap-1.5"
            >
              <span>{t('patreonBtn', 'Acessar Patreon')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
