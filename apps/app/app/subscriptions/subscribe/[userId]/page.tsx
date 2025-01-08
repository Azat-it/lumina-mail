import { prisma } from "@/lib/db";
import { SubscribeForm } from "./subscribe-form";
import { Card, CardDescription, CardTitle, CardHeader, CardContent } from "@workspace/ui/components/card";

interface SubscribePageProps {
  params: {
    userId: string;
  };
}

export default async function SubscribePage({ params }: SubscribePageProps) {
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    select: { name: true, id: true },
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Subscription Link</h1>
          <p className="text-muted-foreground mb-4">
            This subscription link appears to be invalid.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <Card className="max-w-md w-full rounded-lg shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Subscribe to {user.name}
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Stay up to date with our latest news and updates.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SubscribeForm userId={user.id} />
        </CardContent>
      </Card>
    </div>
  );
} 