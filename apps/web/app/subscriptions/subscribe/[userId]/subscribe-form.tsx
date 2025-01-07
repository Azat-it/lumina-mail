"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { toast } from "sonner";
import { subscribe } from "@/app/actions/subscriptions";

interface SubscribeFormProps {
  userId: string;
}

export function SubscribeForm({ userId }: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    try {
      setIsLoading(true);
      const result = await subscribe({
        email,
        name,
        userId,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success("Successfully subscribed!");
      setEmail("");
      setName("");
    } catch (error) {
      console.error("Failed to subscribe:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
} 