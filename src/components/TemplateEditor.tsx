
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
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === 'component-library' && destination.droppableId === 'template-canvas') {
      // Add new component from library to canvas
      const newComponent: TemplateComponent = {
        id: `component-${Date.now()}`,
        type: result.draggableId as TemplateComponent['type'],
        content: getDefaultContent(result.draggableId as TemplateComponent['type']),
        styles: getDefaultStyles(result.draggableId as TemplateComponent['type'])
      };

      const newComponents = [...template.components];
      newComponents.splice(destination.index, 0, newComponent);
      onTemplateUpdate({ ...template, components: newComponents });
    } else if (source.droppableId === 'template-canvas' && destination.droppableId === 'template-canvas') {
      // Reorder components within canvas
      const newComponents = Array.from(template.components);
      const [reorderedItem] = newComponents.splice(source.index, 1);
      newComponents.splice(destination.index, 0, reorderedItem);
      onTemplateUpdate({ ...template, components: newComponents });
    }
  };

  const getDefaultContent = (type: string): string => {
    switch (type) {
      case 'text': return 'Typ hier je tekst...';
      case 'header': return 'Header Titel';
      case 'button': return 'Klik Hier';
      case 'image': return 'https://via.placeholder.com/400x200';
      case 'divider': return '';
      case 'spacer': return '';
      case 'footer': return 'Footer tekst';
      case 'quote': return 'Dit is een inspirerend citaat';
      case 'list': return 'Eerste item\nTweede item\nDerde item';
      case 'card': return 'Kaart inhoud';
      case 'testimonial': return 'Geweldige service! Zeer tevreden met het resultaat.';
      case 'video': return 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      case 'icon': return 'star';
      case 'grid': return '';
      default: return '';
    }
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
    const newComponents = template.components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    );
    onTemplateUpdate({ ...template, components: newComponents });
  };

  const handleDeleteComponent = (id: string) => {
    const newComponents = template.components.filter(comp => comp.id !== id);
    onTemplateUpdate({ ...template, components: newComponents });
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  };

  const selectedComponentData = selectedComponent 
    ? template.components.find(c => c.id === selectedComponent) 
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
              <h3 className="font-semibold mb-4 text-gray-800">Componenten</h3>
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
