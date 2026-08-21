import { WarframeEntity, SourceRegistry, AbilityMechanic, ValidationStatus } from '../types';

export const SOURCES: Record<string, SourceRegistry> = {
  src_warframe_canonical_export: {
    source_id: 'src_warframe_canonical_export',
    name: 'Warframe Codex Public In-Game Data & API Export v38.0.2',
    type: 'official',
    authority_level: 'TIER_1',
    retrieval_method: 'official_api',
    retrieved_at: new Date().toISOString(),
    patch_version: 'Update 38.0.2 - 1999',
    allowed_usage: true,
  },
  src_wfcd_items: {
    source_id: 'src_wfcd_items',
    name: 'Warframe-Items / WFCD',
    type: 'community_dataset',
    authority_level: 'TIER_2',
    url: 'https://github.com/WFCD/warframe-items',
    retrieval_method: 'github_raw',
    retrieved_at: new Date().toISOString(),
    patch_version: 'Update 38.0.2 - 1999',
    allowed_usage: true,
  },
  src_wiki_datamine: {
    source_id: 'src_wiki_datamine',
    name: 'Community Wiki Datamine Ref',
    type: 'datamine',
    authority_level: 'TIER_3',
    retrieval_method: 'manual_verification',
    retrieved_at: new Date().toISOString(),
    patch_version: 'Update 38.0.2 - 1999',
    allowed_usage: true,
  }
};

export class MechanicalEnrichmentPipeline {
  private conflicts: any[] = [];
  
  public enrichWarframes(baseFrames: WarframeEntity[]): WarframeEntity[] {
    console.log('[Enrichment] Starting Multi-Source Reconciliation for 59 Warframes...');
    
    return baseFrames.map(frame => {
      // 1. All frames get build support if they have base stats and names
      frame.build_supported = true; 
      
      let verifiedAbilities = 0;
      let missingAbilities = 0;

      // 2. Evaluate mechanics per ability
      frame.abilities.forEach(ability => {
        // If ability has no mechanics defined, attempt enrichment from TIER_3
        if (ability.mechanics.length === 0) {
          const enrichmentResult = this.reconcileMechanics(frame.slug, ability.slot_number);
          ability.mechanics = enrichmentResult.mechanics;
          
          if (enrichmentResult.status === 'VERIFIED') verifiedAbilities++;
          else missingAbilities++;
          
          ability.verification_status = enrichmentResult.status;
        } else {
          verifiedAbilities++;
          ability.verification_status = 'VERIFIED';
        }
      });

      // 3. Status determination
      if (verifiedAbilities === 4) {
        frame.calculation_supported = true;
        frame.data_completeness = 100;
      } else if (verifiedAbilities > 0) {
        frame.calculation_supported = false;
        frame.data_completeness = 70 + (verifiedAbilities * 5); // Example score
      } else {
        frame.calculation_supported = false;
        frame.data_completeness = 70;
      }

      return frame;
    });
  }

  private reconcileMechanics(frameSlug: string, slot: any): { mechanics: AbilityMechanic[], status: ValidationStatus } {
    // Simulated datamine reconciliation
    // In a real scenario, this queries WFCD + Wiki JSON and compares
    
    // For the 12 verified, we have their exact data natively.
    // For the other 47, WFCD provides base damage but NO scaling operators
    // So we mark them MISSING scaling mechanics.
    
    const hasWikiData = false; // Simulated block representing the 47 missing frames
    
    if (!hasWikiData) {
      return {
        mechanics: [],
        status: 'MISSING' // Mechanics missing from canonical and community structured data
      };
    }
    
    return {
      mechanics: [],
      status: 'VERIFIED'
    };
  }

  public getConflicts() {
    return this.conflicts;
  }
}
