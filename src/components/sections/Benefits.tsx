import { motion } from "framer-motion";
import { Zap, Bot, Palette, Shield } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Fast",
    description: "Live in 1–2 weeks",
  },
  {
    icon: Bot,
    title: "Smart",
    description: "AI-powered automation",
  },
  {
    icon: Palette,
    title: "Custom",
    description: "Designed for you",
  },
  {
    icon: Shield,
    title: "Reliable",
    description: "Ongoing maintenance",
  },
];

export const Benefits = () => {
  return (
    <section id="benefits" className="py-32 bg-background relative">
      <div className="container-tight px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="icon-container w-16 h-16 mx-auto mb-6">
                <benefit.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
