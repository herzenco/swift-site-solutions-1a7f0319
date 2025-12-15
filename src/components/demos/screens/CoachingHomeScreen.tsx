import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Calendar, Star, Award, Users } from "lucide-react";

interface CoachingHomeScreenProps {
  onViewPrograms: () => void;
  onBookSession: () => void;
}

export const CoachingHomeScreen = ({ onViewPrograms, onBookSession }: CoachingHomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-white overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Hero Section */}
      <div className="relative min-h-[62%] flex flex-col bg-gradient-to-b from-violet-900 via-violet-800 to-violet-900">
        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-between px-5 pt-10 pb-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-violet-300" />
              <p className="text-[8px] tracking-[0.3em] text-violet-300 uppercase font-semibold">
                Dr. Sarah Chen
              </p>
            </div>
            
            <h1 className="text-[17px] font-medium text-white leading-[1.3] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Transform Your Life Through Intentional Growth
            </h1>
            
            <p className="text-[9px] text-violet-200/80 leading-relaxed max-w-[90%] mx-auto">
              Executive coach & leadership consultant helping high-achievers unlock their full potential.
            </p>
          </motion.div>

          {/* CTA at bottom of hero */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewPrograms}
            type="button"
            className="w-full py-3 font-medium rounded-lg transition-all duration-300 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 bg-white text-violet-900"
          >
            Explore Programs
            <ChevronRight className="w-3 h-3" />
          </motion.button>
        </div>
      </div>

      {/* Credentials */}
      <div className="px-5 py-4 bg-violet-50 border-b border-violet-100">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-1.5">
            <Award className="w-3 h-3 text-violet-600" />
            <span className="text-[8px] text-violet-800 font-medium">ICF Certified</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3 h-3 text-violet-600" />
            <span className="text-[8px] text-violet-800 font-medium">500+ Clients</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-[8px] text-violet-800 font-medium">4.9 Rating</span>
          </div>
        </motion.div>
      </div>

      {/* Programs Preview */}
      <div className="px-5 py-5 border-b border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[7px] tracking-[0.25em] text-gray-400 uppercase mb-4 font-semibold">Coaching Programs</p>
          
          <div className="space-y-3">
            {[
              { title: "Executive Presence", desc: "Lead with confidence and authenticity" },
              { title: "Career Transition", desc: "Navigate change with clarity and purpose" },
              { title: "Work-Life Integration", desc: "Achieve sustainable high performance" },
            ].map((program, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                <div>
                  <p className="text-[9px] text-gray-800 font-medium mb-0.5">{program.title}</p>
                  <p className="text-[8px] text-gray-500">{program.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="px-5 py-5 bg-violet-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-start"
        >
          <div>
            <p className="text-[16px] font-light text-violet-300">15+</p>
            <p className="text-[7px] tracking-[0.15em] text-violet-400/70 uppercase">Years</p>
          </div>
          <div className="text-center">
            <p className="text-[16px] font-light text-violet-300">500+</p>
            <p className="text-[7px] tracking-[0.15em] text-violet-400/70 uppercase">Clients</p>
          </div>
          <div className="text-right">
            <p className="text-[16px] font-light text-violet-300">50+</p>
            <p className="text-[7px] tracking-[0.15em] text-violet-400/70 uppercase">Companies</p>
          </div>
        </motion.div>
      </div>

      {/* Testimonial */}
      <div className="px-5 py-5 border-b border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[9px] text-gray-600 leading-[1.7] italic mb-2">
            "Working with Dr. Chen transformed not just my career, but how I show up in every area of my life. Her insights are profound."
          </p>
          <p className="text-[8px] text-gray-400">David K., CEO</p>
        </motion.div>
      </div>

      {/* Final CTA */}
      <div className="px-5 py-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-[12px] text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Free Discovery Call
          </h2>
          <p className="text-[8px] text-gray-500 mb-4">
            30 minutes to explore your goals and see if we're a fit.
          </p>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onBookSession}
            type="button"
            className="w-full py-3 font-medium rounded-lg transition-all duration-300 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 bg-violet-600 text-white"
          >
            <Calendar className="w-3 h-3" />
            Book Your Session
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-1.5 text-gray-400">
          <Sparkles className="w-3 h-3" />
          <span className="text-[7px] tracking-wider font-medium">San Francisco, CA</span>
        </div>
        <p className="text-[7px] text-gray-300 tracking-wider">
          © 2024
        </p>
      </div>
    </motion.div>
  );
};
