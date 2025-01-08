"use client";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { CREDIT_PRODUCTS } from "@/lib/stripe";
import { createCheckoutSession } from "@/app/actions/credits";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreditPurchaseProps {
  productKey: keyof typeof CREDIT_PRODUCTS;
  credits: number;
  price: number;
}

export function CreditPurchase({ productKey, credits, price }: CreditPurchaseProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      const result = await createCheckoutSession(productKey);
      if (!result.success || !result.url) {
        throw new Error(result.error || "Failed to create checkout session");
      }

      router.replace(result.url);
    } catch (error) {
      console.error("Failed to initiate purchase:", error);
      toast.error("Failed to initiate purchase");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{credits.toLocaleString()} Credits</CardTitle>
        <CardDescription>Perfect for {getPackageDescription(credits)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="text-3xl font-bold">${price}</div>
        <p className="text-sm text-muted-foreground mt-2">
          ${(price / credits * 1000).toFixed(2)} per 1,000 credits
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handlePurchase} disabled={isLoading}>
          {isLoading ? "Redirecting..." : "Purchase"}
        </Button>
      </CardFooter>
    </Card>
  );
}

function getPackageDescription(credits: number) {
  if (credits <= 1000) return "small campaigns";
  if (credits <= 5000) return "growing businesses";
  return "large scale operations";
} 