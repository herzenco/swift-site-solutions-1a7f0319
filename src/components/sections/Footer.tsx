export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background" role="contentinfo">
      <div className="container-tight px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Xyren by Herzen Co.
          </p>
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-8">
              <li>
                <a 
                  href="#portfolio" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm focus-visible:text-foreground"
                >
                  Work
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm focus-visible:text-foreground"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm focus-visible:text-foreground"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};
