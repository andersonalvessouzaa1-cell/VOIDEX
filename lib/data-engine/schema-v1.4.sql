-- ==========================================
-- VOIDEX DATA ENGINE — MIGRATION v1.4
-- ENRICHMENT MECÂNICO E MULTI-SOURCE RECONCILIATION
-- ==========================================

-- 1. Source Registry
CREATE TABLE IF NOT EXISTS source_registry (
    source_id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'official', 'community_dataset', 'wiki', 'datamine'
    authority_level VARCHAR(20) NOT NULL, -- 'TIER_1', 'TIER_2', 'TIER_3', 'TIER_4', 'TIER_5'
    url VARCHAR(500),
    license_information VARCHAR(255),
    retrieval_method VARCHAR(100),
    retrieved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    patch_version VARCHAR(50),
    allowed_usage BOOLEAN DEFAULT TRUE,
    notes TEXT
);

-- 2. Ability Mechanics
CREATE TABLE IF NOT EXISTS ability_mechanics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ability_id UUID REFERENCES warframe_abilities(id) ON DELETE CASCADE,
    mechanic_type VARCHAR(50) NOT NULL, -- 'damage', 'buff', 'debuff', 'summon', 'utility'
    parameter_name VARCHAR(100) NOT NULL,
    base_value DECIMAL NOT NULL,
    damage_type VARCHAR(50),
    verification_status VARCHAR(50) DEFAULT 'UNVERIFIED',
    confidence DECIMAL DEFAULT 0.0
);

-- 3. Ability Scalings
CREATE TABLE IF NOT EXISTS ability_scalings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mechanic_id UUID REFERENCES ability_mechanics(id) ON DELETE CASCADE,
    affected_by VARCHAR(50) NOT NULL, -- 'ability_strength', 'ability_duration', 'ability_range', 'ability_efficiency'
    operator VARCHAR(50) NOT NULL, -- 'MULTIPLY', 'ADD_PERCENT', 'ADD_FLAT'
    coefficient DECIMAL NOT NULL,
    cap_min DECIMAL,
    cap_max DECIMAL,
    source_id VARCHAR(100) REFERENCES source_registry(source_id),
    confidence DECIMAL DEFAULT 0.0
);

-- 4. Ability Conditions & Rules
CREATE TABLE IF NOT EXISTS ability_conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mechanic_id UUID REFERENCES ability_mechanics(id) ON DELETE CASCADE,
    condition_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL
);

-- 5. Source Conflicts Log
CREATE TABLE IF NOT EXISTS source_conflicts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(50) NOT NULL, -- 'warframe', 'ability', 'mechanic'
    entity_id VARCHAR(255) NOT NULL,
    field_name VARCHAR(100) NOT NULL,
    source_a_id VARCHAR(100) NOT NULL,
    value_a TEXT NOT NULL,
    source_b_id VARCHAR(100) NOT NULL,
    value_b TEXT NOT NULL,
    patch_version VARCHAR(50),
    resolution_status VARCHAR(50) DEFAULT 'UNRESOLVED',
    resolved_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
