
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { TemplateComponent } from '../types/template';

interface PropertyEditorProps {
  component: TemplateComponent | null;
  onUpdateComponent: (updates: Partial<TemplateComponent>) => void;
  onDeleteComponent: () => void;
}

const PropertyEditor: React.FC<PropertyEditorProps> = ({
  component,
  onUpdateComponent,
  onDeleteComponent
}) => {
  if (!component) {
    return (
      <div className="text-sm text-gray-500">
        Selecteer een component om eigenschappen te bewerken
      </div>
    );
  }

  const handleContentChange = (content: string) => {
    onUpdateComponent({ content });
  };

  const handleStyleChange = (property: string, value: string) => {
    onUpdateComponent({
      styles: { ...component.styles, [property]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium capitalize">{component.type}</h4>
        <Button
          variant="destructive"
          size="icon"
          onClick={onDeleteComponent}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Content Editor */}
      {component.type !== 'divider' && component.type !== 'spacer' && (
        <div>
          <label className="text-sm font-medium mb-2 block">Inhoud</label>
          {component.type === 'image' ? (
            <input
              type="url"
              value={component.content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Afbeelding URL"
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          ) : (
            <Textarea
              value={component.content}
              onChange={(e) => handleContentChange(e.target.value)}
              rows={3}
              className="text-sm"
            />
          )}
        </div>
      )}

      {/* Style Editors */}
      <div className="space-y-3">
        <h5 className="text-sm font-medium">Styling</h5>
        
        {/* Font Size */}
        {(component.type === 'text' || component.type === 'header' || component.type === 'button' || component.type === 'footer') && (
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Lettergrootte</label>
            <input
              type="text"
              value={component.styles.fontSize || ''}
              onChange={(e) => handleStyleChange('fontSize', e.target.value)}
              placeholder="16px"
              className="w-full px-2 py-1 border rounded text-xs"
            />
          </div>
        )}

        {/* Color */}
        {component.type !== 'divider' && component.type !== 'spacer' && (
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Tekstkleur</label>
            <input
              type="color"
              value={component.styles.color || '#000000'}
              onChange={(e) => handleStyleChange('color', e.target.value)}
              className="w-full h-8 border rounded"
            />
          </div>
        )}

        {/* Background Color */}
        {(component.type === 'button' || component.type === 'text' || component.type === 'header') && (
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Achtergrondkleur</label>
            <input
              type="color"
              value={component.styles.backgroundColor || '#ffffff'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="w-full h-8 border rounded"
            />
          </div>
        )}

        {/* Text Align */}
        {(component.type === 'text' || component.type === 'header' || component.type === 'button' || component.type === 'footer') && (
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Uitlijning</label>
            <select
              value={component.styles.textAlign || 'left'}
              onChange={(e) => handleStyleChange('textAlign', e.target.value)}
              className="w-full px-2 py-1 border rounded text-xs"
            >
              <option value="left">Links</option>
              <option value="center">Midden</option>
              <option value="right">Rechts</option>
            </select>
          </div>
        )}

        {/* Padding */}
        <div>
          <label className="text-xs text-gray-600 mb-1 block">Padding</label>
          <input
            type="text"
            value={component.styles.padding || ''}
            onChange={(e) => handleStyleChange('padding', e.target.value)}
            placeholder="10px"
            className="w-full px-2 py-1 border rounded text-xs"
          />
        </div>

        {/* Height for spacer */}
        {component.type === 'spacer' && (
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Hoogte</label>
            <input
              type="text"
              value={component.styles.height || ''}
              onChange={(e) => handleStyleChange('height', e.target.value)}
              placeholder="20px"
              className="w-full px-2 py-1 border rounded text-xs"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyEditor;
