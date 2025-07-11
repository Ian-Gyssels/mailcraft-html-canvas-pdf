
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { TemplateComponent } from '../../types/template';
import IconSelector from '../IconSelector';
import { useTranslation } from '../../hooks/useTranslation';

interface ContentEditorProps {
  component: TemplateComponent;
  onContentChange: (content: string) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ component, onContentChange }) => {
  const { t } = useTranslation();
  
  const getContentPlaceholder = () => {
    switch (component.type) {
      case 'quote': return t('propertyEditor.placeholders.enterQuote');
      case 'video': return t('propertyEditor.placeholders.videoUrl');
      case 'list': return t('propertyEditor.placeholders.listItems');
      case 'testimonial': return t('propertyEditor.placeholders.testimonial');
      case 'card': return t('propertyEditor.placeholders.cardContent');
      case 'icon': return 'star';
      default: return t('propertyEditor.placeholders.enterContent');
    }
  };

  const handleIconSelect = (iconName: string) => {
    onContentChange(iconName);
  };

  if (['divider', 'spacer'].includes(component.type)) {
    return null;
  }

  if (component.type === 'image') {
    return (
      <div>
        <label className="text-sm font-medium mb-2 block">{t('propertyEditor.content')}</label>
        <input
          type="url"
          value={component.content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder={t('propertyEditor.placeholders.imageUrl')}
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>
    );
  }

  if (component.type === 'video') {
    return (
      <div>
        <label className="text-sm font-medium mb-2 block">{t('propertyEditor.content')}</label>
        <input
          type="url"
          value={component.content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder={t('propertyEditor.placeholders.videoUrl')}
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>
    );
  }

  if (component.type === 'icon') {
    return (
      <div>
        <label className="text-sm font-medium mb-2 block">{t('propertyEditor.content')}</label>
        <div className="space-y-2">
          <input
            type="text"
            value={component.content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder={t('propertyEditor.placeholders.iconName')}
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
          <IconSelector
            currentIcon={component.content}
            onIconSelect={handleIconSelect}
          >
            <Button variant="outline" size="sm" className="w-full">
              <Search className="w-4 h-4 mr-2" />
              {t('propertyEditor.buttons.selectIcon')}
            </Button>
          </IconSelector>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">{t('propertyEditor.content')}</label>
      <Textarea
        value={component.content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder={getContentPlaceholder()}
        rows={3}
        className="text-sm"
      />
    </div>
  );
};

export default ContentEditor;
