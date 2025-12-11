import { motion } from "framer-motion";
import { Rocket, Paintbrush, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: Rocket,
    day: "Day 1",
    title: "Kickoff",
    description: "We gather your goals and content.",
  },
  {
    icon: Paintbrush,
    day: "Days 2–7",
    title: "Design & Build",
    description: "Custom design, integrations, and automations.",
  },
  {
    icon: PartyPopper,
    day: "Days 8–10",
    title: "Launch",
    description: "Final tweaks, go-live, and training.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="process" className="py-32 bg-background relative overflow-hidden">
      <div className="container-tight px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            A simple <span className="text-gradient">3-step process</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center p-8"
            >
              {/* Step number */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className="icon-container w-16 h-16 mx-auto mb-6">
                <step.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <p className="text-primary font-semibold text-sm mb-2">{step.day}</p>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
