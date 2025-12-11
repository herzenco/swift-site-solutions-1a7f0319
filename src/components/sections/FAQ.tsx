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
    answer: "Most projects are completed within 5–10 days. Complex projects may take up to 2 weeks.",
  },
  {
    question: "What's included in maintenance?",
    answer: "Hosting, security updates, bug fixes, content updates, and ongoing support are all included in your monthly plan.",
  },
  {
    question: "Can I customize the tools?",
    answer: "Yes. All AI tools, scheduling systems, and CRM integrations are configured to match your specific workflow and business needs.",
  },
  {
    question: "Do I need technical knowledge?",
    answer: "No. We handle everything technical for you, and provide training videos so you can manage your site confidently.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. There are no long-term contracts. You can cancel with 30 days notice.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-32 bg-background relative">
      <div className="container-tight max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
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
