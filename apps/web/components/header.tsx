"use client"

import { getUserCredits } from "@/app/actions/credits";
import { Button } from "@workspace/ui/components/button";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { useEffect, useState } from "react";

export function Header() {
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    getUserCredits().then((credits) => setCredits(credits.data?.balance || 0));
  }, []);

  return (
    <div className="flex items-center justify-between gap-2">
      <Button variant="outline" size="icon" asChild>
        <SidebarTrigger />
      </Button>
      <p className="text-sm text-muted-foreground">Credits: {credits}</p>
    </div>
  )
}