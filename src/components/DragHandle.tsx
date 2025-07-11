import React from 'react';
import { GripVertical } from 'lucide-react';

interface DragHandleProps {
  isDragging?: boolean;
}

const DragHandle: React.FC<DragHandleProps> = ({ isDragging }) => {
  return (
    <div 
      className={`
        absolute -left-8 top-1/2 transform -translate-y-1/2 
        opacity-0 group-hover:opacity-100 transition-all duration-200
        bg-blue-500 hover:bg-blue-600 text-white rounded-md p-1 cursor-grab
        shadow-lg z-10
        ${isDragging ? 'opacity-100 cursor-grabbing' : ''}
      `}
      title="Drag to reorder"
    >
      <GripVertical className="w-4 h-4" />
    </div>
  );
};

export default DragHandle;