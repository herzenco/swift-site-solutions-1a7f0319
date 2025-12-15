import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Video, ArrowRight, Download } from "lucide-react";

interface SessionConfirmationScreenProps {
  onViewDashboard: () => void;
}

export const SessionConfirmationScreen = ({ onViewDashboard }: SessionConfirmationScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-white overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Success Header */}
      <div className="bg-violet-600 px-5 py-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle2 className="w-10 h-10 text-violet-600" />
        </motion.div>
        <h1 className="text-[16px] font-semibold text-white mb-2">You're All Set!</h1>
        <p className="text-[10px] text-violet-100">
          Your discovery call has been scheduled
        </p>
      </div>

      {/* Confirmation Details */}
      <div className="px-5 py-5 border-b border-gray-100">
        <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase mb-4 font-semibold">Session Details</p>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-gray-500">Date</span>
            <span className="text-[9px] font-medium text-gray-900">Tuesday, Dec 17, 2024</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-gray-500">Time</span>
            <span className="text-[9px] font-medium text-gray-900">10:00 AM PT</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-gray-500">Duration</span>
            <span className="text-[9px] font-medium text-gray-900">30 minutes</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-gray-500">Format</span>
            <span className="text-[9px] font-medium text-violet-600">Zoom Video Call</span>
          </div>
        </div>
      </div>

      {/* What to Expect */}
      <div className="px-5 py-5 border-b border-gray-100">
        <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase mb-4 font-semibold">What to Expect</p>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
              <Calendar className="w-3 h-3 text-violet-600" />
            </div>
            <div>
              <p className="text-[9px] font-medium text-gray-900 mb-0.5">Calendar Invite Sent</p>
              <p className="text-[8px] text-gray-500">Check your email for the Zoom link</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
              <Video className="w-3 h-3 text-violet-600" />
            </div>
            <div>
              <p className="text-[9px] font-medium text-gray-900 mb-0.5">Come as You Are</p>
              <p className="text-[8px] text-gray-500">Just bring your questions and goals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preparation */}
      <div className="px-5 py-5 bg-violet-50">
        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-violet-100">
          <div>
            <p className="text-[9px] font-medium text-gray-900">Pre-Session Worksheet</p>
            <p className="text-[8px] text-gray-500">Optional: clarify your goals</p>
          </div>
          <button className="flex items-center gap-1 text-[9px] font-medium text-violet-600">
            <Download className="w-3 h-3" />
            Download
          </button>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Coach Dashboard Preview */}
      <div className="px-5 py-5 border-t border-gray-100">
        <p className="text-[8px] text-center text-gray-500 mb-3">
          See how Dr. Chen manages her coaching practice
        </p>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onViewDashboard}
          type="button"
          className="w-full py-3 bg-gray-900 text-white rounded-lg text-[10px] font-semibold uppercase tracking-wide flex items-center justify-center gap-2"
        >
          View Coach Dashboard
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </motion.div>
  );
};
