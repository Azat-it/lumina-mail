"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export type SaveContactInput = {
  id?: string;
  email: string;
  name?: string;
  metadata?: string;
  status: "subscribed" | "unsubscribed";
};

export async function saveContact(data: SaveContactInput) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    if (data.id) {
      const contact = await prisma.contact.update({
        where: {
          id: data.id,
          userId: session.user.id,
        },
        data: {
          email: data.email,
          name: data.name,
          metadata: data.metadata,
          status: data.status,
        },
      });
      revalidatePath("/contacts");
      return { success: true, data: contact };
    }

    const contact = await prisma.contact.create({
      data: {
        email: data.email,
        name: data.name,
        metadata: data.metadata,
        status: data.status,
        userId: session.user.id,
      },
    });

    revalidatePath("/contacts");
    return { success: true, data: contact };
  } catch (error) {
    console.error("Failed to save contact:", error);
    return { success: false, error: "Failed to save contact" };
  }
}

export async function deleteContact(id: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    if (!id) {
      return { success: false, error: "Contact ID is required" };
    }

    await prisma.contact.delete({
      where: {
        id: id.toString(),
        userId: session.user.id,
      },
    });

    revalidatePath("/contacts");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete contact:", error);
    return { success: false, error: "Failed to delete contact" };
  }
}

export async function toggleContactSubscription(id: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const contact = await prisma.contact.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!contact) {
      return { success: false, error: "Contact not found" };
    }

    const updatedContact = await prisma.contact.update({
      where: {
        id,
        userId: session.user.id,
      },
      data: {
        status: contact.status === 'subscribed' ? 'unsubscribed' : 'subscribed',
      },
    });

    revalidatePath("/contacts");
    return { success: true, data: updatedContact };
  } catch (error) {
    console.error("Failed to toggle contact subscription:", error);
    return { success: false, error: "Failed to toggle subscription" };
  }
}

export async function bulkToggleSubscription(ids: string[], status: "subscribed" | "unsubscribed") {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    await prisma.contact.updateMany({
      where: {
        id: { in: ids },
        userId: session.user.id,
      },
      data: {
        status,
      },
    });

    revalidatePath("/contacts");
    return { success: true };
  } catch (error) {
    console.error("Failed to bulk update contacts:", error);
    return { success: false, error: "Failed to update contacts" };
  }
} 