/**
 * VOIDEX DATA ENGINE — CONSTANTS & ENUMS
 * Arquitetura de Dados, Domínio e Tipagens Fundamentais para Warframe
 */

export const SUPPORTED_LANGUAGES = [
  'en',    // English
  'pt-BR', // Português Brasil
  'es',    // Español
  'fr',    // Français
  'de',    // Deutsch
  'it',    // Italiano
  'ja',    // 日本語
  'ko',    // 한국어
  'pl',    // Polski
  'ru',    // Русский
  'zh-CN', // 中文简体
  'zh-TW', // 中文繁體
  'th',    // ไทย
  'tr',    // Türkçe
  'uk'     // Українська
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const DAMAGE_TYPES = [
  // Físicos
  'impact',
  'puncture',
  'slash',
  // Elementais Primários
  'heat',
  'cold',
  'electricity',
  'toxin',
  // Elementais Secundários (Combinados)
  'blast',
  'radiation',
  'gas',
  'magnetic',
  'viral',
  'corrosive',
  // Especiais / Místicos
  'void',
  'tau',
  'true_damage'
] as const;

export type DamageType = typeof DAMAGE_TYPES[number];

export const POLARITIES = [
  'madurai',  // V (Ataque/Dano)
  'vazarin',  // D (Defesa/Sobrevivência)
  'naramon',  // Dash (Utilidade/Alcance)
  'zenurik',  // Scratch (Aumento de Habilidade/Tático)
  'umbra',    // U (Mods Umbrais)
  'aura',     // Polaridade Universal de Aura
  'none'      // Sem Polaridade / Neutro
] as const;

export type Polarity = typeof POLARITIES[number];

export const MOD_CATEGORIES = [
  'warframe',
  'aura',
  'exilus',
  'primary',
  'secondary',
  'melee',
  'stance',
  'companion',
  'sentinel',
  'archwing',
  'archgun',
  'archmelee',
  'necramech',
  'operator',
  'parazon'
] as const;

export type ModCategory = typeof MOD_CATEGORIES[number];

export const WEAPON_CATEGORIES = [
  'primary_rifle',
  'primary_shotgun',
  'primary_bow',
  'primary_launcher',
  'primary_sniper',
  'secondary_pistol',
  'secondary_dual',
  'secondary_shotgun',
  'secondary_thrown',
  'melee_sword',
  'melee_katana',
  'melee_heavy_blade',
  'melee_polearm',
  'melee_glaive',
  'melee_whip',
  'melee_dagger',
  'melee_tonfa',
  'melee_hammer',
  'melee_gunblade',
  'melee_dual_swords',
  'archgun',
  'archmelee',
  'amp',
  'necramech_gun'
] as const;

export type WeaponCategory = typeof WEAPON_CATEGORIES[number];

export const COMPANION_CATEGORIES = [
  'sentinel',
  'kavat',
  'kubrow',
  'vulpaphyla',
  'predasite',
  'moa',
  'hound',
  'robotic'
] as const;

export type CompanionCategory = typeof COMPANION_CATEGORIES[number];

export const SHARD_TYPES = [
  'crimson',
  'amber',
  'azure',
  'topaz',
  'emerald',
  'violet'
] as const;

export type ShardType = typeof SHARD_TYPES[number];

export const FACTIONS = [
  'grineer',
  'corpus',
  'infested',
  'corrupted_orokin',
  'sentient',
  'narmer',
  'murmur',
  'stalker_acolyte'
] as const;

export type Faction = typeof FACTIONS[number];

export const DATA_VERIFICATION_STATUS = [
  'VERIFIED',
  'UNVERIFIED',
  'PENDING',
  'DEPRECATED'
] as const;

export type VerificationStatus = typeof DATA_VERIFICATION_STATUS[number];
