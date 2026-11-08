import Link from 'next/link';
import GoogleSignIn from '@/components/GoogleSignIn';
import { getSupabaseConfig } from '@/lib/auth/config';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Entrar | Acervo Void' };
export default async function SignInPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;
  const configured = Boolean(getSupabaseConfig());
  return <main className="mx-auto w-full max-w-xl px-5 py-16 sm:py-24">
    <Link href="/" className="text-sm text-energy-cyan underline">Voltar ao Acervo Void</Link>
    <h1 className="mt-10 font-display text-5xl text-white">Sua conta no Acervo Void</h1>
    <p className="mt-4 leading-relaxed text-slate-300">Entre ou crie sua conta com o Google. Não pedimos sua senha do Warframe e não acessamos sua conta do jogo.</p>
    {!configured && <p role="status" className="mt-6 border-l-2 border-orokin-gold pl-4 text-sm text-amber-100">O cadastro real ainda está sendo configurado. Você pode continuar usando o Build Lab sem criar uma conta.</p>}
    {erro && <p role="alert" className="mt-5 text-sm text-rose-300">{erro === 'sair' ? 'Não foi possível encerrar a sessão. Tente novamente.' : 'Não foi possível concluir a autenticação. Tente entrar novamente.'}</p>}
    <GoogleSignIn configured={configured} />
    <p className="mt-6 text-sm leading-relaxed text-slate-400">O Supabase processa a autenticação. Recebemos o identificador e os dados básicos autorizados por você no Google. Nickname e plataforma ficam no seu perfil privado. Esse cadastro não verifica sua identidade dentro do Warframe.</p>
    <p className="mt-4 text-sm text-slate-400">Perfis e anúncios locais de demonstração continuam separados e não são migrados automaticamente.</p>
  </main>;
}
