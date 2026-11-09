'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createServerAuthClient } from '@/lib/supabase/server';
import { parseProfileInput } from '@/lib/auth/profile';
export async function saveProfile(form: FormData): Promise<{ error?: string; success?: string }> {
  const input = parseProfileInput({ nickname: form.get('nickname'), platform: form.get('platform') });
  if (!input) return { error: 'Use de 3 a 32 letras, números, pontos, hífens ou sublinhados e escolha uma plataforma válida.' };
  try {
    const supabase = await createServerAuthClient();
    if (!supabase) return { error: 'Cadastro ainda não configurado.' };
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return { error: 'Sua sessão expirou. Entre novamente para salvar.' };
    const { data: existing, error: readError } = await supabase.from('profiles').select('id').eq('id', user.id).maybeSingle();
    if (readError) return { error: 'Não foi possível acessar seu perfil. Tente novamente em instantes.' };
    const result = existing
      ? await supabase.from('profiles').update(input).eq('id', user.id)
      : await supabase.from('profiles').insert({ id: user.id, ...input });
    if (result.error) return { error: 'Não foi possível salvar seu perfil. Tente novamente em instantes.' };
    revalidatePath('/conta');
    return { success: 'Perfil salvo.' };
  } catch { return { error: 'Serviço de contas indisponível. Tente novamente em instantes.' }; }
}
export async function signOut() {
  const supabase = await createServerAuthClient();
  if (supabase) {
    const { error } = await supabase.auth.signOut({ scope: 'local' });
    if (error) redirect('/entrar?erro=sair');
  }
  redirect('/entrar');
}
