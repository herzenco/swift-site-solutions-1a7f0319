import { motion } from "framer-motion";
import { ArrowLeft, Check, Clock, Shield, Star, ChevronRight, TrendingUp } from "lucide-react";

interface AdvisoryDetailScreenProps {
  onBack: () => void;
  onBookNow: () => void;
}

export const AdvisoryDetailScreen = ({ onBack, onBookNow }: AdvisoryDetailScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-slate-50 overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header with Back Button */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 py-3">
        <button
          onClick={onBack}
          type="button"
          className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[35%] min-h-[140px] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-blue-400" strokeWidth={1.5} />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[8px] text-blue-400 uppercase tracking-wider font-medium mb-1">Strategic Advisory</p>
          <h1 className="text-[16px] font-semibold text-white">Executive Strategy</h1>
        </div>
      </div>

      {/* Engagement Details */}
      <div className="px-5 py-3 bg-white border-b border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-[7px] text-slate-500 uppercase tracking-wide">Engagement Type</p>
          <p className="text-[12px] font-semibold text-slate-900">Retainer Advisory</p>
        </div>
        <div className="text-right">
          <p className="text-[7px] text-slate-500">Typical Duration</p>
          <p className="text-[10px] font-medium text-blue-600">6-12 Months</p>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 py-4 border-b border-slate-100">
        <p className="text-[9px] text-slate-600 leading-relaxed">
          For leaders navigating consequential decisions. We provide an experienced outside perspective, structured frameworks, and the strategic clarity needed to move forward with confidence.
        </p>
      </div>

      {/* What's Included */}
      <div className="px-5 py-4 border-b border-slate-100">
        <p className="text-[8px] tracking-[0.15em] text-slate-500 uppercase mb-3 font-medium">Engagement Includes</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            "Strategic assessment",
            "Monthly sessions",
            "Decision frameworks",
            "Priority access",
            "Implementation support",
            "Quarterly reviews",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-blue-600" />
              </div>
              <span className="text-[8px] text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="px-5 py-3 bg-slate-100/50 flex justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          <div>
            <p className="text-[8px] font-medium text-slate-800">Responsive</p>
            <p className="text-[6px] text-slate-500">Same-day access</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-slate-500" />
          <div>
            <p className="text-[8px] font-medium text-slate-800">Confidential</p>
            <p className="text-[6px] text-slate-500">NDA protected</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
          <div>
            <p className="text-[8px] font-medium text-slate-800">Proven</p>
            <p className="text-[6px] text-slate-500">25+ years</p>
          </div>
        </div>
      </div>

      {/* Representative Outcome */}
      <div className="px-5 py-4 border-b border-slate-100">
        <p className="text-[8px] tracking-[0.15em] text-slate-500 uppercase mb-3 font-medium">Representative Outcome</p>
        <div className="p-3 bg-white rounded-lg border border-slate-200">
          <p className="text-[8px] text-slate-600 italic leading-relaxed mb-2">
            "Helped our leadership team align on a three-year growth strategy. The clarity we gained fundamentally changed how we make decisions."
          </p>
          <p className="text-[7px] text-slate-400 font-medium">CEO, Mid-Market Portfolio Company</p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Book Now CTA */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onBookNow}
          type="button"
          className="w-full py-3 bg-slate-900 text-white rounded-lg text-[9px] font-semibold uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
        >
          Request Discovery Call
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.button>
        <p className="text-[7px] text-slate-400 text-center mt-2">Confidential. No obligation.</p>
      </div>
    </motion.div>
  );
};
