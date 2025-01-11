import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Fade } from "../../motions/fade";

const pricingOptions = [
  {
    price: "$5",
    credits: "5,000 Credits",
    description: "Perfect for growing businesses",
    pricePerCredit: "$1.00 per 1,000 credits"
  },
  {
    price: "$18",
    credits: "20,000 Credits",
    description: "Perfect for large scale operations",
    pricePerCredit: "$0.90 per 1,000 credits"
  },
  {
    price: "$85",
    credits: "100,000 Credits",
    description: "Perfect for large scale operations",
    pricePerCredit: "$0.85 per 1,000 credits"
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-6">
        <Fade delay={0.1}>
          <div className="mx-auto space-y-4 text-center">
            <h2 className="text-4xl md:text-5xl tracking-tight">
              Simple pricing for everyone
            </h2>
            <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
              Lumina Mail is a pay-as-you-go service. You only pay for what you use.
              <br />
              Each <span className="font-bold text-primary">email</span> you send costs = 1 credit.
            </p>
          </div>
        </Fade>

        <Fade delay={0.2}>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pricingOptions.map((option, index) => (
              <Card
                key={index}
                className="relative flex flex-col overflow-hidden rounded-2xl border bg-card"
              >
                <CardHeader>
                  <CardTitle>
                    {option.credits}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    {option.description}
                  </p>
                </CardHeader>

                <CardContent className="flex items-baseline gap-x-2">
                  <span className="text-5xl font-bold tracking-tight">
                    {option.price}
                  </span>
                </CardContent>

                <CardFooter>
                  <p className="text-sm text-muted-foreground mt-2">
                    {option.pricePerCredit}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Fade>
      </div >
    </section >
  );
}