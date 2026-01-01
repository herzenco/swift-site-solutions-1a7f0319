import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { SEO } from "@/components/SEO";
import { HeroWorkflowModal } from "@/components/HeroWorkflowModal";
import { ArrowRight, CheckCircle2, Calendar, Users, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Automated Appointment Booking",
    description: "Clients book directly from your website. No phone tag, no back-and-forth emails. Your calendar fills itself.",
  },
  {
    icon: Users,
    title: "Lead Qualification Built-In",
    description: "Capture the right information upfront so you know exactly who you're meeting before the call starts.",
  },
  {
    icon: Clock,
    title: "24/7 Lead Capture",
    description: "Your website works around the clock. Capture inquiries and book appointments even while you sleep.",
  },
  {
    icon: Shield,
    title: "Professional First Impression",
    description: "A polished, conversion-focused website that builds trust and positions you as the expert in your field.",
  },
];

const industries = [
  "Lawyers & Legal Professionals",
  "Doctors & Medical Clinics",
  "Dentists & Dental Practices",
  "Therapists & Counselors",
  "Accountants & CPAs",
  "Consultants & Advisors",
  "Financial Planners",
  "Chiropractors & Physical Therapists",
];

const benefits = [
  "Book appointments automatically without manual follow-up",
  "Qualify leads before they reach your calendar",
  "Reduce no-shows with automated reminders",
  "Capture leads 24/7, even outside business hours",
  "Scale your practice without adding admin staff",
  "Build trust with a professional online presence",
];

const ProfessionalServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Professional Services Websites"
        description="Conversion-focused websites for lawyers, doctors, dentists, therapists, and consultants. Capture leads and book appointments automatically. Delivered in 5-10 days."
        canonical="/use-cases/professional-services"
      />
      <Navbar />
      <BackButton />
      
      <main className="pt-32 pb-20">
        <div className="container-tight px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Websites for <span className="text-gradient">Professional Services</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Capture leads and book appointments automatically. No manual follow-up required.
            </p>
            <p className="text-sm text-muted-foreground/80 mb-8">
              Built and launched in 5–10 days.
            </p>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-xl"
              onClick={() => setIsModalOpen(true)}
            >
              Start Your Build
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Industries Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-bold text-center mb-8">Built for professionals like you</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 rounded-xl border border-border/50 bg-card/50 text-center"
                >
                  <span className="text-sm font-medium">{industry}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-4">How it works for you</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Your website becomes a reliable lead and scheduling system that runs without constant attention.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <div className="icon-container w-12 h-12 mb-4">
                    <feature.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
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
            className="bg-card/30 rounded-3xl p-8 md:p-12 border border-border/50 mb-20"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">What you get</h2>
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
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to stop chasing leads?</h2>
            <p className="text-muted-foreground mb-8">Get a website that books appointments while you focus on your clients.</p>
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
