import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take to build my website?",
    answer: "Most projects are completed within 1–2 weeks from kickoff. This includes design, development, and integration of your custom tools. More complex projects may take 3–4 weeks.",
  },
  {
    question: "What's included in the monthly maintenance?",
    answer: "Monthly maintenance includes hosting, security updates, bug fixes, minor content updates, uptime monitoring, and technical support. It ensures your site stays fast, secure, and running smoothly.",
  },
  {
    question: "Can I customize the AI tools for my specific needs?",
    answer: "Absolutely! All AI tools are customized to match your workflow. We'll work with you to configure chatbot responses, automation rules, and integrations that make sense for your business.",
  },
  {
    question: "Do I need technical knowledge to manage my website?",
    answer: "Not at all. We build intuitive admin dashboards that anyone can use. Plus, our maintenance plan means we handle all the technical aspects for you.",
  },
  {
    question: "What industries do you work with?",
    answer: "We work with businesses across all industries—real estate, legal, healthcare, fitness, consulting, e-commerce, and more. Our solutions are customized to fit your specific industry needs.",
  },
  {
    question: "Can I cancel the monthly maintenance?",
    answer: "Yes, you can cancel anytime with 30 days notice. However, without maintenance, you'll be responsible for hosting, updates, and support on your own.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a satisfaction guarantee during the design phase. If you're not happy with the initial designs, we'll revise until you are. Once development begins, refunds are evaluated case by case.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer: "Every website we build is fully responsive and optimized for all devices—desktop, tablet, and mobile. Performance and user experience are top priorities.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="section-padding bg-card/30 relative">
      <div className="container-tight max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Got questions? We've got answers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-border/50 px-6 data-[state=open]:border-primary/30 transition-colors"
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
