import nodemailer from 'nodemailer';
import logger from '@/lib/logger';

// Create a transporter using SMTP settings from environment variables
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `boAt Warranty Hub <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });

        logger.info({ messageId: info.messageId, to }, 'Email sent successfully');
        return true;
    } catch (error) {
        logger.error({ error: error.message, to }, 'Error sending email');
        throw new Error('Failed to send email');
    }
};

export const sendOtpEmail = async (to, otpCode) => {
    const subject = 'Your boAt Warranty Hub OTP';
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
            <h2 style="color: #e8001d; text-align: center;">boAt Warranty Hub</h2>
            <p>Hello,</p>
            <p>Thank you for registering. Please use the following One-Time Password (OTP) to verify your email address:</p>
            <div style="text-align: center; margin: 30px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; padding: 10px 20px; background-color: #f4f4f4; border-radius: 5px;">${otpCode}</span>
            </div>
            <p>This OTP is valid for 10 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888; text-align: center;">&copy; ${new Date().getFullYear()} boAt. All rights reserved.</p>
        </div>
    `;
    return sendEmail({ to, subject, html });
};

export const sendPasswordResetEmail = async (to, resetLink) => {
    const subject = 'Reset Your boAt Warranty Hub Password';
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
            <h2 style="color: #e8001d; text-align: center;">boAt Warranty Hub</h2>
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the button below to choose a new password:</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" style="background-color: #e8001d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #0066cc;">${resetLink}</p>
            <p>This link is valid for 1 hour.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888; text-align: center;">&copy; ${new Date().getFullYear()} boAt. All rights reserved.</p>
        </div>
    `;
    return sendEmail({ to, subject, html });
};
