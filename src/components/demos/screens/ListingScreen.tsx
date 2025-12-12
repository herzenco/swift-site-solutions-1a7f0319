import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square, ChevronRight } from "lucide-react";

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
      className="h-full flex flex-col bg-stone-50 overflow-hidden"
    >
      {/* Minimal Navbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-stone-100">
        <div className="flex items-center gap-1">
          <div className="w-1 h-4 bg-amber-700" />
          <span className="text-[10px] font-semibold tracking-[0.2em] text-stone-800 uppercase">Sterling</span>
        </div>
        <nav className="flex items-center gap-3 text-[8px] text-stone-500 uppercase tracking-wider">
          <span>Properties</span>
          <span>About</span>
          <span className="text-amber-700 font-medium">Contact</span>
        </nav>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-28 bg-gradient-to-br from-stone-300 via-stone-400 to-stone-500 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-900/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-[8px] text-amber-300 uppercase tracking-[0.25em] font-medium mb-0.5">Beverly Hills</p>
          <h1 className="text-sm font-light text-white tracking-wide">Exceptional Living</h1>
        </div>
      </div>

      {/* Featured Property Card */}
      <div className="px-4 -mt-4 relative z-10 flex-1 flex flex-col">
        <div className="bg-white rounded-lg shadow-lg border border-stone-100 p-3 mb-3">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-[8px] text-amber-700 uppercase tracking-widest font-medium mb-0.5">Featured</p>
              <h2 className="text-xs font-semibold text-stone-900">The Hillcrest Estate</h2>
            </div>
            <span className="text-sm font-light text-stone-800">$4.2M</span>
          </div>
          
          <div className="flex items-center gap-1 text-stone-400 mb-2">
            <MapPin className="w-2 h-2" />
            <span className="text-[8px]">2847 Hillcrest Drive, Beverly Hills</span>
          </div>

          {/* Property Stats */}
          <div className="flex items-center gap-3 py-2 border-t border-stone-100">
            <div className="flex items-center gap-1">
              <Bed className="w-2.5 h-2.5 text-stone-400" />
              <span className="text-[9px] text-stone-600">5 Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-2.5 h-2.5 text-stone-400" />
              <span className="text-[9px] text-stone-600">4 Baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="w-2.5 h-2.5 text-stone-400" />
              <span className="text-[9px] text-stone-600">6,200 sqft</span>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-3">
          <p className="text-[8px] text-stone-400 uppercase tracking-widest mb-2">Our Services</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded-md p-2 border border-stone-100">
              <p className="text-[9px] font-medium text-stone-800">Buyer Services</p>
              <p className="text-[7px] text-stone-400">Find your dream home</p>
            </div>
            <div className="bg-white rounded-md p-2 border border-stone-100">
              <p className="text-[9px] font-medium text-stone-800">Seller Services</p>
              <p className="text-[7px] text-stone-400">Maximize your value</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-auto pb-3">
          <div className="text-center mb-2">
            <p className="text-[9px] text-stone-500">Ready to find your perfect home?</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRequestShowing}
            className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-md transition-colors text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            Schedule a Consultation
            <ChevronRight className="w-3 h-3" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
