## Gmail Email Integration Setup

To use Gmail for sending template emails, follow these steps:

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://emailjs.com) and sign up
2. Create a new service and select Gmail
3. Connect your Gmail account

### 2. Configure EmailJS
1. In your EmailJS dashboard, note down:
   - Service ID (usually 'gmail')
   - Template ID (create a template)
   - Public Key (from Account page)

2. Update the configuration in `src/components/EmailSender.tsx`:
```typescript
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id'; 
const EMAILJS_PUBLIC_KEY = 'your_public_key';
```

### 3. EmailJS Template
Create a template in EmailJS with these variables:
- `{{to_email}}` - Recipient email
- `{{subject}}` - Email subject
- `{{message}}` - Personal message
- `{{template_html}}` - The template HTML
- `{{template_name}}` - Template name
- `{{from_name}}` - Sender name

### 4. Template Example
```html
Subject: {{subject}}

{{message}}

Template: {{template_name}}

{{{template_html}}}

Sent from Template Builder App
```

This setup allows you to send emails directly through Gmail without needing your own email server!