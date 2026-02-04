import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";

interface AdvisoryHomeScreenProps {
  onViewServices: () => void;
  onBookConsultation: () => void;
}

export const AdvisoryHomeScreen = ({ onViewServices, onBookConsultation }: AdvisoryHomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-[#0f0f0f] overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Hero Section */}
      <div className="relative min-h-[42%] flex flex-col justify-center px-5 py-8">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#0f0f0f] to-[#141414]" />
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10"
        >
          {/* Wordmark */}
          <p className="text-[8px] tracking-[0.4em] text-neutral-500 uppercase mb-6 font-medium">
            Blackwell Advisory
          </p>
          
          <h1 className="text-[22px] font-light text-white leading-[1.15] mb-3 tracking-tight">
            Strategic guidance for
            <span className="block font-medium mt-0.5">complex decisions</span>
          </h1>
          
          <p className="text-[9px] text-neutral-400 leading-relaxed max-w-[90%] mb-6">
            We partner with leaders navigating high-stakes transitions, 
            growth challenges, and strategic inflection points.
          </p>

          {/* CTAs */}
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onBookConsultation}
              className="px-3 py-2 bg-white text-[#0f0f0f] text-[8px] font-medium rounded tracking-wide hover:bg-neutral-100 transition-colors"
            >
              Request a Conversation
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onViewServices}
              className="px-3 py-2 text-neutral-400 text-[8px] font-medium flex items-center gap-1 hover:text-white transition-colors"
            >
              Explore Our Approach <ArrowRight className="w-2.5 h-2.5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Advisory Focus */}
      <div className="px-5 py-5 border-t border-neutral-800/50">
        <p className="text-[7px] tracking-[0.25em] text-neutral-500 uppercase mb-4 font-medium">
          Advisory Focus
        </p>
        
        <div className="grid grid-cols-2 gap-2">
          {[
            { title: "Strategy", desc: "Clarity for critical decisions" },
            { title: "Growth", desc: "Sustainable expansion paths" },
            { title: "Leadership", desc: "Executive transitions" },
            { title: "Transitions", desc: "M&A and succession" },
          ].map((area, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              onClick={onViewServices}
              className="text-left p-3 rounded-lg bg-neutral-900/50 border border-neutral-800/50 hover:border-neutral-700 transition-colors group"
            >
              <p className="text-[9px] text-white font-medium mb-0.5">{area.title}</p>
              <p className="text-[7px] text-neutral-500">{area.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="px-5 py-5 bg-[#0a0a0a]">
        <p className="text-[7px] tracking-[0.25em] text-neutral-500 uppercase mb-4 font-medium">
          Our Process
        </p>
        
        <div className="space-y-3">
          {[
            { step: "01", title: "Initial Inquiry", desc: "Share your context and objectives" },
            { step: "02", title: "Qualification", desc: "We assess fit and readiness" },
            { step: "03", title: "Strategy Session", desc: "Structured conversation with clear outcomes" },
            { step: "04", title: "Engagement", desc: "Ongoing advisory partnership" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="text-[8px] text-neutral-600 font-mono mt-0.5">{item.step}</span>
              <div>
                <p className="text-[9px] text-white font-medium">{item.title}</p>
                <p className="text-[7px] text-neutral-500">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust & Credibility */}
      <div className="px-5 py-5 border-t border-neutral-800/50">
        <div className="flex justify-between text-center">
          <div>
            <p className="text-[14px] font-light text-white">25+</p>
            <p className="text-[6px] tracking-[0.15em] text-neutral-500 uppercase">Years</p>
          </div>
          <div className="w-px bg-neutral-800" />
          <div>
            <p className="text-[14px] font-light text-white">120+</p>
            <p className="text-[6px] tracking-[0.15em] text-neutral-500 uppercase">Engagements</p>
          </div>
          <div className="w-px bg-neutral-800" />
          <div>
            <p className="text-[14px] font-light text-white">Private</p>
            <p className="text-[6px] tracking-[0.15em] text-neutral-500 uppercase">Equity & Family</p>
          </div>
        </div>
      </div>

      {/* Qualification CTA */}
      <div className="px-5 py-6 flex-1 flex flex-col justify-end bg-gradient-to-t from-[#0a0a0a] to-[#0f0f0f]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] text-white font-medium mb-1">
            Is this the right fit?
          </p>
          <p className="text-[8px] text-neutral-500 mb-4 leading-relaxed">
            For organizations seeking thoughtful, long-term guidance 
            on consequential decisions.
          </p>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onBookConsultation}
            className="w-full py-3 bg-white text-[#0f0f0f] text-[8px] font-medium rounded tracking-wide hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2"
          >
            Request a Strategy Conversation
            <ChevronRight className="w-3 h-3" />
          </motion.button>
          
          <p className="text-[7px] text-neutral-600 text-center mt-3">
            We respond within two business days
          </p>
        </motion.div>
      </div>

      {/* Minimal Footer */}
      <div className="px-5 py-3 border-t border-neutral-800/30 flex items-center justify-between">
        <p className="text-[7px] tracking-[0.2em] text-neutral-600 uppercase">
          Blackwell Advisory
        </p>
        <p className="text-[7px] text-neutral-700">
          New York · London
        </p>
      </div>
    </motion.div>
  );
};
