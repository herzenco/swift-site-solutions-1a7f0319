import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { GraduationCap, Calendar, MessageSquare, Users, ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Session Booking System",
    description: "Let clients and students book coaching calls, consultations, or sessions directly online.",
  },
  {
    icon: MessageSquare,
    title: "Automated Nurture Sequences",
    description: "Turn interested prospects into paying clients with intelligent follow-up messaging.",
  },
  {
    icon: Users,
    title: "Client Management Hub",
    description: "Track student progress, manage communications, and organize your practice in one place.",
  },
];

const benefits = [
  "Convert website visitors into booked calls",
  "Automate your enrollment and onboarding process",
  "Nurture leads while you focus on clients",
  "Build credibility with a professional presence",
  "Scale your practice without scaling your hours",
];

const EducationCoaching = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      
      <main className="pt-32 pb-20">
        <div className="container-tight px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="icon-container w-16 h-16 mx-auto mb-6">
              <GraduationCap className="w-7 h-7 text-primary" strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Websites for <span className="text-gradient">Education & Coaching</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Turn interest into booked calls, clients, or students with automated workflows — all from one powerful website.
            </p>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-xl"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Build
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <div className="icon-container w-12 h-12 mb-4">
                  <feature.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card/30 rounded-3xl p-8 md:p-12 border border-border/50"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Why Coaches & Educators Choose Us</h2>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Practice?</h2>
            <p className="text-muted-foreground mb-8">Get a website that works as hard as you do.</p>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-xl"
              onClick={() => window.location.href = '/#contact'}
            >
              Get Your Free Project Plan
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EducationCoaching;
