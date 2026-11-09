'use client';

import { useState } from 'react';
import WarframeModLab from './WarframeModLab';
import BuildPresets from './BuildPresets';
import CompleteLoadoutLab from './CompleteLoadoutLab';
import WeaponFreeLab from './WeaponFreeLab';
import CompanionFreeLab from './CompanionFreeLab';

export default function VerifiedBuildLab() {
  const [mode, setMode] = useState('presets');
  const modes = [{ id: 'presets', label: 'Presets completos' }, { id: 'warframes', label: 'Testar Warframe' }, { id: 'weapons', label: 'Testar armas' }, { id: 'companions', label: 'Testar companheiros' }, { id: 'references', label: 'Referências' }];
  return (
    <section id="build-lab" aria-labelledby="build-lab-title" className="scroll-mt-24 py-20 md:py-28 border-y border-void-border bg-void-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="build-lab-title" className="font-display font-extrabold text-4xl sm:text-6xl text-white">Build Lab</h2>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">Explore os efeitos dos mods antes de investir recursos. Compare a base com sua seleção personalizada.</p>
        <p role="note" className="my-6 pl-4 py-1 border-l-2 border-orokin-gold text-sm text-amber-100">Comparações parciais: o preset calcula atributos estáticos do Dante, os fragmentos selecionados e o bônus do Roar; o modo livre calcula atributos de habilidade. Dano das armas, sinergias do companheiro e efeitos condicionais de arcanos ainda ficam fora da conta. Os resumos antigos de fontes continuam separados. Nenhuma combinação foi testada por nós no jogo.</p>
        <nav aria-label="Modos do Build Lab" className="mb-8 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {modes.map(item => <button key={item.id} type="button" aria-pressed={mode === item.id} aria-controls={`lab-panel-${item.id}`} onClick={() => setMode(item.id)} className="min-h-12 border border-void-border px-4 py-3 text-sm text-slate-300 hover:border-energy-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-energy-cyan aria-pressed:border-energy-cyan aria-pressed:bg-void-800 aria-pressed:text-energy-cyan">{item.label}</button>)}
        </nav>
        <div id="lab-panel-presets" hidden={mode !== 'presets'}><CompleteLoadoutLab /></div>
        <div id="lab-panel-weapons" hidden={mode !== 'weapons'}><WeaponFreeLab /></div>
        <div id="lab-panel-companions" hidden={mode !== 'companions'}>{mode === 'companions' && <CompanionFreeLab />}</div>
        <div id="lab-panel-warframes" hidden={mode !== 'warframes'}><WarframeModLab /></div>
        <div id="lab-panel-references" hidden={mode !== 'references'} className="border-t border-void-border pt-6">
          <h3 className="font-display text-3xl text-white">Referências da comunidade</h3>
          <p className="mt-2 mb-6 text-sm text-slate-400">Resumos com crédito às fontes. Ainda sem seleção automática de mods ou recomendações de armas e companheiro; consulte a build original para ver a configuração publicada.</p>
          <BuildPresets />
        </div>
      </div>
    </section>
  );
}
