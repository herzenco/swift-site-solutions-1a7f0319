import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take?",
    answer: "Most projects are completed within 5–10 business days. Timelines may vary slightly based on setup requirements and integrations, but the process is designed to be fast and repeatable.",
  },
  {
    question: "What's included in maintenance?",
    answer: "Ongoing support, bug fixes, performance optimizations, and product updates to ensure everything continues running smoothly within the supported framework.",
  },
  {
    question: "Can I customize the tools?",
    answer: "The tools are configurable within a predefined framework. You can adjust settings, workflows, and supported integrations, but we do not offer custom-built features or one-off development. This ensures consistency, speed, and reliability.",
  },
  {
    question: "Do I need technical knowledge?",
    answer: "No. Setup and configuration are handled for you. The product is designed to be intuitive and easy to use without technical expertise.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. There are no long-term commitments. You can cancel at any time.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-16 md:py-20 bg-background relative">
      <div className="container-tight max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="faq-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">FAQ</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-border/50 px-6 data-[state=open]:border-primary/30 transition-colors bg-card/50"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
