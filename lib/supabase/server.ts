import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSupabaseConfig } from '@/lib/auth/config';
export async function createServerAuthClient() {
  const config = getSupabaseConfig();
  if (!config) return null;
  const store = await cookies();
  return createServerClient(config.url, config.key, { cookies: {
    getAll() { return store.getAll(); },
    setAll(values) {
      try { values.forEach(({ name, value, options }) => store.set(name, value, options)); }
      catch { /* Componentes de servidor usam a renovação de cookies do middleware. */ }
    },
  } });
}
