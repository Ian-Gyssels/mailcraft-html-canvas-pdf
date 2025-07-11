import { useState, useEffect } from 'react';
import { en } from '../locales/en';
import { nl } from '../locales/nl';

type Locale = 'en' | 'nl';
type Translations = typeof en;

const translations: Record<Locale, Translations> = {
  en,
  nl
};

export const useTranslation = () => {
  const [locale, setLocale] = useState<Locale>(() => {
    const stored = localStorage.getItem('locale');
    return (stored as Locale) || 'nl';
  });

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value || key;
  };

  const changeLanguage = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return {
    t,
    locale,
    changeLanguage,
    translations: translations[locale]
  };
};