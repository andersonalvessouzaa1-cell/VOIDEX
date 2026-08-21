/**
 * VOIDEX DATA ENGINE — CHANGE DETECTION & BUILD IMPACT ANALYSIS
 * Motor de Auditoria Diferencial (Diff Engine) e Análise de Impacto em Builds
 * Filosofia: "Builds antigas não mudam silenciosamente. Toda alteração é documentada e explicada ao Tenno."
 */

import { ChangeLogEntry, SavedBuildEntity, ModEntity, WarframeEntity } from './types';
import { CalculationEngine } from './calculation-engine';

export interface BuildImpactAlert {
  build_id: string;
  build_title: string;
  author_id: string;
  patch: string;
  item_changed_name: string;
  item_type: 'warframe' | 'mod' | 'weapon' | 'arcane' | 'shard';
  impact_summary: string;
  stat_deltas: {
    stat_name: string;
    old_value: number | string;
    new_value: number | string;
    delta: number | string;
  }[];
  requires_user_review: boolean;
}

export class ChangeDetectionEngine {

  /**
   * 1. COMPARAÇÃO DIFERENCIAL (DIFF ENGINE) ENTRE VERSÕES DO DATASET
   */
  public static compareMods(oldMod: ModEntity, newMod: ModEntity, patch: string): ChangeLogEntry[] {
    const changes: ChangeLogEntry[] = [];
    const timestamp = new Date().toISOString();

    // Checar mudança de Dreno Base
    if (oldMod.base_drain !== newMod.base_drain) {
      changes.push({
        id: `diff-${oldMod.id}-drain-${Date.now()}`,
        entity_type: 'mod',
        entity_id: oldMod.id,
        entity_name: oldMod.name,
        attribute_changed: 'base_drain',
        old_value: oldMod.base_drain,
        new_value: newMod.base_drain,
        patch,
        timestamp,
        impact_summary: `Dreno base alterado de ${oldMod.base_drain} para ${newMod.base_drain}.`
      });
    }

    // Checar mudança nos efeitos dos ranks
    const oldMaxRank = oldMod.ranks[oldMod.max_rank];
    const newMaxRank = newMod.ranks[newMod.max_rank];

    if (oldMaxRank && newMaxRank) {
      for (const newEff of newMaxRank.effects) {
        const oldEff = oldMaxRank.effects.find(e => e.attribute === newEff.attribute);
        if (oldEff && oldEff.value !== newEff.value) {
          changes.push({
            id: `diff-${oldMod.id}-${newEff.attribute}-${Date.now()}`,
            entity_type: 'mod',
            entity_id: oldMod.id,
            entity_name: oldMod.name,
            attribute_changed: newEff.attribute,
            old_value: oldEff.value,
            new_value: newEff.value,
            patch,
            timestamp,
            impact_summary: `Efeito de ${newEff.attribute} no Rank Máximo alterado de ${oldEff.value}% para ${newEff.value}%.`
          });
        }
      }
    }

    return changes;
  }

  /**
   * 2. ANÁLISE DE IMPACTO EM BUILDS SALVAS DE JOGADORES
   */
  public static analyzeImpactOnBuilds(
    changes: ChangeLogEntry[],
    savedBuilds: SavedBuildEntity[],
    warframeRegistry: Record<string, WarframeEntity>,
    modRegistry: Record<string, ModEntity>
  ): BuildImpactAlert[] {
    const alerts: BuildImpactAlert[] = [];

    for (const change of changes) {
      // Procurar builds que utilizam este mod ou warframe
      for (const build of savedBuilds) {
        let isAffected = false;
        let itemType: BuildImpactAlert['item_type'] = 'mod';

        if (change.entity_type === 'warframe' && build.warframe_id === change.entity_id) {
          isAffected = true;
          itemType = 'warframe';
        } else if (change.entity_type === 'mod') {
          const usesMod = build.mod_slots.some(s => s.mod_id === change.entity_id) ||
                          build.aura_slot?.mod_id === change.entity_id ||
                          build.exilus_slot?.mod_id === change.entity_id;
          if (usesMod) {
            isAffected = true;
            itemType = 'mod';
          }
        }

        if (isAffected) {
          // Recalcular os deltas de atributos
          const wf = warframeRegistry[build.warframe_id];
          const oldStats = build.calculated_stats;

          alerts.push({
            build_id: build.id,
            build_title: build.title,
            author_id: build.author_id,
            patch: change.patch,
            item_changed_name: change.entity_name,
            item_type: itemType,
            impact_summary: `A atualização ${change.patch} alterou ${change.entity_name}: ${change.impact_summary}`,
            stat_deltas: [
              {
                stat_name: change.attribute_changed,
                old_value: change.old_value,
                new_value: change.new_value,
                delta: typeof change.new_value === 'number' && typeof change.old_value === 'number'
                  ? (change.new_value - change.old_value > 0 ? `+${change.new_value - change.old_value}` : `${change.new_value - change.old_value}`)
                  : 'Modificado'
              }
            ],
            requires_user_review: true
          });
        }
      }
    }

    return alerts;
  }
}
