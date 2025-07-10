
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Download, FileText, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ComponentLibrary from './ComponentLibrary';
import TemplateCanvas from './TemplateCanvas';
import { exportToPDF, exportToHTML } from '../utils/exportUtils';

export interface TemplateComponent {
  id: string;
  type: 'text' | 'image' | 'button' | 'divider' | 'spacer' | 'header' | 'footer';
  content: string;
  styles: {
    fontSize?: string;
    color?: string;
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right';
    fontWeight?: string;
    borderRadius?: string;
    width?: string;
    height?: string;
  };
}

const TemplateEditor = () => {
  const [components, setComponents] = useState<TemplateComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState('Nieuwe Template');

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

      const newComponents = [...components];
      newComponents.splice(destination.index, 0, newComponent);
      setComponents(newComponents);
    } else if (source.droppableId === 'template-canvas' && destination.droppableId === 'template-canvas') {
      // Reorder components within canvas
      const newComponents = Array.from(components);
      const [reorderedItem] = newComponents.splice(source.index, 1);
      newComponents.splice(destination.index, 0, reorderedItem);
      setComponents(newComponents);
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
      default:
        return baseStyles;
    }
  };

  const handleExportPDF = async () => {
    await exportToPDF(components, templateName);
  };

  const handleExportHTML = () => {
    exportToHTML(components, templateName);
  };

  const handleSaveTemplate = () => {
    const templateData = {
      name: templateName,
      components: components,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem(`template-${Date.now()}`, JSON.stringify(templateData));
    console.log('Template opgeslagen!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white border-b shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="text-xl font-semibold bg-transparent border-none outline-none focus:bg-gray-50 rounded px-2"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSaveTemplate}>
              <Save className="w-4 h-4 mr-2" />
              Opslaan
            </Button>
            <Button variant="outline" onClick={handleExportHTML}>
              <FileText className="w-4 h-4 mr-2" />
              HTML Export
            </Button>
            <Button onClick={handleExportPDF} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Download className="w-4 h-4 mr-2" />
              PDF Export
            </Button>
          </div>
        </div>
      </div>

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
                components={components}
                selectedComponent={selectedComponent}
                onSelectComponent={setSelectedComponent}
                onUpdateComponent={(id, updates) => {
                  setComponents(prev => prev.map(comp => 
                    comp.id === id ? { ...comp, ...updates } : comp
                  ));
                }}
                onDeleteComponent={(id) => {
                  setComponents(prev => prev.filter(comp => comp.id !== id));
                }}
              />
            </Card>
          </div>

          <div className="col-span-3">
            <Card className="p-4 shadow-lg">
              <h3 className="font-semibold mb-4 text-gray-800">Eigenschappen</h3>
              {selectedComponent ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Component geselecteerd: {components.find(c => c.id === selectedComponent)?.type}
                  </p>
                  <p className="text-sm text-gray-500">
                    Eigenschappen editor komt hier...
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Selecteer een component om eigenschappen te bewerken
                </p>
              )}
            </Card>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TemplateEditor;
