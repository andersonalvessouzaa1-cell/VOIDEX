'use client';
import { useState } from 'react';
import { createBrowserAuthClient } from '@/lib/supabase/browser';
export default function GoogleSignIn({ configured }: { configured: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function signIn() {
    setBusy(true); setError('');
    try {
      const { error } = await createBrowserAuthClient().auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } });
      if (error) throw error;
    } catch { setError('Não foi possível abrir o Google. Tente novamente em instantes.'); setBusy(false); }
  }
  return <div>
    <button type="button" onClick={signIn} disabled={!configured || busy} className="mt-6 min-h-12 w-full border border-energy-cyan bg-energy-cyan px-5 py-3 font-semibold text-void-950 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-energy-cyan">{busy ? 'Abrindo Google…' : 'Entrar com Google'}</button>
    {error && <p role="alert" className="mt-4 text-sm text-rose-300">{error}</p>}
  </div>;
}
