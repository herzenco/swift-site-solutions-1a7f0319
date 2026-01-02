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
      className="h-full flex flex-col bg-slate-50 overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            type="button"
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </button>
          <div>
            <h1 className="text-[12px] font-semibold text-slate-900">Discovery Call Request</h1>
            <p className="text-[8px] text-slate-500">30-minute confidential conversation</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 py-5">
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          {/* Contact Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[8px] tracking-[0.15em] text-slate-500 uppercase mb-3 font-medium">Your Information</p>
            <div className="space-y-3">
              <div>
                <label className="text-[8px] text-slate-500 mb-1 block">Full Name</label>
                <input
                  type="text"
                  placeholder="Alexandra Chen"
                  className="w-full px-3 py-2.5 text-[10px] border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 bg-slate-50 text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[8px] text-slate-500 mb-1 block">Phone</label>
                  <input
                    type="tel"
                    placeholder="(212) 555-0198"
                    className="w-full px-3 py-2.5 text-[10px] border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 bg-slate-50 text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="text-[8px] text-slate-500 mb-1 block">Email</label>
                  <input
                    type="email"
                    placeholder="alex@company.com"
                    className="w-full px-3 py-2.5 text-[10px] border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 bg-slate-50 text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Company Context */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[8px] tracking-[0.15em] text-slate-500 uppercase mb-3 font-medium">Organization</p>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Company or Role"
                className="w-full pl-9 pr-3 py-2.5 text-[10px] border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 bg-slate-50 text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Scheduling */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[8px] tracking-[0.15em] text-slate-500 uppercase mb-3 font-medium">Preferred Time</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="This Week"
                  className="w-full pl-9 pr-3 py-2.5 text-[10px] border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 bg-slate-50 text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Morning"
                  className="w-full pl-9 pr-3 py-2.5 text-[10px] border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 bg-slate-50 text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Goals & Challenges */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[8px] tracking-[0.15em] text-slate-500 uppercase mb-3 font-medium">What would you like to discuss?</p>
            <textarea
              placeholder="Current challenges, goals, or decisions you're navigating..."
              rows={3}
              className="w-full px-3 py-2.5 text-[10px] border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400 bg-slate-50 resize-none text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Timeline */}
          <div>
            <p className="text-[8px] tracking-[0.15em] text-slate-500 uppercase mb-3 font-medium px-1">Decision Timeline</p>
            <div className="grid grid-cols-3 gap-2">
              {["Immediate", "1-3 Months", "Exploring"].map((level, i) => (
                <button
                  key={level}
                  type="button"
                  className={`py-2.5 rounded-lg text-[8px] font-medium border transition-all ${
                    i === 0
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
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
      <div className="sticky bottom-0 bg-white border-t border-slate-200 px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          type="button"
          className="w-full py-3 bg-slate-900 text-white rounded-lg text-[9px] font-semibold uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
        >
          Request Call
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.button>
        <p className="text-[7px] text-slate-400 text-center mt-2">We respond within one business day</p>
      </div>
    </motion.div>
  );
};
