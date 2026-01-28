import { motion } from "framer-motion";
import { Zap, Target, Clock } from "lucide-react";

const principles = [
  {
    icon: Zap,
    title: "Automation first",
    description: "Websites shouldn't rely on human availability.",
  },
  {
    icon: Target,
    title: "Conversion over decoration",
    description: "Design exists to drive action.",
  },
  {
    icon: Clock,
    title: "Built to run without babysitting",
    description: "Sites should work 24/7.",
  },
];

export const HowWeThink = () => {
  return (
    <section className="pt-12 md:pt-16 pb-16 md:pb-20 bg-background">
      <div className="container-tight px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="how-we-think-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 px-2 sm:px-0">
            Most websites look fine. <span className="text-gradient">They just don't do anything.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            They collect form submissions, send you an email, and hope you follow up in time. 
            Meanwhile, leads go cold. We build sites that work differently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                <principle.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {principle.title}
              </h3>
              <p className="text-muted-foreground">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          This approach works best for service businesses that depend on leads and bookings.
        </motion.p>
      </div>
    </section>
  );
};
