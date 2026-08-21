-- ==============================================================================
-- VOIDEX DATA ENGINE — RELATIONAL DATABASE SCHEMA v1.1
-- Schema Normalizado, Auditável com Data Provenance, Variant System e Separação Market/Build
-- Total Real de Tabelas: 14 Tabelas Relacionais
-- ==============================================================================

-- 1. DATASET VERSIONS & AUDIT LOGS
CREATE TABLE IF NOT EXISTS dataset_versions (
    version_id VARCHAR(32) PRIMARY KEY, -- ex: "v1.0", "v1.1"
    game_patch VARCHAR(64) NOT NULL,    -- ex: "Update 38.0.2 - 1999"
    release_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    changes_json JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(20) DEFAULT 'ACTIVE' -- 'ACTIVE', 'ARCHIVED', 'STAGING'
);

CREATE TABLE IF NOT EXISTS data_sources (
    source_id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    source_type VARCHAR(32) NOT NULL,   -- 'official_export', 'community_api', 'manual_verification'
    url TEXT,
    priority INT DEFAULT 1,
    status VARCHAR(20) DEFAULT 'VERIFIED',
    last_ingested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. GAME DATA TRANSLATIONS (15 Idiomas Suportados)
CREATE TABLE IF NOT EXISTS game_data_translations (
    entity_id VARCHAR(64) NOT NULL,
    entity_type VARCHAR(32) NOT NULL,   -- 'warframe', 'weapon', 'mod', 'arcane', 'shard', 'ability'
    language VARCHAR(10) NOT NULL,      -- 'en', 'pt-BR', 'es', 'fr', 'de', 'ja', etc.
    localized_name VARCHAR(255) NOT NULL,
    localized_description TEXT,
    localized_lore_quote TEXT,
    translation_status VARCHAR(32) DEFAULT 'VERIFIED', -- 'VERIFIED', 'COMMUNITY_VERIFIED', 'PENDING'
    source_id VARCHAR(32) REFERENCES data_sources(source_id),
    PRIMARY KEY (entity_id, language)
);
CREATE INDEX IF NOT EXISTS idx_game_translations_search ON game_data_translations (language, localized_name);

-- 3. WARFRAMES & VARIANTS
CREATE TABLE IF NOT EXISTS warframes (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    base_entity_id VARCHAR(64) REFERENCES warframes(id),
    variant_type VARCHAR(32) DEFAULT 'base', -- 'base', 'prime', 'umbra'
    vault_status VARCHAR(32) DEFAULT 'available',
    mastery_rank INT DEFAULT 0,
    market_supported BOOLEAN DEFAULT TRUE,
    build_supported BOOLEAN DEFAULT FALSE,
    base_health INT NOT NULL,
    base_shield INT NOT NULL,
    base_armor INT NOT NULL,
    base_energy INT NOT NULL,
    base_sprint_speed NUMERIC(4, 2) DEFAULT 1.0,
    aura_polarity VARCHAR(16) DEFAULT 'none',
    exilus_polarity VARCHAR(16) DEFAULT 'none',
    acquisition_method TEXT,
    provenance_source_id VARCHAR(32) REFERENCES data_sources(source_id),
    verification_status VARCHAR(32) DEFAULT 'UNVERIFIED',
    confidence NUMERIC(3, 2) DEFAULT 1.0,
    dataset_version VARCHAR(32) REFERENCES dataset_versions(version_id),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. WARFRAME ABILITIES & SCALINGS
CREATE TABLE IF NOT EXISTS warframe_abilities (
    id VARCHAR(64) PRIMARY KEY,
    warframe_id VARCHAR(64) NOT NULL REFERENCES warframes(id) ON DELETE CASCADE,
    slot_number VARCHAR(10) NOT NULL, -- '1', '2', '3', '4', 'passive'
    slug VARCHAR(64) NOT NULL,
    name VARCHAR(128) NOT NULL,
    energy_cost INT DEFAULT 25,
    subsumable_via_helminth BOOLEAN DEFAULT FALSE,
    description TEXT,
    structured_effects_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    provenance_source_id VARCHAR(32) REFERENCES data_sources(source_id)
);

-- 5. MODS & MOD RANKS
CREATE TABLE IF NOT EXISTS mods (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    category VARCHAR(32) NOT NULL,     -- 'warframe', 'primary', 'aura', 'exilus', 'stance', etc.
    type VARCHAR(32) NOT NULL,         -- 'regular', 'primed', 'archon', 'galvanized', 'corrupted', 'augment'
    rarity VARCHAR(20) NOT NULL,       -- 'common', 'uncommon', 'rare', 'legendary'
    polarity VARCHAR(16) NOT NULL,     -- 'madurai', 'vazarin', 'naramon', 'zenurik', 'umbra'
    base_drain INT NOT NULL,
    max_rank INT NOT NULL,
    tradeable BOOLEAN DEFAULT TRUE,
    market_supported BOOLEAN DEFAULT TRUE,
    build_supported BOOLEAN DEFAULT FALSE,
    set_id VARCHAR(64),
    source TEXT,
    verification_status VARCHAR(32) DEFAULT 'UNVERIFIED',
    provenance_source_id VARCHAR(32) REFERENCES data_sources(source_id),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mod_ranks (
    mod_id VARCHAR(64) NOT NULL REFERENCES mods(id) ON DELETE CASCADE,
    rank INT NOT NULL,
    drain INT NOT NULL,
    effects_json JSONB NOT NULL,       -- Array de { attribute, operator, value, condition }
    display_description TEXT NOT NULL,
    PRIMARY KEY (mod_id, rank)
);

CREATE TABLE IF NOT EXISTS mod_sets (
    set_id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    bonuses_json JSONB NOT NULL        -- Bônus de 1..6 peças
);

-- 6. ARCANES & RANKS
CREATE TABLE IF NOT EXISTS arcanes (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    slot_type VARCHAR(32) NOT NULL,    -- 'warframe', 'primary', 'secondary', 'melee', 'operator'
    rarity VARCHAR(20) NOT NULL,
    max_rank INT DEFAULT 5,
    market_supported BOOLEAN DEFAULT TRUE,
    build_supported BOOLEAN DEFAULT FALSE,
    source TEXT,
    verification_status VARCHAR(32) DEFAULT 'UNVERIFIED',
    provenance_source_id VARCHAR(32) REFERENCES data_sources(source_id),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS arcane_ranks (
    arcane_id VARCHAR(64) NOT NULL REFERENCES arcanes(id) ON DELETE CASCADE,
    rank INT NOT NULL,
    effect_text TEXT NOT NULL,
    stat_modifiers_json JSONB NOT NULL,
    duration_seconds INT DEFAULT 0,
    max_stacks INT DEFAULT 1,
    cooldown_seconds INT DEFAULT 0,
    PRIMARY KEY (arcane_id, rank)
);

-- 7. ARCHON SHARDS
CREATE TABLE IF NOT EXISTS archon_shards (
    type VARCHAR(32) PRIMARY KEY,      -- 'crimson', 'amber', 'azure', 'topaz', 'emerald', 'violet'
    color_name VARCHAR(32) NOT NULL,
    description TEXT NOT NULL,
    market_supported BOOLEAN DEFAULT TRUE,
    build_supported BOOLEAN DEFAULT TRUE,
    options_json JSONB NOT NULL,       -- Opções de atributos Normal e Tauforged
    provenance_source_id VARCHAR(32) REFERENCES data_sources(source_id)
);

-- 8. HELMINTH SUBSUMED ABILITIES
CREATE TABLE IF NOT EXISTS helminth_abilities (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    source_warframe_id VARCHAR(64) REFERENCES warframes(id),
    original_slot VARCHAR(10) NOT NULL,
    energy_cost INT DEFAULT 25,
    damage_cap_or_penalty TEXT,
    incompatible_abilities TEXT[],
    build_supported BOOLEAN DEFAULT TRUE,
    structured_effects_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    provenance_source_id VARCHAR(32) REFERENCES data_sources(source_id)
);

-- 9. WEAPONS & INCARNON
CREATE TABLE IF NOT EXISTS weapons (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    category VARCHAR(32) NOT NULL,     -- 'primary_rifle', 'melee_heavy_blade', etc.
    base_entity_id VARCHAR(64) REFERENCES weapons(id),
    variant_type VARCHAR(32) DEFAULT 'base', -- 'base', 'prime', 'kuva', 'tenet', 'incarnon'
    mastery_rank INT DEFAULT 0,
    market_supported BOOLEAN DEFAULT TRUE,
    build_supported BOOLEAN DEFAULT FALSE,
    total_base_damage NUMERIC(8, 2) NOT NULL,
    damage_distribution JSONB NOT NULL, -- { impact, puncture, slash, heat, ... }
    critical_chance NUMERIC(5, 4) NOT NULL,
    critical_multiplier NUMERIC(5, 2) NOT NULL,
    status_chance NUMERIC(5, 4) NOT NULL,
    fire_rate NUMERIC(6, 2) NOT NULL,
    multishot NUMERIC(4, 2) DEFAULT 1.0,
    magazine_size INT DEFAULT 0,
    reload_time_seconds NUMERIC(4, 2) DEFAULT 0,
    has_incarnon_form BOOLEAN DEFAULT FALSE,
    incarnon_evolutions_json JSONB,
    verification_status VARCHAR(32) DEFAULT 'UNVERIFIED',
    provenance_source_id VARCHAR(32) REFERENCES data_sources(source_id),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. COMPANIONS
CREATE TABLE IF NOT EXISTS companions (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    category VARCHAR(32) NOT NULL,     -- 'sentinel', 'kavat', 'kubrow', 'vulpaphyla'
    base_entity_id VARCHAR(64) REFERENCES companions(id),
    variant_type VARCHAR(32) DEFAULT 'base',
    market_supported BOOLEAN DEFAULT TRUE,
    build_supported BOOLEAN DEFAULT FALSE,
    base_health INT NOT NULL,
    base_shield INT NOT NULL,
    base_armor INT NOT NULL,
    precepts_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    verification_status VARCHAR(32) DEFAULT 'UNVERIFIED',
    provenance_source_id VARCHAR(32) REFERENCES data_sources(source_id),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. BUILDS & CHANGE AUDIT
CREATE TABLE IF NOT EXISTS builds (
    id VARCHAR(64) PRIMARY KEY,
    author_id VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    warframe_id VARCHAR(64) NOT NULL REFERENCES warframes(id),
    dataset_version VARCHAR(32) REFERENCES dataset_versions(version_id),
    aura_mod_id VARCHAR(64) REFERENCES mods(id),
    exilus_mod_id VARCHAR(64) REFERENCES mods(id),
    helminth_ability_id VARCHAR(64) REFERENCES helminth_abilities(id),
    forma_count INT DEFAULT 0,
    orokin_reactor BOOLEAN DEFAULT TRUE,
    build_dna_json JSONB NOT NULL,
    calculated_stats_json JSONB NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    version INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS build_mod_slots (
    build_id VARCHAR(64) NOT NULL REFERENCES builds(id) ON DELETE CASCADE,
    slot_index INT NOT NULL,
    mod_id VARCHAR(64) NOT NULL REFERENCES mods(id),
    equipped_rank INT NOT NULL,
    applied_polarity VARCHAR(16) DEFAULT 'none',
    PRIMARY KEY (build_id, slot_index)
);

CREATE TABLE IF NOT EXISTS build_change_logs (
    id SERIAL PRIMARY KEY,
    build_id VARCHAR(64) NOT NULL REFERENCES builds(id) ON DELETE CASCADE,
    item_changed_id VARCHAR(64) NOT NULL,
    item_type VARCHAR(32) NOT NULL,
    old_value JSONB,
    new_value JSONB,
    impact_description TEXT NOT NULL,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
