import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    setupFee: "$1,500",
    monthly: "$200",
    description: "Perfect for small businesses ready to go digital",
    features: [
      "Custom responsive website",
      "AI-powered chatbot",
      "Scheduling integration",
      "Lead capture forms",
      "Monthly maintenance & updates",
      "SSL security certificate",
      "1-2 week delivery",
    ],
    popular: false,
  },
  {
    name: "Growth",
    setupFee: "$2,000",
    monthly: "$400",
    description: "For businesses focused on organic growth",
    features: [
      "Everything in Starter",
      "Full SEO optimization",
      "Keyword research & strategy",
      "Technical SEO setup",
      "Local SEO (if applicable)",
      "Monthly SEO reports",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Scale",
    setupFee: "$2,000",
    monthly: "$600",
    description: "Maximum visibility and content marketing",
    features: [
      "Everything in Growth",
      "1-2 SEO-optimized blog posts/month",
      "Content strategy planning",
      "Internal linking optimization",
      "Competitor analysis",
      "Quarterly strategy calls",
      "Dedicated account manager",
    ],
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="section-padding bg-background relative">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Simple, <span className="text-gradient">transparent pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            One-time setup fee, predictable monthly costs. No surprises, no hidden fees.
          </p>
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
                  : "bg-card/50 border-border hover:border-primary/30"
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

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold">{plan.setupFee}</span>
                  <span className="text-muted-foreground">setup</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-primary">{plan.monthly}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full"
                size="lg"
                asChild
              >
                <a href="#contact">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
