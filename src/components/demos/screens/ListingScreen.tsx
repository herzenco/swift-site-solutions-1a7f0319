import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

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
      {/* Minimal Navbar */}
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-[10px] font-light tracking-[0.3em] text-white/90 uppercase">Sterling</span>
        <div className="w-4 h-[1px] bg-white/20" />
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center px-5 pb-6">
        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[8px] tracking-[0.35em] text-white/40 uppercase mb-4"
        >
          Beverly Hills
        </motion.p>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl font-extralight text-white leading-tight tracking-wide mb-6"
        >
          Where vision<br />
          meets address.
        </motion.h1>

        {/* Subtle Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="w-8 h-[0.5px] bg-gradient-to-r from-white/30 to-transparent mb-6 origin-left"
        />

        {/* Property Preview */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-4"
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
      <div className="px-5 pb-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-4"
        >
          {/* CTA */}
          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onRequestShowing}
            className="w-full py-3 border border-white/10 text-white/80 font-light rounded-sm transition-all duration-300 text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 bg-white/[0.03]"
          >
            Private Viewing
            <ChevronRight className="w-3 h-3 opacity-50" />
          </motion.button>

          {/* Trust Line */}
          <p className="text-[7px] text-white/20 text-center tracking-wider">
            Discretion. Trust. Results.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
