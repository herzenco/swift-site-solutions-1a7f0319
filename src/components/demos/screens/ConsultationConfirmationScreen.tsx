import { motion } from "framer-motion";
import { CheckCircle2, Phone, Clock, Calendar, ArrowRight, Shield } from "lucide-react";

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
      className="h-full flex flex-col bg-slate-50 overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Success Header */}
      <div className="bg-slate-900 px-5 py-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-14 h-14 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle2 className="w-8 h-8 text-slate-900" />
        </motion.div>
        <h1 className="text-[15px] font-semibold text-white mb-2">Request Received</h1>
        <p className="text-[9px] text-slate-400">
          We'll reach out within one business day
        </p>
      </div>

      {/* Confirmation Details */}
      <div className="px-5 py-5">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
            <p className="text-[8px] tracking-[0.15em] text-slate-500 uppercase font-medium">Request Details</p>
          </div>
          
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-slate-500">Reference</span>
              <span className="text-[9px] font-mono font-medium text-slate-900">MA-2024-1247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-slate-500">Interest Area</span>
              <span className="text-[9px] font-medium text-slate-900">Strategic Advisory</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-slate-500">Timeline</span>
              <span className="text-[9px] font-medium text-blue-600">Immediate</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-slate-500">Call Duration</span>
              <span className="text-[9px] font-medium text-slate-900">30 minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="px-5 pb-5">
        <p className="text-[8px] tracking-[0.15em] text-slate-500 uppercase mb-3 font-medium">What Happens Next</p>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-[9px] font-medium text-slate-900 mb-0.5">Confirmation Call</p>
              <p className="text-[8px] text-slate-500">Our team will reach out to confirm timing</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <p className="text-[9px] font-medium text-slate-900 mb-0.5">Discovery Call</p>
              <p className="text-[8px] text-slate-500">30-minute conversation with a senior advisor</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <p className="text-[9px] font-medium text-slate-900 mb-0.5">Tailored Proposal</p>
              <p className="text-[8px] text-slate-500">If there's a fit, we'll outline recommended next steps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Confidentiality Note */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg border border-slate-200">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-500" />
            <div>
              <p className="text-[9px] font-medium text-slate-900">Confidential</p>
              <p className="text-[8px] text-slate-500">All conversations are protected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Advisor Dashboard Preview */}
      <div className="px-5 py-5 border-t border-slate-200 bg-white">
        <p className="text-[8px] text-center text-slate-500 mb-3">
          See how the advisor manages this inquiry
        </p>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onViewDashboard}
          type="button"
          className="w-full py-3 bg-slate-900 text-white rounded-lg text-[9px] font-semibold uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
        >
          View Advisor Dashboard
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </motion.div>
  );
};
