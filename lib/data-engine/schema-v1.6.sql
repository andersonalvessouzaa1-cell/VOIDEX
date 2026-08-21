-- ==========================================
-- VOIDEX DATA ENGINE — MIGRATION v1.6
-- COMPLETE WARFRAME MECHANICAL RESOLUTION
-- ==========================================

-- 1. Augment Mod Interactions
CREATE TABLE IF NOT EXISTS mod_augments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ability_id UUID REFERENCES warframe_abilities(id) ON DELETE CASCADE,
    mod_id VARCHAR(100) NOT NULL,
    augment_name VARCHAR(255) NOT NULL,
    interaction_type VARCHAR(50) NOT NULL, -- 'ADD_MECHANIC', 'OVERRIDE_SCALING', 'CHANGE_DAMAGE_TYPE'
    altered_parameter VARCHAR(100),
    altered_operator VARCHAR(50),
    altered_coefficient DECIMAL,
    conditions TEXT,
    provenance_source_id VARCHAR(100) REFERENCES source_registry(source_id)
);

-- 2. Helminth System
CREATE TABLE IF NOT EXISTS helminth_overrides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subsumed_ability_id UUID REFERENCES warframe_abilities(id) ON DELETE CASCADE,
    target_warframe_id VARCHAR(100) NOT NULL,
    replaced_slot SMALLINT NOT NULL CHECK (replaced_slot BETWEEN 1 AND 4),
    altered_cost DECIMAL,
    altered_range DECIMAL,
    altered_duration DECIMAL,
    altered_damage DECIMAL,
    diminished_effectiveness BOOLEAN DEFAULT FALSE,
    notes TEXT
);

-- 3. Archon Shards
CREATE TABLE IF NOT EXISTS archon_shard_effects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shard_color VARCHAR(50) NOT NULL, -- 'CRIMSON', 'AMBER', 'AZURE', 'TOPAZ', 'EMERALD', 'VIOLET'
    is_tauforged BOOLEAN DEFAULT FALSE,
    stat_affected VARCHAR(100) NOT NULL,
    bonus_value DECIMAL NOT NULL,
    bonus_operator VARCHAR(50) DEFAULT 'ADD_PERCENT',
    condition TEXT,
    provenance_source_id VARCHAR(100) REFERENCES source_registry(source_id)
);

-- 4. Evidence Matrix Expansions
ALTER TABLE parameter_evidence
ADD COLUMN IF NOT EXISTS methodology TEXT,
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE;
