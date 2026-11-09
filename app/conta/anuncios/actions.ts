'use server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { createServerAuthClient } from '@/lib/supabase/server';
import { parseListingInput, parseListingEdit } from '@/lib/public-market';
import { getTradeCatalog } from '@/lib/trade-catalog';
export interface MarketActionResult { error?: string; success?: string }
async function actor() {
  const db = await createServerAuthClient();
  if (!db) return null;
  const { data: { user }, error } = await db.auth.getUser();
  return error || !user ? null : { db, userId: user.id };
}
function refreshMarket() { revalidateTag('public-market'); revalidatePath('/mercado'); revalidatePath('/conta/anuncios'); }
export async function publishListing(form: FormData): Promise<MarketActionResult> {
  try {
    const input = parseListingInput({ item_key: form.get('item_key'), side: form.get('side'), item_rank: form.get('item_rank'), platinum: form.get('platinum'), quantity: form.get('quantity'), consent: form.get('publish_consent') === 'yes' });
    if (!input) return { error: 'Confira item, nível, preço, quantidade e autorização de publicação.' };
    const item = getTradeCatalog().find(item => item.key === input.item_key);
    if (!item || input.item_rank > item.maxRank) return { error: 'Item ou nível não disponível neste catálogo negociável.' };
    const current = await actor();
    if (!current) return { error: 'Entre com Google para publicar.' };
    const { data: profile, error: profileError } = await current.db.from('profiles').select('nickname,platform').eq('id', current.userId).maybeSingle();
    if (profileError || !profile) return { error: 'Salve primeiro seu nickname e plataforma em Minha conta.' };
    const { error } = await current.db.from('market_listings').insert({ ...input, owner_id: current.userId, public_nickname: profile.nickname, platform: profile.platform, public_consent: true });
    if (error) return { error: error.code === '23505' ? 'Você já tem anúncio deste item, nível e tipo nesta plataforma. Edite o existente.' : 'Não foi possível publicar. Confira seu perfil e o limite de 20 anúncios por conta.' };
    refreshMarket(); return { success: 'Anúncio publicado. Confira disponibilidade e negociação diretamente no jogo.' };
  } catch { return { error: 'Não foi possível publicar agora. Tente novamente.' }; }
}
export async function editListing(form: FormData): Promise<MarketActionResult> {
  try {
    const input = parseListingEdit({ id: form.get('id'), platinum: form.get('platinum'), quantity: form.get('quantity') });
    if (!input) return { error: 'Confira preço e quantidade.' };
    const current = await actor(); if (!current) return { error: 'Entre novamente para editar.' };
    const { data, error } = await current.db.from('market_listings').update({ platinum: input.platinum, quantity: input.quantity }).eq('id', input.id).eq('owner_id', current.userId).select('id').maybeSingle();
    if (error || !data) return { error: 'Não foi possível editar este anúncio da sua conta.' };
    refreshMarket(); return { success: 'Preço e quantidade atualizados.' };
  } catch { return { error: 'Falha ao editar. Tente novamente.' }; }
}
export async function removeListing(form: FormData): Promise<MarketActionResult> {
  try {
    const input = parseListingEdit({ id: form.get('id'), platinum: '1', quantity: '1' });
    if (!input) return { error: 'Anúncio inválido.' };
    const current = await actor(); if (!current) return { error: 'Entre novamente para retirar.' };
    const { data, error } = await current.db.from('market_listings').delete().eq('id', input.id).eq('owner_id', current.userId).select('id').maybeSingle();
    if (error || !data) return { error: 'Não foi possível retirar este anúncio da sua conta.' };
    refreshMarket(); return { success: 'Anúncio retirado do mercado.' };
  } catch { return { error: 'Falha ao retirar o anúncio.' }; }
}
