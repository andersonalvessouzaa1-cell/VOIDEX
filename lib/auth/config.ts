/** Apenas a URL hospedada e uma chave pública podem chegar ao navegador. */
export function getSupabaseConfig(url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY): { url: string; key: string } | null {
  if (!url || !key) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || !/^[a-z0-9]{20}\.supabase\.co$/.test(parsed.hostname) || parsed.username || parsed.password || parsed.port || parsed.search || parsed.hash || parsed.pathname !== '/') return null;
    const value = key.trim();
    const publishable = /^sb_publishable_[A-Za-z0-9_-]{20,}$/.test(value);
    let anon = false;
    if (!publishable && value.split('.').length === 3) {
      const payload = value.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      anon = JSON.parse(atob(payload)).role === 'anon';
    }
    return publishable || anon ? { url: parsed.origin, key: value } : null;
  } catch { return null; }
}
