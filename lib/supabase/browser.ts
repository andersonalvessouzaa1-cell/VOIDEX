'use client';
import { createBrowserClient } from '@supabase/ssr';
import { getSupabaseConfig } from '@/lib/auth/config';
export function createBrowserAuthClient() {
  const config = getSupabaseConfig();
  if (!config) throw new Error('Autenticação ainda não configurada.');
  return createBrowserClient(config.url, config.key);
}
