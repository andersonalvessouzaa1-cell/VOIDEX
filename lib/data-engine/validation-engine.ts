/**
 * VOIDEX DATA ENGINE — VALIDATION & COVERAGE AUDIT ENGINE v1.1
 * Auditoria Automática de Integridade, Proveniência e Matriz de Cobertura
 * Separação Estrita de MARKET vs BUILD DATA
 */

import {
  WarframeEntity,
  ModEntity,
  WeaponEntity,
  ArcaneEntity,
  CompanionEntity,
  SystemDataCoverageMatrix,
  CategoryCoverageDetail,
  EntityVerificationStatus
} from './types';

export interface ValidationError {
  entity_type: string;
  entity_id: string;
  entity_name: string;
  field: string;
  severity: 'ERROR' | 'WARNING';
  message: string;
}

export class ValidationEngine {

  /**
   * 1. VALIDAÇÃO DE WARFRAME
   */
  public static validateWarframe(warframe: WarframeEntity): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!warframe.id || warframe.id.includes(' ')) {
      errors.push({
        entity_type: 'warframe',
        entity_id: warframe.id,
        entity_name: warframe.name,
        field: 'id',
        severity: 'ERROR',
        message: 'O ID do Warframe é inválido ou contém espaços em branco.'
      });
    }

    if (!warframe.abilities || warframe.abilities.length !== 4) {
      errors.push({
        entity_type: 'warframe',
        entity_id: warframe.id,
        entity_name: warframe.name,
        field: 'abilities',
        severity: 'ERROR',
        message: `Warframe deve possuir exatamente 4 habilidades ativas. Encontradas: ${warframe.abilities?.length || 0}.`
      });
    }

    if (!warframe.passive || !warframe.passive.name) {
      errors.push({
        entity_type: 'warframe',
        entity_id: warframe.id,
        entity_name: warframe.name,
        field: 'passive',
        severity: 'WARNING',
        message: 'Warframe não possui habilidade passiva estruturada.'
      });
    }

    if (warframe.base_stats.health <= 0 || warframe.base_stats.energy <= 0) {
      errors.push({
        entity_type: 'warframe',
        entity_id: warframe.id,
        entity_name: warframe.name,
        field: 'base_stats',
        severity: 'ERROR',
        message: 'Estatísticas vitais base (Vida ou Energia) inválidas ou zeradas.'
      });
    }

    if (!warframe.provenance || !warframe.provenance.source_id) {
      errors.push({
        entity_type: 'warframe',
        entity_id: warframe.id,
        entity_name: warframe.name,
        field: 'provenance',
        severity: 'ERROR',
        message: 'Registro sem metadados obrigatórios de Data Provenance.'
      });
    }

    return errors;
  }

  /**
   * 2. VALIDAÇÃO DE MOD
   */
  public static validateMod(mod: ModEntity): ValidationError[] {
    const errors: ValidationError[] = [];

    if (mod.max_rank < 0 || mod.max_rank > 10) {
      errors.push({
        entity_type: 'mod',
        entity_id: mod.id,
        entity_name: mod.name,
        field: 'max_rank',
        severity: 'ERROR',
        message: `Rank máximo inválido (${mod.max_rank}). O padrão do Warframe é entre 0 e 10.`
      });
    }

    if (!mod.ranks || mod.ranks.length !== (mod.max_rank + 1)) {
      errors.push({
        entity_type: 'mod',
        entity_id: mod.id,
        entity_name: mod.name,
        field: 'ranks',
        severity: 'ERROR',
        message: `Contagem de ranks inconsistente. Esperado ${mod.max_rank + 1} ranks (0 a ${mod.max_rank}), mas possui ${mod.ranks?.length || 0}.`
      });
    }

    if (!mod.provenance || !mod.provenance.source_id) {
      errors.push({
        entity_type: 'mod',
        entity_id: mod.id,
        entity_name: mod.name,
        field: 'provenance',
        severity: 'ERROR',
        message: 'Mod sem Data Provenance auditável.'
      });
    }

    return errors;
  }

  /**
   * 3. GERAÇÃO DA MATRIZ REAL DE COBERTURA (Data Coverage Matrix)
   */
  public static generateCoverageMatrix(
    warframes: WarframeEntity[],
    mods: ModEntity[],
    weapons: WeaponEntity[],
    arcanes: ArcaneEntity[],
    companions: CompanionEntity[],
    marketTotalCount: number = 85,
    patch: string = 'Update 38.0.2 - 1999',
    version: string = 'v1.1'
  ): SystemDataCoverageMatrix {
    const unverifiedRegistry: SystemDataCoverageMatrix['unverified_or_missing_registry'] = [];

    const wfCoverage = this.auditCategoryCoverage('Warframes (Prime & Base)', warframes, unverifiedRegistry, 45);
    const modCoverage = this.auditCategoryCoverage('Mods & Sets', mods, unverifiedRegistry, 25);
    const wepCoverage = this.auditCategoryCoverage('Weapons (Incarnon & Prime)', weapons, unverifiedRegistry, 20);
    const arcCoverage = this.auditCategoryCoverage('Arcanes', arcanes, unverifiedRegistry, 12);
    const compCoverage = this.auditCategoryCoverage('Companions', companions, unverifiedRegistry, 8);

    return {
      dataset_version: version,
      patch_version: patch,
      generated_at: new Date().toISOString(),
      categories: [
        wfCoverage,
        modCoverage,
        wepCoverage,
        arcCoverage,
        compCoverage
      ],
      unverified_or_missing_registry: unverifiedRegistry
    };
  }

  private static auditCategoryCoverage<T extends { id: string; name: string; market_supported: boolean; build_supported: boolean; provenance?: { verification_status: EntityVerificationStatus }; verification_status?: EntityVerificationStatus }>(
    categoryName: string,
    items: T[],
    unverifiedRegistry: SystemDataCoverageMatrix['unverified_or_missing_registry'],
    marketTotal: number
  ): CategoryCoverageDetail {
    let verified = 0;
    let partiallyVerified = 0;
    let unverified = 0;
    let missing = 0;

    for (const item of items) {
      const status = item.provenance?.verification_status ?? item.verification_status ?? 'MISSING';
      if (status === 'VERIFIED') {
        verified++;
      } else if (status === 'PARTIALLY_VERIFIED') {
        partiallyVerified++;
      } else if (status === 'UNVERIFIED') {
        unverified++;
        unverifiedRegistry.push({
          entity_id: item.id,
          entity_name: item.name,
          category: categoryName,
          status,
          reason: 'Aguardando auditoria completa de scalings e ranks'
        });
      } else {
        missing++;
        unverifiedRegistry.push({
          entity_id: item.id,
          entity_name: item.name,
          category: categoryName,
          status,
          reason: 'Estatísticas completas não ingestadas'
        });
      }
    }

    const buildEntities = items.filter(i => i.build_supported).length;
    const totalItems = items.length;
    const coveragePercentage = totalItems > 0 ? Number(((verified / totalItems) * 100).toFixed(1)) : 0;

    return {
      category: categoryName,
      total_market_items: marketTotal,
      total_build_entities: buildEntities,
      verified_count: verified,
      partially_verified_count: partiallyVerified,
      unverified_count: unverified,
      missing_count: missing,
      coverage_percentage: coveragePercentage
    };
  }
}
