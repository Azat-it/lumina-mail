"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { resend } from "@/lib/resend";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { renderEmail } from "@/lib/email";
import { deductCredits, refundCredits } from "./credits";

export type SendEmailInput = {
  campaignId: number;
  subject: string;
  content: string;
  from: string;
  previewText?: string;
  title?: string;
  ctaText?: string;
  ctaUrl?: string;
};

export async function sendEmails(data: SendEmailInput) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  // Get all subscribed contacts
  const contacts = await prisma.contact.findMany({
    where: { userId: session.user.id, status: "subscribed" },
    select: { email: true }
  });

  // Check if user has enough credits
  const userCredits = await prisma.credits.findUnique({
    where: { userId: session.user.id },
  });

  if (!userCredits || userCredits.balance < contacts.length) {
    throw new Error(`Insufficient credits. Need ${contacts.length} credits, but have ${userCredits?.balance || 0}`);
  }

  // Start sending
  await prisma.campaign.update({
    where: {
      id: data.campaignId,
      userId: session.user.id,
    },
    data: { status: "sending" },
  });

  // Start background process
  sendEmailsInBackground(data, session.user.id, contacts.length).catch(error => {
    console.error("Background process failed:", error);
  });

  revalidatePath("/campaigns");
  redirect("/campaigns");
}

async function sendEmailsInBackground(data: SendEmailInput, userId: string, totalEmails: number) {
  try {
    const contacts = await prisma.contact.findMany({
      where: { userId, status: "subscribed" },
      select: { email: true }
    });

    // Deduct credits before sending
    const deductResult = await deductCredits(totalEmails);
    if (!deductResult.success) {
      throw new Error("Failed to deduct credits: " + deductResult.error);
    }

    const batchSize = 50;
    const batches = Math.ceil(contacts.length / batchSize);
    let sentCount = 0;
    let failedCount = 0;

    for (let i = 0; i < batches; i++) {
      const batch = contacts.slice(i * batchSize, (i + 1) * batchSize);

      const results = await Promise.all(
        batch.map(async contact => {
          try {
            const emailHtml = await renderEmail({
              content: data.content,
              subject: data.subject,
              previewText: data.previewText,
              title: data.title,
              ctaText: data.ctaText,
              ctaUrl: data.ctaUrl,
              email: contact.email,
              userId,
            });

            const result = await resend.emails.send({
              from: data.from,
              to: contact.email,
              subject: data.subject,
              html: emailHtml,
              text: data.content.replace(/<[^>]*>/g, ''),
              tags: [
                { name: "campaign_id", value: data.campaignId.toString() }
              ],
            });

            sentCount++;
            return { success: true, email: contact.email };
          } catch (error) {
            console.error(`Failed to send to ${contact.email}:`, error);
            failedCount++;
            return { success: false, email: contact.email, error };
          }
        })
      );

      // Log progress
      console.log(`Batch ${i + 1}/${batches} complete. Sent ${sentCount}/${totalEmails} emails`);
    }

    // Refund credits for failed sends
    if (failedCount > 0) {
      const refundResult = await refundCredits(failedCount);
      if (!refundResult.success) {
        console.error("Failed to refund credits for failed sends:", refundResult.error);
      }
    }

    await prisma.campaign.update({
      where: { id: data.campaignId, userId },
      data: {
        status: "sent",
        metadata: JSON.stringify({
          sentCount,
          failedCount,
          totalAttempted: totalEmails,
          creditsRefunded: failedCount > 0
        })
      },
    });

    revalidatePath("/campaigns");
  } catch (error) {
    console.error("Failed to send emails:", error);

    // Refund all credits if the entire process failed
    const refundResult = await refundCredits(totalEmails);
    if (!refundResult.success) {
      console.error("Failed to refund credits after error:", refundResult.error);
    }

    await prisma.campaign.update({
      where: { id: data.campaignId, userId },
      data: {
        status: "error",
        metadata: JSON.stringify({
          error: error instanceof Error ? error.message : "Unknown error",
          creditsRefunded: refundResult.success
        })
      },
    });
    revalidatePath("/campaigns");
  }
}

export async function sendTestEmail(data: Omit<SendEmailInput, "campaignId"> & { to: string }) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const emailHtml = await renderEmail({
      content: data.content,
      subject: data.subject,
      previewText: data.previewText,
      title: data.title,
      ctaText: data.ctaText,
      ctaUrl: data.ctaUrl,
      email: data.to,
      userId: session.user.id,
    });

    const result = await resend.emails.send({
      from: data.from,
      to: data.to,
      subject: `[Test] ${data.subject}`,
      html: emailHtml,
      text: data.content.replace(/<[^>]*>/g, ''),
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to send test email:", error);
    return { success: false, error: "Failed to send test email" };
  }
} 