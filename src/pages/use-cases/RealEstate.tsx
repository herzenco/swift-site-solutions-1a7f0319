import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { RealEstateDemo } from "@/components/demos/RealEstateDemo";
import { Home, Calendar, MessageSquare, Users, ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Intent-Driven Showings",
    description: "Capture buyer intent before anything hits your calendar. Collect details and approve showings only when interest is real.",
  },
  {
    icon: MessageSquare,
    title: "Focus on Serious Buyers",
    description: "Automatically separate serious buyers from casual browsers, so your time is spent on conversations that move deals forward.",
  },
  {
    icon: Users,
    title: "Nothing Slips Through",
    description: "Keep every inquiry, follow-up, and message organized in one place for a professional, responsive experience.",
  },
];

const benefits = [
  "Capture leads from listings instantly — no delays",
  "Reduce no-shows with automated reminders",
  "See every inquiry and interaction in real-time",
  "Scale your client base without adding admin staff",
  "Build trust with a professional online presence",
];

const RealEstate = () => {
  return (
    <div className="min-h-screen bg-background">
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
              <div className="icon-container w-14 h-14 mb-6">
                <Home className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Websites for <span className="text-gradient">Real Estate Professionals</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Capture leads, manage showings, and keep every conversation organized — automatically.
              </p>
              <p className="text-sm text-muted-foreground/80 mb-8">
                Built and launched in days, not months.
              </p>
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-xl"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
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
              <RealEstateDemo />
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
              Everything works together — from discovery to showing to closing.
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
                  <div className="icon-container w-12 h-12 mb-4">
                    <feature.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
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
            className="bg-card/30 rounded-3xl p-8 md:p-12 border border-border/50"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Why Real Estate Professionals Choose Us</h2>
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
            <h2 className="text-3xl font-bold mb-4">Turn Your Website Into a Lead-Handling System</h2>
            <p className="text-muted-foreground mb-8">Get a website that works as hard as you do.</p>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-xl"
              onClick={() => window.location.href = '/#contact'}
            >
              Get Your Free Project Plan
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground/70 mt-4">No pressure. No sales pitch.</p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RealEstate;
