'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, TRANSLATIONS, LanguageOption } from '@/lib/translations';

interface LanguageContextType {
  currentLang: string;
  setLanguage: (code: string) => void;
  t: (key: string, defaultVal?: string) => string;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType>({
  currentLang: 'pt-BR',
  setLanguage: () => {},
  t: (key: string) => key,
  languages: LANGUAGES,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState('pt-BR');

  useEffect(() => {
    const saved = localStorage.getItem('voidex_lang');
    if (saved && TRANSLATIONS[saved]) {
      setCurrentLang(saved);
    }
  }, []);

  const setLanguage = (code: string) => {
    setCurrentLang(code);
    localStorage.setItem('voidex_lang', code);
  };

  const t = (key: string, defaultVal?: string): string => {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['pt-BR'] || TRANSLATIONS['en'];
    return dict[key] || defaultVal || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setLanguage,
        t,
        languages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
