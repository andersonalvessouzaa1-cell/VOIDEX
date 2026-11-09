import { NextRequest, NextResponse } from 'next/server';
import { createServerAuthClient } from '@/lib/supabase/server';
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  if (code) {
    try {
      const supabase = await createServerAuthClient();
      if (supabase) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) return NextResponse.redirect(new URL('/conta', request.url), { headers: { 'Cache-Control': 'private, no-store' } });
      }
    } catch { /* Não expor códigos ou respostas do provedor na URL/página. */ }
  }
  return NextResponse.redirect(new URL('/entrar?erro=autenticacao', request.url), { headers: { 'Cache-Control': 'private, no-store' } });
}
