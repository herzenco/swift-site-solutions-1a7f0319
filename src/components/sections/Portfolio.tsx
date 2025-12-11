import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Real Estate Platform",
    category: "Real Estate",
    description: "Full-featured listing management with AI-powered showing scheduler and lead qualification.",
    features: ["Listing Management", "Showing Scheduler", "AI Chat"],
  },
  {
    title: "Law Firm Portal",
    category: "Legal Services",
    description: "Client intake automation with document management and consultation booking.",
    features: ["Client Portal", "Document Upload", "Scheduling"],
  },
  {
    title: "Fitness Studio Hub",
    category: "Health & Wellness",
    description: "Class booking system with membership management and automated reminders.",
    features: ["Class Booking", "Membership Portal", "Notifications"],
  },
  {
    title: "Consulting Agency",
    category: "Professional Services",
    description: "Lead generation site with project inquiry forms and proposal automation.",
    features: ["Lead Capture", "CRM Integration", "Analytics"],
  },
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="section-padding bg-card/30 relative">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            What we <span className="text-gradient">build</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From startups to established businesses, we create custom solutions 
            that fit your unique needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    {project.category}
                  </span>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-secondary text-sm text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
