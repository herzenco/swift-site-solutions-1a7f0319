import { motion } from "framer-motion";
import { ArrowLeft, Check, Clock, Shield, ChevronRight, TrendingUp } from "lucide-react";

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
      className="h-full flex flex-col bg-[#faf9f7] overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-neutral-200 px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            type="button"
            className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-neutral-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-[12px] font-semibold text-neutral-900">Strategic Advisory</h1>
            <p className="text-[7px] text-amber-600 uppercase tracking-wide font-medium">Retainer Engagement</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-neutral-600" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 py-4 border-b border-neutral-100">
        <p className="text-[9px] text-neutral-600 leading-relaxed">
          For leaders navigating consequential decisions. We provide experienced perspective, structured frameworks, and the strategic clarity needed to move forward with confidence.
        </p>
      </div>

      {/* What's Included */}
      <div className="px-5 py-4 border-b border-neutral-100">
        <p className="text-[7px] tracking-[0.15em] text-neutral-400 uppercase mb-3 font-medium">Engagement Includes</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            "Strategic assessment",
            "Monthly advisory sessions",
            "Decision frameworks",
            "Priority access",
            "Implementation guidance",
            "Quarterly reviews",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-amber-600" />
              </div>
              <span className="text-[8px] text-neutral-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="px-5 py-3 bg-neutral-100/50 flex justify-between border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-neutral-400" />
          <div>
            <p className="text-[8px] font-medium text-neutral-800">Responsive</p>
            <p className="text-[6px] text-neutral-400">Same-day access</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-neutral-400" />
          <div>
            <p className="text-[8px] font-medium text-neutral-800">Confidential</p>
            <p className="text-[6px] text-neutral-400">NDA protected</p>
          </div>
        </div>
      </div>

      {/* Typical Duration */}
      <div className="px-5 py-4 border-b border-neutral-100">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[7px] text-neutral-400 uppercase tracking-wide">Typical Duration</p>
            <p className="text-[11px] font-semibold text-neutral-900">6–12 Months</p>
          </div>
          <div className="text-right">
            <p className="text-[7px] text-neutral-400 uppercase tracking-wide">Format</p>
            <p className="text-[11px] font-semibold text-neutral-900">In-person + Virtual</p>
          </div>
        </div>
      </div>

      {/* Representative Outcome */}
      <div className="px-5 py-4">
        <p className="text-[7px] tracking-[0.15em] text-neutral-400 uppercase mb-3 font-medium">Client Perspective</p>
        <div className="p-3 bg-white rounded-lg border border-neutral-200">
          <p className="text-[8px] text-neutral-600 italic leading-relaxed mb-2">
            "Helped us align on a three-year strategy. The clarity we gained fundamentally changed how we approach decisions."
          </p>
          <p className="text-[7px] text-neutral-400 font-medium">— CEO, Mid-Market Portfolio Company</p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA */}
      <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onBookNow}
          type="button"
          className="w-full py-3 bg-neutral-900 text-white rounded text-[9px] font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
        >
          Request a Discovery Call
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.button>
        <p className="text-[7px] text-neutral-400 text-center mt-2">Confidential. No obligation.</p>
      </div>
    </motion.div>
  );
};
