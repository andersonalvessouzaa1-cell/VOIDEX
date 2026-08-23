/**
 * VOIDEX DATA ENGINE — UNIFIED ENTRYPOINT & FACADE
 * Ponto Único de Acesso ao Banco de Dados, Motor de Cálculo, Validações e Versionamento
 */

export * from './constants';
export * from './types';
export * from './calculation-engine';
export * from './validation-engine';
export * from './change-detection';

// Datasets estruturados
export * from './dataset/warframes';
export * from './dataset/mods';
export * from './dataset/weapons';
export * from './dataset/arcanes';
export * from './dataset/shards';
export * from './dataset/helminth';
export * from './dataset/companions';

import { WARFRAMES_DATASET } from './dataset/warframes';
import { MODS_DATASET } from './dataset/mods';
import { WEAPONS_DATASET } from './dataset/weapons';
import { ARCANES_DATASET } from './dataset/arcanes';
import { ARCHON_SHARDS_DATASET } from './dataset/shards';
import { HELMINTH_DATASET } from './dataset/helminth';
import { COMPANIONS_DATASET } from './dataset/companions';
import { CalculationEngine } from './calculation-engine';
import { ValidationEngine } from './validation-engine';
import { ChangeDetectionEngine } from './change-detection';

export class VoidexDataPlatform {
  public static readonly VERSION = 'v2026.08.1';
  public static readonly GAME_PATCH = 'Update 38.0.2 - 1999';

  public static getWarframes() {
    return WARFRAMES_DATASET;
  }

  public static getWarframeById(id: string) {
    return WARFRAMES_DATASET.find(w => w.id === id || w.slug === id);
  }

  public static getMods() {
    return MODS_DATASET;
  }

  public static getModById(id: string) {
    return MODS_DATASET.find(m => m.id === id || m.slug === id);
  }

  public static getWeapons() {
    return WEAPONS_DATASET;
  }

  public static getArcanes() {
    return ARCANES_DATASET;
  }

  public static getArchonShards() {
    return ARCHON_SHARDS_DATASET;
  }

  public static getHelminthAbilities() {
    return HELMINTH_DATASET;
  }

  public static getCompanions() {
    return COMPANIONS_DATASET;
  }

  public static getCompletenessDashboard() {
    return ValidationEngine.generateCoverageMatrix(
      WARFRAMES_DATASET,
      MODS_DATASET,
      WEAPONS_DATASET,
      ARCANES_DATASET,
      COMPANIONS_DATASET,
      this.GAME_PATCH,
      this.VERSION
    );
  }
}
