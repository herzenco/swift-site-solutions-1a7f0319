import { motion } from "framer-motion";
import { Wrench, TrendingUp, Users, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const audiences = [
  {
    icon: Wrench,
    title: "Service-Based Businesses",
    description: "Streamline scheduling, automate follow-ups, and simplify client communication.",
  },
  {
    icon: TrendingUp,
    title: "Sales Professionals",
    description: "Capture, qualify, and nurture leads automatically — even while you're off the clock.",
  },
  {
    icon: Users,
    title: "Growing Teams",
    description: "Centralize workflows, reduce manual tasks, and keep your operations running smoothly.",
  },
  {
    icon: Rocket,
    title: "Entrepreneurs & SMB Owners",
    description: "Get a website that acts like an employee — not a digital business card.",
  },
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="py-32 bg-background relative">
      <div className="container-tight px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Who We <span className="text-gradient">Build For</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Modern businesses that need more than a website — they need a system that works for them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-10 rounded-2xl border border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <audience.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">{audience.title}</h3>
              <p className="text-muted-foreground text-lg">{audience.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button variant="link" className="text-primary hover:text-primary/80 text-lg group">
            See how we support growth-focused businesses
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
