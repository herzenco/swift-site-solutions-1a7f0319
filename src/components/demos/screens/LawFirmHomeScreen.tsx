import { motion } from "framer-motion";
import { ChevronRight, Scale, Phone } from "lucide-react";

interface LawFirmHomeScreenProps {
  onViewPractices: () => void;
  onRequestConsultation: () => void;
}

export const LawFirmHomeScreen = ({ onViewPractices, onRequestConsultation }: LawFirmHomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-white overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Hero Section */}
      <div className="relative min-h-[65%] flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-between px-5 pt-10 pb-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Scale className="w-4 h-4 text-amber-400" />
              <p className="text-[8px] tracking-[0.3em] text-amber-400 uppercase font-semibold">
                Mitchell & Associates
              </p>
            </div>
            
            <h1 className="text-[17px] font-medium text-white leading-[1.3] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Trusted Legal Counsel for Life's Most Important Matters
            </h1>
            
            <p className="text-[9px] text-slate-400 leading-relaxed max-w-[90%] mx-auto">
              Over 25 years of experience protecting families, businesses, and individuals across California.
            </p>
          </motion.div>

          {/* CTA at bottom of hero */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewPractices}
            className="w-full py-3 font-medium rounded-sm transition-all duration-300 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 bg-amber-500 text-slate-900"
          >
            View Practice Areas
            <ChevronRight className="w-3 h-3" />
          </motion.button>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="px-5 py-6 border-t border-slate-200 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[11px] text-slate-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Why Clients Choose Us
          </h2>
          <p className="text-[9px] text-slate-600 leading-[1.7]">
            We combine decades of courtroom experience with a client-first approach. Every case receives the attention it deserves.
          </p>
        </motion.div>
      </div>

      {/* Practice Areas Preview */}
      <div className="px-5 py-5 border-t border-slate-200">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[7px] tracking-[0.25em] text-slate-400 uppercase mb-4 font-semibold">Practice Areas</p>
          
          <div className="space-y-3">
            {[
              { title: "Personal Injury", desc: "Auto accidents, slip & fall, medical malpractice" },
              { title: "Family Law", desc: "Divorce, custody, prenuptial agreements" },
              { title: "Business Law", desc: "Contracts, disputes, entity formation" },
            ].map((area, i) => (
              <div key={i}>
                <p className="text-[9px] text-slate-800 font-medium mb-0.5">{area.title}</p>
                <p className="text-[8px] text-slate-500">{area.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="px-5 py-5 border-t border-slate-200 bg-slate-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-start"
        >
          <div>
            <p className="text-[16px] font-light text-amber-400">$50M+</p>
            <p className="text-[7px] tracking-[0.15em] text-slate-400 uppercase">Recovered</p>
          </div>
          <div className="text-center">
            <p className="text-[16px] font-light text-amber-400">500+</p>
            <p className="text-[7px] tracking-[0.15em] text-slate-400 uppercase">Cases Won</p>
          </div>
          <div className="text-right">
            <p className="text-[16px] font-light text-amber-400">25+</p>
            <p className="text-[7px] tracking-[0.15em] text-slate-400 uppercase">Years</p>
          </div>
        </motion.div>
      </div>

      {/* Testimonial */}
      <div className="px-5 py-5 border-t border-slate-200">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[9px] text-slate-600 leading-[1.7] italic mb-2">
            "They fought for me when I had no one else. The settlement changed my life."
          </p>
          <p className="text-[8px] text-slate-400">Maria S., Personal Injury Client</p>
        </motion.div>
      </div>

      {/* Final CTA */}
      <div className="px-5 py-6 border-t border-slate-200 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-[12px] text-slate-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Free Case Evaluation
          </h2>
          <p className="text-[8px] text-slate-500 mb-4">
            No fees unless we win. Speak with an attorney today.
          </p>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onRequestConsultation}
            className="w-full py-3 font-medium rounded-sm transition-all duration-300 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 bg-slate-900 text-white"
          >
            <Phone className="w-3 h-3" />
            Request Consultation
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Scale className="w-3 h-3" />
          <span className="text-[7px] tracking-wider font-medium">Los Angeles, CA</span>
        </div>
        <p className="text-[7px] text-slate-300 tracking-wider">
          © 2024
        </p>
      </div>
    </motion.div>
  );
};
