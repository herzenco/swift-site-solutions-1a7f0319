import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Building2, ChevronRight } from "lucide-react";

interface ConsultationFormScreenProps {
  onSubmit: () => void;
  onBack: () => void;
}

export const ConsultationFormScreen = ({ onSubmit, onBack }: ConsultationFormScreenProps) => {
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
          <div>
            <h1 className="text-[12px] font-semibold text-neutral-900">Discovery Call</h1>
            <p className="text-[7px] text-neutral-400 tracking-wide uppercase">30-minute conversation</p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="px-5 py-3 border-b border-neutral-100 bg-amber-50/50">
        <p className="text-[8px] text-amber-800 leading-relaxed">
          Share a bit about your situation. We'll reach out within one business day.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 py-4">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          {/* Contact Info */}
          <div className="bg-white rounded-lg border border-neutral-200 p-4">
            <p className="text-[7px] tracking-[0.15em] text-neutral-400 uppercase mb-3 font-medium">Your Information</p>
            <div className="space-y-3">
              <div>
                <label className="text-[8px] text-neutral-500 mb-1 block">Full Name</label>
                <input
                  type="text"
                  placeholder="Alexandra Chen"
                  className="w-full px-3 py-2.5 text-[10px] border border-neutral-200 rounded focus:outline-none focus:border-amber-400 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[8px] text-neutral-500 mb-1 block">Phone</label>
                  <input
                    type="tel"
                    placeholder="(212) 555-0198"
                    className="w-full px-3 py-2.5 text-[10px] border border-neutral-200 rounded focus:outline-none focus:border-amber-400 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400"
                  />
                </div>
                <div>
                  <label className="text-[8px] text-neutral-500 mb-1 block">Email</label>
                  <input
                    type="email"
                    placeholder="alex@firm.com"
                    className="w-full px-3 py-2.5 text-[10px] border border-neutral-200 rounded focus:outline-none focus:border-amber-400 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Organization */}
          <div className="bg-white rounded-lg border border-neutral-200 p-4">
            <p className="text-[7px] tracking-[0.15em] text-neutral-400 uppercase mb-3 font-medium">Organization</p>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
              <input
                type="text"
                placeholder="Company name or role"
                className="w-full pl-9 pr-3 py-2.5 text-[10px] border border-neutral-200 rounded focus:outline-none focus:border-amber-400 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* Scheduling */}
          <div className="bg-white rounded-lg border border-neutral-200 p-4">
            <p className="text-[7px] tracking-[0.15em] text-neutral-400 uppercase mb-3 font-medium">Availability</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="This week"
                  className="w-full pl-9 pr-3 py-2.5 text-[10px] border border-neutral-200 rounded focus:outline-none focus:border-amber-400 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Mornings"
                  className="w-full pl-9 pr-3 py-2.5 text-[10px] border border-neutral-200 rounded focus:outline-none focus:border-amber-400 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400"
                />
              </div>
            </div>
          </div>

          {/* Context */}
          <div className="bg-white rounded-lg border border-neutral-200 p-4">
            <p className="text-[7px] tracking-[0.15em] text-neutral-400 uppercase mb-3 font-medium">Context</p>
            <textarea
              placeholder="What's on your mind? Goals, challenges, or decisions you're navigating..."
              rows={3}
              className="w-full px-3 py-2.5 text-[10px] border border-neutral-200 rounded focus:outline-none focus:border-amber-400 bg-neutral-50 resize-none text-neutral-900 placeholder:text-neutral-400"
            />
          </div>

          {/* Timeline */}
          <div>
            <p className="text-[7px] tracking-[0.15em] text-neutral-400 uppercase mb-2 font-medium px-1">Timeline</p>
            <div className="grid grid-cols-3 gap-2">
              {["Immediate", "1-3 Months", "Exploring"].map((level, i) => (
                <button
                  key={level}
                  type="button"
                  className={`py-2.5 rounded text-[8px] font-medium border transition-all ${
                    i === 0
                      ? "bg-neutral-900 border-neutral-900 text-white"
                      : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Submit */}
      <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          type="button"
          className="w-full py-3 bg-neutral-900 text-white rounded text-[9px] font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
        >
          Submit Request
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.button>
        <p className="text-[7px] text-neutral-400 text-center mt-2">We respond within one business day</p>
      </div>
    </motion.div>
  );
};
