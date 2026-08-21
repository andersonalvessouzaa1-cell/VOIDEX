/**
 * VOIDEX DATA ENGINE — DATASET: WEAPONS (EXPANDED REGISTRY)
 * Catálogo Normalizado com Data Provenance, Variant System e Separação Market/Build
 */

import { WeaponEntity } from '../types';

const OFFICIAL_SRC = {
  source_id: 'src_de_official_2026',
  source_type: 'official_export' as const,
  source_name: 'Digital Extremes Official Data Export & In-Game Codex',
  retrieved_at: '2026-08-20T00:00:00Z',
  verified_at: '2026-08-20T12:00:00Z',
  dataset_version: 'v1.1',
  patch_version: 'Update 38.0.2 - 1999',
  verification_status: 'VERIFIED' as const,
  confidence: 1.0
};

export const WEAPONS_DATASET: WeaponEntity[] = [
  // 1. TORID (INCARNON)
  {
    id: 'torid',
    slug: 'torid',
    name: 'Torid',
    category: 'primary_rifle',
    variant_relation: {
      base_entity_id: 'torid',
      variant_type: 'base',
      mastery_rank_delta: 0,
      is_direct_upgrade: false
    },
    mastery_rank: 12,
    market_supported: true,
    build_supported: true,
    attacks: [{
      attack_id: 'default',
      name: 'Default Attack',
      attack_type: 'PRIMARY',
      damage_profile: {
      impact: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      puncture: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      slash: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      heat: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      cold: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      electricity: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      toxin: { value: 100, status: 'VERIFIED', confidence: 1.0 },
      blast: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      radiation: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      gas: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      magnetic: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      viral: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      corrosive: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      void: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      tau: { value: 0, status: 'VERIFIED', confidence: 1.0 }
    
      },
    fire_rate: { value: 1.5, status: 'VERIFIED', confidence: 1.0 },
    critical_chance: { value: 0.15, status: 'VERIFIED', confidence: 1.0 },
    critical_multiplier: { value: 2.0, status: 'VERIFIED', confidence: 1.0 },
    status_chance: { value: 0.40, status: 'VERIFIED', confidence: 1.0 },
    multishot: { value: 1.0, status: 'VERIFIED', confidence: 1.0 },
    magazine_size: { value: 10, status: 'VERIFIED', confidence: 1.0 },
    ammo_max: { value: 60, status: 'VERIFIED', confidence: 1.0 },
    reload_time_seconds: { value: 1.7, status: 'VERIFIED', confidence: 1.0 },
    punch_through: { value: 0, status: 'VERIFIED', confidence: 1.0 },
    accuracy: 100,
    projectile_type: 'area_radial'
    }],
    riven_disposition: 1.35,
    base_polarities: ['vazarin', 'vazarin'],
    has_incarnon_form: true,
    incarnon_evolutions: [
      {
        tier_number: 2,
        perks: [
          { id: 'torid-evo-2-1', name: 'Final Fusillade', description: '+40 de Dano Base.', stat_modifiers: [{ attribute: 'damage_raw', operator: 'ADD_FLAT', value: 40 }] },
          { id: 'torid-evo-2-2', name: 'Bloody Tributary', description: '+30 de Dano Base, +10% Chance Crítica.', stat_modifiers: [{ attribute: 'damage_raw', operator: 'ADD_FLAT', value: 30 }, { attribute: 'critical_chance', operator: 'ADD_PERCENT', value: 10 }] }
        ]
      },
      {
        tier_number: 3,
        perks: [
          { id: 'torid-evo-3-1', name: 'Extended Volley', description: '+10 de Capacidade do Pente.', stat_modifiers: [{ attribute: 'magazine_size', operator: 'ADD_FLAT', value: 10 }] },
          { id: 'torid-evo-3-2', name: 'Swift Deliverance', description: '+50% Velocidade de Projétil.', stat_modifiers: [] }
        ]
      },
      {
        tier_number: 4,
        perks: [
          { id: 'torid-evo-4-1', name: 'Survivor\'s Edge', description: '+14% Chance Crítica e +14% Chance de Status.', stat_modifiers: [{ attribute: 'critical_chance', operator: 'ADD_PERCENT', value: 14 }, { attribute: 'status_chance', operator: 'ADD_PERCENT', value: 14 }] },
          { id: 'torid-evo-4-2', name: 'Elemental Balance', description: '+20% Chance de Status.', stat_modifiers: [{ attribute: 'status_chance', operator: 'ADD_PERCENT', value: 20 }] }
        ]
      },
      {
        tier_number: 5,
        perks: [
          { id: 'torid-evo-5-1', name: 'Incarnon Beam Mode', description: 'Transforma a arma em um feixe contínuo de auto-mira em cadeia que atinge até 7 inimigos simultaneamente com Eletricidade e Toxina.', stat_modifiers: [] }
        ]
      }
    ],
    acquisition_method: 'Dojo Bio Lab (Gênese Incarnon no Circuito Steel Path de Duviri)',
    provenance: OFFICIAL_SRC
  },

  // 2. EPITAPH PRIME
  {
    id: 'epitaph-prime',
    slug: 'epitaph-prime',
    name: 'Epitaph Prime',
    category: 'secondary_pistol',
    variant_relation: {
      base_entity_id: 'epitaph',
      variant_type: 'prime',
      parent_entity_id: 'epitaph',
      mastery_rank_delta: 6,
      is_direct_upgrade: true
    },
    mastery_rank: 14,
    market_supported: true,
    build_supported: true,
    attacks: [{
      attack_id: 'default',
      name: 'Default Attack',
      attack_type: 'PRIMARY',
      damage_profile: {
      impact: { value: 15, status: 'VERIFIED', confidence: 1.0 },
      puncture: { value: 15, status: 'VERIFIED', confidence: 1.0 },
      slash: { value: 20, status: 'VERIFIED', confidence: 1.0 },
      heat: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      cold: { value: 50, status: 'VERIFIED', confidence: 1.0 },
      electricity: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      toxin: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      blast: { value: 100, status: 'VERIFIED', confidence: 1.0 },
      radiation: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      gas: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      magnetic: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      viral: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      corrosive: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      void: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      tau: { value: 0, status: 'VERIFIED', confidence: 1.0 }
    
      },
    fire_rate: { value: 1.5, status: 'VERIFIED', confidence: 1.0 },
    critical_chance: { value: 0.08, status: 'VERIFIED', confidence: 1.0 },
    critical_multiplier: { value: 1.6, status: 'VERIFIED', confidence: 1.0 },
    status_chance: { value: 0.50, status: 'VERIFIED', confidence: 1.0 },
    multishot: { value: 1.0, status: 'VERIFIED', confidence: 1.0 },
    magazine_size: { value: 1, status: 'VERIFIED', confidence: 1.0 },
    ammo_max: { value: 60, status: 'VERIFIED', confidence: 1.0 },
    reload_time_seconds: { value: 0.8, status: 'VERIFIED', confidence: 1.0 },
    punch_through: { value: 0, status: 'VERIFIED', confidence: 1.0 },
    accuracy: 100,
    projectile_type: 'area_radial'
    }],
    riven_disposition: 0.85,
    base_polarities: ['madurai', 'naramon'],
    has_incarnon_form: false,
    acquisition_method: 'Relíquias Void (Axi E1, Neo E3, Meso E2, Lith E1)',
    provenance: OFFICIAL_SRC
  },

  // 3. GLAIVE PRIME
  {
    id: 'glaive-prime',
    slug: 'glaive-prime',
    name: 'Glaive Prime',
    category: 'melee_glaive',
    variant_relation: {
      base_entity_id: 'glaive',
      variant_type: 'prime',
      parent_entity_id: 'glaive',
      mastery_rank_delta: 9,
      is_direct_upgrade: true
    },
    mastery_rank: 10,
    market_supported: true,
    build_supported: true,
    attacks: [{
      attack_id: 'default',
      name: 'Default Attack',
      attack_type: 'PRIMARY',
      damage_profile: {
      impact: { value: 24.6, status: 'VERIFIED', confidence: 1.0 },
      puncture: { value: 16.4, status: 'VERIFIED', confidence: 1.0 },
      slash: { value: 123.0, status: 'VERIFIED', confidence: 1.0 },
      heat: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      cold: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      electricity: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      toxin: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      blast: { value: 328.0, status: 'VERIFIED', confidence: 1.0 },
      radiation: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      gas: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      magnetic: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      viral: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      corrosive: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      void: { value: 0, status: 'VERIFIED', confidence: 1.0 },
      tau: { value: 0, status: 'VERIFIED', confidence: 1.0 }
    
      },
    fire_rate: { value: 1.0, status: 'VERIFIED', confidence: 1.0 },
    attack_speed: 1.17,
    critical_chance: { value: 0.26, status: 'VERIFIED', confidence: 1.0 },
    critical_multiplier: { value: 2.2, status: 'VERIFIED', confidence: 1.0 },
    status_chance: { value: 0.34, status: 'VERIFIED', confidence: 1.0 },
    multishot: { value: 1.0, status: 'VERIFIED', confidence: 1.0 },
    magazine_size: { value: 0, status: 'VERIFIED', confidence: 1.0 },
    ammo_max: { value: 0, status: 'VERIFIED', confidence: 1.0 },
    reload_time_seconds: { value: 0, status: 'VERIFIED', confidence: 1.0 },
    punch_through: { value: 0, status: 'VERIFIED', confidence: 1.0 },
    accuracy: 100,
    projectile_type: 'thrown'
    }],
    riven_disposition: 0.70,
    base_polarities: ['madurai', 'vazarin'],
    stance_or_exilus_polarity: 'naramon',
    has_incarnon_form: false,
    acquisition_method: 'Prime Resurgence (Axi G2, Neo G1)',
    provenance: OFFICIAL_SRC
  }
];
