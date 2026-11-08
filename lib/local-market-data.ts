export type Platform = 'pc' | 'playstation' | 'xbox' | 'switch';
export interface LocalProfile {
  nickname: string;
  platform: Platform;
  crossplay: boolean;
  reputation: number;
  joinedAt: string;
}
export interface LocalListing {
  id: string;
  itemId: string;
  itemName: string;
  componentName: string;
  orderType: 'wts' | 'wtb';
  price: number;
  quantity: number;
  username: string;
  platform: Platform;
  crossplay: boolean;
  reputation: number;
  status: 'active' | 'paused';
  statusType: 'In-Game' | 'Online';
  createdAt: string;
}
const record = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const text = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
const integer = (value: unknown): value is number => typeof value === 'number' && Number.isSafeInteger(value);
const date = (value: unknown): boolean => text(value) && Number.isFinite(Date.parse(value));
export const isPlatform = (value: unknown): value is Platform => ['pc', 'playstation', 'xbox', 'switch'].includes(value as string);
const identity = (value: Record<string, unknown>): boolean => isPlatform(value.platform) && typeof value.crossplay === 'boolean' && integer(value.reputation) && value.reputation >= 0;

/** Valida os dados sem modificar nem apagar o conteúdo salvo. */
export function isLocalProfile(value: unknown): value is LocalProfile {
  return record(value) && text(value.nickname) && identity(value) && date(value.joinedAt);
}
export function isLocalListing(value: unknown): value is LocalListing {
  return record(value) && ['id', 'itemId', 'itemName', 'componentName', 'username'].every(key => text(value[key]))
    && identity(value) && (value.orderType === 'wts' || value.orderType === 'wtb')
    && integer(value.price) && value.price > 0
    && integer(value.quantity) && value.quantity >= 1 && value.quantity <= 99
    && (value.status === 'active' || value.status === 'paused')
    && (value.statusType === 'In-Game' || value.statusType === 'Online') && date(value.createdAt);
}
