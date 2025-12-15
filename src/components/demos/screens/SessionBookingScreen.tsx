import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Globe } from "lucide-react";

interface SessionBookingScreenProps {
  onSubmit: () => void;
  onBack: () => void;
}

export const SessionBookingScreen = ({ onSubmit, onBack }: SessionBookingScreenProps) => {
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
            <h1 className="text-[12px] font-semibold text-gray-900">Book Discovery Call</h1>
            <p className="text-[8px] text-gray-500">30-minute complimentary session</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 py-5">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          {/* Contact Info */}
          <div>
            <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase mb-3 font-semibold">Your Information</p>
            <div className="space-y-3">
              <div>
                <label className="text-[9px] text-gray-600 mb-1 block">Full Name</label>
                <input
                  type="text"
                  placeholder="Sarah Johnson"
                  className="w-full px-3 py-2.5 text-[10px] border border-gray-200 rounded-lg focus:outline-none focus:border-violet-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="text-[9px] text-gray-600 mb-1 block">Email</label>
                <input
                  type="email"
                  placeholder="sarah@company.com"
                  className="w-full px-3 py-2.5 text-[10px] border border-gray-200 rounded-lg focus:outline-none focus:border-violet-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="text-[9px] text-gray-600 mb-1 block">Phone (optional)</label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="w-full px-3 py-2.5 text-[10px] border border-gray-200 rounded-lg focus:outline-none focus:border-violet-400 bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase mb-3 font-semibold">Select Date & Time</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {["Mon 16", "Tue 17", "Wed 18"].map((day, i) => (
                <button
                  key={day}
                  type="button"
                  className={`py-2.5 rounded-lg text-[9px] font-medium border transition-colors ${
                    i === 1
                      ? "bg-violet-600 border-violet-600 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:border-violet-300"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["10:00 AM", "2:00 PM", "4:00 PM"].map((time, i) => (
                <button
                  key={time}
                  type="button"
                  className={`py-2 rounded-lg text-[8px] font-medium border transition-colors ${
                    i === 0
                      ? "bg-violet-100 border-violet-300 text-violet-700"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:border-violet-300"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Timezone */}
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <Globe className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-[9px] font-medium text-gray-700">Pacific Time (PT)</p>
              <p className="text-[7px] text-gray-500">Automatically detected</p>
            </div>
          </div>

          {/* Goals */}
          <div>
            <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase mb-3 font-semibold">What brings you here?</p>
            <textarea
              placeholder="Tell me about your goals and what you're hoping to achieve..."
              rows={3}
              className="w-full px-3 py-2.5 text-[10px] border border-gray-200 rounded-lg focus:outline-none focus:border-violet-400 bg-gray-50 resize-none"
            />
          </div>

          {/* Program Interest */}
          <div>
            <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase mb-3 font-semibold">Interested In</p>
            <div className="grid grid-cols-2 gap-2">
              {["Executive Presence", "Career Transition", "Work-Life", "Not Sure Yet"].map((program, i) => (
                <button
                  key={program}
                  type="button"
                  className={`py-2 rounded-lg text-[8px] font-medium border transition-colors ${
                    i === 0
                      ? "bg-violet-100 border-violet-300 text-violet-700"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:border-violet-300"
                  }`}
                >
                  {program}
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
          className="w-full py-3 bg-violet-600 text-white rounded-lg text-[10px] font-semibold uppercase tracking-wide"
        >
          Book Discovery Call
        </motion.button>
        <p className="text-[7px] text-gray-400 text-center mt-2">You'll receive a calendar invite within minutes</p>
      </div>
    </motion.div>
  );
};
