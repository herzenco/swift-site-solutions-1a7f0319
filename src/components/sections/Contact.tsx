import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProjectPlanModal } from "@/components/ProjectPlanModal";

export const Contact = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="contact" className="py-16 md:py-20 bg-card/30 relative">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container-tight max-w-xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 id="contact-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Get your <span className="text-gradient">free project plan</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Answer a few quick questions. We'll review and send back a clear plan. No sales pitch.
          </p>

          <Button
            variant="hero"
            size="xl"
            onClick={() => setModalOpen(true)}
          >
            Start your project plan
            <ArrowRight className="w-5 h-5" />
          </Button>

          <p className="mt-6 text-sm text-muted-foreground">
            Takes about 60 seconds.
          </p>
        </motion.div>
      </div>

      <ProjectPlanModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};
