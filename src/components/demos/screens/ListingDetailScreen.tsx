import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Bed, Bath, Square, MapPin, Calendar } from "lucide-react";

interface ListingDetailScreenProps {
  onBack: () => void;
  onRequestShowing: () => void;
}

export const ListingDetailScreen = ({ onBack, onRequestShowing }: ListingDetailScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
        <button type="button" onClick={onBack} className="flex items-center gap-1 text-neutral-600">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-[9px] uppercase tracking-wider">Back</span>
        </button>
        <span className="text-[9px] uppercase tracking-[0.15em] text-neutral-400">Property Details</span>
        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero Image */}
        <div className="relative h-40 bg-neutral-200">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
            alt="Property"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[8px] px-2 py-1 rounded">
            1 / 12
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Price & Address */}
          <div>
            <p className="text-[18px] font-light text-neutral-900" style={{ fontFamily: 'Georgia, serif' }}>
              $4,850,000
            </p>
            <p className="text-[10px] text-neutral-600 mt-1">
              1247 Hillcrest Drive
            </p>
            <p className="text-[9px] text-neutral-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />
              Beverly Hills, CA 90210
            </p>
          </div>

          {/* Key Stats */}
          <div className="flex items-center gap-4 py-3 border-y border-neutral-100">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-[10px] text-neutral-700">5 Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-[10px] text-neutral-700">6 Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-[10px] text-neutral-700">6,200 sqft</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-[10px] uppercase tracking-wider text-neutral-400 mb-2">About This Property</h3>
            <p className="text-[9px] text-neutral-600 leading-[1.7]">
              An architectural masterpiece nestled in the hills of Beverly Hills. This contemporary estate features floor-to-ceiling windows, a chef's kitchen with top-of-the-line appliances, and seamless indoor-outdoor living spaces. The primary suite offers panoramic city views, a spa-like bath, and private terrace.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-[10px] uppercase tracking-wider text-neutral-400 mb-2">Key Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Infinity Pool",
                "Home Theater",
                "Wine Cellar",
                "Smart Home",
                "3-Car Garage",
                "Guest House"
              ].map((feature) => (
                <div key={feature} className="text-[9px] text-neutral-600 flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-neutral-300" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Agent Card */}
          <div className="bg-neutral-50 rounded-sm p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                alt="Agent"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-medium text-neutral-900">James Sterling</p>
              <p className="text-[8px] text-neutral-500">Luxury Estate Specialist</p>
            </div>
            <Calendar className="w-4 h-4 text-neutral-400" />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-4 border-t border-neutral-100">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onRequestShowing}
          className="w-full py-3 font-medium rounded-sm transition-all duration-300 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center gap-2"
          style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
        >
          Schedule Private Showing
          <ChevronRight className="w-3 h-3" />
        </motion.button>
      </div>
    </motion.div>
  );
};
