
import { useState, useEffect } from 'react';
import { Template } from '../types/template';

export const useTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    const savedTemplates: Template[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('template-')) {
        try {
          const templateData = JSON.parse(localStorage.getItem(key) || '');
          savedTemplates.push(templateData);
        } catch (error) {
          console.error('Error loading template:', error);
        }
      }
    }
    setTemplates(savedTemplates.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
  };

  const saveTemplate = (template: Template) => {
    const templateWithTimestamp = {
      ...template,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(`template-${template.id}`, JSON.stringify(templateWithTimestamp));
    loadTemplates();
  };

  const deleteTemplate = (id: string) => {
    localStorage.removeItem(`template-${id}`);
    loadTemplates();
  };

  const createNewTemplate = (): Template => {
    return {
      id: Date.now().toString(),
      name: 'Nieuwe Template',
      components: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };

  return {
    templates,
    saveTemplate,
    deleteTemplate,
    createNewTemplate,
    loadTemplates
  };
};
