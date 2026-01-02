import { motion } from "framer-motion";
import { RefreshCw, Calendar, FileText, Clock, AlertCircle, User, TrendingUp } from "lucide-react";

interface AdvisorDashboardScreenProps {
  onReset: () => void;
}

const upcomingCalls = [
  { 
    name: "Alexandra Chen", 
    company: "Vertex Capital", 
    time: "Discovery", 
    status: "new",
    focus: "Strategy"
  },
  { 
    name: "Michael Torres", 
    company: "Helm Industries", 
    time: "2:00 PM", 
    status: "confirmed",
    focus: "Growth"
  },
  { 
    name: "Sarah Lindberg", 
    company: "Atlas Partners", 
    time: "4:30 PM", 
    status: "confirmed",
    focus: "Transition"
  },
];

export const AdvisorDashboardScreen = ({ onReset }: AdvisorDashboardScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-slate-100 overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-slate-900 px-4 py-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[7px] text-slate-500 uppercase tracking-wider">Advisory Dashboard</p>
            <h1 className="text-[13px] font-semibold text-white">Meridian Advisory</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
            <User className="w-4 h-4 text-slate-900" />
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-800 rounded-lg p-2.5 text-center">
            <p className="text-[13px] font-bold text-white">5</p>
            <p className="text-[6px] text-slate-500 uppercase tracking-wide">This Week</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-2.5 text-center">
            <p className="text-[13px] font-bold text-blue-400">1</p>
            <p className="text-[6px] text-slate-500 uppercase tracking-wide">New Inquiry</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-2.5 text-center">
            <p className="text-[13px] font-bold text-white">12</p>
            <p className="text-[6px] text-slate-500 uppercase tracking-wide">Active</p>
          </div>
        </div>
      </div>

      {/* New Inquiry Alert */}
      <div className="mx-4 mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center shrink-0">
            <AlertCircle className="w-3.5 h-3.5 text-slate-900" />
          </div>
          <div className="flex-1">
            <p className="text-[9px] font-semibold text-slate-900">New Discovery Request</p>
            <p className="text-[8px] text-slate-600">Alexandra Chen — Vertex Capital, Strategic Advisory</p>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1.5 bg-slate-900 text-white rounded-md text-[8px] font-medium">
                Review
              </button>
              <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-md text-[8px] font-medium">
                Schedule
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* This Week's Schedule */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-semibold text-slate-900">Upcoming Calls</p>
          <span className="text-[8px] text-slate-500">This Week</span>
        </div>
        
        <div className="space-y-2">
          {upcomingCalls.map((call, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-xl bg-white border ${
                call.status === 'new' 
                  ? 'border-blue-300' 
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[9px] font-semibold text-slate-900">{call.name}</p>
                  <p className="text-[8px] text-slate-500">{call.company}</p>
                </div>
                <div className="text-right">
                  {call.status === 'new' ? (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[7px] font-medium uppercase">
                      New
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[7px] font-medium uppercase">
                      Confirmed
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between text-[8px] text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {call.time}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-blue-500" />
                  <span className="font-medium text-slate-700">{call.focus}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <p className="text-[10px] font-semibold text-slate-900 mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="p-3 bg-white rounded-xl border border-slate-200 text-left hover:border-blue-300 transition-colors">
            <Calendar className="w-4 h-4 text-slate-600 mb-2" />
            <p className="text-[9px] font-medium text-slate-900">Availability</p>
            <p className="text-[7px] text-slate-500">Manage calendar</p>
          </button>
          <button className="p-3 bg-white rounded-xl border border-slate-200 text-left hover:border-blue-300 transition-colors">
            <FileText className="w-4 h-4 text-slate-600 mb-2" />
            <p className="text-[9px] font-medium text-slate-900">Proposals</p>
            <p className="text-[7px] text-slate-500">Create & send</p>
          </button>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Reset Demo */}
      <div className="px-4 py-4 border-t border-slate-200 bg-white">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          type="button"
          className="w-full py-3 bg-slate-900 text-white rounded-xl text-[9px] font-semibold uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Restart Demo
        </motion.button>
      </div>
    </motion.div>
  );
};
