import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

export default function NotFound() {
  return (
    <div className="container max-w-[1400px] mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Campaign Not Found</h1>
        <p className="text-sm text-muted-foreground">
          The campaign you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
        </p>
        <Link href="/campaigns">
          <Button>
            Return to Campaigns
          </Button>
        </Link>
      </div>
    </div>
  );
} 