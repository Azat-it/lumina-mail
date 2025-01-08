"use client"

import { getUserCredits } from "@/app/actions/credits";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { CreditCard, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Skeleton } from "@workspace/ui/components/skeleton";

export function Header() {
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    getUserCredits().then((credits) => setCredits(credits.data?.balance || 0));
  }, []);

  return (
    <div className="sticky top-2 z-50 border container max-w-[1400px] mx-auto p-2 rounded-lg bg-background/40 backdrop-blur-lg">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <SidebarTrigger />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="default">
            <CreditCard className="w-4 h-4 mr-2" />
            <span className="text-sm flex items-center gap-2">Credits: {credits || <Skeleton className="w-12 h-4 bg-primary-foreground/80" />}</span>
          </Badge>
          <Button variant="outline" size="icon" asChild>
            <Link href="/credits">
              <PlusCircle className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}