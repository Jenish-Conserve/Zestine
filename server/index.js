import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: '../.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('SMTP Connection Error:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

// Endpoint for the "Get Started" form
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, company, requirements } = req.body;

  const mailOptions = {
    from: `"${process.env.APP_NAME || 'Zestine'}" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL || 'info@zestinetech.com',
    subject: `New Message from ${name} (Zestine Contact Form)`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Company: ${company}
      Requirements: ${requirements}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Requirements:</strong><br>${requirements}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Endpoint for the "Download" form
app.post('/api/download', async (req, res) => {
  const { name, email, phone, company, location, product } = req.body;

  const mailOptions = {
    from: `"${process.env.APP_NAME || 'Zestine'}" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL || 'info@zestinetech.com',
    subject: `Product Download Request: ${product} by ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Company: ${company}
      Location: ${location}
      Product: ${product}
    `,
    html: `
      <h2>Product Download Request</h2>
      <p><strong>Product:</strong> ${product}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Location:</strong> ${location}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
