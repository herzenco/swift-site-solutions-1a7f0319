import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { LawFirmDemo } from "@/components/demos/LawFirmDemo";
import { SEO } from "@/components/SEO";
import { HeroWorkflowModal } from "@/components/HeroWorkflowModal";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  {
    title: "Streamlined Client Intake",
    description: "Capture case details before the first call. Clients submit their situation online, so your team arrives prepared.",
  },
  {
    title: "Qualify Leads Automatically",
    description: "Filter serious inquiries from casual browsers. Focus your billable hours on cases that match your practice areas.",
  },
  {
    title: "Never Miss a Follow-Up",
    description: "Track every consultation request, case inquiry, and client communication in one place.",
  },
];

const benefits = [
  "Capture consultation requests 24/7, even after hours",
  "Reduce no-shows with automated reminders",
  "See every inquiry and case status in real-time",
  "Scale your practice without adding admin staff",
  "Build trust with a professional online presence",
];

const ProfessionalServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Law Firm Websites"
        description="Custom websites for law firms and professional services. Capture consultation requests, qualify leads, and manage client intake automatically. Delivered in 5-10 days."
        canonical="/use-cases/professional-services"
      />
      <Navbar />
      <BackButton />
      
      <main className="pt-32 pb-20">
        <div className="container-tight px-6">
          {/* Hero Section with Demo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Websites for <span className="text-gradient">Law Firms</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Capture leads, manage consultations, and keep every case organized. Automatically.
              </p>
              <p className="text-sm text-muted-foreground/80 mb-8">
                Built and launched in days, not months.
              </p>
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-xl"
                onClick={() => setIsModalOpen(true)}
              >
                Start Your Build
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            {/* Right Column - Interactive Demo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <LawFirmDemo />
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <p className="text-center text-muted-foreground mb-8">
              Everything works together, from intake to consultation to case management.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card/30 rounded-3xl p-8 md:p-12 border border-border/50"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Why Law Firms Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-20"
          >
            <h2 className="text-3xl font-bold mb-4">Turn Your Website Into a Client Intake System</h2>
            <p className="text-muted-foreground mb-8">Get a website that works as hard as you do.</p>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-xl"
              onClick={() => setIsModalOpen(true)}
            >
              Get Your Free Project Plan
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground/70 mt-4">No pressure. No sales pitch.</p>
          </motion.div>
        </div>
      </main>

      <Footer />

      <HeroWorkflowModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        source="professional_services_page" 
      />
    </div>
  );
};

export default ProfessionalServices;
