'use client';
import { useState, type FormEvent } from 'react';
import { saveProfile } from '@/app/conta/actions';
export default function AccountProfileForm({ nickname = '', platform = 'pc' }: { nickname?: string; platform?: string }) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ error?: string; success?: string }>({});
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    setBusy(true); setResult({});
    try { setResult(await saveProfile(data)); }
    catch { setResult({ error: 'Não foi possível salvar. Tente novamente.' }); }
    finally { setBusy(false); }
  }
  return <form onSubmit={submit} className="mt-8 space-y-5">
    <div><label htmlFor="account-nickname" className="block text-sm text-white">Nickname no Warframe (informado por você)</label><input id="account-nickname" name="nickname" defaultValue={nickname} required minLength={3} maxLength={32} pattern="[A-Za-z0-9_.\-]+" autoComplete="nickname" className="mt-2 w-full border border-void-border bg-void-900 px-3 py-3 text-white" /><p className="mt-2 text-xs text-slate-400">De 3 a 32 letras sem acento, números, pontos, hífens ou sublinhados. Não verificamos a posse desse nickname.</p></div>
    <div><label htmlFor="account-platform" className="block text-sm text-white">Plataforma</label><select id="account-platform" name="platform" defaultValue={platform} className="mt-2 w-full border border-void-border bg-void-900 px-3 py-3 text-white"><option value="pc">PC</option><option value="ps4">PlayStation</option><option value="xbox">Xbox</option><option value="switch">Switch</option><option value="mobile">Mobile</option></select></div>
    <button disabled={busy} className="min-h-12 border border-energy-cyan bg-energy-cyan px-5 py-3 font-semibold text-void-950 disabled:opacity-50">{busy ? 'Salvando…' : 'Salvar perfil'}</button>
    {result.error && <p role="alert" className="text-sm text-rose-300">{result.error}</p>}{result.success && <p role="status" className="text-sm text-energy-cyan">{result.success}</p>}
  </form>;
}
