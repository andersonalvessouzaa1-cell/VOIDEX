import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VOIDEX | Market Intelligence — Warframe Trading Sem Fricção',
  description: 'A plataforma de inteligência de mercado mais rápida e limpa para Warframe. Cotações em tempo real, suporte total a PC e Consoles, 100% gratuita.',
  keywords: ['Warframe trading', 'Warframe market intelligence', 'Warframe marketplace', 'VOIDEX', 'Warframe platinum', 'Ducats calculator', 'Warframe price check'],
  openGraph: {
    title: 'VOIDEX | Market Intelligence',
    description: 'Trading de Warframe sem poluição e sem perda de tempo.',
    url: 'https://voidex.market',
    siteName: 'VOIDEX',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body className="bg-void-950 text-slate-100 min-h-screen flex flex-col selection:bg-energy-cyan/30 selection:text-energy-cyan">
        {children}
      </body>
    </html>
  );
}
