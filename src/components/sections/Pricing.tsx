import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Core",
    monthly: "$150",
    description: "A stable, reliable website system that runs without intervention.",
    features: [
      "Secure hosting",
      "Uptime and performance monitoring",
      "Ongoing maintenance and updates",
      "Conversion-focused layout",
      "Contact forms and basic scheduling",
      "Analytics (traffic and form submissions)",
      "Email support",
    ],
    excludes: [
      "AI features",
      "Automated follow-ups",
      "SEO optimization beyond technical basics",
    ],
    popular: false,
  },
  {
    name: "Active",
    monthly: "$400",
    description: "A system that captures, responds, and books automatically.",
    features: [
      "Everything in Core, plus:",
      "AI chat for instant responses and lead qualification",
      "Automated email follow-ups",
      "Scheduling automation",
      "Lead routing and CRM integration",
      "Conversion tracking",
    ],
    excludes: [],
    popular: true,
  },
  {
    name: "Optimized",
    monthly: "$600",
    description: "A continuously improving website system.",
    features: [
      "Everything in Active, plus:",
      "Ongoing technical SEO monitoring",
      "Quarterly conversion optimization updates",
      "Enhanced analytics and reporting",
      "Priority support",
    ],
    excludes: [],
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-16 md:py-20 bg-card/30 relative">
      <div className="container-tight px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Simple <span className="text-gradient">pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            One system. Three modes. Choose how much it works for you.
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
              className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-card border-primary/50 shadow-glow"
                  : "bg-background/50 border-border hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{plan.monthly}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.excludes.length > 0 && (
                <div className="mb-8 pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground/60 mb-2">Not included:</p>
                  <ul className="space-y-1">
                    {plan.excludes.map((item, i) => (
                      <li key={i} className="text-xs text-muted-foreground/50">{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full"
                size="lg"
                asChild
              >
                <a href="#contact">
                  Get started
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
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
    </section>
  );
};
