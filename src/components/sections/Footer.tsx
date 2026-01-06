import { Link } from "react-router-dom";
import { Linkedin, Instagram, Youtube, Mail, MapPin } from "lucide-react";

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/company/herzenco", icon: Linkedin },
  { name: "Instagram", href: "https://instagram.com/herzenco", icon: Instagram },
  { name: "YouTube", href: "https://youtube.com/@herzenco", icon: Youtube },
];

const footerLinks = {
  services: [
    { name: "Home Services", href: "/use-cases/home-services" },
    { name: "Professional Services", href: "/use-cases/professional-services" },
  ],
  resources: [
    { name: "How-To Guides", href: "/resources/how-to" },
    { name: "Blog", href: "/resources/blog" },
    { name: "FAQ", href: "/resources/faq" },
  ],
  company: [
    { name: "Pricing", href: "/#pricing" },
    { name: "Contact", href: "/#contact" },
  ],
};

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background" role="contentinfo">
      <div className="container-tight px-6 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-foreground">Xyren</span>
              <span className="text-sm text-muted-foreground ml-1">by Herzen Co.</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Custom websites that capture leads and book appointments automatically. Built for service professionals.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:herzen@herzenco.co" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                herzen@herzenco.co
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Remote-first, serving clients worldwide
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services navigation">
            <h3 className="text-sm font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources navigation">
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company navigation">
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Xyren by Herzen Co. All rights reserved.
            </p>
            <p className="text-muted-foreground/60 text-xs">
              Websites that work while you sleep.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

