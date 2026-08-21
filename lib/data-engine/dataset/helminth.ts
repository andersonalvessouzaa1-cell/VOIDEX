/**
 * VOIDEX DATA ENGINE — DATASET: HELMINTH (EXPANDED REGISTRY)
 * Catálogo de Habilidades Subsumíveis com Data Provenance
 */

import { HelminthSubsumedAbility } from '../types';

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

export const HELMINTH_DATASET: HelminthSubsumedAbility[] = [
  // 1. ROAR (RHINO)
  {
    id: 'helminth-roar',
    name: 'Roar',
    source_warframe_id: 'rhino',
    source_warframe_name: 'Rhino',
    original_ability_slot: 3,
    energy_cost: 75,
    subsumed_description: 'Concede bônus de dano global para todas as armas e habilidades.',
    damage_cap_or_penalty: 'Limitado a +30% de dano base quando subsumido.',
    incompatible_abilities: ['eclipse', 'vex_armor', 'xatas_whisper', 'nourish_damage'],
    build_supported: true,
    effects: [
      {
        type: 'buff',
        base_value: 30,
        duration_seconds: 30,
        range_meters: 25,
        scalings: [
          { attribute: 'strength', affects_parameter: 'damage_buff', scaling_factor: 1.0 },
          { attribute: 'duration', affects_parameter: 'duration_seconds', scaling_factor: 1.0 },
          { attribute: 'range', affects_parameter: 'range_meters', scaling_factor: 1.0 }
        ]
      }
    ],
    provenance: OFFICIAL_SRC
  },

  // 2. GLOOM (SEVAGOTH)
  {
    id: 'helminth-gloom',
    name: 'Gloom',
    source_warframe_id: 'sevagoth',
    source_warframe_name: 'Sevagoth',
    original_ability_slot: 2,
    energy_cost: 50,
    subsumed_description: 'Cria uma aura pulsante que desacelera inimigos em até 95% e concede roubo de vida integral.',
    damage_cap_or_penalty: 'Lentidão máxima limitada a 95% em 272% de Força.',
    build_supported: true,
    effects: [
      {
        type: 'crowd_control',
        base_value: 35,
        radius_meters: 16,
        scalings: [
          { attribute: 'strength', affects_parameter: 'slow_percentage', scaling_factor: 1.0 },
          { attribute: 'range', affects_parameter: 'radius_meters', scaling_factor: 1.0 }
        ]
      }
    ],
    provenance: OFFICIAL_SRC
  },

  // 3. PILLAGE (HILDRYN)
  {
    id: 'helminth-pillage',
    name: 'Pillage',
    source_warframe_id: 'hildryn',
    source_warframe_name: 'Hildryn',
    original_ability_slot: 2,
    energy_cost: 50,
    subsumed_description: 'Rouba escudos e armaduras de inimigos em onda expansiva.',
    damage_cap_or_penalty: '25% de strip base (requer 328% de Força com Corrosive Projection).',
    build_supported: true,
    effects: [
      {
        type: 'strip_armor',
        base_value: 25,
        radius_meters: 8,
        duration_seconds: 2.5,
        scalings: [
          { attribute: 'strength', affects_parameter: 'strip_percentage', scaling_factor: 1.0 },
          { attribute: 'duration', affects_parameter: 'wave_expansion_duration', scaling_factor: 1.0 }
        ]
      }
    ],
    provenance: OFFICIAL_SRC
  },

  // 4. NOURISH (GRENDEL)
  {
    id: 'helminth-nourish',
    name: 'Nourish',
    source_warframe_id: 'grendel',
    source_warframe_name: 'Grendel',
    original_ability_slot: 2,
    energy_cost: 50,
    subsumed_description: 'Infunde dano Viral nas armas e multiplica ganho de energia por 3x.',
    damage_cap_or_penalty: 'Multiplicador de energia fixado em 2x-3x.',
    build_supported: true,
    effects: [
      {
        type: 'buff',
        damage_type: 'viral',
        base_value: 45,
        duration_seconds: 25,
        scalings: [
          { attribute: 'strength', affects_parameter: 'viral_bonus', scaling_factor: 1.0 },
          { attribute: 'duration', affects_parameter: 'duration_seconds', scaling_factor: 1.0 }
        ]
      }
    ],
    provenance: OFFICIAL_SRC
  }
];
