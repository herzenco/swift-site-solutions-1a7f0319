import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroWorkflowModal } from "@/components/HeroWorkflowModal";

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Single subtle orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container-tight section-padding relative z-10 flex flex-col items-center justify-between min-h-[80vh]">
        <div /> {/* Spacer */}
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[0.95]">
            <span className="block text-foreground/90">Your website isn't a system.</span>
            <span className="block text-gradient font-black">That's the problem.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl lg:text-2xl text-foreground/80 max-w-2xl mx-auto">
            We build modern websites that capture leads, book meetings, and follow up automatically — launched in 5–10 days.
          </p>
        </motion.div>

        {/* CTA at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pb-8"
        >
          <Button variant="hero" size="xl" onClick={() => setIsModalOpen(true)}>
            Get a website that works
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>

        <HeroWorkflowModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
