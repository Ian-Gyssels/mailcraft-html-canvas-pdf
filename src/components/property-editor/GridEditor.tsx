
import React from 'react';
import { Input } from '@/components/ui/input';

interface GridEditorProps {
  gridColumns?: number;
  onGridColumnsChange: (columns: number) => void;
}

const GridEditor: React.FC<GridEditorProps> = ({ gridColumns, onGridColumnsChange }) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Kolommen</label>
      <Input
        type="number"
        min="1"
        max="6"
        value={gridColumns || 2}
        onChange={(e) => onGridColumnsChange(parseInt(e.target.value))}
        className="text-sm"
      />
    </div>
  );
};

export default GridEditor;
