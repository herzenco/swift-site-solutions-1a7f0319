import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square, ChevronRight, Menu } from "lucide-react";

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
      {/* Luxurious Navbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-stone-100">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 bg-amber-600 rounded-sm" />
          <span className="text-xs font-semibold tracking-wide text-stone-900 uppercase">Sterling</span>
        </div>
        <Menu className="w-4 h-4 text-stone-600" />
      </div>

      {/* Hero Property Image */}
      <div className="relative h-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-300 via-stone-400 to-stone-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMEwyNSAxNUw0MCAxNUwyOCAyNUwzMyA0MEwyMCAzMEw3IDQwTDEyIDI1TDAgMTVMMTUgMTVMMjAgMFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz48L3N2Zz4=')] opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-50 to-transparent" />
        <div className="absolute top-3 right-3 px-2 py-1 bg-white/95 backdrop-blur-sm rounded text-[10px] font-semibold text-amber-700 uppercase tracking-wider">
          Featured
        </div>
      </div>

      {/* Property Content */}
      <div className="flex-1 px-4 -mt-4 relative z-10 flex flex-col">
        {/* Property Card */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-4 mb-3">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-[10px] text-stone-500 uppercase tracking-wider font-medium mb-0.5">Exclusive Listing</p>
              <h2 className="text-lg font-semibold text-stone-900 tracking-tight">$1,250,000</h2>
            </div>
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <span className="text-amber-600 text-sm">★</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-stone-500 mb-3">
            <MapPin className="w-3 h-3" />
            <span className="text-[11px]">2847 Hillcrest Drive, Beverly Hills</span>
          </div>

          <div className="flex items-center gap-3 py-2.5 border-t border-stone-100">
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-[11px] font-medium text-stone-600">4 Beds</span>
            </div>
            <div className="w-px h-3 bg-stone-200" />
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-[11px] font-medium text-stone-600">3 Baths</span>
            </div>
            <div className="w-px h-3 bg-stone-200" />
            <div className="flex items-center gap-1">
              <Square className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-[11px] font-medium text-stone-600">3,200 sqft</span>
            </div>
          </div>
        </div>

        {/* Agent Section */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-3 mb-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center text-stone-500 text-xs font-semibold">
            JC
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-stone-900">James Carter</p>
            <p className="text-[10px] text-stone-500">Luxury Property Specialist</p>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </div>

        {/* CTA */}
        <div className="mt-auto pb-3 space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRequestShowing}
            className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-xl transition-colors text-sm tracking-wide"
          >
            Schedule Private Tour
          </motion.button>
          <p className="text-center text-[10px] text-stone-400">
            Available for showings • Serious inquiries only
          </p>
        </div>
      </div>
    </motion.div>
  );
};
