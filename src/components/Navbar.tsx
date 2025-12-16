import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-xl border-b border-border/30 py-3"
    >
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <a href="#">
            <img src={logo} alt="Xyren by Herzen Co." className="h-12 w-auto" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
};
