import AccountNavigation from '@/components/AccountNavigation';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createServerAuthClient } from '@/lib/supabase/server';
import { getTradeCatalog } from '@/lib/trade-catalog';
import { PUBLIC_LISTING_FIELDS, type PublicListing, type TradePlatform } from '@/lib/public-market';
import MarketListingForm from '@/components/MarketListingForm';
import OwnedMarketListing from '@/components/OwnedMarketListing';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Meus anúncios | Acervo Void' };
export default async function MyListingsPage() {
  const db = await createServerAuthClient(); if (!db) redirect('/entrar');
  const { data: { user }, error: authError } = await db.auth.getUser(); if (authError || !user) redirect('/entrar');
  const [{ data: profile, error: profileError }, { data: listings, error }] = await Promise.all([
    db.from('profiles').select('nickname,platform').eq('id', user.id).maybeSingle(),
    db.from('market_listings').select(PUBLIC_LISTING_FIELDS).eq('owner_id', user.id).order('created_at', { ascending: false }).limit(20),
  ]);
  const catalog = new Map(getTradeCatalog().map(item => [item.key, item]));
  return <main className="mx-auto w-full max-w-4xl px-5 py-12">
    <AccountNavigation items={[{href:"/mercado",label:"Mercado"},{href:"/conta",label:"Minha conta"},{href:"/",label:"Início"}]} />
    <h1 className="mt-8 break-words font-display text-4xl sm:text-5xl">Meus anúncios</h1>
    <p className="mt-4 text-sm leading-relaxed text-slate-400">Até 20 anúncios por conta. Anúncios ficam públicos por 30 dias; retire os antigos antes de publicar novamente. Aqui ficam seus anúncios reais, separados da demonstração local. Confirme sempre disponibilidade e compatibilidade de plataforma no jogo.</p>
    {profileError || error ? <p role="alert" className="mt-6 border border-orokin-gold p-4 text-amber-100">O mercado está indisponível neste momento. Nenhum dado de exemplo foi usado.</p> : <>
      {!profile ? <p className="mt-6 text-sm">Salve seu nickname e plataforma em <Link href="/conta" className="text-energy-cyan underline">Minha conta</Link> para publicar.</p> : (listings?.length ?? 0) < 20 ? <MarketListingForm nickname={profile.nickname} platform={profile.platform as TradePlatform} /> : <p className="mt-6 text-amber-100">Limite de 20 anúncios atingido. Edite ou retire um anúncio existente.</p>}
      <section className="mt-8"><h2 className="font-display text-3xl">Anúncios da sua conta ({listings?.length ?? 0}/20)</h2>{!listings?.length && <p className="mt-3 text-sm text-slate-400">Você ainda não publicou anúncios.</p>}{(listings as PublicListing[] | null)?.map(listing => <OwnedMarketListing key={listing.id} listing={listing} itemName={catalog.get(listing.item_key)?.name ?? 'Item fora do catálogo atual'} />)}</section>
    </>}
  </main>;
}
