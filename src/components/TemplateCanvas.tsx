
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Trash2, Edit } from 'lucide-react';
import { TemplateComponent } from './TemplateEditor';
import ImageUpload from './ImageUpload';

interface TemplateCanvasProps {
  components: TemplateComponent[];
  selectedComponent: string | null;
  onSelectComponent: (id: string) => void;
  onUpdateComponent: (id: string, updates: Partial<TemplateComponent>) => void;
  onDeleteComponent: (id: string) => void;
}

const TemplateCanvas: React.FC<TemplateCanvasProps> = ({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onDeleteComponent
}) => {
  const renderComponent = (component: TemplateComponent) => {
    const isSelected = component.id === selectedComponent;
    
    const baseStyles = {
      ...component.styles,
      outline: isSelected ? '2px solid #3b82f6' : 'none',
      outlineOffset: isSelected ? '2px' : '0',
    };

    switch (component.type) {
      case 'header':
        return (
          <h1 
            style={baseStyles} 
            className="cursor-pointer"
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              onUpdateComponent(component.id, { content: e.target.textContent || '' });
            }}
          >
            {component.content}
          </h1>
        );
      
      case 'text':
        return (
          <div 
            style={baseStyles} 
            className="cursor-pointer"
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              onUpdateComponent(component.id, { content: e.target.textContent || '' });
            }}
          >
            {component.content}
          </div>
        );
      
      case 'image':
        return (
          <div style={{ outline: baseStyles.outline, outlineOffset: baseStyles.outlineOffset }}>
            <ImageUpload
              currentImage={component.content}
              onImageUpload={(imageUrl) => {
                onUpdateComponent(component.id, { content: imageUrl });
              }}
              onImageRemove={() => {
                onUpdateComponent(component.id, { content: 'https://via.placeholder.com/400x200' });
              }}
            />
          </div>
        );
      
      case 'button':
        return (
          <button 
            style={baseStyles}
            className="cursor-pointer px-4 py-2 border-none"
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              onUpdateComponent(component.id, { content: e.target.textContent || '' });
            }}
          >
            {component.content}
          </button>
        );
      
      case 'divider':
        return <hr style={baseStyles} className="cursor-pointer border-none" />;
      
      case 'spacer':
        return <div style={baseStyles} className="cursor-pointer" />;
      
      case 'footer':
        return (
          <footer 
            style={baseStyles} 
            className="cursor-pointer"
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={(e) => {
              onUpdateComponent(component.id, { content: e.target.textContent || '' });
            }}
          >
            {component.content}
          </footer>
        );
      
      default:
        return <div style={baseStyles}>Onbekend component</div>;
    }
  };

  return (
    <div className="min-h-[600px] bg-white">
      <Droppable droppableId="template-canvas">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`min-h-[600px] p-6 ${
              snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-white'
            }`}
            style={{ maxWidth: '600px', margin: '0 auto' }}
          >
            {components.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
                <p>Sleep componenten hierheen om je template te maken</p>
              </div>
            )}
            
            {components.map((component, index) => (
              <Draggable key={component.id} draggableId={component.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`relative group mb-2 ${
                      snapshot.isDragging ? 'opacity-50' : ''
                    }`}
                  >
                    <div
                      {...provided.dragHandleProps}
                      onClick={() => onSelectComponent(component.id)}
                    >
                      {renderComponent(component)}
                    </div>
                    
                    {selectedComponent === component.id && (
                      <div className="absolute top-0 right-0 flex gap-1 bg-white shadow-lg rounded border p-1">
                        <button
                          onClick={() => onSelectComponent(component.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onDeleteComponent(component.id)}
                          className="p-1 hover:bg-red-100 rounded text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TemplateCanvas;
