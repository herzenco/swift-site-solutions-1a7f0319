import { motion } from "framer-motion";
import { ChevronRight, Hammer, Phone, Star, ArrowRight } from "lucide-react";
import kitchenImage from "@/assets/demo-kitchen-remodel.jpg";
import bathroomImage from "@/assets/demo-bathroom-reno.jpg";
import additionImage from "@/assets/demo-home-addition.jpg";

interface HomeServicesHomeScreenProps {
  onViewServices: () => void;
  onBookService: () => void;
}

const projects = [
  { image: kitchenImage, label: "Kitchen" },
  { image: bathroomImage, label: "Bath" },
  { image: additionImage, label: "Addition" },
];

export const HomeServicesHomeScreen = ({ onViewServices, onBookService }: HomeServicesHomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-stone-50 overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Hero Section - Minimal & Modern */}
      <div className="relative min-h-[45%] flex flex-col bg-stone-900">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900/30" />
        
        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-5 py-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-[1px] bg-amber-400" />
              <p className="text-[7px] tracking-[0.3em] text-amber-400 uppercase font-medium">
                Mitchell Contractors
              </p>
            </div>
            
            <h1 className="text-[20px] font-light text-white leading-[1.2] mb-2 tracking-tight">
              Crafting Spaces
              <span className="block font-semibold">That Inspire</span>
            </h1>
            
            <p className="text-[9px] text-stone-400 leading-relaxed max-w-[85%]">
              Premium renovations and custom builds in Dallas-Fort Worth
            </p>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 flex justify-between px-5 py-3 border-t border-white/10">
          <div>
            <p className="text-[14px] font-semibold text-white">500+</p>
            <p className="text-[6px] tracking-[0.15em] text-stone-500 uppercase">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-[14px] font-semibold text-white">20</p>
            <p className="text-[6px] tracking-[0.15em] text-stone-500 uppercase">Years</p>
          </div>
          <div className="text-right">
            <p className="text-[14px] font-semibold text-white">5.0</p>
            <p className="text-[6px] tracking-[0.15em] text-stone-500 uppercase">Rating</p>
          </div>
        </div>
      </div>

      {/* Recent Work - Image Gallery */}
      <div className="px-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[8px] tracking-[0.2em] text-stone-500 uppercase font-medium">Recent Work</p>
          <button 
            onClick={onViewServices}
            className="text-[7px] text-amber-600 font-medium flex items-center gap-1"
          >
            View All <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              <img 
                src={project.image} 
                alt={project.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <p className="absolute bottom-1.5 left-2 text-[7px] text-white font-medium">{project.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services - Clean Cards */}
      <div className="px-5 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          {[
            { title: "Kitchen & Bath", desc: "Full remodels with premium finishes" },
            { title: "Home Additions", desc: "Expand your living space seamlessly" },
            { title: "Custom Builds", desc: "Ground-up construction, your vision" },
          ].map((service, i) => (
            <button
              key={i}
              onClick={onViewServices}
              className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-stone-200 hover:border-amber-300 transition-colors group"
            >
              <div className="text-left">
                <p className="text-[9px] text-stone-800 font-medium">{service.title}</p>
                <p className="text-[7px] text-stone-500">{service.desc}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-600 transition-colors" />
            </button>
          ))}
        </motion.div>
      </div>

      {/* Testimonial - Elegant */}
      <div className="px-5 py-4 bg-white border-y border-stone-100">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-[9px] text-stone-600 leading-[1.7] italic mb-2">
            "Transformed our outdated kitchen into a stunning modern space. On budget and finished early."
          </p>
          <p className="text-[8px] text-stone-400 font-medium">— Jennifer M., Dallas</p>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="px-5 py-5 bg-stone-50 flex-1 flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] text-stone-800 font-medium mb-1 text-center">
            Ready to start your project?
          </p>
          <p className="text-[8px] text-stone-500 mb-4 text-center">
            Free consultations, no obligation
          </p>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onBookService}
            type="button"
            className="w-full py-3 font-medium rounded-lg transition-all duration-300 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 bg-stone-900 text-white hover:bg-stone-800"
          >
            <Phone className="w-3 h-3" />
            Get Free Estimate
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-stone-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-1.5 text-stone-400">
          <Hammer className="w-3 h-3" />
          <span className="text-[7px] tracking-wider font-medium">Dallas-Fort Worth</span>
        </div>
        <p className="text-[7px] text-stone-300 tracking-wider">
          © 2024
        </p>
      </div>
    </motion.div>
  );
};