import { WarframeEntity, ValidationStatus } from '../types';

export interface DatasetInventoryEntity {
  id: string;
  slug: string;
  name: string;
  variant: string;
  base_id?: string;
  market_supported: boolean;
  build_supported: boolean;
  calculation_supported: boolean;
  verification_status: ValidationStatus;
  missing_fields: string[];
  source_id: string;
  dataset_version: string;
  patch_version: string;
}

export interface RawWarframeEntity {
  name: string;
  uniqueName: string;
  description: string;
  health: number;
  shield: number;
  armor: number;
  power: number;
  sprintSpeed: number;
  passiveDescription?: string;
  abilities?: Array<{
    name: string;
    description: string;
  }>;
  polarities?: string[];
  aura?: string;
  masteryReq?: number;
}
