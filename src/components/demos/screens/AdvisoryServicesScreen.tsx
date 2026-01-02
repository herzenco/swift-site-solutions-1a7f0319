import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, TrendingUp, Users, Layers, Target } from "lucide-react";

interface AdvisoryServicesScreenProps {
  onBack: () => void;
  onSelectService: () => void;
}

const services = [
  {
    icon: TrendingUp,
    title: "Strategic Advisory",
    desc: "Market positioning, competitive strategy, M&A",
    engagement: "Retainer",
  },
  {
    icon: Users,
    title: "Leadership Development",
    desc: "Executive coaching, team alignment, succession",
    engagement: "Project",
  },
  {
    icon: Layers,
    title: "Operational Transformation",
    desc: "Process optimization, change management",
    engagement: "Project",
  },
  {
    icon: Target,
    title: "Growth & Expansion",
    desc: "Market entry, scaling, capital strategy",
    engagement: "Retainer",
  },
];

export const AdvisoryServicesScreen = ({ onBack, onSelectService }: AdvisoryServicesScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-slate-50 overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-slate-100 px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            type="button"
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </button>
          <div>
            <h1 className="text-[12px] font-semibold text-slate-900">Advisory Services</h1>
            <p className="text-[8px] text-slate-500">Select an area to learn more</p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="flex-1 px-4 py-4">
        <div className="space-y-3">
          {services.map((service, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={onSelectService}
              type="button"
              className="w-full rounded-xl border border-slate-200 hover:border-blue-300 bg-white overflow-hidden transition-all duration-200 text-left group"
            >
              {/* Service Header */}
              <div className="p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
                  <service.icon className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[11px] font-semibold text-slate-900">{service.title}</h3>
                      <p className="text-[8px] text-slate-500 mt-0.5">{service.desc}</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0 mt-0.5" />
                  </div>
                  <div className="mt-2">
                    <span className="text-[7px] font-medium text-blue-600 uppercase tracking-wide">
                      {service.engagement} Engagement
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Custom Engagement Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 p-4 bg-slate-900 rounded-xl text-center"
        >
          <p className="text-[9px] text-white font-medium mb-1">Complex challenges require tailored solutions</p>
          <p className="text-[7px] text-slate-400 mb-3">Let's discuss your specific situation</p>
          <button
            onClick={onSelectService}
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-[8px] font-semibold uppercase tracking-wide hover:bg-blue-400 transition-colors"
          >
            Schedule Consultation
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
