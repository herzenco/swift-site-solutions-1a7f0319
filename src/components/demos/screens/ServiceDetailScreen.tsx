import { motion } from "framer-motion";
import { ArrowLeft, Check, Clock, Shield, Star, ChevronRight } from "lucide-react";
import kitchenImage from "@/assets/demo-kitchen-remodel.jpg";

interface ServiceDetailScreenProps {
  onBack: () => void;
  onBookNow: () => void;
}

export const ServiceDetailScreen = ({ onBack, onBookNow }: ServiceDetailScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-stone-50 overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header with Back Button */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 py-3">
        <button
          onClick={onBack}
          type="button"
          className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-stone-600" />
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative h-[35%] min-h-[140px]">
        <img 
          src={kitchenImage} 
          alt="Kitchen Remodel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[8px] text-amber-400 uppercase tracking-wider font-medium mb-1">Featured Service</p>
          <h1 className="text-[16px] font-semibold text-white">Kitchen Remodels</h1>
        </div>
      </div>

      {/* Pricing Bar */}
      <div className="px-5 py-3 bg-white border-b border-stone-100 flex items-center justify-between">
        <div>
          <p className="text-[7px] text-stone-500 uppercase tracking-wide">Starting at</p>
          <p className="text-[18px] font-bold text-stone-900">$25,000</p>
        </div>
        <div className="text-right">
          <p className="text-[7px] text-stone-500">Timeline</p>
          <p className="text-[10px] font-medium text-amber-600">4-8 Weeks</p>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 py-4 border-b border-stone-100">
        <p className="text-[9px] text-stone-600 leading-relaxed">
          Transform your kitchen into the heart of your home. We handle everything from custom cabinetry and premium countertops to modern layouts and expert craftsmanship.
        </p>
      </div>

      {/* What's Included */}
      <div className="px-5 py-4 border-b border-stone-100">
        <p className="text-[8px] tracking-[0.15em] text-stone-500 uppercase mb-3 font-medium">What's Included</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            "Design consultation",
            "3D renderings",
            "Premium materials",
            "Licensed crew",
            "Permit handling",
            "2-year warranty",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-amber-600" />
              </div>
              <span className="text-[8px] text-stone-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="px-5 py-3 bg-stone-100/50 flex justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-stone-500" />
          <div>
            <p className="text-[8px] font-medium text-stone-800">On-Time</p>
            <p className="text-[6px] text-stone-500">Guaranteed</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-stone-500" />
          <div>
            <p className="text-[8px] font-medium text-stone-800">Insured</p>
            <p className="text-[6px] text-stone-500">Full coverage</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <div>
            <p className="text-[8px] font-medium text-stone-800">5.0 Stars</p>
            <p className="text-[6px] text-stone-500">87 reviews</p>
          </div>
        </div>
      </div>

      {/* Review Preview */}
      <div className="px-5 py-4 border-b border-stone-100">
        <div className="p-3 bg-white rounded-lg border border-stone-200">
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2 h-2 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-[8px] text-stone-600 italic leading-relaxed mb-2">
            "Our kitchen went from dated to magazine-worthy. The attention to detail was incredible."
          </p>
          <p className="text-[7px] text-stone-400 font-medium">David & Lisa R.</p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Book Now CTA */}
      <div className="sticky bottom-0 bg-white border-t border-stone-200 px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onBookNow}
          type="button"
          className="w-full py-3 bg-stone-900 text-white rounded-lg text-[9px] font-semibold uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors"
        >
          Request Free Estimate
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.button>
        <p className="text-[7px] text-stone-400 text-center mt-2">No obligation consultation</p>
      </div>
    </motion.div>
  );
};