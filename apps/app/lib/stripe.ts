/* eslint-disable turbo/no-undeclared-env-vars */
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("STRIPE_SECRET_KEY is not set. Stripe functionality will be limited.");
}

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
  })
  : null;

export const getStripe = () => {
  if (!stripe) {
    throw new Error("Stripe is not properly configured. Please check your environment variables.");
  }
  return stripe;
}

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