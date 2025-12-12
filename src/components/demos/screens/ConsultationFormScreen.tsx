import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useState } from "react";

interface ConsultationFormScreenProps {
  onSubmit: () => void;
  onBack: () => void;
}

export const ConsultationFormScreen = ({ onSubmit, onBack }: ConsultationFormScreenProps) => {
  const [name, setName] = useState("Michael Torres");
  const [selectedDate, setSelectedDate] = useState("Tomorrow");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [caseType, setCaseType] = useState("Personal Injury");

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-white"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-100 bg-slate-900">
        <button 
          type="button"
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-base font-semibold text-white">Request Consultation</h2>
      </div>

      {/* Form */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-xs text-amber-800 font-medium">Free Case Evaluation</p>
          <p className="text-[10px] text-amber-600">No obligation. 100% confidential.</p>
        </div>

        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">Case Type</label>
          <div className="grid grid-cols-2 gap-2">
            {["Personal Injury", "Family Law", "Business", "Other"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setCaseType(type)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  caseType === type
                    ? "bg-amber-500 text-slate-900"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">Preferred Date</label>
          <div className="grid grid-cols-3 gap-2">
            {["Today", "Tomorrow", "This Week"].map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                  selectedDate === date
                    ? "bg-amber-500 text-slate-900"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Calendar className="w-3 h-3" />
                {date}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">Preferred Time</label>
          <div className="grid grid-cols-3 gap-2">
            {["9:00 AM", "10:00 AM", "2:00 PM"].map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                  selectedTime === time
                    ? "bg-amber-500 text-slate-900"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Clock className="w-3 h-3" />
                {time}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-500 mb-1.5 block">Brief Description</label>
          <textarea
            placeholder="Tell us about your situation..."
            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-amber-500 resize-none h-16"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-4 border-t border-slate-100">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-xl transition-colors"
        >
          Submit Request
        </motion.button>
        <p className="text-[8px] text-slate-400 text-center mt-2">
          A member of our team will contact you within 24 hours.
        </p>
      </div>
    </motion.div>
  );
};
