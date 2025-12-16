import { motion } from "framer-motion";
import { RefreshCw, Calendar, DollarSign, Clock, CheckCircle2, AlertCircle, User } from "lucide-react";

interface OwnerDashboardScreenProps {
  onReset: () => void;
}

const todayJobs = [
  { 
    name: "John Smith", 
    service: "Kitchen Remodel", 
    time: "Consultation", 
    status: "new",
    address: "123 Main St"
  },
  { 
    name: "Sarah Johnson", 
    service: "Bathroom Reno", 
    time: "2:00 PM", 
    status: "confirmed",
    address: "456 Oak Ave"
  },
  { 
    name: "Mike Williams", 
    service: "Home Addition", 
    time: "4:30 PM", 
    status: "confirmed",
    address: "789 Pine Rd"
  },
];

export const OwnerDashboardScreen = ({ onReset }: OwnerDashboardScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-gray-50 overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-amber-900 px-4 py-4 z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[8px] text-amber-300 uppercase tracking-wider">Owner Dashboard</p>
            <h1 className="text-[14px] font-semibold text-white">Mitchell Contractors</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center">
            <User className="w-4 h-4 text-amber-300" />
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-amber-800/50 rounded-lg p-2 text-center">
            <p className="text-[14px] font-bold text-white">3</p>
            <p className="text-[7px] text-amber-300 uppercase">This Week</p>
          </div>
          <div className="bg-amber-800/50 rounded-lg p-2 text-center">
            <p className="text-[14px] font-bold text-white">1</p>
            <p className="text-[7px] text-amber-300 uppercase">New Lead</p>
          </div>
          <div className="bg-amber-800/50 rounded-lg p-2 text-center">
            <p className="text-[14px] font-bold text-white">$85K</p>
            <p className="text-[7px] text-amber-300 uppercase">Pipeline</p>
          </div>
        </div>
      </div>

      {/* New Request Alert */}
      <div className="mx-4 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-[9px] font-semibold text-amber-800">New Estimate Request</p>
            <p className="text-[8px] text-amber-600">John Smith - Kitchen remodel at 123 Main St</p>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 bg-amber-600 text-white rounded text-[8px] font-medium">
                Review
              </button>
              <button className="px-3 py-1 bg-white border border-amber-200 text-amber-600 rounded text-[8px] font-medium">
                Call
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* This Week's Schedule */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-semibold text-gray-900">Upcoming Consultations</p>
          <span className="text-[8px] text-gray-500">This Week</span>
        </div>
        
        <div className="space-y-2">
          {todayJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-xl border ${
                job.status === 'new' 
                  ? 'bg-amber-50 border-amber-200' 
                  : 'bg-white border-gray-100'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[9px] font-semibold text-gray-900">{job.name}</p>
                  <p className="text-[8px] text-gray-500">{job.service}</p>
                </div>
                <div className="flex items-center gap-1">
                  {job.status === 'new' ? (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[7px] font-medium uppercase">
                      New
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[7px] font-medium uppercase">
                      Confirmed
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 text-[8px] text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {job.time}
                </div>
                <span>•</span>
                <span>{job.address}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <p className="text-[10px] font-semibold text-gray-900 mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="p-3 bg-white rounded-xl border border-gray-100 text-left">
            <Calendar className="w-4 h-4 text-amber-600 mb-2" />
            <p className="text-[9px] font-medium text-gray-900">Schedule</p>
            <p className="text-[7px] text-gray-500">Manage availability</p>
          </button>
          <button className="p-3 bg-white rounded-xl border border-gray-100 text-left">
            <DollarSign className="w-4 h-4 text-amber-600 mb-2" />
            <p className="text-[9px] font-medium text-gray-900">Estimates</p>
            <p className="text-[7px] text-gray-500">Create & send</p>
          </button>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Reset Demo */}
      <div className="px-4 py-4 border-t border-gray-200">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          type="button"
          className="w-full py-3 bg-gray-900 text-white rounded-xl text-[10px] font-semibold uppercase tracking-wide flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Restart Demo
        </motion.button>
      </div>
    </motion.div>
  );
};
