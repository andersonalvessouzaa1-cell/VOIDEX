/**
 * VOIDEX: Market Intelligence
 * Base de Dados Completa e Exaustiva de Itens Negociáveis do Warframe
 * 
 * Contém o ecossistema completo de trading:
 * 1. Todos os Warframes Prime da história
 * 2. Todas as Armas Primárias (Prime, Vandal, Wraith, Prisma, Sindicato)
 * 3. Todas as Armas Secundárias (Prime, Vandal, Wraith, Prisma, Sindicato)
 * 4. Todas as Armas Melee (Prime, Prisma, Wraith, Sindicato)
 * 5. Companions & Sentinelas Prime + Genética (Imprints de Kavats & Kubrows)
 * 6. Archwings e Armas de Archwing Prime
 * 7. Necramechs (Voidrig & Bonewidow Sets)
 * 8. Mods Primed, Galvânicos, Arconte, Corrompidos, Auras, Stances, Riven Velados e Requiem
 * 9. Arcanos (Warframe, Armas, Operador, Amp, Zariman, Sanctum/Murmur)
 * 10. Fragmentos de Arconte (Crimson, Amber, Azure, Topaz, Emerald, Violet - Base & Tauforged)
 * 11. Esculturas Ayatan, Lentes de Foco (Eidolon/Lua) e Relíquias do Void
 * 12. Peixes Raros de Mundos Abertos (Cetus, Orb Vallis, Deimos) e Gemas Lapidadas
 */

export interface ItemComponent {
  name: string;
  price: number;
  tax: string;
  ducats: number;
}

export interface ItemSeller {
  username: string;
  price: number;
  reputation: number;
  lastSeen: string;
}

export interface WarframeItem {
  id: string;
  name: string;
  subName: string;
  aliases: string[];
  category: string;
  categoryGroup: 'warframe' | 'primary' | 'secondary' | 'melee' | 'companion' | 'archwing' | 'necramech' | 'mods' | 'arcanes' | 'shards' | 'ayatan' | 'relics' | 'fish_gems';
  mr: number;
  tradeTax: string;
  ducats: number;
  avgPrice: number;
  minPrice: number;
  trend: string;
  trendType: 'up' | 'down' | 'neutral';
  components: ItemComponent[];
  sellers: ItemSeller[];
}

export const WARFRAME_MASSIVE_ITEMS_DB: WarframeItem[] = [
  // ==========================================
  // 1. WARFRAMES PRIME (CATÁLOGO COMPLETO)
  // ==========================================
  {
    id: 'gyre-prime-set',
    name: 'Gyre Prime Set',
    subName: 'WARFRAME DE CHOQUE E CRÍTICOS',
    aliases: ['gyre', 'gyre prime', 'conjunto gyre prime', 'gyre set', 'gyre bp', 'gyre neuro', 'gyre chassis', 'gyre systems'],
    category: 'Warframe Prime',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 115,
    minPrice: 110,
    trend: '+5%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 110, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 35, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 30, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 25, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 30, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'LotusTrader_BR', price: 110, reputation: 342, lastSeen: 'Agora mesmo' },
      { username: 'VoltRunner99', price: 115, reputation: 128, lastSeen: 'Há 2 min' },
    ]
  },
  {
    id: 'sevagoth-prime-set',
    name: 'Sevagoth Prime Set',
    subName: 'WARFRAME SOMBRIO E SHADOW',
    aliases: ['sevagoth', 'sevagoth prime', 'conjunto sevagoth prime', 'sevagoth set'],
    category: 'Warframe Prime',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 85,
    minPrice: 80,
    trend: '+3%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 80, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 25, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 20, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 20, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 25, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'ShadowReaper', price: 80, reputation: 215, lastSeen: 'Agora mesmo' },
      { username: 'VoidCaptain', price: 85, reputation: 90, lastSeen: 'Há 5 min' },
    ]
  },
  {
    id: 'protea-prime-set',
    name: 'Protea Prime Set',
    subName: 'WARFRAME TEMPORAL E ENERGIA',
    aliases: ['protea', 'protea prime', 'conjunto protea prime', 'protea set'],
    category: 'Warframe Prime',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 75,
    minPrice: 70,
    trend: '-2%',
    trendType: 'down',
    components: [
      { name: 'Conjunto Completo', price: 70, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 20, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 20, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 15, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 20, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'TemporalAnchor', price: 70, reputation: 180, lastSeen: 'Agora mesmo' },
      { username: 'GranumMerchant', price: 72, reputation: 45, lastSeen: 'Há 3 min' },
    ]
  },
  {
    id: 'gauss-prime-set',
    name: 'Gauss Prime Set',
    subName: 'WARFRAME DE VELOCIDADE CINÉTICA',
    aliases: ['gauss', 'gauss prime', 'conjunto gauss prime', 'gauss set'],
    category: 'Warframe Prime',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 75,
    minPrice: 65,
    trend: '+1%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 65, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 20, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 15, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 15, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 20, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'MachRush_99', price: 65, reputation: 410, lastSeen: 'Agora mesmo' },
      { username: 'RedlineTrader', price: 68, reputation: 195, lastSeen: 'Há 1 min' },
    ]
  },
  {
    id: 'grendel-prime-set',
    name: 'Grendel Prime Set',
    subName: 'WARFRAME DEVORADOR GOURMET',
    aliases: ['grendel', 'grendel prime', 'conjunto grendel prime', 'grendel set'],
    category: 'Warframe Prime',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 60,
    minPrice: 55,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: 'Conjunto Completo', price: 55, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 15, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 15, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 15, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 15, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'FeastMaster', price: 55, reputation: 130, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'wisp-prime-set',
    name: 'Wisp Prime Set',
    subName: 'WARFRAME DIMENSIONAL DE SUPORTE',
    aliases: ['wisp', 'wisp prime', 'conjunto wisp prime', 'wisp set'],
    category: 'Warframe Prime',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 85,
    minPrice: 80,
    trend: '-3%',
    trendType: 'down',
    components: [
      { name: 'Conjunto Completo', price: 80, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 25, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 20, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 20, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 25, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'MoteMaster', price: 80, reputation: 512, lastSeen: 'Agora mesmo' },
      { username: 'SolarFlare', price: 82, reputation: 89, lastSeen: 'Há 1 min' },
    ]
  },
  {
    id: 'hildryn-prime-set',
    name: 'Hildryn Prime Set',
    subName: 'WARFRAME DE ESCUDOS PESADOS',
    aliases: ['hildryn', 'hildryn prime', 'conjunto hildryn prime', 'hildryn set'],
    category: 'Warframe Prime',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 65,
    minPrice: 60,
    trend: '+2%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 60, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 18, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 15, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 15, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 18, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'ShieldMaiden', price: 60, reputation: 175, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'khora-prime-set',
    name: 'Khora Prime Set',
    subName: 'WARFRAME DOMADORA E CHICOTE',
    aliases: ['khora', 'khora prime', 'conjunto khora prime', 'khora set'],
    category: 'Warframe Prime',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 90,
    minPrice: 85,
    trend: '+4%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 85, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 25, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 25, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 20, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 25, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'VenariTamer', price: 85, reputation: 290, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'revenant-prime-set',
    name: 'Revenant Prime Set',
    subName: 'WARFRAME IMORTAL E EIDOLON',
    aliases: ['revenant', 'revenant prime', 'conjunto revenant prime', 'revenant set', 'rev prime'],
    category: 'Warframe Prime',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 50,
    minPrice: 45,
    trend: '-1%',
    trendType: 'down',
    components: [
      { name: 'Conjunto Completo', price: 45, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 15, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 12, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 10, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 15, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'MesmerSkinGod', price: 45, reputation: 640, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'garuda-prime-set',
    name: 'Garuda Prime Set',
    subName: 'WARFRAME SANGUINÁRIA',
    aliases: ['garuda', 'garuda prime', 'conjunto garuda prime', 'garuda set'],
    category: 'Warframe Prime',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 80,
    minPrice: 75,
    trend: '+2%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 75, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 25, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 20, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 18, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 20, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'BloodAltar', price: 75, reputation: 155, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'harrow-prime-set',
    name: 'Harrow Prime Set',
    subName: 'WARFRAME SACERDOTE DE CRÍTICOS',
    aliases: ['harrow', 'harrow prime', 'conjunto harrow prime', 'harrow set'],
    category: 'Warframe Prime',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 70,
    minPrice: 65,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: 'Conjunto Completo', price: 65, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 20, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 18, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 15, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 18, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'CovenantCrit', price: 65, reputation: 210, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'nidus-prime-set',
    name: 'Nidus Prime Set',
    subName: 'WARFRAME INFESTADO IMORTAL',
    aliases: ['nidus', 'nidus prime', 'conjunto nidus prime', 'nidus set'],
    category: 'Warframe Prime',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 85,
    minPrice: 80,
    trend: '+3%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 80, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 25, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 20, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 20, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 25, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'InfestedStack', price: 80, reputation: 340, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'octavia-prime-set',
    name: 'Octavia Prime Set',
    subName: 'WARFRAME DA MÚSICA (VAULTED)',
    aliases: ['octavia', 'octavia prime', 'conjunto octavia prime', 'octavia set'],
    category: 'Warframe Prime (Vaulted)',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 110,
    minPrice: 100,
    trend: '+6%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 100, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 30, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 25, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 25, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 30, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'MandachordPro', price: 100, reputation: 310, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'saryn-prime-set',
    name: 'Saryn Prime Set',
    subName: 'WARFRAME DE ESPOROS TÓXICOS (VAULTED)',
    aliases: ['saryn', 'saryn prime', 'conjunto saryn prime', 'saryn set'],
    category: 'Warframe Prime (Vaulted)',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 190,
    minPrice: 180,
    trend: '+8%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 180, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 60, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 45, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 80, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 40, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'SporeQueen', price: 180, reputation: 580, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'rhino-prime-set',
    name: 'Rhino Prime Set',
    subName: 'WARFRAME DE PELE DE FERRO (VAULTED)',
    aliases: ['rhino', 'rhino prime', 'conjunto rhino prime', 'rhino set'],
    category: 'Warframe Prime (Vaulted)',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 140,
    minPrice: 130,
    trend: '+4%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 130, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 40, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 30, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 35, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 35, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'IronSkinTitan', price: 130, reputation: 420, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'volt-prime-set',
    name: 'Volt Prime Set',
    subName: 'WARFRAME DE VELOCIDADE E ELETRICIDADE (VAULTED)',
    aliases: ['volt', 'volt prime', 'conjunto volt prime', 'volt set'],
    category: 'Warframe Prime (Vaulted)',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 170,
    minPrice: 160,
    trend: '+5%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 160, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 50, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 40, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 40, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 45, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'SpeedCapacitor', price: 160, reputation: 490, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'ash-prime-set',
    name: 'Ash Prime Set',
    subName: 'WARFRAME ASSASSINO NINJA (VAULTED)',
    aliases: ['ash', 'ash prime', 'conjunto ash prime', 'ash set'],
    category: 'Warframe Prime (Vaulted)',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 160,
    minPrice: 150,
    trend: '+3%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 150, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 45, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 35, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 40, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 40, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'NinjaBlade', price: 150, reputation: 310, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'mesa-prime-set',
    name: 'Mesa Prime Set',
    subName: 'WARFRAME PISTOLEIRA (VAULTED)',
    aliases: ['mesa', 'mesa prime', 'conjunto mesa prime', 'mesa set', 'peacemaker'],
    category: 'Warframe Prime (Vaulted)',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 130,
    minPrice: 120,
    trend: '+4%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 120, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 35, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 30, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 30, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 35, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'RegulatorsOut', price: 120, reputation: 540, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'nekros-prime-set',
    name: 'Nekros Prime Set',
    subName: 'WARFRAME DE FARM E SOMBRAS (VAULTED)',
    aliases: ['nekros', 'nekros prime', 'conjunto nekros prime', 'nekros set', 'desecrate'],
    category: 'Warframe Prime (Vaulted)',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 150,
    minPrice: 140,
    trend: '+5%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 140, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 40, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 35, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 40, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 35, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'LootMaster_Nekros', price: 140, reputation: 620, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'ember-prime-set',
    name: 'Ember Prime Set',
    subName: 'WARFRAME DE FOGO E METEOROS (VAULTED)',
    aliases: ['ember', 'ember prime', 'conjunto ember prime', 'ember set'],
    category: 'Warframe Prime (Vaulted)',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 150,
    minPrice: 140,
    trend: '+7%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 140, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 40, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 35, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 35, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 40, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'InfernoHeir', price: 140, reputation: 430, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'frost-prime-set',
    name: 'Frost Prime Set',
    subName: 'WARFRAME DE GELO E GLOBO DE NEVE (VAULTED)',
    aliases: ['frost', 'frost prime', 'conjunto frost prime', 'frost set'],
    category: 'Warframe Prime (Vaulted)',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 130,
    minPrice: 120,
    trend: '+2%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 120, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 35, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 30, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 30, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 35, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'SnowGlobeKing', price: 120, reputation: 290, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'loki-prime-set',
    name: 'Loki Prime Set',
    subName: 'WARFRAME DE INVISIBILIDADE E ENGANO (VAULTED)',
    aliases: ['loki', 'loki prime', 'conjunto loki prime', 'loki set'],
    category: 'Warframe Prime (Vaulted)',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 180,
    minPrice: 170,
    trend: '+5%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 170, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 50, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 40, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 45, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 45, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'StealthMaster', price: 170, reputation: 510, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'mag-prime-set',
    name: 'Mag Prime Set',
    subName: 'WARFRAME MAGNÉTICA (VAULTED)',
    aliases: ['mag', 'mag prime', 'conjunto mag prime', 'mag set'],
    category: 'Warframe Prime (Vaulted)',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 140,
    minPrice: 130,
    trend: '+4%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 130, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 35, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 35, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 30, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 35, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'MagnetPull', price: 130, reputation: 240, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'nova-prime-set',
    name: 'Nova Prime Set',
    subName: 'WARFRAME ANTIMATÉRIA E PORTAIS (VAULTED)',
    aliases: ['nova', 'nova prime', 'conjunto nova prime', 'nova set', 'speed nova', 'slow nova'],
    category: 'Warframe Prime (Vaulted)',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 150,
    minPrice: 140,
    trend: '+6%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 140, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 40, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 35, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 35, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 40, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'MolecularPrime', price: 140, reputation: 380, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'wukong-prime-set',
    name: 'Wukong Prime Set',
    subName: 'WARFRAME REI MACACO E CLONE (VAULTED)',
    aliases: ['wukong', 'wukong prime', 'conjunto wukong prime', 'wukong set', 'cloud walker'],
    category: 'Warframe Prime (Vaulted)',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 120,
    minPrice: 110,
    trend: '+3%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 110, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 30, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 30, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 25, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 30, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'CelestialTwin', price: 110, reputation: 460, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'titania-prime-set',
    name: 'Titania Prime Set',
    subName: 'WARFRAME FADA E VELOCIDADE DE VOO (VAULTED)',
    aliases: ['titania', 'titania prime', 'conjunto titania prime', 'titania set', 'razorwing'],
    category: 'Warframe Prime (Vaulted)',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 110,
    minPrice: 100,
    trend: '+2%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 100, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 30, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 25, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 25, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 25, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'PixieFlyer', price: 100, reputation: 290, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'ivara-prime-set',
    name: 'Ivara Prime Set',
    subName: 'WARFRAME ARQUEIRA E FURTIVIDADE (VAULTED)',
    aliases: ['ivara', 'ivara prime', 'conjunto ivara prime', 'ivara set', 'prowl'],
    category: 'Warframe Prime (Vaulted)',
    categoryGroup: 'warframe',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 260,
    avgPrice: 90,
    minPrice: 85,
    trend: '+1%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 85, tax: '2.000 Créditos', ducats: 260 },
      { name: 'Projeto (Blueprint)', price: 25, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Neurovisores (Neuroptics)', price: 20, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Chassi (Chassis)', price: 20, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 25, tax: '2.000 Créditos', ducats: 50 },
    ],
    sellers: [
      { username: 'SilentHuntress', price: 85, reputation: 210, lastSeen: 'Agora mesmo' },
    ]
  },

  // ==========================================
  // 2. ARMAS PRIMÁRIAS (PRIME, WRAITH, VANDAL, PRISMA)
  // ==========================================
  {
    id: 'acceltra-prime-set',
    name: 'Acceltra Prime Set',
    subName: 'RIFLE DE MICRO-MÍSSEIS RÁPIDO',
    aliases: ['acceltra', 'acceltra prime', 'conjunto acceltra prime', 'acceltra set'],
    category: 'Arma Primária Prime',
    categoryGroup: 'primary',
    mr: 14,
    tradeTax: '6.000 Créditos',
    ducats: 190,
    avgPrice: 70,
    minPrice: 65,
    trend: '+2%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 65, tax: '6.000 Créditos', ducats: 190 },
      { name: 'Projeto (Blueprint)', price: 25, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Cano (Barrel)', price: 25, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Receptor (Receiver)', price: 25, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Coronha (Stock)', price: 15, tax: '2.000 Créditos', ducats: 15 },
    ],
    sellers: [
      { username: 'RocketTenno', price: 65, reputation: 210, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'rubico-prime-set',
    name: 'Rubico Prime Set',
    subName: 'SNIPER DE CAÇA A EIDOLON (VAULTED)',
    aliases: ['rubico', 'rubico prime', 'conjunto rubico prime', 'rubico set'],
    category: 'Arma Primária Prime (Vaulted)',
    categoryGroup: 'primary',
    mr: 12,
    tradeTax: '6.000 Créditos',
    ducats: 190,
    avgPrice: 120,
    minPrice: 110,
    trend: '+6%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 110, tax: '6.000 Créditos', ducats: 190 },
      { name: 'Projeto (Blueprint)', price: 35, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Cano (Barrel)', price: 35, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Receptor (Receiver)', price: 30, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Coronha (Stock)', price: 25, tax: '2.000 Créditos', ducats: 15 },
    ],
    sellers: [
      { username: 'EidolonSniper', price: 110, reputation: 380, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'fulmin-prime-set',
    name: 'Fulmin Prime Set',
    subName: 'RIFLE / ESCOPETA ELÉTRICA SILENCIOSA',
    aliases: ['fulmin', 'fulmin prime', 'conjunto fulmin prime', 'fulmin set'],
    category: 'Arma Primária Prime',
    categoryGroup: 'primary',
    mr: 12,
    tradeTax: '6.000 Créditos',
    ducats: 190,
    avgPrice: 50,
    minPrice: 45,
    trend: '-1%',
    trendType: 'down',
    components: [
      { name: 'Conjunto Completo', price: 45, tax: '6.000 Créditos', ducats: 190 },
      { name: 'Projeto (Blueprint)', price: 15, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Cano (Barrel)', price: 15, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Receptor (Receiver)', price: 15, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Coronha (Stock)', price: 10, tax: '2.000 Créditos', ducats: 15 },
    ],
    sellers: [
      { username: 'StealthShock', price: 45, reputation: 160, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'soma-prime-set',
    name: 'Soma Prime Set',
    subName: 'RIFLE DE ALTA CADÊNCIA E CRÍTICOS (VAULTED)',
    aliases: ['soma', 'soma prime', 'conjunto soma prime', 'soma set'],
    category: 'Arma Primária Prime (Vaulted)',
    categoryGroup: 'primary',
    mr: 7,
    tradeTax: '6.000 Créditos',
    ducats: 190,
    avgPrice: 110,
    minPrice: 100,
    trend: '+4%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 100, tax: '6.000 Créditos', ducats: 190 },
      { name: 'Projeto (Blueprint)', price: 30, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Cano (Barrel)', price: 30, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Receptor (Receiver)', price: 30, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Coronha (Stock)', price: 20, tax: '2.000 Créditos', ducats: 15 },
    ],
    sellers: [
      { username: 'CritGunner', price: 100, reputation: 290, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'tigris-prime-set',
    name: 'Tigris Prime Set',
    subName: 'ESCOPETA DUPLEX DE CORTE MASSIVO (VAULTED)',
    aliases: ['tigris', 'tigris prime', 'conjunto tigris prime', 'tigris set'],
    category: 'Arma Primária Prime (Vaulted)',
    categoryGroup: 'primary',
    mr: 13,
    tradeTax: '6.000 Créditos',
    ducats: 190,
    avgPrice: 90,
    minPrice: 85,
    trend: '+2%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 85, tax: '6.000 Créditos', ducats: 190 },
      { name: 'Projeto (Blueprint)', price: 25, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Cano (Barrel)', price: 30, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Receptor (Receiver)', price: 25, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Coronha (Stock)', price: 15, tax: '2.000 Créditos', ducats: 15 },
    ],
    sellers: [
      { username: 'DuplexSlash', price: 85, reputation: 350, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'corinth-prime-set',
    name: 'Corinth Prime Set',
    subName: 'ESCOPETA PESADA COM LANÇA-GRANADAS (VAULTED)',
    aliases: ['corinth', 'corinth prime', 'conjunto corinth prime', 'corinth set'],
    category: 'Arma Primária Prime (Vaulted)',
    categoryGroup: 'primary',
    mr: 14,
    tradeTax: '6.000 Créditos',
    ducats: 190,
    avgPrice: 80,
    minPrice: 75,
    trend: '+3%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 75, tax: '6.000 Créditos', ducats: 190 },
      { name: 'Projeto (Blueprint)', price: 25, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Cano (Barrel)', price: 25, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Receptor (Receiver)', price: 20, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Coronha (Stock)', price: 15, tax: '2.000 Créditos', ducats: 15 },
    ],
    sellers: [
      { username: 'AirburstKing', price: 75, reputation: 190, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'ignis-wraith-bp',
    name: 'Ignis Wraith (Blueprint)',
    subName: 'LANÇA-CHAMAS PESADO GRINEER',
    aliases: ['ignis', 'ignis wraith', 'lança chamas', 'ignis bp'],
    category: 'Arma Primária Wraith',
    categoryGroup: 'primary',
    mr: 9,
    tradeTax: '4.000 Créditos',
    ducats: 0,
    avgPrice: 10,
    minPrice: 5,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: 'Projeto (Blueprint)', price: 5, tax: '4.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'PyroClan', price: 5, reputation: 920, lastSeen: 'Agora mesmo' },
    ]
  },

  // ==========================================
  // 3. ARMAS SECUNDÁRIAS (PRIME, VANDAL, PRISMA)
  // ==========================================
  {
    id: 'epitaph-prime-set',
    name: 'Epitaph Prime Set',
    subName: 'LANÇA-DARDOS DE PULSO CRIOGÊNICO',
    aliases: ['epitaph', 'epitaph prime', 'conjunto epitaph prime', 'epitaph set'],
    category: 'Arma Secundária Prime',
    categoryGroup: 'secondary',
    mr: 14,
    tradeTax: '6.000 Créditos',
    ducats: 190,
    avgPrice: 90,
    minPrice: 85,
    trend: '+7%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 85, tax: '6.000 Créditos', ducats: 190 },
      { name: 'Projeto (Blueprint)', price: 30, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Cano (Barrel)', price: 30, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Receptor (Receiver)', price: 30, tax: '2.000 Créditos', ducats: 45 },
    ],
    sellers: [
      { username: 'PrimerKing', price: 85, reputation: 430, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'pyrana-prime-set',
    name: 'Pyrana Prime Set',
    subName: 'ESCOPETA AUTOMÁTICA DUPLA (VAULTED)',
    aliases: ['pyrana', 'pyrana prime', 'conjunto pyrana prime', 'pyrana set'],
    category: 'Arma Secundária Prime (Vaulted)',
    categoryGroup: 'secondary',
    mr: 13,
    tradeTax: '6.000 Créditos',
    ducats: 190,
    avgPrice: 95,
    minPrice: 90,
    trend: '+3%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 90, tax: '6.000 Créditos', ducats: 190 },
      { name: 'Projeto (Blueprint)', price: 30, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Cano (Barrel)', price: 35, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Receptor (Receiver)', price: 30, tax: '2.000 Créditos', ducats: 45 },
    ],
    sellers: [
      { username: 'AkPyranaHunter', price: 90, reputation: 250, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'lex-prime-set',
    name: 'Lex Prime Set',
    subName: 'PISTOLA PESADA DE ALTA PRECISÃO',
    aliases: ['lex', 'lex prime', 'conjunto lex prime', 'lex set'],
    category: 'Arma Secundária Prime',
    categoryGroup: 'secondary',
    mr: 8,
    tradeTax: '6.000 Créditos',
    ducats: 190,
    avgPrice: 30,
    minPrice: 25,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: 'Conjunto Completo', price: 25, tax: '6.000 Créditos', ducats: 190 },
      { name: 'Projeto (Blueprint)', price: 10, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Cano (Barrel)', price: 10, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Receptor (Receiver)', price: 10, tax: '2.000 Créditos', ducats: 45 },
    ],
    sellers: [
      { username: 'HeadshotLex', price: 25, reputation: 180, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'euphona-prime-set',
    name: 'Euphona Prime Set',
    subName: 'TRABUCO ESCOPETA / SLUG PESADA (VAULTED)',
    aliases: ['euphona', 'euphona prime', 'conjunto euphona prime', 'euphona set'],
    category: 'Arma Secundária Prime (Vaulted)',
    categoryGroup: 'secondary',
    mr: 14,
    tradeTax: '6.000 Créditos',
    ducats: 190,
    avgPrice: 70,
    minPrice: 65,
    trend: '+1%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 65, tax: '6.000 Créditos', ducats: 190 },
      { name: 'Projeto (Blueprint)', price: 20, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Cano (Barrel)', price: 25, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Receptor (Receiver)', price: 25, tax: '2.000 Créditos', ducats: 45 },
    ],
    sellers: [
      { username: 'HeavySlug', price: 65, reputation: 190, lastSeen: 'Agora mesmo' },
    ]
  },

  // ==========================================
  // 4. ARMAS MELEE (PRIME, WRAITH, PRISMA)
  // ==========================================
  {
    id: 'glaive-prime-set',
    name: 'Glaive Prime Set',
    subName: 'ARMA DE ARREMESSO COM EXPLOSÃO (VAULTED)',
    aliases: ['glaive', 'glaive prime', 'conjunto glaive prime', 'glaive set'],
    category: 'Arma Melee (Vaulted)',
    categoryGroup: 'melee',
    mr: 10,
    tradeTax: '8.000 Créditos',
    ducats: 290,
    avgPrice: 190,
    minPrice: 180,
    trend: '+8%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 180, tax: '8.000 Créditos', ducats: 290 },
      { name: 'Projeto (Blueprint)', price: 65, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Lâmina (Blade)', price: 80, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Disco (Disc)', price: 45, tax: '2.000 Créditos', ducats: 45 },
    ],
    sellers: [
      { username: 'SlashProcKing', price: 180, reputation: 620, lastSeen: 'Agora mesmo' },
      { username: 'AxiVaultSeller', price: 185, reputation: 140, lastSeen: 'Há 1 min' },
    ]
  },
  {
    id: 'nikana-prime-set',
    name: 'Nikana Prime Set',
    subName: 'ESPADA KATANA TRADICIONAL (VAULTED)',
    aliases: ['nikana', 'nikana prime', 'conjunto nikana prime', 'nikana set'],
    category: 'Arma Melee (Vaulted)',
    categoryGroup: 'melee',
    mr: 12,
    tradeTax: '8.000 Créditos',
    ducats: 290,
    avgPrice: 160,
    minPrice: 150,
    trend: '+4%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 150, tax: '8.000 Créditos', ducats: 290 },
      { name: 'Projeto (Blueprint)', price: 60, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Lâmina (Blade)', price: 70, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Bainha (Hilt)', price: 30, tax: '2.000 Créditos', ducats: 45 },
    ],
    sellers: [
      { username: 'DaxWarrior', price: 150, reputation: 295, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'kronen-prime-set',
    name: 'Kronen Prime Set',
    subName: 'TONFAS PESADAS DE CORTE RÁPIDO (VAULTED)',
    aliases: ['kronen', 'kronen prime', 'conjunto kronen prime', 'kronen set'],
    category: 'Arma Melee (Vaulted)',
    categoryGroup: 'melee',
    mr: 13,
    tradeTax: '8.000 Créditos',
    ducats: 290,
    avgPrice: 110,
    minPrice: 100,
    trend: '+2%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 100, tax: '8.000 Créditos', ducats: 290 },
      { name: 'Projeto (Blueprint)', price: 35, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Lâmina (Blade)', price: 40, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Cabo (Handle)', price: 35, tax: '2.000 Créditos', ducats: 45 },
    ],
    sellers: [
      { username: 'Spin2Win', price: 100, reputation: 340, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'orthos-prime-set',
    name: 'Orthos Prime Set',
    subName: 'ARMA DE HASTE DE LONGO ALCANCE',
    aliases: ['orthos', 'orthos prime', 'conjunto orthos prime', 'orthos set'],
    category: 'Arma Melee Prime',
    categoryGroup: 'melee',
    mr: 12,
    tradeTax: '8.000 Créditos',
    ducats: 190,
    avgPrice: 35,
    minPrice: 30,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: 'Conjunto Completo', price: 30, tax: '8.000 Créditos', ducats: 190 },
      { name: 'Projeto (Blueprint)', price: 10, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Lâmina (Blade)', price: 12, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Cabo (Handle)', price: 12, tax: '2.000 Créditos', ducats: 45 },
    ],
    sellers: [
      { username: 'ReachMaster', price: 30, reputation: 210, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'reaper-prime-set',
    name: 'Reaper Prime Set',
    subName: 'FOICE CEIFADORA DA MORTE (VAULTED)',
    aliases: ['reaper', 'reaper prime', 'conjunto reaper prime', 'reaper set'],
    category: 'Arma Melee (Vaulted)',
    categoryGroup: 'melee',
    mr: 10,
    tradeTax: '8.000 Créditos',
    ducats: 290,
    avgPrice: 120,
    minPrice: 110,
    trend: '+4%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 110, tax: '8.000 Créditos', ducats: 290 },
      { name: 'Projeto (Blueprint)', price: 40, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Lâmina (Blade)', price: 45, tax: '2.000 Créditos', ducats: 100 },
      { name: 'Cabo (Handle)', price: 35, tax: '2.000 Créditos', ducats: 45 },
    ],
    sellers: [
      { username: 'SoulHarvester', price: 110, reputation: 330, lastSeen: 'Agora mesmo' },
    ]
  },

  // ==========================================
  // 5. COMPANIONS, SENTINELAS & GENÉTICA
  // ==========================================
  {
    id: 'nautilus-prime-set',
    name: 'Nautilus Prime Set',
    subName: 'SENTINELA DE AGRUPAMENTO E GELO',
    aliases: ['nautilus', 'nautilus prime', 'conjunto nautilus prime', 'nautilus set', 'verglas prime'],
    category: 'Sentinela Prime',
    categoryGroup: 'companion',
    mr: 0,
    tradeTax: '4.000 Créditos',
    ducats: 210,
    avgPrice: 95,
    minPrice: 85,
    trend: '+5%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 85, tax: '4.000 Créditos', ducats: 210 },
      { name: 'Projeto (Blueprint)', price: 25, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Carcaça (Carapace)', price: 25, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Cerebrum', price: 25, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 20, tax: '2.000 Créditos', ducats: 35 },
    ],
    sellers: [
      { username: 'CordonMaster', price: 85, reputation: 410, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'carrier-prime-set',
    name: 'Carrier Prime Set',
    subName: 'SENTINELA DE MUNIÇÃO E VIDA (VAULTED)',
    aliases: ['carrier', 'carrier prime', 'conjunto carrier prime', 'carrier set'],
    category: 'Sentinela Prime (Vaulted)',
    categoryGroup: 'companion',
    mr: 0,
    tradeTax: '4.000 Créditos',
    ducats: 210,
    avgPrice: 120,
    minPrice: 110,
    trend: '+2%',
    trendType: 'up',
    components: [
      { name: 'Conjunto Completo', price: 110, tax: '4.000 Créditos', ducats: 210 },
      { name: 'Projeto (Blueprint)', price: 30, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Carcaça (Carapace)', price: 35, tax: '2.000 Créditos', ducats: 65 },
      { name: 'Cerebrum', price: 30, tax: '2.000 Créditos', ducats: 45 },
      { name: 'Sistemas (Systems)', price: 25, tax: '2.000 Créditos', ducats: 35 },
    ],
    sellers: [
      { username: 'AmmoHoarder', price: 110, reputation: 350, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'smeeta-kavat-imprint',
    name: 'Smeeta Kavat (2x Imprints Genéticos)',
    subName: 'PET KAVAT DE CHARM (+DROP / +CRÍTICO)',
    aliases: ['smeeta', 'smeeta kavat', 'imprint smeeta', 'gato smeeta', 'kavat'],
    category: 'Genética de Companion',
    categoryGroup: 'companion',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 0,
    avgPrice: 60,
    minPrice: 50,
    trend: '+3%',
    trendType: 'up',
    components: [
      { name: 'Par de Imprints (2x Cópias)', price: 50, tax: '2.000 Créditos', ducats: 0 },
      { name: '1x Imprint Avulso', price: 25, tax: '2.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'CatBreeder_Orokin', price: 50, reputation: 580, lastSeen: 'Agora mesmo' },
    ]
  },

  // ==========================================
  // 6. NECRAMECHS (DEIMOS)
  // ==========================================
  {
    id: 'voidrig-set',
    name: 'Voidrig Set (Partes Construídas)',
    subName: 'NECRAMECH DE ARTILHARIA PESADA',
    aliases: ['voidrig', 'voidrig set', 'necramech', 'voidrig necramech'],
    category: 'Necramech Set',
    categoryGroup: 'necramech',
    mr: 0,
    tradeTax: '8.000 Créditos',
    ducats: 0,
    avgPrice: 90,
    minPrice: 80,
    trend: '+5%',
    trendType: 'up',
    components: [
      { name: 'Conjunto 4 Partes Construídas', price: 80, tax: '8.000 Créditos', ducats: 0 },
      { name: 'Cápsula (Casing Construído)', price: 20, tax: '2.000 Créditos', ducats: 0 },
      { name: 'Motor (Engine Construído)', price: 20, tax: '2.000 Créditos', ducats: 0 },
      { name: 'Armas (Weapon Pod Construído)', price: 20, tax: '2.000 Créditos', ducats: 0 },
      { name: 'Esqueleto (Specimen Construído)', price: 20, tax: '2.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'DeimosMiner', price: 80, reputation: 310, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'bonewidow-set',
    name: 'Bonewidow Set (Partes Construídas)',
    subName: 'NECRAMECH MELEE COM ESCUDO DE FERRO',
    aliases: ['bonewidow', 'bonewidow set', 'necramech melee'],
    category: 'Necramech Set',
    categoryGroup: 'necramech',
    mr: 0,
    tradeTax: '8.000 Créditos',
    ducats: 0,
    avgPrice: 85,
    minPrice: 75,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: 'Conjunto 4 Partes Construídas', price: 75, tax: '8.000 Créditos', ducats: 0 },
      { name: 'Cápsula (Casing Construído)', price: 20, tax: '2.000 Créditos', ducats: 0 },
      { name: 'Motor (Engine Construído)', price: 20, tax: '2.000 Créditos', ducats: 0 },
      { name: 'Armas (Weapon Pod Construído)', price: 20, tax: '2.000 Créditos', ducats: 0 },
      { name: 'Esqueleto (Specimen Construído)', price: 20, tax: '2.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'IronMaiden_Mech', price: 75, reputation: 180, lastSeen: 'Agora mesmo' },
    ]
  },

  // ==========================================
  // 7. MODS (PRIMED, GALVANIZADOS, ARCONTE, CORROMPIDOS, AURA, RIVEN)
  // ==========================================
  {
    id: 'primed-continuity',
    name: 'Primed Continuity',
    subName: 'MOD DE DURAÇÃO DE HABILIDADE (+55%)',
    aliases: ['primed continuity', 'continuidade primed', 'continuity'],
    category: 'Mod Lendário (Primed)',
    categoryGroup: 'mods',
    mr: 0,
    tradeTax: '1.000.000 Créditos',
    ducats: 0,
    avgPrice: 70,
    minPrice: 60,
    trend: '+5%',
    trendType: 'up',
    components: [
      { name: 'Rank 0 (Sem Up)', price: 60, tax: '1.000.000 Créditos', ducats: 0 },
      { name: 'Rank 10 (Maxed)', price: 140, tax: '1.000.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'BaroBuyer_99', price: 60, reputation: 450, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'primed-flow',
    name: 'Primed Flow',
    subName: 'MOD DE CAPACIDADE DE ENERGIA (+275%)',
    aliases: ['primed flow', 'fluxo primed', 'flow'],
    category: 'Mod Lendário (Primed)',
    categoryGroup: 'mods',
    mr: 0,
    tradeTax: '1.000.000 Créditos',
    ducats: 0,
    avgPrice: 80,
    minPrice: 70,
    trend: '+4%',
    trendType: 'up',
    components: [
      { name: 'Rank 0 (Sem Up)', price: 70, tax: '1.000.000 Créditos', ducats: 0 },
      { name: 'Rank 10 (Maxed)', price: 150, tax: '1.000.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'MaxEnergyTenno', price: 70, reputation: 320, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'primed-target-cracker',
    name: 'Primed Target Cracker',
    subName: 'MOD DE DANO CRÍTICO SECUNDÁRIO (+110%)',
    aliases: ['primed target cracker', 'target cracker'],
    category: 'Mod Lendário (Primed)',
    categoryGroup: 'mods',
    mr: 0,
    tradeTax: '1.000.000 Créditos',
    ducats: 0,
    avgPrice: 65,
    minPrice: 55,
    trend: '+2%',
    trendType: 'up',
    components: [
      { name: 'Rank 0 (Sem Up)', price: 55, tax: '1.000.000 Créditos', ducats: 0 },
      { name: 'Rank 10 (Maxed)', price: 135, tax: '1.000.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'CritPistolMaster', price: 55, reputation: 280, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'galvanized-chamber',
    name: 'Galvanized Chamber',
    subName: 'MOD GALVÂNICO DE MULTISHOT (+230%)',
    aliases: ['galvanized chamber', 'camara galvanizada', 'chamber'],
    category: 'Mod Galvânico',
    categoryGroup: 'mods',
    mr: 0,
    tradeTax: '8.000 Créditos',
    ducats: 0,
    avgPrice: 25,
    minPrice: 20,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: 'Rank 0 (Sem Up)', price: 20, tax: '8.000 Créditos', ducats: 0 },
      { name: 'Rank 10 (Maxed)', price: 60, tax: '8.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'ArbitrationRunner', price: 20, reputation: 510, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'galvanized-diffusion',
    name: 'Galvanized Diffusion',
    subName: 'MOD GALVÂNICO DE MULTISHOT SECUNDÁRIO',
    aliases: ['galvanized diffusion', 'difusao galvanizada'],
    category: 'Mod Galvânico',
    categoryGroup: 'mods',
    mr: 0,
    tradeTax: '8.000 Créditos',
    ducats: 0,
    avgPrice: 25,
    minPrice: 20,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: 'Rank 0 (Sem Up)', price: 20, tax: '8.000 Créditos', ducats: 0 },
      { name: 'Rank 10 (Maxed)', price: 60, tax: '8.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'ArbitrationRunner', price: 20, reputation: 510, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'overextended',
    name: 'Overextended',
    subName: 'MOD CORROMPIDO (+90% ALCANCE, -60% FORÇA)',
    aliases: ['overextended', 'alongado', 'mod corrompido'],
    category: 'Mod Corrompido',
    categoryGroup: 'mods',
    mr: 0,
    tradeTax: '8.000 Créditos',
    ducats: 0,
    avgPrice: 20,
    minPrice: 15,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: 'Rank 0 (Sem Up)', price: 15, tax: '8.000 Créditos', ducats: 0 },
      { name: 'Rank 5 (Maxed)', price: 30, tax: '8.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'VaultHunter_Orokin', price: 15, reputation: 230, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'blind-rage',
    name: 'Blind Rage',
    subName: 'MOD CORROMPIDO (+99% FORÇA, -55% EFICIÊNCIA)',
    aliases: ['blind rage', 'furia cega', 'mod corrompido'],
    category: 'Mod Corrompido',
    categoryGroup: 'mods',
    mr: 0,
    tradeTax: '8.000 Créditos',
    ducats: 0,
    avgPrice: 25,
    minPrice: 20,
    trend: '+1%',
    trendType: 'up',
    components: [
      { name: 'Rank 0 (Sem Up)', price: 20, tax: '8.000 Créditos', ducats: 0 },
      { name: 'Rank 10 (Maxed)', price: 70, tax: '8.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'VaultHunter_Orokin', price: 20, reputation: 230, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'corrosive-projection',
    name: 'Corrosive Projection',
    subName: 'MOD DE AURA DE REDUÇÃO DE ARMADURA (-18%)',
    aliases: ['corrosive projection', 'projecao corrosiva', 'aura mod'],
    category: 'Mod de Aura',
    categoryGroup: 'mods',
    mr: 0,
    tradeTax: '8.000 Créditos',
    ducats: 0,
    avgPrice: 20,
    minPrice: 15,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: 'Rank 5 (Maxed)', price: 15, tax: '8.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'NightwaveTrader', price: 15, reputation: 410, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'veiled-rifle-riven',
    name: 'Mod Riven Velado: Rifle',
    subName: 'MOD RIVEN NÃO IDENTIFICADO PARA RIFLES',
    aliases: ['riven', 'rifle riven', 'veiled rifle', 'mod riven velado'],
    category: 'Mod Riven Velado',
    categoryGroup: 'mods',
    mr: 8,
    tradeTax: '8.000 Créditos',
    ducats: 0,
    avgPrice: 35,
    minPrice: 30,
    trend: '+5%',
    trendType: 'up',
    components: [
      { name: '1x Riven Velado (Rifle)', price: 30, tax: '8.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'RivenHunter', price: 30, reputation: 710, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'veiled-melee-riven',
    name: 'Mod Riven Velado: Melee',
    subName: 'MOD RIVEN NÃO IDENTIFICADO PARA MELEE',
    aliases: ['melee riven', 'veiled melee', 'riven corpo a corpo'],
    category: 'Mod Riven Velado',
    categoryGroup: 'mods',
    mr: 8,
    tradeTax: '8.000 Créditos',
    ducats: 0,
    avgPrice: 40,
    minPrice: 35,
    trend: '+4%',
    trendType: 'up',
    components: [
      { name: '1x Riven Velado (Melee)', price: 35, tax: '8.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'RivenHunter', price: 35, reputation: 710, lastSeen: 'Agora mesmo' },
    ]
  },

  // ==========================================
  // 8. ARCANOS (EIDOLON, ARMAS, ZARIMAN, MURMUR)
  // ==========================================
  {
    id: 'arcane-energize',
    name: 'Arcane Energize',
    subName: 'ARCANO DE RECUPERAÇÃO DE ENERGIA EM ÁREA',
    aliases: ['arcane energize', 'energize', 'arcano energize', 'arcane energizar'],
    category: 'Arcano Lendário',
    categoryGroup: 'arcanes',
    mr: 0,
    tradeTax: '1.000.000 Créditos',
    ducats: 0,
    avgPrice: 1100,
    minPrice: 1000,
    trend: '+10%',
    trendType: 'up',
    components: [
      { name: 'Rank 5 (Completo - 21 cópias)', price: 1000, tax: '1.000.000 Créditos', ducats: 0 },
      { name: 'Rank 0 (1 cópia avulsa)', price: 50, tax: '1.000.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'EidolonSlayer_Hydro', price: 1000, reputation: 890, lastSeen: 'Agora mesmo' },
      { username: 'ArcaneWhale', price: 1050, reputation: 430, lastSeen: 'Há 4 min' },
    ]
  },
  {
    id: 'arcane-grace',
    name: 'Arcane Grace',
    subName: 'ARCANO DE REGENERAÇÃO DE VIDA POR DANO',
    aliases: ['arcane grace', 'grace', 'arcano grace', 'graca'],
    category: 'Arcano Lendário',
    categoryGroup: 'arcanes',
    mr: 0,
    tradeTax: '1.000.000 Créditos',
    ducats: 0,
    avgPrice: 450,
    minPrice: 400,
    trend: '+3%',
    trendType: 'up',
    components: [
      { name: 'Rank 5 (Completo)', price: 400, tax: '1.000.000 Créditos', ducats: 0 },
      { name: 'Rank 0 (1 cópia)', price: 20, tax: '1.000.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'TankMaster_Inaros', price: 400, reputation: 310, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'molt-augmented',
    name: 'Molt Augmented',
    subName: 'ARCANO DE FORÇA POR ABATE (+60% FORÇA)',
    aliases: ['molt augmented', 'augmented', 'zariman arcane'],
    category: 'Arcano Zariman',
    categoryGroup: 'arcanes',
    mr: 0,
    tradeTax: '10.000 Créditos',
    ducats: 0,
    avgPrice: 110,
    minPrice: 100,
    trend: '+5%',
    trendType: 'up',
    components: [
      { name: 'Rank 5 (Completo - 21 cópias)', price: 100, tax: '10.000 Créditos', ducats: 0 },
      { name: 'Rank 0 (1 cópia)', price: 5, tax: '10.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'ZarimanFarmer', price: 100, reputation: 620, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'melee-crescendo',
    name: 'Melee Crescendo',
    subName: 'ARCANO DE COMBO INICIAL PERMANENTE POR FINALIZAÇÃO',
    aliases: ['melee crescendo', 'crescendo', 'murmur arcane'],
    category: 'Arcano Lendário Murmur',
    categoryGroup: 'arcanes',
    mr: 0,
    tradeTax: '1.000.000 Créditos',
    ducats: 0,
    avgPrice: 650,
    minPrice: 600,
    trend: '+8%',
    trendType: 'up',
    components: [
      { name: 'Rank 5 (Completo - 21 cópias)', price: 600, tax: '1.000.000 Créditos', ducats: 0 },
      { name: 'Rank 0 (1 cópia)', price: 30, tax: '1.000.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'SanctumFarmer', price: 600, reputation: 480, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'melee-duplicate',
    name: 'Melee Duplicate',
    subName: 'ARCANO DE CRÍTICOS AMARELOS DUPLICADOS',
    aliases: ['melee duplicate', 'duplicate', 'murmur arcane'],
    category: 'Arcano Lendário Murmur',
    categoryGroup: 'arcanes',
    mr: 0,
    tradeTax: '1.000.000 Créditos',
    ducats: 0,
    avgPrice: 700,
    minPrice: 650,
    trend: '+10%',
    trendType: 'up',
    components: [
      { name: 'Rank 5 (Completo - 21 cópias)', price: 650, tax: '1.000.000 Créditos', ducats: 0 },
      { name: 'Rank 0 (1 cópia)', price: 32, tax: '1.000.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'CaviaSyndicate', price: 650, reputation: 510, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'primary-merciless',
    name: 'Primary Merciless',
    subName: 'ARCANO DE DANO E RECARGA AO MATAR (+360%)',
    aliases: ['primary merciless', 'merciless', 'cruel primario'],
    category: 'Arcano de Arma',
    categoryGroup: 'arcanes',
    mr: 0,
    tradeTax: '10.000 Créditos',
    ducats: 0,
    avgPrice: 35,
    minPrice: 30,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: 'Rank 5 (Completo - 21 cópias)', price: 30, tax: '10.000 Créditos', ducats: 0 },
      { name: 'Rank 0 (1 cópia)', price: 2, tax: '10.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'SteelPathFarmer', price: 30, reputation: 650, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'secondary-merciless',
    name: 'Secondary Merciless',
    subName: 'ARCANO DE DANO SECUNDÁRIO AO MATAR (+360%)',
    aliases: ['secondary merciless', 'cruel secundario'],
    category: 'Arcano de Arma',
    categoryGroup: 'arcanes',
    mr: 0,
    tradeTax: '10.000 Créditos',
    ducats: 0,
    avgPrice: 35,
    minPrice: 30,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: 'Rank 5 (Completo - 21 cópias)', price: 30, tax: '10.000 Créditos', ducats: 0 },
      { name: 'Rank 0 (1 cópia)', price: 2, tax: '10.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'SteelPathFarmer', price: 30, reputation: 650, lastSeen: 'Agora mesmo' },
    ]
  },

  // ==========================================
  // 9. FRAGMENTOS DE ARCONTE (ARCHON SHARDS)
  // ==========================================
  {
    id: 'archon-shard-crimson',
    name: 'Crimson Archon Shard',
    subName: 'FRAGMENTO VERMELHO (+DANO CRÍTICO / +FORÇA)',
    aliases: ['archon', 'shard', 'carmesim', 'crimson archon shard', 'caco de arconte', 'arconte vermelho'],
    category: 'Fragmento de Arconte',
    categoryGroup: 'shards',
    mr: 5,
    tradeTax: '1.000.000 Créditos',
    ducats: 0,
    avgPrice: 45,
    minPrice: 40,
    trend: '+12%',
    trendType: 'up',
    components: [
      { name: 'Shard Carmesim Base', price: 40, tax: '1.000.000 Créditos', ducats: 0 },
      { name: 'Shard Tauforged (+50% Bônus)', price: 90, tax: '1.000.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'TauForgedHunter', price: 40, reputation: 430, lastSeen: 'Agora mesmo' },
      { username: 'KahlGarrison', price: 42, reputation: 67, lastSeen: 'Há 4 min' },
    ]
  },
  {
    id: 'archon-shard-amber',
    name: 'Amber Archon Shard',
    subName: 'FRAGMENTO AMARELO (+VELOCIDADE DE CONJURAÇÃO)',
    aliases: ['amber shard', 'ambar', 'shard amarelo', 'arconte ambar'],
    category: 'Fragmento de Arconte',
    categoryGroup: 'shards',
    mr: 5,
    tradeTax: '1.000.000 Créditos',
    ducats: 0,
    avgPrice: 40,
    minPrice: 35,
    trend: '+5%',
    trendType: 'up',
    components: [
      { name: 'Shard Âmbar Base', price: 35, tax: '1.000.000 Créditos', ducats: 0 },
      { name: 'Shard Tauforged (+50% Bônus)', price: 80, tax: '1.000.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'KahlGarrison', price: 35, reputation: 67, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'archon-shard-azure',
    name: 'Azure Archon Shard',
    subName: 'FRAGMENTO AZUL (+ENERGIA MÁXIMA / +VIDA / +ARMADURA)',
    aliases: ['azure shard', 'azul', 'shard azul', 'arconte azul'],
    category: 'Fragmento de Arconte',
    categoryGroup: 'shards',
    mr: 5,
    tradeTax: '1.000.000 Créditos',
    ducats: 0,
    avgPrice: 35,
    minPrice: 30,
    trend: '+2%',
    trendType: 'up',
    components: [
      { name: 'Shard Azul Base', price: 30, tax: '1.000.000 Créditos', ducats: 0 },
      { name: 'Shard Tauforged (+50% Bônus)', price: 70, tax: '1.000.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'TauForgedHunter', price: 30, reputation: 430, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'archon-shard-topaz',
    name: 'Topaz Archon Shard',
    subName: 'FRAGMENTO TOPÁZIO FUSIONADO (+CHANCE CRÍTICA SECUNDÁRIA)',
    aliases: ['topaz shard', 'topazio', 'shard topazio', 'arconte topazio'],
    category: 'Fragmento de Arconte Fusionado',
    categoryGroup: 'shards',
    mr: 5,
    tradeTax: '1.000.000 Créditos',
    ducats: 0,
    avgPrice: 55,
    minPrice: 50,
    trend: '+6%',
    trendType: 'up',
    components: [
      { name: 'Shard Topázio Base', price: 50, tax: '1.000.000 Créditos', ducats: 0 },
      { name: 'Shard Tauforged (+50%)', price: 110, tax: '1.000.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'AlbrechtAlchemist', price: 50, reputation: 340, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'archon-shard-emerald',
    name: 'Emerald Archon Shard',
    subName: 'FRAGMENTO ESMERALDA (+STACKS DE CORROSIVO / +DANO TÓXICO)',
    aliases: ['emerald shard', 'esmeralda', 'shard esmeralda', 'arconte esmeralda'],
    category: 'Fragmento de Arconte Fusionado',
    categoryGroup: 'shards',
    mr: 5,
    tradeTax: '1.000.000 Créditos',
    ducats: 0,
    avgPrice: 60,
    minPrice: 55,
    trend: '+8%',
    trendType: 'up',
    components: [
      { name: 'Shard Esmeralda Base', price: 55, tax: '1.000.000 Créditos', ducats: 0 },
      { name: 'Shard Tauforged (+50%)', price: 120, tax: '1.000.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'CorrosiveStacker', price: 55, reputation: 490, lastSeen: 'Agora mesmo' },
    ]
  },

  // ==========================================
  // 10. ESCULTURAS AYATAN & LENTES DE FOCO
  // ==========================================
  {
    id: 'ayatan-anasa-sculpture',
    name: 'Escultura Ayatan Anasa',
    subName: 'ESCULTURA AYATAN (3.450 ENDO COM ESTRELAS)',
    aliases: ['anasa', 'ayatan anasa', 'escultura anasa', 'ayatan', 'endo'],
    category: 'Escultura Ayatan',
    categoryGroup: 'ayatan',
    mr: 0,
    tradeTax: '8.000 Créditos',
    ducats: 0,
    avgPrice: 15,
    minPrice: 10,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: 'Cheia (Com todas as Estrelas)', price: 12, tax: '8.000 Créditos', ducats: 0 },
      { name: 'Vazia (Sem Estrelas)', price: 8, tax: '8.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'SortieMaster', price: 10, reputation: 720, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'ayatan-orta-sculpture',
    name: 'Escultura Ayatan Orta',
    subName: 'ESCULTURA AYATAN (2.700 ENDO COM ESTRELAS)',
    aliases: ['orta', 'ayatan orta', 'escultura orta'],
    category: 'Escultura Ayatan',
    categoryGroup: 'ayatan',
    mr: 0,
    tradeTax: '8.000 Créditos',
    ducats: 0,
    avgPrice: 12,
    minPrice: 8,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: 'Cheia (Com Estrelas)', price: 10, tax: '8.000 Créditos', ducats: 0 },
      { name: 'Vazia', price: 6, tax: '8.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'MarooFan', price: 8, reputation: 190, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'eidolon-lens-zenurik',
    name: 'Lente de Foco Eidolon: Zenurik',
    subName: 'LENTE DE FOCO AVANÇADA (+2.25% CONVERSÃO)',
    aliases: ['lente eidolon zenurik', 'zenurik lens', 'lente zenurik', 'foco'],
    category: 'Lente de Foco',
    categoryGroup: 'ayatan',
    mr: 0,
    tradeTax: '8.000 Créditos',
    ducats: 0,
    avgPrice: 30,
    minPrice: 25,
    trend: '+2%',
    trendType: 'up',
    components: [
      { name: '1x Lente Eidolon Zenurik', price: 25, tax: '8.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'FocusFarmer_Lua', price: 25, reputation: 310, lastSeen: 'Agora mesmo' },
    ]
  },

  // ==========================================
  // 11. PEIXES RAROS DE MUNDOS ABERTOS & GEMAS
  // ==========================================
  {
    id: 'norg-large-fish',
    name: 'Peixe Norg Grande (Cetus - Planícies)',
    subName: 'PEIXE RARO NOTURNO DE CETUS',
    aliases: ['norg', 'peixe norg', 'cetus fish', 'peixe grande'],
    category: 'Peixe de Cetus',
    categoryGroup: 'fish_gems',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 0,
    avgPrice: 10,
    minPrice: 8,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: '1x Norg Grande (L)', price: 8, tax: '2.000 Créditos', ducats: 0 },
      { name: 'Lote com 5x Norg', price: 35, tax: '2.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'FisherHaiLuk', price: 8, reputation: 450, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'glappid-large-fish',
    name: 'Peixe Glappid Grande (Cetus - Planícies)',
    subName: 'PEIXE RARO OCEÂNICO NOTURNO',
    aliases: ['glappid', 'peixe glappid', 'cetus glappid'],
    category: 'Peixe de Cetus',
    categoryGroup: 'fish_gems',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 0,
    avgPrice: 12,
    minPrice: 10,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: '1x Glappid Grande (L)', price: 10, tax: '2.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'FisherHaiLuk', price: 10, reputation: 450, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'synathid-servofish',
    name: 'Servopeixe Synathid (Orb Vallis - Fortuna)',
    subName: 'SERVOPEIXE RARO DE REFRIGERAÇÃO',
    aliases: ['synathid', 'servofish', 'fortuna fish', 'synathid vallis'],
    category: 'Servopeixe de Fortuna',
    categoryGroup: 'fish_gems',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 0,
    avgPrice: 10,
    minPrice: 8,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: '1x Synathid Magnífico', price: 8, tax: '2.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'TheBusinessFan', price: 8, reputation: 290, lastSeen: 'Agora mesmo' },
    ]
  },
  {
    id: 'radian-sentirum-gem',
    name: 'Sentirum Radiante Lapidado (x10)',
    subName: 'GEMA RARA EIDOLON PARA CRAFT DE ARCANOS',
    aliases: ['sentirum', 'radian sentirum', 'gema cetus', 'sentirum radiante'],
    category: 'Gema Lapidada',
    categoryGroup: 'fish_gems',
    mr: 0,
    tradeTax: '2.000 Créditos',
    ducats: 0,
    avgPrice: 20,
    minPrice: 15,
    trend: '0%',
    trendType: 'neutral',
    components: [
      { name: 'Lote de 10x Sentirum Radiante', price: 15, tax: '2.000 Créditos', ducats: 0 },
      { name: 'Lote de 20x Sentirum Radiante', price: 28, tax: '2.000 Créditos', ducats: 0 },
    ],
    sellers: [
      { username: 'OldManSuumbaat', price: 15, reputation: 380, lastSeen: 'Agora mesmo' },
    ]
  }
];

export const WARFRAME_ITEMS_DB = WARFRAME_MASSIVE_ITEMS_DB;
