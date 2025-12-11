import { motion } from "framer-motion";
import { Building2, Scale, Dumbbell, Briefcase } from "lucide-react";

const projects = [
  {
    icon: Building2,
    title: "Real Estate",
    description: "Listing management & AI scheduling",
  },
  {
    icon: Scale,
    title: "Law Firm",
    description: "Client intake & document portal",
  },
  {
    icon: Dumbbell,
    title: "Fitness Studio",
    description: "Class booking & membership",
  },
  {
    icon: Briefcase,
    title: "Consulting",
    description: "Lead capture & proposal automation",
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
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Solutions for <span className="text-gradient">any industry</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-10 rounded-2xl border border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <project.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">{project.title}</h3>
              <p className="text-muted-foreground text-lg">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
