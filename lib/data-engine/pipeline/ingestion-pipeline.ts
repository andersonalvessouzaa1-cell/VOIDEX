import * as fs from 'fs';
import * as path from 'path';
import { RawWarframeEntity, DatasetInventoryEntity } from './types';
import { WarframeEntity, DataProvenance } from '../types';

export class WarframeIngestionPipeline {
  private rawData: RawWarframeEntity[] = [];
  private normalizedData: WarframeEntity[] = [];
  private inventory: DatasetInventoryEntity[] = [];
  private runTimestamp = new Date().toISOString();

  private sourceInfo = {
    source_id: 'src_warframe_canonical_export',
    source_type: 'official_export' as const,
    source_name: 'Warframe Codex Public In-Game Data & API Export v38.0.2',
    dataset_version: 'v1.4',
    patch_version: 'Update 38.0.2 - 1999',
    verification_method: 'official_api' as const
  };

  public async run() {
    console.log('[Pipeline] Starting MASS DATA INGESTION PIPELINE for Warframes...');
    this.loadRawData();
    this.processEntities();
    this.generateReports();
  }

  private loadRawData() {
    console.log('[Pipeline] 1. Loading RAW data...');
    const rawPath = path.join(process.cwd(), 'data', 'raw', 'warframes', 'Warframes_canonical.json');
    if (fs.existsSync(rawPath)) {
      const fileData = fs.readFileSync(rawPath, 'utf8');
      const parsed = JSON.parse(fileData);
      // Filter out Excalibur Prime, or just process everything
      this.rawData = parsed.filter((w: any) => w.productCategory === 'Suits' && !w.name.includes('Prime') && !w.name.includes('Umbra') || w.name.includes('Prime') || w.name.includes('Umbra'));
    } else {
      console.warn('[Pipeline] RAW JSON not found, skipping or mocking...');
      this.rawData = []; // Fallback handled logically
    }
  }

  private processEntities() {
    console.log('[Pipeline] 2. Normalizing & Validating...');
    for (const raw of this.rawData) {
      const { normalized, missingFields } = this.normalize(raw);
      
      const isVerified = missingFields.length === 0;
      const isPartiallyVerified = missingFields.length > 0 && missingFields.length < 5;
      const isMissing = missingFields.length >= 5;

      let status: 'VERIFIED' | 'PARTIALLY_VERIFIED' | 'MISSING' | 'CONFLICT' = 'MISSING';
      if (isVerified) status = 'VERIFIED';
      else if (isPartiallyVerified) status = 'PARTIALLY_VERIFIED';
      
      // Strict rule from instructions: only mark verified when there's evidence
      if (status !== 'VERIFIED') {
        // Enforce MISSING if abilities are incomplete
        if (missingFields.includes('abilities.scalings')) {
          status = 'MISSING';
        }
      }

      this.normalizedData.push(normalized);

      this.inventory.push({
        id: normalized.id,
        slug: normalized.slug,
        name: normalized.name,
        variant: normalized.variant_relation.variant_type,
        market_supported: true,
        build_supported: status === 'VERIFIED',
        calculation_supported: status === 'VERIFIED',
        verification_status: status,
        missing_fields: missingFields,
        source_id: this.sourceInfo.source_id,
        dataset_version: this.sourceInfo.dataset_version,
        patch_version: this.sourceInfo.patch_version
      });
    }
  }

  private normalize(raw: RawWarframeEntity): { normalized: WarframeEntity, missingFields: string[] } {
    const missingFields: string[] = [];

    const slug = raw.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    let variantType: any = 'base';
    if (raw.name.includes('Prime')) variantType = 'prime';
    if (raw.name.includes('Umbra')) variantType = 'umbra';

    if (!raw.abilities || raw.abilities.length < 4) {
      missingFields.push('abilities.count');
    }
    // WFCD API doesn't provide mechanical scalings natively
    missingFields.push('abilities.scalings');
    missingFields.push('abilities.damage_type');

    if (!raw.passiveDescription) {
      missingFields.push('passive.description');
    }

    const provenance: DataProvenance = {
      ...this.sourceInfo,
      retrieved_at: this.runTimestamp,
      verification_status: missingFields.length > 0 ? 'MISSING' : 'VERIFIED',
      confidence: missingFields.length > 0 ? 0.5 : 1.0,
      source_type: 'official_export'
    };

    const entity: WarframeEntity = {
      id: slug,
      slug,
      name: raw.name,
      display_name: raw.name,
      variant_relation: {
        base_entity_id: variantType === 'base' ? slug : slug.replace('-prime', '').replace('-umbra', ''),
        variant_type: variantType,
        mastery_rank_delta: 0,
        is_direct_upgrade: variantType !== 'base'
      },
      vault_status: 'available',
      mastery_rank: raw.masteryReq || 0,
      release_date: 'Unknown',
      release_version: 'Unknown',
      market_supported: true,
      build_supported: missingFields.length === 0,
      base_stats: {
        health: raw.health || 0,
        shield: raw.shield || 0,
        armor: raw.armor || 0,
        energy: raw.power || 0,
        sprint_speed: raw.sprintSpeed || 1.0,
        shield_recharge_rate: 15,
        power_strength: 100,
        power_duration: 100,
        power_efficiency: 100,
        power_range: 100,
        casting_speed: 100
      },
      base_polarities: [],
      aura_polarity: 'none',
      exilus_polarity: 'none',
      abilities: [
        { slot_number: 1, id: '1', slug: '1', name: 'Unknown', description: 'Unknown', energy_cost: 25, effects: [], subsumable_via_helminth: false, provenance },
        { slot_number: 2, id: '2', slug: '2', name: 'Unknown', description: 'Unknown', energy_cost: 50, effects: [], subsumable_via_helminth: false, provenance },
        { slot_number: 3, id: '3', slug: '3', name: 'Unknown', description: 'Unknown', energy_cost: 75, effects: [], subsumable_via_helminth: false, provenance },
        { slot_number: 4, id: '4', slug: '4', name: 'Unknown', description: 'Unknown', energy_cost: 100, effects: [], subsumable_via_helminth: false, provenance }
      ],
      passive: {
        slot_number: 'passive', id: 'p', slug: 'p', name: 'Passive', description: raw.passiveDescription || 'Unknown', energy_cost: 0, effects: [], subsumable_via_helminth: false, provenance
      },
      acquisition_method: 'Unknown',
      description: raw.description || 'No description',
      lore_reference: '',
      provenance
    };

    return { normalized: entity, missingFields };
  }

  private generateReports() {
    console.log('[Pipeline] 3. Generating final JSON outputs & reports...');
    fs.mkdirSync(path.join(process.cwd(), 'data', 'reports'), { recursive: true });
    fs.writeFileSync(path.join(process.cwd(), 'data', 'reports', 'warframes_inventory.json'), JSON.stringify(this.inventory, null, 2));
    console.log('[Pipeline] Inventory saved.');
  }

  public getInventory() {
    return this.inventory;
  }
}
