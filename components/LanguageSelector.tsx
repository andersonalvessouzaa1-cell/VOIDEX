'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSelector() {
  const { currentLang, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = languages.find((l) => l.code === currentLang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 py-1.5 rounded-lg bg-void-900 border border-void-border hover:border-energy-cyan/50 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
        aria-label="Selecionar Idioma"
      >
        <Globe className="w-3.5 h-3.5 text-energy-cyan" />
        <span>{currentOption.flag}</span>
        <span className="font-mono text-[11px] uppercase">{currentOption.code}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-void-900 border border-void-border rounded-xl shadow-2xl z-50 p-1.5 max-h-80 overflow-y-auto backdrop-blur-xl animate-fadeIn">
          <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-void-border/50 mb-1">
            Idiomas Oficiais do Warframe
          </div>
          <div className="space-y-0.5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-2.5 py-1.5 text-left text-xs rounded-lg hover:bg-void-800 flex items-center justify-between transition-colors ${
                  lang.code === currentLang
                    ? 'bg-energy-cyan/15 text-energy-cyan font-bold'
                    : 'text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400">{lang.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
