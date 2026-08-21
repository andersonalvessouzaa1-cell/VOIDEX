import { EvidenceValue, MathOperator, ModEffect, WeaponAttackInstance, CalculationTrace } from './types';

export interface CalculatedResult<T> {
  value: T;
  status: 'VERIFIED' | 'PARTIALLY_CALCULATED' | 'UNAVAILABLE';
  confidence: 'HIGH' | 'LOW' | 'UNKNOWN';
  limitations: string[];
  evidence_sources: string[];
  traces: CalculationTrace[];
}

export class CalculationEngine {
  /**
   * Calcula o dano de um ataque de arma modificado por efeitos de mods.
   * Se algum Mod possuir operador UNKNOWN, o cálculo é degradado com segurança.
   */
  public calculateWeaponDamage(
    weaponId: string,
    baseAttack: WeaponAttackInstance,
    mods: (ModEffect & { modId?: string })[]
  ): CalculatedResult<number> {
    const limitations: string[] = [];
    const evidence_sources: string[] = [];
    const traces: CalculationTrace[] = [];
    let hasUnknownDependencies = false;

    // Soma do dano base
    let totalBaseDamage = 0;
    for (const [dmgType, ev] of Object.entries(baseAttack.damage_profile)) {
      if (!ev) continue;
      
      const isLow = ev.status === 'UNVERIFIED' || ev.confidence === 'LOW';
      if (isLow) {
        limitations.push(`Base damage type ${dmgType} has incomplete evidence.`);
        hasUnknownDependencies = true;
      }

      traces.push({
        entityId: weaponId,
        parameter: `BaseDamage_${dmgType}`,
        source: 'base_attack',
        evidenceStatus: ev.status,
        inputValue: ev.value,
        operator: 'SET',
        outputValue: ev.value,
        blockedBy: isLow ? 'Incomplete base attack evidence' : null,
        calculationStatus: isLow ? 'LIMITED' : 'VERIFIED'
      });

      totalBaseDamage += ev.value;
    }

    let modifiedDamage = totalBaseDamage;

    // Aplicar mods
    for (const mod of mods) {
      const eId = mod.modId || 'unknown_mod';

      if (mod.operator === 'UNKNOWN') {
        limitations.push(`Cálculo limitado pela evidência disponível no Mod: Operador desconhecido para ${mod.stat}.`);
        hasUnknownDependencies = true;
        
        traces.push({
          entityId: eId,
          parameter: mod.stat,
          source: 'src_wfcd_tier2',
          evidenceStatus: mod.value.status,
          inputValue: totalBaseDamage,
          operator: 'UNKNOWN',
          outputValue: null,
          blockedBy: 'Operador matemático não comprovado (UNKNOWN).',
          calculationStatus: 'LIMITED'
        });
        continue;
      }

      const modVal = mod.value.value;
      let outVal = modifiedDamage;

      if (mod.operator === 'ADD_PERCENT' && mod.value.status === 'VERIFIED') {
        outVal += totalBaseDamage * (modVal / 100);
      } else if (mod.operator === 'MULTIPLY' && mod.value.status === 'VERIFIED') {
        outVal *= modVal;
      } else if (mod.operator === 'ADD_FLAT' && mod.value.status === 'VERIFIED') {
        outVal += modVal;
      } else {
        limitations.push(`Modificador ${mod.stat} não pôde ser calculado (Status: ${mod.value.status}).`);
        hasUnknownDependencies = true;
        traces.push({
          entityId: eId,
          parameter: mod.stat,
          source: 'src_wfcd_tier2',
          evidenceStatus: mod.value.status,
          inputValue: modifiedDamage,
          operator: mod.operator,
          outputValue: null,
          blockedBy: 'Status de evidência insuficiente para aplicação matemática.',
          calculationStatus: 'LIMITED'
        });
        continue;
      }

      traces.push({
        entityId: eId,
        parameter: mod.stat,
        source: 'src_wfcd_tier2',
        evidenceStatus: mod.value.status,
        inputValue: modifiedDamage,
        operator: mod.operator,
        outputValue: outVal,
        blockedBy: null,
        calculationStatus: 'VERIFIED'
      });
      
      modifiedDamage = outVal;
    }

    return {
      value: modifiedDamage,
      status: hasUnknownDependencies ? 'PARTIALLY_CALCULATED' : 'VERIFIED',
      confidence: hasUnknownDependencies ? 'LOW' : 'HIGH',
      limitations,
      evidence_sources,
      traces
    };
  }
}
