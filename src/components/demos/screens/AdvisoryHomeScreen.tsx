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
      className="h-full flex flex-col bg-[#faf9f7] overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Hero Image */}
      <div className="relative h-[35%] min-h-[120px]">
        <img 
          src={advisoryHero} 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-5 py-6">
        {/* Wordmark */}
        <p className="text-[7px] tracking-[0.4em] text-neutral-400 uppercase mb-4">
          Blackwell Advisory
        </p>
        
        {/* Headline */}
        <h1 className="text-[22px] font-light text-neutral-900 leading-[1.1] tracking-tight mb-2">
          Clarity for
          <span className="block font-medium">what matters</span>
        </h1>
        
        <p className="text-[9px] text-neutral-500 leading-relaxed mb-6">
          Strategic guidance for high-stakes decisions.
        </p>

        {/* Advisory Focus - Minimal */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
          {["Strategy", "Growth", "Leadership", "Transitions"].map((area, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              onClick={onViewServices}
              className="text-left py-2 border-l-2 border-amber-400/60 pl-3"
            >
              <p className="text-[9px] text-neutral-800 font-medium">{area}</p>
            </motion.button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex gap-6 py-4 border-y border-neutral-200 mb-6">
          <div>
            <p className="text-[14px] font-medium text-neutral-900">25+</p>
            <p className="text-[6px] text-neutral-400 uppercase tracking-wider">Years</p>
          </div>
          <div>
            <p className="text-[14px] font-medium text-neutral-900">120+</p>
            <p className="text-[6px] text-neutral-400 uppercase tracking-wider">Clients</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-auto space-y-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onBookConsultation}
            className="w-full py-3 bg-neutral-900 text-white text-[8px] font-medium rounded tracking-wide"
          >
            Request a Conversation
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onViewServices}
            className="w-full py-2.5 text-neutral-600 text-[8px] font-medium flex items-center justify-center gap-1"
          >
            Explore Our Approach <ArrowRight className="w-2.5 h-2.5" />
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-neutral-200 flex justify-between">
        <p className="text-[6px] text-neutral-400 tracking-widest uppercase">Blackwell</p>
        <p className="text-[6px] text-neutral-400">New York · London</p>
      </div>
    </motion.div>
  );
};
