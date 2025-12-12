import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react";

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
      className="h-full flex flex-col bg-gray-50"
    >
      {/* Property Image */}
      <div className="relative h-44 bg-gradient-to-br from-cyan-400 to-blue-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/30 text-6xl font-bold">🏡</div>
        </div>
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
        <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded-full">
          <span className="text-xs font-semibold text-gray-900">New Listing</span>
        </div>
      </div>

      {/* Property Details */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-lg font-bold text-gray-900">$485,000</h2>
            <div className="flex items-center gap-1 text-gray-600 mt-1">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">123 Oak Street, Austin TX</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 py-3 border-y border-gray-200 my-3">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">3 bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">2 bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">1,850 sqft</span>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed mb-4">
          Beautiful single-family home in a quiet neighborhood. Recently renovated kitchen, hardwood floors throughout, and a spacious backyard.
        </p>

        <div className="mt-auto space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRequestShowing}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-colors"
          >
            Request Showing
          </motion.button>
          <button className="w-full py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl text-sm">
            Contact Agent
          </button>
        </div>
      </div>
    </motion.div>
  );
};
