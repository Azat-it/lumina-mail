import { FadeFromTop } from "@/motions/fade";
import { Button } from "@workspace/ui/components/button";
import { Logo } from "@workspace/ui/components/logo";

export function Header() {
  return (
    <div className="fixed inset-x-0 top-4 z-50 mx-auto max-w-[800px]">
      <FadeFromTop delay={0.2} duration={0.4} className="bg-background/30 backdrop-blur-lg border border-primary/30 mx-4 p-2 rounded-md">
        <div className="flex items-center justify-between">
          <Logo />
          <Button>Sign in</Button>
        </div>
      </FadeFromTop>
    </div>
  );
}

