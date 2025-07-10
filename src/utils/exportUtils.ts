
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { TemplateComponent } from '../components/TemplateEditor';

export const exportToPDF = async (components: TemplateComponent[], templateName: string) => {
  try {
    // Create a temporary div to render the template
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.width = '600px';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '20px';
    
    // Render components to HTML
    const htmlContent = generateHTMLFromComponents(components);
    tempDiv.innerHTML = htmlContent;
    
    document.body.appendChild(tempDiv);
    
    // Convert to canvas
    const canvas = await html2canvas(tempDiv, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true
    });
    
    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Clean up
    document.body.removeChild(tempDiv);
    
    // Download PDF
    pdf.save(`${templateName}.pdf`);
    console.log('PDF export succesvol!');
  } catch (error) {
    console.error('Fout bij PDF export:', error);
  }
};

export const exportToHTML = (components: TemplateComponent[], templateName: string) => {
  const htmlContent = generateHTMLFromComponents(components);
  const fullHTML = `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${templateName}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .email-content {
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-content">
            ${htmlContent}
        </div>
    </div>
</body>
</html>`;
  
  // Create download link
  const blob = new Blob([fullHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${templateName}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  console.log('HTML export succesvol!');
};

const generateHTMLFromComponents = (components: TemplateComponent[]): string => {
  return components.map(component => {
    const styleString = Object.entries(component.styles)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
      .join('; ');
    
    switch (component.type) {
      case 'header':
        return `<h1 style="${styleString}">${component.content}</h1>`;
      
      case 'text':
        return `<div style="${styleString}">${component.content}</div>`;
      
      case 'image':
        return `<img src="${component.content}" style="${styleString}" alt="Email afbeelding" />`;
      
      case 'button':
        return `<button style="${styleString}; border: none; cursor: pointer;">${component.content}</button>`;
      
      case 'divider':
        return `<hr style="${styleString}; border: none;" />`;
      
      case 'spacer':
        return `<div style="${styleString}"></div>`;
      
      case 'footer':
        return `<footer style="${styleString}">${component.content}</footer>`;
      
      default:
        return `<div style="${styleString}">${component.content}</div>`;
    }
  }).join('\n');
};
