/**
 * VOIDEX DATA ENGINE - DATASET: HELMINTH (EXPANDED REGISTRY)
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
        mechanic_type: 'buff',
        parameter_name: 'damage_buff',
        base_value: { value: 30, status: 'VERIFIED', confidence: 1.0 },
        duration: { value: 30, status: 'VERIFIED', confidence: 1.0 },
        range: { value: 25, status: 'VERIFIED', confidence: 1.0 },
        scalings: [
          { affected_by: 'ability_strength', operator: { value: 'UNKNOWN', status: 'MISSING', confidence: 0.5 }, coefficient: { value: 1.0, status: 'MISSING', confidence: 0.5 }, source_id: 'src_de_official_2026' },
          { affected_by: 'ability_duration', operator: { value: 'UNKNOWN', status: 'MISSING', confidence: 0.5 }, coefficient: { value: 1.0, status: 'MISSING', confidence: 0.5 }, source_id: 'src_de_official_2026' },
          { affected_by: 'ability_range', operator: { value: 'UNKNOWN', status: 'MISSING', confidence: 0.5 }, coefficient: { value: 1.0, status: 'MISSING', confidence: 0.5 }, source_id: 'src_de_official_2026' }
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
        mechanic_type: 'crowd_control',
        parameter_name: 'slow_percentage',
        base_value: { value: 35, status: 'VERIFIED', confidence: 1.0 },
        radius: { value: 16, status: 'VERIFIED', confidence: 1.0 },
        scalings: [
          { affected_by: 'ability_strength', operator: { value: 'UNKNOWN', status: 'MISSING', confidence: 0.5 }, coefficient: { value: 1.0, status: 'MISSING', confidence: 0.5 }, source_id: 'src_de_official_2026' },
          { affected_by: 'ability_range', operator: { value: 'UNKNOWN', status: 'MISSING', confidence: 0.5 }, coefficient: { value: 1.0, status: 'MISSING', confidence: 0.5 }, source_id: 'src_de_official_2026' }
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
        mechanic_type: 'strip_armor',
        parameter_name: 'strip_percentage',
        base_value: { value: 25, status: 'VERIFIED', confidence: 1.0 },
        radius: { value: 8, status: 'VERIFIED', confidence: 1.0 },
        duration: { value: 2.5, status: 'VERIFIED', confidence: 1.0 },
        scalings: [
          { affected_by: 'ability_strength', operator: { value: 'UNKNOWN', status: 'MISSING', confidence: 0.5 }, coefficient: { value: 1.0, status: 'MISSING', confidence: 0.5 }, source_id: 'src_de_official_2026' },
          { affected_by: 'ability_duration', operator: { value: 'UNKNOWN', status: 'MISSING', confidence: 0.5 }, coefficient: { value: 1.0, status: 'MISSING', confidence: 0.5 }, source_id: 'src_de_official_2026' }
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
        mechanic_type: 'buff',
        parameter_name: 'viral_bonus',
        damage_type: { value: 'viral', status: 'VERIFIED', confidence: 1.0 },
        base_value: { value: 45, status: 'VERIFIED', confidence: 1.0 },
        duration: { value: 25, status: 'VERIFIED', confidence: 1.0 },
        scalings: [
          { affected_by: 'ability_strength', operator: { value: 'UNKNOWN', status: 'MISSING', confidence: 0.5 }, coefficient: { value: 1.0, status: 'MISSING', confidence: 0.5 }, source_id: 'src_de_official_2026' },
          { affected_by: 'ability_duration', operator: { value: 'UNKNOWN', status: 'MISSING', confidence: 0.5 }, coefficient: { value: 1.0, status: 'MISSING', confidence: 0.5 }, source_id: 'src_de_official_2026' }
        ]
      }
    ],
    provenance: OFFICIAL_SRC
  }
];
