import { motion } from "framer-motion";
import { ArrowLeft, Home, Hammer, PaintBucket, HardHat, ChevronRight } from "lucide-react";

interface ServicesListScreenProps {
  onBack: () => void;
  onSelectService: () => void;
}

const services = [
  {
    icon: Home,
    title: "Kitchen Remodels",
    desc: "Custom cabinets, countertops, layouts",
    price: "From $25K",
  },
  {
    icon: PaintBucket,
    title: "Bathroom Renovations",
    desc: "Full redesigns, tile, fixtures",
    price: "From $15K",
  },
  {
    icon: Hammer,
    title: "Home Additions",
    desc: "Rooms, sunrooms, second stories",
    price: "From $50K",
  },
  {
    icon: HardHat,
    title: "New Construction",
    desc: "Custom homes, ground-up builds",
    price: "Custom Quote",
  },
];

export const ServicesListScreen = ({ onBack, onSelectService }: ServicesListScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-white overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            type="button"
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <div>
            <h1 className="text-[12px] font-semibold text-gray-900">Our Services</h1>
            <p className="text-[8px] text-gray-500">Select a service to learn more</p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="flex-1 px-4 py-4">
        <div className="space-y-3">
          {services.map((service, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={onSelectService}
              type="button"
              className="w-full p-4 rounded-xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all duration-200 text-left group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                  <service.icon className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[10px] font-semibold text-gray-900">{service.title}</h3>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                  </div>
                  <p className="text-[8px] text-gray-500 mb-2">{service.desc}</p>
                  <p className="text-[9px] font-medium text-amber-600">{service.price}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3">
        <p className="text-[8px] text-gray-500 text-center mb-2">Have a unique project in mind?</p>
        <button
          onClick={onSelectService}
          type="button"
          className="w-full py-2.5 bg-amber-600 text-white rounded-lg text-[9px] font-medium uppercase tracking-wide"
        >
          Request Custom Estimate
        </button>
      </div>
    </motion.div>
  );
};
