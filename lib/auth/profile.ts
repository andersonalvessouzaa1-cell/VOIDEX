/** Retorna só campos editáveis; identidade e permissões vêm da sessão validada. */
export function parseProfileInput(input: unknown): { nickname: string; platform: string } | null {
  if (!input || typeof input !== 'object') return null;
  const value = input as Record<string, unknown>;
  if (typeof value.nickname !== 'string' || typeof value.platform !== 'string') return null;
  const nickname = value.nickname.trim();
  if (!/^[A-Za-z0-9_.-]{3,32}$/.test(nickname) || !['pc', 'ps4', 'xbox', 'switch', 'mobile'].includes(value.platform)) return null;
  return { nickname, platform: value.platform };
}
