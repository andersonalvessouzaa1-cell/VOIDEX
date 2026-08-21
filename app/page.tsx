'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarketDemo from '@/components/MarketDemo';
import ConsoleSolutions from '@/components/ConsoleSolutions';
import CorePillars from '@/components/CorePillars';
import Comparison from '@/components/Comparison';
import CommunityFeedback from '@/components/CommunityFeedback';
import CommunitySupport from '@/components/CommunitySupport';
import SecuritySection from '@/components/SecuritySection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-void-950 text-slate-100">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <MarketDemo />
          <ConsoleSolutions />
          <CorePillars />
          <Comparison />
          <CommunityFeedback />
          <CommunitySupport />
          <SecuritySection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
