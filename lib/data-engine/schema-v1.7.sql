-- ==========================================
-- VOIDEX DATA ENGINE ?" MIGRATION v1.7
-- WEAPONS, MODS, ARCANES & INCARNON INTEGRATION
-- ==========================================

-- 1. WEAPONS
CREATE TABLE IF NOT EXISTS weapons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unique_name VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'Primary', 'Secondary', 'Melee', 'Archwing', etc.
    type VARCHAR(50),
    mastery_rank SMALLINT DEFAULT 0,
    max_rank SMALLINT DEFAULT 30,
    disposition DECIMAL(3, 2),
    tradable BOOLEAN DEFAULT FALSE,
    variant_type VARCHAR(50), -- 'Prime', 'Kuva', 'Tenet', 'Wraith', etc.
    parent_weapon_id UUID REFERENCES weapons(id),
    dataset_version VARCHAR(50) NOT NULL,
    provenance_source_id VARCHAR(100) REFERENCES source_registry(source_id),
    verification_status VARCHAR(50) DEFAULT 'UNVERIFIED',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. WEAPON ATTACKS (Multi-attack model)
CREATE TABLE IF NOT EXISTS weapon_attacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    weapon_id UUID REFERENCES weapons(id) ON DELETE CASCADE,
    attack_name VARCHAR(100) NOT NULL, -- 'Primary', 'Secondary', 'Heavy', 'Charged'
    attack_type VARCHAR(50),
    critical_chance DECIMAL,
    critical_multiplier DECIMAL,
    status_chance DECIMAL,
    multishot DECIMAL DEFAULT 1.0,
    fire_rate DECIMAL,
    magazine_size SMALLINT,
    reload_time DECIMAL,
    ammo_max INTEGER,
    range_limit DECIMAL,
    falloff_start DECIMAL,
    falloff_end DECIMAL,
    punch_through DECIMAL,
    charge_time DECIMAL,
    verification_status VARCHAR(50) DEFAULT 'UNVERIFIED',
    provenance_source_id VARCHAR(100) REFERENCES source_registry(source_id)
);

-- 3. WEAPON DAMAGE PROFILES
CREATE TABLE IF NOT EXISTS weapon_damage_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attack_id UUID REFERENCES weapon_attacks(id) ON DELETE CASCADE,
    damage_type VARCHAR(50) NOT NULL,
    base_amount DECIMAL NOT NULL,
    provenance_source_id VARCHAR(100) REFERENCES source_registry(source_id)
);

-- 4. MODS
CREATE TABLE IF NOT EXISTS mods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unique_name VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    polarity VARCHAR(20),
    rarity VARCHAR(20),
    max_rank SMALLINT DEFAULT 5,
    base_drain SMALLINT,
    is_aura BOOLEAN DEFAULT FALSE,
    is_stance BOOLEAN DEFAULT FALSE,
    is_exilus BOOLEAN DEFAULT FALSE,
    is_augment BOOLEAN DEFAULT FALSE,
    tradable BOOLEAN DEFAULT TRUE,
    dataset_version VARCHAR(50) NOT NULL,
    provenance_source_id VARCHAR(100) REFERENCES source_registry(source_id),
    verification_status VARCHAR(50) DEFAULT 'UNVERIFIED'
);

-- 5. MOD EFFECTS & RANKS
CREATE TABLE IF NOT EXISTS mod_effects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mod_id UUID REFERENCES mods(id) ON DELETE CASCADE,
    stat_affected VARCHAR(100) NOT NULL,
    math_operator VARCHAR(50) DEFAULT 'UNKNOWN', -- 'ADD_FLAT', 'ADD_PERCENT', 'MULTIPLY', 'UNKNOWN'
    condition_text TEXT,
    verification_status VARCHAR(50) DEFAULT 'UNVERIFIED'
);

CREATE TABLE IF NOT EXISTS mod_rank_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    effect_id UUID REFERENCES mod_effects(id) ON DELETE CASCADE,
    rank_level SMALLINT NOT NULL,
    effect_value DECIMAL,
    provenance_source_id VARCHAR(100) REFERENCES source_registry(source_id),
    UNIQUE(effect_id, rank_level)
);

-- 6. ARCANES
CREATE TABLE IF NOT EXISTS arcanes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unique_name VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    max_rank SMALLINT DEFAULT 5,
    tradable BOOLEAN DEFAULT TRUE,
    dataset_version VARCHAR(50) NOT NULL,
    provenance_source_id VARCHAR(100) REFERENCES source_registry(source_id),
    verification_status VARCHAR(50) DEFAULT 'UNVERIFIED'
);

CREATE TABLE IF NOT EXISTS arcane_effects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    arcane_id UUID REFERENCES arcanes(id) ON DELETE CASCADE,
    trigger_condition TEXT,
    stat_affected VARCHAR(100),
    math_operator VARCHAR(50) DEFAULT 'UNKNOWN',
    duration_seconds DECIMAL,
    cooldown_seconds DECIMAL,
    max_stacks SMALLINT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS arcane_rank_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    effect_id UUID REFERENCES arcane_effects(id) ON DELETE CASCADE,
    rank_level SMALLINT NOT NULL,
    effect_value DECIMAL,
    provenance_source_id VARCHAR(100) REFERENCES source_registry(source_id),
    UNIQUE(effect_id, rank_level)
);

-- 7. INCARNONS
CREATE TABLE IF NOT EXISTS incarnons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    base_weapon_id UUID REFERENCES weapons(id) ON DELETE CASCADE,
    transformation_condition TEXT,
    dataset_version VARCHAR(50) NOT NULL,
    provenance_source_id VARCHAR(100) REFERENCES source_registry(source_id),
    verification_status VARCHAR(50) DEFAULT 'UNVERIFIED'
);

CREATE TABLE IF NOT EXISTS incarnon_evolutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incarnon_id UUID REFERENCES incarnons(id) ON DELETE CASCADE,
    evolution_tier SMALLINT NOT NULL CHECK (evolution_tier BETWEEN 1 AND 5),
    choice_index SMALLINT NOT NULL,
    description TEXT,
    stat_affected VARCHAR(100),
    math_operator VARCHAR(50) DEFAULT 'UNKNOWN',
    effect_value DECIMAL,
    provenance_source_id VARCHAR(100) REFERENCES source_registry(source_id)
);
