import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
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
      {/* Hero */}
      <div className="relative h-[30%] min-h-[100px]">
        <img 
          src={advisoryHero} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-[6px] tracking-[0.3em] text-white/70 uppercase mb-1">Blackwell Advisory</p>
          <h1 className="text-[18px] font-light text-white leading-[1.1]">
            Clarity for <span className="font-semibold">what's next</span>
          </h1>
        </div>
      </div>

      {/* What We Do */}
      <div className="px-5 py-5 border-b border-neutral-200">
        <p className="text-[7px] tracking-[0.2em] text-amber-600 uppercase font-semibold mb-2">What We Do</p>
        <p className="text-[10px] text-neutral-800 font-medium leading-relaxed mb-3">
          We guide leaders through high-stakes decisions with structure, experience, and discretion.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {["Strategy", "Growth", "Leadership", "Transitions"].map((area, i) => (
            <button
              key={i}
              onClick={onViewServices}
              className="text-left py-2 px-3 rounded bg-white border border-neutral-200 hover:border-amber-300 transition-colors"
            >
              <p className="text-[8px] text-neutral-800 font-medium">{area}</p>
            </button>
          ))}
        </div>
        <button 
          onClick={onViewServices}
          className="mt-3 text-[8px] text-amber-600 font-medium flex items-center gap-1"
        >
          Explore our approach <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Who We Are */}
      <div className="px-5 py-5 border-b border-neutral-200 bg-white">
        <p className="text-[7px] tracking-[0.2em] text-amber-600 uppercase font-semibold mb-2">Who We Are</p>
        <p className="text-[9px] text-neutral-600 leading-relaxed mb-4">
          A small team of senior advisors with decades of experience across private equity, family offices, and founder-led businesses.
        </p>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[14px] font-semibold text-neutral-900">25+</p>
            <p className="text-[6px] text-neutral-400 uppercase tracking-wide">Years</p>
          </div>
          <div className="w-px h-8 bg-neutral-200" />
          <div>
            <p className="text-[14px] font-semibold text-neutral-900">120+</p>
            <p className="text-[6px] text-neutral-400 uppercase tracking-wide">Clients</p>
          </div>
          <div className="w-px h-8 bg-neutral-200" />
          <div>
            <p className="text-[14px] font-semibold text-neutral-900">PE</p>
            <p className="text-[6px] text-neutral-400 uppercase tracking-wide">& Family</p>
          </div>
        </div>
      </div>

      {/* How We Do It */}
      <div className="px-5 py-5 border-b border-neutral-200">
        <p className="text-[7px] tracking-[0.2em] text-amber-600 uppercase font-semibold mb-3">How We Work</p>
        <div className="space-y-3">
          {[
            { step: "01", title: "Discovery", desc: "Understand your situation and goals" },
            { step: "02", title: "Assessment", desc: "Identify priorities and opportunities" },
            { step: "03", title: "Engagement", desc: "Ongoing advisory and support" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[9px] text-amber-500 font-mono font-semibold">{item.step}</span>
              <div>
                <p className="text-[9px] text-neutral-800 font-medium">{item.title}</p>
                <p className="text-[7px] text-neutral-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Us */}
      <div className="px-5 py-5 bg-neutral-900">
        <p className="text-[7px] tracking-[0.2em] text-amber-400 uppercase font-semibold mb-2">Contact Us</p>
        <p className="text-[10px] text-white font-medium mb-1">Ready for a conversation?</p>
        <p className="text-[8px] text-neutral-400 mb-4">
          We respond within one business day.
        </p>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onBookConsultation}
          className="w-full py-3 bg-white text-neutral-900 text-[9px] font-semibold rounded tracking-wide flex items-center justify-center gap-2"
        >
          Request a Conversation
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-neutral-800 bg-neutral-900 flex justify-between">
        <p className="text-[6px] text-neutral-500 tracking-widest uppercase">Blackwell Advisory</p>
        <p className="text-[6px] text-neutral-500">New York · London</p>
      </div>
    </motion.div>
  );
};
