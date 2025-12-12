import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import luxuryEstateHero from "@/assets/luxury-estate-hero.jpg";

interface ListingScreenProps {
  onRequestShowing: () => void;
}

export const ListingScreen = ({ onRequestShowing }: ListingScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-[#0f1214] overflow-hidden"
    >
      {/* Personal Realtor Navbar */}
      <div className="flex items-center justify-between px-5 py-3 absolute top-0 left-0 right-0 z-20">
        <div className="flex flex-col">
          <span className="text-[10px] font-light tracking-[0.25em] text-white/90 uppercase">James Sterling</span>
          <span className="text-[6px] tracking-[0.15em] text-white/40 uppercase">Luxury Real Estate</span>
        </div>
        <div className="w-4 h-[1px] bg-white/30" />
      </div>

      {/* Hero Image */}
      <div className="relative h-36 overflow-hidden">
        <img 
          src={luxuryEstateHero} 
          alt="Luxury Estate" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1214]/60 via-transparent to-[#0f1214]" />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col px-5 -mt-4 relative z-10">
        {/* Personal Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[8px] tracking-[0.35em] text-white/40 uppercase mb-2"
        >
          Your Beverly Hills Agent
        </motion.p>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg font-extralight text-white leading-tight tracking-wide mb-4"
        >
          Finding your<br />
          forever address.
        </motion.h1>

        {/* Subtle Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="w-8 h-[0.5px] bg-gradient-to-r from-white/30 to-transparent mb-4 origin-left"
        />

        {/* Property Preview */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-3"
        >
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[7px] tracking-[0.2em] text-white/30 uppercase mb-1">Featured Residence</p>
              <p className="text-[11px] text-white/80 font-light">The Hillcrest Estate</p>
            </div>
            <p className="text-[11px] text-white/50 font-light">$4.2M</p>
          </div>

          {/* Property Stats - Minimal */}
          <div className="flex items-center gap-4 text-[8px] text-white/30 tracking-wide">
            <span>5 Bed</span>
            <span className="w-[2px] h-[2px] rounded-full bg-white/20" />
            <span>4 Bath</span>
            <span className="w-[2px] h-[2px] rounded-full bg-white/20" />
            <span>6,200 SF</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="px-5 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-3"
        >
          {/* CTA */}
          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onRequestShowing}
            className="w-full py-2.5 border border-white/10 text-white/80 font-light rounded-sm transition-all duration-300 text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 bg-white/[0.03]"
          >
            Private Viewing
            <ChevronRight className="w-3 h-3 opacity-50" />
          </motion.button>

          {/* Personal Trust Line */}
          <p className="text-[7px] text-white/20 text-center tracking-wider">
            15+ years serving Beverly Hills & Bel Air
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
