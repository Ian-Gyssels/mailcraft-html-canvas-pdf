import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Card } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import ComponentLibrary from './ComponentLibrary';
import TemplateCanvas from './TemplateCanvas';
import PropertyEditor from './PropertyEditor';
import TemplateHeader from './TemplateHeader';
import { exportToPDF, exportToHTML } from '../utils/exportUtils';
import { Template, TemplateComponent } from '../types/template';
import { componentConfigs } from '../config/components';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSelector from './LanguageSelector';

interface TemplateEditorProps {
  template: Template;
  onTemplateUpdate: (template: Template) => void;
  onSave: () => void;
  onBackToList: () => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({
  template,
  onTemplateUpdate,
  onSave,
  onBackToList
}) => {
  const { t } = useTranslation();
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Adding new component from library to main canvas
    if (source.droppableId === 'component-library' && destination.droppableId === 'template-canvas') {
      const newComponent: TemplateComponent = {
        id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: result.draggableId as TemplateComponent['type'],
        content: getDefaultContent(result.draggableId as TemplateComponent['type']),
        styles: getDefaultStyles(result.draggableId as TemplateComponent['type'])
      };

      const newComponents = [...template.components];
      newComponents.splice(destination.index, 0, newComponent);
      onTemplateUpdate({ ...template, components: newComponents });
      return;
    }

    // Reordering components within main canvas
    if (source.droppableId === 'template-canvas' && destination.droppableId === 'template-canvas') {
      const newComponents = Array.from(template.components);
      const [reorderedItem] = newComponents.splice(source.index, 1);
      newComponents.splice(destination.index, 0, reorderedItem);
      onTemplateUpdate({ ...template, components: newComponents });
      return;
    }

    // Adding component from library to grid
    if (source.droppableId === 'component-library' && destination.droppableId.startsWith('grid-')) {
      const gridId = destination.droppableId.replace('grid-', '');
      const newComponent: TemplateComponent = {
        id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: result.draggableId as TemplateComponent['type'],
        content: getDefaultContent(result.draggableId as TemplateComponent['type']),
        styles: getDefaultStyles(result.draggableId as TemplateComponent['type'])
      };

      const updateGridItems = (components: TemplateComponent[]): TemplateComponent[] => {
        return components.map(comp => {
          if (comp.id === gridId) {
            const gridItems = comp.gridItems || [];
            gridItems.splice(destination.index, 0, newComponent);
            return { ...comp, gridItems };
          }
          if (comp.gridItems) {
            return { ...comp, gridItems: updateGridItems(comp.gridItems) };
          }
          return comp;
        });
      };

      const newComponents = updateGridItems(template.components);
      onTemplateUpdate({ ...template, components: newComponents });
      return;
    }

    // Adding component from library to card
    if (source.droppableId === 'component-library' && destination.droppableId.startsWith('card-')) {
      const cardId = destination.droppableId.replace('card-', '');
      const newComponent: TemplateComponent = {
        id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: result.draggableId as TemplateComponent['type'],
        content: getDefaultContent(result.draggableId as TemplateComponent['type']),
        styles: getDefaultStyles(result.draggableId as TemplateComponent['type'])
      };

      const updateCardItems = (components: TemplateComponent[]): TemplateComponent[] => {
        return components.map(comp => {
          if (comp.id === cardId) {
            const gridItems = comp.gridItems || [];
            gridItems.splice(destination.index, 0, newComponent);
            return { ...comp, gridItems };
          }
          if (comp.gridItems) {
            return { ...comp, gridItems: updateCardItems(comp.gridItems) };
          }
          return comp;
        });
      };

      const newComponents = updateCardItems(template.components);
      onTemplateUpdate({ ...template, components: newComponents });
      return;
    }

    // Reordering within grid
    if (source.droppableId.startsWith('grid-') && destination.droppableId.startsWith('grid-')) {
      const sourceGridId = source.droppableId.replace('grid-', '');
      const destGridId = destination.droppableId.replace('grid-', '');
      
      if (sourceGridId === destGridId) {
        // Same grid reordering
        const updateGridReorder = (components: TemplateComponent[]): TemplateComponent[] => {
          return components.map(comp => {
            if (comp.id === sourceGridId) {
              const gridItems = Array.from(comp.gridItems || []);
              const [reorderedItem] = gridItems.splice(source.index, 1);
              gridItems.splice(destination.index, 0, reorderedItem);
              return { ...comp, gridItems };
            }
            if (comp.gridItems) {
              return { ...comp, gridItems: updateGridReorder(comp.gridItems) };
            }
            return comp;
          });
        };

        const newComponents = updateGridReorder(template.components);
        onTemplateUpdate({ ...template, components: newComponents });
      }
      return;
    }

    // Reordering within card
    if (source.droppableId.startsWith('card-') && destination.droppableId.startsWith('card-')) {
      const sourceCardId = source.droppableId.replace('card-', '');
      const destCardId = destination.droppableId.replace('card-', '');
      
      if (sourceCardId === destCardId) {
        // Same card reordering
        const updateCardReorder = (components: TemplateComponent[]): TemplateComponent[] => {
          return components.map(comp => {
            if (comp.id === sourceCardId) {
              const gridItems = Array.from(comp.gridItems || []);
              const [reorderedItem] = gridItems.splice(source.index, 1);
              gridItems.splice(destination.index, 0, reorderedItem);
              return { ...comp, gridItems };
            }
            if (comp.gridItems) {
              return { ...comp, gridItems: updateCardReorder(comp.gridItems) };
            }
            return comp;
          });
        };

        const newComponents = updateCardReorder(template.components);
        onTemplateUpdate({ ...template, components: newComponents });
      }
      return;
    }
  };

  const getDefaultContent = (type: string): string => {
    const config = componentConfigs[type];
    return config ? config.defaultContent : '';
  };

  const getDefaultStyles = (type: string) => {
    const baseStyles = {
      padding: '10px',
      textAlign: 'left' as const
    };

    switch (type) {
      case 'header':
        return { ...baseStyles, fontSize: '24px', fontWeight: 'bold', color: '#1f2937' };
      case 'text':
        return { ...baseStyles, fontSize: '16px', color: '#374151' };
      case 'quote':
        return { ...baseStyles, fontSize: '18px', color: '#4b5563', fontWeight: '300' };
      case 'list':
        return { ...baseStyles, fontSize: '16px', color: '#374151' };
      case 'card':
        return { ...baseStyles, backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb' };
      case 'testimonial':
        return { ...baseStyles, backgroundColor: '#f9fafb', borderRadius: '8px', fontSize: '16px', color: '#374151' };
      case 'button':
        return { 
          ...baseStyles, 
          backgroundColor: '#3b82f6', 
          color: '#ffffff', 
          borderRadius: '6px',
          textAlign: 'center' as const,
          fontWeight: 'bold'
        };
      case 'footer':
        return { ...baseStyles, fontSize: '14px', color: '#6b7280', textAlign: 'center' as const };
      case 'divider':
        return { height: '1px', backgroundColor: '#e5e7eb', width: '100%' };
      case 'spacer':
        return { height: '20px', width: '100%' };
      case 'grid':
        return { padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' };
      case 'video':
        return { width: '100%' };
      case 'icon':
        return { ...baseStyles, textAlign: 'center' as const, color: '#3b82f6' };
      default:
        return baseStyles;
    }
  };

  const handleUpdateComponent = (id: string, updates: Partial<TemplateComponent>) => {
    const updateComponentRecursively = (components: TemplateComponent[]): TemplateComponent[] => {
      return components.map(comp => {
        if (comp.id === id) {
          return { ...comp, ...updates };
        }
        if (comp.gridItems) {
          return { ...comp, gridItems: updateComponentRecursively(comp.gridItems) };
        }
        return comp;
      });
    };

    const newComponents = updateComponentRecursively(template.components);
    onTemplateUpdate({ ...template, components: newComponents });
  };

  const handleDeleteComponent = (id: string) => {
    const deleteComponentRecursively = (components: TemplateComponent[]): TemplateComponent[] => {
      return components.filter(comp => comp.id !== id).map(comp => {
        if (comp.gridItems) {
          return { ...comp, gridItems: deleteComponentRecursively(comp.gridItems) };
        }
        return comp;
      });
    };

    const newComponents = deleteComponentRecursively(template.components);
    onTemplateUpdate({ ...template, components: newComponents });
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  };

  const findComponentById = (components: TemplateComponent[], id: string): TemplateComponent | null => {
    for (const comp of components) {
      if (comp.id === id) return comp;
      if (comp.gridItems) {
        const found = findComponentById(comp.gridItems, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedComponentData = selectedComponent 
    ? findComponentById(template.components, selectedComponent)
    : null;

  const handleExportPDF = async () => {
    await exportToPDF(template.components, template.name);
  };

  const handleExportHTML = () => {
    exportToHTML(template.components, template.name);
  };

  const handleTemplateNameChange = (name: string) => {
    onTemplateUpdate({ ...template, name });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <TemplateHeader
        template={template}
        onTemplateNameChange={handleTemplateNameChange}
        onSave={onSave}
        onExportHTML={handleExportHTML}
        onExportPDF={handleExportPDF}
        onBackToList={onBackToList}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 p-6">
          <div className="col-span-3">
            <Card className="p-4 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">{t('componentLibrary.title') || 'Componenten'}</h3>
                <LanguageSelector />
              </div>
              <ComponentLibrary />
            </Card>
          </div>

          <div className="col-span-6">
            <Card className="shadow-lg">
              <div className="bg-gray-50 p-3 border-b">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span className="font-medium">Template Preview</span>
                </div>
              </div>
              <TemplateCanvas 
                components={template.components}
                selectedComponent={selectedComponent}
                onSelectComponent={setSelectedComponent}
                onUpdateComponent={handleUpdateComponent}
                onDeleteComponent={handleDeleteComponent}
              />
            </Card>
          </div>

          <div className="col-span-3">
            <Card className="p-4 shadow-lg">
              <h3 className="font-semibold mb-4 text-gray-800">Eigenschappen</h3>
              <PropertyEditor
                component={selectedComponentData}
                onUpdateComponent={(updates) => {
                  if (selectedComponent) {
                    handleUpdateComponent(selectedComponent, updates);
                  }
                }}
                onDeleteComponent={() => {
                  if (selectedComponent) {
                    handleDeleteComponent(selectedComponent);
                  }
                }}
              />
            </Card>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TemplateEditor;
