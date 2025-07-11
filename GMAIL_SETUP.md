# Backend Email Setup

This app uses a backend API for sending emails with the template as HTML content.

## Backend Implementation

Create an endpoint at `/api/send-email` that accepts POST requests with:

```json
{
  "to": "recipient@example.com",
  "subject": "Email subject",
  "html": "<html>...</html>",
  "text": "Plain text fallback"
}
```

## Example Node.js/Express Backend

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password' // Use Gmail App Password
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html, text } = req.body;
    
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to,
      subject,
      html,
      text
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Gmail App Password Setup

1. Enable 2FA on your Gmail account
2. Go to Google Account settings
3. Generate an App Password for "Mail"
4. Use this password in your backend configuration