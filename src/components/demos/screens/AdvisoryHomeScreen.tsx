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
      <div className="relative h-[32%] min-h-[110px]">
        <img 
          src={advisoryHero} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <p className="absolute bottom-3 left-4 text-[7px] tracking-[0.3em] text-white/80 uppercase">
          Blackwell Advisory
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-5 py-5">
        {/* Headline */}
        <h1 className="text-[20px] font-light text-neutral-900 leading-[1.15] tracking-tight mb-2">
          Strategic clarity
          <span className="block font-semibold text-neutral-800">for what's next</span>
        </h1>
        
        <p className="text-[9px] text-neutral-500 leading-relaxed mb-5 max-w-[90%]">
          We guide leaders through high-stakes decisions with structure, experience, and discretion.
        </p>

        {/* Advisory Focus */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {[
            { title: "Strategy", desc: "Direction & positioning" },
            { title: "Growth", desc: "Scaling & expansion" },
            { title: "Leadership", desc: "Alignment & transitions" },
            { title: "M&A", desc: "Acquisition & succession" },
          ].map((area, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              onClick={onViewServices}
              className="text-left p-3 rounded-lg bg-white border border-neutral-200 hover:border-amber-300 transition-colors"
            >
              <p className="text-[9px] text-neutral-800 font-semibold">{area.title}</p>
              <p className="text-[7px] text-neutral-400 mt-0.5">{area.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* Credibility */}
        <div className="flex items-center gap-4 py-3 border-y border-neutral-200 mb-5">
          <div>
            <p className="text-[13px] font-semibold text-neutral-900">25+</p>
            <p className="text-[6px] text-neutral-400 uppercase tracking-wide">Years</p>
          </div>
          <div className="w-px h-6 bg-neutral-200" />
          <div>
            <p className="text-[13px] font-semibold text-neutral-900">120+</p>
            <p className="text-[6px] text-neutral-400 uppercase tracking-wide">Clients</p>
          </div>
          <div className="w-px h-6 bg-neutral-200" />
          <div>
            <p className="text-[13px] font-semibold text-neutral-900">PE</p>
            <p className="text-[6px] text-neutral-400 uppercase tracking-wide">& Family Office</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-auto space-y-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onBookConsultation}
            className="w-full py-3 bg-neutral-900 text-white text-[9px] font-semibold rounded tracking-wide"
          >
            Request a Conversation
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onViewServices}
            className="w-full py-2.5 text-neutral-500 text-[8px] font-medium flex items-center justify-center gap-1 hover:text-neutral-800 transition-colors"
          >
            Explore Our Approach <ArrowRight className="w-2.5 h-2.5" />
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2.5 border-t border-neutral-200 flex justify-between bg-white">
        <p className="text-[6px] text-neutral-400 tracking-widest uppercase font-medium">Blackwell</p>
        <p className="text-[6px] text-neutral-400">New York · London</p>
      </div>
    </motion.div>
  );
};
