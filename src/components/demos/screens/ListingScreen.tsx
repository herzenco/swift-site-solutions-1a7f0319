import { motion } from "framer-motion";
import { ChevronRight, MapPin, ArrowDown } from "lucide-react";
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
      className="h-full flex flex-col bg-[#0a0a0b] overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Hero Section */}
      <div className="relative min-h-[85%] flex flex-col">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={luxuryEstateHero} 
            alt="Luxury Estate" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/60 via-[#0a0a0b]/40 to-[#0a0a0b]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-5 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-[7px] tracking-[0.35em] text-white/40 uppercase mb-4">
              Private Real Estate Advisory
            </p>
            
            <h1 className="text-[15px] font-light text-white leading-[1.4] mb-4 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              Private Representation in Los Angeles' Most Coveted Homes
            </h1>
            
            <p className="text-[9px] font-light text-white/50 leading-relaxed mb-6 max-w-[90%]">
              Discreet, data-informed real estate advisory for buyers and sellers who value clarity and control.
            </p>

            <div className="flex flex-col gap-2">
              <motion.button
                whileHover={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onRequestShowing}
                className="w-full py-2.5 border border-white/20 text-white/90 font-light rounded-none transition-all duration-300 text-[8px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 bg-white/[0.05] backdrop-blur-sm"
              >
                Request a Private Consultation
                <ChevronRight className="w-2.5 h-2.5 opacity-50" />
              </motion.button>
              
              <button className="text-[7px] text-white/30 tracking-[0.15em] uppercase hover:text-white/50 transition-colors">
                View Select Properties →
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="relative z-10 flex justify-center pb-4"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-3 h-3 text-white/20" />
          </motion.div>
        </motion.div>
      </div>

      {/* Philosophy Section */}
      <div className="px-5 py-8 border-t border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[10px] font-light text-white/80 mb-3 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            A Different Kind of Experience
          </h2>
          <p className="text-[8px] text-white/40 leading-[1.7] font-light">
            Luxury real estate isn't about volume — it's about precision. Every decision, showing, and negotiation is handled with discretion, insight, and a long-term view of value.
          </p>
        </motion.div>
      </div>

      {/* Services Section */}
      <div className="px-5 py-6 border-t border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[6px] tracking-[0.3em] text-white/30 uppercase mb-4">Services</p>
          
          <div className="space-y-3">
            {[
              { title: "Buyer Representation", desc: "Strategic guidance from search to close" },
              { title: "Seller Advisory", desc: "Positioning, pricing, and private marketing" },
              { title: "Off-Market Access", desc: "Properties never publicly listed" },
            ].map((service, i) => (
              <div key={i} className="group">
                <p className="text-[8px] text-white/70 font-light mb-0.5">{service.title}</p>
                <p className="text-[7px] text-white/30">{service.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Experience Section */}
      <div className="px-5 py-6 border-t border-white/[0.06] bg-white/[0.02]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-start"
        >
          <div>
            <p className="text-[14px] font-extralight text-white/80">$2B+</p>
            <p className="text-[6px] tracking-[0.2em] text-white/25 uppercase">Career Volume</p>
          </div>
          <div className="text-center">
            <p className="text-[14px] font-extralight text-white/80">15+</p>
            <p className="text-[6px] tracking-[0.2em] text-white/25 uppercase">Years</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] text-white/50 leading-relaxed">
              Beverly Hills<br />
              Bel Air<br />
              Holmby Hills
            </p>
          </div>
        </motion.div>
      </div>

      {/* Trust Section */}
      <div className="px-5 py-6 border-t border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[10px] font-light text-white/80 mb-3 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            Built on Trust
          </h2>
          <p className="text-[8px] text-white/40 leading-[1.7] font-light">
            Clients work with me not for access — but for judgment, discretion, and outcomes. Many relationships span multiple transactions over years.
          </p>
        </motion.div>
      </div>

      {/* Final CTA */}
      <div className="px-5 py-8 border-t border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-[11px] font-light text-white/90 mb-2 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            Let's Discuss Your Goals
          </h2>
          <p className="text-[7px] text-white/35 mb-4">
            Every conversation begins with clarity — no pressure, no obligation.
          </p>
          
          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onRequestShowing}
            className="w-full py-2.5 border border-white/15 text-white/80 font-light rounded-none transition-all duration-300 text-[8px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 bg-white/[0.03]"
          >
            Schedule a Private Call
            <ChevronRight className="w-2.5 h-2.5 opacity-40" />
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/[0.04] flex items-center justify-between">
        <div className="flex items-center gap-1 text-white/20">
          <MapPin className="w-2.5 h-2.5" />
          <span className="text-[6px] tracking-wider">Los Angeles, CA</span>
        </div>
        <p className="text-[6px] text-white/15 tracking-wider">
          © 2024
        </p>
      </div>
    </motion.div>
  );
};
