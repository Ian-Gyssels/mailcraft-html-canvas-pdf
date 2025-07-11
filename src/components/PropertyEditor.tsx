
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Trash2, Search } from 'lucide-react';
import { TemplateComponent } from '../types/template';
import IconSelector from './IconSelector';
import * as LucideIcons from 'lucide-react';

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

  const handleLinkChange = (link: string) => {
    onUpdateComponent({ link });
  };

  const handleStyleChange = (property: string, value: string) => {
    onUpdateComponent({
      styles: { ...component.styles, [property]: value }
    });
  };

  const handleGridColumnsChange = (columns: number) => {
    onUpdateComponent({ gridColumns: columns });
  };

  const handleIconSelect = (iconName: string) => {
    onUpdateComponent({ content: iconName });
  };

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

  // Define which properties apply to which components
  const hasContent = !['divider', 'spacer'].includes(component.type);
  const hasLink = ['button', 'card'].includes(component.type);
  const hasGridColumns = component.type === 'grid';
  const hasFontSize = ['text', 'header', 'button', 'footer', 'quote', 'testimonial', 'card', 'list'].includes(component.type);
  const hasColor = !['divider', 'spacer'].includes(component.type);
  const hasBackgroundColor = ['button', 'text', 'header', 'card', 'quote', 'testimonial'].includes(component.type);
  const hasTextAlign = ['text', 'header', 'button', 'footer', 'quote', 'testimonial', 'card', 'list'].includes(component.type);
  const hasBorderRadius = ['button', 'card', 'image'].includes(component.type);
  const hasHeight = component.type === 'spacer';

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
      {hasContent && (
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
          ) : component.type === 'video' ? (
            <input
              type="url"
              value={component.content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="YouTube video URL"
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          ) : component.type === 'icon' ? (
            <div className="space-y-2">
              <input
                type="text"
                value={component.content}
                onChange={(e) => handleContentChange(e.target.value)}
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
          ) : (
            <Textarea
              value={component.content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder={getContentPlaceholder()}
              rows={3}
              className="text-sm"
            />
          )}
        </div>
      )}

      {/* Link Editor */}
      {hasLink && (
        <div>
          <label className="text-sm font-medium mb-2 block">Link</label>
          <Input
            type="url"
            value={component.link || ''}
            onChange={(e) => handleLinkChange(e.target.value)}
            placeholder="https://example.com"
            className="text-sm"
          />
        </div>
      )}

      {/* Grid Columns */}
      {hasGridColumns && (
        <div>
          <label className="text-sm font-medium mb-2 block">Kolommen</label>
          <Input
            type="number"
            min="1"
            max="6"
            value={component.gridColumns || 2}
            onChange={(e) => handleGridColumnsChange(parseInt(e.target.value))}
            className="text-sm"
          />
        </div>
      )}

      {/* Style Editors */}
      <div className="space-y-3">
        <h5 className="text-sm font-medium">Styling</h5>
        
        {/* Font Size */}
        {hasFontSize && (
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
        {hasColor && (
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
        {hasBackgroundColor && (
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
        {hasTextAlign && (
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
        {hasHeight && (
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

        {/* Border Radius */}
        {hasBorderRadius && (
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Border Radius</label>
            <input
              type="text"
              value={component.styles.borderRadius || ''}
              onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
              placeholder="6px"
              className="w-full px-2 py-1 border rounded text-xs"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyEditor;
