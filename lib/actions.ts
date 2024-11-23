'use server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Utility to send an email
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  const msg = {
    to,
    from: 'test@paya.co.ke',
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    return false;
  }
}

// verify OTP and login the user
async function verifyOTP(
  userId: string,
  enteredOtp: number
): Promise<{ success: boolean; message?: string; userId?: string }> {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return { success: false, message: 'Account not found' };
    }

    const isOtpValid = await bcrypt.compare(enteredOtp.toString(), user.otp);

    if (!isOtpValid) {
      return { success: false, message: 'Invalid OTP' };
    }

    if (user.otpExpiresAt && new Date() > user.otpExpiresAt) {
      return { success: false, message: 'OTP has expired' };
    }

    // Clear OTP fields after successful verification
    await prisma.user.update({
      where: { id: userId },
      data: { otp: null, otpExpiresAt: null },
    });

    // login the user

    return { success: true, userId };
  } catch (error) {
    return { success: false, message: 'Failed to verify OTP' };
  }
}

// Function to generate and send OTP to user
export async function generateAndSendOTP(userId: string): Promise<boolean> {
  try {
    const otp = crypto.randomInt(100000, 999999);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    // Update the user record with the generated OTP and expiration time
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { otp: hashedOtp, otpExpiresAt },
    });

    if (!updatedUser) {
      throw new Error('Failed to update user with OTP');
    }

    // Generate the email HTML content
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background-color: #f7f7f7; padding: 20px; border-radius: 10px;">
          <tr>
            <td style="padding: 20px; background-color: #ffffff; border-radius: 8px;">
              <p style="font-size: 16px; color: #555;">Greetings!</p>
              <p style="font-size: 16px;">
                  Your OTP is <strong style="color: #D96354;">${otp}</strong>. It is valid for 10 minutes.
              </p>
              <p style="font-size: 16px; color: #555;">
                  Please do not share this OTP with anyone.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top: 20px;">
              <p style="font-size: 14px; color: #888;">Best regards,</p>
              <p style="font-size: 14px; color: #D96354;"><strong>HT Coders Team</strong></p>
            </td>
          </tr>
        </table>
      </div>
    `;

    // Send the email
    const emailSent = await sendEmail({
      to: updatedUser.email,
      subject: 'Your OTP Code',
      html,
    });

    if (!emailSent) {
      throw new Error('Failed to send OTP email');
    }

    return true;
  } catch (error) {
    throw new Error('Unable to generate and send OTP. Please try again.');
  }
}

// sigin user with phone
export async function signInWithPhone(
  phone: string
): Promise<{ success: boolean; message?: string; userId?: string }> {
  try {
    const user = await prisma.user.findFirst({ where: { phone } });
    if (!user) {
      return { success: false, message: 'Account not found' };
    }
    const otpSent = await generateAndSendOTP(user.id);
    if (!otpSent) {
      return { success: false, message: 'Failed to send OTP' };
    }
    return { success: true, userId: user.id };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || 'Failed to sign in with phone. Please try again.',
    };
  }
}
