import { motion } from "framer-motion";
import { Calendar, Target, TrendingUp, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const fitCriteria = [
  {
    icon: Calendar,
    title: "Appointment-Based Businesses",
    description: "Businesses that sell consultations, estimates, or sessions that can be booked on a calendar.",
  },
  {
    icon: Target,
    title: "One Primary Offer",
    description: "The website exists to drive one clear action: capture a lead or book an appointment.",
  },
  {
    icon: TrendingUp,
    title: "Inbound Demand",
    description: "People are already searching for what you offer. The site's job is to convert that interest into action.",
  },
  {
    icon: Zap,
    title: "Simple Sales Flow",
    description: "No portals, user accounts, or complex workflows. Just intent → action.",
  },
  {
    icon: X,
    title: "No Custom Logic Required",
    description: "If your business needs advanced integrations, dynamic data feeds, or custom software behavior, this system is not a fit.",
  },
];

export const Portfolio = () => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="portfolio" className="pt-16 pb-12 bg-background relative">
      <div className="container-tight px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 id="portfolio-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Who This Is <span className="text-gradient">Built For</span>
          </h2>
          <p className="text-xl text-primary font-medium max-w-3xl mx-auto mb-4">
            This is a focused website system, not a custom build.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground text-center max-w-3xl mx-auto mb-12"
        >
          It's designed for businesses with simple offers and clear conversion goals.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {fitCriteria.map((criteria, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <criteria.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{criteria.title}</h3>
              <p className="text-sm text-muted-foreground">{criteria.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={scrollToPricing}
            className="mb-8"
          >
            View Packages
          </Button>
          <p className="text-muted-foreground text-sm">
            Same proven system. Clear constraints. Predictable results.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
