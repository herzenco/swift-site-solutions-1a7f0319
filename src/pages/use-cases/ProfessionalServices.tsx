import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { SEO } from "@/components/SEO";
import { HeroWorkflowModal } from "@/components/HeroWorkflowModal";
import { ProfessionalServicesDemo } from "@/components/demos/ProfessionalServicesDemo";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, CheckCircle2, Calendar, Users, Clock, Shield, Maximize2 } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Seamless Consultation Booking",
    description: "Qualified prospects book directly on your calendar. The right conversations, scheduled automatically.",
  },
  {
    icon: Users,
    title: "Thoughtful Lead Qualification",
    description: "Capture context before the call. Know their challenges, goals, and timeline before you speak.",
  },
  {
    icon: Clock,
    title: "Always-On Lead Capture",
    description: "Your website works around the clock. Capture high-intent inquiries even outside business hours.",
  },
  {
    icon: Shield,
    title: "Premium First Impression",
    description: "A refined, trust-building presence that positions you as the expert prospects are looking for.",
  },
];

const benefits = [
  "Convert inquiries into booked discovery calls automatically",
  "Qualify prospects before they reach your calendar",
  "Reduce scheduling friction with integrated booking",
  "Capture leads 24/7, even when you're with clients",
  "Scale your practice without adding overhead",
  "Build trust with an executive-level online presence",
];

const ProfessionalServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDemoFullscreen, setIsDemoFullscreen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Professional Services Websites"
        description="Conversion-focused websites for advisory firms, consultants, and professional service providers. Capture leads and book consultations automatically. Delivered in 5-10 days."
        canonical="/use-cases/professional-services"
      />
      <Navbar />
      <BackButton />
      
      <main className="pt-32 pb-20">
        <div className="container-tight px-6">
          {/* Hero Section with Demo */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Websites for <span className="text-gradient">Advisory Firms</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Convert trust into booked consultations. Designed for expertise-driven businesses that require a thoughtful, high-consideration approach.
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

            {/* Right Column - Demo */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative">
                  <ProfessionalServicesDemo />
                  <button
                    onClick={() => setIsDemoFullscreen(true)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
                    aria-label="View fullscreen demo"
                  >
                    <Maximize2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Interactive demo — click through to experience the flow
                </p>
              </motion.div>
            )}
          </div>

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
              Your website becomes a reliable system for capturing qualified inquiries and scheduling discovery conversations.
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
            <h2 className="text-3xl font-bold mb-4">Ready to elevate your online presence?</h2>
            <p className="text-muted-foreground mb-8">Get a website that books consultations while you focus on your clients.</p>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-xl"
              onClick={() => setIsModalOpen(true)}
            >
              Get Your Free Project Plan
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground/70 mt-4">No pressure. No obligation.</p>
          </motion.div>
        </div>
      </main>

      <Footer />

      <HeroWorkflowModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        source="professional_services_page" 
      />

      {/* Fullscreen Demo Dialog */}
      <Dialog open={isDemoFullscreen} onOpenChange={setIsDemoFullscreen}>
        <DialogContent className="max-w-lg p-0 bg-transparent border-none shadow-none">
          <div className="scale-110 origin-center">
            <ProfessionalServicesDemo />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfessionalServices;
