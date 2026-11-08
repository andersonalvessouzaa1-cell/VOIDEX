'use client';

import React, { useState } from 'react';
import { Heart, Zap, Sparkles, Check, Copy, ExternalLink } from 'lucide-react';
import { copyText } from '@/lib/browser-actions';
import { DONATION_CONFIG } from '@/lib/donation-config';
import { useLanguage } from '@/context/LanguageContext';

export default function CommunitySupport() {
  const { t } = useLanguage();
  const [copiedPix, setCopiedPix] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const handleCopyPix = async () => {
    setCopiedPix(false);
    setCopyError(false);
    if (!(await copyText(DONATION_CONFIG.pixKey))) { setCopyError(true); return; }
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };
  const action = 'shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-void-border text-slate-100 font-semibold hover:bg-void-850 transition w-full sm:w-auto';

  return (
    <section id="apoio" className="py-20 md:py-28 bg-void-950 border-t border-void-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
        <div>
          <h2 className="font-display font-extrabold leading-none text-4xl sm:text-6xl text-white">
            {t('supportTitle', 'Apoie os')} {t('supportTitleGradient', 'Servidores do Acervo Void')}
          </h2>
          <p className="mt-2 text-sm text-slate-400">{t('supportTag', '100% Gratuito & Sustentado pela Comunidade')}</p>
          <p className="mt-5 text-slate-300 text-lg leading-relaxed">
            {t('supportSubtitle', 'Este protótipo é gratuito. O apoio é voluntário e não compra itens, Platina ou funcionalidades do jogo.')}
          </p>
        </div>

        <div>
          {copyError && <p role="alert" className="mb-4 text-rose-300">Não foi possível copiar a chave. Selecione e copie o texto manualmente.</p>}
          <ul className="divide-y divide-void-border border-y border-void-border">
            <li className="py-7 flex flex-col sm:flex-row sm:items-center gap-5">
              <Zap className="w-6 h-6 text-energy-cyan shrink-0" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-bold text-2xl text-white">{t('pixTitle', 'Pix direto')}</h3>
                <p className="mt-1 text-sm text-slate-400">{t('pixDesc', 'Apoio voluntário ao desenvolvimento do projeto.')}</p>
                <p className="mt-3 px-3 py-2 rounded-md bg-void-900 border border-void-border text-sm font-mono text-slate-300 truncate">{DONATION_CONFIG.pixKey}</p>
              </div>
              <button onClick={handleCopyPix} className={`${action} ${copiedPix ? 'bg-energy-cyan text-void-950 border-energy-cyan' : ''}`}>
                {copiedPix ? <><Check className="w-4 h-4" aria-hidden="true" /><span>{t('copied', 'Chave copiada!')}</span></> : <><Copy className="w-4 h-4" aria-hidden="true" /><span>{t('pixBtn', 'Copiar chave Pix')}</span></>}
              </button>
            </li>
            <li className="py-7 flex flex-col sm:flex-row sm:items-center gap-5">
              <Heart className="w-6 h-6 text-energy-cyan shrink-0" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-bold text-2xl text-white">{t('apoiaTitle', 'Apoia.se')}</h3>
                <p className="mt-1 text-sm text-slate-400">{t('apoiaDesc', 'Contribuição mensal recorrente para manter a plataforma sempre atualizada.')}</p>
              </div>
              <a href={DONATION_CONFIG.apoiaSeUrl} target="_blank" rel="noopener noreferrer" className={action}><span>{t('apoiaBtn', 'Acessar Apoia.se')}</span><ExternalLink className="w-4 h-4" aria-hidden="true" /></a>
            </li>
            <li className="py-7 flex flex-col sm:flex-row sm:items-center gap-5">
              <Sparkles className="w-6 h-6 text-energy-cyan shrink-0" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-bold text-2xl text-white">{t('patreonTitle', 'Patreon')}</h3>
                <p className="mt-1 text-sm text-slate-400">{t('patreonDesc', 'Para apoiadores internacionais e membros que querem apoiar o projeto.')}</p>
              </div>
              <a href={DONATION_CONFIG.patreonUrl} target="_blank" rel="noopener noreferrer" className={action}><span>{t('patreonBtn', 'Acessar Patreon')}</span><ExternalLink className="w-4 h-4" aria-hidden="true" /></a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
