'use client';

import React, { useState, type CSSProperties } from 'react';
import { Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { copyText } from '@/lib/browser-actions';
import { useLanguage } from '@/context/LanguageContext';

const categories = [['sugestao', 'Sugestão'], ['item', 'Novo item ou preço'], ['bug', 'Reportar ajuste']] as const;

export default function CommunityFeedback() {
  const { t } = useLanguage();
  const [category, setCategory] = useState<'sugestao' | 'item' | 'bug'>('sugestao');
  const [feedback, setFeedback] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setIsSubmitting(true);
    setCopyError(false);
    const copied = await copyText(['Acervo Void — Feedback', 'Categoria: ' + category, feedback.trim(), contact.trim() ? 'Contato: ' + contact.trim() : ''].filter(Boolean).join('\n\n'));
    setIsSubmitting(false);
    setSubmitted(copied);
    setCopyError(!copied);
  };
  const field = 'w-full px-3 py-2.5 rounded-md bg-void-950 border border-void-border text-white placeholder:text-slate-500 focus:border-energy-cyan';

  return (
    <section id="sugestoes-ia" className="py-20 md:py-28 bg-void-900 border-t border-void-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
        <div>
          <h2 className="font-display font-extrabold leading-none text-4xl sm:text-6xl text-white">{t('aiHubTitle', 'Ajude a evoluir o')} Acervo Void</h2>
          <p className="mt-2 text-sm text-slate-400">{t('feedbackLocalTag', 'Sugestões da comunidade')}</p>
          <p className="mt-5 text-slate-300 text-lg leading-relaxed">
            {t('feedbackLocalSubtitle', 'Prepare sua sugestão e copie o texto para enviar pelo canal de sua preferência. Este protótipo não envia mensagens nem realiza análise por IA.')}
          </p>
        </div>

        <div className="chamfer" style={{ '--chamfer': '22px' } as CSSProperties}>
          <div className="chamfer-in p-6 sm:p-8" style={{ '--chamfer': '21px' } as CSSProperties}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {copyError && <p role="alert" className="text-sm text-rose-300">Não foi possível copiar. Seu texto foi mantido: selecione a mensagem e copie manualmente.</p>}
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-white">{t('feedbackCategoryLabel', 'Tipo de feedback')}</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {categories.map(([value, label]) => (
                      <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)}
                        className="py-2 px-2 rounded-md text-sm font-semibold border border-void-border text-slate-300 hover:text-white aria-pressed:bg-energy-cyan aria-pressed:border-energy-cyan aria-pressed:text-void-950">
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="feedback-text" className="block mb-2 text-sm font-medium text-white">{t('feedbackTextLabel', 'Sua ideia ou mensagem')}</label>
                  <textarea id="feedback-text" required rows={4} value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Descreva o que tornaria o trading de Warframe ainda mais fácil para você..." className={`${field} resize-none`} />
                </div>
                <div>
                  <label htmlFor="feedback-contact" className="block mb-2 text-sm font-medium text-white">{t('feedbackUserLabel', 'Seu nick ou contato (opcional)')}</label>
                  <input id="feedback-contact" type="text" value={contact} onChange={e => setContact(e.target.value)} placeholder="ex: TennoTrader#1234 ou seu email" className={field} />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-md bg-energy-cyan text-void-950 font-semibold hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-50">
                  {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /><span>Copiando...</span></> : <><Sparkles className="w-4 h-4" aria-hidden="true" /><span>{t('feedbackLocalCopy', 'Copiar sugestão')}</span></>}
                </button>
              </form>
            ) : (
              <div role="status" className="py-4 space-y-3">
                <CheckCircle2 className="w-8 h-8 text-energy-cyan" aria-hidden="true" />
                <h3 className="font-display font-bold text-3xl text-white">{t('feedbackLocalCopied', 'Sugestão copiada!')}</h3>
                <p className="text-slate-300">O texto está na área de transferência. Envie-o pelo canal de sua preferência; nada foi enviado ao Acervo Void.</p>
                <p className="text-sm text-slate-400">{t('feedbackLocalThanks', 'Obrigado por preparar sua contribuição, Tenno.')}</p>
                <button onClick={() => { setFeedback(''); setSubmitted(false); }} className="text-energy-cyan underline pt-1">Preparar outra sugestão</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
