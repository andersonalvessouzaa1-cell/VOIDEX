import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface DatasetVersion {
  dataset_version: string;
  game_patch_version: string;
  game_patch_detected: string;
  game_patch_confidence: 'HIGH' | 'LOW' | 'UNKNOWN';
  game_patch_source: string;
  source_version: string;
  source_commit: string;
  retrieved_at: string;
  checksum: string;
  entity_count: number;
  validation_status: 'VALIDATED' | 'PENDING' | 'REJECTED';
  is_active: boolean;
}

const REGISTRY_PATH = path.join(__dirname, 'dataset_versions.json');

export function getRegistry(): DatasetVersion[] {
  if (fs.existsSync(REGISTRY_PATH)) {
    return JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  }
  return [];
}

export function saveRegistry(registry: DatasetVersion[]) {
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
}

export function getActiveDataset(): DatasetVersion | undefined {
  const registry = getRegistry();
  return registry.find(v => v.is_active);
}

export function generateChecksum(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

export function promoteToActive(version: string) {
  const registry = getRegistry();
  const target = registry.find(v => v.dataset_version === version);
  
  if (!target) throw new Error('Dataset version not found');
  if (target.validation_status !== 'VALIDATED') {
    throw new Error('Cannot promote unvalidated dataset to ACTIVE');
  }

  // Demote previous active
  registry.forEach(v => {
    if (v.is_active) v.is_active = false;
  });

  target.is_active = true;
  saveRegistry(registry);
}
