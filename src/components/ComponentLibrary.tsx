
import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { componentConfigs, categories } from '../config/components';
import { useTranslation } from '../hooks/useTranslation';

const ComponentLibrary = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const components = Object.values(componentConfigs).map(config => ({
    id: config.id,
    name: t(`components.${config.id}.name`),
    icon: config.icon,
    description: t(`components.${config.id}.description`),
    category: config.category
  }));

  const filteredComponents = components.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder={t('componentLibrary.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              selectedCategory === category
                ? 'bg-blue-100 border-blue-300 text-blue-700'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {t(`componentLibrary.categories.${category}`)}
          </button>
        ))}
      </div>

      {/* Components */}
      <Droppable droppableId="component-library" isDropDisabled={true}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
            {filteredComponents.map((component, index) => (
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
            {filteredComponents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">{t('componentLibrary.noComponentsFound')}</p>
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ComponentLibrary;
