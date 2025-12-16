import { motion } from "framer-motion";
import { RefreshCw, Calendar, DollarSign, Clock, AlertCircle, User, TrendingUp } from "lucide-react";

interface OwnerDashboardScreenProps {
  onReset: () => void;
}

const todayJobs = [
  { 
    name: "John Smith", 
    service: "Kitchen Remodel", 
    time: "Consultation", 
    status: "new",
    value: "$45K"
  },
  { 
    name: "Sarah Johnson", 
    service: "Bathroom Reno", 
    time: "2:00 PM", 
    status: "confirmed",
    value: "$22K"
  },
  { 
    name: "Mike Williams", 
    service: "Home Addition", 
    time: "4:30 PM", 
    status: "confirmed",
    value: "$75K"
  },
];

export const OwnerDashboardScreen = ({ onReset }: OwnerDashboardScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-stone-100 overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-stone-900 px-4 py-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[7px] text-stone-500 uppercase tracking-wider">Dashboard</p>
            <h1 className="text-[13px] font-semibold text-white">Mitchell Contractors</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center">
            <User className="w-4 h-4 text-stone-900" />
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-stone-800 rounded-lg p-2.5 text-center">
            <p className="text-[13px] font-bold text-white">3</p>
            <p className="text-[6px] text-stone-500 uppercase tracking-wide">This Week</p>
          </div>
          <div className="bg-stone-800 rounded-lg p-2.5 text-center">
            <p className="text-[13px] font-bold text-amber-400">1</p>
            <p className="text-[6px] text-stone-500 uppercase tracking-wide">New Lead</p>
          </div>
          <div className="bg-stone-800 rounded-lg p-2.5 text-center">
            <p className="text-[13px] font-bold text-white">$142K</p>
            <p className="text-[6px] text-stone-500 uppercase tracking-wide">Pipeline</p>
          </div>
        </div>
      </div>

      {/* New Request Alert */}
      <div className="mx-4 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
            <AlertCircle className="w-3.5 h-3.5 text-stone-900" />
          </div>
          <div className="flex-1">
            <p className="text-[9px] font-semibold text-stone-900">New Estimate Request</p>
            <p className="text-[8px] text-stone-600">John Smith — Kitchen remodel, 123 Main St</p>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1.5 bg-stone-900 text-white rounded-md text-[8px] font-medium">
                Review
              </button>
              <button className="px-3 py-1.5 bg-white border border-stone-300 text-stone-700 rounded-md text-[8px] font-medium">
                Call
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* This Week's Schedule */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-semibold text-stone-900">Upcoming Consultations</p>
          <span className="text-[8px] text-stone-500">This Week</span>
        </div>
        
        <div className="space-y-2">
          {todayJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-xl bg-white border ${
                job.status === 'new' 
                  ? 'border-amber-300' 
                  : 'border-stone-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[9px] font-semibold text-stone-900">{job.name}</p>
                  <p className="text-[8px] text-stone-500">{job.service}</p>
                </div>
                <div className="text-right">
                  {job.status === 'new' ? (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[7px] font-medium uppercase">
                      New
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-[7px] font-medium uppercase">
                      Confirmed
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between text-[8px] text-stone-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {job.time}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="font-medium text-stone-700">{job.value}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <p className="text-[10px] font-semibold text-stone-900 mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="p-3 bg-white rounded-xl border border-stone-200 text-left hover:border-amber-300 transition-colors">
            <Calendar className="w-4 h-4 text-stone-600 mb-2" />
            <p className="text-[9px] font-medium text-stone-900">Schedule</p>
            <p className="text-[7px] text-stone-500">Manage availability</p>
          </button>
          <button className="p-3 bg-white rounded-xl border border-stone-200 text-left hover:border-amber-300 transition-colors">
            <DollarSign className="w-4 h-4 text-stone-600 mb-2" />
            <p className="text-[9px] font-medium text-stone-900">Estimates</p>
            <p className="text-[7px] text-stone-500">Create & send</p>
          </button>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Reset Demo */}
      <div className="px-4 py-4 border-t border-stone-200 bg-white">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          type="button"
          className="w-full py-3 bg-stone-900 text-white rounded-xl text-[9px] font-semibold uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Restart Demo
        </motion.button>
      </div>
    </motion.div>
  );
};