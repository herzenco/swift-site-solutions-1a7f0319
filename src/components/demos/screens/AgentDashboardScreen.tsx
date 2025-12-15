import { motion } from "framer-motion";
import { User, MapPin, Clock, Check, X, RotateCcw } from "lucide-react";
import { useState } from "react";

interface AgentDashboardScreenProps {
  onReset: () => void;
}

export const AgentDashboardScreen = ({ onReset }: AgentDashboardScreenProps) => {
  const [status, setStatus] = useState<"pending" | "approved" | "declined">("pending");

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-gray-50"
    >
      {/* Header */}
      <div className="bg-gray-900 text-white p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-semibold">Agent Dashboard</h2>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Live</span>
          </div>
        </div>
        <p className="text-xs text-gray-400">1 new showing request</p>
      </div>

      {/* Lead Card */}
      <div className="flex-1 p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-white rounded-xl p-4 border-2 transition-colors ${
            status === "approved" 
              ? "border-green-500" 
              : status === "declined" 
              ? "border-red-300" 
              : "border-cyan-500"
          }`}
        >
          {/* Lead Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Sarah Johnson</h3>
                <p className="text-xs text-gray-500">Just now</p>
              </div>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              status === "approved" 
                ? "bg-green-100 text-green-700" 
                : status === "declined"
                ? "bg-red-100 text-red-700"
                : "bg-amber-100 text-amber-700"
            }`}>
              {status === "approved" ? "Confirmed" : status === "declined" ? "Declined" : "New"}
            </span>
          </div>

          {/* Property Info */}
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-3 h-3 text-gray-500" />
              <span className="text-xs font-medium text-gray-900">123 Oak Street</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-600">Tomorrow at 2:00 PM</span>
            </div>
          </div>

          {/* Action Buttons */}
          {status === "pending" && (
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStatus("approved")}
                className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg text-sm flex items-center justify-center gap-1"
              >
                <Check className="w-4 h-4" />
                Approve
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStatus("declined")}
                className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg text-sm flex items-center justify-center gap-1"
              >
                <X className="w-4 h-4" />
                Decline
              </motion.button>
            </div>
          )}

          {status === "approved" && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-2"
            >
              <p className="text-sm text-green-600 font-medium">
                ✓ Showing confirmed! Buyer notified.
              </p>
            </motion.div>
          )}

          {status === "declined" && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-2"
            >
              <p className="text-sm text-gray-600">
                Request declined. Buyer notified.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 grid grid-cols-3 gap-2"
        >
          <div className="bg-white rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-gray-900">12</p>
            <p className="text-[10px] text-gray-500">This Week</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-cyan-600">8</p>
            <p className="text-[10px] text-gray-500">Confirmed</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-green-600">3</p>
            <p className="text-[10px] text-gray-500">Closed</p>
          </div>
        </motion.div>
      </div>

      {/* Reset Button */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Restart Demo
        </motion.button>
      </div>
    </motion.div>
  );
};
