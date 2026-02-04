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
      className="h-full flex flex-col bg-[#faf9f7] overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Success Header */}
      <div className="bg-neutral-900 px-5 py-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle2 className="w-6 h-6 text-neutral-900" />
        </motion.div>
        <h1 className="text-[14px] font-semibold text-white mb-1">Request Received</h1>
        <p className="text-[8px] text-neutral-400">
          We'll be in touch within one business day
        </p>
      </div>

      {/* Confirmation Details */}
      <div className="px-5 py-4">
        <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
          <div className="px-4 py-2.5 bg-neutral-50 border-b border-neutral-100">
            <p className="text-[7px] tracking-[0.15em] text-neutral-400 uppercase font-medium">Request Summary</p>
          </div>
          
          <div className="p-4 space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-[8px] text-neutral-500">Reference</span>
              <span className="text-[8px] font-mono font-medium text-neutral-900">BA-2024-0847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[8px] text-neutral-500">Area of Interest</span>
              <span className="text-[8px] font-medium text-neutral-900">Strategic Advisory</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[8px] text-neutral-500">Timeline</span>
              <span className="text-[8px] font-medium text-amber-600">Immediate</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[8px] text-neutral-500">Call Duration</span>
              <span className="text-[8px] font-medium text-neutral-900">30 minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="px-5 pb-4">
        <p className="text-[7px] tracking-[0.15em] text-neutral-400 uppercase mb-3 font-medium">What Happens Next</p>
        
        <div className="space-y-2">
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-neutral-200">
            <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <Phone className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div>
              <p className="text-[9px] font-medium text-neutral-900">We reach out</p>
              <p className="text-[7px] text-neutral-500">To confirm timing and answer questions</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-neutral-200">
            <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
              <Calendar className="w-3.5 h-3.5 text-neutral-600" />
            </div>
            <div>
              <p className="text-[9px] font-medium text-neutral-900">Discovery call</p>
              <p className="text-[7px] text-neutral-500">30 minutes with a senior advisor</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-neutral-200">
            <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
              <Clock className="w-3.5 h-3.5 text-neutral-600" />
            </div>
            <div>
              <p className="text-[9px] font-medium text-neutral-900">Tailored recommendation</p>
              <p className="text-[7px] text-neutral-500">If there's a fit, we'll outline next steps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Confidentiality */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-2 p-3 bg-neutral-100 rounded-lg">
          <Shield className="w-4 h-4 text-neutral-500" />
          <p className="text-[8px] text-neutral-600">All conversations are confidential</p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Dashboard Preview CTA */}
      <div className="px-5 py-4 border-t border-neutral-200 bg-white">
        <p className="text-[7px] text-center text-neutral-400 mb-3 uppercase tracking-wide">
          See the advisor's view
        </p>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onViewDashboard}
          type="button"
          className="w-full py-3 bg-neutral-900 text-white rounded text-[9px] font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
        >
          View Dashboard
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </motion.div>
  );
};
