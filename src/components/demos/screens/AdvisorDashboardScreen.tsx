import { motion } from "framer-motion";
import { RefreshCw, Calendar, FileText, Clock, Bell, User, TrendingUp } from "lucide-react";

interface AdvisorDashboardScreenProps {
  onReset: () => void;
}

const upcomingCalls = [
  { 
    name: "Alexandra Chen", 
    company: "Vertex Capital", 
    time: "Pending", 
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
      className="h-full flex flex-col bg-[#faf9f7] overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-neutral-900 px-4 py-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[6px] text-neutral-500 uppercase tracking-widest">Dashboard</p>
            <h1 className="text-[12px] font-semibold text-white">Blackwell Advisory</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center">
            <User className="w-4 h-4 text-neutral-900" />
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-neutral-800 rounded-lg p-2.5 text-center">
            <p className="text-[12px] font-bold text-white">5</p>
            <p className="text-[6px] text-neutral-500 uppercase tracking-wide">This Week</p>
          </div>
          <div className="bg-neutral-800 rounded-lg p-2.5 text-center">
            <p className="text-[12px] font-bold text-amber-400">1</p>
            <p className="text-[6px] text-neutral-500 uppercase tracking-wide">New</p>
          </div>
          <div className="bg-neutral-800 rounded-lg p-2.5 text-center">
            <p className="text-[12px] font-bold text-white">12</p>
            <p className="text-[6px] text-neutral-500 uppercase tracking-wide">Active</p>
          </div>
        </div>
      </div>

      {/* New Inquiry Alert */}
      <div className="mx-4 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
            <Bell className="w-3 h-3 text-neutral-900" />
          </div>
          <div className="flex-1">
            <p className="text-[9px] font-semibold text-neutral-900">New Inquiry</p>
            <p className="text-[7px] text-neutral-600">Alexandra Chen — Vertex Capital</p>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1.5 bg-neutral-900 text-white rounded text-[7px] font-medium">
                Review
              </button>
              <button className="px-3 py-1.5 bg-white border border-neutral-300 text-neutral-700 rounded text-[7px] font-medium">
                Schedule
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Calls */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] font-semibold text-neutral-900">Upcoming</p>
          <span className="text-[7px] text-neutral-400">This Week</span>
        </div>
        
        <div className="space-y-2">
          {upcomingCalls.map((call, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`p-3 rounded-lg bg-white border ${
                call.status === 'new' 
                  ? 'border-amber-300' 
                  : 'border-neutral-200'
              }`}
            >
              <div className="flex items-start justify-between mb-1.5">
                <div>
                  <p className="text-[9px] font-semibold text-neutral-900">{call.name}</p>
                  <p className="text-[7px] text-neutral-500">{call.company}</p>
                </div>
                {call.status === 'new' ? (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[6px] font-semibold uppercase">
                    New
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-[6px] font-medium uppercase">
                    Confirmed
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-[7px] text-neutral-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {call.time}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-amber-500" />
                  <span className="font-medium text-neutral-700">{call.focus}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <p className="text-[9px] font-semibold text-neutral-900 mb-2">Quick Actions</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="p-3 bg-white rounded-lg border border-neutral-200 text-left hover:border-amber-300 transition-colors">
            <Calendar className="w-4 h-4 text-neutral-500 mb-1.5" />
            <p className="text-[8px] font-medium text-neutral-900">Availability</p>
            <p className="text-[6px] text-neutral-400">Manage calendar</p>
          </button>
          <button className="p-3 bg-white rounded-lg border border-neutral-200 text-left hover:border-amber-300 transition-colors">
            <FileText className="w-4 h-4 text-neutral-500 mb-1.5" />
            <p className="text-[8px] font-medium text-neutral-900">Proposals</p>
            <p className="text-[6px] text-neutral-400">Create & send</p>
          </button>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Reset Demo */}
      <div className="px-4 py-4 border-t border-neutral-200 bg-white">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          type="button"
          className="w-full py-3 bg-neutral-900 text-white rounded text-[9px] font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Restart Demo
        </motion.button>
      </div>
    </motion.div>
  );
};
