import { motion } from "framer-motion";
import { CheckCircle2, Phone, Clock, Calendar, ArrowRight } from "lucide-react";

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
      className="h-full flex flex-col bg-stone-50 overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Success Header */}
      <div className="bg-stone-900 px-5 py-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-14 h-14 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle2 className="w-8 h-8 text-stone-900" />
        </motion.div>
        <h1 className="text-[15px] font-semibold text-white mb-2">Request Received</h1>
        <p className="text-[9px] text-stone-400">
          We'll be in touch within 24 hours
        </p>
      </div>

      {/* Confirmation Details */}
      <div className="px-5 py-5">
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="px-4 py-3 bg-stone-50 border-b border-stone-100">
            <p className="text-[8px] tracking-[0.15em] text-stone-500 uppercase font-medium">Request Summary</p>
          </div>
          
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-stone-500">Confirmation</span>
              <span className="text-[9px] font-mono font-medium text-stone-900">MC-2024-0847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-stone-500">Service</span>
              <span className="text-[9px] font-medium text-stone-900">Kitchen Remodel</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-stone-500">Timeline</span>
              <span className="text-[9px] font-medium text-amber-600">ASAP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-stone-500">Address</span>
              <span className="text-[9px] font-medium text-stone-900">123 Main St</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="px-5 pb-5">
        <p className="text-[8px] tracking-[0.15em] text-stone-500 uppercase mb-3 font-medium">What Happens Next</p>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-stone-200">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-[9px] font-medium text-stone-900 mb-0.5">Consultation Call</p>
              <p className="text-[8px] text-stone-500">We'll call within 24 hours to discuss your project</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-stone-200">
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-stone-600" />
            </div>
            <div>
              <p className="text-[9px] font-medium text-stone-900 mb-0.5">Site Visit</p>
              <p className="text-[8px] text-stone-500">We'll schedule a time to assess your space</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-stone-200">
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-stone-600" />
            </div>
            <div>
              <p className="text-[9px] font-medium text-stone-900 mb-0.5">Detailed Estimate</p>
              <p className="text-[8px] text-stone-500">Receive a comprehensive project proposal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
          <div>
            <p className="text-[9px] font-medium text-stone-900">Questions?</p>
            <p className="text-[8px] text-stone-500">Call us anytime</p>
          </div>
          <a href="tel:2145550123" className="flex items-center gap-1 text-[9px] font-medium text-amber-700">
            <Phone className="w-3 h-3" />
            (214) 555-0123
          </a>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Owner Dashboard Preview */}
      <div className="px-5 py-5 border-t border-stone-200 bg-white">
        <p className="text-[8px] text-center text-stone-500 mb-3">
          See how the business owner manages this request
        </p>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onViewDashboard}
          type="button"
          className="w-full py-3 bg-stone-900 text-white rounded-lg text-[9px] font-semibold uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors"
        >
          View Owner Dashboard
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </motion.div>
  );
};