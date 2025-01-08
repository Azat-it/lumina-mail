"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogTitle, DialogHeader, DialogContent, DialogTrigger, DialogFooter, DialogDescription } from "@workspace/ui/components/dialog";
import { LogOutIcon } from "lucide-react";

export function LogoutButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <LogOutIcon className="w-4 h-4" />
          Logout
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to logout?
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => signOut()}>Logout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}