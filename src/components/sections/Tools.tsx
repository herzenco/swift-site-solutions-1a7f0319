import { motion } from "framer-motion";
import { Calendar, MessageSquare, Users, BarChart3 } from "lucide-react";

const tools = [
  {
    icon: Calendar,
    title: "Scheduling",
    description: "Automated booking & reminders",
  },
  {
    icon: MessageSquare,
    title: "AI Chat",
    description: "24/7 lead qualification",
  },
  {
    icon: Users,
    title: "Lead CRM",
    description: "Capture & nurture contacts",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Track what matters",
  },
];

export const Tools = () => {
  return (
    <section id="tools" className="py-20 bg-card/30 relative overflow-hidden">
      <div className="container-tight px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Built-in <span className="text-gradient">tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Everything you need to automate your workflow
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-xl border border-border/50 hover:border-primary/30 bg-background/50 backdrop-blur-sm transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <tool.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{tool.title}</h3>
              <p className="text-muted-foreground text-sm">{tool.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
