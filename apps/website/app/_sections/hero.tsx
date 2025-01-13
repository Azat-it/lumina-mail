import { FadeFromBottom } from "@/motions/fade";
import Image from "next/image";
import Meteors from "@workspace/ui/components/meteors";
import { Fade } from '../../motions/fade';
export default function Hero() {
  return (
    <div>
      <div className="container relative mx-auto px-4 pt-52 overflow-hidden">
        <FadeFromBottom className="absolute inset-0 -z-10" duration={2}>
          <Meteors number={10} />
        </FadeFromBottom>
        <FadeFromBottom className="text-center">
          <h1 className="text-4xl md:text-6xl mb-6">
            Simple emails that is
            <br />
            not complicated.
          </h1>
        </FadeFromBottom>
        <FadeFromBottom className="text-center" delay={0.1}>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Introducing simple way to write modern emails without the complexity. Lumina Mail is simple, fast and cheap.
          </p>
        </FadeFromBottom>
        <div className="flex gap-4 justify-center">
          <FadeFromBottom delay={0.2}>
            <Image src="/campaigns.png" priority alt="hero" width={800} height={800} className="relative block h-full w-full rounded-xl z-0" />
          </FadeFromBottom>
        </div>
      </div>
      <Fade delay={0.6} duration={0.4} className="absolute inset-0 -z-10 bg-gradient-to-br dark:from-foreground/10 from-foreground/50 to-background to-40% pointer-events-none" />
    </div>
  );
}
