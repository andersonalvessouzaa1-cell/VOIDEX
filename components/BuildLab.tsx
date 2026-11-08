'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Shield, 
  Flame, 
  Zap, 
  Activity, 
  TrendingUp, 
  Layers, 
  Crosshair, 
  Sliders, 
  ChevronRight, 
  Check, 
  ArrowRight, 
  RefreshCw, 
  Coins, 
  Info, 
  Award,
  Swords,
  ChevronDown
} from 'lucide-react';
import { WARFRAME_BUILDS_DATABASE, WarframeBuildProfile, BuildPathway, BuildModItem, ModAlternative } from '@/lib/build-lab-engine';
import { BuildEngineAdapter } from '@/lib/data-engine/build-engine-adapter';
import { CalculationEngine } from '@/lib/data-engine/calculation-engine';

const calcEngine = new CalculationEngine();
const testWeapon = BuildEngineAdapter.getTestWeapon();
const testMod = BuildEngineAdapter.getTestMod();

export default function BuildLab() {
  const [selectedFrame, setSelectedFrame] = useState<WarframeBuildProfile>(WARFRAME_BUILDS_DATABASE[0]);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>(['damage', 'endurance']);
  const [playstylePref, setPlaystylePref] = useState({
    focus: 'balanced',      // 'abilities' | 'balanced' | 'weapons'
    investment: 'high',     // 'low' | 'medium' | 'high' | 'endgame'
    helminth: true,
    shards: true,
    lowForma: false,
  });

  const [selectedPathIndex, setSelectedPathIndex] = useState<number>(0);
  const [activeModSlotIndex, setActiveModSlotIndex] = useState<number>(0);
  const [uiMode, setUiMode] = useState<'simple' | 'advanced'>('advanced');
  const [searchFrameTerm, setSearchFrameTerm] = useState('');
  const [whatIfReplacedMod, setWhatIfReplacedMod] = useState<ModAlternative | null>(null);

  // Evidence-Aware Weapon Integration State
  const [weaponEquippedMods, setWeaponEquippedMods] = useState<import('@/lib/data-engine/types').ModEntity[]>([]);
  const weaponResult = BuildEngineAdapter.configureWeaponBuild(
    testWeapon,
    'braton_primary',
    weaponEquippedMods,
    calcEngine
  );

  const currentPath: BuildPathway = selectedFrame.paths[selectedPathIndex] || selectedFrame.paths[0];
  const activeMod: BuildModItem = currentPath.mods[activeModSlotIndex] || currentPath.mods[0];

  const toggleObjective = (objId: string) => {
    if (selectedObjectives.includes(objId)) {
      if (selectedObjectives.length > 1) {
        setSelectedObjectives(selectedObjectives.filter(o => o !== objId));
      }
    } else {
      setSelectedObjectives([...selectedObjectives, objId]);
    }
  };

  const objectivesList = [
    { id: 'damage', label: 'Dano', desc: 'Maximize o potencial ofensivo.', icon: '⚔️' },
    { id: 'tank', label: 'Tank', desc: 'Priorize sobrevivência e resistência.', icon: '🛡️' },
    { id: 'control', label: 'Controle', desc: 'Controle inimigos e domine o campo.', icon: '🌀' },
    { id: 'nuke', label: 'Nuke', desc: 'Elimine grandes grupos rapidamente.', icon: '💥' },
    { id: 'weapon_platform', label: 'Weapon Platform', desc: 'Transforme o Warframe em suporte para armas.', icon: '🔫' },
    { id: 'support', label: 'Suporte', desc: 'Maximize buffs, energia e utilidade.', icon: '✨' },
    { id: 'endurance', label: 'Endurance', desc: 'Projetado para missões de longa duração.', icon: '⏳' },
    { id: 'hybrid', label: 'Híbrida', desc: 'Equilíbrio perfeito entre múltiplas funções.', icon: '⚖️' },
  ];

  return (
    <div id="build-lab" className="py-16 bg-void-950 border-t border-void-border text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orokin-gold/10 border border-orokin-gold/30 text-orokin-gold text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sistema de Decisão Assistida</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Builds que você entende.<br />
            <span className="bg-gradient-to-r from-energy-cyan to-orokin-gold bg-clip-text text-transparent">
              Não apenas builds que você copia.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            O Acervo Void não decide tudo por você. Ele analisa seu objetivo, sugere 3 caminhos otimizados e explica o impacto real de cada mod para você manter o controle.
          </p>
        </div>

        {/* 1. Escolha do Warframe & Objetivos */}
        <div className="bg-void-900 border border-void-border rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Seletor de Warframe */}
            <div className="lg:col-span-4">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. Escolha seu Warframe
              </label>
              <div className="flex gap-2">
                {WARFRAME_BUILDS_DATABASE.map(frame => (
                  <button
                    key={frame.id}
                    onClick={() => {
                      setSelectedFrame(frame);
                      setSelectedPathIndex(0);
                      setActiveModSlotIndex(0);
                      setWhatIfReplacedMod(null);
                    }}
                    className={`flex-1 py-3 px-3 rounded-xl border text-left transition-all ${
                      selectedFrame.id === frame.id
                        ? 'bg-energy-cyan/15 border-energy-cyan text-white shadow-glow-cyan/20'
                        : 'bg-void-950 border-void-border text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm">{frame.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{frame.subTitle}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Objetivos da Build */}
            <div className="lg:col-span-8">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>2. Qual é o seu objetivo? (Selecione múltiplos)</span>
                <span className="text-[10px] text-energy-cyan lowercase">{selectedObjectives.length} selecionado(s)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {objectivesList.map(obj => {
                  const isSelected = selectedObjectives.includes(obj.id);
                  return (
                    <button
                      key={obj.id}
                      onClick={() => toggleObjective(obj.id)}
                      className={`p-2 rounded-xl border text-left transition-all text-xs flex items-center gap-2 ${
                        isSelected
                          ? 'bg-orokin-gold/15 border-orokin-gold text-orokin-gold font-bold shadow-glow-gold/10'
                          : 'bg-void-950 border-void-border text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="text-base">{obj.icon}</span>
                      <span className="truncate">{obj.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* 2. Os 3 Caminhos Sugeridos pela IA */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-energy-cyan"></span>
              <span>Encontramos 3 caminhos otimizados para {selectedFrame.name}</span>
            </h3>
            <div className="flex items-center gap-2 bg-void-900 border border-void-border rounded-lg p-1">
              <button
                onClick={() => setUiMode('simple')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  uiMode === 'simple' ? 'bg-energy-cyan text-void-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Modo Simples
              </button>
              <button
                onClick={() => setUiMode('advanced')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  uiMode === 'advanced' ? 'bg-energy-cyan text-void-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Modo Avançado
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedFrame.paths.map((path, idx) => {
              const isSelected = selectedPathIndex === idx;
              return (
                <div
                  key={path.id}
                  onClick={() => {
                    setSelectedPathIndex(idx);
                    setActiveModSlotIndex(0);
                    setWhatIfReplacedMod(null);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-void-900/90 border-energy-cyan shadow-glow-cyan/20 ring-1 ring-energy-cyan'
                      : 'bg-void-900/40 border-void-border hover:border-slate-600 hover:bg-void-900/70'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 px-3 py-0.5 bg-energy-cyan text-void-950 text-[10px] font-extrabold uppercase tracking-wider rounded-bl-lg">
                      Ativa
                    </div>
                  )}

                  <div>
                    <div className="text-[11px] font-mono text-energy-cyan uppercase tracking-wider mb-1">
                      {path.role}
                    </div>
                    <h4 className="text-base font-bold text-white mb-2 leading-tight">
                      {path.title}
                    </h4>
                    <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                      {path.tagline}
                    </p>

                    {/* DNA Radar Preview */}
                    <div className="grid grid-cols-3 gap-1.5 py-2.5 px-3 rounded-xl bg-void-950/80 border border-void-border mb-4 text-[11px]">
                      <div>
                        <span className="text-slate-400 text-[10px]">Dano</span>
                        <div className="font-bold text-white font-mono">{path.dna.damage}</div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px]">Tank</span>
                        <div className="font-bold text-white font-mono">{path.dna.survival}</div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px]">Controle</span>
                        <div className="font-bold text-white font-mono">{path.dna.control}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-void-border/60">
                    <div className="flex items-center gap-1 text-slate-400">
                      <span>Forma:</span>
                      <span className="font-bold text-orokin-gold">{path.formaCount}x</span>
                    </div>
                    <div className="text-energy-cyan font-semibold flex items-center gap-1">
                      <span>Explorar</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Visualizador Detalhado da Build Selecionada */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Painel Esquerdo: Warframe & Investimento */}
          <div className="lg:col-span-3 bg-void-900 border border-void-border rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-full bg-void-800 border border-void-border text-[11px] font-mono text-slate-300">
                  Nível 30
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-orokin-gold/15 border border-orokin-gold/40 text-[11px] font-bold text-orokin-gold">
                  {currentPath.formaCount} Formas
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-1">{selectedFrame.name}</h3>
              <p className="text-xs text-slate-400 mb-4">{currentPath.tagline}</p>

              {/* Atributos Finais Calculados */}
              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Atributos Finais:</div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded-lg bg-void-950 border border-void-border flex justify-between">
                    <span className="text-slate-400">Vida:</span>
                    <span className="text-emerald-400 font-bold">{currentPath.finalStats.health}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-void-950 border border-void-border flex justify-between">
                    <span className="text-slate-400">Escudos:</span>
                    <span className="text-energy-cyan font-bold">{currentPath.finalStats.shields}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-void-950 border border-void-border flex justify-between">
                    <span className="text-slate-400">Armadura:</span>
                    <span className="text-slate-200 font-bold">{currentPath.finalStats.armor}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-void-950 border border-void-border flex justify-between">
                    <span className="text-slate-400">Energia:</span>
                    <span className="text-indigo-300 font-bold">{currentPath.finalStats.energy}</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1 pt-2 text-center text-xs font-mono">
                  <div className="p-1.5 rounded-lg bg-void-950 border border-void-border">
                    <div className="text-[10px] text-slate-400">FOR</div>
                    <div className="text-rose-400 font-bold">{currentPath.finalStats.strength}%</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-void-950 border border-void-border">
                    <div className="text-[10px] text-slate-400">DUR</div>
                    <div className="text-amber-400 font-bold">{currentPath.finalStats.duration}%</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-void-950 border border-void-border">
                    <div className="text-[10px] text-slate-400">EFI</div>
                    <div className="text-sky-400 font-bold">{currentPath.finalStats.efficiency}%</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-void-950 border border-void-border">
                    <div className="text-[10px] text-slate-400">ALC</div>
                    <div className="text-teal-400 font-bold">{currentPath.finalStats.range}%</div>
                  </div>
                </div>
              </div>

              {/* Helminth & Shards */}
              {currentPath.helminth && (
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 mb-3 text-xs">
                  <div className="text-[10px] font-bold text-purple-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <span>🔮 Helminth Subsume</span>
                  </div>
                  <div className="font-bold text-white">{currentPath.helminth.abilityName}</div>
                  <div className="text-[11px] text-purple-200 mt-1">{currentPath.helminth.reason}</div>
                </div>
              )}

              {currentPath.archonShards && (
                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-xs">
                  <div className="text-[10px] font-bold text-rose-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <span>💎 Archon Shards</span>
                  </div>
                  <div className="text-[11px] text-rose-200">{currentPath.archonShards.effectDescription}</div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-void-border text-center">
              <div className="text-[11px] text-slate-400">Custo Estimado no Mercado:</div>
              <div className="text-lg font-extrabold text-orokin-gold font-mono flex items-center justify-center gap-1">
                <span>~{currentPath.marketPlatCostEstimate}p</span>
                <Coins className="w-4 h-4 text-orokin-gold" />
              </div>
            </div>
          </div>

          {/* Painel Central: Os 8 Slots de Mods + Aura & Exilus */}
          <div className="lg:col-span-5 bg-void-900 border border-void-border rounded-2xl p-5 shadow-xl">
            
            {/* Aura & Exilus */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-void-950 border border-orokin-gold/40 flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-bold text-orokin-gold uppercase tracking-wider">Aura</div>
                  <div className="text-xs font-bold text-white truncate">{currentPath.aura.name}</div>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-void-800 text-[10px] font-mono text-slate-300">+{currentPath.aura.polarity}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-void-950 border border-void-border flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-bold text-energy-cyan uppercase tracking-wider">Exilus</div>
                  <div className="text-xs font-bold text-white truncate">{currentPath.exilus.name}</div>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-void-800 text-[10px] font-mono text-slate-300">{currentPath.exilus.polarity}</span>
              </div>
            </div>

            {/* Grid dos 8 Mods */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {currentPath.mods.map((mod, idx) => {
                const isActive = activeModSlotIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveModSlotIndex(idx);
                      setWhatIfReplacedMod(null);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all relative ${
                      isActive
                        ? 'bg-void-950 border-energy-cyan ring-1 ring-energy-cyan shadow-glow-cyan/20'
                        : 'bg-void-950/80 border-void-border hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">
                        Slot {idx + 1}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">
                        {mod.capacity} cap
                      </span>
                    </div>
                    <div className="font-bold text-xs text-white truncate">{mod.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{mod.effect}</div>
                  </button>
                );
              })}
            </div>

            {/* Arcanos */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-void-border">
              {currentPath.arcanes.map((arc, aIdx) => (
                <div key={aIdx} className="p-2 rounded-xl bg-void-950 border border-void-border text-[11px]">
                  <div className="text-[9px] text-energy-cyan font-bold uppercase">Arcano {aIdx + 1} (Rank {arc.rank})</div>
                  <div className="font-bold text-white truncate">{arc.name}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Painel Direito: Análise do Mod & Alternativas ("E Se...?") */}
          <div className="lg:col-span-4 bg-void-900 border border-void-border rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-energy-cyan">
                  Detalhes do Mod Selecionado
                </span>
                <span className="text-xs font-mono text-slate-400">Rank {activeMod.rank}/{activeMod.maxRank}</span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2">{activeMod.name}</h4>
              <p className="text-xs text-slate-300 p-3 rounded-xl bg-void-950 border border-void-border mb-4">
                {activeMod.effect}
              </p>

              {/* Seção de Alternativas ("Por que escolher? O que você ganha/perde?") */}
              <div className="mb-4">
                <div className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-orokin-gold" />
                  <span>Alternativas Viáveis (&quot;E Se...?&quot;)</span>
                </div>

                {activeMod.alternatives && activeMod.alternatives.length > 0 ? (
                  <div className="space-y-2">
                    {activeMod.alternatives.map((alt, altIdx) => (
                      <div
                        key={altIdx}
                        onClick={() => setWhatIfReplacedMod(alt)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          whatIfReplacedMod?.name === alt.name
                            ? 'bg-orokin-gold/15 border-orokin-gold shadow-glow-gold/10'
                            : 'bg-void-950 border-void-border hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-white mb-1">
                          <span>{alt.name}</span>
                          <span className="text-[10px] text-orokin-gold font-mono">{alt.investmentDelta}</span>
                        </div>
                        <div className="text-[11px] text-slate-300 mb-1.5">{alt.reason}</div>
                        <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
                          <span className="text-emerald-400">Ganho: {alt.gain}</span>
                          <span className="text-rose-400">Perda: {alt.loss}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 italic p-3 rounded-xl bg-void-950 border border-void-border">
                    Este mod é o pilar estrutural da build e não possui substitutos diretos recomendados sem alterar o objetivo central.
                  </div>
                )}
              </div>
            </div>

            {/* Build DNA */}
            <div className="pt-4 border-t border-void-border">
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>🧬 Build DNA</span>
                <span className="text-energy-cyan font-mono text-[10px]">Assinatura Acervo Void</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="flex justify-between items-center p-1.5 bg-void-950 rounded border border-void-border">
                  <span className="text-slate-400">⚔️ Dano</span>
                  <span className="font-bold text-rose-400">{currentPath.dna.damage}/100</span>
                </div>
                <div className="flex justify-between items-center p-1.5 bg-void-950 rounded border border-void-border">
                  <span className="text-slate-400">🛡️ Tank</span>
                  <span className="font-bold text-emerald-400">{currentPath.dna.survival}/100</span>
                </div>
                <div className="flex justify-between items-center p-1.5 bg-void-950 rounded border border-void-border">
                  <span className="text-slate-400">🌀 Controle</span>
                  <span className="font-bold text-sky-400">{currentPath.dna.control}/100</span>
                </div>
                <div className="flex justify-between items-center p-1.5 bg-void-950 rounded border border-void-border">
                  <span className="text-slate-400">⚡ Energia</span>
                  <span className="font-bold text-amber-400">{currentPath.dna.energy}/100</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 4. Como a Build Funciona & Como Jogar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          <div className="lg:col-span-6 bg-void-900 border border-void-border rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-energy-cyan" />
              <span>Como essa build funciona?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {currentPath.howItWorks}
            </p>
          </div>

          <div className="lg:col-span-6 bg-void-900 border border-void-border rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-orokin-gold" />
              <span>Como Jogar — Rotação Passo a Passo</span>
            </h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-void-950 border border-void-border">
                <span className="w-5 h-5 rounded-full bg-energy-cyan/20 text-energy-cyan font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                <span className="text-slate-300">{currentPath.howToPlay.step1}</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-void-950 border border-void-border">
                <span className="w-5 h-5 rounded-full bg-energy-cyan/20 text-energy-cyan font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                <span className="text-slate-300">{currentPath.howToPlay.step2}</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-void-950 border border-void-border">
                <span className="w-5 h-5 rounded-full bg-energy-cyan/20 text-energy-cyan font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                <span className="text-slate-300">{currentPath.howToPlay.step3}</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-void-950 border border-void-border">
                <span className="w-5 h-5 rounded-full bg-energy-cyan/20 text-energy-cyan font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</span>
                <span className="text-slate-300">{currentPath.howToPlay.step4}</span>
              </div>
            </div>
          </div>

        </div>

        {/* 5. Arsenal Integrado & Companion Synergy */}
        <div className="bg-void-900 border border-void-border rounded-2xl p-6 shadow-2xl mb-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Swords className="w-5 h-5 text-energy-cyan" />
            <span>Arsenal Recomendado & Companion Synergy</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {currentPath.weapons.map((w, wIdx) => (
              <div key={wIdx} className="p-4 rounded-xl bg-void-950 border border-void-border flex flex-col justify-between text-xs">
                <div>
                  <div className="text-[10px] font-mono text-energy-cyan uppercase mb-1">
                    {w.type === 'primary' ? 'Primária' : w.type === 'secondary' ? 'Secundária' : 'Melee'}
                  </div>
                  <div className="font-bold text-white text-sm mb-1">{w.name}</div>
                  <div className="text-[11px] text-slate-400 mb-2">{w.why}</div>
                </div>
                <div className="pt-2 border-t border-void-border/60 text-[10px] text-slate-400">
                  <span className="text-slate-400">Econômica: </span>
                  <span className="text-slate-300 font-semibold">{w.budgetAlternative}</span>
                </div>
              </div>
            ))}

            {/* Companion */}
            <div className="p-4 rounded-xl bg-void-950 border border-orokin-gold/30 flex flex-col justify-between text-xs">
              <div>
                <div className="text-[10px] font-mono text-orokin-gold uppercase mb-1">Companion</div>
                <div className="font-bold text-white text-sm mb-1">{currentPath.companion.name}</div>
                <div className="text-[11px] text-slate-400 mb-2">{currentPath.companion.why}</div>
              </div>
              <div className="pt-2 border-t border-void-border/60 text-[10px] text-slate-400">
                <span className="text-slate-400">Econômico: </span>
                <span className="text-slate-300 font-semibold">{currentPath.companion.budgetAlternative}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Tabela Comparativa (Build 1 vs Build 2 vs Build 3) */}
        <div className="bg-void-900 border border-void-border rounded-2xl p-6 shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-4">
            Comparação Lado a Lado dos 3 Caminhos
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-void-border text-slate-400 font-mono text-[11px]">
                  <th className="pb-3">Métrica</th>
                  {selectedFrame.paths.map((p, i) => (
                    <th key={i} className={`pb-3 ${selectedPathIndex === i ? 'text-energy-cyan font-bold' : ''}`}>
                      {p.title.split('—')[1] || p.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-void-border/40 font-mono">
                <tr>
                  <td className="py-2.5 text-slate-400">⚔️ Dano</td>
                  {selectedFrame.paths.map((p, i) => (
                    <td key={i} className="py-2.5 font-bold text-slate-200">{p.dna.damage}/100</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-400">🛡️ Sobrevivência</td>
                  {selectedFrame.paths.map((p, i) => (
                    <td key={i} className="py-2.5 font-bold text-slate-200">{p.dna.survival}/100</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-400">🌀 Controle</td>
                  {selectedFrame.paths.map((p, i) => (
                    <td key={i} className="py-2.5 font-bold text-slate-200">{p.dna.control}/100</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-400">⚡ Força / Duração</td>
                  {selectedFrame.paths.map((p, i) => (
                    <td key={i} className="py-2.5 text-slate-200">{p.finalStats.strength}% / {p.finalStats.duration}%</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-400">✨ Formas Necessárias</td>
                  {selectedFrame.paths.map((p, i) => (
                    <td key={i} className="py-2.5 text-orokin-gold font-bold">{p.formaCount}x</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-400">💰 Custo Estimado</td>
                  {selectedFrame.paths.map((p, i) => (
                    <td key={i} className="py-2.5 text-orokin-gold font-bold">~{p.marketPlatCostEstimate}p</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Evidence-Aware Weapon Testing Panel */}
        <div className="bg-void-900 border border-void-border rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2">Arma Selecionada: {testWeapon.name}</h3>
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 text-xs font-bold rounded ${testWeapon.verification_status === 'VERIFIED' ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'}`}>
                {testWeapon.verification_status}
              </span>
            </div>
            
            <button 
              onClick={() => {
                if (weaponEquippedMods.length === 0) setWeaponEquippedMods([testMod]);
                else setWeaponEquippedMods([]);
              }}
              className="px-4 py-2 bg-void-800 hover:bg-void-700 rounded-lg text-sm border border-void-border"
            >
              {weaponEquippedMods.length === 0 ? `Equipar Mod: ${testMod.name} (UNKNOWN)` : 'Remover Mod'}
            </button>
          </div>

          <div className="bg-void-950 p-4 rounded-xl border border-void-border/50">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-slate-300">Dano Final</h4>
              <span className={`text-xl font-mono ${weaponResult.status === 'VERIFIED' ? 'text-green-400' : 'text-yellow-400'}`}>
                {weaponResult.value}
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 text-xs font-bold rounded ${weaponResult.status === 'VERIFIED' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                {weaponResult.status}
              </span>
              {weaponResult.status === 'PARTIALLY_CALCULATED' && (
                <span className="text-xs text-red-400 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Cálculo limitado pela evidência disponível
                </span>
              )}
            </div>

            {/* Calculation Trace Log */}
            {weaponResult.traces && weaponResult.traces.length > 0 && (
              <div className="mt-4 border-t border-void-border pt-4">
                <h5 className="text-sm font-bold text-slate-400 mb-2">Calculation Trace Logs:</h5>
                <div className="space-y-2">
                  {weaponResult.traces.map((trace, idx) => (
                    <div key={idx} className="bg-void-900 p-2 rounded text-xs font-mono">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-slate-400">Entity: <span className="text-energy-cyan">{trace.entityId}</span></span>
                        <span className="text-slate-400">Operator: <span className={trace.operator === 'UNKNOWN' ? 'text-red-400 font-bold' : 'text-green-400'}>{trace.operator}</span></span>
                        <span className="text-slate-400">Blocked By: <span className="text-yellow-400">{trace.blockedBy || 'None'}</span></span>
                        <span className="text-slate-400">Output: <span className="text-white">{trace.outputValue !== null ? trace.outputValue : 'NULL'}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
