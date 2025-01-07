"use server";

import { prisma } from "@/lib/db";

interface SubscribeInput {
  email: string;
  name: string;
  userId: string;
}

export async function subscribe(data: SubscribeInput) {
  try {
    const existingContact = await prisma.contact.findUnique({
      where: {
        email_userId: {
          email: data.email,
          userId: data.userId,
        },
      },
    });

    if (existingContact) {
      if (existingContact.status === "subscribed") {
        return { success: false, error: "Already subscribed" };
      }

      await prisma.contact.update({
        where: {
          email_userId: {
            email: data.email,
            userId: data.userId,
          },
        },
        data: {
          status: "subscribed",
          name: data.name,
        },
      });

      return { success: true };
    }

    await prisma.contact.create({
      data: {
        email: data.email,
        name: data.name,
        userId: data.userId,
        status: "subscribed",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to subscribe:", error);
    return { success: false, error: "Failed to subscribe" };
  }
} 

interface ResubscribeInput {
  email: string;
  userId: string;
}

export async function resubscribe(data: ResubscribeInput) {
  await prisma.contact.update({
    where: {
      email_userId: {
        email: data.email,
        userId: data.userId,
      },
    },
    data: {
      status: "subscribed",
    },
  });

  return { success: true };
}
