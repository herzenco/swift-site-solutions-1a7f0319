import { motion } from "framer-motion";
import { ChevronRight, Briefcase, Star, ArrowRight, Award, Users, TrendingUp } from "lucide-react";

interface AdvisoryHomeScreenProps {
  onViewServices: () => void;
  onBookConsultation: () => void;
}

export const AdvisoryHomeScreen = ({ onViewServices, onBookConsultation }: AdvisoryHomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-slate-50 overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Hero Section - Premium & Executive */}
      <div className="relative min-h-[45%] flex flex-col bg-slate-900">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/30" />
        
        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-5 py-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-[1px] bg-blue-400" />
              <p className="text-[7px] tracking-[0.3em] text-blue-400 uppercase font-medium">
                Meridian Advisory
              </p>
            </div>
            
            <h1 className="text-[20px] font-light text-white leading-[1.2] mb-2 tracking-tight">
              Strategic Clarity
              <span className="block font-semibold">For What's Next</span>
            </h1>
            
            <p className="text-[9px] text-slate-400 leading-relaxed max-w-[85%]">
              Guiding business leaders through complex decisions with confidence
            </p>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 flex justify-between px-5 py-3 border-t border-white/10">
          <div>
            <p className="text-[14px] font-semibold text-white">150+</p>
            <p className="text-[6px] tracking-[0.15em] text-slate-500 uppercase">Clients</p>
          </div>
          <div className="text-center">
            <p className="text-[14px] font-semibold text-white">25</p>
            <p className="text-[6px] tracking-[0.15em] text-slate-500 uppercase">Years</p>
          </div>
          <div className="text-right">
            <p className="text-[14px] font-semibold text-white">$2B+</p>
            <p className="text-[6px] tracking-[0.15em] text-slate-500 uppercase">Guided</p>
          </div>
        </div>
      </div>

      {/* Expertise Areas - Abstract Icons */}
      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[8px] tracking-[0.2em] text-slate-500 uppercase font-medium">Advisory Focus</p>
          <button 
            onClick={onViewServices}
            className="text-[7px] text-blue-600 font-medium flex items-center gap-1"
          >
            Explore <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: TrendingUp, label: "Strategy" },
            { icon: Users, label: "Leadership" },
            { icon: Award, label: "Growth" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="relative aspect-square rounded-lg overflow-hidden bg-slate-900 flex flex-col items-center justify-center group hover:bg-slate-800 transition-colors"
            >
              <item.icon className="w-5 h-5 text-blue-400 mb-1.5" strokeWidth={1.5} />
              <p className="text-[7px] text-white font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services - Clean Cards */}
      <div className="px-5 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          {[
            { title: "Executive Strategy", desc: "High-level direction for complex decisions" },
            { title: "Operational Excellence", desc: "Streamline processes, maximize outcomes" },
            { title: "Growth & Transition", desc: "Scale, acquire, or prepare for succession" },
          ].map((service, i) => (
            <button
              key={i}
              onClick={onViewServices}
              className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors group"
            >
              <div className="text-left">
                <p className="text-[9px] text-slate-800 font-medium">{service.title}</p>
                <p className="text-[7px] text-slate-500">{service.desc}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </button>
          ))}
        </motion.div>
      </div>

      {/* Testimonial - Executive */}
      <div className="px-5 py-4 bg-white border-y border-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 text-blue-400 fill-blue-400" />
            ))}
          </div>
          <p className="text-[9px] text-slate-600 leading-[1.7] italic mb-2">
            "Brought the outside perspective we needed. Helped us navigate a challenging transition with clarity."
          </p>
          <p className="text-[8px] text-slate-400 font-medium">— Managing Partner, Private Equity</p>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="px-5 py-5 bg-slate-50 flex-1 flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] text-slate-800 font-medium mb-1 text-center">
            Ready for a strategic conversation?
          </p>
          <p className="text-[8px] text-slate-500 mb-4 text-center">
            Confidential discovery calls available
          </p>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onBookConsultation}
            type="button"
            className="w-full py-3 font-medium rounded-lg transition-all duration-300 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800"
          >
            <Briefcase className="w-3 h-3" />
            Request Discovery Call
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Briefcase className="w-3 h-3" />
          <span className="text-[7px] tracking-wider font-medium">New York · London</span>
        </div>
        <p className="text-[7px] text-slate-300 tracking-wider">
          Est. 1998
        </p>
      </div>
    </motion.div>
  );
};
