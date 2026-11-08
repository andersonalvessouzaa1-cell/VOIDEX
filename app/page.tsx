'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarketDemo from '@/components/MarketDemo';
import VerifiedBuildLab from '@/components/VerifiedBuildLab';
import ConsoleSolutions from '@/components/ConsoleSolutions';
import CorePillars from '@/components/CorePillars';
import Comparison from '@/components/Comparison';
import CommunityFeedback from '@/components/CommunityFeedback';
import SecuritySection from '@/components/SecuritySection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-void-950 text-slate-100">
        <Navbar />
        <main className="flex-1">
          <div role="note" className="border-b border-void-border bg-void-900 px-4 py-3 text-center text-sm text-slate-300">Beta gratuita: builds e cálculos parciais. O mercado abaixo é demonstrativo; preços e vendedores são exemplos.</div>
          <Hero />
          <MarketDemo />
          <VerifiedBuildLab />
          <ConsoleSolutions />
          <CorePillars />
          <Comparison />
          <CommunityFeedback />
          <section id="apoio" className="mx-auto max-w-7xl px-4 py-12"><h2 className="font-display text-3xl text-white">Sobre esta beta</h2><p className="mt-3 max-w-2xl text-sm text-slate-400">Projeto pessoal gratuito e experimental. Sem anúncios pagos, cobrança, doações ou trocas automáticas nesta versão. Seus rascunhos e anúncios demonstrativos ficam somente no navegador. Apenas o Dante possui conjunto completo experimental; os demais presets ainda estão em curadoria.</p></section>
          <SecuritySection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
