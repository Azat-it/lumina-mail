import { Resend } from 'resend';
import crypto from 'crypto';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export function verifyWebhookSignature({
  payload,
  signature,
  webhookSecret,
}: {
  payload: string;
  signature: string;
  webhookSecret: string;
}): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('Failed to verify webhook signature:', error);
    return false;
  }
} 