import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "My site was live in 7 days. The process was seamless.",
    author: "Real Estate Agent",
  },
  {
    quote: "AI scheduling saves me hours every week. Game changer.",
    author: "Fitness Studio Owner",
  },
  {
    quote: "I closed new clients from the chatbot immediately.",
    author: "Consultant",
  },
];

export const SocialProof = () => {
  return (
    <section className="py-32 bg-card/30 relative">
      <div className="container-tight px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            What our <span className="text-gradient">clients say</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm"
            >
              <Quote className="w-8 h-8 text-primary/50 mb-4" />
              <p className="text-lg font-medium mb-4 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <p className="text-muted-foreground text-sm">
                — {testimonial.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
