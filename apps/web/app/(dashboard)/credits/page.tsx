import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CREDIT_PRODUCTS } from "@/lib/stripe";
import { CreditPurchase } from "./credit-purchase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { CreditHistory } from "./credit-history";

export default async function CreditsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session?.user?.id) {
    return null;
  }

  const credits = await prisma.credits.findUnique({
    where: { userId: session.user.id },
  });

  const transactions = await prisma.creditTransaction.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div className="container max-w-[1400px] mx-auto flex flex-col gap-8 w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Credits</h1>
        <p className="text-sm text-muted-foreground">
          Purchase and manage your email credits
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Current Balance</CardTitle>
            <CardDescription>Your available email credits</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{credits?.balance ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Purchase Credits</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(CREDIT_PRODUCTS).map(([key, product]) => (
            <CreditPurchase
              key={key}
              productKey={key as keyof typeof CREDIT_PRODUCTS}
              credits={product.credits}
              price={product.price}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
        <CreditHistory transactions={transactions} />
      </div>
    </div>
  );
} 