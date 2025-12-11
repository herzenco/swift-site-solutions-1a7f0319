export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container-tight px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Velocit
          </p>
          <div className="flex items-center gap-8">
            <a href="#portfolio" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Work
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Pricing
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
