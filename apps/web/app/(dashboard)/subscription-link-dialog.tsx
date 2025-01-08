"use client";

import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import Link from "next/link";
import { useState } from "react";

export function SubscriptionLinkDialog({ userId }: { userId: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const subscriptionLink = `${process.env.NEXT_PUBLIC_APP_URL}/subscriptions/subscribe/${userId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(subscriptionLink);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Subscribe link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscribe link</DialogTitle>
          <DialogDescription>
            This is the link that you need to share with your customers to subscribe to your newsletter.
          </DialogDescription>
        </DialogHeader>
        <Input
          value={subscriptionLink}
          readOnly
        />
        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button asChild variant="outline">
            <Link href={subscriptionLink} target="_blank">
              Preview
            </Link>
          </Button>
          <Button onClick={handleCopy}>
            {isCopied ? "Copied!" : "Copy"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}