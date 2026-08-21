-- ==========================================
-- VOIDEX DATA ENGINE — MIGRATION v1.5
-- COMPLETE MECHANICAL DATA RESOLUTION & EVIDENCE MATRIX
-- ==========================================

-- 1. Parameter Evidence Tracking
-- Allow registering individual evidence values for each param
CREATE TABLE IF NOT EXISTS parameter_evidence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mechanic_id UUID REFERENCES ability_mechanics(id) ON DELETE CASCADE,
    parameter_name VARCHAR(100) NOT NULL, -- e.g., 'base_damage', 'duration_cap', 'proc_chance'
    value_numeric DECIMAL,
    value_text VARCHAR(255),
    verification_status VARCHAR(50) DEFAULT 'UNVERIFIED',
    confidence DECIMAL DEFAULT 0.0,
    source_id VARCHAR(100) REFERENCES source_registry(source_id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Augment Interactions
CREATE TABLE IF NOT EXISTS ability_augments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ability_id UUID REFERENCES warframe_abilities(id) ON DELETE CASCADE,
    augment_mod_id VARCHAR(100) NOT NULL,
    interaction_type VARCHAR(50) NOT NULL, -- 'ADD_MECHANIC', 'OVERRIDE_SCALING', 'CHANGE_DAMAGE_TYPE'
    description TEXT NOT NULL
);

-- 3. Extend Warframes for Calculation Status
ALTER TABLE warframes 
ADD COLUMN IF NOT EXISTS calculation_support_level VARCHAR(50) DEFAULT 'UNAVAILABLE',
ADD COLUMN IF NOT EXISTS mechanical_completeness_score DECIMAL DEFAULT 0.0;
