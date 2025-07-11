
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Trash2, Edit } from 'lucide-react';
import { TemplateComponent } from '../types/template';
import ComponentRenderer from './canvas/ComponentRenderer';
import DragHandle from './DragHandle';
import { useTranslation } from '../hooks/useTranslation';

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
  const { t } = useTranslation();
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
                <p>{t('templateCanvas.dragComponentsHere')}</p>
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
                    {/* Drag Handle */}
                    <div {...provided.dragHandleProps}>
                      <DragHandle isDragging={snapshot.isDragging} />
                    </div>
                    
                    {/* Component Content */}
                    <div
                      onClick={() => onSelectComponent(component.id)}
                      className="cursor-pointer"
                    >
                      <ComponentRenderer
                        component={component}
                        selectedComponent={selectedComponent}
                        onSelectComponent={onSelectComponent}
                        onUpdateComponent={onUpdateComponent}
                        onDeleteComponent={onDeleteComponent}
                      />
                    </div>
                    
                    {selectedComponent === component.id && !snapshot.isDragging && (
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
