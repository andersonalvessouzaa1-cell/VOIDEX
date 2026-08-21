/**
 * VOIDEX DATA ENGINE — DATASET: MODS & SETS (EXPANDED REGISTRY)
 * Catálogo Normalizado com Data Provenance e Separação Market/Build
 */

import { ModEntity } from '../types';

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

export const MODS_DATASET: ModEntity[] = [
  // 1. BLIND RAGE
  {
    id: 'blind-rage',
    slug: 'blind-rage',
    name: 'Blind Rage',
    category: 'warframe',
    type: 'corrupted',
    rarity: 'rare',
    polarity: 'madurai',
    base_drain: 6,
    max_rank: 10,
    tradeable: true,
    market_supported: true,
    build_supported: true,
    compatibilities: {
      warframe: true,
      primary: false,
      secondary: false,
      melee: false,
      companion: false,
      archwing: false,
      archgun: false,
      archmelee: false,
      necramech: false,
      operator: false
    },
    ranks: [
      { rank: 0, drain: 6, display_description: '+9% Força de Habilidade, -5% Eficiência', effects: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 9 }, { attribute: 'ability_efficiency', operator: 'SUBTRACT_PERCENT', value: 5 }] },
      { rank: 1, drain: 7, display_description: '+18% Força de Habilidade, -10% Eficiência', effects: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 18 }, { attribute: 'ability_efficiency', operator: 'SUBTRACT_PERCENT', value: 10 }] },
      { rank: 2, drain: 8, display_description: '+27% Força de Habilidade, -15% Eficiência', effects: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 27 }, { attribute: 'ability_efficiency', operator: 'SUBTRACT_PERCENT', value: 15 }] },
      { rank: 3, drain: 9, display_description: '+36% Força de Habilidade, -20% Eficiência', effects: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 36 }, { attribute: 'ability_efficiency', operator: 'SUBTRACT_PERCENT', value: 20 }] },
      { rank: 4, drain: 10, display_description: '+45% Força de Habilidade, -25% Eficiência', effects: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 45 }, { attribute: 'ability_efficiency', operator: 'SUBTRACT_PERCENT', value: 25 }] },
      { rank: 5, drain: 11, display_description: '+54% Força de Habilidade, -30% Eficiência', effects: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 54 }, { attribute: 'ability_efficiency', operator: 'SUBTRACT_PERCENT', value: 30 }] },
      { rank: 6, drain: 12, display_description: '+63% Força de Habilidade, -35% Eficiência', effects: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 63 }, { attribute: 'ability_efficiency', operator: 'SUBTRACT_PERCENT', value: 35 }] },
      { rank: 7, drain: 13, display_description: '+72% Força de Habilidade, -40% Eficiência', effects: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 72 }, { attribute: 'ability_efficiency', operator: 'SUBTRACT_PERCENT', value: 40 }] },
      { rank: 8, drain: 14, display_description: '+81% Força de Habilidade, -45% Eficiência', effects: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 81 }, { attribute: 'ability_efficiency', operator: 'SUBTRACT_PERCENT', value: 45 }] },
      { rank: 9, drain: 15, display_description: '+90% Força de Habilidade, -50% Eficiência', effects: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 90 }, { attribute: 'ability_efficiency', operator: 'SUBTRACT_PERCENT', value: 50 }] },
      { rank: 10, drain: 16, display_description: '+99% Força de Habilidade, -55% Eficiência', effects: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 99 }, { attribute: 'ability_efficiency', operator: 'SUBTRACT_PERCENT', value: 55 }] }
    ],
    source: 'Cofres Orokin em Deimos (Chaves Dragão)',
    provenance: OFFICIAL_SRC
  },

  // 2. OVEREXTENDED
  {
    id: 'overextended',
    slug: 'overextended',
    name: 'Overextended',
    category: 'warframe',
    type: 'corrupted',
    rarity: 'rare',
    polarity: 'vazarin',
    base_drain: 6,
    max_rank: 5,
    tradeable: true,
    market_supported: true,
    build_supported: true,
    compatibilities: {
      warframe: true,
      primary: false,
      secondary: false,
      melee: false,
      companion: false,
      archwing: false,
      archgun: false,
      archmelee: false,
      necramech: false,
      operator: false
    },
    ranks: [
      { rank: 0, drain: 6, display_description: '+15% Alcance de Habilidade, -10% Força', effects: [{ attribute: 'ability_range', operator: 'ADD_PERCENT', value: 15 }, { attribute: 'ability_strength', operator: 'SUBTRACT_PERCENT', value: 10 }] },
      { rank: 1, drain: 7, display_description: '+30% Alcance de Habilidade, -20% Força', effects: [{ attribute: 'ability_range', operator: 'ADD_PERCENT', value: 30 }, { attribute: 'ability_strength', operator: 'SUBTRACT_PERCENT', value: 20 }] },
      { rank: 2, drain: 8, display_description: '+45% Alcance de Habilidade, -30% Força', effects: [{ attribute: 'ability_range', operator: 'ADD_PERCENT', value: 45 }, { attribute: 'ability_strength', operator: 'SUBTRACT_PERCENT', value: 30 }] },
      { rank: 3, drain: 9, display_description: '+60% Alcance de Habilidade, -40% Força', effects: [{ attribute: 'ability_range', operator: 'ADD_PERCENT', value: 60 }, { attribute: 'ability_strength', operator: 'SUBTRACT_PERCENT', value: 40 }] },
      { rank: 4, drain: 10, display_description: '+75% Alcance de Habilidade, -50% Força', effects: [{ attribute: 'ability_range', operator: 'ADD_PERCENT', value: 75 }, { attribute: 'ability_strength', operator: 'SUBTRACT_PERCENT', value: 50 }] },
      { rank: 5, drain: 11, display_description: '+90% Alcance de Habilidade, -60% Força', effects: [{ attribute: 'ability_range', operator: 'ADD_PERCENT', value: 90 }, { attribute: 'ability_strength', operator: 'SUBTRACT_PERCENT', value: 60 }] }
    ],
    source: 'Cofres Orokin em Deimos (Chaves Dragão)',
    provenance: OFFICIAL_SRC
  },

  // 3. PRIMED CONTINUITY
  {
    id: 'primed-continuity',
    slug: 'primed-continuity',
    name: 'Primed Continuity',
    category: 'warframe',
    type: 'primed',
    rarity: 'legendary',
    polarity: 'madurai',
    base_drain: 4,
    max_rank: 10,
    tradeable: true,
    market_supported: true,
    build_supported: true,
    compatibilities: {
      warframe: true,
      primary: false,
      secondary: false,
      melee: false,
      companion: false,
      archwing: false,
      archgun: false,
      archmelee: false,
      necramech: false,
      operator: false
    },
    ranks: [
      { rank: 0, drain: 4, display_description: '+5% Duração', effects: [{ attribute: 'ability_duration', operator: 'ADD_PERCENT', value: 5 }] },
      { rank: 1, drain: 5, display_description: '+10% Duração', effects: [{ attribute: 'ability_duration', operator: 'ADD_PERCENT', value: 10 }] },
      { rank: 2, drain: 6, display_description: '+15% Duração', effects: [{ attribute: 'ability_duration', operator: 'ADD_PERCENT', value: 15 }] },
      { rank: 3, drain: 7, display_description: '+20% Duração', effects: [{ attribute: 'ability_duration', operator: 'ADD_PERCENT', value: 20 }] },
      { rank: 4, drain: 8, display_description: '+25% Duração', effects: [{ attribute: 'ability_duration', operator: 'ADD_PERCENT', value: 25 }] },
      { rank: 5, drain: 9, display_description: '+30% Duração', effects: [{ attribute: 'ability_duration', operator: 'ADD_PERCENT', value: 30 }] },
      { rank: 6, drain: 10, display_description: '+35% Duração', effects: [{ attribute: 'ability_duration', operator: 'ADD_PERCENT', value: 35 }] },
      { rank: 7, drain: 11, display_description: '+40% Duração', effects: [{ attribute: 'ability_duration', operator: 'ADD_PERCENT', value: 40 }] },
      { rank: 8, drain: 12, display_description: '+45% Duração', effects: [{ attribute: 'ability_duration', operator: 'ADD_PERCENT', value: 45 }] },
      { rank: 9, drain: 13, display_description: '+50% Duração', effects: [{ attribute: 'ability_duration', operator: 'ADD_PERCENT', value: 50 }] },
      { rank: 10, drain: 14, display_description: '+55% Duração', effects: [{ attribute: 'ability_duration', operator: 'ADD_PERCENT', value: 55 }] }
    ],
    source: 'Baro Ki\'Teer',
    provenance: OFFICIAL_SRC
  },

  // 4. CORROSIVE PROJECTION (Aura)
  {
    id: 'corrosive-projection',
    slug: 'corrosive-projection',
    name: 'Corrosive Projection',
    category: 'aura',
    type: 'aura',
    rarity: 'uncommon',
    polarity: 'naramon',
    base_drain: -2,
    max_rank: 5,
    tradeable: true,
    market_supported: true,
    build_supported: true,
    compatibilities: {
      warframe: true,
      primary: false,
      secondary: false,
      melee: false,
      companion: false,
      archwing: false,
      archgun: false,
      archmelee: false,
      necramech: false,
      operator: false
    },
    ranks: [
      { rank: 0, drain: -2, display_description: '-3% Armadura Inimiga', effects: [{ attribute: 'armor', operator: 'SUBTRACT_PERCENT', value: 3, condition: 'enemy_armor' }] },
      { rank: 1, drain: -3, display_description: '-6% Armadura Inimiga', effects: [{ attribute: 'armor', operator: 'SUBTRACT_PERCENT', value: 6, condition: 'enemy_armor' }] },
      { rank: 2, drain: -4, display_description: '-9% Armadura Inimiga', effects: [{ attribute: 'armor', operator: 'SUBTRACT_PERCENT', value: 9, condition: 'enemy_armor' }] },
      { rank: 3, drain: -5, display_description: '-12% Armadura Inimiga', effects: [{ attribute: 'armor', operator: 'SUBTRACT_PERCENT', value: 12, condition: 'enemy_armor' }] },
      { rank: 4, drain: -6, display_description: '-15% Armadura Inimiga', effects: [{ attribute: 'armor', operator: 'SUBTRACT_PERCENT', value: 15, condition: 'enemy_armor' }] },
      { rank: 5, drain: -7, display_description: '-18% Armadura Inimiga', effects: [{ attribute: 'armor', operator: 'SUBTRACT_PERCENT', value: 18, condition: 'enemy_armor' }] }
    ],
    source: 'Ofertas de Crédito da Nightwave',
    provenance: OFFICIAL_SRC
  },

  // 5. CATHODE CURRENT (Augment)
  {
    id: 'cathode-current',
    slug: 'cathode-current',
    name: 'Cathode Current',
    category: 'warframe',
    type: 'augment',
    rarity: 'rare',
    polarity: 'zenurik',
    base_drain: 6,
    max_rank: 3,
    tradeable: true,
    market_supported: true,
    build_supported: true,
    compatibilities: {
      warframe: true,
      primary: false,
      secondary: false,
      melee: false,
      companion: false,
      archwing: false,
      archgun: false,
      archmelee: false,
      necramech: false,
      operator: false
    },
    ranks: [
      { rank: 0, drain: 6, display_description: 'Renova habilidades ao matar e adiciona +2s.', effects: [] },
      { rank: 1, drain: 7, display_description: 'Renova habilidades ao matar e adiciona +3s.', effects: [] },
      { rank: 2, drain: 8, display_description: 'Renova habilidades ao matar e adiciona +4s.', effects: [] },
      { rank: 3, drain: 9, display_description: 'Ao matar com Cathode Grace ativo, Rotorswell dispara uma descarga extra e estende o tempo de ambas as habilidades.', effects: [] }
    ],
    source: 'Sindicatos Arbiters of Hexis / Perrin Sequence',
    provenance: OFFICIAL_SRC
  }
];
