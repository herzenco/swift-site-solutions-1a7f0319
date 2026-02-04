import { motion } from "framer-motion";
import { CheckCircle2, Phone, Lightbulb, Rocket, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";

const nextSteps = [
  {
    icon: Lightbulb,
    title: "We Review Your Info",
    description: "A team member will review your submission and prepare for your call.",
  },
  {
    icon: Phone,
    title: "Discovery Call",
    description: "We'll schedule a quick discovery call to understand your goals and requirements.",
  },
  {
    icon: Rocket,
    title: "We Begin Working",
    description: "Once aligned, we start building your conversion-focused website.",
  },
];

const Success = () => {
  return (
    <>
      <SEOHead
        title="Thank You"
        description="Your request has been received. We'll be in touch soon."
        noIndex
      />
      <Navbar />
      
      <main className="min-h-screen bg-background flex items-center justify-center pt-20 pb-16">
        <div className="container max-w-2xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              You're all set!
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-md mx-auto">
              Thanks for reaching out. We've received your info and a team member will be in touch shortly.
            </p>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-lg font-semibold text-foreground text-center mb-6">
              What happens next
            </h2>
            
            <div className="space-y-4">
              {nextSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <step.icon className="w-4 h-4 text-primary" />
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA to Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Want to get started sooner?
            </p>
            <Button
              variant="hero"
              size="lg"
              onClick={() => window.open("https://calendly.com/herzenco/website-consultation", "_blank")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Your Call Now
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Success;
