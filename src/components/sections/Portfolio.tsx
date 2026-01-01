import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const professionalServices = [
  {
    title: "Lawyers & Legal",
    description: "Capture client inquiries and schedule consultations without back-and-forth emails.",
  },
  {
    title: "Medical & Dental",
    description: "Book patient appointments automatically and reduce no-shows with reminders.",
  },
  {
    title: "Therapists & Counselors",
    description: "Offer easy online booking while maintaining a professional, calming presence.",
  },
  {
    title: "Accountants & CPAs",
    description: "Convert tax season traffic into booked consultations year-round.",
  },
  {
    title: "Consultants & Advisors",
    description: "Qualify leads and schedule discovery calls without lifting a finger.",
  },
];

const homeServices = [
  {
    title: "General Contractors",
    description: "Turn website visitors into booked estimates with automated scheduling.",
  },
  {
    title: "Plumbers & Electricians",
    description: "Capture emergency requests and service calls 24/7.",
  },
  {
    title: "HVAC & Roofing",
    description: "Generate leads and schedule inspections automatically.",
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
            Service professionals who rely on leads and booked appointments.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground text-center max-w-3xl mx-auto mb-12"
        >
          If your business depends on turning interest into booked appointments and qualified clients, we build systems that handle it automatically. The same proven system, adapted to your industry.
        </motion.p>

        {/* Professional Services - Primary Focus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/use-cases/professional-services"
            className="group block p-8 rounded-2xl border border-primary/30 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:bg-card/70"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gradient">Professional Services</h3>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary transition-colors w-fit">
                <span className="font-semibold">Learn More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Conversion-focused websites for professionals who need to capture leads and book appointments automatically.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {professionalServices.map((service, index) => (
                <div key={index} className="p-4 rounded-xl bg-background/50 border border-border/30">
                  <h4 className="font-semibold mb-1">{service.title}</h4>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </Link>
        </motion.div>

        {/* Home Services - Secondary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <Link
            to="/use-cases/home-services"
            className="group block p-8 rounded-2xl border border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm transition-all duration-500"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-xl sm:text-2xl font-bold group-hover:text-gradient transition-all duration-300">Home & Local Services</h3>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary transition-colors w-fit">
                <span className="font-semibold">Learn More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Convert inbound traffic into booked jobs with automated scheduling and follow-ups.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {homeServices.map((service, index) => (
                <div key={index} className="p-4 rounded-xl bg-background/50 border border-border/30">
                  <h4 className="font-semibold mb-1">{service.title}</h4>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-muted-foreground">
            Same proven system. Messaging tailored to your industry.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
