import type { Metadata } from 'next';
import { Geist, VT323 } from 'next/font/google';
import './globals.css';

const body = Geist({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const display = VT323({ subsets: ['latin'], weight: '400', variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
  title: 'Acervo Void Beta | Builds e mercado para Warframe',
  description: 'Protótipo de mercado para Warframe com catálogo local, preços de exemplo, comparação Ducats/Platina e preparação de mensagens. Sem conexão com o jogo.',
  robots: { index: false, follow: false },
  keywords: ['Warframe trading', 'Warframe market intelligence', 'Warframe marketplace', 'Acervo Void', 'Warframe platinum', 'Ducats calculator', 'Warframe price check'],
  openGraph: {
    title: 'Acervo Void | Market Intelligence',
    description: 'Trading de Warframe sem poluição e sem perda de tempo.',
    url: 'https://acervovoid.vercel.app',
    siteName: 'Acervo Void',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`dark scroll-smooth ${body.variable} ${display.variable}`}>
      <body suppressHydrationWarning className="font-sans bg-void-950 text-slate-100 min-h-screen flex flex-col selection:bg-energy-cyan/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
