import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, BookOpen, Lightbulb, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const resourceLinks = [
  { title: "How-To Guides", href: "/resources/how-to", icon: BookOpen },
  { title: "Blog", href: "/resources/blog", icon: Lightbulb },
];

export const Navbar = () => {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

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
          <a href="/" aria-label="Xyren by Herzen Co. - Home" className="flex-shrink-0">
            <img src={logo} alt="Xyren by Herzen Co." className="h-10 sm:h-12 w-auto" />
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="#portfolio" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('portfolio');
              }}
            >
              Industries
            </Link>
            <Link 
              to="#pricing" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('pricing');
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

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 flex flex-col gap-1">
                <Link 
                  to="#portfolio" 
                  className="px-3 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('portfolio');
                  }}
                >
                  Industries
                </Link>
                <Link 
                  to="#pricing" 
                  className="px-3 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('pricing');
                  }}
                >
                  Packages
                </Link>
                
                {/* Mobile Resources Section */}
                <div className="border-t border-border/30 mt-2 pt-2">
                  <Link 
                    to="/resources" 
                    className="px-3 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Resources
                  </Link>
                  <div className="pl-4">
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <link.icon className="w-4 h-4" />
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};