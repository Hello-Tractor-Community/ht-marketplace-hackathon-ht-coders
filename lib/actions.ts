import { prisma } from '@/lib/prisma';
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// send email
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
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
    console.error(error);
    return false;
  }
}

async function verifyOTP(userId: string, enteredOtp: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (
    !user ||
    user.otp !== enteredOtp ||
    !user.otpExpiresAt ||
    new Date() > user.otpExpiresAt
  ) {
    throw new Error('Invalid or expired OTP');
  }

  // OTP is valid, clear the OTP fields
  await prisma.user.update({
    where: { id: userId },
    data: { otp: null, otpExpiresAt: null },
  });

  return true;
}

// send OTP to user
export async function generateAndSendOTP(userId: string) {
  try {
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    await prisma.user.update({
      where: { id: userId },
      data: { otp, otpExpiresAt },
    });

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const html = `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background-color: #f7f7f7; padding: 20px; border-radius: 10px;">
                  <tr>
                    <td style="padding: 20px; background-color: #ffffff; border-radius: 8px;">
                      <p style="font-size: 16px; color: #555;">Greetings!</p>
                      <p style="font-size: 16px;">
                          Your OTP is <strong style="color: #D96354;">${otp}.</strong>
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
    return sendEmail({
      to: user.email,
      subject: 'Your OTP Code',
      html,
    });
  } catch (error) {
    throw new Error(error as string);
  }
}

// verify OTP
export async function verifyOTPCode(userId: string, enteredOtp: number) {
  try {
    return verifyOTP(userId, enteredOtp);
  } catch (error) {
    throw new Error(error as string);
  }
}
