/**
 * VOIDEX DATA ENGINE — DATASET: ARCHON SHARDS (EXPANDED REGISTRY)
 * Fragmentos de Arconte Normais e Tauforged com Data Provenance
 */

import { ArchonShardEntity } from '../types';

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

export const ARCHON_SHARDS_DATASET: ArchonShardEntity[] = [
  // 1. CRIMSON
  {
    type: 'crimson',
    color_name: 'Carmesim (Vermelho)',
    description: 'Aprimora atributos ofensivos de Warframe, dano corpo a corpo e dano primário.',
    market_supported: true,
    build_supported: true,
    provenance: OFFICIAL_SRC,
    options: [
      {
        id: 'crimson-ability-strength',
        attribute_type: 'Força de Habilidade',
        normal_value: '+10% Força de Habilidade',
        normal_stat: { attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 10 },
        tauforged_value: '+15% Força de Habilidade',
        tauforged_stat: { attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 15 }
      },
      {
        id: 'crimson-ability-duration',
        attribute_type: 'Duração de Habilidade',
        normal_value: '+10% Duração de Habilidade',
        normal_stat: { attribute: 'ability_duration', operator: 'ADD_PERCENT', value: 10 },
        tauforged_value: '+15% Duração de Habilidade',
        tauforged_stat: { attribute: 'ability_duration', operator: 'ADD_PERCENT', value: 15 }
      },
      {
        id: 'crimson-melee-crit-dmg',
        attribute_type: 'Dano Crítico Melee',
        normal_value: '+25% Dano Crítico Corpo a Corpo',
        normal_stat: { attribute: 'critical_multiplier', operator: 'ADD_PERCENT', value: 25 },
        tauforged_value: '+37.5% Dano Crítico Corpo a Corpo',
        tauforged_stat: { attribute: 'critical_multiplier', operator: 'ADD_PERCENT', value: 37.5 }
      }
    ]
  },

  // 2. AMBER
  {
    type: 'amber',
    color_name: 'Âmbar (Amarelo)',
    description: 'Aprimora velocidade de conjuração, eficácia de orbes e mobilidade.',
    market_supported: true,
    build_supported: true,
    provenance: OFFICIAL_SRC,
    options: [
      {
        id: 'amber-casting-speed',
        attribute_type: 'Velocidade de Conjuração',
        normal_value: '+25% Velocidade de Conjuração',
        normal_stat: { attribute: 'ability_cast_speed', operator: 'ADD_PERCENT', value: 25 },
        tauforged_value: '+37.5% Velocidade de Conjuração',
        tauforged_stat: { attribute: 'ability_cast_speed', operator: 'ADD_PERCENT', value: 37.5 }
      },
      {
        id: 'amber-energy-on-spawn',
        attribute_type: 'Energia Inicial',
        normal_value: '+100% de Energia Máxima ao Iniciar Missão',
        normal_stat: { attribute: 'energy_max', operator: 'ADD_PERCENT', value: 50 },
        tauforged_value: '+150% de Energia Máxima ao Iniciar Missão',
        tauforged_stat: { attribute: 'energy_max', operator: 'ADD_PERCENT', value: 75 }
      }
    ]
  },

  // 3. AZURE
  {
    type: 'azure',
    color_name: 'Azure (Azul)',
    description: 'Aumenta capacidade de energia máxima, vida e armadura base.',
    market_supported: true,
    build_supported: true,
    provenance: OFFICIAL_SRC,
    options: [
      {
        id: 'azure-energy-max',
        attribute_type: 'Capacidade de Energia',
        normal_value: '+50 Capacidade Máxima de Energia',
        normal_stat: { attribute: 'energy_max', operator: 'ADD_FLAT', value: 50 },
        tauforged_value: '+75 Capacidade Máxima de Energia',
        tauforged_stat: { attribute: 'energy_max', operator: 'ADD_FLAT', value: 75 }
      },
      {
        id: 'azure-armor-flat',
        attribute_type: 'Armadura Base',
        normal_value: '+150 de Armadura',
        normal_stat: { attribute: 'armor', operator: 'ADD_FLAT', value: 150 },
        tauforged_value: '+225 de Armadura',
        tauforged_stat: { attribute: 'armor', operator: 'ADD_FLAT', value: 225 }
      }
    ]
  },

  // 4. EMERALD
  {
    type: 'emerald',
    color_name: 'Esmeralda (Verde)',
    description: 'Aumenta o limite de acúmulos de Corrosivo para remoção de 100% da armadura inimiga.',
    market_supported: true,
    build_supported: true,
    provenance: OFFICIAL_SRC,
    options: [
      {
        id: 'emerald-corrosive-stacks',
        attribute_type: 'Acúmulos de Status Corrosivo',
        normal_value: '+2 Acúmulos Máximos de Corrosivo (+100% strip com 2 shards)',
        normal_stat: { attribute: 'damage_corrosive', operator: 'ADD_PERCENT', value: 2 },
        tauforged_value: '+3 Acúmulos Máximos de Corrosivo',
        tauforged_stat: { attribute: 'damage_corrosive', operator: 'ADD_PERCENT', value: 3 }
      }
    ]
  }
];
