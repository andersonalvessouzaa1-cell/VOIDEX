/**
 * VOIDEX DATA ENGINE — DATASET: COMPANIONS (EXPANDED REGISTRY)
 * Catálogo Normalizado de Companions com Data Provenance
 */

import { CompanionEntity } from '../types';

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

export const COMPANIONS_DATASET: CompanionEntity[] = [
  // 1. NAUTILUS PRIME
  {
    id: 'nautilus-prime',
    slug: 'nautilus-prime',
    name: 'Nautilus Prime',
    category: 'sentinel',
    variant_relation: {
      base_entity_id: 'nautilus',
      variant_type: 'prime',
      parent_entity_id: 'nautilus',
      mastery_rank_delta: 0,
      is_direct_upgrade: true
    },
    market_supported: true,
    build_supported: true,
    base_health: 560,
    base_shield: 350,
    base_armor: 150,
    precept_abilities: [
      {
        name: 'Cordon',
        description: 'Puxa e agrupa inimigos em um raio de 30m em um único ponto a cada 15 segundos.',
        effect: { attribute: 'damage_raw', operator: 'ADD_FLAT', value: 0 }
      },
      {
        name: 'Auto Omni',
        description: 'Repara avarias automaticamente no Railjack.',
        effect: { attribute: 'damage_raw', operator: 'ADD_FLAT', value: 0 }
      }
    ],
    default_weapon_id: 'verglas-prime',
    bond_mod_synergies: ['Manifold Bond', 'Momentous Bond', 'Duplex Bond'],
    provenance: OFFICIAL_SRC
  },

  // 2. PANZER VULPAPHYLA
  {
    id: 'panzer-vulpaphyla',
    slug: 'panzer-vulpaphyla',
    name: 'Panzer Vulpaphyla',
    category: 'vulpaphyla',
    variant_relation: {
      base_entity_id: 'panzer-vulpaphyla',
      variant_type: 'base',
      mastery_rank_delta: 0,
      is_direct_upgrade: false
    },
    market_supported: true,
    build_supported: true,
    base_health: 680,
    base_shield: 200,
    base_armor: 100,
    precept_abilities: [
      {
        name: 'Viral Quills',
        description: 'Dispara espinhos virais em cadeia.',
        effect: { attribute: 'damage_viral', operator: 'ADD_PERCENT', value: 100 }
      },
      {
        name: 'Panzer Devolution',
        description: 'Ao morrer, transforma-se em larva invulnerável e renasce após 30 segundos.',
        effect: { attribute: 'health', operator: 'ADD_PERCENT', value: 100 }
      }
    ],
    bond_mod_synergies: ['Synth Deconstruct', 'Tenacious Bond', 'Reinforced Bond'],
    provenance: OFFICIAL_SRC
  },

  // 3. SMEETA KAVAT
  {
    id: 'smeeta-kavat',
    slug: 'smeeta-kavat',
    name: 'Smeeta Kavat',
    category: 'kavat',
    variant_relation: {
      base_entity_id: 'smeeta-kavat',
      variant_type: 'base',
      mastery_rank_delta: 0,
      is_direct_upgrade: false
    },
    market_supported: true,
    build_supported: true,
    base_health: 400,
    base_shield: 240,
    base_armor: 80,
    precept_abilities: [
      {
        name: 'Charm',
        description: 'Concede buffs aleatórios (+200% Crítico, Dobro de Recursos).',
        effect: { attribute: 'critical_chance', operator: 'ADD_PERCENT', value: 200 }
      },
      {
        name: 'Mischief',
        description: 'Gera uma ilusão que atrai a atenção inimiga.',
        effect: { attribute: 'damage_raw', operator: 'ADD_FLAT', value: 0 }
      }
    ],
    bond_mod_synergies: ['Tandem Bond', 'Bite', 'Link Health'],
    provenance: OFFICIAL_SRC
  }
];
