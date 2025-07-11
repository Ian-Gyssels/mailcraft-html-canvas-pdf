import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '../hooks/useTranslation';

const LanguageSelector: React.FC = () => {
  const { locale, changeLanguage } = useTranslation();

  return (
    <div className="flex gap-2">
      <Button
        variant={locale === 'nl' ? 'default' : 'outline'}
        size="sm"
        onClick={() => changeLanguage('nl')}
      >
        NL
      </Button>
      <Button
        variant={locale === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => changeLanguage('en')}
      >
        EN
      </Button>
    </div>
  );
};

export default LanguageSelector;