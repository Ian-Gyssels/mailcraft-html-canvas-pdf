
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { TemplateComponent } from '../types/template';
import ContentEditor from './property-editor/ContentEditor';
import StyleEditor from './property-editor/StyleEditor';
import LinkEditor from './property-editor/LinkEditor';
import GridEditor from './property-editor/GridEditor';

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

  const hasLink = ['button', 'card'].includes(component.type);
  const hasGridColumns = component.type === 'grid';

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

      <ContentEditor 
        component={component} 
        onContentChange={handleContentChange} 
      />

      {hasLink && (
        <LinkEditor 
          link={component.link} 
          onLinkChange={handleLinkChange} 
        />
      )}

      {hasGridColumns && (
        <GridEditor 
          gridColumns={component.gridColumns} 
          onGridColumnsChange={handleGridColumnsChange} 
        />
      )}

      <StyleEditor 
        component={component} 
        onStyleChange={handleStyleChange} 
      />
    </div>
  );
};

export default PropertyEditor;
