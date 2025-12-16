import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import kitchenImage from "@/assets/demo-kitchen-remodel.jpg";
import bathroomImage from "@/assets/demo-bathroom-reno.jpg";
import additionImage from "@/assets/demo-home-addition.jpg";

interface ServicesListScreenProps {
  onBack: () => void;
  onSelectService: () => void;
}

const services = [
  {
    image: kitchenImage,
    title: "Kitchen Remodels",
    desc: "Custom cabinets, countertops, layouts",
    price: "From $25K",
  },
  {
    image: bathroomImage,
    title: "Bathroom Renovations",
    desc: "Full redesigns, tile, fixtures",
    price: "From $15K",
  },
  {
    image: additionImage,
    title: "Home Additions",
    desc: "Rooms, sunrooms, second stories",
    price: "From $50K",
  },
];

export const ServicesListScreen = ({ onBack, onSelectService }: ServicesListScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-stone-50 overflow-y-auto overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-stone-100 px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            type="button"
            className="p-1.5 rounded-full hover:bg-stone-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-stone-600" />
          </button>
          <div>
            <h1 className="text-[12px] font-semibold text-stone-900">Our Services</h1>
            <p className="text-[8px] text-stone-500">Select a service to learn more</p>
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
              className="w-full rounded-xl border border-stone-200 hover:border-amber-300 bg-white overflow-hidden transition-all duration-200 text-left group"
            >
              {/* Service Image */}
              <div className="relative h-24 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                  <h3 className="text-[11px] font-semibold text-white">{service.title}</h3>
                  <span className="text-[9px] font-medium text-amber-300">{service.price}</span>
                </div>
              </div>
              
              {/* Service Info */}
              <div className="p-3 flex items-center justify-between">
                <p className="text-[8px] text-stone-500">{service.desc}</p>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-600 transition-colors" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Custom Projects Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 p-4 bg-stone-900 rounded-xl text-center"
        >
          <p className="text-[9px] text-white font-medium mb-1">Have something unique in mind?</p>
          <p className="text-[7px] text-stone-400 mb-3">We specialize in custom projects</p>
          <button
            onClick={onSelectService}
            type="button"
            className="px-4 py-2 bg-amber-500 text-stone-900 rounded-lg text-[8px] font-semibold uppercase tracking-wide hover:bg-amber-400 transition-colors"
          >
            Request Custom Quote
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};