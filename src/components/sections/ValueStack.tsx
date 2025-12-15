import { motion } from "framer-motion";
import { 
  Paintbrush, 
  MousePointerClick,
  Bot, 
  Calendar, 
  FileText, 
  Users, 
  Search, 
  Zap, 
  BarChart3, 
  Video, 
  Headphones,
  Clock
} from "lucide-react";

const features = [
  { icon: Paintbrush, label: "Custom responsive design" },
  { icon: MousePointerClick, label: "Conversion-focused UX" },
  { icon: Bot, label: "AI chatbot setup" },
  { icon: Calendar, label: "Scheduling automation" },
  { icon: FileText, label: "Lead capture and forms" },
  { icon: Users, label: "CRM integration" },
  { icon: Search, label: "On-page SEO" },
  { icon: Zap, label: "Speed optimization" },
  { icon: BarChart3, label: "Analytics dashboard" },
  { icon: Video, label: "Training videos" },
  { icon: Headphones, label: "Ongoing support" },
  { icon: Clock, label: "5 to 10 day delivery" },
];

export const ValueStack = () => {
  return (
    <section id="value" className="pt-6 pb-32 bg-card/30 relative">
      <div className="container-tight px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Everything <span className="text-gradient">you get</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm"
            >
              <div className="icon-container w-10 h-10 shrink-0">
                <feature.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-medium">{feature.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
