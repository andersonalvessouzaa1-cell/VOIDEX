import type { BuildSource, CompleteLoadout, EquipmentBuild, EquipmentSlot } from './loadout';

export interface CuratedSource extends BuildSource { author?: string }
export interface CuratedEquipment extends EquipmentBuild { source: CuratedSource; publishedRanks?: Record<string, number> }
export interface CuratedLoadout extends Omit<CompleteLoadout, 'equipment'> {
  source: CuratedSource;
  equipment: Record<Exclude<EquipmentSlot, 'companion_weapon'>, CuratedEquipment> & { companion_weapon?: CuratedEquipment };
  notes: string[];
}
/** Composições com referências individuais. Publicação de uma build não é prova de teste deste conjunto. */
export const CURATED_LOADOUTS: CuratedLoadout[] = [{
  "id": "dante-roar-equipamento-voidex-v1",
  "name": "Dano e apoio às armas — Dante / Roar",
  "role": "dano",
  "status": "NAO_TESTADO",
  "source": {
    "name": "Overframe",
    "author": "ninjase",
    "url": "https://overframe.gg/build/638612/",
    "retrievedAt": "2026-11-07"
  },
  "equipment": {
    "warframe": {
      "slug": "dante",
      "category": "warframe",
      "mods": [
        {
          "slug": "umbral_intensify",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-1"
        },
        {
          "slug": "equilibrium",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-2"
        },
        {
          "slug": "primed_continuity",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-3"
        },
        {
          "slug": "blind_rage",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-4"
        },
        {
          "slug": "transient_fortitude",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-5"
        },
        {
          "slug": "primed_flow",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-6"
        },
        {
          "slug": "augur_message",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-7"
        },
        {
          "slug": "archon_stretch",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-8"
        },
        {
          "slug": "growing_power",
          "rank": 5,
          "maxRank": 5,
          "slot": "aura"
        },
        {
          "slug": "power_drift",
          "rank": 5,
          "maxRank": 5,
          "slot": "exilus"
        }
      ],
      "arcanes": [
        {
          "slug": "arcane_truculence",
          "rank": 5,
          "maxRank": 5
        },
        {
          "slug": "arcane_impetus",
          "rank": 5,
          "maxRank": 5
        }
      ],
      "source": {
        "name": "Overframe",
        "author": "ninjase",
        "url": "https://overframe.gg/build/817819/",
        "retrievedAt": "2026-11-07"
      }
    },
    "primary": {
      "slug": "phantasma_prime",
      "category": "primary",
      "mods": [
        {
          "slug": "magnetic_strafe",
          "rank": 3,
          "maxRank": 3,
          "slot": "normal-1"
        },
        {
          "slug": "shotgun_elementalist",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-2"
        },
        {
          "slug": "primed_charged_shell",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-3"
        },
        {
          "slug": "primed_cleanse_orokin",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-4"
        },
        {
          "slug": "frigid_blast",
          "rank": 3,
          "maxRank": 3,
          "slot": "normal-5"
        },
        {
          "slug": "toxic_barrage",
          "rank": 3,
          "maxRank": 3,
          "slot": "normal-6"
        },
        {
          "slug": "galvanized_hell",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-7"
        },
        {
          "slug": "galvanized_savvy",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-8"
        },
        {
          "slug": "galvanized_acceleration",
          "rank": 10,
          "maxRank": 10,
          "slot": "exilus"
        }
      ],
      "arcanes": [
        {
          "slug": "primary_crux",
          "rank": 5,
          "maxRank": 5
        }
      ],
      "source": {
        "name": "Overframe",
        "author": "ninjase",
        "url": "https://overframe.gg/build/374667/",
        "retrievedAt": "2026-11-07"
      }
    },
    "secondary": {
      "slug": "spectra_vandal",
      "category": "secondary",
      "mods": [
        {
          "slug": "primed_target_cracker",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-1"
        },
        {
          "slug": "primed_pistol_gambit",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-2"
        },
        {
          "slug": "primed_expel_orokin",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-3"
        },
        {
          "slug": "lethal_torrent",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-4"
        },
        {
          "slug": "pistol_pestilence",
          "rank": 3,
          "maxRank": 3,
          "slot": "normal-5"
        },
        {
          "slug": "frostbite",
          "rank": 3,
          "maxRank": 3,
          "slot": "normal-6"
        },
        {
          "slug": "galvanized_diffusion",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-7"
        },
        {
          "slug": "galvanized_shot",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-8"
        },
        {
          "slug": "primed_pistol_ammo_mutation",
          "rank": 10,
          "maxRank": 10,
          "slot": "exilus"
        }
      ],
      "arcanes": [
        {
          "slug": "secondary_merciless",
          "rank": 5,
          "maxRank": 5
        }
      ],
      "source": {
        "name": "Overframe",
        "author": "ninjase",
        "url": "https://overframe.gg/build/638360/",
        "retrievedAt": "2026-11-07"
      },
      "publishedRanks": {
        "pistol_pestilence": 0,
        "frostbite": 0
      }
    },
    "melee": {
      "slug": "glaive_prime",
      "category": "melee",
      "mods": [
        {
          "slug": "melee_elementalist",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-1"
        },
        {
          "slug": "primed_smite_grineer",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-2"
        },
        {
          "slug": "volatile_quick_return",
          "rank": 3,
          "maxRank": 3,
          "slot": "normal-3"
        },
        {
          "slug": "power_throw_weaponglaivepowerthrowmod",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-4"
        },
        {
          "slug": "galvanized_reflex",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-5"
        },
        {
          "slug": "amalgam_organ_shatter",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-6"
        },
        {
          "slug": "primed_pressure_point",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-7"
        },
        {
          "slug": "sacrificial_steel",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-8"
        },
        {
          "slug": "astral_twilight",
          "rank": 3,
          "maxRank": 3,
          "slot": "stance"
        },
        {
          "slug": "dispatch_overdrive",
          "rank": 5,
          "maxRank": 5,
          "slot": "exilus"
        }
      ],
      "arcanes": [
        {
          "slug": "melee_duplicate",
          "rank": 5,
          "maxRank": 5
        }
      ],
      "source": {
        "name": "Overframe",
        "author": "ninjase",
        "url": "https://overframe.gg/build/270712/",
        "retrievedAt": "2026-11-07"
      }
    },
    "companion": {
      "slug": "diriga",
      "category": "companion",
      "mods": [
        {
          "slug": "primed_regen",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-1"
        },
        {
          "slug": "manifold_bond",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-2"
        },
        {
          "slug": "duplex_bond",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-3"
        },
        {
          "slug": "tenacious_bond",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-4"
        },
        {
          "slug": "vacuum",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-5"
        },
        {
          "slug": "arc_coil",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-6"
        },
        {
          "slug": "primed_animal_instinct",
          "rank": 10,
          "maxRank": 10,
          "slot": "normal-7"
        },
        {
          "slug": "momentous_bond",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-8"
        },
        {
          "slug": "synth_deconstruct",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-9"
        },
        {
          "slug": "guardian",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-10"
        }
      ],
      "arcanes": [],
      "source": {
        "name": "Overframe",
        "author": "ninjase",
        "url": "https://overframe.gg/build/541464/",
        "retrievedAt": "2026-11-07"
      }
    },
    "companion_weapon": {
      "slug": "burst_laser_prime",
      "category": "companion_weapon",
      "mods": [
        {
          "slug": "magnetic_might",
          "rank": 3,
          "maxRank": 3,
          "slot": "normal-1"
        },
        {
          "slug": "accelerated_isotope",
          "rank": 3,
          "maxRank": 3,
          "slot": "normal-2"
        },
        {
          "slug": "augur_pact",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-3"
        },
        {
          "slug": "augur_seeker",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-4"
        },
        {
          "slug": "scorch",
          "rank": 3,
          "maxRank": 3,
          "slot": "normal-5"
        },
        {
          "slug": "frostbite",
          "rank": 3,
          "maxRank": 3,
          "slot": "normal-6"
        },
        {
          "slug": "pistol_pestilence",
          "rank": 3,
          "maxRank": 3,
          "slot": "normal-7"
        },
        {
          "slug": "creeping_bullseye",
          "rank": 5,
          "maxRank": 5,
          "slot": "normal-8"
        }
      ],
      "arcanes": [],
      "source": {
        "name": "Overframe",
        "author": "ninjase",
        "url": "https://overframe.gg/build/737345/",
        "retrievedAt": "2026-11-07"
      }
    }
  },
  "shards": [
    {
      "color": "ambar",
      "tauforged": true,
      "effect": "casting_speed",
      "value": 37.5,
      "unit": "%",
      "source": {
        "name": "Warframe Wiki — Amber Archon Shard",
        "url": "https://wiki.warframe.com/w/Amber_Archon_Shard",
        "retrievedAt": "2026-11-07"
      }
    },
    {
      "color": "ambar",
      "tauforged": true,
      "effect": "casting_speed",
      "value": 37.5,
      "unit": "%",
      "source": {
        "name": "Warframe Wiki — Amber Archon Shard",
        "url": "https://wiki.warframe.com/w/Amber_Archon_Shard",
        "retrievedAt": "2026-11-07"
      }
    },
    {
      "color": "ambar",
      "tauforged": true,
      "effect": "casting_speed",
      "value": 37.5,
      "unit": "%",
      "source": {
        "name": "Warframe Wiki — Amber Archon Shard",
        "url": "https://wiki.warframe.com/w/Amber_Archon_Shard",
        "retrievedAt": "2026-11-07"
      }
    },
    {
      "color": "carmesim",
      "tauforged": true,
      "effect": "ability_duration",
      "value": 15,
      "unit": "%",
      "source": {
        "name": "Warframe Wiki — Crimson Archon Shard",
        "url": "https://wiki.warframe.com/w/Crimson_Archon_Shard",
        "retrievedAt": "2026-11-07"
      }
    },
    {
      "color": "carmesim",
      "tauforged": true,
      "effect": "ability_duration",
      "value": 15,
      "unit": "%",
      "source": {
        "name": "Warframe Wiki — Crimson Archon Shard",
        "url": "https://wiki.warframe.com/w/Crimson_Archon_Shard",
        "retrievedAt": "2026-11-07"
      }
    }
  ],
  "helminth": {
    "kind": "subsumed",
    "ability": "Roar",
    "replacedAbility": "Noctua",
    "source": {
      "name": "Overframe",
      "author": "ninjase",
      "url": "https://overframe.gg/build/817819/",
      "retrievedAt": "2026-11-07"
    }
  },
  "notes": [
    "Composição VOIDEX de configurações publicadas por ninjase. O conjunto completo não foi testado por nós nem foi apresentado como teste único pelo autor.",
    "Todos os mods e arcanos estão no nível máximo. A fonte da Spectra Vandal usa Pistol Pestilence e Frostbite no nível 0; esta variante altera essa escolha.",
    "No companheiro, Duplex Bond foi escolhido entre as alternativas do guia no lugar de Seismic Bond. Esta variante troca Noctua por Roar e não presume uma habilidade canalizada ativa.",
    "Os cinco fragmentos tauforjados são uma escolha da VOIDEX a partir das cores e efeitos sugeridos no guia. O guia não especifica a variante tauforjada.",
    "As builds de origem indicam patches diferentes (38.5 a 44.0). Isso não certifica compatibilidade com o patch atual.",
    "O cálculo desta etapa cobre atributos estáticos do Dante e os dois efeitos de fragmento escolhidos; não calcula dano das armas, encaixe/capacidade ou todos os efeitos condicionais."
  ]
}];

export function loadoutsForWarframe(slug: string): CuratedLoadout[] {
  return CURATED_LOADOUTS.filter(preset => preset.equipment.warframe.slug === slug);
}
