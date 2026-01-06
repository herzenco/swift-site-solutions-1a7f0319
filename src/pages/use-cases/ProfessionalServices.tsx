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
    description: "Capture context before the call — goals, challenges, and timeline — so every conversation starts informed.",
  },
  {
    icon: Clock,
    title: "Always-On Lead Capture",
    description: "Your website captures serious inquiries around the clock, even when you're unavailable.",
  },
  {
    icon: Shield,
    title: "A Presence That Signals Value",
    description: "A refined, trust-building website that positions you as the expert prospects are looking for.",
  },
];

const benefits = [
  "Fewer wasted calls. More qualified conversations.",
  "A calendar you control — not one that controls you",
  "Trust built before the first hello",
  "Pre-call context that prepares both sides",
  "Inquiries captured 24/7 without added overhead",
  "Live in 5–10 days. Tailored to your business.",
];

const ProfessionalServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDemoFullscreen, setIsDemoFullscreen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Websites for Consultants, Advisors, Experts"
        description="Websites that build trust and book qualified consultations. Designed for professional services where credibility matters. Launched in 5-10 days."
        canonical="/use-cases/professional-services"
        keywords="consultant website, advisor website, professional services website, expert website, consultation booking"
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
                Built for Businesses Where <span className="text-gradient">Trust Comes First</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                We design websites for businesses where decisions take time, context matters, and the first conversation sets the tone.
              </p>
              <p className="text-muted-foreground mb-4">
                Your website filters serious inquiries, schedules the right conversations, and positions your practice with the credibility it deserves.
              </p>
              <p className="text-sm text-muted-foreground/80 mb-8">
                Built and launched in 5–10 days. Structured around how you actually sell.
              </p>
              <div>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-xl"
                  onClick={() => setIsModalOpen(true)}
                >
                  Get Your Website Built
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-xs text-muted-foreground/70 mt-3">No templates. Clear scope. Predictable delivery.</p>
              </div>
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
                  Example advisory firm — messaging and flow are tailored to how clients decide
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
            <h2 className="text-3xl font-bold text-center mb-12">Built Around How You Sell</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">What Changes</h2>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Get a Website That Works for You?</h2>
            <p className="text-muted-foreground mb-8">Get a website designed to book the right conversations while you focus on your clients.</p>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-xl"
              onClick={() => setIsModalOpen(true)}
            >
              Get Your Website Built
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground/70 mt-4">No pressure. No long timelines.</p>
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
