import { motion } from "framer-motion";

const projects = [
  {
    title: "Real Estate",
    description: "Listing management & AI scheduling",
  },
  {
    title: "Law Firm",
    description: "Client intake & document portal",
  },
  {
    title: "Fitness Studio",
    description: "Class booking & membership",
  },
  {
    title: "Consulting",
    description: "Lead capture & proposal automation",
  },
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 bg-card/30 relative">
      <div className="container-tight px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            What we <span className="text-gradient">build</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Solutions for any industry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-xl border border-border/50 hover:border-primary/30 bg-background/50 backdrop-blur-sm transition-all duration-500"
            >
              <h3 className="text-2xl font-bold mb-2 group-hover:text-gradient transition-all duration-300">{project.title}</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
