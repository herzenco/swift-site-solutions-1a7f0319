import { motion } from "framer-motion";
import { CheckCircle2, Clock, Bell } from "lucide-react";

interface ConfirmationScreenProps {
  onViewAgentDashboard: () => void;
}

export const ConfirmationScreen = ({ onViewAgentDashboard }: ConfirmationScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-white"
    >
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
        >
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-gray-900 mb-2"
        >
          Request Sent!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-600 mb-6"
        >
          Your showing request for 123 Oak Street has been sent to the agent.
        </motion.p>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full bg-gray-50 rounded-xl p-4 mb-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Requested Time</p>
              <p className="text-sm font-medium text-gray-900">Tomorrow at 2:00 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <Bell className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Status</p>
              <p className="text-sm font-medium text-amber-600">Awaiting Agent Confirmation</p>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-gray-500"
        >
          You'll receive a notification once the agent responds.
        </motion.p>
      </div>

      {/* Bottom CTA */}
      <div className="p-4 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onViewAgentDashboard}
          className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors text-sm"
        >
          See Agent's View →
        </motion.button>
      </div>
    </motion.div>
  );
};
