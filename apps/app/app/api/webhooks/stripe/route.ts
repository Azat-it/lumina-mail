import { headers } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Webhook error: Missing webhook secret");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  console.log("Webhook received:", {
    hasSignature: !!signature,
    hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
  });

  if (!signature) {
    console.error("Webhook error: Missing signature");
    return new Response("Webhook signature missing", { status: 400 });
  }

  try {
    const stripeClient = getStripe();
    const event = stripeClient.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("Webhook event:", {
      type: event.type,
      id: event.id,
    });

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, credits } = session.metadata || {};

      console.log("Processing checkout session:", {
        sessionId: session.id,
        userId,
        credits,
        metadata: session.metadata,
      });

      if (!userId || !credits) {
        console.error("Missing metadata:", { userId, credits });
        return new Response("Missing required metadata", { status: 400 });
      }

      // Update transaction status
      await prisma.creditTransaction.updateMany({
        where: {
          metadata: session.id,
          userId: userId,
          status: "pending",
        },
        data: {
          status: "completed",
        },
      });

      // Add credits to user's balance
      await prisma.credits.upsert({
        where: { userId: userId },
        create: {
          userId: userId,
          balance: parseInt(credits),
        },
        update: {
          balance: {
            increment: parseInt(credits),
          },
        },
      });

      console.log("Credits updated successfully");
      return new Response(null, { status: 200 });
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      "Webhook error: " + (error instanceof Error ? error.message : "Unknown error"),
      { status: 400 }
    );
  }
} 