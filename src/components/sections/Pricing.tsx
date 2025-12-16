import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const foundationFeatures = [
  "Secure hosting",
  "Uptime & performance monitoring",
  "Ongoing maintenance & updates",
  "Conversion-focused layout",
  "Contact forms & basic scheduling",
  "Analytics (traffic + submissions)",
  "Email support",
];

const automationFeatures = [
  "AI chat for instant responses & lead qualification",
  "Automated email follow-ups",
  "Scheduling automation",
  "Lead routing & CRM integration",
  "Conversion tracking",
];

const optimizationFeatures = [
  "Ongoing technical SEO monitoring",
  "Quarterly conversion optimization updates",
  "Enhanced analytics & reporting",
  "Priority support",
];

interface FeatureBlockProps {
  title: string;
  features: string[];
  accentColor?: string;
}

const FeatureBlock = ({ title, features, accentColor = "primary" }: FeatureBlockProps) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <div className={`h-px flex-1 bg-${accentColor}/20`} />
      <span className={`text-xs font-semibold uppercase tracking-wider text-${accentColor}`}>
        {title}
      </span>
      <div className={`h-px flex-1 bg-${accentColor}/20`} />
    </div>
    <ul className="space-y-2">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-2">
          <Check className={`w-4 h-4 text-${accentColor} shrink-0 mt-0.5`} />
          <span className="text-sm text-muted-foreground">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const Pricing = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end">
          {/* Core - Foundation System */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="relative p-6 rounded-2xl border bg-background/30 border-border/50 hover:border-border transition-all duration-300"
          >
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Foundation System</p>
              <h3 className="text-2xl font-bold mb-2">Core</h3>
              <p className="text-muted-foreground text-sm">A reliable website system that runs without intervention.</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$150</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <FeatureBlock title="Foundation" features={foundationFeatures} accentColor="muted-foreground" />
            </div>

            <Button
              variant="outline"
              className="w-full border-border/50 hover:border-primary/50"
              size="lg"
              asChild
            >
              <a href="#contact">
                Get started
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>

          {/* Active - Automated System (Most Popular) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative p-8 rounded-2xl border-2 border-primary/50 bg-gradient-to-b from-primary/10 via-background to-background shadow-[0_0_60px_-15px_hsl(var(--primary)/0.4)] md:-mt-4"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg">
                Most Popular
              </span>
            </div>

            <div className="mb-6 pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Automated System</p>
              <h3 className="text-2xl font-bold mb-2">Active</h3>
              <p className="text-muted-foreground text-sm">A system that captures, responds, and books automatically.</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">$400</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <FeatureBlock title="Foundation" features={foundationFeatures} accentColor="primary" />
              <FeatureBlock title="Automation" features={automationFeatures} accentColor="primary" />
            </div>

            <Button
              variant="hero"
              className="w-full"
              size="lg"
              asChild
            >
              <a href="#contact">
                Get started
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>

          {/* Optimized - Performance System */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative p-8 rounded-2xl border bg-gradient-to-b from-muted/30 via-background/80 to-background border-muted/50 hover:border-primary/30 transition-all duration-300"
          >
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-2">Performance System</p>
              <h3 className="text-2xl font-bold mb-2">Optimized</h3>
              <p className="text-muted-foreground text-sm">A continuously improving website system.</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$600</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <FeatureBlock title="Foundation" features={foundationFeatures} accentColor="foreground" />
              <FeatureBlock title="Automation" features={automationFeatures} accentColor="foreground" />
              <FeatureBlock title="Optimization" features={optimizationFeatures} accentColor="foreground" />
            </div>

            <Button
              variant="outline"
              className="w-full border-muted/50 hover:border-primary/50 hover:bg-primary/5"
              size="lg"
              asChild
            >
              <a href="#contact">
                Get started
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
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