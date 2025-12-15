import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, Heart, Compass, Zap, ChevronRight } from "lucide-react";

interface ProgramsListScreenProps {
  onBack: () => void;
  onSelectProgram: () => void;
}

const programs = [
  {
    icon: Briefcase,
    title: "Executive Presence",
    desc: "Lead with confidence & influence",
    duration: "12 weeks",
  },
  {
    icon: Compass,
    title: "Career Transition",
    desc: "Navigate change with clarity",
    duration: "8 weeks",
  },
  {
    icon: Heart,
    title: "Work-Life Integration",
    desc: "Sustainable high performance",
    duration: "10 weeks",
  },
  {
    icon: Zap,
    title: "Leadership Intensive",
    desc: "Accelerated growth program",
    duration: "6 weeks",
  },
];

export const ProgramsListScreen = ({ onBack, onSelectProgram }: ProgramsListScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-white overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            type="button"
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <div>
            <h1 className="text-[12px] font-semibold text-gray-900">Coaching Programs</h1>
            <p className="text-[8px] text-gray-500">Find your path to growth</p>
          </div>
        </div>
      </div>

      {/* Programs List */}
      <div className="flex-1 px-4 py-4">
        <div className="space-y-3">
          {programs.map((program, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={onSelectProgram}
              type="button"
              className="w-full p-4 rounded-xl border border-gray-100 hover:border-violet-200 hover:bg-violet-50/50 transition-all duration-200 text-left group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                  <program.icon className="w-5 h-5 text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[10px] font-semibold text-gray-900">{program.title}</h3>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-violet-600 transition-colors" />
                  </div>
                  <p className="text-[8px] text-gray-500 mb-2">{program.desc}</p>
                  <p className="text-[9px] font-medium text-violet-600">{program.duration}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3">
        <p className="text-[8px] text-gray-500 text-center mb-2">Not sure which program is right for you?</p>
        <button
          onClick={onSelectProgram}
          type="button"
          className="w-full py-2.5 bg-violet-600 text-white rounded-lg text-[9px] font-medium uppercase tracking-wide"
        >
          Book a Free Discovery Call
        </button>
      </div>
    </motion.div>
  );
};
