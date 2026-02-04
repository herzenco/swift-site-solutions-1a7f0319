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
    desc: "Market positioning, competitive strategy, and critical decisions that shape your trajectory.",
    engagement: "Retainer",
  },
  {
    icon: Users,
    title: "Leadership & Alignment",
    desc: "Executive transitions, team alignment, and building leadership capacity for growth.",
    engagement: "Project",
  },
  {
    icon: Layers,
    title: "Operational Excellence",
    desc: "Process optimization, performance improvement, and sustainable execution.",
    engagement: "Project",
  },
  {
    icon: Target,
    title: "Growth & Expansion",
    desc: "Market entry, capital strategy, and scaling with intention.",
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
      className="h-full flex flex-col bg-[#faf9f7] overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-neutral-200 px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            type="button"
            className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-neutral-600" />
          </button>
          <div>
            <h1 className="text-[12px] font-semibold text-neutral-900">Our Approach</h1>
            <p className="text-[7px] text-neutral-400 tracking-wide uppercase">Blackwell Advisory</p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="px-5 py-4 border-b border-neutral-100">
        <p className="text-[9px] text-neutral-600 leading-relaxed">
          We focus on a select number of advisory areas where experience, perspective, and structured thinking create lasting value.
        </p>
      </div>

      {/* Services List */}
      <div className="flex-1 px-4 py-4">
        <div className="space-y-3">
          {services.map((service, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={onSelectService}
              type="button"
              className="w-full rounded-lg border border-neutral-200 hover:border-amber-300 bg-white overflow-hidden transition-all duration-200 text-left group"
            >
              <div className="p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                  <service.icon className="w-4 h-4 text-neutral-600" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[10px] font-semibold text-neutral-900">{service.title}</h3>
                      <p className="text-[8px] text-neutral-500 mt-0.5 leading-relaxed">{service.desc}</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-amber-500 transition-colors shrink-0 mt-0.5" />
                  </div>
                  <div className="mt-2">
                    <span className="text-[6px] font-medium text-amber-600 uppercase tracking-wider">
                      {service.engagement}
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Custom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5 p-4 bg-neutral-900 rounded-lg text-center"
        >
          <p className="text-[9px] text-white font-medium mb-1">Not sure where to start?</p>
          <p className="text-[7px] text-neutral-400 mb-3">Let's discuss your situation.</p>
          <button
            onClick={onSelectService}
            type="button"
            className="px-4 py-2 bg-white text-neutral-900 rounded text-[8px] font-semibold tracking-wide hover:bg-neutral-100 transition-colors"
          >
            Request a Conversation
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
