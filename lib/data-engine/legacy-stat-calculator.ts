/** Compatibilidade histórica. Fórmulas ainda exigem auditoria antes de entrar nos presets novos. */
/**
 * VOIDEX DATA ENGINE — CALCULATION ENGINE
 * Motor de Cálculo Puro e Determinístico para Atributos, Dano, Polaridades e Breakpoints
 * Desacoplado de qualquer interface visual ou biblioteca de UI
 */

import {
  WarframeBaseStats,
  StructuredStatEffect,
  WeaponDamageProfile,
  TargetAttribute
} from './types';
import { Polarity } from './constants';

export interface ModSlotInput {
  drain: number;
  modPolarity: Polarity;
  slotPolarity: Polarity;
  effects: StructuredStatEffect[];
}

export interface CalculationConditions {
  state?: 'idle' | 'combat' | 'full_shields' | 'low_health' | 'aiming' | 'ability_active';
  active_buff_stacks?: Record<string, number>; // Ex: "molt_augmented": 250
  companion_buffs_active?: boolean;
}

export interface CalculatedWarframeOutput {
  health: number;
  shield: number;
  armor: number;
  armorDamageReductionPercent: number;
  energyMax: number;
  sprintSpeed: number;
  powerStrengthPercent: number;
  powerDurationPercent: number;
  powerEfficiencyPercent: number;
  powerRangePercent: number;
  castingSpeedPercent: number;
  shieldGatingSeconds: number;
  effectiveHealthPool: number; // EHP considerando armadura + vida
}

export interface CapacityFormaCalculation {
  totalCapacityProvided: number;
  totalDrainUsed: number;
  remainingCapacity: number;
  isOverCapacity: boolean;
  minFormasRequired: number;
  drainBreakdown: {
    slotIndex: number;
    baseDrain: number;
    finalDrain: number;
    polarityMatch: boolean;
    polarityMismatch: boolean;
  }[];
}

export interface WeaponDamageCalculationOutput {
  baseDamageTotal: number;
  moddedDamageTotal: number;
  damageDistribution: Record<string, number>;
  effectiveCriticalChance: number;
  effectiveCriticalMultiplier: number;
  effectiveStatusChance: number;
  effectiveMultishot: number;
  effectiveFireRate: number;
  averageDamagePerShot: number;
  burstDPS: number;
  sustainedDPS: number;
  statusProcsPerSecond: number;
}

export interface AbilityBreakpointResult {
  abilityName: string;
  targetMetric: string;
  currentValue: number;
  breakpointValue: number;
  isReached: boolean;
  remainingRequired: number;
  explanation: string;
}

export class LegacyStatCalculator {

  /**
   * 1. CALCULA OS ATRIBUTOS FINAIS DO WARFRAME
   */
  public static calculateWarframeStats(
    base: WarframeBaseStats,
    statEffects: StructuredStatEffect[],
    conditions: CalculationConditions = {}
  ): CalculatedWarframeOutput {
    // 1. Agrupar modificadores por atributo
    let strengthMod = 0;
    let durationMod = 0;
    let efficiencyMod = 0;
    let rangeMod = 0;
    let healthPercent = 0;
    let healthFlat = 0;
    let shieldPercent = 0;
    let shieldFlat = 0;
    let armorPercent = 0;
    let armorFlat = 0;
    let energyPercent = 0;
    let energyFlat = 0;
    let sprintPercent = 0;
    let castingSpeedBonus = 0;

    for (const eff of statEffects) {
      // Checar se o efeito condicional está ativo
      if (eff.condition && !this.evaluateCondition(eff.condition, conditions)) {
        continue;
      }

      switch (eff.attribute) {
        case 'ability_strength':
          if (eff.operator === 'ADD_PERCENT' || eff.operator === 'ADD_FLAT') strengthMod += eff.value;
          else if (eff.operator === 'SUBTRACT_PERCENT') strengthMod -= eff.value;
          break;
        case 'ability_duration':
          if (eff.operator === 'ADD_PERCENT' || eff.operator === 'ADD_FLAT') durationMod += eff.value;
          else if (eff.operator === 'SUBTRACT_PERCENT') durationMod -= eff.value;
          break;
        case 'ability_efficiency':
          if (eff.operator === 'ADD_PERCENT' || eff.operator === 'ADD_FLAT') efficiencyMod += eff.value;
          else if (eff.operator === 'SUBTRACT_PERCENT') efficiencyMod -= eff.value;
          break;
        case 'ability_range':
          if (eff.operator === 'ADD_PERCENT' || eff.operator === 'ADD_FLAT') rangeMod += eff.value;
          else if (eff.operator === 'SUBTRACT_PERCENT') rangeMod -= eff.value;
          break;
        case 'health':
          if (eff.operator === 'ADD_PERCENT') healthPercent += eff.value;
          else if (eff.operator === 'ADD_FLAT') healthFlat += eff.value;
          break;
        case 'shield':
          if (eff.operator === 'ADD_PERCENT') shieldPercent += eff.value;
          else if (eff.operator === 'ADD_FLAT') shieldFlat += eff.value;
          break;
        case 'armor':
          if (eff.operator === 'ADD_PERCENT') armorPercent += eff.value;
          else if (eff.operator === 'ADD_FLAT') armorFlat += eff.value;
          break;
        case 'energy_max':
          if (eff.operator === 'ADD_PERCENT') energyPercent += eff.value;
          else if (eff.operator === 'ADD_FLAT') energyFlat += eff.value;
          break;
        case 'sprint_speed':
          if (eff.operator === 'ADD_PERCENT') sprintPercent += eff.value;
          break;
        case 'ability_cast_speed':
          castingSpeedBonus += eff.value;
          break;
      }
    }

    // Fórmulas Oficiais de Warframe:
    const finalStrength = Math.max(10, base.power_strength + strengthMod);
    const finalDuration = Math.max(12.5, base.power_duration + durationMod);
    // Eficiência possui cap máximo funcional de 175% no jogo (ou até 190% para canalizadas com duração baixa)
    const finalEfficiency = Math.max(25, base.power_efficiency + efficiencyMod);
    const finalRange = Math.max(34, base.power_range + rangeMod);

    const finalHealth = Math.round(base.health * (1 + healthPercent / 100) + healthFlat);
    const finalShield = Math.round(base.shield * (1 + shieldPercent / 100) + shieldFlat);
    const finalArmor = Math.round(base.armor * (1 + armorPercent / 100) + armorFlat);
    const finalEnergy = Math.round(base.energy * (1 + energyPercent / 100) + energyFlat);
    const finalSprint = Number((base.sprint_speed * (1 + sprintPercent / 100)).toFixed(2));
    const finalCastSpeed = base.casting_speed + castingSpeedBonus;

    // Redução de Dano da Armadura: DR = Armor / (Armor + 300)
    const armorDR = finalArmor > 0 ? (finalArmor / (finalArmor + 300)) * 100 : 0;

    // EHP (Effective Health Pool) = Vida / (1 - DR) + Escudos
    const damageMultiplier = 1 - (armorDR / 100);
    const effectiveHealthPool = Math.round((finalHealth / Math.max(0.01, damageMultiplier)) + finalShield);

    // Shield Gating Duration: Base 0.33s até 2.5s (escala linear com escudo máx)
    const shieldGatingDuration = Math.min(2.5, Math.max(0.33, 0.33 + (finalShield / 1150) * (2.5 - 0.33)));

    return {
      health: finalHealth,
      shield: finalShield,
      armor: finalArmor,
      armorDamageReductionPercent: Number(armorDR.toFixed(1)),
      energyMax: finalEnergy,
      sprintSpeed: finalSprint,
      powerStrengthPercent: finalStrength,
      powerDurationPercent: finalDuration,
      powerEfficiencyPercent: finalEfficiency,
      powerRangePercent: finalRange,
      castingSpeedPercent: finalCastSpeed,
      shieldGatingSeconds: Number(shieldGatingDuration.toFixed(2)),
      effectiveHealthPool
    };
  }

  /**
   * 2. CALCULA DRENO DE MODS, CAPACIDADE TOTAL E FORMAS NECESSÁRIAS
   */
  public static calculateCapacityAndFormas(
    orokinReactor: boolean,
    auraSlot: { drain: number; modPolarity: Polarity; slotPolarity: Polarity } | null,
    exilusSlot: { drain: number; modPolarity: Polarity; slotPolarity: Polarity } | null,
    regularSlots: ModSlotInput[]
  ): CapacityFormaCalculation {
    const baseCap = orokinReactor ? 60 : 30;
    let totalCapacity = baseCap;
    let totalDrain = 0;
    const breakdown: CapacityFormaCalculation['drainBreakdown'] = [];

    // Aura adiciona capacidade
    if (auraSlot && auraSlot.drain > 0) {
      let auraBonus = auraSlot.drain;
      if (auraSlot.modPolarity !== 'none' && auraSlot.slotPolarity !== 'none') {
        if (auraSlot.modPolarity === auraSlot.slotPolarity || auraSlot.slotPolarity === 'aura') {
          auraBonus = auraSlot.drain * 2; // Dobra o ganho se polaridade bater
        } else {
          auraBonus = Math.max(0, Math.floor(auraSlot.drain * 0.8)); // Penalidade se errada
        }
      }
      totalCapacity += auraBonus;
    }

    // Exilus Slot
    if (exilusSlot && exilusSlot.drain > 0) {
      const calculated = this.calculateSingleSlotDrain(exilusSlot.drain, exilusSlot.modPolarity, exilusSlot.slotPolarity);
      totalDrain += calculated.finalDrain;
      breakdown.push({ slotIndex: 99, baseDrain: exilusSlot.drain, ...calculated });
    }

    // 8 Regular Slots
    let unpolarizedMismatches = 0;
    for (let i = 0; i < regularSlots.length; i++) {
      const slot = regularSlots[i];
      if (!slot || slot.drain === 0) continue;

      const calculated = this.calculateSingleSlotDrain(slot.drain, slot.modPolarity, slot.slotPolarity);
      totalDrain += calculated.finalDrain;
      breakdown.push({ slotIndex: i, baseDrain: slot.drain, ...calculated });

      if (slot.slotPolarity === 'none' && slot.modPolarity !== 'none') {
        unpolarizedMismatches++;
      }
    }

    const remaining = totalCapacity - totalDrain;
    const isOverCapacity = remaining < 0;

    // Calcular quantas Formas mínimas seriam necessárias para zerar o déficit de capacidade
    let minFormas = 0;
    if (isOverCapacity) {
      let deficit = Math.abs(remaining);
      // Ordena slots sem polaridade pelo maior dreno para polarizar com máxima economia
      const sortedDrains = regularSlots
        .filter(s => s.slotPolarity === 'none' && s.drain > 0)
        .map(s => Math.ceil(s.drain / 2))
        .sort((a, b) => b - a);

      for (const saved of sortedDrains) {
        deficit -= saved;
        minFormas++;
        if (deficit <= 0) break;
      }
    }

    return {
      totalCapacityProvided: totalCapacity,
      totalDrainUsed: totalDrain,
      remainingCapacity: remaining,
      isOverCapacity,
      minFormasRequired: minFormas,
      drainBreakdown: breakdown
    };
  }

  /**
   * 3. CALCULA DANO DE ARMAS E DPS REAL
   */
  public static calculateWeaponDPS(
    baseDamage: WeaponDamageProfile,
    baseFireRate: number,
    baseCritChance: number,
    baseCritMult: number,
    baseStatusChance: number,
    baseMultishot: number,
    magazineSize: number,
    reloadTimeSeconds: number,
    statEffects: StructuredStatEffect[]
  ): WeaponDamageCalculationOutput {
    let rawDamagePercent = 0;
    let elementalDamagePercent: Record<string, number> = {};
    let critChancePercent = 0;
    let critMultPercent = 0;
    let multishotPercent = 0;
    let fireRatePercent = 0;
    let reloadSpeedPercent = 0;
    let statusChancePercent = 0;

    for (const eff of statEffects) {
      if (eff.attribute === 'damage_raw') rawDamagePercent += eff.value;
      if (eff.attribute === 'critical_chance') critChancePercent += eff.value;
      if (eff.attribute === 'critical_multiplier') critMultPercent += eff.value;
      if (eff.attribute === 'multishot') multishotPercent += eff.value;
      if (eff.attribute === 'fire_rate' || eff.attribute === 'attack_speed') fireRatePercent += eff.value;
      if (eff.attribute === 'reload_speed') reloadSpeedPercent += eff.value;
      if (eff.attribute === 'status_chance') statusChancePercent += eff.value;

      if (eff.attribute.startsWith('damage_')) {
        const type = eff.attribute.replace('damage_', '');
        elementalDamagePercent[type] = (elementalDamagePercent[type] || 0) + eff.value;
      }
    }

    const damageMultiplier = 1 + (rawDamagePercent / 100);
    const finalMultishot = Number((baseMultishot * (1 + multishotPercent / 100)).toFixed(2));
    const finalCritChance = Number((baseCritChance * (1 + critChancePercent / 100)).toFixed(4));
    const finalCritMult = Number((baseCritMult * (1 + critMultPercent / 100)).toFixed(2));
    const finalStatusChance = Number((baseStatusChance * (1 + statusChancePercent / 100)).toFixed(4));
    const finalFireRate = Number((baseFireRate * (1 + fireRatePercent / 100)).toFixed(2));
    const finalReloadTime = Number((reloadTimeSeconds / (1 + reloadSpeedPercent / 100)).toFixed(2));

    // Dano base escalado
    const moddedBaseTotal = baseDamage.total_base_damage * damageMultiplier;
    let totalModdedDamage = 0;
    const finalDistribution: Record<string, number> = {};

    for (const [dtype, val] of Object.entries(baseDamage)) {
      if (dtype === 'total_base_damage') continue;
      const numVal = val as number;
      if (numVal > 0) {
        const scaledVal = numVal * damageMultiplier;
        finalDistribution[dtype] = Number(scaledVal.toFixed(1));
        totalModdedDamage += scaledVal;
      }
    }

    // Adiciona elementos extras introduzidos por mods
    for (const [elemType, percent] of Object.entries(elementalDamagePercent)) {
      if (percent > 0) {
        const addedElem = moddedBaseTotal * (percent / 100);
        finalDistribution[elemType] = Number(((finalDistribution[elemType] || 0) + addedElem).toFixed(1));
        totalModdedDamage += addedElem;
      }
    }

    // Dano Médio por Disparo com Crítico e Multishot:
    // Avg = TotalDamage * (1 + (CritChance * (CritMult - 1))) * Multishot
    const critBonusFactor = 1 + (finalCritChance * (finalCritMult - 1));
    const avgDamagePerShot = Math.round(totalModdedDamage * critBonusFactor * finalMultishot);

    // Burst DPS = AvgDamage * FireRate
    const burstDPS = Math.round(avgDamagePerShot * finalFireRate);

    // Sustained DPS = (AvgDamage * Magazine) / ((Magazine / FireRate) + ReloadTime)
    let sustainedDPS = burstDPS;
    if (magazineSize > 0 && finalReloadTime > 0) {
      const magDps = avgDamagePerShot * magazineSize;
      const cycleTime = (magazineSize / Math.max(0.1, finalFireRate)) + finalReloadTime;
      sustainedDPS = Math.round(magDps / Math.max(0.1, cycleTime));
    }

    // Status Procs por Segundo = StatusChance * Multishot * FireRate
    const statusProcsPerSec = Number((finalStatusChance * finalMultishot * finalFireRate).toFixed(1));

    return {
      baseDamageTotal: baseDamage.total_base_damage,
      moddedDamageTotal: Math.round(totalModdedDamage),
      damageDistribution: finalDistribution,
      effectiveCriticalChance: finalCritChance,
      effectiveCriticalMultiplier: finalCritMult,
      effectiveStatusChance: finalStatusChance,
      effectiveMultishot: finalMultishot,
      effectiveFireRate: finalFireRate,
      averageDamagePerShot: avgDamagePerShot,
      burstDPS,
      sustainedDPS,
      statusProcsPerSecond: statusProcsPerSec
    };
  }

  /**
   * 4. CALCULA BREAKPOINTS FUNDAMENTAIS (100% Armor Strip, Gloom Cap, Roar)
   */
  public static calculateBreakpoints(
    abilitySlug: string,
    currentStrength: number,
    hasCorrosiveProjection: boolean = false,
    emeraldShardsCount: number = 0
  ): AbilityBreakpointResult {
    switch (abilitySlug) {
      case 'pillage': {
        // Pillage base strip: 25%. Para atingir 100%: 400% Força. Com Corrosive Projection (-18% armadura): 328% Força.
        const target = hasCorrosiveProjection ? 328 : 400;
        const currentStrip = Number((Math.min(100, 25 * (currentStrength / 100) + (hasCorrosiveProjection ? 18 : 0))).toFixed(1));
        return {
          abilityName: 'Pillage (Hildryn Subsume)',
          targetMetric: '100% Armor & Shield Strip em 1 Cast',
          currentValue: currentStrip,
          breakpointValue: 100,
          isReached: currentStrength >= target,
          remainingRequired: Math.max(0, target - currentStrength),
          explanation: hasCorrosiveProjection
            ? `Com Corrosive Projection equipado, o breakpoint de 100% de Strip do Pillage cai de 400% para 328% de Força.`
            : `Pillage requer 400% de Força para remover 100% de armadura em 1 cast sem auras de redução.`
        };
      }

      case 'gloom': {
        // Gloom atinge o teto máximo de 95% de lentidão com 272% de Força (Base 35%)
        const target = 272;
        const currentSlow = Number((Math.min(95, 35 * (currentStrength / 100))).toFixed(1));
        return {
          abilityName: 'Gloom (Sevagoth)',
          targetMetric: '95% Slow Cap (Lentidão Máxima Permitida)',
          currentValue: currentSlow,
          breakpointValue: 95,
          isReached: currentStrength >= target,
          remainingRequired: Math.max(0, target - currentStrength),
          explanation: `O Gloom atinge sua lentidão máxima de 95% exatamente em 272% de Força de Habilidade.`
        };
      }

      case 'roar': {
        // Roar base: 30% dano universal. Com 300% Força: +90% Dano multiplicativo global.
        const currentDmg = Number((30 * (currentStrength / 100)).toFixed(1));
        return {
          abilityName: 'Roar (Rhino)',
          targetMetric: 'Multiplicador Global de Dano Faction-Wide',
          currentValue: currentDmg,
          breakpointValue: 100,
          isReached: currentDmg >= 100,
          remainingRequired: Math.max(0, 334 - currentStrength),
          explanation: `Roar concede +${currentDmg}% de dano multiplicativo (escala como dano de facção Bane em todas as armas e habilidades).`
        };
      }

      default:
        return {
          abilityName: abilitySlug,
          targetMetric: 'Escalabilidade Genérica',
          currentValue: currentStrength,
          breakpointValue: 100,
          isReached: true,
          remainingRequired: 0,
          explanation: 'Habilidade padrão com escalabilidade linear.'
        };
    }
  }

  // Helper interno para cálculo de polaridade
  private static calculateSingleSlotDrain(
    drain: number,
    modPolarity: Polarity,
    slotPolarity: Polarity
  ): { finalDrain: number; polarityMatch: boolean; polarityMismatch: boolean } {
    if (slotPolarity === 'none' || modPolarity === 'none') {
      return { finalDrain: drain, polarityMatch: false, polarityMismatch: false };
    }

    if (modPolarity === slotPolarity || slotPolarity === 'aura') {
      return { finalDrain: Math.ceil(drain / 2), polarityMatch: true, polarityMismatch: false };
    } else {
      // Mismatch: +25% de dreno penalizado (arredondado)
      return { finalDrain: drain + Math.round(drain * 0.25), polarityMatch: false, polarityMismatch: true };
    }
  }

  private static evaluateCondition(condition: string, conditions: CalculationConditions): boolean {
    if (condition === 'full_shields' && conditions.state === 'full_shields') return true;
    if (condition === 'combat' && conditions.state === 'combat') return true;
    if (condition === 'low_health' && conditions.state === 'low_health') return true;
    if (condition === 'aiming' && conditions.state === 'aiming') return true;
    return false; // Condição desconhecida ou inativa não concede bônus.
  }
}
