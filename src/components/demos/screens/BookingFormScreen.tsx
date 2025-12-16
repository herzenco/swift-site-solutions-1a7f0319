import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";

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
          <div>
            <h1 className="text-[12px] font-semibold text-gray-900">Book Service</h1>
            <p className="text-[8px] text-gray-500">Fill out the form below</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 py-5">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          {/* Contact Info */}
          <div>
            <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase mb-3 font-semibold">Contact Information</p>
            <div className="space-y-3">
              <div>
                <label className="text-[9px] text-gray-600 mb-1 block">Full Name</label>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="w-full px-3 py-2.5 text-[10px] border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="text-[9px] text-gray-600 mb-1 block">Phone Number</label>
                <input
                  type="tel"
                  placeholder="(214) 555-0123"
                  className="w-full px-3 py-2.5 text-[10px] border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="text-[9px] text-gray-600 mb-1 block">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-3 py-2.5 text-[10px] border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Service Address */}
          <div>
            <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase mb-3 font-semibold">Service Address</p>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="123 Main St, Dallas, TX 75201"
                className="w-full pl-9 pr-3 py-2.5 text-[10px] border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 bg-gray-50"
              />
            </div>
          </div>

          {/* Scheduling */}
          <div>
            <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase mb-3 font-semibold">Preferred Timing</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Next Week"
                  className="w-full pl-9 pr-3 py-2.5 text-[10px] border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 bg-gray-50"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Morning"
                  className="w-full pl-9 pr-3 py-2.5 text-[10px] border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase mb-3 font-semibold">Describe Your Project</p>
            <textarea
              placeholder="Tell us about your project..."
              rows={3}
              className="w-full px-3 py-2.5 text-[10px] border border-gray-200 rounded-lg focus:outline-none focus:border-amber-400 bg-gray-50 resize-none"
            />
          </div>

          {/* Timeline */}
          <div>
            <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase mb-3 font-semibold">Project Timeline</p>
            <div className="grid grid-cols-3 gap-2">
              {["ASAP", "1-3 Months", "Flexible"].map((level, i) => (
                <button
                  key={level}
                  type="button"
                  className={`py-2 rounded-lg text-[9px] font-medium border transition-colors ${
                    i === 0
                      ? "bg-amber-50 border-amber-200 text-amber-700"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:border-amber-300"
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
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          type="button"
          className="w-full py-3 bg-amber-600 text-white rounded-lg text-[10px] font-semibold uppercase tracking-wide"
        >
          Request Estimate
        </motion.button>
        <p className="text-[7px] text-gray-400 text-center mt-2">We'll reach out within 24 hours</p>
      </div>
    </motion.div>
  );
};
