import { motion } from "framer-motion";
import { ArrowRight, Wrench, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

export const Portfolio = () => {
  return (
    <section id="portfolio" className="pt-16 pb-12 bg-background relative">
      <div className="container-tight px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 id="portfolio-heading" className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-2 sm:px-0">
            Two Service Models. <span className="text-gradient">Built to Fit Your Business.</span>
          </h2>
          <p className="text-base sm:text-xl text-primary font-medium max-w-3xl mx-auto mb-4 px-2 sm:px-0">
            We design conversion-focused websites that feel custom because they're built around how your business actually operates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 mb-12">
          {/* Home Services Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/use-cases/home-services"
              className="group block h-full p-8 rounded-2xl border border-border/50 hover:border-primary/40 bg-card/50 backdrop-blur-sm transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Wrench className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-gradient transition-all duration-300">
                Home Services
              </h3>
              <p className="text-lg text-foreground/90 mb-4">
                For service businesses that turn inbound demand into booked jobs.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Capture local demand when urgency is high. Convert visitors into estimate requests and service calls with clear paths that match how people search for on-site help.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary transition-colors">
                <span className="font-semibold">Learn More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>

          {/* Professional Services Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              to="/use-cases/professional-services"
              className="group block h-full p-8 rounded-2xl border border-border/50 hover:border-primary/40 bg-card/50 backdrop-blur-sm transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Briefcase className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-gradient transition-all duration-300">
                Professional Services
              </h3>
              <p className="text-lg text-foreground/90 mb-4">
                For expertise-driven businesses that convert trust into booked consultations.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Establish credibility and guide higher-consideration decisions. Qualify leads and book appointments with clear next steps that reflect the weight of your expertise.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary transition-colors">
                <span className="font-semibold">Learn More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-muted-foreground text-sm">
            One proven system. Adapted to how your business sells.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
