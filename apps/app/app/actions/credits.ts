"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { stripe, CREDIT_PRODUCTS } from "@/lib/stripe";
import { revalidatePath } from "next/cache";

export async function createCheckoutSession(productKey: keyof typeof CREDIT_PRODUCTS) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const product = CREDIT_PRODUCTS[productKey];
    if (!product.priceId) {
      return { success: false, error: "Invalid product" };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { credits: true },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id,
        },
      });
      stripeCustomerId = customer.id;
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customer.id },
      });
    }

    console.log("[Checkout] Creating session for:", {
      userId: user.id,
      productKey,
      credits: product.credits,
    });

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "payment",
      allow_promotion_codes: true,
      line_items: [
        {
          price: product.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/credits?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/credits?canceled=true`,
      metadata: {
        userId: user.id,
        credits: product.credits.toString(),
        productKey,
      },
    });

    if (!checkoutSession.url) {
      return { success: false, error: "Failed to create checkout session" };
    }

    console.log("[Checkout] Created session:", {
      sessionId: checkoutSession.id,
      metadata: checkoutSession.metadata,
    });

    // Create pending transaction
    const transaction = await prisma.creditTransaction.create({
      data: {
        amount: product.credits,
        type: "purchase",
        status: "pending",
        metadata: checkoutSession.id,
        userId: user.id,
      },
    });

    console.log("[Checkout] Created transaction:", {
      transactionId: transaction.id,
      amount: transaction.amount,
      status: transaction.status,
    });

    return { success: true, url: checkoutSession.url };
  } catch (error) {
    console.error("[Checkout] Error:", error);
    return { success: false, error: "Failed to create checkout session" };
  }
}

export async function getUserCredits() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const credits = await prisma.credits.findUnique({
      where: { userId: session.user.id },
    });

    return { success: true, data: credits };
  } catch (error) {
    console.error("Failed to get user credits:", error);
    return { success: false, error: "Failed to get user credits" };
  }
}

export async function deductCredits(amount: number) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const credits = await prisma.credits.findUnique({
      where: { userId: session.user.id },
    });

    if (!credits || credits.balance < amount) {
      return { success: false, error: "Insufficient credits" };
    }

    await prisma.$transaction([
      prisma.credits.update({
        where: { userId: session.user.id },
        data: { balance: { decrement: amount } },
      }),
      prisma.creditTransaction.create({
        data: {
          amount: -amount,
          type: "usage",
          status: "completed",
          userId: session.user.id,
        },
      }),
    ]);

    revalidatePath("/credits");
    return { success: true };
  } catch (error) {
    console.error("Failed to deduct credits:", error);
    return { success: false, error: "Failed to deduct credits" };
  }
}

export async function refundCredits(amount: number) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    await prisma.$transaction([
      prisma.credits.update({
        where: { userId: session.user.id },
        data: { balance: { increment: amount } },
      }),
      prisma.creditTransaction.create({
        data: {
          amount: amount,
          type: "refund",
          status: "completed",
          metadata: "Refund for failed email sends",
          userId: session.user.id,
        },
      }),
    ]);

    revalidatePath("/credits");
    return { success: true };
  } catch (error) {
    console.error("Failed to refund credits:", error);
    return { success: false, error: "Failed to refund credits" };
  }
} 

export async function getAuthUserCredits() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  const credits = await prisma.credits.findUnique({
    where: { userId: session.user.id },
  });

  return { success: true, data: credits };
}