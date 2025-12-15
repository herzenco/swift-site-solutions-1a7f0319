import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { HomeServicesDemo } from "@/components/demos/HomeServicesDemo";
import { SEO } from "@/components/SEO";
import { Wrench, Calendar, MessageSquare, ClipboardList, ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Instant Job Booking",
    description: "Let customers book service appointments directly from your website, any time of day.",
  },
  {
    icon: MessageSquare,
    title: "Automated Follow-Ups",
    description: "Send appointment reminders and follow-up messages without lifting a finger.",
  },
  {
    icon: ClipboardList,
    title: "Service Request Forms",
    description: "Capture detailed job information upfront so you arrive prepared and ready to work.",
  },
];

const benefits = [
  "Convert website visitors into booked jobs",
  "Reduce no-shows with automated reminders",
  "Capture leads even when you're on a job",
  "Build trust with professional online presence",
  "Spend less time on the phone, more time working",
];

const HomeServices = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Home Services Websites"
        description="Custom websites for plumbers, electricians, HVAC, and home service providers. Convert visitors into booked jobs with automated scheduling. Delivered in 5-10 days."
        canonical="/use-cases/home-services"
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
              <div className="icon-container w-14 h-14 mb-6">
                <Wrench className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Websites for <span className="text-gradient">Home & Local Services</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Convert inbound traffic into booked jobs with automated scheduling and follow-ups. All from one powerful website.
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
              <HomeServicesDemo />
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
              Everything works together, from discovery to booking to follow-up.
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
            <h2 className="text-3xl font-bold mb-8 text-center">Why Home Service Providers Choose Us</h2>
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
            <h2 className="text-3xl font-bold mb-4">Turn Your Website Into a Job-Booking System</h2>
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

export default HomeServices;