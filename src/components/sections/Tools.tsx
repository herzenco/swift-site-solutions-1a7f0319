import { motion } from "framer-motion";
import { Calendar, MessageSquare, Users, BarChart3 } from "lucide-react";

const tools = [
  {
    icon: Calendar,
    title: "Scheduling",
    description: "Automated booking, reminders, and calendar syncing",
  },
  {
    icon: MessageSquare,
    title: "AI Chat",
    description: "24/7 lead qualification and instant responses",
  },
  {
    icon: Users,
    title: "Lead CRM",
    description: "Centralized inquiries and contact management",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Insights into traffic, conversions, and performance",
  },
];

export const Tools = () => {
  return (
    <section id="tools" className="py-16 md:py-20 bg-background relative overflow-hidden">
      <div className="container-tight px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Built-in tools to <span className="text-gradient">automate your workflow</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Everything is configured during your build — no waiting weeks for setup.
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
              className="group p-8 rounded-2xl border border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm transition-all duration-500"
            >
              <div className="hidden lg:flex icon-container w-14 h-14 mb-6">
                <tool.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{tool.title}</h3>
              <p className="text-muted-foreground">{tool.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
