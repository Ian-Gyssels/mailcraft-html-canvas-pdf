
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Trash2, Calendar, Edit } from 'lucide-react';
import { Template } from '../types/template';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSelector from './LanguageSelector';

interface TemplateListProps {
  templates: Template[];
  onCreateNew: () => void;
  onEditTemplate: (template: Template) => void;
  onDeleteTemplate: (id: string) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onCreateNew,
  onEditTemplate,
  onDeleteTemplate
}) => {
  const { t } = useTranslation();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('templateList.title')}</h1>
            <p className="text-gray-600">Beheer je email templates</p>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Button 
              onClick={onCreateNew}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t('templateList.createNew')}
            </Button>
          </div>
        </div>

        {templates.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('templateList.noTemplates')}</h3>
            <p className="text-gray-500 mb-6">Maak je eerste email template om te beginnen</p>
            <Button 
              onClick={onCreateNew}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t('templateList.createNew')}
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{template.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(template.updatedAt)}
                    </div>
                    <p className="text-sm text-gray-600">
                      {template.components.length} component{template.components.length !== 1 ? 'en' : ''}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onEditTemplate(template)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {t('templateList.edit')}
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onDeleteTemplate(template.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateList;
