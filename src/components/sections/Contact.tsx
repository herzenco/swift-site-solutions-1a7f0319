import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent",
      description: "We'll be in touch within 24 hours.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-32 bg-background relative">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container-tight max-w-xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Let's <span className="text-gradient">talk</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Tell us about your project
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Name"
              required
              className="bg-card/50 border-border/50 h-14 text-base"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="bg-card/50 border-border/50 h-14 text-base"
            />
          </div>

          <Textarea
            name="message"
            placeholder="What can we build for you?"
            rows={4}
            required
            className="bg-card/50 border-border/50 resize-none text-base"
          />

          <Button
            type="submit"
            variant="hero"
            size="xl"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send message"}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.form>
      </div>
    </section>
  );
};
