import { FadeFromBottom } from "@/motions/fade";
import { Logo } from "@workspace/ui/components/logo";
import Link from "next/link";

export default function Footer() {
  return <FadeFromBottom className="max-w-[800px] mx-auto px-4 py-8 z-0">
    <div className="text-8xl font-bold text-center mb-16">
      <span className="bg-gradient-to-t from-foreground/5 to-foreground/70 bg-clip-text text-transparent">
        Lumina Mail
      </span>
    </div>
    <div className="flex justify-between items-center">
      <div>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Lumina Mail. All rights reserved.
      </div>
    </div>
  </FadeFromBottom>;
}

