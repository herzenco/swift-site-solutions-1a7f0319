import { motion } from "framer-motion";
import { MapPin, Menu, Search, ChevronRight } from "lucide-react";

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
      className="h-full flex flex-col bg-white overflow-hidden"
    >
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 bg-amber-600 rounded-sm" />
          <span className="text-xs font-semibold tracking-wide text-stone-900 uppercase">Sterling</span>
        </div>
        <Menu className="w-4 h-4 text-stone-600" />
      </div>

      {/* Hero Section */}
      <div className="relative px-4 pt-6 pb-4">
        <p className="text-[10px] text-amber-600 uppercase tracking-widest font-medium mb-1">Beverly Hills</p>
        <h1 className="text-xl font-semibold text-stone-900 leading-tight mb-2">
          Find Your <br />Dream Home
        </h1>
        <p className="text-[11px] text-stone-500 leading-relaxed mb-4">
          Exclusive luxury properties curated for discerning buyers.
        </p>
        
        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2.5 border border-stone-100">
          <Search className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[11px] text-stone-400">Search by location or address...</span>
        </div>
      </div>

      {/* Featured Listing */}
      <div className="px-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] text-stone-500 uppercase tracking-wider font-medium">Featured Listing</p>
          <span className="text-[10px] text-amber-600 font-medium">View All</span>
        </div>
        
        <div className="bg-stone-100 rounded-xl overflow-hidden flex-1 max-h-28 relative mb-3">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-200 via-stone-300 to-stone-400" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-stone-500/60 text-2xl mb-1">🏛️</p>
              <p className="text-[9px] text-stone-500/80 font-medium uppercase tracking-wider">Luxury Estate</p>
            </div>
          </div>
          <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[8px] font-semibold text-amber-700 uppercase tracking-wider">
            New
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-sm font-semibold text-stone-900">$1,250,000</h3>
            <span className="text-amber-500 text-xs">★</span>
          </div>
          <div className="flex items-center gap-1 text-stone-500 mb-1.5">
            <MapPin className="w-2.5 h-2.5" />
            <span className="text-[10px]">2847 Hillcrest Drive</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-stone-500">
            <span>4 Beds</span>
            <span className="text-stone-300">•</span>
            <span>3 Baths</span>
            <span className="text-stone-300">•</span>
            <span>3,200 sqft</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pb-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRequestShowing}
            className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-xl transition-colors text-xs tracking-wide flex items-center justify-center gap-2"
          >
            Schedule Private Tour
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
