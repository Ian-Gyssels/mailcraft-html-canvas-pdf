
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, Save, ArrowLeft } from 'lucide-react';
import { Template } from '../types/template';
import { useTranslation } from '../hooks/useTranslation';

interface TemplateHeaderProps {
  template: Template;
  onTemplateNameChange: (name: string) => void;
  onSave: () => void;
  onExportHTML: () => void;
  onExportPDF: () => void;
  onBackToList: () => void;
}

const TemplateHeader: React.FC<TemplateHeaderProps> = ({
  template,
  onTemplateNameChange,
  onSave,
  onExportHTML,
  onExportPDF,
  onBackToList
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white border-b shadow-sm p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBackToList}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('templateHeader.back')}
          </Button>
          <input
            type="text"
            value={template.name}
            onChange={(e) => onTemplateNameChange(e.target.value)}
            className="text-xl font-semibold bg-transparent border-none outline-none focus:bg-gray-50 rounded px-2"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={onSave}>
            <Save className="w-4 h-4 mr-2" />
            {t('templateHeader.save')}
          </Button>
          <Button variant="outline" onClick={onExportHTML}>
            <FileText className="w-4 h-4 mr-2" />
            {t('templateHeader.htmlExport')}
          </Button>
          <Button 
            onClick={onExportPDF} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Download className="w-4 h-4 mr-2" />
            {t('templateHeader.pdfExport')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateHeader;
