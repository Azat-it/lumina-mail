"use client";

import { Button } from "@workspace/ui/components/button";
import { resubscribe } from "../../actions/subscriptions";
import { useState } from "react";

export default function Resubscribe({ email, userId }: { email: string; userId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResubscribe = async () => {
    setIsLoading(true);
    const result = await resubscribe({ email, userId });
    setIsLoading(false);
    if (result.success) {
      setIsSuccess(true);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full p-6 text-center">
        {isLoading ? (
          <p className="text-muted-foreground mb-4">
            Resubscribing...
          </p>
        ) : isSuccess ? (
          <p className="text-muted-foreground mb-4">
            You have been successfully resubscribed to our mailing list.
          </p>
        ) : (
          <>
            <p className="text-muted-foreground mb-4">Was this a mistake?</p>
            <Button onClick={handleResubscribe}>Resubscribe</Button>
          </>
        )}
      </div>
    </div>
  );
}
