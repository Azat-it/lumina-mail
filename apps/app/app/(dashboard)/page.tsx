import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { SubscriptionLinkDialog } from "./subscription-link-dialog";

async function getAnalytics(userId: string) {
  const campaigns = await prisma.campaign.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      events: true,
      recipients: true,
    },
  });

  const totalSent = campaigns.reduce((acc, campaign) =>
    acc + campaign.events.filter(e => e.type === "delivered").length, 0
  );
  const totalOpens = campaigns.reduce((acc, campaign) =>
    acc + campaign.events.filter(e => e.type === "opened").length, 0
  );
  const totalClicks = campaigns.reduce((acc, campaign) =>
    acc + campaign.events.filter(e => e.type === "clicked").length, 0
  );
  const totalBounces = campaigns.reduce((acc, campaign) =>
    acc + campaign.events.filter(e => e.type === "bounced").length, 0
  );

  const openRate = totalSent > 0 ? (totalOpens / totalSent * 100).toFixed(1) : 0;
  const clickRate = totalSent > 0 ? (totalClicks / totalSent * 100).toFixed(1) : 0;
  const bounceRate = totalSent > 0 ? (totalBounces / totalSent * 100).toFixed(1) : 0;

  return {
    stats: {
      totalSent,
      totalOpens,
      totalClicks,
      totalBounces,
      openRate,
      clickRate,
      bounceRate,
    }
  };
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session?.user?.id) {
    return null;
  }

  const { stats } = await getAnalytics(session.user.id);

  return (
    <div className="container max-w-[1400px] mx-auto flex flex-col gap-8 w-full">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your email campaigns
          </p>
        </div>
        <div>
          <SubscriptionLinkDialog userId={session.user.id} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Sent</CardTitle>
            <CardDescription>Emails delivered successfully</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalSent.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open Rate</CardTitle>
            <CardDescription>Average email open rate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.openRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Click Rate</CardTitle>
            <CardDescription>Average click-through rate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.clickRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bounce Rate</CardTitle>
            <CardDescription>Average bounce rate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.bounceRate}%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Campaign Performance</CardTitle>
          <CardDescription>Email engagement metrics for your recent campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] mt-4">

          </div>
        </CardContent>
      </Card>
    </div>
  );
} 