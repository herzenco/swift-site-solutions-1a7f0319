import { motion } from "framer-motion";
import { RefreshCw, Clock, CheckCircle, AlertCircle, User, FileText, Phone } from "lucide-react";

interface AttorneyDashboardScreenProps {
  onReset: () => void;
}

const consultations = [
  {
    id: 1,
    name: "Michael Torres",
    type: "Personal Injury",
    time: "Tomorrow, 10:00 AM",
    status: "new",
    priority: "high"
  },
  {
    id: 2,
    name: "Sarah Chen",
    type: "Family Law",
    time: "Today, 3:00 PM",
    status: "confirmed",
    priority: "medium"
  },
  {
    id: 3,
    name: "Robert Williams",
    type: "Business Law",
    time: "Friday, 11:00 AM",
    status: "pending",
    priority: "low"
  }
];

export const AttorneyDashboardScreen = ({ onReset }: AttorneyDashboardScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-slate-50"
    >
      {/* Header */}
      <div className="bg-slate-900 px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[8px] text-slate-400 uppercase tracking-wider">Attorney Portal</p>
            <h2 className="text-sm font-semibold text-white">Consultation Queue</h2>
          </div>
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
            <span className="text-xs font-bold text-slate-900">DM</span>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-800 rounded-lg p-2 text-center">
            <p className="text-[14px] font-semibold text-amber-400">3</p>
            <p className="text-[7px] text-slate-400 uppercase">New</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-2 text-center">
            <p className="text-[14px] font-semibold text-green-400">5</p>
            <p className="text-[7px] text-slate-400 uppercase">Today</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-2 text-center">
            <p className="text-[14px] font-semibold text-white">12</p>
            <p className="text-[7px] text-slate-400 uppercase">This Week</p>
          </div>
        </div>
      </div>

      {/* Consultations List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ scrollbarWidth: 'none' }}>
        <p className="text-[9px] text-slate-500 uppercase tracking-wider font-medium px-1">Upcoming Consultations</p>
        
        {consultations.map((consultation, index) => (
          <motion.div
            key={consultation.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="bg-white rounded-xl p-3 border border-slate-200"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-900">{consultation.name}</p>
                  <div className="flex items-center gap-1">
                    <FileText className="w-2.5 h-2.5 text-slate-400" />
                    <p className="text-[8px] text-slate-500">{consultation.type}</p>
                  </div>
                </div>
              </div>
              <div className={`px-2 py-0.5 rounded-full text-[7px] uppercase font-medium ${
                consultation.status === 'new' 
                  ? 'bg-amber-100 text-amber-700' 
                  : consultation.status === 'confirmed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {consultation.status}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3 h-3" />
                <span className="text-[9px]">{consultation.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition-colors">
                  <Phone className="w-3 h-3 text-green-600" />
                </button>
                <button className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center hover:bg-amber-200 transition-colors">
                  <CheckCircle className="w-3 h-3 text-amber-600" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-3 border border-slate-200 mt-3">
          <p className="text-[9px] text-slate-500 uppercase tracking-wider font-medium mb-2">Quick Actions</p>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span className="text-[9px] text-slate-700">View All Cases</span>
            </button>
            <button className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <Clock className="w-4 h-4 text-slate-500" />
              <span className="text-[9px] text-slate-700">Pending Follow-ups</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="p-3 border-t border-slate-200 bg-white">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="w-full py-2.5 bg-slate-900 text-white font-medium rounded-xl text-xs flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Restart Demo
        </motion.button>
      </div>
    </motion.div>
  );
};
