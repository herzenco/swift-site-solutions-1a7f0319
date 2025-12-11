import { motion } from "framer-motion";
import { Zap, Clock, Bot, Shield, TrendingUp, Palette } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Lightning Fast Delivery",
    description: "Get your fully custom website live in just 1–2 weeks. No endless waiting.",
  },
  {
    icon: Bot,
    title: "AI-Powered Automation",
    description: "Built-in AI tools handle communication, scheduling, and lead management automatically.",
  },
  {
    icon: Palette,
    title: "Modern, Custom Design",
    description: "Sleek, conversion-focused designs tailored to your brand—never generic templates.",
  },
  {
    icon: Shield,
    title: "Reliable Maintenance",
    description: "Affordable monthly plans keep your site secure, updated, and running smoothly.",
  },
  {
    icon: TrendingUp,
    title: "SEO That Ranks",
    description: "Optional SEO packages to drive organic traffic and grow your business.",
  },
  {
    icon: Zap,
    title: "Scalable Solutions",
    description: "From startups to enterprises—our sites grow with your business needs.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Benefits = () => {
  return (
    <section id="benefits" className="section-padding bg-background relative">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Why businesses <span className="text-gradient">choose us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We combine speed, design excellence, and intelligent automation to deliver 
            websites that actually drive results.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
