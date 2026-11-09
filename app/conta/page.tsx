import AccountNavigation from '@/components/AccountNavigation';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createServerAuthClient } from '@/lib/supabase/server';
import AccountProfileForm from '@/components/AccountProfileForm';
import { signOut } from './actions';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Minha conta | Acervo Void' };
export default async function AccountPage() {
  const supabase = await createServerAuthClient();
  if (!supabase) redirect('/entrar');
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect('/entrar');
  const { data: profile, error: profileError } = await supabase.from('profiles').select('nickname, platform').eq('id', user.id).maybeSingle();
  return <main className="mx-auto w-full max-w-xl px-5 py-16">
    <AccountNavigation items={[{href:"/",label:"Início"},{href:"/mercado",label:"Mercado"},{href:"/conta/anuncios",label:"Meus anúncios"}]} />
    <h1 className="mt-10 font-display text-5xl text-white">Minha conta</h1>
    <p className="mt-4 break-words text-sm text-slate-300">Conectado com Google: {user.email}</p>
    <p className="mt-3 text-sm leading-relaxed text-slate-400">Este perfil é privado. Sua conta no site não cria anúncios públicos automaticamente nem acessa o jogo. Os anúncios de demonstração continuam somente no navegador.</p>
    <Link href="/conta/anuncios" className="mt-5 inline-block border border-energy-cyan px-5 py-3 text-energy-cyan">Gerenciar meus anúncios reais</Link>
    {profileError ? <p role="alert" className="mt-6 text-sm text-amber-100">Seu login foi reconhecido, mas o perfil está indisponível. Tente novamente em instantes.</p> : <AccountProfileForm nickname={profile?.nickname ?? ''} platform={profile?.platform ?? 'pc'} />}
    <form action={signOut} className="mt-10 border-t border-void-border pt-5"><button className="min-h-12 px-3 py-2 text-sm text-slate-300 underline">Sair desta sessão</button></form>
  </main>;
}
