
import React, { useState } from 'react';
import TemplateList from '@/components/TemplateList';
import TemplateEditor from '@/components/TemplateEditor';
import { useTemplates } from '@/hooks/useTemplates';
import { Template } from '@/types/template';

const Index = () => {
  const { templates, saveTemplate, deleteTemplate, createNewTemplate } = useTemplates();
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);

  const handleCreateNew = () => {
    const newTemplate = createNewTemplate();
    setCurrentTemplate(newTemplate);
  };

  const handleEditTemplate = (template: Template) => {
    setCurrentTemplate(template);
  };

  const handleTemplateUpdate = (updatedTemplate: Template) => {
    setCurrentTemplate(updatedTemplate);
  };

  const handleSaveTemplate = () => {
    if (currentTemplate) {
      saveTemplate(currentTemplate);
      console.log('Template opgeslagen!');
    }
  };

  const handleBackToList = () => {
    setCurrentTemplate(null);
  };

  const handleDeleteTemplate = (id: string) => {
    if (confirm('Weet je zeker dat je deze template wilt verwijderen?')) {
      deleteTemplate(id);
    }
  };

  if (currentTemplate) {
    return (
      <TemplateEditor
        template={currentTemplate}
        onTemplateUpdate={handleTemplateUpdate}
        onSave={handleSaveTemplate}
        onBackToList={handleBackToList}
      />
    );
  }

  return (
    <TemplateList
      templates={templates}
      onCreateNew={handleCreateNew}
      onEditTemplate={handleEditTemplate}
      onDeleteTemplate={handleDeleteTemplate}
    />
  );
};

export default Index;
