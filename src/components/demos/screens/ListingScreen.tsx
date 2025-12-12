import { motion } from "framer-motion";
import { ChevronRight, MapPin } from "lucide-react";
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
      {/* Hero Background with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={luxuryEstateHero} 
          alt="Luxury Estate" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1214]/70 via-[#0f1214]/50 to-[#0f1214]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-5 pt-8">
        {/* Agent Name & Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-xl font-extralight text-white tracking-wide mb-1">
            James Sterling
          </h1>
          <p className="text-[8px] tracking-[0.3em] text-white/40 uppercase">
            Luxury Real Estate
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-[11px] font-light text-white/70 leading-relaxed mb-6 max-w-[85%]"
        >
          Finding your forever address in Beverly Hills & Bel Air.
        </motion.p>

        {/* Subtle Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="w-10 h-[0.5px] bg-gradient-to-r from-white/40 to-transparent mb-6 origin-left"
        />

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center gap-6 mb-6"
        >
          <div>
            <p className="text-lg font-light text-white">15+</p>
            <p className="text-[7px] tracking-[0.15em] text-white/30 uppercase">Years</p>
          </div>
          <div className="w-[1px] h-6 bg-white/10" />
          <div>
            <p className="text-lg font-light text-white">$2B+</p>
            <p className="text-[7px] tracking-[0.15em] text-white/30 uppercase">Sold</p>
          </div>
          <div className="w-[1px] h-6 bg-white/10" />
          <div>
            <p className="text-lg font-light text-white">200+</p>
            <p className="text-[7px] tracking-[0.15em] text-white/30 uppercase">Clients</p>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex items-center gap-1.5 text-white/40"
        >
          <MapPin className="w-3 h-3" />
          <span className="text-[8px] tracking-wider">Beverly Hills, CA</span>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 px-5 pb-5">
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
            className="w-full py-3 border border-white/15 text-white/90 font-light rounded-sm transition-all duration-300 text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 bg-white/[0.03] backdrop-blur-sm"
          >
            Schedule a Consultation
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
