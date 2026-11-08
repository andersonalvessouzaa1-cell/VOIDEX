import Link from 'next/link';
import { getTradeCatalog } from '@/lib/trade-catalog';
import { getPublicListings } from '@/lib/public-market-reader';
import { TRADE_PLATFORMS } from '@/lib/public-market';
import MarketFilters from '@/components/MarketFilters';
import TradeContact from '@/components/TradeContact';
import ItemImage from '@/components/ItemImage';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Mercado da comunidade | Acervo Void' };
export default async function MarketPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const catalog = new Map(getTradeCatalog().map(item => [item.key, item]));
  const key = typeof params.item_key === 'string' ? params.item_key : '';
  const invalidItem = Boolean(key && !catalog.has(key));
  const platform = typeof params.platform === 'string' && Object.prototype.hasOwnProperty.call(TRADE_PLATFORMS, params.platform) ? params.platform : '';
  const side = params.side === 'buy' || params.side === 'sell' ? params.side : '';
  const page = typeof params.page === 'string' && /^\d{1,3}$/.test(params.page) ? Math.max(1, Math.min(100, Number(params.page))) : 1;
  const data = invalidItem ? { rows: [], unavailable: false, hasMore: false } : await getPublicListings(key, platform, side, page);
  const pageUrl = (next: number) => `/mercado?${new URLSearchParams({ item_key: key, platform, side, page: String(next) })}`;
  return <main className="mx-auto w-full max-w-6xl px-5 py-12">
    <nav className="flex flex-wrap gap-5 text-sm text-energy-cyan underline"><Link href="/">Início</Link><Link href="/#build-lab">Build Lab</Link><Link href="/conta/anuncios">Meus anúncios / publicar</Link></nav>
    <h1 className="mt-8 font-display text-5xl">Mercado da comunidade</h1>
    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">Anúncios reais publicados pelos usuários do Acervo Void. Consulte mods e arcanos negociáveis, com preço em platina por unidade. Não há preços, vendedores ou reputação de exemplo nesta página.</p>
    <p className="mt-3 max-w-3xl border-l-2 border-orokin-gold pl-4 text-sm text-amber-100">O site não verifica a posse dos itens ou do nickname, não informa presença online e não realiza trocas. Confirme disponibilidade e compatibilidade da plataforma diretamente no jogo. Anúncio não significa venda concluída.</p>
    <MarketFilters item={catalog.get(key) ?? null} platform={platform} side={side} />
    {invalidItem ? <p role="alert" className="mt-6 text-amber-100">Item não encontrado no catálogo. <Link href="/mercado" className="underline">Limpar filtros</Link>.</p> : data.unavailable ? <p role="alert" className="mt-6 text-amber-100">Não foi possível consultar os anúncios. Tente novamente; nenhum exemplo foi usado como substituição.</p> : <>
      {!data.rows.length && <div className="py-12"><h2 className="font-display text-3xl">Nenhum anúncio encontrado</h2><p className="mt-3 text-sm text-slate-400">Não há ofertas públicas para estes filtros nesta página. Você pode <Link href="/conta/anuncios" className="text-energy-cyan underline">publicar seu anúncio</Link>.</p></div>}
      <div className="divide-y divide-void-border">{data.rows.map(listing => {
        const item = catalog.get(listing.item_key); if (!item) return null;
        return <article key={listing.id} className="py-6"><div className="flex items-start gap-4"><ItemImage src={item.imageName ? `/api/cdn-image?name=${encodeURIComponent(item.imageName)}` : undefined} alt="" size={72} /><div className="min-w-0 flex-1"><p className="text-xs uppercase text-slate-400">{listing.side === 'sell' ? 'Vende' : 'Quer comprar'} · {TRADE_PLATFORMS[listing.platform]}</p><h2 className="mt-1 font-display text-3xl">{item.name}</h2><p className="mt-2 text-sm">Nível {listing.item_rank} · quantidade {listing.quantity} · <strong className="text-orokin-gold">{listing.platinum} platina por unidade</strong></p><p className="mt-2 break-words text-sm text-slate-400">Nickname: {listing.public_nickname} · publicado em {new Date(listing.created_at).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p><TradeContact listing={listing} itemName={item.name} /></div></div></article>;
      })}</div>
      <nav aria-label="Páginas do mercado" className="mt-6 flex flex-wrap gap-5 text-sm text-energy-cyan">{page > 1 && <Link href={pageUrl(page - 1)} className="underline">Página anterior</Link>}<span className="text-slate-400">Página {page}</span>{data.hasMore && page < 100 && <Link href={pageUrl(page + 1)} className="underline">Próxima página</Link>}</nav>
    </>}
    <footer className="mt-10 border-t border-void-border pt-5 text-xs leading-relaxed text-slate-400">Anúncios expiram da lista pública após 30 dias. Catálogo negociável: <a href="https://github.com/WFCD/warframe-items" className="text-energy-cyan underline">WFCD</a>. Não importamos ofertas de outros mercados. <Link href="/privacidade" className="text-energy-cyan underline">Privacidade</Link> · <Link href="/termos" className="text-energy-cyan underline">Termos</Link>.</footer>
  </main>;
}
