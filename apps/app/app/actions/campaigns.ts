"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type SaveCampaignInput = {
  id?: number;
  subject: string;
  content: string;
  title: string;
  previewText: string;
  ctaText?: string;
  ctaUrl?: string;
  status: "draft" | "scheduled" | "sent" | "sending";
};

export async function saveCampaign(data: SaveCampaignInput) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const campaign = await prisma.campaign.upsert({
      where: {
        id: data.id || -1,
      },
      create: {
        subject: data.subject,
        content: data.content,
        title: data.title,
        previewText: data.previewText,
        ctaText: data.ctaText,
        ctaUrl: data.ctaUrl,
        status: data.status,
        userId: session.user.id,
      },
      update: {
        subject: data.subject,
        content: data.content,
        title: data.title,
        previewText: data.previewText,
        ctaText: data.ctaText,
        ctaUrl: data.ctaUrl,
        status: data.status,
      },
    });

    revalidatePath("/campaigns");
    return { success: true, data: campaign };
  } catch (error) {
    console.error("Failed to save campaign:", error);
    return { success: false, error: "Failed to save campaign" };
  }
}

export async function getCampaign(id: number) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const campaign = await prisma.campaign.findUnique({
      where: {
        id,
        userId: session.user.id
      },
    });

    return { success: true, data: campaign };
  } catch (error) {
    console.error("Failed to get campaign:", error);
    return { success: false, error: "Failed to get campaign" };
  }
}

export async function deleteCampaign(id: number) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    await prisma.campaign.delete({
      where: {
        id,
        userId: session.user.id
      },
    });

    revalidatePath("/campaigns");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete campaign:", error);
    return { success: false, error: "Failed to delete campaign" };
  }
} 