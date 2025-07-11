
import React from 'react';
import { Input } from '@/components/ui/input';

interface LinkEditorProps {
  link?: string;
  onLinkChange: (link: string) => void;
}

const LinkEditor: React.FC<LinkEditorProps> = ({ link, onLinkChange }) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Link</label>
      <Input
        type="url"
        value={link || ''}
        onChange={(e) => onLinkChange(e.target.value)}
        placeholder="https://example.com"
        className="text-sm"
      />
    </div>
  );
};

export default LinkEditor;
