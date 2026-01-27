import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ProjectPlanModal } from "@/components/ProjectPlanModal";

const WHATSAPP_NUMBER = "17865893484";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in getting a free project plan.")}`;

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

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Or reach out directly via</span>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#25D366] hover:text-[#20BD5A] font-medium transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      <ProjectPlanModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};
