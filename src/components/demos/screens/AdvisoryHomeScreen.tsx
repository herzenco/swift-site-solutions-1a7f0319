import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface AdvisoryHomeScreenProps {
  onViewServices: () => void;
  onBookConsultation: () => void;
}

export const AdvisoryHomeScreen = ({ onViewServices, onBookConsultation }: AdvisoryHomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-[#0d1117] overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Navbar */}
      <div className="px-4 py-3 flex justify-between items-center">
        <p className="text-[9px] text-white font-semibold tracking-wide">Blackwell</p>
        <div className="flex gap-4">
          <button onClick={onViewServices} className="text-[7px] text-gray-400 hover:text-white transition-colors">Services</button>
          <button onClick={onBookConsultation} className="text-[7px] text-gray-400 hover:text-white transition-colors">Contact</button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center px-5 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-[22px] font-bold text-white leading-[1.15] tracking-tight mb-3">
            Strategic clarity{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              for what's next
            </span>
          </h1>
          
          <p className="text-[9px] text-gray-400 leading-relaxed mb-6 max-w-[90%] mx-auto">
            We guide leaders through high-stakes decisions. Trusted by PE firms and family offices for 25+ years.
          </p>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onBookConsultation}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-cyan-500 text-[#0d1117] text-[8px] font-semibold rounded-lg flex items-center gap-2 mx-auto hover:opacity-90 transition-opacity"
          >
            Request a conversation <ArrowRight className="w-3 h-3" />
          </motion.button>
        </motion.div>
      </div>

      {/* What We Do */}
      <div className="px-5 py-6 border-t border-gray-800/50">
        <p className="text-[9px] text-white font-semibold mb-2">
          Advisory built for complex decisions.
        </p>
        <p className="text-[8px] text-gray-500 leading-relaxed mb-4">
          We work with leaders navigating growth, transitions, and strategic inflection points.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {["Strategy", "Growth", "Leadership", "M&A"].map((area, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              onClick={onViewServices}
              className="py-2.5 px-3 text-[8px] text-gray-300 font-medium border border-gray-700/50 rounded-lg hover:border-cyan-400/50 hover:text-white transition-all text-left"
            >
              {area}
            </motion.button>
          ))}
        </div>
        <button 
          onClick={onViewServices}
          className="mt-4 text-[8px] text-cyan-400 font-medium flex items-center gap-1 hover:gap-2 transition-all"
        >
          Explore our approach <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Who We Are */}
      <div className="px-5 py-6 border-t border-gray-800/50">
        <p className="text-[9px] text-white font-semibold mb-4">
          Decades of experience. Select clientele.
        </p>
        <div className="flex gap-8">
          <div>
            <p className="text-[18px] font-bold text-white">25+</p>
            <p className="text-[7px] text-gray-500">Years</p>
          </div>
          <div>
            <p className="text-[18px] font-bold text-white">120+</p>
            <p className="text-[7px] text-gray-500">Clients</p>
          </div>
          <div>
            <p className="text-[18px] font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">PE</p>
            <p className="text-[7px] text-gray-500">& Family</p>
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="px-5 py-6 border-t border-gray-800/50">
        <p className="text-[9px] text-white font-semibold mb-4">How we work</p>
        <div className="space-y-3">
          {[
            { num: "01", title: "Discovery", desc: "Understand your situation" },
            { num: "02", title: "Assessment", desc: "Identify priorities" },
            { num: "03", title: "Engagement", desc: "Ongoing advisory" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[8px] text-cyan-400 font-mono font-bold">{item.num}</span>
              <div>
                <p className="text-[8px] text-white font-medium">{item.title}</p>
                <p className="text-[7px] text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="px-5 py-6 border-t border-gray-800/50">
        <p className="text-[9px] text-white font-semibold mb-1">Ready for a conversation?</p>
        <p className="text-[7px] text-gray-500 mb-4">We respond within one business day.</p>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onBookConsultation}
          className="w-full py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-[#0d1117] text-[8px] font-semibold rounded-lg flex items-center justify-center gap-2"
        >
          Get in touch <ArrowRight className="w-3 h-3" />
        </motion.button>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-800/30 flex justify-between">
        <p className="text-[6px] text-gray-600 font-medium">Blackwell Advisory</p>
        <p className="text-[6px] text-gray-600">New York · London</p>
      </div>
    </motion.div>
  );
};
