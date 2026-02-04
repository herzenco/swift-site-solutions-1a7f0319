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
      className="h-full flex flex-col bg-white overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Hero */}
      <div className="relative h-[28%] min-h-[90px]">
        <img 
          src={advisoryHero} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute bottom-4 left-5 right-5">
          <h1 className="text-[20px] font-medium text-white leading-[1.1] tracking-tight drop-shadow-sm">
            Clarity for <span className="font-semibold">what's next</span>
          </h1>
        </div>
      </div>

      {/* Nav/Brand */}
      <div className="px-5 py-3 flex justify-between items-center border-b border-neutral-100">
        <p className="text-[7px] tracking-[0.3em] text-neutral-500 uppercase font-medium">Blackwell</p>
        <button 
          onClick={onViewServices}
          className="text-[7px] text-neutral-800 font-semibold"
        >
          Menu
        </button>
      </div>

      {/* What We Do */}
      <div className="px-5 py-6">
        <p className="text-[7px] tracking-[0.2em] text-neutral-800 uppercase font-bold mb-3">What We Do</p>
        <p className="text-[11px] text-neutral-800 leading-[1.6] mb-5 font-medium">
          Strategic guidance for leaders navigating high-stakes decisions.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Strategy", "Growth", "Leadership", "M&A"].map((area, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              onClick={onViewServices}
              className="px-3 py-1.5 text-[8px] text-neutral-700 font-medium border border-neutral-300 rounded-full hover:border-neutral-800 hover:text-neutral-900 transition-colors"
            >
              {area}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-neutral-200" />

      {/* Who We Are */}
      <div className="px-5 py-6">
        <p className="text-[7px] tracking-[0.2em] text-neutral-800 uppercase font-bold mb-3">Who We Are</p>
        <p className="text-[9px] text-neutral-600 leading-[1.7] mb-4">
          Senior advisors with decades across private equity, family offices, and founder-led businesses.
        </p>
        <div className="flex gap-6">
          <div>
            <p className="text-[16px] font-semibold text-neutral-900">25</p>
            <p className="text-[6px] text-neutral-500 uppercase tracking-wider font-medium">Years</p>
          </div>
          <div>
            <p className="text-[16px] font-semibold text-neutral-900">120+</p>
            <p className="text-[6px] text-neutral-500 uppercase tracking-wider font-medium">Clients</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-neutral-200" />

      {/* How We Work */}
      <div className="px-5 py-6">
        <p className="text-[7px] tracking-[0.2em] text-neutral-800 uppercase font-bold mb-4">Process</p>
        <div className="space-y-4">
          {[
            { num: "1", text: "Discovery conversation" },
            { num: "2", text: "Strategic assessment" },
            { num: "3", text: "Ongoing engagement" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-[10px] text-neutral-400 font-semibold">{item.num}</span>
              <p className="text-[9px] text-neutral-700 font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="mt-auto px-5 py-6 bg-neutral-900">
        <p className="text-[7px] tracking-[0.2em] text-neutral-300 uppercase font-bold mb-3">Contact</p>
        <p className="text-[11px] text-white font-medium mb-4">Ready for a conversation?</p>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onBookConsultation}
          className="w-full py-3 bg-white text-neutral-900 text-[8px] font-semibold rounded-sm flex items-center justify-center gap-2"
        >
          Get in touch <ArrowRight className="w-3 h-3" />
        </motion.button>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-neutral-900 border-t border-neutral-700 flex justify-between">
        <p className="text-[6px] text-neutral-400 tracking-wider font-medium">New York · London</p>
        <p className="text-[6px] text-neutral-400">© 2024</p>
      </div>
    </motion.div>
  );
};
