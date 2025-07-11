
import React from 'react';
import { TemplateComponent } from '../../types/template';
import { componentConfigs } from '../../config/components';
import { useTranslation } from '../../hooks/useTranslation';

interface StyleEditorProps {
  component: TemplateComponent;
  onStyleChange: (property: string, value: string) => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ component, onStyleChange }) => {
  const { t } = useTranslation();
  const config = componentConfigs[component.type];
  const availableProperties = config.styleProperties;

  const renderStyleProperty = (property: string) => {
    switch (property) {
      case 'fontSize':
        return (
          <div key={property}>
            <label className="text-xs text-gray-600 mb-1 block">{t('propertyEditor.labels.fontSize')}</label>
            <input
              type="text"
              value={component.styles.fontSize || ''}
              onChange={(e) => onStyleChange('fontSize', e.target.value)}
              placeholder="16px"
              className="w-full px-2 py-1 border rounded text-xs"
            />
          </div>
        );
      case 'color':
        return (
          <div key={property}>
            <label className="text-xs text-gray-600 mb-1 block">{t('propertyEditor.labels.color')}</label>
            <input
              type="color"
              value={component.styles.color || '#000000'}
              onChange={(e) => onStyleChange('color', e.target.value)}
              className="w-full h-8 border rounded"
            />
          </div>
        );
      case 'backgroundColor':
        return (
          <div key={property}>
            <label className="text-xs text-gray-600 mb-1 block">{t('propertyEditor.labels.backgroundColor')}</label>
            <input
              type="color"
              value={component.styles.backgroundColor || '#ffffff'}
              onChange={(e) => onStyleChange('backgroundColor', e.target.value)}
              className="w-full h-8 border rounded"
            />
          </div>
        );
      case 'textAlign':
        return (
          <div key={property}>
            <label className="text-xs text-gray-600 mb-1 block">{t('propertyEditor.labels.textAlign')}</label>
            <select
              value={component.styles.textAlign || 'left'}
              onChange={(e) => onStyleChange('textAlign', e.target.value)}
              className="w-full px-2 py-1 border rounded text-xs"
            >
              <option value="left">{t('propertyEditor.options.left')}</option>
              <option value="center">{t('propertyEditor.options.center')}</option>
              <option value="right">{t('propertyEditor.options.right')}</option>
            </select>
          </div>
        );
      case 'fontWeight':
        return (
          <div key={property}>
            <label className="text-xs text-gray-600 mb-1 block">{t('propertyEditor.labels.fontWeight')}</label>
            <select
              value={component.styles.fontWeight || 'normal'}
              onChange={(e) => onStyleChange('fontWeight', e.target.value)}
              className="w-full px-2 py-1 border rounded text-xs"
            >
              <option value="normal">{t('propertyEditor.options.normal')}</option>
              <option value="bold">{t('propertyEditor.options.bold')}</option>
            </select>
          </div>
        );
      case 'padding':
        return (
          <div key={property}>
            <label className="text-xs text-gray-600 mb-1 block">{t('propertyEditor.labels.padding')}</label>
            <input
              type="text"
              value={component.styles.padding || ''}
              onChange={(e) => onStyleChange('padding', e.target.value)}
              placeholder="10px"
              className="w-full px-2 py-1 border rounded text-xs"
            />
          </div>
        );
      case 'margin':
        return (
          <div key={property}>
            <label className="text-xs text-gray-600 mb-1 block">{t('propertyEditor.labels.margin')}</label>
            <input
              type="text"
              value={component.styles.margin || ''}
              onChange={(e) => onStyleChange('margin', e.target.value)}
              placeholder="10px"
              className="w-full px-2 py-1 border rounded text-xs"
            />
          </div>
        );
      case 'width':
        return (
          <div key={property}>
            <label className="text-xs text-gray-600 mb-1 block">{t('propertyEditor.labels.width')}</label>
            <input
              type="text"
              value={component.styles.width || ''}
              onChange={(e) => onStyleChange('width', e.target.value)}
              placeholder="100px"
              className="w-full px-2 py-1 border rounded text-xs"
            />
          </div>
        );
      case 'height':
        return (
          <div key={property}>
            <label className="text-xs text-gray-600 mb-1 block">{t('propertyEditor.labels.height')}</label>
            <input
              type="text"
              value={component.styles.height || ''}
              onChange={(e) => onStyleChange('height', e.target.value)}
              placeholder="20px"
              className="w-full px-2 py-1 border rounded text-xs"
            />
          </div>
        );
      case 'border':
        return (
          <div key={property}>
            <label className="text-xs text-gray-600 mb-1 block">{t('propertyEditor.labels.border')}</label>
            <input
              type="text"
              value={component.styles.border || ''}
              onChange={(e) => onStyleChange('border', e.target.value)}
              placeholder="1px solid #ccc"
              className="w-full px-2 py-1 border rounded text-xs"
            />
          </div>
        );
      case 'borderRadius':
        return (
          <div key={property}>
            <label className="text-xs text-gray-600 mb-1 block">{t('propertyEditor.labels.borderRadius')}</label>
            <input
              type="text"
              value={component.styles.borderRadius || ''}
              onChange={(e) => onStyleChange('borderRadius', e.target.value)}
              placeholder="4px"
              className="w-full px-2 py-1 border rounded text-xs"
            />
          </div>
        );
      case 'boxShadow':
        return (
          <div key={property}>
            <label className="text-xs text-gray-600 mb-1 block">{t('propertyEditor.labels.boxShadow')}</label>
            <input
              type="text"
              value={component.styles.boxShadow || ''}
              onChange={(e) => onStyleChange('boxShadow', e.target.value)}
              placeholder="0 2px 4px rgba(0,0,0,0.1)"
              className="w-full px-2 py-1 border rounded text-xs"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium">{t('propertyEditor.style')}</h5>
      {availableProperties.map(property => renderStyleProperty(property))}
    </div>
  );
};

export default StyleEditor;
