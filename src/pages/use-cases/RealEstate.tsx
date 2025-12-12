import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { Building2, Calendar, MessageSquare, Users, ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Automated Showing Scheduler",
    description: "Buyers book showings directly from your listings — no inbox chaos, no back-and-forth, no missed opportunities.",
  },
  {
    icon: MessageSquare,
    title: "AI Lead Qualification",
    description: "Instantly filter serious buyers from casual browsers. Your time goes to the conversations that matter.",
  },
  {
    icon: Users,
    title: "Client Communication Hub",
    description: "Every inquiry, every conversation, every follow-up — visible and organized in one place. Nothing slips through.",
  },
];

const benefits = [
  "Capture leads from listings instantly — no delays, no friction",
  "Reduce no-shows with automated reminders and confirmations",
  "See every inquiry and interaction in real-time",
  "Scale your client base without adding admin staff",
];

const RealEstate = () => {
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              A Smarter Website for <span className="text-gradient">Real Estate Professionals</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Designed to capture leads, manage showings, and keep every conversation organized — automatically.
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
          <div className="mb-20">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-lg text-muted-foreground mb-8"
            >
              Everything works together to turn property interest into booked conversations.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold text-primary/60">Step {index + 1}</span>
                  </div>
                  <div className="icon-container w-12 h-12 mb-4">
                    <feature.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card/30 rounded-3xl p-8 md:p-12 border border-border/50"
          >
            <h2 className="text-3xl font-bold mb-4 text-center">Why This Works for Real Estate Professionals</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
              Built for professionals who rely on speed, follow-up, and visibility to close deals.
            </p>
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
            <h2 className="text-3xl font-bold mb-4">See What This Would Look Like for Your Business</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Get a clear project plan with timeline and pricing — no pressure, no long-term contracts.
            </p>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-xl"
              onClick={() => window.location.href = '/#contact'}
            >
              Get Your Free Project Plan
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto">
              We'll outline exactly what your real estate system includes and how fast it can go live.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RealEstate;
