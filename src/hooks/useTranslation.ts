import { useState, useEffect, useCallback } from 'react';
import { en } from '../locales/en';
import { nl } from '../locales/nl';

type Locale = 'en' | 'nl';
type Translations = typeof en;

const translations: Record<Locale, Translations> = {
  en,
  nl
};

// Global state for language
let globalLocale: Locale = (localStorage.getItem('locale') as Locale) || 'nl';
const subscribers = new Set<() => void>();

export const useTranslation = () => {
  const [locale, setLocaleState] = useState<Locale>(globalLocale);

  useEffect(() => {
    const handleChange = () => {
      setLocaleState(globalLocale);
    };
    
    subscribers.add(handleChange);
    return () => {
      subscribers.delete(handleChange);
    };
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value || key;
  }, [locale]);

  const changeLanguage = useCallback((newLocale: Locale) => {
    globalLocale = newLocale;
    localStorage.setItem('locale', newLocale);
    
    // Notify all subscribers
    subscribers.forEach(callback => callback());
  }, []);

  return {
    t,
    locale,
    changeLanguage,
    translations: translations[locale]
  };
};