import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PlanDetails {
  name: string;
  subtitle: string;
  monthly: string;
  description: string;
  highlights: string[];
  foundation: string[];
  automation?: string[];
  optimization?: string[];
  popular: boolean;
}

const plans: PlanDetails[] = [
  {
    name: "Core",
    subtitle: "Foundation System",
    monthly: "$150",
    description: "A reliable website system that runs without intervention.",
    highlights: [
      "Secure hosting & monitoring",
      "Ongoing maintenance & updates",
      "Conversion-focused layout",
      "Contact forms & scheduling",
    ],
    foundation: [
      "Secure hosting",
      "Uptime & performance monitoring",
      "Ongoing maintenance & updates",
      "Conversion-focused layout",
      "Contact forms & basic scheduling",
      "Analytics (traffic + submissions)",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Active",
    subtitle: "Automated System",
    monthly: "$400",
    description: "A system that captures, responds, and books automatically.",
    highlights: [
      "Everything in Core",
      "AI chat & lead qualification",
      "Automated follow-ups",
      "Scheduling & CRM integration",
    ],
    foundation: [
      "Secure hosting",
      "Uptime & performance monitoring",
      "Ongoing maintenance & updates",
      "Conversion-focused layout",
      "Contact forms & basic scheduling",
      "Analytics (traffic + submissions)",
      "Email support",
    ],
    automation: [
      "AI chat for instant responses & lead qualification",
      "Automated email follow-ups",
      "Scheduling automation",
      "Lead routing & CRM integration",
      "Conversion tracking",
    ],
    popular: true,
  },
  {
    name: "Optimized",
    subtitle: "Performance System",
    monthly: "$600",
    description: "A continuously improving website system.",
    highlights: [
      "Everything in Active",
      "Ongoing SEO monitoring",
      "Quarterly optimization updates",
      "Priority support",
    ],
    foundation: [
      "Secure hosting",
      "Uptime & performance monitoring",
      "Ongoing maintenance & updates",
      "Conversion-focused layout",
      "Contact forms & basic scheduling",
      "Analytics (traffic + submissions)",
      "Email support",
    ],
    automation: [
      "AI chat for instant responses & lead qualification",
      "Automated email follow-ups",
      "Scheduling automation",
      "Lead routing & CRM integration",
      "Conversion tracking",
    ],
    optimization: [
      "Ongoing technical SEO monitoring",
      "Quarterly conversion optimization updates",
      "Enhanced analytics & reporting",
      "Priority support",
    ],
    popular: false,
  },
];

interface FeatureBlockProps {
  title: string;
  features: string[];
}

const FeatureBlock = ({ title, features }: FeatureBlockProps) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <div className="h-px flex-1 bg-primary/20" />
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
        {title}
      </span>
      <div className="h-px flex-1 bg-primary/20" />
    </div>
    <ul className="space-y-2">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-2">
          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span className="text-sm text-muted-foreground">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);

  return (
    <section id="pricing" className="py-16 md:py-20 bg-card/30 relative">
      <div className="container-tight px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Three levels of <span className="text-gradient">system maturity</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            More capability. More automation. More leverage.
          </p>
          <div className="inline-block bg-primary/10 border border-primary/20 rounded-xl px-6 py-4">
            <p className="text-lg font-semibold text-foreground">$2,000 one-time setup</p>
            <p className="text-sm text-muted-foreground">Strategy, design, build, configuration, and launch.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-6 rounded-2xl border transition-all duration-300 flex flex-col ${
                plan.popular
                  ? "border-primary/50 bg-gradient-to-b from-primary/10 to-background shadow-[0_0_40px_-15px_hsl(var(--primary)/0.3)]"
                  : "bg-background/30 border-border/50 hover:border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-4">
                <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${plan.popular ? "text-primary" : "text-muted-foreground"}`}>
                  {plan.subtitle}
                </p>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{plan.monthly}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-sm text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 mt-auto">
                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full"
                  size="lg"
                  asChild
                >
                  <a href="#contact">
                    Get started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground hover:text-foreground"
                  size="sm"
                  onClick={() => setSelectedPlan(plan)}
                >
                  Learn more
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-muted-foreground mt-12"
        >
          No long-term contracts. Cancel anytime.
        </motion.p>
      </div>

      {/* Plan Details Modal */}
      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  {selectedPlan?.subtitle}
                </p>
                <DialogTitle className="text-2xl font-bold">{selectedPlan?.name}</DialogTitle>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">{selectedPlan?.monthly}</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-2">{selectedPlan?.description}</p>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {selectedPlan?.foundation && (
              <FeatureBlock title="Foundation" features={selectedPlan.foundation} />
            )}
            {selectedPlan?.automation && (
              <FeatureBlock title="Automation" features={selectedPlan.automation} />
            )}
            {selectedPlan?.optimization && (
              <FeatureBlock title="Optimization" features={selectedPlan.optimization} />
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <Button variant="hero" className="w-full" size="lg" asChild>
              <a href="#contact">
                Get started with {selectedPlan?.name}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};