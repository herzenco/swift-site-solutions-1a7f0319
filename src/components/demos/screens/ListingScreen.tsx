import { motion } from "framer-motion";
import { ChevronRight, MapPin } from "lucide-react";
import luxuryEstateHero from "@/assets/luxury-estate-hero.jpg";

interface ListingScreenProps {
  onRequestShowing: () => void;
  onViewListings: () => void;
}

export const ListingScreen = ({ onRequestShowing, onViewListings }: ListingScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-white overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Hero Section */}
      <div className="relative min-h-[70%] flex flex-col">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={luxuryEstateHero} 
            alt="Luxury Estate" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/25 to-white/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-between px-5 pt-10 pb-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <p className="text-[8px] tracking-[0.3em] text-neutral-700 uppercase mb-3 font-semibold">
              Private Real Estate Advisory
            </p>
            
            <h1 className="text-[17px] font-medium text-neutral-900 leading-[1.3] mb-3 drop-shadow-sm" style={{ fontFamily: 'Georgia, serif' }}>
              Private Representation in Los Angeles' Most Coveted Homes
            </h1>
          </motion.div>

          {/* CTA at bottom of hero */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRequestShowing}
            className="w-full py-3 font-medium rounded-sm transition-all duration-300 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center gap-2"
            style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
          >
            Request a Consultation
            <ChevronRight className="w-3 h-3" />
          </motion.button>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="px-5 py-6 border-t border-neutral-200 bg-neutral-50">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[11px] text-neutral-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            A Different Kind of Experience
          </h2>
          <p className="text-[9px] text-neutral-600 leading-[1.7]">
            Luxury real estate isn't about volume — it's about precision. Every decision, showing, and negotiation is handled with discretion and insight.
          </p>
        </motion.div>
      </div>

      {/* Services Section */}
      <div className="px-5 py-5 border-t border-neutral-200">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[7px] tracking-[0.25em] text-neutral-400 uppercase mb-4 font-semibold">Services</p>
          
          <div className="space-y-3">
            {[
              { title: "Buyer Representation", desc: "Strategic guidance from search to close" },
              { title: "Seller Advisory", desc: "Positioning, pricing, and private marketing" },
              { title: "Off-Market Access", desc: "Properties never publicly listed" },
            ].map((service, i) => (
              <div key={i}>
                <p className="text-[9px] text-neutral-800 font-medium mb-0.5">{service.title}</p>
                <p className="text-[8px] text-neutral-500">{service.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Experience Section */}
      <div className="px-5 py-5 border-t border-neutral-200 bg-neutral-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-start"
        >
          <div>
            <p className="text-[16px] font-light">$2B+</p>
            <p className="text-[7px] tracking-[0.15em] text-neutral-400 uppercase">Career Volume</p>
          </div>
          <div className="text-center">
            <p className="text-[16px] font-light">15+</p>
            <p className="text-[7px] tracking-[0.15em] text-neutral-400 uppercase">Years</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-neutral-300 leading-relaxed">
              Beverly Hills<br />
              Bel Air<br />
              Holmby Hills
            </p>
          </div>
        </motion.div>
      </div>

      {/* Trust Section */}
      <div className="px-5 py-5 border-t border-neutral-200">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[11px] text-neutral-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Built on Trust
          </h2>
          <p className="text-[9px] text-neutral-600 leading-[1.7] mb-3">
            Clients work with me not for access — but for judgment, discretion, and outcomes. Many relationships span multiple transactions.
          </p>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onViewListings}
            className="w-full py-2.5 font-medium rounded-sm transition-all duration-300 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
          >
            View Listings
            <ChevronRight className="w-3 h-3" />
          </motion.button>
        </motion.div>
      </div>

      {/* Final CTA */}
      <div className="px-5 py-6 border-t border-neutral-200 bg-neutral-50">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-[12px] text-neutral-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Let's Discuss Your Goals
          </h2>
          <p className="text-[8px] text-neutral-500 mb-4">
            Every conversation begins with clarity — no pressure, no obligation.
          </p>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onRequestShowing}
            className="w-full py-3 font-medium rounded-sm transition-all duration-300 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center gap-2"
            style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
          >
            Schedule a Private Call
            <ChevronRight className="w-3 h-3" />
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-neutral-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-1.5 text-neutral-400">
          <MapPin className="w-3 h-3" />
          <span className="text-[7px] tracking-wider font-medium">Los Angeles, CA</span>
        </div>
        <p className="text-[7px] text-neutral-300 tracking-wider">
          © 2024
        </p>
      </div>
    </motion.div>
  );
};
