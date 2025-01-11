import { FadeFromTop } from "@/motions/fade";
import { Button } from "@workspace/ui/components/button";
import { Logo } from "@workspace/ui/components/logo";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { NavigationMenuDemo } from "./navigation-menu";

export function Header() {
  return (
    <div className="fixed inset-x-0 top-4 z-50 mx-auto max-w-[800px]">
      <FadeFromTop delay={0.2} duration={0.4} className="bg-background/30 backdrop-blur-lg border border-primary/30 mx-4 p-2 rounded-md">
        <div className="flex items-center justify-between">
          <Link href="/" className="ml-2">
            <Logo />
          </Link>
          <div>
            <NavigationMenuDemo />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild>
              <Link href={process.env.NEXT_PUBLIC_APP_URL + "/auth/sign-in"}>
                Sign in
              </Link>
            </Button>
          </div>
        </div>
      </FadeFromTop>
    </div>
  );
}

