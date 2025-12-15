import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, Check, Clock, Video, Star } from "lucide-react";

interface ProgramDetailScreenProps {
  onBack: () => void;
  onEnroll: () => void;
}

export const ProgramDetailScreen = ({ onBack, onEnroll }: ProgramDetailScreenProps) => {
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
          <h1 className="text-[12px] font-semibold text-gray-900">Executive Presence</h1>
        </div>
      </div>

      {/* Program Hero */}
      <div className="bg-violet-900 px-5 py-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-violet-800 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-violet-300" />
          </div>
          <div>
            <h2 className="text-[14px] font-semibold text-white">Executive Presence</h2>
            <p className="text-[9px] text-violet-300">12-Week Intensive Program</p>
          </div>
        </div>
        <p className="text-[9px] text-violet-100/80 leading-relaxed">
          Develop the commanding presence and authentic leadership style that inspires teams and drives results. Perfect for senior leaders and rising executives.
        </p>
      </div>

      {/* Program Format */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-[8px] text-gray-500 uppercase tracking-wide mb-1">Investment</p>
            <p className="text-[20px] font-bold text-gray-900">$4,500</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] text-gray-500">Format</p>
            <p className="text-[10px] font-medium text-violet-600">1:1 + Group</p>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase mb-3 font-semibold">What's Included</p>
        <div className="space-y-2.5">
          {[
            "12 weekly 1:1 coaching sessions (60 min)",
            "Bi-weekly group mastermind calls",
            "Personalized leadership assessment",
            "360° feedback integration",
            "Unlimited email/voice support",
            "Lifetime access to program materials",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check className="w-3 h-3 text-violet-500" />
              <span className="text-[9px] text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Session Details */}
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-violet-600" />
            <div>
              <p className="text-[9px] font-medium text-gray-900">Virtual Sessions</p>
              <p className="text-[7px] text-gray-500">Zoom or in-person</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-violet-600" />
            <div>
              <p className="text-[9px] font-medium text-gray-900">Flexible Timing</p>
              <p className="text-[7px] text-gray-500">Evenings available</p>
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
          <span className="text-[8px] text-gray-500 ml-1">47 graduates</span>
        </div>
        <p className="text-[9px] text-gray-600 italic leading-relaxed">
          "This program gave me the tools and confidence to step into my CEO role. Sarah's coaching is transformative."
        </p>
        <p className="text-[8px] text-gray-400 mt-1">Amanda R., CEO</p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Enroll CTA */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onEnroll}
          type="button"
          className="w-full py-3 bg-violet-600 text-white rounded-lg text-[10px] font-semibold uppercase tracking-wide"
        >
          Apply for This Program
        </motion.button>
        <p className="text-[7px] text-gray-400 text-center mt-2">Free discovery call first, no commitment</p>
      </div>
    </motion.div>
  );
};
