import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Copy } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.id) {
    return null;
  }

  const subscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/subscriptions/subscribe/${session.user.id}`;

  return (
    <div className="container max-w-[1400px] mx-auto py-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Page</CardTitle>
            <CardDescription>Share this link with your audience to let them subscribe to your mailing list.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input value={subscribeUrl} readOnly />
              <Button
                variant="outline"
                size="icon"
                
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 