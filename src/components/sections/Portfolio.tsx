import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const industries = [
  {
    title: "Real Estate & Property Services",
    description: "Automate inquiries, manage showings, and capture leads without manual follow-ups.",
    href: "/use-cases/real-estate",
  },
  {
    title: "Home & Local Services",
    description: "Convert inbound traffic into booked jobs with automated scheduling and follow-ups.",
    href: "/use-cases/home-services",
  },
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="pt-16 pb-12 bg-background relative">
      <div className="container-tight px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 id="portfolio-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Who We <span className="text-gradient">Build For</span>
          </h2>
          <p className="text-xl text-primary font-medium max-w-3xl mx-auto mb-4">
            Smart, growth-focused businesses that rely on leads, scheduling, and client communication.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground text-center max-w-3xl mx-auto mb-12"
        >
          If your business depends on turning interest into booked appointments, conversations, or clients, we build systems that handle it automatically. Our websites combine modern design with AI-powered tools to help businesses operate faster, convert more leads, and scale without adding complexity.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={industry.href}
                className="group block p-8 rounded-2xl border border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm transition-all duration-500 h-full"
              >
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold group-hover:text-gradient transition-all duration-300">{industry.title}</h3>
                </div>
                <p className="text-muted-foreground">{industry.description}</p>
                <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary transition-colors">
                  <span className="font-semibold">Learn More</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/who-we-build-for"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            Explore how we tailor systems for your industry
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
