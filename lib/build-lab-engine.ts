/**
 * VOIDEX — BUILD LAB ENGINE
 * Sistema Inteligente de Domínio, Dados e Decisão Assistida de Builds
 * Filosofia: "PLAYER DECIDES + AI ASSISTS"
 */

export interface WarframeStatImpact {
  health: number;
  shields: number;
  armor: number;
  energy: number;
  sprint: number;
  strength: number;    // %
  duration: number;    // %
  efficiency: number;  // %
  range: number;       // %
}

export interface ModAlternative {
  name: string;
  category: string;
  reason: string;
  gain: string;
  loss: string;
  investmentDelta: string;
}

export interface BuildModItem {
  slotIndex: number;
  name: string;
  rank: number;
  maxRank: number;
  capacity: number;
  polarity: 'madurai' | 'vazarin' | 'naramon' | 'zenurik' | 'umbra' | 'none';
  effect: string;
  category: 'strength' | 'duration' | 'efficiency' | 'range' | 'survival' | 'utility' | 'augment' | 'energy';
  statImpact: Partial<WarframeStatImpact>;
  alternatives: ModAlternative[];
}

export interface BuildDNA {
  damage: number;       // 0 - 100
  survival: number;     // 0 - 100
  control: number;      // 0 - 100
  energy: number;       // 0 - 100
  mobility: number;     // 0 - 100
  scalability: number;  // 0 - 100
}

export interface WeaponSynergyItem {
  type: 'primary' | 'secondary' | 'melee';
  name: string;
  subType: string;
  why: string;
  synergyDetails: string;
  budgetAlternative: string;
}

export interface CompanionSynergyItem {
  name: string;
  type: string;
  why: string;
  keyAbilities: string[];
  budgetAlternative: string;
}

export interface BuildPathway {
  id: string;
  title: string;
  tagline: string;
  role: string;
  difficulty: number;   // 1 - 5 estrelas
  investment: number;   // 1 - 5 estrelas
  formaCount: number;
  orokinReactor: boolean;
  helminth: {
    abilityName: string;
    replacedSlot: string;
    reason: string;
  } | null;
  archonShards: {
    crimson: number;
    amber: number;
    azure: number;
    topaz: number;
    emerald: number;
    violet: number;
    isTauforged: boolean;
    effectDescription: string;
  };
  aura: {
    name: string;
    polarity: string;
    effect: string;
  };
  exilus: {
    name: string;
    polarity: string;
    effect: string;
  };
  arcanes: [
    { name: string; rank: number; effect: string },
    { name: string; rank: number; effect: string }
  ];
  mods: BuildModItem[];
  dna: BuildDNA;
  finalStats: WarframeStatImpact;
  howItWorks: string;
  howToPlay: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  weapons: WeaponSynergyItem[];
  companion: CompanionSynergyItem;
  marketPlatCostEstimate: number; // Preço somado de mods + arcanos no mercado
}

export interface WarframeBuildProfile {
  id: string;
  name: string;
  subTitle: string;
  iconId: string;
  baseHealth: number;
  baseShields: number;
  baseArmor: number;
  baseEnergy: number;
  baseSprint: number;
  passive: string;
  abilities: string[];
  paths: [BuildPathway, BuildPathway, BuildPathway];
}

export const WARFRAME_BUILDS_DATABASE: WarframeBuildProfile[] = [
  // ==========================================
  // 1. REVENANT PRIME
  // ==========================================
  {
    id: 'revenant-prime',
    name: 'Revenant Prime',
    subTitle: 'O Tenno Eidolon Imortal',
    iconId: 'revenant-prime-set',
    baseHealth: 370,
    baseShields: 740,
    baseArmor: 135,
    baseEnergy: 188,
    baseSprint: 1.0,
    passive: 'Emite uma onda de choque que derruba inimigos próximos ao esgotar os escudos.',
    abilities: ['Enthrall', 'Mesmer Skin', 'Reave', 'Danse Macabre'],
    paths: [
      {
        id: 'rev-immortal-tank',
        title: 'BUILD 01 — IMMORTAL TANK & LEVEL CAP',
        tagline: 'Imunidade absoluta a qualquer dano através de acúmulos extremos de Mesmer Skin.',
        role: 'Tank / Endurance / Level Cap',
        difficulty: 2,
        investment: 4,
        formaCount: 3,
        orokinReactor: true,
        helminth: {
          abilityName: 'Roar (Rhino)',
          replacedSlot: 'Danse Macabre (4)',
          reason: 'Substitui a habilidade 4 por Roar para amplificar todo o dano de armas e aliados com a Força elevada.'
        },
        archonShards: {
          crimson: 3,
          amber: 2,
          azure: 0,
          topaz: 0,
          emerald: 0,
          violet: 0,
          isTauforged: true,
          effectDescription: '+45% Força de Habilidade Tauforged + 75% Velocidade de Conjuração Tauforged para renovar Mesmer Skin instantaneamente.'
        },
        aura: {
          name: 'Corrosive Projection',
          polarity: 'naramon',
          effect: '-18% de armadura para todos os inimigos.'
        },
        exilus: {
          name: 'Sure Footed Primed',
          polarity: 'vazarin',
          effect: '100% de resistência a quedas e repulsões.'
        },
        arcanes: [
          { name: 'Arcane Molt Augmented', rank: 5, effect: '+0.24% de Força por abate (até +60% max).' },
          { name: 'Arcane Molt Efficiency', rank: 5, effect: '+36% de Duração enquanto os escudos estiverem ativos.' }
        ],
        mods: [
          {
            slotIndex: 0,
            name: 'Mesmer Shield',
            rank: 3,
            maxRank: 3,
            capacity: 9,
            polarity: 'zenurik',
            effect: '+5 cargas extras de Mesmer Skin e concede 5 cargas aos aliados próximos.',
            category: 'augment',
            statImpact: { strength: 0 },
            alternatives: [
              { name: 'Thrall Pact', category: 'augment', reason: 'Mais dano primário por Thrall ativo.', gain: '+200% dano primário', loss: 'Perde proteção aos aliados', investmentDelta: '0 Forma' }
            ]
          },
          {
            slotIndex: 1,
            name: 'Blind Rage',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'madurai',
            effect: '+99% de Força de Habilidade, -55% de Eficiência.',
            category: 'strength',
            statImpact: { strength: 99, efficiency: -55 },
            alternatives: [
              { name: 'Transient Fortitude', category: 'strength', reason: 'Mantém mais eficiência perdendo duração.', gain: '+55% Força sem penalidade de energia', loss: '-27.5% Duração', investmentDelta: '0 Forma' },
              { name: 'Umbral Intensify', category: 'strength', reason: 'Alternativa segura sem penalidade de eficiência.', gain: '+44% Força neutra', loss: 'Menos cargas totais', investmentDelta: '+1 Forma Umbra' }
            ]
          },
          {
            slotIndex: 2,
            name: 'Umbral Intensify',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'umbra',
            effect: '+44% de Força de Habilidade.',
            category: 'strength',
            statImpact: { strength: 44 },
            alternatives: [
              { name: 'Archon Intensify', category: 'strength', reason: 'Ativa +30% se curar vida com Reave.', gain: 'Até +60% Força condicional', loss: 'Exige cura ativa', investmentDelta: '0 Forma' }
            ]
          },
          {
            slotIndex: 3,
            name: 'Primed Continuity',
            rank: 10,
            maxRank: 10,
            capacity: 14,
            polarity: 'madurai',
            effect: '+55% de Duração de Habilidade.',
            category: 'duration',
            statImpact: { duration: 55 },
            alternatives: [
              { name: 'Continuity Comum', category: 'duration', reason: 'Versão econômica de baixo custo.', gain: 'Acessível sem Baro Ki\'Teer', loss: '-25% Duração em relação ao Primed', investmentDelta: '-1 Forma' }
            ]
          },
          {
            slotIndex: 4,
            name: 'Augur Secrets',
            rank: 5,
            maxRank: 5,
            capacity: 7,
            polarity: 'naramon',
            effect: '+24% de Força de Habilidade. Converte 40% de energia gasta em escudos.',
            category: 'strength',
            statImpact: { strength: 24 },
            alternatives: [
              { name: 'Power Drift', category: 'strength', reason: 'Pode ser usado no Exilus liberando slot principal.', gain: '+15% Força e +30% Knockdown', loss: '-9% Força total', investmentDelta: '0 Forma' }
            ]
          },
          {
            slotIndex: 5,
            name: 'Primed Flow',
            rank: 10,
            maxRank: 10,
            capacity: 14,
            polarity: 'vazarin',
            effect: '+275% de Capacidade Máxima de Energia.',
            category: 'energy',
            statImpact: { energy: 275 },
            alternatives: [
              { name: 'Flow Comum', category: 'energy', reason: 'Alternativa básica de baixo investimento.', gain: 'Custo mínimo em endo', loss: '-125% capacidade de energia', investmentDelta: '0 Forma' }
            ]
          },
          {
            slotIndex: 6,
            name: 'Streamline',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'naramon',
            effect: '+30% de Eficiência de Habilidade para compensar Blind Rage.',
            category: 'efficiency',
            statImpact: { efficiency: 30 },
            alternatives: [
              { name: 'Fleeting Expertise (Rank 4)', category: 'efficiency', reason: 'Máxima redução de custo por cast.', gain: '+50% Eficiência', loss: '-50% Duração', investmentDelta: '0 Forma' }
            ]
          },
          {
            slotIndex: 7,
            name: 'Natural Talent',
            rank: 3,
            maxRank: 3,
            capacity: 9,
            polarity: 'naramon',
            effect: '+50% de Velocidade de Conjuração.',
            category: 'utility',
            statImpact: {},
            alternatives: [
              { name: 'Rolling Guard', category: 'survival', reason: 'Janela de 3s de invulnerabilidade e remoção de status ao rolar.', gain: 'Limpeza de status garantida', loss: 'Conjuração mais lenta', investmentDelta: '0 Forma' }
            ]
          }
        ],
        dna: {
          damage: 78,
          survival: 100,
          control: 65,
          energy: 86,
          mobility: 74,
          scalability: 99
        },
        finalStats: {
          health: 370,
          shields: 740,
          armor: 135,
          energy: 638,
          sprint: 1.0,
          strength: 312,
          duration: 155,
          efficiency: 75,
          range: 100
        },
        howItWorks: 'Esta build atinge mais de 310% de Força de Habilidade combinando Blind Rage, Umbral Intensify, Augur Secrets e Molt Augmented. Com isso, sua Mesmer Skin gera 22+ cargas invulneráveis que anulam qualquer ataque e colocam os agressores para dormir instantaneamente. O aumento Mesmer Shield estende a mesma imunidade ao seu esquadrão.',
        howToPlay: {
          step1: 'Ao iniciar a missão, ative imediatamente Mesmer Skin (Habilidade 2) para garantir invulnerabilidade de 20+ cargas.',
          step2: 'Conforme acumular energia, ative o Roar subsumido no slot 4 para conceder +90% de dano global para suas armas.',
          step3: 'Use Enthrall (1) em líderes eximus ou inimigos perigosos para transformá-los em aliados e dispersar a atenção.',
          step4: 'Se o contador de cargas de Mesmer Skin chegar a 3 ou menos, encontre um breve respiro e reconjure a habilidade 2 instantaneamente.'
        },
        weapons: [
          {
            type: 'primary',
            name: 'Torid Incarnon',
            subType: 'Rifle de Feixe Tóxico Corrosivo',
            why: 'Feixe de auto-mira em cadeia que derrete hordas inteiras em frações de segundo impulsionado pelo Roar da build.',
            synergyDetails: 'A invulnerabilidade do Revenant permite que você atire à queima-roupa sem se preocupar com dano próprio.',
            budgetAlternative: 'Ignis Wraith'
          },
          {
            type: 'secondary',
            name: 'Epitaph Prime',
            subType: 'Primer de Status Frio / Viral',
            why: 'Aplica status massivos em área para finalizar inimigos instantaneamente com Reave ou armas melee.',
            synergyDetails: 'Congela inimigos no lugar enquanto você renova suas cargas de proteção.',
            budgetAlternative: 'Kuva Nukor'
          },
          {
            type: 'melee',
            name: 'Glaive Prime',
            subType: 'Disco de Explosão Forçada de Corte',
            why: 'Explosões aéreas com proc garantido de Slash que ignoram completamente a armadura dos inimigos no Steel Path.',
            synergyDetails: 'Beneficia-se enormemente do bônus multiplicativo do Roar.',
            budgetAlternative: 'Xoris'
          }
        ],
        companion: {
          name: 'Nautilus Prime',
          type: 'Sentinela de Suporte Tático',
          why: 'Utiliza o mod Cordon para puxar todos os inimigos em um raio de 30m em um único ponto compacto.',
          keyAbilities: ['Cordon (Agrupamento em Massa)', 'Manifold Bond (Redução de Cooldown)', 'Momentous Bond (Dano Elemental Extra)'],
          budgetAlternative: 'Carrier Prime ou Dethcube'
        },
        marketPlatCostEstimate: 165
      },
      {
        id: 'rev-weapon-platform',
        title: 'BUILD 02 — WEAPON PLATFORM DPS',
        tagline: 'Focado em maximizar o potencial destrutivo de armas com Nourish + Roar e Thrall Pact.',
        role: 'Weapon Platform / Dano Contínuo',
        difficulty: 3,
        investment: 3,
        formaCount: 2,
        orokinReactor: true,
        helminth: {
          abilityName: 'Nourish (Grendel)',
          replacedSlot: 'Danse Macabre (4)',
          reason: 'Adiciona dano Viral intrínseco a todas as suas armas e multiplica todo ganho de energia por 3x.'
        },
        archonShards: {
          crimson: 4,
          amber: 1,
          azure: 0,
          topaz: 0,
          emerald: 0,
          violet: 0,
          isTauforged: false,
          effectDescription: '+40% Dano Crítico Secundário e +25% Velocidade de Conjuração.'
        },
        aura: {
          name: 'Steel Charge',
          polarity: 'madurai',
          effect: '+60% de Dano Melee e +18 pontos de Capacidade de Mod.'
        },
        exilus: {
          name: 'Power Drift',
          polarity: 'madurai',
          effect: '+15% Força de Habilidade e 30% de Resistência a Quedas.'
        },
        arcanes: [
          { name: 'Arcane Precision', rank: 5, effect: '+300% Dano Secundário por 18s após acerto na cabeça.' },
          { name: 'Arcane Energize', rank: 5, effect: '60% de chance de restaurar 150 de energia em área ao pegar orbes.' }
        ],
        mods: [
          {
            slotIndex: 0,
            name: 'Thrall Pact',
            rank: 3,
            maxRank: 3,
            capacity: 9,
            polarity: 'zenurik',
            effect: '+25% de dano primário por cada Thrall ativo (até +175% de dano de arma aditivo).',
            category: 'augment',
            statImpact: {},
            alternatives: [
              { name: 'Mesmer Shield', category: 'augment', reason: 'Para missões cooperativas.', gain: 'Compartilha cargas com o time', loss: '-175% bônus de dano de arma', investmentDelta: '0 Forma' }
            ]
          },
          {
            slotIndex: 1,
            name: 'Blind Rage',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'madurai',
            effect: '+99% Força de Habilidade.',
            category: 'strength',
            statImpact: { strength: 99, efficiency: -55 },
            alternatives: []
          },
          {
            slotIndex: 2,
            name: 'Intensify',
            rank: 5,
            maxRank: 5,
            capacity: 11,
            polarity: 'madurai',
            effect: '+30% Força de Habilidade.',
            category: 'strength',
            statImpact: { strength: 30 },
            alternatives: []
          },
          {
            slotIndex: 3,
            name: 'Primed Continuity',
            rank: 10,
            maxRank: 10,
            capacity: 14,
            polarity: 'madurai',
            effect: '+55% Duração de Habilidade.',
            category: 'duration',
            statImpact: { duration: 55 },
            alternatives: []
          },
          {
            slotIndex: 4,
            name: 'Stretch',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'naramon',
            effect: '+45% Alcance de Habilidade para espalhar Nourish e Enthrall.',
            category: 'range',
            statImpact: { range: 45 },
            alternatives: []
          },
          {
            slotIndex: 5,
            name: 'Primed Flow',
            rank: 10,
            maxRank: 10,
            capacity: 14,
            polarity: 'vazarin',
            effect: '+275% Capacidade de Energia.',
            category: 'energy',
            statImpact: { energy: 275 },
            alternatives: []
          },
          {
            slotIndex: 6,
            name: 'Rolling Guard',
            rank: 10,
            maxRank: 10,
            capacity: 12,
            polarity: 'vazarin',
            effect: '3s de invulnerabilidade e limpeza de efeitos de status ao rolar.',
            category: 'survival',
            statImpact: {},
            alternatives: []
          },
          {
            slotIndex: 7,
            name: 'Streamline',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'naramon',
            effect: '+30% Eficiência de Habilidade.',
            category: 'efficiency',
            statImpact: { efficiency: 30 },
            alternatives: []
          }
        ],
        dna: {
          damage: 96,
          survival: 88,
          control: 60,
          energy: 92,
          mobility: 78,
          scalability: 94
        },
        finalStats: {
          health: 370,
          shields: 740,
          armor: 135,
          energy: 638,
          sprint: 1.0,
          strength: 244,
          duration: 155,
          efficiency: 75,
          range: 145
        },
        howItWorks: 'Combina a invulnerabilidade segura de Mesmer Skin com os buffs massivos de Nourish (dano Viral nas armas) e o augment Thrall Pact (+175% dano primário). Permite utilizar qualquer arma com cadência ou crítico sem risco de morte.',
        howToPlay: {
          step1: 'Mantenha Mesmer Skin (2) ativa em 100% do tempo.',
          step2: 'Ative Nourish (4) para infundir dano Viral nas armas e triplicar a regeneração de energia.',
          step3: 'Marque 3 a 5 inimigos com Enthrall (1) para ativar os 175% de dano bônus do Thrall Pact.',
          step4: 'Dispare livremente com armas de alto calibre com total imunidade a interrupções e recuo.'
        },
        weapons: [
          {
            type: 'primary',
            name: 'Felarx',
            subType: 'Escopeta Incarnon Não-Crítica',
            why: 'Causa dano devastador com o perk de 2000% de dano em tiros não-críticos combinado com o Viral do Nourish.',
            synergyDetails: 'Derrete bosses, acólitos e eximus em 1 único disparo.',
            budgetAlternative: 'Corinth Prime'
          },
          {
            type: 'secondary',
            name: 'Laetum Incarnon',
            subType: 'Pistola Automática Explosiva',
            why: 'Transforma-se em uma metralhadora de micro-mísseis com dano radioativo/viral infinito.',
            synergyDetails: 'Ativa Arcane Precision instantaneamente em tiros na cabeça.',
            budgetAlternative: 'Lex Prime'
          },
          {
            type: 'melee',
            name: 'Praedos',
            subType: 'Tonfas Incarnon de Mobilidade',
            why: 'Concede +20% de velocidade de corrida e +30% de pulo bala passivamente enquanto equipada.',
            synergyDetails: 'Aumenta drasticamente a fluidez de movimentação.',
            budgetAlternative: 'Kronen Prime'
          }
        ],
        companion: {
          name: 'Panzer Vulpaphyla',
          type: 'Predador Infestado Imortal',
          why: 'Dispara esporos virais em área que infectam todos os alvos e nunca morre permanentemente (vira larva e renasce).',
          keyAbilities: ['Viral Quills (Esporos Virais)', 'Synth Deconstruct (Geração de Orbes de Vida)', 'Fetch (Coleta Universal)'],
          budgetAlternative: 'Smeeta Kavat'
        },
        marketPlatCostEstimate: 140
      },
      {
        id: 'rev-one-shot-reave',
        title: 'BUILD 03 — REAVE EXECUTIONER (100% ONE-SHOT)',
        tagline: 'Elimina qualquer inimigo ou Acólito do Steel Path em 1 único avanço de Reave.',
        role: 'Ability Damage / Nuke / Assassinato',
        difficulty: 4,
        investment: 4,
        formaCount: 3,
        orokinReactor: true,
        helminth: {
          abilityName: 'Roar (Rhino)',
          replacedSlot: 'Danse Macabre (4)',
          reason: 'Eleva a drenagem de vida percentual do Reave para ultrapassar 100% da vida total do alvo.'
        },
        archonShards: {
          crimson: 5,
          amber: 0,
          azure: 0,
          topaz: 0,
          emerald: 0,
          violet: 0,
          isTauforged: true,
          effectDescription: '+75% Força de Habilidade Tauforged para atingir o breakpoint do Reave sem depender de buffs externos.'
        },
        aura: {
          name: 'Growing Power',
          polarity: 'madurai',
          effect: '+25% de Força de Habilidade por 6s ao causar status com armas.'
        },
        exilus: {
          name: 'Preparation',
          polarity: 'zenurik',
          effect: 'Inicia a missão com 100% da capacidade de energia carregada.'
        },
        arcanes: [
          { name: 'Arcane Molt Augmented', rank: 5, effect: '+60% Força de Habilidade acumulada.' },
          { name: 'Arcane Molt Vigor', rank: 5, effect: '+45% Força de Habilidade na próxima habilidade após usar habilidade de Operador.' }
        ],
        mods: [
          {
            slotIndex: 0,
            name: 'Blind Rage',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'madurai',
            effect: '+99% Força de Habilidade.',
            category: 'strength',
            statImpact: { strength: 99 },
            alternatives: []
          },
          {
            slotIndex: 1,
            name: 'Transient Fortitude',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'madurai',
            effect: '+55% Força de Habilidade, -27.5% Duração.',
            category: 'strength',
            statImpact: { strength: 55, duration: -27.5 },
            alternatives: []
          },
          {
            slotIndex: 2,
            name: 'Umbral Intensify',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'umbra',
            effect: '+44% Força de Habilidade.',
            category: 'strength',
            statImpact: { strength: 44 },
            alternatives: []
          },
          {
            slotIndex: 3,
            name: 'Stretch',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'naramon',
            effect: '+45% Alcance de Habilidade para aumentar a largura do Reave.',
            category: 'range',
            statImpact: { range: 45 },
            alternatives: []
          },
          {
            slotIndex: 4,
            name: 'Overextended',
            rank: 5,
            maxRank: 5,
            capacity: 11,
            polarity: 'vazarin',
            effect: '+90% Alcance, -60% Força (compensado pelos Shards e Arcanos).',
            category: 'range',
            statImpact: { range: 90, strength: -60 },
            alternatives: []
          },
          {
            slotIndex: 5,
            name: 'Primed Flow',
            rank: 10,
            maxRank: 10,
            capacity: 14,
            polarity: 'vazarin',
            effect: '+275% Capacidade de Energia.',
            category: 'energy',
            statImpact: { energy: 275 },
            alternatives: []
          },
          {
            slotIndex: 6,
            name: 'Primed Continuity',
            rank: 10,
            maxRank: 10,
            capacity: 14,
            polarity: 'madurai',
            effect: '+55% Duração para manter o deslocamento do Reave.',
            category: 'duration',
            statImpact: { duration: 55 },
            alternatives: []
          },
          {
            slotIndex: 7,
            name: 'Streamline',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'naramon',
            effect: '+30% Eficiência.',
            category: 'efficiency',
            statImpact: { efficiency: 30 },
            alternatives: []
          }
        ],
        dna: {
          damage: 100,
          survival: 85,
          control: 70,
          energy: 80,
          mobility: 90,
          scalability: 100
        },
        finalStats: {
          health: 370,
          shields: 740,
          armor: 135,
          energy: 638,
          sprint: 1.0,
          strength: 313,
          duration: 127,
          efficiency: 75,
          range: 235
        },
        howItWorks: 'O Reave (habilidade 3) drena uma porcentagem fixa da vida total dos alvos. Contra inimigos hipnotizados pelo Enthrall (1), o dano percentual é quintuplicado (5x). Com mais de 250% de Força e o multiplicador do Roar ativo, um único avanço drena 100%+ de toda a vida e escudo do inimigo, matando instantaneamente mesmo no nível 9999 (Level Cap).',
        howToPlay: {
          step1: 'Ative Roar (4) e mantenha Mesmer Skin (2) ativa.',
          step2: 'Lance Enthrall (1) no grupo de inimigos ou Acólito.',
          step3: 'Avance atravessando os inimigos com Reave (3).',
          step4: 'Todos os inimigos atingidos são eliminados no mesmo milissegundo independente de armadura ou nível.'
        },
        weapons: [
          {
            type: 'primary',
            name: 'Cedo',
            subType: 'Escopeta Primer de Glaive Ricochete',
            why: 'Dispara um disco que explode e aplica todos os status primários em dezenas de inimigos instantaneamente.',
            synergyDetails: 'Ativa Growing Power e prepara os alvos para o Reave.',
            budgetAlternative: 'Phantasma Prime'
          },
          {
            type: 'secondary',
            name: 'Epitaph Prime',
            subType: 'Primer de Frio e Viral',
            why: 'Garante que os alvos fiquem com 10 stacks de Viral (+325% de dano adicional na vida).',
            synergyDetails: 'Reduz o requisito de Força necessária para o Reave dar 1-shot.',
            budgetAlternative: 'Grimoire'
          },
          {
            type: 'melee',
            name: 'Innodem Incarnon',
            subType: 'Adaga Incarnon de Alcance e Dano Aéreo',
            why: 'Garante mobilidade extrema e +40% de alcance de ataque.',
            synergyDetails: 'Excelente para reposicionamento rápido.',
            budgetAlternative: 'Ceramic Dagger'
          }
        ],
        companion: {
          name: 'Nautilus Prime',
          type: 'Sentinela de Sucção',
          why: 'Reúne os inimigos em fila para você acertar 10+ alvos de uma vez com um único Reave.',
          keyAbilities: ['Cordon', 'Manifold Bond', 'Shield Charger'],
          budgetAlternative: 'Diriga'
        },
        marketPlatCostEstimate: 180
      }
    ]
  },

  // ==========================================
  // 2. SARYN PRIME
  // ==========================================
  {
    id: 'saryn-prime',
    name: 'Saryn Prime',
    subTitle: 'A Imperatriz da Peste e Corrosão',
    iconId: 'saryn-prime-set',
    baseHealth: 450,
    baseShields: 370,
    baseArmor: 315,
    baseEnergy: 225,
    baseSprint: 1.0,
    passive: 'Efeitos de status de dano aplicados por Saryn duram 25% a mais.',
    abilities: ['Spores', 'Molt', 'Toxic Lash', 'Miasma'],
    paths: [
      {
        id: 'saryn-spore-nuke',
        title: 'BUILD 01 — SPORE MAP NUKE (SANCTUARY / STEEL PATH)',
        tagline: 'Disseminação massiva de esporos corrosivos que limpam mapas inteiros sem linha de visão.',
        role: 'Nuke / Dano em Área Massivo',
        difficulty: 3,
        investment: 4,
        formaCount: 3,
        orokinReactor: true,
        helminth: {
          abilityName: 'Gloom (Sevagoth)',
          replacedSlot: 'Molt (2)',
          reason: 'Cria uma aura de lentidão de 95% e cura a Saryn continuamente conforme os esporos causam dano no mapa.'
        },
        archonShards: {
          crimson: 2,
          amber: 1,
          azure: 0,
          topaz: 0,
          emerald: 2,
          violet: 0,
          isTauforged: true,
          effectDescription: '+2 Fragmentos Esmeralda (+4 stacks de Corrosivo para remover 100% da armadura dos inimigos) + Força e Velocidade de Conjuração.'
        },
        aura: {
          name: 'Corrosive Projection',
          polarity: 'naramon',
          effect: 'Redução passiva de armadura em área.'
        },
        exilus: {
          name: 'Cunning Drift',
          polarity: 'naramon',
          effect: '+15% Alcance de Habilidade e +12% Deslize.'
        },
        arcanes: [
          { name: 'Arcane Energize', rank: 5, effect: 'Sustento contínuo de energia para Gloom e Miasma.' },
          { name: 'Arcane Molt Augmented', rank: 5, effect: '+60% Força acumulada por abates de esporos.' }
        ],
        mods: [
          {
            slotIndex: 0,
            name: 'Overextended',
            rank: 5,
            maxRank: 5,
            capacity: 11,
            polarity: 'vazarin',
            effect: '+90% Alcance de Habilidade, -60% Força.',
            category: 'range',
            statImpact: { range: 90, strength: -60 },
            alternatives: []
          },
          {
            slotIndex: 1,
            name: 'Stretch',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'naramon',
            effect: '+45% Alcance de Habilidade.',
            category: 'range',
            statImpact: { range: 45 },
            alternatives: []
          },
          {
            slotIndex: 2,
            name: 'Augur Reach',
            rank: 5,
            maxRank: 5,
            capacity: 7,
            polarity: 'naramon',
            effect: '+30% Alcance de Habilidade.',
            category: 'range',
            statImpact: { range: 30 },
            alternatives: []
          },
          {
            slotIndex: 3,
            name: 'Blind Rage',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'madurai',
            effect: '+99% Força de Habilidade para compensar Overextended.',
            category: 'strength',
            statImpact: { strength: 99, efficiency: -55 },
            alternatives: []
          },
          {
            slotIndex: 4,
            name: 'Umbral Intensify',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'umbra',
            effect: '+44% Força de Habilidade.',
            category: 'strength',
            statImpact: { strength: 44 },
            alternatives: []
          },
          {
            slotIndex: 5,
            name: 'Primed Continuity',
            rank: 10,
            maxRank: 10,
            capacity: 14,
            polarity: 'madurai',
            effect: '+55% Duração para sustentar a queima de esporos.',
            category: 'duration',
            statImpact: { duration: 55 },
            alternatives: []
          },
          {
            slotIndex: 6,
            name: 'Primed Flow',
            rank: 10,
            maxRank: 10,
            capacity: 14,
            polarity: 'vazarin',
            effect: '+275% Capacidade de Energia.',
            category: 'energy',
            statImpact: { energy: 275 },
            alternatives: []
          },
          {
            slotIndex: 7,
            name: 'Brief Respite / Rolling Guard',
            rank: 10,
            maxRank: 10,
            capacity: 12,
            polarity: 'vazarin',
            effect: 'Garante Shield Gating ou 3s de invulnerabilidade.',
            category: 'survival',
            statImpact: {},
            alternatives: []
          }
        ],
        dna: {
          damage: 99,
          survival: 78,
          control: 85,
          energy: 82,
          mobility: 72,
          scalability: 98
        },
        finalStats: {
          health: 450,
          shields: 370,
          armor: 315,
          energy: 750,
          sprint: 1.0,
          strength: 183,
          duration: 155,
          efficiency: 45,
          range: 280
        },
        howItWorks: 'Com 280% de Alcance, os esporos se espalham por salas inteiras até 56 metros de raio a cada inimigo morto. Os 2 Shards Esmeralda permitem que o status Corrosivo acumule 14 vezes, removendo 100% da armadura de todos os inimigos no mapa. Gloom garante que o dano dos esporos cure a Saryn de 0 a 100% continuamente.',
        howToPlay: {
          step1: 'Lance Spores (1) no primeiro inimigo que avistar.',
          step2: 'Ative Toxic Lash (3) e atire no inimigo infectado para estourar os esporos e contaminar a sala inteira.',
          step3: 'Ative Gloom (2) para lentificar todos os inimigos ao redor em até 95%.',
          step4: 'Quando houver 15+ inimigos infectados, conjurar Miasma (4) para causar dano quadruplicado e limpar o mapa.'
        },
        weapons: [
          {
            type: 'primary',
            name: 'Sobek (com Acid Shells)',
            subType: 'Escopeta de Reação em Cadeia',
            why: 'Acid Shells causa dano de 45% da vida máxima do inimigo em área ao morrer, que escala com o Toxic Lash da Saryn.',
            synergyDetails: 'Gera explosões em cadeia que limpam salas inteiras com 1 único tiro.',
            budgetAlternative: 'Ignis Wraith'
          },
          {
            type: 'secondary',
            name: 'Kuva Nukor',
            subType: 'Feixe de Micro-Ondas e Status',
            why: 'Aplica 5 status diferentes em múltiplos alvos instantaneamente.',
            synergyDetails: 'Aumenta exponencialmente o dano do Condition Overload em armas melee.',
            budgetAlternative: 'Atomos'
          },
          {
            type: 'melee',
            name: 'Orthos Prime / Guandao Prime',
            subType: 'Arma de Haste de Grande Alcance',
            why: 'Ataques rápidos em 360° para estourar esporos em todos os inimigos ao seu redor.',
            synergyDetails: 'Excelente mobilidade e corte garantido.',
            budgetAlternative: 'Lesion'
          }
        ],
        companion: {
          name: 'Dethcube Prime',
          type: 'Sentinela Geradora de Energia',
          why: 'Com o mod Energy Generator, gera um orbe de energia azul a cada 10 assistências de abate dos esporos.',
          keyAbilities: ['Energy Generator', 'Synth Fiber', 'Assault Mode'],
          budgetAlternative: 'Carrier Prime'
        },
        marketPlatCostEstimate: 195
      },
      {
        id: 'saryn-weapon-platform',
        title: 'BUILD 02 — TOXIC LASH MELEE WEAPON PLATFORM',
        tagline: 'Foco em dano elemental massivo com armas corpo a corpo e Toxic Lash com 100% de Toxin bônus.',
        role: 'Weapon Platform / Melee DPS',
        difficulty: 2,
        investment: 3,
        formaCount: 2,
        orokinReactor: true,
        helminth: {
          abilityName: 'Roar (Rhino) ou Nourish (Grendel)',
          replacedSlot: 'Miasma (4)',
          reason: 'Combina Toxic Lash + Dano Viral/Roar para criar armas com multiplicadores absurdos.'
        },
        archonShards: {
          crimson: 3,
          amber: 2,
          azure: 0,
          topaz: 0,
          emerald: 0,
          violet: 0,
          isTauforged: false,
          effectDescription: '+30% Dano Crítico Melee e +50% Velocidade de Conjuração.'
        },
        aura: {
          name: 'Steel Charge',
          polarity: 'madurai',
          effect: '+60% Dano Melee.'
        },
        exilus: {
          name: 'Power Drift',
          polarity: 'madurai',
          effect: '+15% Força.'
        },
        arcanes: [
          { name: 'Arcane Strike', rank: 5, effect: '+60% de Velocidade de Ataque Melee por 18s ao acertar.' },
          { name: 'Arcane Fury', rank: 5, effect: '+180% de Dano Melee por 18s em acertos críticos.' }
        ],
        mods: [
          {
            slotIndex: 0,
            name: 'Venom Dose',
            rank: 3,
            maxRank: 3,
            capacity: 9,
            polarity: 'zenurik',
            effect: 'Segurar Spores concede +100% de Dano Corrosivo adicional a todas as armas de Saryn e aliados.',
            category: 'augment',
            statImpact: {},
            alternatives: []
          },
          {
            slotIndex: 1,
            name: 'Blind Rage',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'madurai',
            effect: '+99% Força.',
            category: 'strength',
            statImpact: { strength: 99 },
            alternatives: []
          },
          {
            slotIndex: 2,
            name: 'Transient Fortitude',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'madurai',
            effect: '+55% Força, -27.5% Duração.',
            category: 'strength',
            statImpact: { strength: 55 },
            alternatives: []
          },
          {
            slotIndex: 3,
            name: 'Umbral Intensify',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'umbra',
            effect: '+44% Força.',
            category: 'strength',
            statImpact: { strength: 44 },
            alternatives: []
          },
          {
            slotIndex: 4,
            name: 'Umbral Vitality',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'umbra',
            effect: '+100% Vida extra e sinergia Umbra.',
            category: 'survival',
            statImpact: { health: 100 },
            alternatives: []
          },
          {
            slotIndex: 5,
            name: 'Primed Continuity',
            rank: 10,
            maxRank: 10,
            capacity: 14,
            polarity: 'madurai',
            effect: '+55% Duração.',
            category: 'duration',
            statImpact: { duration: 55 },
            alternatives: []
          },
          {
            slotIndex: 6,
            name: 'Adaptation',
            rank: 10,
            maxRank: 10,
            capacity: 12,
            polarity: 'vazarin',
            effect: 'Até 90% de resistência cumulativa ao tipo de dano recebido.',
            category: 'survival',
            statImpact: {},
            alternatives: []
          },
          {
            slotIndex: 7,
            name: 'Primed Flow',
            rank: 10,
            maxRank: 10,
            capacity: 14,
            polarity: 'vazarin',
            effect: '+275% Energia.',
            category: 'energy',
            statImpact: { energy: 275 },
            alternatives: []
          }
        ],
        dna: {
          damage: 98,
          survival: 88,
          control: 50,
          energy: 76,
          mobility: 80,
          scalability: 92
        },
        finalStats: {
          health: 1110,
          shields: 370,
          armor: 315,
          energy: 750,
          sprint: 1.0,
          strength: 313,
          duration: 127,
          efficiency: 45,
          range: 100
        },
        howItWorks: 'Esta build converte a Saryn em uma força letal corpo a corpo. Com Venom Dose (+Corrosivo) e Toxic Lash (+Toxina com dano dobrado em melee) ativos simultaneamente, suas armas ganham 3 tipos elementais extras de forma pura, destruindo escudos Corpus e armaduras Grineer.',
        howToPlay: {
          step1: 'Segure a tecla 1 para ativar o buff de dano Corrosivo do Venom Dose.',
          step2: 'Ative Toxic Lash (3) para adicionar Toxina com proc garantido em cada golpe de espada.',
          step3: 'Ative Nourish ou Roar para completar o multiplicador triplo de dano.',
          step4: 'Ataque livremente com armas de alto combo (Glaive, Nikana, Dual Ichor Incarnon).'
        },
        weapons: [
          {
            type: 'primary',
            name: 'Torid Incarnon',
            subType: 'Rifle Primário',
            why: 'Excelente suporte de longo alcance.',
            synergyDetails: 'Aproveita o bônus de Venom Dose.',
            budgetAlternative: 'Acceltra Prime'
          },
          {
            type: 'secondary',
            name: 'Epitaph Prime',
            subType: 'Primer de Frio',
            why: 'Controle de grupo e desaceleração.',
            synergyDetails: 'Aumenta acertos críticos.',
            budgetAlternative: 'Pyrana Prime'
          },
          {
            type: 'melee',
            name: 'Dual Ichor Incarnon',
            subType: 'Machados Infestados com Poças de Gás',
            why: 'Gera poças de gás que herdam o dano tóxico de Saryn e matam inimigos que passam por cima.',
            synergyDetails: 'Sinergia 100% perfeita com Toxic Lash.',
            budgetAlternative: 'Orthos Prime'
          }
        ],
        companion: {
          name: 'Smeeta Kavat',
          type: 'Gato Kavat de Recursos e Crítico',
          why: 'Concede buffs aleatórios de 200% de crítico laranja/vermelho e dobra todos os drops da missão.',
          keyAbilities: ['Charm', 'Mischief', 'Fetch'],
          budgetAlternative: 'Panzer Vulpaphyla'
        },
        marketPlatCostEstimate: 150
      },
      {
        id: 'saryn-gloom-immortal',
        title: 'BUILD 03 — GLOOM TANK & REGÊN DE VIDA',
        tagline: 'Sobrevivência passiva infinita com Gloom em 95% slow e armadura Umbral tripla.',
        role: 'Tank / Suporte / Controle',
        difficulty: 2,
        investment: 5,
        formaCount: 4,
        orokinReactor: true,
        helminth: {
          abilityName: 'Gloom (Sevagoth)',
          replacedSlot: 'Molt (2)',
          reason: 'Lentidão máxima de 95% em área e roubo de vida integral para Saryn e companheiros.'
        },
        archonShards: {
          crimson: 3,
          amber: 2,
          azure: 0,
          topaz: 0,
          emerald: 0,
          violet: 0,
          isTauforged: true,
          effectDescription: '+45% Força Tauforged + 75% Velocidade de Conjuração.'
        },
        aura: {
          name: 'Growing Power',
          polarity: 'madurai',
          effect: '+25% Força.'
        },
        exilus: {
          name: 'Handspring / Sure Footed',
          polarity: 'vazarin',
          effect: 'Recuperação imediata de quedas.'
        },
        arcanes: [
          { name: 'Arcane Grace', rank: 5, effect: '9% de chance ao receber dano de regenerar +6% de vida por segundo.' },
          { name: 'Arcane Guardian', rank: 5, effect: '+900 de Armadura ao receber dano.' }
        ],
        mods: [
          {
            slotIndex: 0,
            name: 'Umbral Vitality',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'umbra',
            effect: '+180% Vida máxima.',
            category: 'survival',
            statImpact: { health: 180 },
            alternatives: []
          },
          {
            slotIndex: 1,
            name: 'Umbral Fiber',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'umbra',
            effect: '+192.5% Armadura.',
            category: 'survival',
            statImpact: { armor: 192.5 },
            alternatives: []
          },
          {
            slotIndex: 2,
            name: 'Umbral Intensify',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'umbra',
            effect: '+77% Força de Habilidade (com o trio Umbral ativo).',
            category: 'strength',
            statImpact: { strength: 77 },
            alternatives: []
          },
          {
            slotIndex: 3,
            name: 'Adaptation',
            rank: 10,
            maxRank: 10,
            capacity: 12,
            polarity: 'vazarin',
            effect: 'Redução de dano de até 90%.',
            category: 'survival',
            statImpact: {},
            alternatives: []
          },
          {
            slotIndex: 4,
            name: 'Primed Flow',
            rank: 10,
            maxRank: 10,
            capacity: 14,
            polarity: 'vazarin',
            effect: '+275% Capacidade de Energia.',
            category: 'energy',
            statImpact: { energy: 275 },
            alternatives: []
          },
          {
            slotIndex: 5,
            name: 'Primed Continuity',
            rank: 10,
            maxRank: 10,
            capacity: 14,
            polarity: 'madurai',
            effect: '+55% Duração.',
            category: 'duration',
            statImpact: { duration: 55 },
            alternatives: []
          },
          {
            slotIndex: 6,
            name: 'Stretch',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'naramon',
            effect: '+45% Alcance para a aura do Gloom.',
            category: 'range',
            statImpact: { range: 45 },
            alternatives: []
          },
          {
            slotIndex: 7,
            name: 'Hunter Adrenaline',
            rank: 5,
            maxRank: 5,
            capacity: 11,
            polarity: 'madurai',
            effect: 'Converte 45% do dano recebido na vida em Energia pura.',
            category: 'energy',
            statImpact: {},
            alternatives: []
          }
        ],
        dna: {
          damage: 82,
          survival: 98,
          control: 94,
          energy: 95,
          mobility: 68,
          scalability: 96
        },
        finalStats: {
          health: 1260,
          shields: 370,
          armor: 920,
          energy: 750,
          sprint: 1.0,
          strength: 272,
          duration: 155,
          efficiency: 100,
          range: 145
        },
        howItWorks: 'O ciclo perpétuo de energia e vida: o dano recebido na vida gera energia infinita através de Hunter Adrenaline, que alimenta o Gloom e os Spores. O Gloom, por sua vez, rouba vida de volta instantaneamente a cada tick de dano, tornando a Saryn praticamente impossível de ser morta.',
        howToPlay: {
          step1: 'Ative Gloom (2) no início da partida.',
          step2: 'Infecte os inimigos com Spores (1).',
          step3: 'Deixe os inimigos baterem em você para recarregar sua energia enquanto você os desintegra.',
          step4: 'Use Toxic Lash para eliminar alvos prioritários com regeneração imediata de 100% de vida.'
        },
        weapons: [
          {
            type: 'primary',
            name: 'Acceltra Prime',
            subType: 'Micro-Mísseis Rápidos',
            why: 'Disparo rápido e dano de impacto.',
            synergyDetails: 'Excelente contra grupos lentos.',
            budgetAlternative: 'Fulmin Prime'
          },
          {
            type: 'secondary',
            name: 'Epitaph Prime',
            subType: 'Primer',
            why: 'Lentidão extra.',
            synergyDetails: 'Sinergia de controle.',
            budgetAlternative: 'Lex Prime'
          },
          {
            type: 'melee',
            name: 'Nikana Prime',
            subType: 'Katana de Corte',
            why: 'Cortes rápidos com roubo de vida imediato.',
            synergyDetails: 'Combate seguro corpo a corpo.',
            budgetAlternative: 'Reaper Prime'
          }
        ],
        companion: {
          name: 'Nautilus Prime',
          type: 'Sentinela',
          why: 'Agrupa inimigos dentro da aura do Gloom.',
          keyAbilities: ['Cordon', 'Manifold Bond'],
          budgetAlternative: 'Carrier Prime'
        },
        marketPlatCostEstimate: 210
      }
    ]
  },

  // ==========================================
  // 3. GYRE PRIME
  // ==========================================
  {
    id: 'gyre-prime',
    name: 'Gyre Prime',
    subTitle: 'A Condutora de Choque e Críticos Físicos',
    iconId: 'gyre-prime-set',
    baseHealth: 370,
    baseShields: 740,
    baseArmor: 135,
    baseEnergy: 240,
    baseSprint: 1.1,
    passive: 'Habilidades de Gyre têm até +300% de chance crítica baseada em procs de Eletricidade ativos.',
    abilities: ['Arcsphere', 'Voltreck', 'Cathode Grace', 'Rotorswell'],
    paths: [
      {
        id: 'gyre-infinite-lightning',
        title: 'BUILD 01 — INFINITE RED CRIT LIGHTNING (CATHODE CURRENT)',
        tagline: 'Tempestade elétrica contínua com 100% de duração infinita e relâmpagos vermelhos em cadeia.',
        role: 'Ability Damage / Red Crits / Nuke',
        difficulty: 3,
        investment: 4,
        formaCount: 3,
        orokinReactor: true,
        helminth: {
          abilityName: 'Pillage (Hildryn)',
          replacedSlot: 'Arcsphere (1)',
          reason: 'Remove 100% dos escudos e armaduras dos inimigos e recarrega os escudos de Gyre (Shield Gating).'
        },
        archonShards: {
          crimson: 3,
          amber: 2,
          azure: 0,
          topaz: 0,
          emerald: 0,
          violet: 0,
          isTauforged: true,
          effectDescription: '+45% Força Tauforged (necessário para atingir 328% de Força para o Pillage dar 100% strip) + 75% Velocidade de Conjuração.'
        },
        aura: {
          name: 'Corrosive Projection',
          polarity: 'naramon',
          effect: 'Reduz a necessidade de Força para o Pillage atingir 100% de remoção de armadura.'
        },
        exilus: {
          name: 'Primed Sure Footed',
          polarity: 'vazarin',
          effect: 'Imunidade total a knockdowns.'
        },
        arcanes: [
          { name: 'Arcane Aegis', rank: 5, effect: '3% de chance de regenerar escudos continuamente por 12s ao sofrer dano (invencibilidade de escudos).' },
          { name: 'Arcane Molt Augmented', rank: 5, effect: '+60% Força acumulada por abates.' }
        ],
        mods: [
          {
            slotIndex: 0,
            name: 'Cathode Current',
            rank: 3,
            maxRank: 3,
            capacity: 9,
            polarity: 'zenurik',
            effect: 'Ao eliminar um inimigo com Cathode Grace ativo, Rotorswell dispara uma descarga extra e estende o tempo de ambas as habilidades.',
            category: 'augment',
            statImpact: {},
            alternatives: []
          },
          {
            slotIndex: 1,
            name: 'Blind Rage',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'madurai',
            effect: '+99% Força de Habilidade.',
            category: 'strength',
            statImpact: { strength: 99 },
            alternatives: []
          },
          {
            slotIndex: 2,
            name: 'Transient Fortitude',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'madurai',
            effect: '+55% Força, -27.5% Duração.',
            category: 'strength',
            statImpact: { strength: 55 },
            alternatives: []
          },
          {
            slotIndex: 3,
            name: 'Umbral Intensify',
            rank: 10,
            maxRank: 10,
            capacity: 16,
            polarity: 'umbra',
            effect: '+44% Força.',
            category: 'strength',
            statImpact: { strength: 44 },
            alternatives: []
          },
          {
            slotIndex: 4,
            name: 'Overextended',
            rank: 5,
            maxRank: 5,
            capacity: 11,
            polarity: 'vazarin',
            effect: '+90% Alcance, -60% Força.',
            category: 'range',
            statImpact: { range: 90, strength: -60 },
            alternatives: []
          },
          {
            slotIndex: 5,
            name: 'Stretch',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'naramon',
            effect: '+45% Alcance.',
            category: 'range',
            statImpact: { range: 45 },
            alternatives: []
          },
          {
            slotIndex: 6,
            name: 'Primed Flow',
            rank: 10,
            maxRank: 10,
            capacity: 14,
            polarity: 'vazarin',
            effect: '+275% Energia.',
            category: 'energy',
            statImpact: { energy: 275 },
            alternatives: []
          },
          {
            slotIndex: 7,
            name: 'Rolling Guard',
            rank: 10,
            maxRank: 10,
            capacity: 12,
            polarity: 'vazarin',
            effect: '3s de invulnerabilidade e limpeza de status.',
            category: 'survival',
            statImpact: {},
            alternatives: []
          }
        ],
        dna: {
          damage: 100,
          survival: 80,
          control: 92,
          energy: 90,
          mobility: 88,
          scalability: 96
        },
        finalStats: {
          health: 370,
          shields: 740,
          armor: 135,
          energy: 800,
          sprint: 1.1,
          strength: 328,
          duration: 127,
          efficiency: 45,
          range: 235
        },
        howItWorks: 'Com o augment Cathode Current, a cada inimigo morto o cronômetro de Cathode Grace (3) e Rotorswell (4) é renovado indefinidamente, permitindo que a tempestade elétrica nunca expire. O Pillage no slot 1 zera a armadura dos inimigos em 235% de alcance, fazendo com que os choques elétricos critiquem em números vermelhos de centenas de milhares de dano.',
        howToPlay: {
          step1: 'Ative Cathode Grace (3) para obter regeneração de energia e chance crítica massiva.',
          step2: 'Ative Rotorswell (4) para iniciar o campo de relâmpagos orbitais.',
          step3: 'Use Pillage (1) para retirar toda a armadura e escudos dos inimigos na sala.',
          step4: 'Dispare com sua arma primária de eletricidade — cada abate manterá suas habilidades ativas permanentemente sem precisar reconjurar!'
        },
        weapons: [
          {
            type: 'primary',
            name: 'Amprex / Torid Incarnon',
            subType: 'Rifle de Raios em Cadeia',
            why: 'Dispara raios contínuos que pulam entre 7 inimigos e ativam centenas de choques críticos por segundo.',
            synergyDetails: 'Garante que Cathode Current dispare seu choque máximo continuamente.',
            budgetAlternative: 'Fulmin Prime'
          },
          {
            type: 'secondary',
            name: 'Dual Toxocyst Incarnon',
            subType: 'Pistolas Duplas Automáticas',
            why: 'Após 1 tiro na cabeça, atira a 30 tiros por segundo com ricochete automático.',
            synergyDetails: 'Gera tempestades de críticos vermelhos.',
            budgetAlternative: 'Epitaph Prime'
          },
          {
            type: 'melee',
            name: 'Glaive Prime / Praedos',
            subType: 'Melee',
            why: 'Mobilidade ou dano em área rápido.',
            synergyDetails: 'Sinergia de velocidade.',
            budgetAlternative: 'Orthos Prime'
          }
        ],
        companion: {
          name: 'Nautilus Prime',
          type: 'Sentinela de Agrupamento',
          why: 'Puxa todos os inimigos para dentro do raio de choque de 8m do Rotorswell.',
          keyAbilities: ['Cordon', 'Manifold Bond', 'Shield Charger'],
          budgetAlternative: 'Carrier Prime'
        },
        marketPlatCostEstimate: 175
      },
      {
        id: 'gyre-nourish-hybrid',
        title: 'BUILD 02 — NOURISH & COIL WEAPON PLATFORM',
        tagline: 'Infunde dano Viral e Eletricidade com energia infinita e controle de área.',
        role: 'Weapon Platform / Híbrida',
        difficulty: 2,
        investment: 3,
        formaCount: 2,
        orokinReactor: true,
        helminth: {
          abilityName: 'Nourish (Grendel)',
          replacedSlot: 'Arcsphere (1)',
          reason: 'Combina Eletricidade + Viral e fornece energia ilimitada.'
        },
        archonShards: {
          crimson: 2,
          amber: 2,
          azure: 1,
          topaz: 0,
          emerald: 0,
          violet: 0,
          isTauforged: false,
          effectDescription: '+20% Força, +50% Cast Speed e +50 Energia Inicial.'
        },
        aura: {
          name: 'Growing Power',
          polarity: 'madurai',
          effect: '+25% Força.'
        },
        exilus: {
          name: 'Handspring',
          polarity: 'vazarin',
          effect: '+185% Velocidade de Recuperação de Quedas.'
        },
        arcanes: [
          { name: 'Arcane Strike', rank: 5, effect: '+60% Velocidade Melee.' },
          { name: 'Arcane Steadfast', rank: 5, effect: 'Chance de conjurar habilidades de graça.' }
        ],
        mods: [
          {
            slotIndex: 0,
            name: 'Cathode Current',
            rank: 3,
            maxRank: 3,
            capacity: 9,
            polarity: 'zenurik',
            effect: 'Renova Cathode Grace e dispara choques em cadeia.',
            category: 'augment',
            statImpact: {},
            alternatives: []
          },
          {
            slotIndex: 1,
            name: 'Intensify',
            rank: 5,
            maxRank: 5,
            capacity: 11,
            polarity: 'madurai',
            effect: '+30% Força.',
            category: 'strength',
            statImpact: { strength: 30 },
            alternatives: []
          },
          {
            slotIndex: 2,
            name: 'Stretch',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'naramon',
            effect: '+45% Alcance.',
            category: 'range',
            statImpact: { range: 45 },
            alternatives: []
          },
          {
            slotIndex: 3,
            name: 'Augur Reach',
            rank: 5,
            maxRank: 5,
            capacity: 7,
            polarity: 'naramon',
            effect: '+30% Alcance.',
            category: 'range',
            statImpact: { range: 30 },
            alternatives: []
          },
          {
            slotIndex: 4,
            name: 'Continuity',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'madurai',
            effect: '+30% Duração.',
            category: 'duration',
            statImpact: { duration: 30 },
            alternatives: []
          },
          {
            slotIndex: 5,
            name: 'Streamline',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'naramon',
            effect: '+30% Eficiência.',
            category: 'efficiency',
            statImpact: { efficiency: 30 },
            alternatives: []
          },
          {
            slotIndex: 6,
            name: 'Flow',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'vazarin',
            effect: '+150% Energia.',
            category: 'energy',
            statImpact: { energy: 150 },
            alternatives: []
          },
          {
            slotIndex: 7,
            name: 'Rolling Guard',
            rank: 10,
            maxRank: 10,
            capacity: 12,
            polarity: 'vazarin',
            effect: '3s de invulnerabilidade.',
            category: 'survival',
            statImpact: {},
            alternatives: []
          }
        ],
        dna: {
          damage: 92,
          survival: 78,
          control: 85,
          energy: 96,
          mobility: 84,
          scalability: 90
        },
        finalStats: {
          health: 370,
          shields: 740,
          armor: 135,
          energy: 600,
          sprint: 1.1,
          strength: 185,
          duration: 130,
          efficiency: 130,
          range: 175
        },
        howItWorks: 'Uma configuração ágil e econômica com Nourish + Cathode Grace que não necessita de mods caros como Primed ou Blind Rage. Proporciona energia inesgotável e dano de alto nível para missões diárias, incursões e Steel Path moderado.',
        howToPlay: {
          step1: 'Ative Nourish (1) e Cathode Grace (3).',
          step2: 'Ative Rotorswell (4) e avance eliminando inimigos.',
          step3: 'Use Rolling Guard se seus escudos quebrarem.',
          step4: 'Dispare continuamente aproveitando o ganho de energia infinito.'
        },
        weapons: [
          {
            type: 'primary',
            name: 'Fulmin Prime',
            subType: 'Rifle Elétrico',
            why: 'Munição infinita e alta cadência elétrica.',
            synergyDetails: 'Sinergia nativa com a passiva de Gyre.',
            budgetAlternative: 'Acceltra'
          },
          {
            type: 'secondary',
            name: 'Epitaph Prime',
            subType: 'Primer',
            why: 'Controle de área.',
            synergyDetails: 'Aplica Frio em grupo.',
            budgetAlternative: 'Lex Prime'
          },
          {
            type: 'melee',
            name: 'Orthos Prime',
            subType: 'Arma de Haste',
            why: 'Alcance e corte.',
            synergyDetails: 'Limpeza rápida.',
            budgetAlternative: 'Guandao'
          }
        ],
        companion: {
          name: 'Panzer Vulpaphyla',
          type: 'Predador Infestado',
          why: 'Espalha esporos virais de forma passiva.',
          keyAbilities: ['Viral Quills', 'Fetch'],
          budgetAlternative: 'Smeeta Kavat'
        },
        marketPlatCostEstimate: 95
      },
      {
        id: 'gyre-budget-starter',
        title: 'BUILD 03 — BUDGET STARTER (0 FORMA)',
        tagline: 'Configuração inicial acessível com mods padrão de baixo custo para jogadores novos.',
        role: 'Iniciante / Budget / Casual',
        difficulty: 1,
        investment: 1,
        formaCount: 0,
        orokinReactor: false,
        helminth: null,
        archonShards: {
          crimson: 0,
          amber: 0,
          azure: 0,
          topaz: 0,
          emerald: 0,
          violet: 0,
          isTauforged: false,
          effectDescription: 'Nenhum Shard necessário para esta versão econômica.'
        },
        aura: {
          name: 'Energy Siphon',
          polarity: 'naramon',
          effect: '+0.6 de Regeneração de Energia por segundo.'
        },
        exilus: {
          name: 'Thief\'s Wit',
          polarity: 'naramon',
          effect: '+42m de Radar de Itens no Minimapa.'
        },
        arcanes: [
          { name: 'Nenhum / Opcional', rank: 0, effect: 'Não requer arcanos caros.' },
          { name: 'Nenhum / Opcional', rank: 0, effect: 'Não requer arcanos caros.' }
        ],
        mods: [
          {
            slotIndex: 0,
            name: 'Cathode Current',
            rank: 3,
            maxRank: 3,
            capacity: 9,
            polarity: 'zenurik',
            effect: 'Renova a duração das habilidades ao matar.',
            category: 'augment',
            statImpact: {},
            alternatives: []
          },
          {
            slotIndex: 1,
            name: 'Intensify',
            rank: 5,
            maxRank: 5,
            capacity: 11,
            polarity: 'madurai',
            effect: '+30% Força.',
            category: 'strength',
            statImpact: { strength: 30 },
            alternatives: []
          },
          {
            slotIndex: 2,
            name: 'Stretch',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'naramon',
            effect: '+45% Alcance.',
            category: 'range',
            statImpact: { range: 45 },
            alternatives: []
          },
          {
            slotIndex: 3,
            name: 'Continuity',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'madurai',
            effect: '+30% Duração.',
            category: 'duration',
            statImpact: { duration: 30 },
            alternatives: []
          },
          {
            slotIndex: 4,
            name: 'Streamline',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'naramon',
            effect: '+30% Eficiência.',
            category: 'efficiency',
            statImpact: { efficiency: 30 },
            alternatives: []
          },
          {
            slotIndex: 5,
            name: 'Flow',
            rank: 5,
            maxRank: 5,
            capacity: 9,
            polarity: 'vazarin',
            effect: '+150% Energia.',
            category: 'energy',
            statImpact: { energy: 150 },
            alternatives: []
          },
          {
            slotIndex: 6,
            name: 'Redirection',
            rank: 8,
            maxRank: 10,
            capacity: 10,
            polarity: 'vazarin',
            effect: '+360% Escudo máximo.',
            category: 'survival',
            statImpact: { shields: 360 },
            alternatives: []
          },
          {
            slotIndex: 7,
            name: 'Vitality',
            rank: 6,
            maxRank: 10,
            capacity: 8,
            polarity: 'vazarin',
            effect: '+280% Vida máxima.',
            category: 'survival',
            statImpact: { health: 280 },
            alternatives: []
          }
        ],
        dna: {
          damage: 75,
          survival: 80,
          control: 82,
          energy: 88,
          mobility: 80,
          scalability: 70
        },
        finalStats: {
          health: 820,
          shields: 1480,
          armor: 135,
          energy: 600,
          sprint: 1.1,
          strength: 130,
          duration: 130,
          efficiency: 130,
          range: 145
        },
        howItWorks: 'Uma montagem básica com 0 Formas investidas que utiliza os mods padrão obtidos no mapa estelar normal (Ceres, Júpiter e Void). Garante sobrevivência confortável com escudos elevados e energia estável.',
        howToPlay: {
          step1: 'Ligue Cathode Grace (3) e Rotorswell (4).',
          step2: 'Use Arcsphere (1) para paralisar grupos de inimigos.',
          step3: 'Atire com armas elétricas para manter o cronômetro das habilidades alto.',
          step4: 'Fácil de operar até o final do Mapa Estelar regular.'
        },
        weapons: [
          {
            type: 'primary',
            name: 'Braton / Boltor',
            subType: 'Rifle Básico',
            why: 'Armas acessíveis no início do jogo.',
            synergyDetails: 'Fáceis de forjar.',
            budgetAlternative: 'Karak'
          },
          {
            type: 'secondary',
            name: 'Lex / Furis',
            subType: 'Pistola Básica',
            why: 'Dano pontual seguro.',
            synergyDetails: 'Baixo custo de fabricação.',
            budgetAlternative: 'Lato'
          },
          {
            type: 'melee',
            name: 'Skana / Dual Skana',
            subType: 'Espada',
            why: 'Combate corpo a corpo básico.',
            synergyDetails: 'Custo mínimo.',
            budgetAlternative: 'Bo'
          }
        ],
        companion: {
          name: 'Taxon',
          type: 'Sentinela Inicial',
          why: 'Recarrega os escudos de Gyre automaticamente com o raio Molecular Conversion.',
          keyAbilities: ['Molecular Conversion', 'Vacuum'],
          budgetAlternative: 'Carrier'
        },
        marketPlatCostEstimate: 20
      }
    ]
  }
];
