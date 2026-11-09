/**
 * VOIDEX DATA ENGINE — TYPES & INTERFACES (EXPANDED & NORMALIZED)
 * Modelagem Completa, Versionada, Auditável e com Data Provenance
 */

import {
  SupportedLanguage,
  DamageType,
  Polarity,
  ModCategory,
  WeaponCategory,
  CompanionCategory,
  ShardType,
  Faction,
  VerificationStatus
} from './constants';

// ==========================================
// 1. DATASET SCOPE & DOMAIN ENUMS
// ==========================================

export type DatasetDomainScope =
  | 'MARKET'      // A: Itens negociáveis
  | 'BUILD'       // B: Cálculo direto de builds
  | 'COMBAT'      // C: Dano, resistências, status
  | 'REFERENCE';  // D: Categorias, filtros, metadados

export type EntityVerificationStatus =
  | 'VERIFIED'
  | 'PARTIALLY_VERIFIED'
  | 'UNVERIFIED'
  | 'MISSING'
  | 'DEPRECATED'
  | 'CONFLICT';

export type TranslationStatus =
  | 'VERIFIED'
  | 'MACHINE_TRANSLATED'
  | 'COMMUNITY_VERIFIED'
  | 'PENDING'
  | 'MISSING';

// ==========================================
// 2. DATA PROVENANCE & AUDIT METADATA
// ==========================================

export type ValidationStatus = 'VERIFIED' | 'PARTIALLY_VERIFIED' | 'MISSING' | 'CONFLICT';

export interface DataProvenance {
  source_id: string;
  source_type: 'official_export' | 'community_api' | 'manual_verification' | 'wiki_reference';
  source_name: string;
  source_url?: string;
  retrieved_at: string;        // ISO 8601
  verified_at?: string;        // ISO 8601
  dataset_version: string;     // Ex: "v1.1"
  patch_version: string;       // Ex: "Update 38.0.2 - 1999"
  verification_status: EntityVerificationStatus;
  confidence: number;          // 0.0 a 1.0 (1.0 = 100% verificado)
  checksum?: string;
  notes?: string;
}

export interface DatasetVersionRecord {
  dataset_version: string;     // Ex: "v1.0", "v1.1"
  created_at: string;
  source_snapshot: string;
  changes_summary: {
    added: number;
    removed: number;
    modified: number;
    deprecated: number;
    conflicts: number;
  };
  affected_entities: string[];
}

// ==========================================
// 3. VARIANT SYSTEM (BASE ITEM -> VARIANTS)
// ==========================================

export type VariantType =
  | 'base'
  | 'prime'
  | 'umbra'
  | 'kuva'
  | 'tenet'
  | 'prisma'
  | 'vandal'
  | 'wraith'
  | 'dex'
  | 'ceti'
  | 'sancti'
  | 'synoid'
  | 'secura'
  | 'rakta'
  | 'vaykor'
  | 'mutalist'
  | 'carmine'
  | 'mara';

export interface VariantRelation {
  base_entity_id: string;
  variant_type: VariantType;
  parent_entity_id?: string;
  mastery_rank_delta: number;
  is_direct_upgrade: boolean;
}

// ==========================================
// 4. STAT MODIFIERS & OPERATORS
// ==========================================

export type TargetAttribute =
  | 'health'
  | 'shield'
  | 'armor'
  | 'energy_max'
  | 'sprint_speed'
  | 'ability_strength'
  | 'ability_duration'
  | 'ability_efficiency'
  | 'ability_range'
  | 'ability_cast_speed'
  | 'shield_recharge_rate'
  | 'damage_raw'
  | 'damage_impact'
  | 'damage_puncture'
  | 'damage_slash'
  | 'damage_heat'
  | 'damage_cold'
  | 'damage_electricity'
  | 'damage_toxin'
  | 'damage_blast'
  | 'damage_radiation'
  | 'damage_gas'
  | 'damage_magnetic'
  | 'damage_viral'
  | 'damage_corrosive'
  | 'damage_void'
  | 'damage_tau'
  | 'critical_chance'
  | 'critical_multiplier'
  | 'status_chance'
  | 'multishot'
  | 'fire_rate'
  | 'attack_speed'
  | 'reload_speed'
  | 'magazine_size'
  | 'ammo_maximum'
  | 'punch_through'
  | 'status_duration';



export interface StructuredStatEffect {
  attribute: TargetAttribute;
  operator: MathOperator;
  value: number;
  condition?: string;
}

// ==========================================
// 5. LOCALIZATION (GAME DATA TRANSLATION)
// ==========================================

export interface GameDataTranslation {
  entity_id: string;
  entity_type: 'warframe' | 'weapon' | 'mod' | 'arcane' | 'shard' | 'helminth' | 'companion' | 'ability';
  language: SupportedLanguage;
  localized_name: string;
  localized_description: string;
  localized_lore_quote?: string;
  translation_status: TranslationStatus;
  provenance: DataProvenance;
}

// ==========================================
// 6. WARFRAMES & ABILITIES
// ==========================================

export interface WarframeBaseStats {
  health: number;
  shield: number;
  armor: number;
  energy: number;
  sprint_speed: number;
  shield_recharge_rate: number;
  power_strength: number;      // 100%
  power_duration: number;      // 100%
  power_efficiency: number;    // 100%
  power_range: number;         // 100%
  casting_speed: number;       // 100%
}

export interface WarframeAbilityScaling {
  attribute: 'strength' | 'duration' | 'range' | 'efficiency' | 'armor' | 'weapon_damage';
  affects_parameter: string;
  scaling_factor: number;
}

export type SourceTier = 'TIER_1' | 'TIER_2' | 'TIER_3' | 'TIER_4' | 'TIER_5';

export interface SourceRegistry {
  source_id: string;
  name: string;
  type: 'official' | 'community_dataset' | 'wiki' | 'datamine';
  authority_level: SourceTier;
  url?: string;
  license_information?: string;
  retrieval_method: string;
  retrieved_at: string;
  patch_version: string;
  allowed_usage: boolean;
  notes?: string;
}



export interface EvidenceValue<T> {
  value: T;
  status: ValidationStatus;
  confidence: number;
  source_id?: string;
  notes?: string;
}

export type CalculationSupportStatus = 'COMPLETE' | 'PARTIAL' | 'UNAVAILABLE';

export interface AbilityScaling {
  affected_by: TargetAttribute;
  operator: EvidenceValue<MathOperator>;
  coefficient: EvidenceValue<number>;
  cap_min?: EvidenceValue<number>;
  cap_max?: EvidenceValue<number>;
  source_id: string;
}

export interface AbilityCondition {
  condition_type: string;
  description: string;
}

export interface AbilityMechanic {
  mechanic_type: 'damage' | 'buff' | 'debuff' | 'crowd_control' | 'summon' | 'utility' | 'heal' | 'strip_armor';
  parameter_name?: string;
  base_value: EvidenceValue<number>;
  damage_type?: EvidenceValue<DamageType | undefined>;
  energy_cost?: EvidenceValue<number>;
  energy_drain?: EvidenceValue<number>;
  proc_chance?: EvidenceValue<number>;
  range?: EvidenceValue<number>;
  radius?: EvidenceValue<number>;
  duration?: EvidenceValue<number>;
  scalings: AbilityScaling[];
  conditions?: AbilityCondition[];
  verification_status?: ValidationStatus;
  completeness_score?: number;
}

export interface WarframeAbility {
  slot_number: 1 | 2 | 3 | 4 | 'passive';
  id: string;
  slug: string;
  name: string;
  description: string;
  energy_cost: number;
  mechanics: AbilityMechanic[];
  subsumable_via_helminth: boolean;
  notes?: string;
  verification_status?: ValidationStatus;
  calculation_support_level?: CalculationSupportStatus;
  provenance: DataProvenance;
}

export interface WarframeEntity {
  id: string;
  slug: string;
  name: string;
  display_name: string;
  variant_relation: VariantRelation;
  vault_status: 'available' | 'vaulted' | 'unvaulted_prime_resurgence';
  mastery_rank: number;
  release_date: string;
  release_version: string;
  market_supported: boolean;
  build_supported: boolean;
  calculation_supported?: boolean;
  data_completeness?: number;
  base_stats: WarframeBaseStats;
  base_polarities: Polarity[];
  aura_polarity: Polarity;
  exilus_polarity: Polarity;
  abilities: [WarframeAbility, WarframeAbility, WarframeAbility, WarframeAbility];
  passive: WarframeAbility;
  acquisition_method: string;
  description: string;
  lore_reference: string;
  provenance: DataProvenance;
}

// ==========================================
// 7. MODS & RANKS
// ==========================================

export interface ModRankValue {
  rank: number;
  drain: number;
  effects: StructuredStatEffect[];
  display_description: string;
}

export interface ModEntity {
  id: string;
  slug: string;
  name: string;
  category: ModCategory;
  type: 'regular' | 'primed' | 'archon' | 'galvanized' | 'corrupted' | 'augment' | 'flawed' | 'riven' | 'aura' | 'exilus' | 'stance' | 'peculiar';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  polarity: Polarity;
  base_drain: number;
  max_rank: number;
  tradeable: boolean;
  market_supported: boolean;
  build_supported: boolean;
  compatibilities: {
    warframe: boolean;
    primary: boolean;
    secondary: boolean;
    melee: boolean;
    companion: boolean;
    archwing: boolean;
    archgun: boolean;
    archmelee: boolean;
    necramech: boolean;
    operator: boolean;
  };
  ranks: ModRankValue[];
  set_id?: string;
  source: string;
  provenance: DataProvenance;
}

// ==========================================
// 8. WEAPONS & INCARNON
// ==========================================

export interface WeaponDamageProfile {
  impact: number;
  puncture: number;
  slash: number;
  heat: number;
  cold: number;
  electricity: number;
  toxin: number;
  blast: number;
  radiation: number;
  gas: number;
  magnetic: number;
  viral: number;
  corrosive: number;
  void: number;
  tau: number;
  total_base_damage: number;
}

export interface WeaponAttackInstance {
  attack_id: string;
  name: string;
  attack_type: 'PRIMARY' | 'SECONDARY' | 'HEAVY' | 'CHARGED' | 'INCARNON' | 'OTHER';
  damage_profile: Partial<Record<DamageType, EvidenceValue<number>>>;
  critical_chance: EvidenceValue<number>;
  critical_multiplier: EvidenceValue<number>;
  status_chance: EvidenceValue<number>;
  multishot: EvidenceValue<number>;
  fire_rate: EvidenceValue<number>;
  magazine_size?: EvidenceValue<number>;
  ammo_max?: EvidenceValue<number>;
  reload_time_seconds?: EvidenceValue<number>;
  attack_speed?: number;
  accuracy?: number;
  projectile_type?: 'hitscan' | 'projectile' | 'beam' | 'thrown' | 'area_radial';
  range_limit?: EvidenceValue<number>;
  falloff_start?: EvidenceValue<number>;
  falloff_end?: EvidenceValue<number>;
  punch_through?: EvidenceValue<number>;
}

export interface WeaponEntity {
  id: string;
  slug: string;
  uniqueName?: string;
  name: string;
  category: WeaponCategory;
  variant_relation?: VariantRelation;
  parent_weapon_id?: string;
  mastery_rank: number;
  max_rank?: number;
  disposition?: number;
  tradable?: boolean;
  attacks: WeaponAttackInstance[];
  market_supported: boolean;
  build_supported: boolean;
  verification_status?: EntityVerificationStatus;
  provenance?: DataProvenance;
  riven_disposition?: number;
  base_polarities?: Polarity[];
  stance_or_exilus_polarity?: Polarity;
  has_incarnon_form?: boolean;
  incarnon_evolutions?: { tier_number: number; perks: { id: string; name: string; description: string; stat_modifiers: StructuredStatEffect[] }[] }[];
  acquisition_method?: string;
}

export type MathOperator = 'ADD_FLAT' | 'ADD_PERCENT' | 'MULTIPLY' | 'SET_FIXED' | 'SUBTRACT_FLAT' | 'SUBTRACT_PERCENT' | 'OVERRIDE' | 'SET' | 'UNKNOWN';

export interface IncarnonEvolution {
  tier: number;
  choice: number;
  stat_affected?: string;
  operator: MathOperator;
  value?: EvidenceValue<number>;
  condition?: string;
}

export interface CalculationTrace {
  entityId: string;
  parameter: string;
  source: string;
  evidenceStatus: EntityVerificationStatus | 'UNVERIFIED';
  inputValue: number | null;
  operator: MathOperator;
  outputValue: number | null;
  blockedBy: string | null;
  calculationStatus: 'VERIFIED' | 'LIMITED' | 'UNAVAILABLE';
}

export interface ModEffect {
  stat: string;
  operator: MathOperator;
  value: EvidenceValue<number>;
  condition?: string;
}

// ==========================================
// 9. ARCANES
// ==========================================

export interface ArcaneRankValue {
  rank: number;
  effect_text: string;
  stat_modifiers: StructuredStatEffect[];
  trigger_condition: string;
  duration_seconds: number;
  max_stacks: number;
  cooldown_seconds: number;
}

export interface ArcaneEntity {
  id: string;
  slug: string;
  name: string;
  slot_type: 'warframe' | 'primary' | 'secondary' | 'melee' | 'operator' | 'amp' | 'companion';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  max_rank: number;
  market_supported: boolean;
  build_supported: boolean;
  ranks: ArcaneRankValue[];
  source: string;
  provenance: DataProvenance;
}

// ==========================================
// 10. ARCHON SHARDS
// ==========================================

export interface ArchonShardOption {
  id: string;
  attribute_type: string;
  normal_value: string;
  normal_stat: StructuredStatEffect;
  tauforged_value: string;
  tauforged_stat: StructuredStatEffect;
}

export interface ArchonShardEntity {
  type: ShardType;
  color_name: string;
  description: string;
  market_supported: boolean;
  build_supported: boolean;
  options: ArchonShardOption[];
  provenance: DataProvenance;
}

// ==========================================
// 11. HELMINTH SUBSUME
// ==========================================

export interface HelminthSubsumedAbility {
  id: string;
  name: string;
  source_warframe_id: string;
  source_warframe_name: string;
  original_ability_slot: 1 | 2 | 3 | 4;
  energy_cost: number;
  subsumed_description: string;
  effects: AbilityMechanic[];
  damage_cap_or_penalty?: string;
  incompatible_abilities?: string[];
  build_supported: boolean;
  provenance: DataProvenance;
}

// ==========================================
// 12. COMPANIONS
// ==========================================

export interface CompanionEntity {
  id: string;
  slug: string;
  name: string;
  category: CompanionCategory;
  variant_relation: VariantRelation;
  market_supported: boolean;
  build_supported: boolean;
  base_health: number;
  base_shield: number;
  base_armor: number;
  precept_abilities: {
    name: string;
    description: string;
    effect: StructuredStatEffect;
  }[];
  default_weapon_id?: string;
  bond_mod_synergies: string[];
  provenance: DataProvenance;
}

// ==========================================
// 13. AUDIT & COMPLETENESS REPORT
// ==========================================

export interface CategoryCoverageDetail {
  category: string;
  total_market_items: number;
  total_build_entities: number;
  verified_count: number;
  partially_verified_count: number;
  unverified_count: number;
  missing_count: number;
  coverage_percentage: number;
}

export interface SystemDataCoverageMatrix {
  dataset_version: string;
  patch_version: string;
  generated_at: string;
  categories: CategoryCoverageDetail[];
  unverified_or_missing_registry: {
    entity_id: string;
    entity_name: string;
    category: string;
    status: EntityVerificationStatus;
    reason: string;
  }[];
}

// ==========================================
// 14. FRONTEND UX CONTRACT & CALCULATION RESULT
// ==========================================



// ==========================================
// 15. SYSTEM EXPANSIONS (V1.6)
// ==========================================

export interface AugmentInteraction {
  mod_id: string;
  augment_name: string;
  interaction_type: 'ADD_MECHANIC' | 'OVERRIDE_SCALING' | 'CHANGE_DAMAGE_TYPE';
  altered_parameter?: string;
  altered_operator?: MathOperator;
  altered_coefficient?: number;
  conditions?: string;
  provenance_source_id: string;
}

export interface HelminthOverride {
  subsumed_ability_id: string;
  target_warframe_id: string;
  replaced_slot: 1 | 2 | 3 | 4;
  altered_cost?: EvidenceValue<number>;
  altered_range?: EvidenceValue<number>;
  altered_duration?: EvidenceValue<number>;
  altered_damage?: EvidenceValue<number>;
  diminished_effectiveness: boolean;
}

export interface ArchonShardEffect {
  shard_color: 'CRIMSON' | 'AMBER' | 'AZURE' | 'TOPAZ' | 'EMERALD' | 'VIOLET';
  is_tauforged: boolean;
  stat_affected: TargetAttribute;
  bonus_value: number;
  bonus_operator: MathOperator;
  condition?: string;
  provenance_source_id: string;
}



// Contratos históricos preservados para migração das builds salvas.
export interface ChangeLogEntry {
  id: string;
  entity_type: 'warframe' | 'weapon' | 'mod' | 'arcane' | 'shard' | 'helminth';
  entity_id: string;
  entity_name: string;
  attribute_changed: string;
  old_value: number | string;
  new_value: number | string;
  patch: string;
  timestamp: string;
  impact_summary: string;
}

export interface SavedBuildModSlot {
  slot_index: number;
  mod_id: string;
  equipped_rank: number;
  applied_polarity?: Polarity;
}

export interface SavedBuildEntity {
  id: string;
  author_id: string;
  title: string;
  warframe_id: string;
  warframe_data_version: string;
  aura_slot?: { mod_id: string; equipped_rank: number };
  exilus_slot?: { mod_id: string; equipped_rank: number };
  mod_slots: SavedBuildModSlot[];
  arcanes: [{ arcane_id: string; rank: number }?, { arcane_id: string; rank: number }?];
  archon_shards: {
    shard_type: ShardType;
    option_id: string;
    is_tauforged: boolean;
  }[];
  helminth_override?: {
    replaced_slot: 1 | 2 | 3 | 4;
    subsumed_ability_id: string;
  };
  primary_weapon_id?: string;
  secondary_weapon_id?: string;
  melee_weapon_id?: string;
  companion_id?: string;
  orokin_reactor_installed: boolean;
  forma_count: number;
  calculated_stats: WarframeBaseStats;
  build_dna: {
    damage: number;
    survival: number;
    control: number;
    energy: number;
    mobility: number;
    scalability: number;
  };
  created_at: string;
  updated_at: string;
  version: number;
}
