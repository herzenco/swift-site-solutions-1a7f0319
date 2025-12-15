import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Gavel, Clock, Shield, CheckCircle } from "lucide-react";

interface CaseEvaluationScreenProps {
  onBack: () => void;
  onRequestConsultation: () => void;
}

export const CaseEvaluationScreen = ({ onBack, onRequestConsultation }: CaseEvaluationScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-900">
        <button type="button" onClick={onBack} className="flex items-center gap-1 text-white">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-[9px] uppercase tracking-wider">Back</span>
        </button>
        <span className="text-[9px] uppercase tracking-[0.15em] text-slate-400">Personal Injury</span>
        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero */}
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 px-5 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Gavel className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-[14px] font-medium text-white" style={{ fontFamily: 'Georgia, serif' }}>
                Personal Injury Law
              </h1>
              <p className="text-[9px] text-slate-400">Fighting for the compensation you deserve</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Description */}
          <div>
            <h3 className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">What We Handle</h3>
            <p className="text-[9px] text-slate-600 leading-[1.7]">
              From car accidents to medical malpractice, we've recovered over $50 million for injured clients. Our team works on contingency — you pay nothing unless we win your case.
            </p>
          </div>

          {/* Case Types */}
          <div>
            <h3 className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Case Types</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Auto Accidents",
                "Truck Accidents",
                "Slip & Fall",
                "Medical Malpractice",
                "Wrongful Death",
                "Workplace Injuries"
              ].map((type) => (
                <div key={type} className="text-[9px] text-slate-600 flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-amber-500" />
                  {type}
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-slate-50 rounded-lg p-4 space-y-3">
            <h3 className="text-[10px] uppercase tracking-wider text-slate-400">Why Choose Us</h3>
            
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-amber-500 mt-0.5" />
              <div>
                <p className="text-[9px] font-medium text-slate-800">No Upfront Costs</p>
                <p className="text-[8px] text-slate-500">Free consultation. Pay only if we win.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-amber-500 mt-0.5" />
              <div>
                <p className="text-[9px] font-medium text-slate-800">Proven Results</p>
                <p className="text-[8px] text-slate-500">200+ cases won. $50M+ recovered.</p>
              </div>
            </div>
          </div>

          {/* Lead Attorney */}
          <div className="border border-slate-200 rounded-lg p-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&q=80"
                alt="Attorney"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-medium text-slate-900">David Mitchell, Esq.</p>
              <p className="text-[8px] text-slate-500">Lead Personal Injury Attorney</p>
              <p className="text-[8px] text-amber-600">25+ years experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-4 border-t border-slate-100">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onRequestConsultation}
          className="w-full py-3 font-medium rounded-sm transition-all duration-300 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 bg-amber-500 text-slate-900"
        >
          Get Free Case Evaluation
          <ChevronRight className="w-3 h-3" />
        </motion.button>
      </div>
    </motion.div>
  );
};
