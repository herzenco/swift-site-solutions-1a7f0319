import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import advisoryHero from "@/assets/advisory-hero.jpg";

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
      className="h-full flex flex-col bg-[#0a0a0a] overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Hero with Image */}
      <div className="relative min-h-[50%]">
        <img 
          src={advisoryHero} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
        
        <div className="relative z-10 h-full flex flex-col justify-end px-5 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-[7px] tracking-[0.4em] text-neutral-400 uppercase mb-4">
              Blackwell Advisory
            </p>
            
            <h1 className="text-[24px] font-light text-white leading-[1.1] tracking-tight mb-2">
              Clarity for
              <span className="block font-medium">what matters</span>
            </h1>
            
            <p className="text-[9px] text-neutral-400 leading-relaxed mb-6">
              Strategic guidance for leaders navigating 
              high-stakes decisions.
            </p>

            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onBookConsultation}
                className="px-4 py-2.5 bg-white text-[#0a0a0a] text-[8px] font-medium rounded-sm tracking-wide"
              >
                Request a Conversation
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onViewServices}
                className="px-4 py-2.5 text-neutral-300 text-[8px] font-medium flex items-center gap-1"
              >
                Our Approach <ArrowRight className="w-2.5 h-2.5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Advisory Focus - Simplified */}
      <div className="px-5 py-6">
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: "Strategy", desc: "Critical decisions" },
            { title: "Growth", desc: "Sustainable paths" },
            { title: "Leadership", desc: "Transitions" },
            { title: "M&A", desc: "Succession" },
          ].map((area, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              onClick={onViewServices}
              className="text-left p-3 border-l border-neutral-800 hover:border-neutral-600 transition-colors"
            >
              <p className="text-[10px] text-white font-medium">{area.title}</p>
              <p className="text-[7px] text-neutral-500">{area.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Credibility - Minimal */}
      <div className="px-5 py-5 border-t border-neutral-800/50">
        <div className="flex justify-between">
          <div>
            <p className="text-[16px] font-light text-white">25</p>
            <p className="text-[6px] text-neutral-600 uppercase tracking-wider">Years</p>
          </div>
          <div>
            <p className="text-[16px] font-light text-white">120+</p>
            <p className="text-[6px] text-neutral-600 uppercase tracking-wider">Clients</p>
          </div>
          <div>
            <p className="text-[16px] font-light text-white">PE</p>
            <p className="text-[6px] text-neutral-600 uppercase tracking-wider">& Family Office</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 py-6 mt-auto">
        <p className="text-[8px] text-neutral-500 mb-3">
          For organizations seeking long-term guidance.
        </p>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onBookConsultation}
          className="w-full py-3 bg-white text-[#0a0a0a] text-[8px] font-medium rounded-sm tracking-wide"
        >
          Schedule a Conversation
        </motion.button>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-neutral-800/30 flex justify-between">
        <p className="text-[6px] text-neutral-600 tracking-widest uppercase">Blackwell</p>
        <p className="text-[6px] text-neutral-700">New York · London</p>
      </div>
    </motion.div>
  );
};
