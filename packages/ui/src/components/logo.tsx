import { cn } from "@workspace/ui/lib/utils";

export function Logo({ className }: { className?: string }) {
  return <h1 className={cn("text-xl font-bold", className)}>Lumina <span className="text-primary-foreground p-1 bg-gradient-to-b from-primary to-primary/80 rounded-[8px]">Mail</span></h1>;
}
