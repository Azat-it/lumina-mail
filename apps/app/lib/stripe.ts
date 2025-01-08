/* eslint-disable turbo/no-undeclared-env-vars */
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey.startsWith('sk_')) {
  throw new Error('Invalid secret key format. Must start with sk_');
}

export const stripe = new Stripe(secretKey, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

export const CREDIT_PRODUCTS = {
  STARTER: {
    credits: 5000,
    price: 5,
    priceId: process.env.STRIPE_PRICE_STARTER,
    description: "Perfect for small businesses and startups",
  },
  GROWTH: {
    credits: 20000,
    price: 18,
    priceId: process.env.STRIPE_PRICE_GROWTH,
    description: "Ideal for growing businesses",
  },
  BUSINESS: {
    credits: 100000,
    price: 85,
    priceId: process.env.STRIPE_PRICE_BUSINESS,
    description: "Best value for high-volume senders",
  },
} as const; 