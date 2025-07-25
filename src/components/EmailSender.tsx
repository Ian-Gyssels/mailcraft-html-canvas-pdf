import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Send, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Template } from '../types/template';
import { useTranslation } from '../hooks/useTranslation';
// Email configuration - replace with your backend endpoint
const EMAIL_API_ENDPOINT = '/api/send-email'; // Your backend email endpoint

interface EmailSenderProps {
  template: Template;
}

const EmailSender: React.FC<EmailSenderProps> = ({ template }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailData, setEmailData] = useState({
    to: '',
    subject: `Template: ${template.name}`,
    message: 'Hi! I wanted to share this email template with you.'
  });

  const generateTemplateHTML = () => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.name}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="container">
        ${template.components.map(component => {
          const styles = Object.entries(component.styles || {})
            .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
            .join('; ');
          
          switch (component.type) {
            case 'header':
              return `<h1 style="${styles}">${component.content}</h1>`;
            case 'text':
              return `<p style="${styles}">${component.content}</p>`;
            case 'button':
              return `<a href="${component.link || '#'}" style="${styles}; display: inline-block; text-decoration: none;">${component.content}</a>`;
            case 'image':
              return `<img src="${component.content}" style="${styles}" alt="Image" />`;
            case 'divider':
              return `<hr style="${styles}" />`;
            case 'spacer':
              return `<div style="${styles}"></div>`;
            default:
              return `<div style="${styles}">${component.content}</div>`;
          }
        }).join('')}
    </div>
</body>
</html>`;
  };

  const handleSendEmail = async () => {
    if (!emailData.to) {
      toast({
        title: "Error",
        description: "Please enter recipient email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const templateHTML = generateTemplateHTML();
      
      // Send email using your backend API
      const response = await fetch(EMAIL_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: emailData.to,
          subject: emailData.subject,
          html: templateHTML, // Send the template as HTML content
          text: emailData.message // Optional plain text fallback
        })
      });

      if (response.ok) {
        toast({
          title: "Email Sent Successfully",
          description: `Template sent to ${emailData.to}`,
        });
        
        setIsOpen(false);
        setEmailData({
          to: '',
          subject: `Template: ${template.name}`,
          message: 'Hi! I wanted to share this email template with you.'
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send email. Please check your backend configuration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Mail className="w-4 h-4 mr-2" />
          Send Email
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Send Template via Email
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Recipient Email</label>
            <Input
              type="email"
              value={emailData.to}
              onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
              placeholder="recipient@example.com"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Subject</label>
            <Input
              value={emailData.subject}
              onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Email subject"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Message</label>
            <Textarea
              value={emailData.message}
              onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Optional message to include with the template"
              rows={3}
            />
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Backend Required:</strong> You need to create a backend endpoint at <code>/api/send-email</code> that accepts POST requests with email data.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleSendEmail} disabled={isLoading} className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              {isLoading ? 'Sending...' : 'Send via Gmail'}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailSender;