
import React from 'react';
import { TemplateComponent } from '../../types/template';

interface StyleEditorProps {
  component: TemplateComponent;
  onStyleChange: (property: string, value: string) => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ component, onStyleChange }) => {
  const hasFontSize = ['text', 'header', 'button', 'footer', 'quote', 'testimonial', 'card', 'list'].includes(component.type);
  const hasColor = !['divider', 'spacer'].includes(component.type);
  const hasBackgroundColor = ['button', 'text', 'header', 'card', 'quote', 'testimonial'].includes(component.type);
  const hasTextAlign = ['text', 'header', 'button', 'footer', 'quote', 'testimonial', 'card', 'list'].includes(component.type);
  const hasHeight = component.type === 'spacer';

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium">Styling</h5>
      
      {hasFontSize && (
        <div>
          <label className="text-xs text-gray-600 mb-1 block">Lettergrootte</label>
          <input
            type="text"
            value={component.styles.fontSize || ''}
            onChange={(e) => onStyleChange('fontSize', e.target.value)}
            placeholder="16px"
            className="w-full px-2 py-1 border rounded text-xs"
          />
        </div>
      )}

      {hasColor && (
        <div>
          <label className="text-xs text-gray-600 mb-1 block">Tekstkleur</label>
          <input
            type="color"
            value={component.styles.color || '#000000'}
            onChange={(e) => onStyleChange('color', e.target.value)}
            className="w-full h-8 border rounded"
          />
        </div>
      )}

      {hasBackgroundColor && (
        <div>
          <label className="text-xs text-gray-600 mb-1 block">Achtergrondkleur</label>
          <input
            type="color"
            value={component.styles.backgroundColor || '#ffffff'}
            onChange={(e) => onStyleChange('backgroundColor', e.target.value)}
            className="w-full h-8 border rounded"
          />
        </div>
      )}

      {hasTextAlign && (
        <div>
          <label className="text-xs text-gray-600 mb-1 block">Uitlijning</label>
          <select
            value={component.styles.textAlign || 'left'}
            onChange={(e) => onStyleChange('textAlign', e.target.value)}
            className="w-full px-2 py-1 border rounded text-xs"
          >
            <option value="left">Links</option>
            <option value="center">Midden</option>
            <option value="right">Rechts</option>
          </select>
        </div>
      )}

      <div>
        <label className="text-xs text-gray-600 mb-1 block">Padding</label>
        <input
          type="text"
          value={component.styles.padding || ''}
          onChange={(e) => onStyleChange('padding', e.target.value)}
          placeholder="10px"
          className="w-full px-2 py-1 border rounded text-xs"
        />
      </div>

      {hasHeight && (
        <div>
          <label className="text-xs text-gray-600 mb-1 block">Hoogte</label>
          <input
            type="text"
            value={component.styles.height || ''}
            onChange={(e) => onStyleChange('height', e.target.value)}
            placeholder="20px"
            className="w-full px-2 py-1 border rounded text-xs"
          />
        </div>
      )}
    </div>
  );
};

export default StyleEditor;
