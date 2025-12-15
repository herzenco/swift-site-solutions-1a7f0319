import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useState } from "react";

interface RequestFormScreenProps {
  onSubmit: () => void;
  onBack: () => void;
}

export const RequestFormScreen = ({ onSubmit, onBack }: RequestFormScreenProps) => {
  const [name, setName] = useState("Sarah Johnson");
  const [selectedDate, setSelectedDate] = useState("Tomorrow");
  const [selectedTime, setSelectedTime] = useState("2:00 PM");

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-white"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <button 
          type="button"
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h2 className="text-base font-semibold text-gray-900">Request Showing</h2>
      </div>

      {/* Form */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Property</p>
          <p className="text-sm font-medium text-gray-900">123 Oak Street, Austin TX</p>
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Preferred Date</label>
          <div className="grid grid-cols-3 gap-2">
            {["Today", "Tomorrow", "Saturday"].map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                  selectedDate === date
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Calendar className="w-3 h-3" />
                {date}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Preferred Time</label>
          <div className="grid grid-cols-3 gap-2">
            {["10:00 AM", "2:00 PM", "5:00 PM"].map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                  selectedTime === time
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Clock className="w-3 h-3" />
                {time}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Message (optional)</label>
          <textarea
            placeholder="Any questions or special requests?"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-cyan-500 resize-none h-16"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-4 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-colors"
        >
          Submit Request
        </motion.button>
      </div>
    </motion.div>
  );
};
