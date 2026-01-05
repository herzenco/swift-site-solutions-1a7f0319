import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, BookOpen, Lightbulb, HelpCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const resourceLinks = [
  { title: "How-To Guides", href: "/resources/how-to", icon: BookOpen },
  { title: "Blog", href: "/resources/blog", icon: Lightbulb },
  { title: "FAQ", href: "/resources/faq", icon: HelpCircle },
];

export const Navbar = () => {
  const [resourcesOpen, setResourcesOpen] = useState(false);

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
            
            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <Link 
                to="/resources" 
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-48 py-2 bg-card border border-border rounded-xl shadow-xl z-50"
                  >
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      >
                        <link.icon className="w-4 h-4" />
                        {link.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};