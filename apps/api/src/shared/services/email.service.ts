import nodemailer from 'nodemailer';
import { logger } from '~/utils/logger';
import { env } from '~/config/env';

export const emailService = {
  /**
   * Sends a verification email to the user.
   * For development, this creates an ethereal account and logs the preview URL.
   */
  sendVerificationEmail: async (toEmail: string, token: string) => {
    try {
      // Use Ethereal in development to avoid sending real emails
      // In production, configure with SMTP or Resend credentials
      let transporter: nodemailer.Transporter;

      if (env.NODE_ENV === 'development') {
        // Ethereal creates fake mailboxes
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
      } else {
        // Example for Production SMTP
        transporter = nodemailer.createTransport({
          host: env.SMTP_HOST || '',
          port: Number(env.SMTP_PORT) || 587,
          secure: true,
          auth: {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS,
          },
        });
      }

      // Verification URL (Assuming frontend is at PORT 3000 for local testing, or a specific domain)
      const frontendUrl = 'http://localhost:3000'; // Replace with actual frontend URL in production
      const verificationLink = `${frontendUrl}/verify-email?token=${token}`;

      const info = await transporter.sendMail({
        from: '"Sakank Support" <support@sakank.com>',
        to: toEmail,
        subject: 'Verify your Email Address',
        text: `Welcome to Sakank! Please verify your email by clicking: ${verificationLink}`,
        html: `
          <h3>Welcome to Sakank!</h3>
          <p>Please click the button below to verify your email address:</p>
          <a href="${verificationLink}" style="padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <br><br>
          <p>Or use this link: ${verificationLink}</p>
        `,
      });

      if (env.NODE_ENV === 'development') {
        logger.info(`Preview Verification Email URL: ${nodemailer.getTestMessageUrl(info)}`);
      }
    } catch (error) {
      logger.error({ error }, 'Failed to send verification email');
    }
  },
};
