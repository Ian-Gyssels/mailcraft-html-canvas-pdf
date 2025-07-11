
import React from 'react';
import { Input } from '@/components/ui/input';
import { useTranslation } from '../../hooks/useTranslation';

interface LinkEditorProps {
  link?: string;
  onLinkChange: (link: string) => void;
}

const LinkEditor: React.FC<LinkEditorProps> = ({ link, onLinkChange }) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">{t('propertyEditor.link')}</label>
      <Input
        type="url"
        value={link || ''}
        onChange={(e) => onLinkChange(e.target.value)}
        placeholder={t('propertyEditor.placeholders.linkUrl')}
        className="text-sm"
      />
    </div>
  );
};

export default LinkEditor;
