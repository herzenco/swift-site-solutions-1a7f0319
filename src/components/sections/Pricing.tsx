import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    setupFee: "$1,500",
    monthly: "$200",
    features: ["Custom website", "AI chatbot", "Scheduling", "Maintenance"],
    popular: false,
  },
  {
    name: "Growth",
    setupFee: "$2,000",
    monthly: "$400",
    features: ["Everything in Starter", "Full SEO optimization", "Monthly reports", "Priority support"],
    popular: true,
  },
  {
    name: "Scale",
    setupFee: "$2,000",
    monthly: "$600",
    features: ["Everything in Growth", "Blog content", "Strategy calls", "Dedicated manager"],
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-background relative">
      <div className="container-tight px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Simple <span className="text-gradient">pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            One-time setup. Predictable monthly cost.
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
              className={`relative p-6 rounded-xl border transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-card border-primary/50 shadow-glow"
                  : "bg-card/50 border-border hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold">{plan.setupFee}</span>
                  <span className="text-muted-foreground">setup</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-primary">{plan.monthly}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
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
                  Get started
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
