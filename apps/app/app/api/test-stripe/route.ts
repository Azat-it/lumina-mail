/* eslint-disable turbo/no-undeclared-env-vars */
import { NextResponse } from "next/server";

export async function GET() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const keyType = stripeKey?.startsWith('sk_') ? 'Secret Key' :
    stripeKey?.startsWith('pk_') ? 'Publishable Key' :
      'Unknown Key Type';

  return NextResponse.json({
    keyType,
    keyPrefix: stripeKey?.substring(0, 6),
    envVars: {
      hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
      hasStripePublishable: !!process.env.STRIPE_PUBLISHABLE_KEY,
      hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
      hasStarterPrice: !!process.env.STRIPE_PRICE_STARTER,
      hasGrowthPrice: !!process.env.STRIPE_PRICE_GROWTH,
      hasBusinessPrice: !!process.env.STRIPE_PRICE_BUSINESS,
    }
  });
} 