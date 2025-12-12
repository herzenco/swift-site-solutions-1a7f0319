import { motion } from "framer-motion";
import { ArrowLeft, Bed, Bath, Square, MapPin } from "lucide-react";

interface ListingsScreenProps {
  onBack: () => void;
  onRequestShowing: () => void;
}

const listings = [
  {
    id: 1,
    address: "1247 Stone Canyon Rd",
    location: "Bel Air",
    price: "$18,500,000",
    beds: 6,
    baths: 8,
    sqft: "12,400",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    address: "904 N Bedford Dr",
    location: "Beverly Hills",
    price: "$24,750,000",
    beds: 7,
    baths: 10,
    sqft: "15,200",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    address: "623 N Hillcrest Rd",
    location: "Beverly Hills",
    price: "$32,000,000",
    beds: 8,
    baths: 12,
    sqft: "18,600",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    address: "10778 Chalon Rd",
    location: "Holmby Hills",
    price: "$45,000,000",
    beds: 10,
    baths: 14,
    sqft: "22,000",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop"
  }
];

export const ListingsScreen = ({ onBack, onRequestShowing }: ListingsScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-white"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100">
        <button 
          onClick={onBack}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100"
        >
          <ArrowLeft className="w-4 h-4 text-neutral-700" />
        </button>
        <div>
          <h2 className="text-[11px] font-semibold text-neutral-900">Select Listings</h2>
          <p className="text-[8px] text-neutral-500">Off-market & exclusive properties</p>
        </div>
      </div>

      {/* Listings */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: 'none' }}>
        {listings.map((listing, index) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-neutral-50 rounded-lg overflow-hidden"
          >
            <div className="relative h-24">
              <img 
                src={listing.image} 
                alt={listing.address}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-semibold text-neutral-900">
                {listing.price}
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-[10px] font-medium text-neutral-900 mb-0.5">{listing.address}</h3>
              <div className="flex items-center gap-1 text-neutral-500 mb-2">
                <MapPin className="w-2.5 h-2.5" />
                <span className="text-[8px]">{listing.location}</span>
              </div>
              <div className="flex items-center gap-3 text-[8px] text-neutral-600">
                <div className="flex items-center gap-1">
                  <Bed className="w-3 h-3" />
                  <span>{listing.beds}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-3 h-3" />
                  <span>{listing.baths}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="w-3 h-3" />
                  <span>{listing.sqft} sqft</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-4 py-3 border-t border-neutral-100">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onRequestShowing}
          className="w-full py-2.5 font-medium rounded-sm transition-all duration-300 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center"
          style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
        >
          Schedule a Private Viewing
        </motion.button>
      </div>
    </motion.div>
  );
};
