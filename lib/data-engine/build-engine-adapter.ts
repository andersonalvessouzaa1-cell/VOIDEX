import { WEAPONS_DATASET } from './dataset/weapons';
import { MODS_DATASET } from './dataset/mods';
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
      for (const eff of mod.ranks.find(rank => rank.rank === mod.max_rank)?.effects ?? []) {
        activeEffects.push({ stat: eff.attribute, operator: 'UNKNOWN', value: { value: eff.value, status: 'PARTIALLY_VERIFIED', confidence: 0, source_id: mod.provenance.source_id }, modId: mod.id });
      }
    }
    // O CalculationEngine processa a matemática e expele a CalculationTrace,
    // garantindo que Mods UNKNOWN limitem o cálculo determinístico.
    return calcEngine.calculateWeaponDamage(weapon.id, attack, activeEffects);
  }

  public static getTestWeapon(): WeaponEntity {
    return WEAPONS_DATASET[0];
  }

  public static getTestMod(): ModEntity {
    return MODS_DATASET[0];
  }
}
