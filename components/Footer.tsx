'use client';

import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { DONATION_CONFIG } from '@/lib/donation-config';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-void-950 border-t border-void-border/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-void-border/60">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-void-900 border border-energy-cyan/40 flex items-center justify-center">
                <Zap className="w-4 h-4 text-energy-cyan" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-wider text-white font-mono">VOIDEX</span>
                <span className="text-[9px] tracking-[0.2em] font-semibold text-orokin-gold uppercase">
                  Market Intelligence
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              {t(
                'footerDesc',
                'Construído para simplificar radicalmente a negociação de itens no Warframe em todas as plataformas. Cotações limpas, mensagens instantâneas e 100% gratuito para toda a comunidade.'
              )}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('footerDeSafe', '100% em conformidade com as diretrizes da Digital Extremes (Anti-Ban Safe)')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono">
              {t('footerNavTitle', 'Navegação Rápida')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#demo" className="hover:text-energy-cyan transition-colors">
                  {t('navDemo', 'Testar Cotação')}
                </a>
              </li>
              <li>
                <a href="#solucoes-crossplay" className="hover:text-energy-cyan transition-colors">
                  {t('navCrossplay', 'Solução PC & Consoles')}
                </a>
              </li>
              <li>
                <a href="#pilares" className="hover:text-energy-cyan transition-colors">
                  {t('navPillars', 'Vantagens')}
                </a>
              </li>
              <li>
                <a href="#comparativo" className="hover:text-energy-cyan transition-colors">
                  {t('navComparison', 'Comparativo de Tempo')}
                </a>
              </li>
              <li>
                <a href="#sugestoes-ia" className="hover:text-energy-cyan transition-colors">
                  {t('navAiFeedback', 'Sugestões & IA')}
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Community */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono">
              {t('footerCommTitle', 'Comunidade & Apoio')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#sugestoes-ia" className="hover:text-energy-cyan transition-colors">
                  {t('footerSuggestHub', 'Central de Sugestões (IA)')}
                </a>
              </li>
              <li>
                <a href="#apoio" className="hover:text-energy-cyan transition-colors">
                  {t('footerSupportPix', 'Chave Pix')}
                </a>
              </li>
              <li>
                <a
                  href={DONATION_CONFIG.apoiaSeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-400 transition-colors"
                >
                  {t('apoiaTitle', 'Apoia.se')} (apoia.se/voidex)
                </a>
              </li>
              <li>
                <a
                  href={DONATION_CONFIG.patreonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orokin-gold transition-colors"
                >
                  {t('footerSupportPatreon', 'Patreon Supporter')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-8 space-y-4">
          <div className="p-4 rounded-xl bg-void-900/60 border border-void-border/60 text-[11px] leading-relaxed text-slate-500">
            <strong className="text-slate-400 block mb-1">
              {t('disclaimerTitle', 'Aviso Legal e Isenção de Responsabilidade (Disclaimer):')}
            </strong>
            <span>
              {t(
                'disclaimerBody',
                'O VOIDEX: Market Intelligence é uma ferramenta comunitária e independente desenvolvida por e para jogadores de Warframe. O VOIDEX não é patrocinado, endossado ou afiliado à Digital Extremes Ltd. O título "Warframe", logotipos, imagens e todos os nomes e dados de itens associados são marcas registradas e propriedades intelectuais da Digital Extremes Ltd. Todo o comércio de itens no jogo é conduzido exclusivamente de forma manual entre os próprios jogadores dentro dos servidores oficiais do jogo.'
              )}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
            <span>
              © 2026 VOIDEX: Market Intelligence. {t('rightsReserved', 'Todos os direitos reservados.')}
            </span>
            <span>{t('madeForTenno', 'Feito com ⚡ para a comunidade Tenno em todas as plataformas.')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
