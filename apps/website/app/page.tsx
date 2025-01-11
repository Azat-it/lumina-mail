import Hero from "./_sections/hero";
import Features from "./_sections/features";
// import { LuminaBrings } from "./_sections/lumina-brings";
import Pricing from "./_sections/pricing";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      {/* <LuminaBrings /> */}
      <Features />
      <Pricing />
    </div>
  );
}