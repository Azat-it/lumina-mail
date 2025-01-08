import { createHmac } from "crypto";

const SECRET = process.env.UNSUBSCRIBE_SECRET || "default-secret-change-me";

export function generateUnsubscribeToken(email: string, userId: string) {
  const hmac = createHmac("sha256", SECRET);
  hmac.update(`${email}:${userId}`);
  return hmac.digest("hex");
}

export function generateUnsubscribeUrl(email: string, userId: string) {
  const token = generateUnsubscribeToken(email, userId);
  return `${process.env.NEXT_PUBLIC_APP_URL}/subscriptions/unsubscribe?email=${encodeURIComponent(email)}&token=${token}&userId=${userId}`;
}

export function verifyUnsubscribeToken(email: string, userId: string, token: string) {
  const expectedToken = generateUnsubscribeToken(email, userId);
  return token === expectedToken;
} 