import { motion } from "framer-motion";
import { RefreshCw, Calendar, DollarSign, Clock, User, Video, Bell } from "lucide-react";

interface CoachDashboardScreenProps {
  onReset: () => void;
}

const upcomingSessions = [
  { 
    name: "Sarah Johnson", 
    type: "Discovery Call", 
    time: "10:00 AM", 
    status: "new",
    program: null
  },
  { 
    name: "Michael Chen", 
    type: "Coaching Session", 
    time: "2:00 PM", 
    status: "confirmed",
    program: "Executive Presence"
  },
  { 
    name: "Amanda Williams", 
    type: "Coaching Session", 
    time: "4:00 PM", 
    status: "confirmed",
    program: "Career Transition"
  },
];

export const CoachDashboardScreen = ({ onReset }: CoachDashboardScreenProps) => {
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
      <div className="sticky top-0 bg-violet-900 px-4 py-4 z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[8px] text-violet-300 uppercase tracking-wider">Coach Dashboard</p>
            <h1 className="text-[14px] font-semibold text-white">Dr. Sarah Chen</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-violet-800 flex items-center justify-center">
            <User className="w-4 h-4 text-violet-300" />
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-violet-800/50 rounded-lg p-2 text-center">
            <p className="text-[14px] font-bold text-white">3</p>
            <p className="text-[7px] text-violet-300 uppercase">Today</p>
          </div>
          <div className="bg-violet-800/50 rounded-lg p-2 text-center">
            <p className="text-[14px] font-bold text-white">12</p>
            <p className="text-[7px] text-violet-300 uppercase">This Week</p>
          </div>
          <div className="bg-violet-800/50 rounded-lg p-2 text-center">
            <p className="text-[14px] font-bold text-white">$8.2k</p>
            <p className="text-[7px] text-violet-300 uppercase">Revenue</p>
          </div>
        </div>
      </div>

      {/* New Booking Alert */}
      <div className="mx-4 mt-4 p-3 bg-violet-50 border border-violet-200 rounded-xl">
        <div className="flex items-start gap-2">
          <Bell className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-[9px] font-semibold text-violet-800">New Discovery Call Booked</p>
            <p className="text-[8px] text-violet-600">Sarah Johnson - Interested in Executive Presence</p>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 bg-violet-600 text-white rounded text-[8px] font-medium">
                View Details
              </button>
              <button className="px-3 py-1 bg-white border border-violet-200 text-violet-600 rounded text-[8px] font-medium">
                Send Prep Email
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Sessions */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-semibold text-gray-900">Today's Sessions</p>
          <span className="text-[8px] text-gray-500">Dec 17, 2024</span>
        </div>
        
        <div className="space-y-2">
          {upcomingSessions.map((session, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-xl border ${
                session.status === 'new' 
                  ? 'bg-violet-50 border-violet-200' 
                  : 'bg-white border-gray-100'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[9px] font-semibold text-gray-900">{session.name}</p>
                  <p className="text-[8px] text-gray-500">{session.type}</p>
                </div>
                <div className="flex items-center gap-1">
                  {session.status === 'new' ? (
                    <span className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded text-[7px] font-medium uppercase">
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
                  {session.time}
                </div>
                {session.program && (
                  <>
                    <span>•</span>
                    <span>{session.program}</span>
                  </>
                )}
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
            <Calendar className="w-4 h-4 text-violet-600 mb-2" />
            <p className="text-[9px] font-medium text-gray-900">Schedule</p>
            <p className="text-[7px] text-gray-500">Manage availability</p>
          </button>
          <button className="p-3 bg-white rounded-xl border border-gray-100 text-left">
            <Video className="w-4 h-4 text-violet-600 mb-2" />
            <p className="text-[9px] font-medium text-gray-900">Start Session</p>
            <p className="text-[7px] text-gray-500">Launch Zoom</p>
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
