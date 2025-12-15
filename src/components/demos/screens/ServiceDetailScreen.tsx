import { motion } from "framer-motion";
import { ArrowLeft, Droplets, Check, Clock, Shield, Star } from "lucide-react";

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
      className="h-full flex flex-col bg-white overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            type="button"
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <h1 className="text-[12px] font-semibold text-gray-900">Emergency Repairs</h1>
        </div>
      </div>

      {/* Service Hero */}
      <div className="bg-emerald-900 px-5 py-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center">
            <Droplets className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <h2 className="text-[14px] font-semibold text-white">Emergency Repairs</h2>
            <p className="text-[9px] text-emerald-300">Available 24/7</p>
          </div>
        </div>
        <p className="text-[9px] text-emerald-100/80 leading-relaxed">
          When disaster strikes, we're there. Burst pipes, major leaks, sewage backups: our emergency team responds fast to minimize damage.
        </p>
      </div>

      {/* Pricing */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-[8px] text-gray-500 uppercase tracking-wide mb-1">Starting at</p>
            <p className="text-[20px] font-bold text-gray-900">$99</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] text-gray-500">Response time</p>
            <p className="text-[10px] font-medium text-emerald-600">Under 1 hour</p>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase mb-3 font-semibold">What's Included</p>
        <div className="space-y-2.5">
          {[
            "24/7 emergency dispatch",
            "Free diagnostic assessment",
            "Upfront, transparent pricing",
            "Licensed & insured technicians",
            "90-day warranty on all repairs",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-[9px] text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <div>
              <p className="text-[9px] font-medium text-gray-900">Fast Response</p>
              <p className="text-[7px] text-gray-500">Avg. 45 min arrival</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <div>
              <p className="text-[9px] font-medium text-gray-900">Guaranteed</p>
              <p className="text-[7px] text-gray-500">Satisfaction promise</p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Preview */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
          ))}
          <span className="text-[8px] text-gray-500 ml-1">128 reviews</span>
        </div>
        <p className="text-[9px] text-gray-600 italic leading-relaxed">
          "Called at 2am with a burst pipe. They were here in 30 minutes and had it fixed within the hour. Saved our home from serious damage."
        </p>
        <p className="text-[8px] text-gray-400 mt-1">Jennifer T.</p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Book Now CTA */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onBookNow}
          type="button"
          className="w-full py-3 bg-emerald-600 text-white rounded-lg text-[10px] font-semibold uppercase tracking-wide"
        >
          Book This Service
        </motion.button>
        <p className="text-[7px] text-gray-400 text-center mt-2">No payment required to book</p>
      </div>
    </motion.div>
  );
};
