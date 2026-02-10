import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "17865893484";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

interface WhatsAppButtonProps {
  variant?: "floating" | "inline" | "icon";
  message?: string;
}

export const WhatsAppButton = ({ variant = "floating", message = "Hi, I'm interested in learning more about your services." }: WhatsAppButtonProps) => {
  const encodedMessage = encodeURIComponent(message);
  const fullUrl = `${WHATSAPP_URL}?text=${encodedMessage}`;

  if (variant === "icon") {
    return (
      <a
        href={fullUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 rounded-lg bg-muted/50 hover:bg-[#25D366]/20 flex items-center justify-center text-muted-foreground hover:text-[#25D366] transition-colors"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    );
  }

  if (variant === "inline") {
    return (
      <a
        href={fullUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#25D366] transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        WhatsApp
      </a>
    );
  }

  // Floating variant
  return (
    <motion.a
      href={fullUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] shadow-lg flex items-center justify-center text-white transition-colors"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  );
};
