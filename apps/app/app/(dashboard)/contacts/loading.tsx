import { Skeleton } from "@workspace/ui/components/skeleton";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function Loading() {
  return (
    <div className="container max-w-[1400px] mx-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
            <p className="text-sm text-muted-foreground">
              Manage your contacts
            </p>
          </div>
          <Link href="/contacts/new" className="shrink-0 group">
            <Button>
              <Plus className="h-4 w-4 group-hover:rotate-180 transition duration-150" />
              New Contact
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-[300px]" />
            <Skeleton className="h-10 w-24" />
          </div>

          <div className="border rounded-lg">
            <div className="grid grid-cols-[1fr,auto,auto,auto] gap-4 p-4 border-b font-medium">
              <div>Contact</div>
              <div>Status</div>
              <div>Last Updated</div>
              <div className="w-10" />
            </div>

            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr,auto,auto,auto] gap-4 p-4 border-b last:border-0 items-center"
              >
                <div className="space-y-1">
                  <Skeleton className="h-5 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 