import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const trustLogos = [
  "Real Estate Pros",
  "Law Firms",
  "Studios",
  "Consultants",
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Single subtle orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container-tight section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Custom AI-powered websites
            <br />
            <span className="text-gradient">delivered in 5–10 days</span>
          </h1>

          {/* Subheadline */}
          <p className="text-2xl sm:text-3xl font-semibold text-foreground/90 mb-4">
            Built fast. Built right. Automations included.
          </p>

          {/* Supporting line */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            We build modern websites with integrated AI tools, automation, scheduling, CRM, and more.
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#contact">
                Start your 10-day build
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-4"
          >
            <p className="text-sm text-muted-foreground">
              Trusted by real estate professionals, law firms, studios, and consultants
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {trustLogos.map((logo, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-lg bg-card/50 border border-border/50 text-sm text-muted-foreground"
                >
                  {logo}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
