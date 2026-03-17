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
      ${phone ? `Phone: ${phone}` : ''}
      Company: ${company}
      ${requirements ? `Requirements: ${requirements}` : ''}
    `,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #123e70; padding: 25px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">ZESTINE</h1>
          <p style="color: #8dc63f; margin: 5px 0 0; font-size: 14px; font-weight: 600;">Intelligent AEC Platforms</p>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #123e70; margin-top: 0; font-size: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #64748b; width: 140px;">Name</td>
              <td style="padding: 10px 0; color: #1e293b;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Email</td>
              <td style="padding: 10px 0; color: #1e293b;"><a href="mailto:${email}" style="color: #8dc63f; text-decoration: none;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Phone</td>
              <td style="padding: 10px 0; color: #1e293b;">${phone}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Company</td>
              <td style="padding: 10px 0; color: #1e293b;">${company}</td>
            </tr>
          </table>
          
          ${requirements ? `
          <div style="margin-top: 25px; background-color: #f8fafc; padding: 20px; border-radius: 6px; border-left: 4px solid #123e70;">
            <p style="margin: 0 0 10px; font-weight: 600; color: #123e70;">Requirements / Problems:</p>
            <p style="margin: 0; line-height: 1.6; color: #334155;">${requirements}</p>
          </div>` : ''}
          <p style="margin-top: 25px; color: #64748b; font-size: 14px;">Best regards,<br><strong>Zestine Team</strong></p>
        </div>
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; color: #94a3b8; font-size: 12px;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Zestine Technologies. All rights reserved.</p>
        </div>
      </div>
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
      ${phone ? `Phone: ${phone}` : ''}
      Company: ${company}
      ${location ? `Location: ${location}` : ''}
      Product: ${product}
    `,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #123e70; padding: 25px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 1px;">ZESTINE</h1>
          <p style="color: #8dc63f; margin: 5px 0 0; font-size: 14px; font-weight: 600;">Intelligent AEC Platforms</p>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
          <div style="display: inline-block; background-color: #ecfdf5; color: #059669; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-bottom: 15px;">PRODUCT REQUEST</div>
          <h2 style="color: #123e70; margin-top: 0; font-size: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Download Request: ${product}</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #64748b; width: 140px;">Product</td>
              <td style="padding: 10px 0; color: #1e293b; font-weight: 700;">${product}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Name</td>
              <td style="padding: 10px 0; color: #1e293b;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Email</td>
              <td style="padding: 10px 0; color: #1e293b;"><a href="mailto:${email}" style="color: #8dc63f; text-decoration: none;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Phone</td>
              <td style="padding: 10px 0; color: #1e293b;">${phone}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Company</td>
              <td style="padding: 10px 0; color: #1e293b;">${company}</td>
            </tr>
            ${location ? `
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Location</td>
              <td style="padding: 10px 0; color: #1e293b;">${location}</td>
            </tr>` : ''}
          </table>
          <p style="margin-top: 25px; color: #64748b; font-size: 14px;">Best regards,<br><strong>Zestine Team</strong></p>
        </div>
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; color: #94a3b8; font-size: 12px;">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Zestine Technologies. All rights reserved.</p>
        </div>
      </div>
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
