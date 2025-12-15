import { motion } from "framer-motion";
import { CheckCircle2, Phone, Clock, ArrowRight } from "lucide-react";

interface BookingConfirmationScreenProps {
  onViewDashboard: () => void;
}

export const BookingConfirmationScreen = ({ onViewDashboard }: BookingConfirmationScreenProps) => {
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
      <div className="bg-emerald-600 px-5 py-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </motion.div>
        <h1 className="text-[16px] font-semibold text-white mb-2">Service Request Received!</h1>
        <p className="text-[10px] text-emerald-100">
          We'll call you within 15 minutes to confirm
        </p>
      </div>

      {/* Confirmation Details */}
      <div className="px-5 py-5 border-b border-gray-100">
        <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase mb-4 font-semibold">Request Summary</p>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-gray-500">Confirmation #</span>
            <span className="text-[9px] font-medium text-gray-900">TP-2024-1847</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-gray-500">Service</span>
            <span className="text-[9px] font-medium text-gray-900">Emergency Repair</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-gray-500">Urgency</span>
            <span className="text-[9px] font-medium text-red-600">Emergency</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-gray-500">Address</span>
            <span className="text-[9px] font-medium text-gray-900">123 Main St</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="px-5 py-5 border-b border-gray-100">
        <p className="text-[8px] tracking-[0.2em] text-gray-400 uppercase mb-4 font-semibold">What Happens Next</p>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Phone className="w-3 h-3 text-emerald-600" />
            </div>
            <div>
              <p className="text-[9px] font-medium text-gray-900 mb-0.5">Confirmation Call</p>
              <p className="text-[8px] text-gray-500">We'll call within 15 minutes to confirm details</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Clock className="w-3 h-3 text-emerald-600" />
            </div>
            <div>
              <p className="text-[9px] font-medium text-gray-900 mb-0.5">Technician Dispatch</p>
              <p className="text-[8px] text-gray-500">A licensed plumber will be on the way</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-5 py-5 bg-gray-50">
        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
          <div>
            <p className="text-[9px] font-medium text-gray-900">Need immediate help?</p>
            <p className="text-[8px] text-gray-500">Call our 24/7 hotline</p>
          </div>
          <a href="tel:5125550123" className="flex items-center gap-1 text-[9px] font-medium text-emerald-600">
            <Phone className="w-3 h-3" />
            (512) 555-0123
          </a>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Owner Dashboard Preview */}
      <div className="px-5 py-5 border-t border-gray-100">
        <p className="text-[8px] text-center text-gray-500 mb-3">
          See how the business owner manages this request
        </p>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onViewDashboard}
          type="button"
          className="w-full py-3 bg-gray-900 text-white rounded-lg text-[10px] font-semibold uppercase tracking-wide flex items-center justify-center gap-2"
        >
          View Owner Dashboard
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </motion.div>
  );
};
