
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Trash2, Edit, ExternalLink, Plus } from 'lucide-react';
import { TemplateComponent } from '../../types/template';
import ImageUpload from '../ImageUpload';
import * as LucideIcons from 'lucide-react';

interface ComponentRendererProps {
  component: TemplateComponent;
  selectedComponent: string | null;
  onSelectComponent: (id: string) => void;
  onUpdateComponent: (id: string, updates: Partial<TemplateComponent>) => void;
  onDeleteComponent: (id: string) => void;
  isNested?: boolean;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onDeleteComponent,
  isNested = false
}) => {
  const isSelected = component.id === selectedComponent;
  
  const baseStyles = {
    ...component.styles,
    outline: isSelected ? '2px solid #3b82f6' : 'none',
    outlineOffset: isSelected ? '2px' : '0',
  };

  const handleClick = (e: React.MouseEvent) => {
    if (component.link && (component.type === 'button' || component.type === 'card')) {
      e.preventDefault();
      window.open(component.link, '_blank');
    }
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

    case 'quote':
      return (
        <blockquote 
          style={baseStyles} 
          className="cursor-pointer border-l-4 border-gray-300 pl-4 italic"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={(e) => {
            onUpdateComponent(component.id, { content: e.target.textContent || '' });
          }}
        >
          "{component.content}"
        </blockquote>
      );

    case 'list':
      return (
        <ul style={baseStyles} className="cursor-pointer list-disc pl-6">
          {component.content.split('\n').filter(item => item.trim()).map((item, index) => (
            <li key={index} className="mb-1">{item}</li>
          ))}
        </ul>
      );

    case 'testimonial':
      return (
        <div style={baseStyles} className="cursor-pointer bg-gray-50 p-4 rounded-lg border">
          <p className="italic mb-2">"{component.content}"</p>
          <div className="text-sm text-gray-600">— Klant</div>
        </div>
      );

    case 'card':
      return (
        <Droppable droppableId={`card-${component.id}`}>
          {(provided, snapshot) => (
            <div 
              style={baseStyles} 
              className={`cursor-pointer border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow min-h-[100px] ${
                component.link ? 'hover:bg-gray-50' : ''
              } ${snapshot.isDraggingOver ? 'bg-blue-50 border-blue-300' : ''}`}
              onClick={handleClick}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="flex items-start justify-between">
                <div 
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    onUpdateComponent(component.id, { content: e.target.textContent || '' });
                  }}
                >
                  {component.content}
                </div>
                {component.link && <ExternalLink className="w-4 h-4 text-gray-400 ml-2" />}
              </div>
              
              {component.gridItems?.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`mt-2 ${snapshot.isDragging ? 'opacity-50' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectComponent(item.id);
                      }}
                    >
                      <ComponentRenderer
                        component={item}
                        selectedComponent={selectedComponent}
                        onSelectComponent={onSelectComponent}
                        onUpdateComponent={onUpdateComponent}
                        onDeleteComponent={onDeleteComponent}
                        isNested={true}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              
              {(!component.gridItems || component.gridItems.length === 0) && (
                <div className="flex items-center justify-center h-16 text-gray-400 border-2 border-dashed border-gray-300 rounded mt-2">
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="text-sm">Sleep componenten hierheen</span>
                </div>
              )}
              
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      );

    case 'grid':
      const gridColumns = component.gridColumns || 2;
      return (
        <div 
          style={{
            ...baseStyles,
            display: 'grid',
            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
            gap: '1rem'
          }} 
          className="cursor-pointer border-2 border-dashed border-gray-300 p-4 rounded-lg min-h-[150px]"
        >
          <Droppable droppableId={`grid-${component.id}`} direction="horizontal">
            {(provided, snapshot) => (
              <div 
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`col-span-full grid grid-cols-${gridColumns} gap-4 ${
                  snapshot.isDraggingOver ? 'bg-blue-50' : ''
                }`}
                style={{
                  gridTemplateColumns: `repeat(${gridColumns}, 1fr)`
                }}
              >
                {component.gridItems?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${snapshot.isDragging ? 'opacity-50' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectComponent(item.id);
                        }}
                      >
                        <ComponentRenderer
                          component={item}
                          selectedComponent={selectedComponent}
                          onSelectComponent={onSelectComponent}
                          onUpdateComponent={onUpdateComponent}
                          onDeleteComponent={onDeleteComponent}
                          isNested={true}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                
                {Array.from({ length: Math.max(0, gridColumns - (component.gridItems?.length || 0)) }).map((_, index) => (
                  <div key={`empty-${index}`} className="bg-gray-50 p-4 rounded border-2 border-dashed border-gray-200 flex items-center justify-center text-center text-gray-500 min-h-[80px]">
                    <div>
                      <Plus className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-xs">Grid Item</span>
                    </div>
                  </div>
                ))}
                
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      );

    case 'video':
      const videoId = component.content.includes('youtube.com') || component.content.includes('youtu.be') 
        ? component.content.split('v=')[1]?.split('&')[0] || component.content.split('youtu.be/')[1]?.split('?')[0]
        : null;
      
      return (
        <div style={{ outline: baseStyles.outline, outlineOffset: baseStyles.outlineOffset }}>
          {videoId ? (
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allowFullScreen
              className="rounded"
            />
          ) : (
            <div className="bg-gray-100 p-8 text-center rounded border-2 border-dashed">
              <p className="text-gray-500">Voer een YouTube URL in</p>
            </div>
          )}
        </div>
      );

    case 'icon':
      const IconComponent = (LucideIcons as any)[component.content] || LucideIcons.Star;
      return (
        <div style={baseStyles} className="cursor-pointer flex justify-center">
          <IconComponent className="w-8 h-8" />
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
          className={`cursor-pointer px-4 py-2 border-none inline-flex items-center gap-2 ${
            component.link ? 'hover:opacity-80' : ''
          }`}
          onClick={handleClick}
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={(e) => {
            onUpdateComponent(component.id, { content: e.target.textContent || '' });
          }}
        >
          {component.content}
          {component.link && <ExternalLink className="w-4 h-4" />}
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

export default ComponentRenderer;
