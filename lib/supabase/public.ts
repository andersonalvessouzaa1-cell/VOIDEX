import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from '@/lib/auth/config';
/** Leitura pública sem reutilizar a sessão ou expor dados privados do visitante. */
export function createPublicMarketClient() {
  const config = getSupabaseConfig();
  return config ? createClient(config.url, config.key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }) : null;
}
