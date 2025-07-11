
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { TemplateComponent } from '../../types/template';
import IconSelector from '../IconSelector';

interface ContentEditorProps {
  component: TemplateComponent;
  onContentChange: (content: string) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ component, onContentChange }) => {
  const getContentPlaceholder = () => {
    switch (component.type) {
      case 'quote': return 'Voer je citaat in...';
      case 'video': return 'YouTube video URL';
      case 'list': return 'Item 1\nItem 2\nItem 3';
      case 'testimonial': return 'Klantrecensie tekst...';
      case 'card': return 'Kaart inhoud...';
      case 'icon': return 'star';
      default: return 'Voer inhoud in...';
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
        <label className="text-sm font-medium mb-2 block">Inhoud</label>
        <input
          type="url"
          value={component.content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Afbeelding URL"
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>
    );
  }

  if (component.type === 'video') {
    return (
      <div>
        <label className="text-sm font-medium mb-2 block">Inhoud</label>
        <input
          type="url"
          value={component.content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="YouTube video URL"
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
      </div>
    );
  }

  if (component.type === 'icon') {
    return (
      <div>
        <label className="text-sm font-medium mb-2 block">Inhoud</label>
        <div className="space-y-2">
          <input
            type="text"
            value={component.content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Lucide icon naam (bijv. star, heart)"
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
          <IconSelector
            currentIcon={component.content}
            onIconSelect={handleIconSelect}
          >
            <Button variant="outline" size="sm" className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Selecteer icoon
            </Button>
          </IconSelector>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Inhoud</label>
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
