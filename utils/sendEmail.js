import nodemailer from 'nodemailer';
import crypto from 'crypto';


export const sendMail = async ({ mailFrom, mailTo, subject, body }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const info = await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject,
      html: body
    });

    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

/**
 * Generate OTP, expiry, and token
 * @returns {Object} { otp, otpExpires, token }
 */
export const generateOTP = () => {
  return {
    otp: Math.floor(100000 + Math.random() * 900000).toString(),
    otpExpires: new Date(Date.now() + 20 * 60 * 1000), // 20 min
    token: crypto.randomBytes(32).toString('hex')
  };
};
