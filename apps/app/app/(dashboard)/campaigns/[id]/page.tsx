import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { EditCampaignPage } from "./page.client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CampaignEditPage({ params }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session?.user?.id) {
    return null;
  }

  const { id } = await params;
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: parseInt(id),
      userId: session.user.id,
    },
  });

  if (!campaign) {
    notFound();
  }

  return <EditCampaignPage campaign={campaign} />;
}
