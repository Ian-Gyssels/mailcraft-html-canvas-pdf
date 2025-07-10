
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Type, Image, MousePointer, Minus, Space, Header, Footer } from 'lucide-react';

const components = [
  { id: 'header', name: 'Header', icon: Header, description: 'Titel sectie' },
  { id: 'text', name: 'Tekst', icon: Type, description: 'Tekst blok' },
  { id: 'image', name: 'Afbeelding', icon: Image, description: 'Afbeelding' },
  { id: 'button', name: 'Knop', icon: MousePointer, description: 'Call-to-action knop' },
  { id: 'divider', name: 'Scheiding', icon: Minus, description: 'Horizontale lijn' },
  { id: 'spacer', name: 'Ruimte', icon: Space, description: 'Lege ruimte' },
  { id: 'footer', name: 'Footer', icon: Footer, description: 'Voettekst' },
];

const ComponentLibrary = () => {
  return (
    <Droppable droppableId="component-library" isDropDisabled={true}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
          {components.map((component, index) => (
            <Draggable key={component.id} draggableId={component.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`p-3 border rounded-lg cursor-grab hover:shadow-md transition-all duration-200 ${
                    snapshot.isDragging 
                      ? 'bg-blue-50 border-blue-300 shadow-lg' 
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <component.icon className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">{component.name}</p>
                      <p className="text-xs text-gray-500">{component.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ComponentLibrary;
