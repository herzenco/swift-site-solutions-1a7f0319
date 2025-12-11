import { motion } from "framer-motion";
import { Calendar, Users, MessageSquare, BarChart3, FileText, Bell } from "lucide-react";

const tools = [
  {
    icon: Calendar,
    title: "Scheduling Management",
    description: "Automated appointment booking with calendar sync, reminders, and conflict detection.",
    example: "Perfect for showings, consultations, and client meetings",
  },
  {
    icon: FileText,
    title: "Listing Management",
    description: "Centralized dashboard to manage, update, and showcase your inventory or services.",
    example: "Ideal for real estate, rentals, or product catalogs",
  },
  {
    icon: MessageSquare,
    title: "AI Communication",
    description: "Smart chatbots and auto-responses that qualify leads and answer questions 24/7.",
    example: "Respond instantly to inquiries, even while you sleep",
  },
  {
    icon: Users,
    title: "Lead Management",
    description: "Capture, track, and nurture leads with automated follow-ups and CRM integration.",
    example: "Never lose a potential client again",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time insights into traffic, conversions, and user behavior.",
    example: "Data-driven decisions at your fingertips",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Automated alerts for new leads, appointments, and important updates.",
    example: "Stay informed without the constant checking",
  },
];

export const Tools = () => {
  return (
    <section id="tools" className="section-padding bg-card/30 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Powerful tools, <span className="text-gradient">built-in</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every website comes with customizable AI-powered tools designed to automate 
            your daily operations and save hours of manual work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex gap-4 p-6 rounded-2xl glass hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
                <tool.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-muted-foreground mb-2">{tool.description}</p>
                <p className="text-sm text-primary/80 italic">{tool.example}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
