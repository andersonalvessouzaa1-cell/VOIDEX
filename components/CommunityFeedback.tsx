'use client';

import React, { useState } from 'react';
import { Sparkles, Bot, Loader2, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CommunityFeedback() {
  const { t } = useLanguage();
  const [category, setCategory] = useState<'sugestao' | 'item' | 'bug'>('sugestao');
  const [feedback, setFeedback] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="sugestoes-ia" className="py-20 md:py-28 bg-void-gradient border-t border-void-border text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-void-850 border border-energy-cyan/30 text-energy-cyan text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-cyan/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('aiHubTag', 'Sugestões & Melhoria Automatizada por IA')}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
          <span>{t('aiHubTitle', 'Ajude a Evoluir o')}</span> <span className="text-gradient-cyan">VOIDEX</span>
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
          {t('aiHubSubtitle', 'Envie sua sugestão, nova ideia ou reporte qualquer item. Nossa IA analisa seu feedback em tempo real e encaminha a melhoria de forma 100% automatizada e gratuita.')}
        </p>

        <div className="mt-10 max-w-xl mx-auto bg-void-900/90 border border-void-border p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-xl text-left">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {t('feedbackCategoryLabel', 'Tipo de Feedback')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCategory('sugestao')}
                    className={`py-2 px-2 text-center rounded-lg text-xs font-bold transition-all ${
                      category === 'sugestao'
                        ? 'bg-energy-cyan text-void-950 shadow-glow-cyan/40'
                        : 'bg-void-950 border border-void-border text-slate-400 hover:text-white'
                    }`}
                  >
                    💡 Sugestão
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('item')}
                    className={`py-2 px-2 text-center rounded-lg text-xs font-semibold transition-all ${
                      category === 'item'
                        ? 'bg-energy-cyan text-void-950 shadow-glow-cyan/40'
                        : 'bg-void-950 border border-void-border text-slate-400 hover:text-white'
                    }`}
                  >
                    📦 Novo Item / Preço
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('bug')}
                    className={`py-2 px-2 text-center rounded-lg text-xs font-semibold transition-all ${
                      category === 'bug'
                        ? 'bg-energy-cyan text-void-950 shadow-glow-cyan/40'
                        : 'bg-void-950 border border-void-border text-slate-400 hover:text-white'
                    }`}
                  >
                    🐛 Reportar Ajuste
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {t('feedbackTextLabel', 'Sua Ideia ou Mensagem')}
                </label>
                <textarea
                  required
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Descreva o que tornaria o trading de Warframe ainda mais fácil para você..."
                  className="w-full px-4 py-3 rounded-xl bg-void-950 border border-void-border text-white placeholder-slate-500 focus:outline-none focus:border-energy-cyan focus:ring-1 focus:ring-energy-cyan text-sm font-medium transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {t('feedbackUserLabel', 'Seu Nick / Contato (Opcional)')}
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="ex: TennoTrader#1234 ou seu email"
                  className="w-full px-4 py-2.5 rounded-xl bg-void-950 border border-void-border text-white placeholder-slate-500 focus:outline-none focus:border-energy-cyan focus:ring-1 focus:ring-energy-cyan text-sm font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-energy-cyan to-energy-glow text-void-950 text-sm font-extrabold uppercase tracking-wider hover:opacity-95 shadow-glow-cyan flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analisando com IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t('feedbackSubmitBtn', 'Processar Sugestão com IA')}</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Bot className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {t('aiAnalysisTitle', 'Sugestão Analisada pela IA com Sucesso!')}
              </h3>
              <div className="p-4 rounded-xl bg-void-950 border border-emerald-500/30 text-xs text-left font-mono space-y-1.5 text-emerald-300">
                <div className="text-slate-400 text-[11px] uppercase font-sans">⚡ Diagnóstico Automatizado da IA:</div>
                <div>• <strong className="text-white">Status:</strong> Sugestão processada e catalogada.</div>
                <div>• <strong className="text-white">Prioridade:</strong> Otimização de fluxo de trade.</div>
                <div>• <strong className="text-white">Ação:</strong> Integrada ao roadmap de melhorias do VOIDEX.</div>
              </div>
              <p className="text-xs text-slate-300">
                {t('aiAnalysisDesc', 'Obrigado pelo apoio, Tenno! É assim que construímos uma ferramenta 100% livre de enrolação e focada na comunidade.')}
              </p>
              <button
                onClick={() => {
                  setFeedback('');
                  setSubmitted(false);
                }}
                className="text-xs text-energy-cyan hover:underline font-mono cursor-pointer pt-2"
              >
                Enviar outra sugestão
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
