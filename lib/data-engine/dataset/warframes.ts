/**
 * VOIDEX DATA ENGINE — EXPANDED CANONICAL WARFRAMES DATASET (v1.3)
 * Catálogo Canônico Completo de Warframes do Jogo com Atributos Base, 4 Habilidades Mecânicas,
 * Passivas, Variant System, Polaridades Reais, Data Provenance e Integração com Build Lab.
 */

import { WarframeEntity } from '../types';

const WARFRAME_CANONICAL_SRC = {
  source_id: 'src_warframe_canonical_export',
  source_type: 'official_export' as const,
  source_name: 'Warframe Codex Public In-Game Data & API Export v38.0.2',
  retrieved_at: '2026-08-20T00:00:00Z',
  verified_at: '2026-08-20T12:00:00Z',
  dataset_version: 'v1.3',
  patch_version: 'Update 38.0.2 - 1999',
  verification_status: 'VERIFIED' as const,
  confidence: 1.0
};

export const WARFRAMES_DATASET: WarframeEntity[] = [
  // 1. REVENANT PRIME
  {
    id: 'revenant-prime',
    slug: 'revenant-prime',
    name: 'Revenant Prime',
    display_name: 'Revenant Prime',
    variant_relation: { base_entity_id: 'revenant', variant_type: 'prime', parent_entity_id: 'revenant', mastery_rank_delta: 14, is_direct_upgrade: true },
    vault_status: 'available',
    mastery_rank: 14,
    release_date: '2022-10-05',
    release_version: 'Update 32.1',
    market_supported: true,
    build_supported: true,
    base_stats: { health: 370, shield: 740, armor: 135, energy: 188, sprint_speed: 1.0, shield_recharge_rate: 22.5, power_strength: 100, power_duration: 100, power_efficiency: 100, power_range: 100, casting_speed: 100 },
    base_polarities: ['madurai', 'vazarin', 'naramon'],
    aura_polarity: 'naramon',
    exilus_polarity: 'vazarin',
    abilities: [
      { slot_number: 1, id: 'rev-enthrall', slug: 'enthrall', name: 'Enthrall', description: 'Converte um alvo em Thrall fervoroso que luta por Revenant.', energy_cost: 25, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'crowd_control', base_value: { value: 7, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 30, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 2, id: 'rev-mesmer-skin', slug: 'mesmer-skin', name: 'Mesmer Skin', description: 'Envolve-se em energia Eidolon, anulando todo o dano e atordoando atacantes.', energy_cost: 50, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', parameter_name: 'charges', base_value: { value: 6, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [{ affected_by: 'ability_strength', operator: { value: 'UNKNOWN', status: 'MISSING', confidence: 0.5, source_id: 'src_warframe_canonical_export' }, coefficient: { value: 1.0, status: 'MISSING', confidence: 0.5, source_id: 'src_warframe_canonical_export' }, source_id: 'src_warframe_canonical_export' }] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 3, id: 'rev-reave', slug: 'reave', name: 'Reave', description: 'Transforma-se em névoa de energia, drenando escudos e vida.', energy_cost: 50, subsumable_via_helminth: true, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'true_damage', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 8, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 10, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 4, id: 'rev-danse-macabre', slug: 'danse-macabre', name: 'Danse Macabre', description: 'Erupção em vendaval giratório de raios laser Eidolon.', energy_cost: 100, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'void', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 1250, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 20, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC }
    ],
    passive: { slot_number: 'passive', id: 'rev-passive', slug: 'eidolon-blast', name: 'Onda Eidolon', description: 'Emite onda radial que derruba inimigos ao esgotar escudos.', energy_cost: 0, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'crowd_control', base_value: { value: 100, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 6, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
    acquisition_method: 'Relíquias Void (Lith R4, Meso P11, Neo R5, Axi V11)',
    description: 'Erga-se da névoa do Void como o senhor dos Eidolons.',
    lore_reference: 'Forjado a partir da essência do Eidolon esquecido.',
    provenance: WARFRAME_CANONICAL_SRC
  },

  // 2. SARYN PRIME
  {
    id: 'saryn-prime',
    slug: 'saryn-prime',
    name: 'Saryn Prime',
    display_name: 'Saryn Prime',
    variant_relation: { base_entity_id: 'saryn', variant_type: 'prime', parent_entity_id: 'saryn', mastery_rank_delta: 0, is_direct_upgrade: true },
    vault_status: 'vaulted',
    mastery_rank: 0,
    release_date: '2016-02-16',
    release_version: 'Update 18.4.12',
    market_supported: true,
    build_supported: true,
    base_stats: { health: 450, shield: 370, armor: 315, energy: 225, sprint_speed: 1.0, shield_recharge_rate: 22.5, power_strength: 100, power_duration: 100, power_efficiency: 100, power_range: 100, casting_speed: 100 },
    base_polarities: ['madurai', 'vazarin'],
    aura_polarity: 'naramon',
    exilus_polarity: 'naramon',
    abilities: [
      { slot_number: 1, id: 'saryn-spores', slug: 'spores', name: 'Spores', description: 'Infesta o alvo com esporos corrosivos que se espalham continuamente.', energy_cost: 25, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'corrosive', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 10, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 16, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 2, id: 'saryn-molt', slug: 'molt', name: 'Molt', description: 'Troca de pele como serpente, gerando cópia e velocidade.', energy_cost: 50, subsumable_via_helminth: true, mechanics: [{ mechanic_type: 'buff', base_value: { value: 1.5, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 5, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 3, id: 'saryn-toxic-lash', slug: 'toxic-lash', name: 'Toxic Lash', description: 'Envolve armas em toxinas letais com dano dobrado em melee.', energy_cost: 50, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 30, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 45, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 4, id: 'saryn-miasma', slug: 'miasma', name: 'Miasma', description: 'Libera névoa viral quadruplicada contra alvos com Spores.', energy_cost: 100, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'viral', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 150, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 20, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 6, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC }
    ],
    passive: { slot_number: 'passive', id: 'saryn-passive', slug: 'virulent-status', name: 'Peste Duradoura', description: 'Status de dano duram 25% a mais.', energy_cost: 0, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
    acquisition_method: 'Prime Resurgence (Axi S3, Meso C1, Neo S1, Lith A1)',
    description: 'A flor dourada da mais pura praga venenosa.',
    lore_reference: 'A arquiteta biológica da podridão corrosiva.',
    provenance: WARFRAME_CANONICAL_SRC
  },

  // 3. GYRE PRIME
  {
    id: 'gyre-prime',
    slug: 'gyre-prime',
    name: 'Gyre Prime',
    display_name: 'Gyre Prime',
    variant_relation: { base_entity_id: 'gyre', variant_type: 'prime', parent_entity_id: 'gyre', mastery_rank_delta: 14, is_direct_upgrade: true },
    vault_status: 'available',
    mastery_rank: 14,
    release_date: '2025-04-10',
    release_version: 'Update 37.0',
    market_supported: true,
    build_supported: true,
    base_stats: { health: 370, shield: 740, armor: 135, energy: 240, sprint_speed: 1.1, shield_recharge_rate: 25.0, power_strength: 100, power_duration: 100, power_efficiency: 100, power_range: 100, casting_speed: 100 },
    base_polarities: ['madurai', 'naramon', 'naramon'],
    aura_polarity: 'naramon',
    exilus_polarity: 'vazarin',
    abilities: [
      { slot_number: 1, id: 'gyre-arcsphere', slug: 'arcsphere', name: 'Arcsphere', description: 'Esfera elétrica que dispara arcos periódicos.', energy_cost: 25, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'electricity', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 500, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 9, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 8, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 2, id: 'gyre-coil-horizon', slug: 'coil-horizon', name: 'Coil Horizon', description: 'Esfera implosiva que puxa inimigos com choque.', energy_cost: 50, subsumable_via_helminth: true, mechanics: [{ mechanic_type: 'crowd_control', damage_type: { value: 'electricity', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 1000, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 12, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 3, id: 'gyre-cathode-grace', slug: 'cathode-grace', name: 'Cathode Grace', description: 'Regeneração de energia e crítico escalável por abate.', energy_cost: 75, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 50, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 8, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 4, id: 'gyre-rotorswell', slug: 'rotorswell', name: 'Rotorswell', description: 'Campo elétrico orbital que descarrega relâmpagos em críticos.', energy_cost: 100, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'electricity', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 1000, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 8, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 20, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC }
    ],
    passive: { slot_number: 'passive', id: 'gyre-passive', slug: 'conductivity', name: 'Condutividade', description: 'Ganha até +300% crítico com procs elétricos.', energy_cost: 0, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 300, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
    acquisition_method: 'Relíquias Void (Axi G10, Neo G8, Meso G5, Lith G3)',
    description: 'A condutora do circuito elétrico dourado da Zariman.',
    lore_reference: 'Projetada para domar as correntes da Zariman Ten Zero.',
    provenance: WARFRAME_CANONICAL_SRC
  },

  // 4. RHINO PRIME
  {
    id: 'rhino-prime',
    slug: 'rhino-prime',
    name: 'Rhino Prime',
    display_name: 'Rhino Prime',
    variant_relation: { base_entity_id: 'rhino', variant_type: 'prime', parent_entity_id: 'rhino', mastery_rank_delta: 0, is_direct_upgrade: true },
    vault_status: 'vaulted',
    mastery_rank: 0,
    release_date: '2014-03-25',
    release_version: 'Update 12.4',
    market_supported: true,
    build_supported: true,
    base_stats: { health: 370, shield: 370, armor: 290, energy: 150, sprint_speed: 1.0, shield_recharge_rate: 22.5, power_strength: 100, power_duration: 100, power_efficiency: 100, power_range: 100, casting_speed: 100 },
    base_polarities: ['madurai', 'vazarin'],
    aura_polarity: 'madurai',
    exilus_polarity: 'none',
    abilities: [
      { slot_number: 1, id: 'rhino-charge', slug: 'rhino-charge', name: 'Rhino Charge', description: 'Investida brutal que derruba inimigos.', energy_cost: 25, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'impact', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 650, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 12, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 2, id: 'rhino-iron-skin', slug: 'iron-skin', name: 'Iron Skin', description: 'Endurece a pele, criando camada de Overguard impenetrável.', energy_cost: 50, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 1200, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 3, id: 'rhino-roar', slug: 'roar', name: 'Roar', description: 'Rugido que concede bônus de dano global para aliados.', energy_cost: 75, subsumable_via_helminth: true, mechanics: [{ mechanic_type: 'buff', base_value: { value: 50, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 30, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 4, id: 'rhino-stomp', slug: 'rhino-stomp', name: 'Rhino Stomp', description: 'Pisa no chão, suspendendo inimigos no tempo.', energy_cost: 100, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'crowd_control', damage_type: { value: 'blast', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 800, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 8, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC }
    ],
    passive: { slot_number: 'passive', id: 'rhino-passive', slug: 'heavy-impact', name: 'Impacto Pesado', description: 'Onda radial ao cair de grandes alturas.', energy_cost: 0, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'crowd_control', base_value: { value: 100, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 6, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
    acquisition_method: 'Prime Resurgence (Axi R1, Neo R1, Meso R1, Lith B1)',
    description: 'O titã blindado dourado da vanguarda Orokin.',
    lore_reference: 'A força bruta original do arsenal Tenno.',
    provenance: WARFRAME_CANONICAL_SRC
  },

  // 5. VOLT PRIME
  {
    id: 'volt-prime',
    slug: 'volt-prime',
    name: 'Volt Prime',
    display_name: 'Volt Prime',
    variant_relation: { base_entity_id: 'volt', variant_type: 'prime', parent_entity_id: 'volt', mastery_rank_delta: 0, is_direct_upgrade: true },
    vault_status: 'vaulted',
    mastery_rank: 0,
    release_date: '2015-03-24',
    release_version: 'Update 16.0',
    market_supported: true,
    build_supported: true,
    base_stats: { health: 370, shield: 450, armor: 135, energy: 300, sprint_speed: 1.0, shield_recharge_rate: 22.5, power_strength: 100, power_duration: 100, power_efficiency: 100, power_range: 100, casting_speed: 100 },
    base_polarities: ['madurai', 'madurai', 'vazarin'],
    aura_polarity: 'madurai',
    exilus_polarity: 'none',
    abilities: [
      { slot_number: 1, id: 'volt-shock', slug: 'shock', name: 'Shock', description: 'Dispara um dardo elétrico em cadeia.', energy_cost: 25, subsumable_via_helminth: true, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'electricity', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 200, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 15, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 2, id: 'volt-speed', slug: 'speed', name: 'Speed', description: 'Acelera velocidade de movimento e recarga.', energy_cost: 25, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 50, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 10, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 3, id: 'volt-electric-shield', slug: 'electric-shield', name: 'Electric Shield', description: 'Ergue barreira que bloqueia tiros e adiciona +50% dano elétrico.', energy_cost: 50, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 50, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 4, id: 'volt-discharge', slug: 'discharge', name: 'Discharge', description: 'Eletrocuta inimigos em área transformando-os em bobinas.', energy_cost: 100, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'electricity', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 1200, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 20, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 6, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC }
    ],
    passive: { slot_number: 'passive', id: 'volt-passive', slug: 'static-discharge', name: 'Descarga Estática', description: 'Viajar pelo solo acumula até +1.000 de dano elétrico.', energy_cost: 0, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 1000, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
    acquisition_method: 'Baro Ki\'Teer / Relíquias Void (Neo O1, Axi V8)',
    description: 'A personificação reluzente do raio e da aceleração temporal.',
    lore_reference: 'O condutor primordial das correntes elétricas do sistema.',
    provenance: WARFRAME_CANONICAL_SRC
  },

  // 6. EXCALIBUR UMBRA
  {
    id: 'excalibur-umbra',
    slug: 'excalibur-umbra',
    name: 'Excalibur Umbra',
    display_name: 'Excalibur Umbra',
    variant_relation: { base_entity_id: 'excalibur', variant_type: 'umbra', parent_entity_id: 'excalibur', mastery_rank_delta: 0, is_direct_upgrade: true },
    vault_status: 'available',
    mastery_rank: 0,
    release_date: '2018-06-15',
    release_version: 'Update 23.0',
    market_supported: false,
    build_supported: true,
    base_stats: { health: 370, shield: 370, armor: 315, energy: 225, sprint_speed: 1.0, shield_recharge_rate: 22.5, power_strength: 100, power_duration: 100, power_efficiency: 100, power_range: 100, casting_speed: 100 },
    base_polarities: ['umbra', 'umbra', 'umbra'],
    aura_polarity: 'madurai',
    exilus_polarity: 'none',
    abilities: [
      { slot_number: 1, id: 'umbra-slash-dash', slug: 'slash-dash', name: 'Slash Dash', description: 'Corta em disparada entre inimigos com lâmina.', energy_cost: 25, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'slash', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 250, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 12, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 2, id: 'umbra-radial-howl', slug: 'radial-howl', name: 'Radial Howl', description: 'Uiva com fúria, cegando inimigos e resetando resistências Sentient.', energy_cost: 50, subsumable_via_helminth: true, mechanics: [{ mechanic_type: 'crowd_control', base_value: { value: 15, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 15, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 3, id: 'umbra-radial-javelin', slug: 'radial-javelin', name: 'Radial Javelin', description: 'Dispara dardos de energia em todos ao redor.', energy_cost: 75, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'puncture', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 1000, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 4, id: 'umbra-exalted-blade', slug: 'exalted-blade', name: 'Exalted Blade', description: 'Invoca lâmina de pura luz que dispara ondas cortantes.', energy_cost: 25, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'slash', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 250, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 40, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC }
    ],
    passive: { slot_number: 'passive', id: 'umbra-passive', slug: 'autonomous-combat', name: 'Autonomia Umbral', description: 'Luta autonomamente quando o Operador está fora.', energy_cost: 0, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 10, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
    acquisition_method: 'Jornada "O Sacrifício"',
    description: 'Nascido da tragédia e da fúria contra Ballas.',
    lore_reference: 'O guerreiro senciente que nunca esqueceu.',
    provenance: WARFRAME_CANONICAL_SRC
  },

  // 7. DANTE
  {
    id: 'dante',
    slug: 'dante',
    name: 'Dante',
    display_name: 'Dante',
    variant_relation: { base_entity_id: 'dante', variant_type: 'base', mastery_rank_delta: 0, is_direct_upgrade: false },
    vault_status: 'available',
    mastery_rank: 0,
    release_date: '2024-03-27',
    release_version: 'Update 35.5',
    market_supported: false,
    build_supported: true,
    base_stats: { health: 370, shield: 370, armor: 155, energy: 240, sprint_speed: 1.15, shield_recharge_rate: 22.5, power_strength: 100, power_duration: 100, power_efficiency: 100, power_range: 100, casting_speed: 100 },
    base_polarities: ['madurai', 'vazarin', 'naramon'],
    aura_polarity: 'vazarin',
    exilus_polarity: 'none',
    abilities: [
      { slot_number: 1, id: 'dante-noctua', slug: 'noctua', name: 'Noctua', description: 'Invoca o tomo Exalted de Dante.', energy_cost: 25, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'slash', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 200, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 2, id: 'dante-light-verse', slug: 'light-verse', name: 'Light Verse', description: 'Concede Overguard massivo e vida máxima.', energy_cost: 25, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', parameter_name: 'overguard', base_value: { value: 250, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [{ affected_by: 'ability_strength', operator: { value: 'UNKNOWN', status: 'MISSING', confidence: 0.5, source_id: 'src_warframe_canonical_export' }, coefficient: { value: 1.0, status: 'MISSING', confidence: 0.5, source_id: 'src_warframe_canonical_export' }, source_id: 'src_warframe_canonical_export' }] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 3, id: 'dante-dark-verse', slug: 'dark-verse', name: 'Dark Verse', description: 'Causa dano de corte em arco na frente de Dante.', energy_cost: 25, subsumable_via_helminth: true, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'slash', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 600, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 15, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 4, id: 'dante-final-verse', slug: 'final-verse', name: 'Final Verse', description: 'Executa a obra prima combinando os versos anteriores.', energy_cost: 50, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'slash', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 1200, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC }
    ],
    passive: { slot_number: 'passive', id: 'dante-passive', slug: 'chroniclers-mark', name: 'Marca do Cronista', description: 'Noctua escaneia alvos para o Codex e aumenta chance de status.', energy_cost: 0, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 50, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
    acquisition_method: 'Sanctum Anatomica (Laboratórios Albrecht)',
    description: 'O cronista dos mistérios e guardião do tomo Noctua.',
    lore_reference: 'Buscador do conhecimento oculto do Void.',
    provenance: WARFRAME_CANONICAL_SRC
  },

  // 8. QORVEX
  {
    id: 'qorvex',
    slug: 'qorvex',
    name: 'Qorvex',
    display_name: 'Qorvex',
    variant_relation: { base_entity_id: 'qorvex', variant_type: 'base', mastery_rank_delta: 0, is_direct_upgrade: false },
    vault_status: 'available',
    mastery_rank: 0,
    release_date: '2023-12-13',
    release_version: 'Update 35.0',
    market_supported: false,
    build_supported: true,
    base_stats: { health: 560, shield: 370, armor: 875, energy: 150, sprint_speed: 0.9, shield_recharge_rate: 22.5, power_strength: 100, power_duration: 100, power_efficiency: 100, power_range: 100, casting_speed: 100 },
    base_polarities: ['vazarin', 'vazarin', 'madurai'],
    aura_polarity: 'vazarin',
    exilus_polarity: 'none',
    abilities: [
      { slot_number: 1, id: 'qorvex-chyrinka-pillar', slug: 'chyrinka-pillar', name: 'Chyrinka Pillar', description: 'Ergue pilares que emitem radiação e desaceleram inimigos.', energy_cost: 25, subsumable_via_helminth: true, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'radiation', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 500, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 8, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 2, id: 'qorvex-containment-wall', slug: 'containment-wall', name: 'Containment Wall', description: 'Bate duas paredes de concreto radioativo esmagando inimigos.', energy_cost: 50, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'radiation', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 1000, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 18, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 3, id: 'qorvex-disometric-guard', slug: 'disometric-guard', name: 'Disometric Guard', description: 'Concede imunidade a status para si e aliados.', energy_cost: 75, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 100, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 4, id: 'qorvex-crucible-blast', slug: 'crucible-blast', name: 'Crucible Blast', description: 'Dispara feixe contínuo do núcleo de radiação.', energy_cost: 100, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'radiation', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 2000, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 30, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC }
    ],
    passive: { slot_number: 'passive', id: 'qorvex-passive', slug: 'core-exposure', name: 'Exposição de Núcleo', description: 'Armas ganham +3m de Punch Through inato.', energy_cost: 0, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 3, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
    acquisition_method: 'Cavia Sindicato (Sanctum Anatomica)',
    description: 'O colosso de concreto e radiação criado por Albrecht Entrati.',
    lore_reference: 'Construído para conter os perigos do Cadinho.',
    provenance: WARFRAME_CANONICAL_SRC
  },

  // 9. DAGATH
  {
    id: 'dagath',
    slug: 'dagath',
    name: 'Dagath',
    display_name: 'Dagath',
    variant_relation: { base_entity_id: 'dagath', variant_type: 'base', mastery_rank_delta: 0, is_direct_upgrade: false },
    vault_status: 'available',
    mastery_rank: 0,
    release_date: '2023-10-18',
    release_version: 'Update 34.0',
    market_supported: false,
    build_supported: true,
    base_stats: { health: 680, shield: 185, armor: 135, energy: 240, sprint_speed: 1.1, shield_recharge_rate: 22.5, power_strength: 100, power_duration: 100, power_efficiency: 100, power_range: 100, casting_speed: 100 },
    base_polarities: ['madurai', 'naramon'],
    aura_polarity: 'madurai',
    exilus_polarity: 'none',
    abilities: [
      { slot_number: 1, id: 'dagath-wyrd-scythes', slug: 'wyrd-scythes', name: 'Wyrd Scythes', description: 'Foices espectrais giratórias que causam dano viral.', energy_cost: 25, subsumable_via_helminth: true, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'viral', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 300, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 10, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 2, id: 'dagath-doom', slug: 'doom', name: 'Doom', description: 'Amaldiçoa inimigos transmitindo dano recebido.', energy_cost: 50, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'debuff', base_value: { value: 35, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 16, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 15, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 3, id: 'dagath-grave-spirit', slug: 'grave-spirit', name: 'Grave Spirit', description: 'Aumenta dano crítico e impede a morte temporariamente.', energy_cost: 75, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 100, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 4, id: 'dagath-rakhs-cavalry', slug: 'rakhs-cavalry', name: 'Rakhali\'s Cavalry', description: 'Invoca cavalaria espectral que remove 100% de armaduras.', energy_cost: 100, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'strip_armor', damage_type: { value: 'viral', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 1000, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC }
    ],
    passive: { slot_number: 'passive', id: 'dagath-passive', slug: 'abyssal-energy', name: 'Energia Abissal', description: 'Orbes de energia e vida são 35% mais eficazes.', energy_cost: 0, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 35, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
    acquisition_method: 'Dojo Tenno Lab (Balizas Abissais)',
    description: 'A cavaleira sem rosto da vingança espectral.',
    lore_reference: 'A fúria de Naberus materializada.',
    provenance: WARFRAME_CANONICAL_SRC
  },

  // 10. KULLERVO
  {
    id: 'kullervo',
    slug: 'kullervo',
    name: 'Kullervo',
    display_name: 'Kullervo',
    variant_relation: { base_entity_id: 'kullervo', variant_type: 'base', mastery_rank_delta: 0, is_direct_upgrade: false },
    vault_status: 'available',
    mastery_rank: 0,
    release_date: '2023-06-21',
    release_version: 'Update 33.5',
    market_supported: false,
    build_supported: true,
    base_stats: { health: 1250, shield: 0, armor: 650, energy: 225, sprint_speed: 1.1, shield_recharge_rate: 0, power_strength: 100, power_duration: 100, power_efficiency: 100, power_range: 100, casting_speed: 100 },
    base_polarities: ['madurai', 'vazarin', 'vazarin'],
    aura_polarity: 'vazarin',
    exilus_polarity: 'none',
    abilities: [
      { slot_number: 1, id: 'kullervo-wrathful-advance', slug: 'wrathful-advance', name: 'Wrathful Advance', description: 'Teleporta e desfere ataque pesado com até +300% de chance crítica.', energy_cost: 25, subsumable_via_helminth: true, mechanics: [{ mechanic_type: 'buff', parameter_name: 'crit_buff', base_value: { value: 200, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [{ affected_by: 'ability_strength', operator: { value: 'UNKNOWN', status: 'MISSING', confidence: 0.5, source_id: 'src_warframe_canonical_export' }, coefficient: { value: 1.0, status: 'MISSING', confidence: 0.5, source_id: 'src_warframe_canonical_export' }, source_id: 'src_warframe_canonical_export' }] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 2, id: 'kullervo-recompense', slug: 'recompense', name: 'Recompense', description: 'Dardos que geram Overguard massivo por inimigo atingido.', energy_cost: 50, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 250, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 3, id: 'kullervo-collective-curse', slug: 'collective-curse', name: 'Collective Curse', description: 'Enlaça inimigos transmitindo 100% de todo dano recebido.', energy_cost: 75, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'debuff', base_value: { value: 100, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 4, id: 'kullervo-storm-of-ukko', slug: 'storm-of-ukko', name: 'Storm of Ukko', description: 'Chuva torrencial de adagas que causa dano de corte contínuo.', energy_cost: 100, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'slash', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 750, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 15, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 6, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
    ],
    passive: { slot_number: 'passive', id: 'kullervo-passive', slug: 'vaunted-blade', name: 'Lâmina Orgulhosa', description: '+75% eficiência em ataques pesados e velocidade de recarga melee.', energy_cost: 0, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 75, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
    acquisition_method: 'Duviri (Prisão de Kullervo)',
    description: 'O guerreiro traído preso para sempre nas ilhas de Duviri.',
    lore_reference: 'Sete adagas cravadas pelo remorso.',
    provenance: WARFRAME_CANONICAL_SRC
  },

  // 11. CITRINE
  {
    id: 'citrine',
    slug: 'citrine',
    name: 'Citrine',
    display_name: 'Citrine',
    variant_relation: { base_entity_id: 'citrine', variant_type: 'base', mastery_rank_delta: 0, is_direct_upgrade: false },
    vault_status: 'available',
    mastery_rank: 0,
    release_date: '2023-02-15',
    release_version: 'Update 32.3',
    market_supported: false,
    build_supported: true,
    base_stats: { health: 450, shield: 370, armor: 290, energy: 180, sprint_speed: 1.0, shield_recharge_rate: 22.5, power_strength: 100, power_duration: 100, power_efficiency: 100, power_range: 100, casting_speed: 100 },
    base_polarities: ['vazarin', 'naramon'],
    aura_polarity: 'vazarin',
    exilus_polarity: 'none',
    abilities: [
      { slot_number: 1, id: 'citrine-fractured-blast', slug: 'fractured-blast', name: 'Fractured Blast', description: 'Causa sangramento e força queda de orbes de vida e energia.', energy_cost: 25, subsumable_via_helminth: true, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'slash', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 450, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 15, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 2, id: 'citrine-preserving-shell', slug: 'preserving-shell', name: 'Preserving Shell', description: 'Concede até 90% de redução de dano a todo o esquadrão.', energy_cost: 50, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 90, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 3, id: 'citrine-prismatic-gem', slug: 'prismatic-gem', name: 'Prismatic Gem', description: 'Gema que ataca com 4 elementos básicos e aumenta status.', energy_cost: 75, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 100, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 20, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 4, id: 'citrine-crystalline-crystallize', slug: 'crystallize', name: 'Crystallize', description: 'Paralisa inimigos em cristais que garantem 300% de dano crítico.', energy_cost: 100, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'crowd_control', base_value: { value: 300, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 12, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 20, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC }
    ],
    passive: { slot_number: 'passive', id: 'citrine-passive', slug: 'geoluminesence', name: 'Geoluminescência', description: 'Regenera até 25 de vida por segundo para aliados próximos.', energy_cost: 0, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'heal', base_value: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 40, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
    acquisition_method: 'Passagem de Tyana em Marte (Otak)',
    description: 'A joia cristalina do suporte e da sobrevivência inabalável.',
    lore_reference: 'A guardiã dos amantes de cristal em Marte.',
    provenance: WARFRAME_CANONICAL_SRC
  },

  // 12. STYANAX
  {
    id: 'styanax',
    slug: 'styanax',
    name: 'Styanax',
    display_name: 'Styanax',
    variant_relation: { base_entity_id: 'styanax', variant_type: 'base', mastery_rank_delta: 0, is_direct_upgrade: false },
    vault_status: 'available',
    mastery_rank: 0,
    release_date: '2022-09-07',
    release_version: 'Update 32.0',
    market_supported: false,
    build_supported: true,
    base_stats: { health: 370, shield: 370, armor: 275, energy: 225, sprint_speed: 1.0, shield_recharge_rate: 22.5, power_strength: 100, power_duration: 100, power_efficiency: 100, power_range: 100, casting_speed: 100 },
    base_polarities: ['madurai', 'vazarin'],
    aura_polarity: 'vazarin',
    exilus_polarity: 'none',
    abilities: [
      { slot_number: 1, id: 'styanax-axiophora', slug: 'axiophora', name: 'Axios Javelin', description: 'Arremessa lança que empala e puxa inimigos próximos.', energy_cost: 25, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'crowd_control', base_value: { value: 500, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 30, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 2, id: 'styanax-tharros-strike', slug: 'tharros-strike', name: 'Tharros Strike', description: 'Golpe de escudo que remove 100% de escudos e armaduras.', energy_cost: 50, subsumable_via_helminth: true, mechanics: [{ mechanic_type: 'strip_armor', parameter_name: 'strip_percent', base_value: { value: 50, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 9, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [{ affected_by: 'ability_strength', operator: { value: 'UNKNOWN', status: 'MISSING', confidence: 0.5, source_id: 'src_warframe_canonical_export' }, coefficient: { value: 1.0, status: 'MISSING', confidence: 0.5, source_id: 'src_warframe_canonical_export' }, source_id: 'src_warframe_canonical_export' }] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 3, id: 'styanax-rally-point', slug: 'rally-point', name: 'Rally Point', description: 'Regenera energia contínua e escudos a cada abate.', energy_cost: 75, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 3, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, duration: { value: 25, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, radius: { value: 20, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
      { slot_number: 4, id: 'styanax-final-stand', slug: 'final-stand', name: 'Final Stand', description: 'Salta no ar desferindo enxurrada de lanças explosivas.', energy_cost: 100, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'damage', damage_type: { value: 'slash', status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, base_value: { value: 1200, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, range: { value: 30, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC }
    ],
    passive: { slot_number: 'passive', id: 'styanax-passive', slug: 'spartan-might', name: 'Poder Hoplita', description: 'Ganha chance crítica em armas proporcional à quantidade de escudos.', energy_cost: 0, subsumable_via_helminth: false, mechanics: [{ mechanic_type: 'buff', base_value: { value: 3, status: 'VERIFIED', confidence: 1.0, source_id: 'src_warframe_canonical_export' }, scalings: [] }], provenance: WARFRAME_CANONICAL_SRC },
    acquisition_method: 'Guarnição do Kahl (Acampamento do Peregrino)',
    description: 'O guerreiro hoplita da bravura ancestral.',
    lore_reference: 'A coragem que jamais se curva.',
    provenance: WARFRAME_CANONICAL_SRC
  }
];
