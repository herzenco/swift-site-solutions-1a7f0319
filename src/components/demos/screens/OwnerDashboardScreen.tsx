import { motion } from "framer-motion";
import { RefreshCw, Calendar, DollarSign, Clock, CheckCircle2, AlertCircle, User } from "lucide-react";

interface OwnerDashboardScreenProps {
  onReset: () => void;
}

const todayJobs = [
  { 
    name: "John Smith", 
    service: "Emergency Repair", 
    time: "ASAP", 
    status: "new",
    address: "123 Main St"
  },
  { 
    name: "Sarah Johnson", 
    service: "Drain Cleaning", 
    time: "2:00 PM", 
    status: "confirmed",
    address: "456 Oak Ave"
  },
  { 
    name: "Mike Williams", 
    service: "Water Heater", 
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
      <div className="sticky top-0 bg-emerald-900 px-4 py-4 z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[8px] text-emerald-300 uppercase tracking-wider">Owner Dashboard</p>
            <h1 className="text-[14px] font-semibold text-white">Thompson Plumbing</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center">
            <User className="w-4 h-4 text-emerald-300" />
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-emerald-800/50 rounded-lg p-2 text-center">
            <p className="text-[14px] font-bold text-white">3</p>
            <p className="text-[7px] text-emerald-300 uppercase">Today</p>
          </div>
          <div className="bg-emerald-800/50 rounded-lg p-2 text-center">
            <p className="text-[14px] font-bold text-white">1</p>
            <p className="text-[7px] text-emerald-300 uppercase">Urgent</p>
          </div>
          <div className="bg-emerald-800/50 rounded-lg p-2 text-center">
            <p className="text-[14px] font-bold text-white">$847</p>
            <p className="text-[7px] text-emerald-300 uppercase">Est. Rev</p>
          </div>
        </div>
      </div>

      {/* New Request Alert */}
      <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-[9px] font-semibold text-red-800">New Emergency Request</p>
            <p className="text-[8px] text-red-600">John Smith - Burst pipe at 123 Main St</p>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 bg-red-600 text-white rounded text-[8px] font-medium">
                Accept
              </button>
              <button className="px-3 py-1 bg-white border border-red-200 text-red-600 rounded text-[8px] font-medium">
                Call
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-semibold text-gray-900">Today's Jobs</p>
          <span className="text-[8px] text-gray-500">Dec 15, 2024</span>
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
                  ? 'bg-red-50 border-red-200' 
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
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-[7px] font-medium uppercase">
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
            <Calendar className="w-4 h-4 text-emerald-600 mb-2" />
            <p className="text-[9px] font-medium text-gray-900">Schedule</p>
            <p className="text-[7px] text-gray-500">Manage availability</p>
          </button>
          <button className="p-3 bg-white rounded-xl border border-gray-100 text-left">
            <DollarSign className="w-4 h-4 text-emerald-600 mb-2" />
            <p className="text-[9px] font-medium text-gray-900">Invoices</p>
            <p className="text-[7px] text-gray-500">Send & track</p>
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
