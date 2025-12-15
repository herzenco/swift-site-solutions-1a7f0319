import { motion } from "framer-motion";
import { ChevronRight, Wrench, Phone, Star, Clock, Shield } from "lucide-react";

interface HomeServicesHomeScreenProps {
  onViewServices: () => void;
  onBookService: () => void;
}

export const HomeServicesHomeScreen = ({ onViewServices, onBookService }: HomeServicesHomeScreenProps) => {
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
      <div className="relative min-h-[60%] flex flex-col bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900">
        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-between px-5 pt-10 pb-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Wrench className="w-4 h-4 text-emerald-300" />
              <p className="text-[8px] tracking-[0.3em] text-emerald-300 uppercase font-semibold">
                Thompson Plumbing
              </p>
            </div>
            
            <h1 className="text-[17px] font-semibold text-white leading-[1.3] mb-3">
              Fast, Reliable Plumbing You Can Trust
            </h1>
            
            <p className="text-[9px] text-emerald-200/80 leading-relaxed max-w-[90%] mx-auto">
              Serving the greater Austin area for over 15 years. Available 24/7 for emergencies.
            </p>
          </motion.div>

          {/* CTA at bottom of hero */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewServices}
            type="button"
            className="w-full py-3 font-medium rounded-lg transition-all duration-300 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 bg-white text-emerald-900"
          >
            View Our Services
            <ChevronRight className="w-3 h-3" />
          </motion.button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="px-5 py-4 bg-emerald-50 border-b border-emerald-100">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-[8px] text-emerald-800 font-medium">4.9 Rating</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-emerald-600" />
            <span className="text-[8px] text-emerald-800 font-medium">Same-Day Service</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-emerald-600" />
            <span className="text-[8px] text-emerald-800 font-medium">Licensed</span>
          </div>
        </motion.div>
      </div>

      {/* Services Preview */}
      <div className="px-5 py-5 border-b border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[7px] tracking-[0.25em] text-gray-400 uppercase mb-4 font-semibold">Our Services</p>
          
          <div className="space-y-3">
            {[
              { title: "Emergency Repairs", desc: "Burst pipes, leaks, and backups — we're on call 24/7" },
              { title: "Drain Cleaning", desc: "Professional clearing of clogs and blockages" },
              { title: "Water Heaters", desc: "Installation, repair, and maintenance" },
            ].map((service, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <p className="text-[9px] text-gray-800 font-medium mb-0.5">{service.title}</p>
                  <p className="text-[8px] text-gray-500">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="px-5 py-5 bg-emerald-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-start"
        >
          <div>
            <p className="text-[16px] font-semibold text-emerald-300">5,000+</p>
            <p className="text-[7px] tracking-[0.15em] text-emerald-400/70 uppercase">Jobs Done</p>
          </div>
          <div className="text-center">
            <p className="text-[16px] font-semibold text-emerald-300">15+</p>
            <p className="text-[7px] tracking-[0.15em] text-emerald-400/70 uppercase">Years</p>
          </div>
          <div className="text-right">
            <p className="text-[16px] font-semibold text-emerald-300">24/7</p>
            <p className="text-[7px] tracking-[0.15em] text-emerald-400/70 uppercase">Available</p>
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
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-[9px] text-gray-600 leading-[1.7] italic mb-2">
            "They came within an hour when our pipe burst at midnight. Professional, fast, and fair pricing."
          </p>
          <p className="text-[8px] text-gray-400">— Michael R., Austin</p>
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
          <h2 className="text-[12px] text-gray-900 font-semibold mb-2">
            Need a Plumber Now?
          </h2>
          <p className="text-[8px] text-gray-500 mb-4">
            Book online or call for immediate assistance.
          </p>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onBookService}
            type="button"
            className="w-full py-3 font-medium rounded-lg transition-all duration-300 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 bg-emerald-600 text-white"
          >
            <Phone className="w-3 h-3" />
            Book Service
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-1.5 text-gray-400">
          <Wrench className="w-3 h-3" />
          <span className="text-[7px] tracking-wider font-medium">Austin, TX</span>
        </div>
        <p className="text-[7px] text-gray-300 tracking-wider">
          © 2024
        </p>
      </div>
    </motion.div>
  );
};
