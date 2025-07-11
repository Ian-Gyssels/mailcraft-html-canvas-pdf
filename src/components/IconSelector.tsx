
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface IconSelectorProps {
  currentIcon: string;
  onIconSelect: (iconName: string) => void;
  children: React.ReactNode;
}

const IconSelector: React.FC<IconSelectorProps> = ({ currentIcon, onIconSelect, children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Get all available icons, excluding non-component exports
  const allIcons = Object.keys(LucideIcons).filter(
    name => {
      const item = (LucideIcons as any)[name];
      return typeof item === 'function' && 
             name !== 'createLucideIcon' && 
             name !== 'Icon' &&
             name !== 'default' &&
             !name.startsWith('use') &&
             name[0] === name[0].toUpperCase();
    }
  );

  const filteredIcons = allIcons.filter(iconName =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIconSelect = (iconName: string) => {
    onIconSelect(iconName);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Selecteer een icoon</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Zoek naar iconen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-8 gap-2 max-h-96 overflow-y-auto p-2">
            {filteredIcons.slice(0, 200).map((iconName) => {
              const IconComponent = (LucideIcons as any)[iconName] as React.ComponentType<any>;
              if (!IconComponent) return null;
              
              return (
                <Button
                  key={iconName}
                  variant={currentIcon === iconName ? "default" : "outline"}
                  size="sm"
                  className="h-12 w-12 p-2"
                  onClick={() => handleIconSelect(iconName)}
                  title={iconName}
                >
                  <IconComponent className="w-5 h-5" />
                </Button>
              );
            })}
          </div>
          
          {filteredIcons.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              Geen iconen gevonden voor "{searchTerm}"
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IconSelector;
