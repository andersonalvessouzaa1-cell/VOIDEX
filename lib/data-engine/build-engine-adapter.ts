/**
 * VOIDEX DATA ENGINE — BUILD ENGINE ADAPTER
 * Provedor Unificado que alimenta o Build Lab diretamente a partir do Data Engine
 * Eliminando duplicações e garantindo uma Única Fonte de Verdade (Single Source of Truth)
 */

import { WARFRAMES_DATASET } from './dataset/warframes';
import { WarframeEntity, WeaponEntity, ModEntity, ModEffect } from './types';
import { WarframeBuildProfile } from '../build-lab-engine';
import { CalculationEngine, CalculatedResult } from './calculation-engine';

export class BuildEngineAdapter {

  /**
   * Retorna a lista de Warframes utilizáveis pelo seletor do Build Lab
   */
  public static getAvailableWarframes(): WarframeEntity[] {
    return WARFRAMES_DATASET.filter(w => w.build_supported);
  }

  /**
   * Busca um Warframe pelo slug ou ID no dataset oficial
   */
  public static getWarframeBySlug(slug: string): WarframeEntity | undefined {
    return WARFRAMES_DATASET.find(w => w.slug === slug || w.id === slug);
  }

  /**
   * Converte a entidade auditada do Data Engine para o formato de visualização do Build Lab
   */
  public static toBuildProfile(entity: WarframeEntity, existingProfile?: WarframeBuildProfile): WarframeBuildProfile {
    if (existingProfile) {
      // Sincroniza estatísticas e habilidades diretamente do Data Engine
      return {
        ...existingProfile,
        id: entity.id,
        name: entity.name,
        baseHealth: entity.base_stats.health,
        baseShields: entity.base_stats.shield,
        baseArmor: entity.base_stats.armor,
        baseEnergy: entity.base_stats.energy,
        baseSprint: entity.base_stats.sprint_speed,
        passive: entity.passive.description,
        abilities: entity.abilities.map(a => a.name)
      };
    }

    // Perfil padrão caso não haja builds customizadas pré-configuradas
    return {
      id: entity.id,
      name: entity.name,
      subTitle: entity.description,
      iconId: `${entity.slug}-set`,
      baseHealth: entity.base_stats.health,
      baseShields: entity.base_stats.shield,
      baseArmor: entity.base_stats.armor,
      baseEnergy: entity.base_stats.energy,
      baseSprint: entity.base_stats.sprint_speed,
      passive: entity.passive.description,
      abilities: entity.abilities.map(a => a.name),
      paths: [] as any
    };
  }

  /**
   * Monta uma build parcial e requisita cálculo.
   * O Build Lab aceita dados limitados, bloqueando os cálculos via Trace.
   */
  public static configureWeaponBuild(
    weapon: WeaponEntity,
    attackId: string,
    equippedMods: ModEntity[],
    calcEngine: CalculationEngine
  ): CalculatedResult<number> {
    const attack = weapon.attacks.find(a => a.attack_id === attackId) || weapon.attacks[0];
    
    // Aggregates mod effects to pass to calculation engine
    const activeEffects: (ModEffect & { modId: string })[] = [];
    for (const mod of equippedMods) {
      for (const eff of mod.effects) {
        activeEffects.push({ ...eff, modId: mod.id });
      }
    }
    // O CalculationEngine processa a matemática e expele a CalculationTrace,
    // garantindo que Mods UNKNOWN limitem o cálculo determinístico.
    return calcEngine.calculateWeaponDamage(weapon.id, attack, activeEffects);
  }

  public static getTestWeapon(): WeaponEntity {
    return {
      id: 'wpn_braton',
      slug: 'braton',
      uniqueName: '/Lotus/Weapons/Tenno/Rifles/Braton/Braton',
      name: 'Braton',
      category: 'PRIMARY',
      mastery_rank: 0,
      max_rank: 30,
      tradable: false,
      market_supported: false,
      build_supported: true,
      verification_status: 'PARTIALLY_VERIFIED',
      provenance_source_id: 'src_wfcd_tier2',
      attacks: [{
        attack_id: 'braton_primary',
        name: 'Primary',
        damage_profile: {
          Slash: { value: 100, status: 'VERIFIED', confidence: 'HIGH' }
        }
      }]
    };
  }

  public static getTestMod(): ModEntity {
    return {
      id: 'mod_serration',
      slug: 'serration',
      name: 'Serration',
      category: 'PRIMARY',
      type: 'regular',
      rarity: 'uncommon',
      polarity: 'MADURAI',
      base_drain: 4,
      max_rank: 10,
      tradeable: true,
      market_supported: true,
      build_supported: true,
      compatibilities: {
        warframe: false,
        primary: true,
        secondary: false,
        melee: false,
        shotgun: false,
        archwing: false,
        archgun: false,
        archmelee: false,
        companion: false,
        kdrive: false,
        necramech: false,
        railjack: false,
        parazon: false,
        hound: false,
        moa: false
      },
      verification_status: 'PARTIALLY_VERIFIED',
      provenance_source_id: 'src_wfcd_tier2',
      effects: [{
        stat: 'Damage',
        operator: 'UNKNOWN',
        value: { value: 165, status: 'PARTIALLY_VERIFIED', confidence: 'LOW' }
      }]
    };
  }
}




