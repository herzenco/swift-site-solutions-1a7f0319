import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Gavel, Users, Building2, FileText } from "lucide-react";

interface PracticeAreasScreenProps {
  onBack: () => void;
  onSelectArea: () => void;
}

const practiceAreas = [
  {
    id: 1,
    title: "Personal Injury",
    description: "Car accidents, slip & fall, wrongful death",
    icon: Gavel,
    cases: "200+ cases won"
  },
  {
    id: 2,
    title: "Family Law",
    description: "Divorce, child custody, support",
    icon: Users,
    cases: "150+ families helped"
  },
  {
    id: 3,
    title: "Business Law",
    description: "Contracts, litigation, formation",
    icon: Building2,
    cases: "100+ businesses served"
  },
  {
    id: 4,
    title: "Estate Planning",
    description: "Wills, trusts, probate",
    icon: FileText,
    cases: "75+ estates planned"
  }
];

export const PracticeAreasScreen = ({ onBack, onSelectArea }: PracticeAreasScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-white"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-slate-900">
        <button 
          type="button"
          onClick={onBack}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <div>
          <h2 className="text-[11px] font-semibold text-white">Practice Areas</h2>
          <p className="text-[8px] text-slate-400">Select an area to learn more</p>
        </div>
      </div>

      {/* Practice Areas List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: 'none' }}>
        {practiceAreas.map((area, index) => (
          <motion.div
            key={area.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSelectArea}
            className="bg-slate-50 rounded-lg overflow-hidden cursor-pointer hover:bg-slate-100 transition-colors p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                <area.icon className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[11px] font-semibold text-slate-900">{area.title}</h3>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
                <p className="text-[9px] text-slate-500 mb-2">{area.description}</p>
                <p className="text-[8px] text-amber-600 font-medium">{area.cases}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
        <p className="text-[8px] text-slate-500 text-center">
          Not sure which area applies? We'll help you figure it out.
        </p>
      </div>
    </motion.div>
  );
};
