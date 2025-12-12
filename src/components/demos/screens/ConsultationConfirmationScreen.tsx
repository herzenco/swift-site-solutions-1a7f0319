import { motion } from "framer-motion";
import { CheckCircle, Calendar, User, FileText, ArrowRight } from "lucide-react";

interface ConsultationConfirmationScreenProps {
  onViewDashboard: () => void;
}

export const ConsultationConfirmationScreen = ({ onViewDashboard }: ConsultationConfirmationScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-white"
    >
      {/* Success Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 px-6 pt-10 pb-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-8 h-8 text-slate-900" />
        </motion.div>
        <h2 className="text-lg font-semibold text-white mb-2">Request Received</h2>
        <p className="text-[10px] text-slate-400">
          A member of our legal team will contact you shortly.
        </p>
      </div>

      {/* Confirmation Details */}
      <div className="flex-1 p-5 space-y-4 overflow-y-auto">
        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
          <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Consultation Details</h3>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <User className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500">Client</p>
              <p className="text-xs font-medium text-slate-900">Michael Torres</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500">Case Type</p>
              <p className="text-xs font-medium text-slate-900">Personal Injury</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500">Requested Time</p>
              <p className="text-xs font-medium text-slate-900">Tomorrow, 10:00 AM</p>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="border border-slate-200 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-slate-900 mb-3">What Happens Next</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[9px] text-slate-900 font-bold shrink-0">1</div>
              <p className="text-[10px] text-slate-600">Our intake team reviews your request within 2 hours</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[9px] text-slate-900 font-bold shrink-0">2</div>
              <p className="text-[10px] text-slate-600">An attorney calls to discuss your case confidentially</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-[9px] text-slate-900 font-bold shrink-0">3</div>
              <p className="text-[10px] text-slate-600">If we can help, we'll outline your options — no obligation</p>
            </div>
          </div>
        </div>

        {/* Reassurance */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
          <p className="text-[10px] text-amber-800 font-medium">Remember: Your consultation is 100% free.</p>
          <p className="text-[9px] text-amber-600">No fees unless we win your case.</p>
        </div>
      </div>

      {/* View Dashboard Button */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onViewDashboard}
          className="w-full py-3 bg-slate-900 text-white font-medium rounded-xl text-xs flex items-center justify-center gap-2"
        >
          See Attorney Dashboard
          <ArrowRight className="w-4 h-4" />
        </motion.button>
        <p className="text-[8px] text-slate-400 text-center mt-2">
          See how attorneys manage incoming consultations
        </p>
      </div>
    </motion.div>
  );
};
