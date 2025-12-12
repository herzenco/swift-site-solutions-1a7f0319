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
      className="h-full flex flex-col bg-[#faf9f7] overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Hero Section */}
      <div className="relative min-h-[85%] flex flex-col">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={luxuryEstateHero} 
            alt="Luxury Estate" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f7]/70 via-[#faf9f7]/50 to-[#faf9f7]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-5 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-[7px] tracking-[0.35em] text-[#1a1a1a]/50 uppercase mb-4">
              Private Real Estate Advisory
            </p>
            
            <h1 className="text-[15px] font-light text-[#1a1a1a] leading-[1.4] mb-4 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              Private Representation in Los Angeles' Most Coveted Homes
            </h1>
            
            <p className="text-[9px] font-light text-[#1a1a1a]/60 leading-relaxed mb-6 max-w-[90%]">
              Discreet, data-informed real estate advisory for buyers and sellers who value clarity and control.
            </p>

            <div className="flex flex-col gap-2">
              <motion.button
                whileHover={{ backgroundColor: "rgba(26,26,26,0.95)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onRequestShowing}
                className="w-full py-2.5 border border-[#1a1a1a] text-white font-light rounded-none transition-all duration-300 text-[8px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 bg-[#1a1a1a]"
              >
                Request a Private Consultation
                <ChevronRight className="w-2.5 h-2.5 opacity-70" />
              </motion.button>
              
              <button className="text-[7px] text-[#1a1a1a]/50 tracking-[0.15em] uppercase hover:text-[#1a1a1a]/80 transition-colors">
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
            <ArrowDown className="w-3 h-3 text-[#1a1a1a]/30" />
          </motion.div>
        </motion.div>
      </div>

      {/* Philosophy Section */}
      <div className="px-5 py-8 border-t border-[#1a1a1a]/[0.08]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[10px] font-light text-[#1a1a1a] mb-3 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            A Different Kind of Experience
          </h2>
          <p className="text-[8px] text-[#1a1a1a]/55 leading-[1.7] font-light">
            Luxury real estate isn't about volume — it's about precision. Every decision, showing, and negotiation is handled with discretion, insight, and a long-term view of value.
          </p>
        </motion.div>
      </div>

      {/* Services Section */}
      <div className="px-5 py-6 border-t border-[#1a1a1a]/[0.08]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[6px] tracking-[0.3em] text-[#1a1a1a]/40 uppercase mb-4">Services</p>
          
          <div className="space-y-3">
            {[
              { title: "Buyer Representation", desc: "Strategic guidance from search to close" },
              { title: "Seller Advisory", desc: "Positioning, pricing, and private marketing" },
              { title: "Off-Market Access", desc: "Properties never publicly listed" },
            ].map((service, i) => (
              <div key={i} className="group">
                <p className="text-[8px] text-[#1a1a1a]/80 font-light mb-0.5">{service.title}</p>
                <p className="text-[7px] text-[#1a1a1a]/40">{service.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Experience Section */}
      <div className="px-5 py-6 border-t border-[#1a1a1a]/[0.08] bg-[#1a1a1a]/[0.03]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-start"
        >
          <div>
            <p className="text-[14px] font-extralight text-[#1a1a1a]">$2B+</p>
            <p className="text-[6px] tracking-[0.2em] text-[#1a1a1a]/35 uppercase">Career Volume</p>
          </div>
          <div className="text-center">
            <p className="text-[14px] font-extralight text-[#1a1a1a]">15+</p>
            <p className="text-[6px] tracking-[0.2em] text-[#1a1a1a]/35 uppercase">Years</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] text-[#1a1a1a]/60 leading-relaxed">
              Beverly Hills<br />
              Bel Air<br />
              Holmby Hills
            </p>
          </div>
        </motion.div>
      </div>

      {/* Trust Section */}
      <div className="px-5 py-6 border-t border-[#1a1a1a]/[0.08]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[10px] font-light text-[#1a1a1a] mb-3 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            Built on Trust
          </h2>
          <p className="text-[8px] text-[#1a1a1a]/55 leading-[1.7] font-light">
            Clients work with me not for access — but for judgment, discretion, and outcomes. Many relationships span multiple transactions over years.
          </p>
        </motion.div>
      </div>

      {/* Final CTA */}
      <div className="px-5 py-8 border-t border-[#1a1a1a]/[0.08]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-[11px] font-light text-[#1a1a1a] mb-2 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            Let's Discuss Your Goals
          </h2>
          <p className="text-[7px] text-[#1a1a1a]/45 mb-4">
            Every conversation begins with clarity — no pressure, no obligation.
          </p>
          
          <motion.button
            whileHover={{ backgroundColor: "rgba(26,26,26,0.95)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onRequestShowing}
            className="w-full py-2.5 border border-[#1a1a1a] text-white font-light rounded-none transition-all duration-300 text-[8px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 bg-[#1a1a1a]"
          >
            Schedule a Private Call
            <ChevronRight className="w-2.5 h-2.5 opacity-60" />
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[#1a1a1a]/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-1 text-[#1a1a1a]/30">
          <MapPin className="w-2.5 h-2.5" />
          <span className="text-[6px] tracking-wider">Los Angeles, CA</span>
        </div>
        <p className="text-[6px] text-[#1a1a1a]/25 tracking-wider">
          © 2024
        </p>
      </div>
    </motion.div>
  );
};
