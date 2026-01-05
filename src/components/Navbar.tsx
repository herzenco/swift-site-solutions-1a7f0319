import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
        <div className="flex items-center justify-between">
          <a href="/" aria-label="Xyren by Herzen Co. - Home">
            <img src={logo} alt="Xyren by Herzen Co." className="h-12 w-auto" />
          </a>
          
          <div className="flex items-center gap-8">
            <Link 
              to="#portfolio" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Industries
            </Link>
            <Link 
              to="#pricing" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Packages
            </Link>
            <Link 
              to="/resources" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Resources
            </Link>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};
