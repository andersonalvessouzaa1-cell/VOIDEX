/**
 * VOIDEX DATA ENGINE — DATASET: ARCANES (EXPANDED REGISTRY)
 * Catálogo Normalizado com Data Provenance e Separação Market/Build
 */

import { ArcaneEntity } from '../types';

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

export const ARCANES_DATASET: ArcaneEntity[] = [
  // 1. ARCANE ENERGIZE
  {
    id: 'arcane-energize',
    slug: 'arcane-energize',
    name: 'Arcane Energize',
    slot_type: 'warframe',
    rarity: 'legendary',
    max_rank: 5,
    market_supported: true,
    build_supported: true,
    ranks: [
      { rank: 0, effect_text: '10% de chance de restaurar 150 de energia em área de 5m ao coletar orbe.', stat_modifiers: [], trigger_condition: 'on_energy_orb', duration_seconds: 0, max_stacks: 1, cooldown_seconds: 15 },
      { rank: 1, effect_text: '20% de chance de restaurar 150 de energia em área de 7m ao coletar orbe.', stat_modifiers: [], trigger_condition: 'on_energy_orb', duration_seconds: 0, max_stacks: 1, cooldown_seconds: 15 },
      { rank: 2, effect_text: '30% de chance de restaurar 150 de energia em área de 9m ao coletar orbe.', stat_modifiers: [], trigger_condition: 'on_energy_orb', duration_seconds: 0, max_stacks: 1, cooldown_seconds: 15 },
      { rank: 3, effect_text: '40% de chance de restaurar 150 de energia em área de 11m ao coletar orbe.', stat_modifiers: [], trigger_condition: 'on_energy_orb', duration_seconds: 0, max_stacks: 1, cooldown_seconds: 15 },
      { rank: 4, effect_text: '50% de chance de restaurar 150 de energia em área de 13m ao coletar orbe.', stat_modifiers: [], trigger_condition: 'on_energy_orb', duration_seconds: 0, max_stacks: 1, cooldown_seconds: 15 },
      { rank: 5, effect_text: '60% de chance de restaurar 150 de energia adicional para você e aliados em até 15m ao pegar um orbe de energia.', stat_modifiers: [], trigger_condition: 'on_energy_orb', duration_seconds: 0, max_stacks: 1, cooldown_seconds: 15 }
    ],
    source: 'Hydrolyst Eidolon nas Planícies de Eidolon / Operações Especiais',
    provenance: OFFICIAL_SRC
  },

  // 2. ARCANE MOLT AUGMENTED
  {
    id: 'arcane-molt-augmented',
    slug: 'arcane-molt-augmented',
    name: 'Arcane Molt Augmented',
    slot_type: 'warframe',
    rarity: 'rare',
    max_rank: 5,
    market_supported: true,
    build_supported: true,
    ranks: [
      { rank: 0, effect_text: '+0.04% de Força de Habilidade por abate (até 250 acúmulos = +10% max).', stat_modifiers: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 10, condition: 'max_stacks' }], trigger_condition: 'on_kill', duration_seconds: 0, max_stacks: 250, cooldown_seconds: 0 },
      { rank: 1, effect_text: '+0.08% de Força de Habilidade por abate (até +20% max).', stat_modifiers: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 20, condition: 'max_stacks' }], trigger_condition: 'on_kill', duration_seconds: 0, max_stacks: 250, cooldown_seconds: 0 },
      { rank: 2, effect_text: '+0.12% de Força de Habilidade por abate (até +30% max).', stat_modifiers: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 30, condition: 'max_stacks' }], trigger_condition: 'on_kill', duration_seconds: 0, max_stacks: 250, cooldown_seconds: 0 },
      { rank: 3, effect_text: '+0.16% de Força de Habilidade por abate (até +40% max).', stat_modifiers: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 40, condition: 'max_stacks' }], trigger_condition: 'on_kill', duration_seconds: 0, max_stacks: 250, cooldown_seconds: 0 },
      { rank: 4, effect_text: '+0.20% de Força de Habilidade por abate (até +50% max).', stat_modifiers: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 50, condition: 'max_stacks' }], trigger_condition: 'on_kill', duration_seconds: 0, max_stacks: 250, cooldown_seconds: 0 },
      { rank: 5, effect_text: '+0.24% de Força de Habilidade por abate (até 250 acúmulos = +60% de Força de Habilidade total).', stat_modifiers: [{ attribute: 'ability_strength', operator: 'ADD_PERCENT', value: 60, condition: 'max_stacks' }], trigger_condition: 'on_kill', duration_seconds: 0, max_stacks: 250, cooldown_seconds: 0 }
    ],
    source: 'Holdfasts (Zariman Ten Zero - Cavalero)',
    provenance: OFFICIAL_SRC
  }
];
