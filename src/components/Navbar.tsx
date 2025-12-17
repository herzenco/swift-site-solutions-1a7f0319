import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

export const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-xl border-b border-border/30 py-3"
      role="banner"
    >
      <nav className="container-tight px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-center">
          <a href="#" aria-label="Xyren by Herzen Co. - Home">
            <img src={logo} alt="Xyren by Herzen Co." className="h-12 w-auto" />
          </a>
        </div>
      </nav>
    </motion.header>
  );
};
