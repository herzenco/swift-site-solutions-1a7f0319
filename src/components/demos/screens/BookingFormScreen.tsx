import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MapPin, ChevronRight } from "lucide-react";

interface BookingFormScreenProps {
  onSubmit: () => void;
  onBack: () => void;
}

export const BookingFormScreen = ({ onSubmit, onBack }: BookingFormScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-stone-50 overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-stone-200 px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            type="button"
            className="p-1.5 rounded-full hover:bg-stone-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-stone-600" />
          </button>
          <div>
            <h1 className="text-[12px] font-semibold text-stone-900">Request Estimate</h1>
            <p className="text-[8px] text-stone-500">Free, no obligation consultation</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 py-5">
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          {/* Contact Info */}
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <p className="text-[8px] tracking-[0.15em] text-stone-500 uppercase mb-3 font-medium">Contact Information</p>
            <div className="space-y-3">
              <div>
                <label className="text-[8px] text-stone-500 mb-1 block">Full Name</label>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="w-full px-3 py-2.5 text-[10px] border border-stone-200 rounded-lg focus:outline-none focus:border-amber-400 bg-stone-50 text-stone-900 placeholder:text-stone-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[8px] text-stone-500 mb-1 block">Phone</label>
                  <input
                    type="tel"
                    placeholder="(214) 555-0123"
                    className="w-full px-3 py-2.5 text-[10px] border border-stone-200 rounded-lg focus:outline-none focus:border-amber-400 bg-stone-50 text-stone-900 placeholder:text-stone-400"
                  />
                </div>
                <div>
                  <label className="text-[8px] text-stone-500 mb-1 block">Email</label>
                  <input
                    type="email"
                    placeholder="john@email.com"
                    className="w-full px-3 py-2.5 text-[10px] border border-stone-200 rounded-lg focus:outline-none focus:border-amber-400 bg-stone-50 text-stone-900 placeholder:text-stone-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Project Address */}
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <p className="text-[8px] tracking-[0.15em] text-stone-500 uppercase mb-3 font-medium">Project Address</p>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
              <input
                type="text"
                placeholder="123 Main St, Dallas, TX 75201"
                className="w-full pl-9 pr-3 py-2.5 text-[10px] border border-stone-200 rounded-lg focus:outline-none focus:border-amber-400 bg-stone-50 text-stone-900 placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* Scheduling */}
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <p className="text-[8px] tracking-[0.15em] text-stone-500 uppercase mb-3 font-medium">Preferred Timing</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Next Week"
                  className="w-full pl-9 pr-3 py-2.5 text-[10px] border border-stone-200 rounded-lg focus:outline-none focus:border-amber-400 bg-stone-50 text-stone-900 placeholder:text-stone-400"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Morning"
                  className="w-full pl-9 pr-3 py-2.5 text-[10px] border border-stone-200 rounded-lg focus:outline-none focus:border-amber-400 bg-stone-50 text-stone-900 placeholder:text-stone-400"
                />
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <p className="text-[8px] tracking-[0.15em] text-stone-500 uppercase mb-3 font-medium">Project Details</p>
            <textarea
              placeholder="Tell us about your project vision, budget range, and any specific requirements..."
              rows={3}
              className="w-full px-3 py-2.5 text-[10px] border border-stone-200 rounded-lg focus:outline-none focus:border-amber-400 bg-stone-50 resize-none text-stone-900 placeholder:text-stone-400"
            />
          </div>

          {/* Timeline */}
          <div>
            <p className="text-[8px] tracking-[0.15em] text-stone-500 uppercase mb-3 font-medium px-1">Timeline</p>
            <div className="grid grid-cols-3 gap-2">
              {["ASAP", "1-3 Months", "Flexible"].map((level, i) => (
                <button
                  key={level}
                  type="button"
                  className={`py-2.5 rounded-lg text-[8px] font-medium border transition-all ${
                    i === 0
                      ? "bg-stone-900 border-stone-900 text-white"
                      : "bg-white border-stone-200 text-stone-600 hover:border-stone-400"
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
      <div className="sticky bottom-0 bg-white border-t border-stone-200 px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          type="button"
          className="w-full py-3 bg-stone-900 text-white rounded-lg text-[9px] font-semibold uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors"
        >
          Submit Request
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.button>
        <p className="text-[7px] text-stone-400 text-center mt-2">We'll reach out within 24 hours</p>
      </div>
    </motion.div>
  );
};