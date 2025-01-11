import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import { Fade } from '../../motions/fade';

const features = [
  {
    title: "Visual Email Builder",
    description: "Build your emails visually, without the need to code. Drag and drop components like images, buttons will be added in the future.",
    content: {
      highlights: [
        "Intuitive drag-and-drop interface",
        "Real-time preview functionality",
        "Mobile-responsive design tools",
        "Custom HTML support",
        "Save and reuse components"
      ],
      details: "Our visual email builder makes creating beautiful emails as simple as possible. With our intuitive interface, you can design professional-looking emails in minutes. Preview your designs in real-time and ensure they look perfect across all devices."
    },
    comingSoon: false
  },
  {
    title: "Pay as you go",
    description: "Pay only for what you use. No monthly fees, no hidden costs. No forced subscriptions.",
    content: {
      highlights: [
        "Transparent pricing",
        "No monthly commitments",
        "Volume-based discounts",
        "Automatic credit top-ups",
        "Detailed usage reports"
      ],
      details: "Our flexible pricing model ensures you only pay for the emails you send. No hidden fees, no complicated tiers - just straightforward, transparent pricing that scales with your needs."
    },
    comingSoon: false
  },
  {
    title: "Powerful email delivery",
    description: "We use the resend to deliver your emails to your customers. Resend is one of high success rate email delivery services.",
    content: {
      highlights: [
        "High deliverability rates",
        "Automatic bounce handling",
        "SPF and DKIM authentication",
        "Real-time delivery tracking",
        "Smart sending optimization"
      ],
      details: "Powered by industry-leading email infrastructure, our delivery system ensures your emails reach their destination. With advanced authentication and optimization features, you can trust that your messages will be delivered reliably."
    },
    comingSoon: false
  },
  {
    title: "Campaign Analytics",
    description: "Click and open rates, bounce rates, and more. We will be adding more analytics in the future.",
    content: {
      highlights: [
        "Real-time tracking",
        "Detailed engagement metrics",
        "Custom report generation",
        "A/B testing insights",
        "Geographic analytics"
      ],
      details: "Make data-driven decisions with our comprehensive analytics suite. Track opens, clicks, and engagement in real-time, and use these insights to optimize your email campaigns for better performance."
    },
    comingSoon: false
  },
  {
    title: "Template library",
    description: "We have a library of templates to get you started. You can also create your own templates.",
    content: {
      highlights: [
        "Pre-designed templates",
        "Industry-specific designs",
        "Custom template creation",
        "Template sharing",
        "Version control"
      ],
      details: "Access our growing library of professional email templates, designed for various industries and purposes. Customize existing templates or create your own to maintain brand consistency."
    },
    comingSoon: true
  },
  {
    title: "Automated workflows",
    description: "Schedule your emails to be sent at a specific time. We will handle the rest.",
    content: {
      highlights: [
        "Advanced scheduling",
        "Trigger-based automation",
        "Multi-step campaigns",
        "Conditional logic",
        "Time zone optimization"
      ],
      details: "Set up sophisticated email sequences that automatically trigger based on user behavior or scheduled times. Our automation tools help you engage with your audience at the right moment."
    },
    comingSoon: true
  },
  {
    title: "API",
    description: "We have a powerful API to integrate with your existing systems.",
    content: {
      highlights: [
        "RESTful API endpoints",
        "Comprehensive documentation",
        "Webhook support",
        "SDK availability",
        "Rate limiting controls"
      ],
      details: "Integrate our email platform seamlessly with your existing systems using our robust API. With comprehensive documentation and support, you can automate your email operations programmatically."
    },
    comingSoon: true
  },
  {
    title: "AI Agent",
    description: "Use AI agent to help you create your emails fast and grammer mistakes free.",
    content: {
      highlights: [
        "Smart content suggestions",
        "Grammar correction",
        "Subject line optimization",
        "Sentiment analysis",
        "Personalization assistance"
      ],
      details: "Let our AI assistant help you create more engaging emails. From grammar checking to content suggestions, our AI tools ensure your emails are polished and professional."
    },
    comingSoon: true
  }
];

export function FeaturesSectionDemo() {
  return (
    <div className="container relative mx-auto px-4 max-w-7xl">
      <Fade delay={0.1}>
        <h2 className="text-4xl md:text-5xl text-foreground mt-32">Features</h2>
      </Fade>
      <Fade delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 mx-auto">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </Fade>
    </div>
  );
}

const Feature = ({
  title,
  description,
  content,
  icon,
  index,
  comingSoon,
}: {
  title: string;
  description: string;
  content: {
    highlights: string[];
    details: string;
  };
  icon?: React.ReactNode;
  index: number;
  comingSoon: boolean;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "flex flex-col lg:border-r py-10 relative border-border",
            (index === 0 || index === 4) && "lg:border-l border-border",
            index < 4 && "lg:border-b border-border",
            !comingSoon && "group/feature"
          )}
        >
          {index < 4 && (
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-accent to-transparent pointer-events-none" />
          )}
          {index >= 4 && (
            <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-accent to-transparent pointer-events-none" />
          )}
          <div className="mb-4 relative z-10 px-10 text-foreground">{icon}</div>
          <div className="text-lg font-bold mb-2 relative z-10 px-10">
            <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-16 w-1 rounded-tr-full rounded-br-full bg-accent group-hover/feature:bg-primary transition-all duration-200 origin-center" />
            <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
              {title}
            </span>
          </div>
          <p className="text-sm text-foreground max-w-xs relative z-10 px-10">
            {description}
          </p>
          {comingSoon && (
            <div className="absolute top-2 right-2 text-xs text-foreground">
              <Badge variant="outline">Coming soon</Badge>
            </div>
          )}
          {comingSoon && <div className="absolute inset-0 bg-background/60 z-10" />}
        </div>
      </DialogTrigger>

      {!comingSoon && (
        <DialogContent className="sm:max-w-[600px]">
          <Fade delay={0.1}>
            <DialogTitle className="text-2xl mb-2">{title}</DialogTitle>
            <DialogDescription className="mb-6">{content.details}</DialogDescription>
            <div className="space-y-2">
              <h4 className="text-sm mb-2">Key Features:</h4>
              <ul className="list-disc pl-6 space-y-2">
                {content.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </div>
          </Fade>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default FeaturesSectionDemo;