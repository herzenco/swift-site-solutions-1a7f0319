import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HowWeThink } from "@/components/sections/HowWeThink";
import { Tools } from "@/components/sections/Tools";
import { Portfolio } from "@/components/sections/Portfolio";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SEOHead } from "@/components/SEOHead";
import { SkipToContent } from "@/components/SkipToContent";
import { usePageTracking } from "@/hooks/usePageTracking";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Schema.org structured data for the homepage
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.xyren.me/#organization",
  "name": "Xyren by Herzen Co.",
  "url": "https://www.xyren.me",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.xyren.me/og-image.png",
    "width": 1200,
    "height": 630
  },
  "description": "Custom websites that capture leads and book appointments automatically. Built for service professionals. Delivered in 5-10 days.",
  "email": "herzen@herzenco.co",
  "sameAs": [
    "https://linkedin.com/company/herzenco",
    "https://instagram.com/herzenco",
    "https://youtube.com/@herzenco"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "herzen@herzenco.co",
    "availableLanguage": "English"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.xyren.me/#website",
  "url": "https://www.xyren.me",
  "name": "Xyren by Herzen Co.",
  "description": "Custom websites that capture leads and book appointments automatically.",
  "publisher": {
    "@id": "https://www.xyren.me/#organization"
  }
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.xyren.me/#service",
  "name": "Xyren Web Design",
  "description": "Custom websites that capture leads and book appointments automatically. Built for service professionals.",
  "url": "https://www.xyren.me",
  "priceRange": "$150-$450/month",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "serviceType": "Web Design and Development",
  "provider": {
    "@id": "https://www.xyren.me/#organization"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Website System Packages",
    "itemListElement": [
      {
        "@type": "Offer",
        "@id": "https://www.xyren.me/#core-plan",
        "name": "Core System",
        "description": "A reliable website system with secure hosting, maintenance, conversion-focused layout, and contact forms.",
        "price": "150",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "150",
          "priceCurrency": "USD",
          "unitText": "month"
        }
      },
      {
        "@type": "Offer",
        "@id": "https://www.xyren.me/#active-plan",
        "name": "Active System",
        "description": "A system that captures leads and books automatically with AI chat, automated follow-ups, and CRM integration.",
        "price": "300",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "300",
          "priceCurrency": "USD",
          "unitText": "month"
        }
      },
      {
        "@type": "Offer",
        "@id": "https://www.xyren.me/#optimized-plan",
        "name": "Optimized System",
        "description": "A performance-focused system with ongoing monitoring, optimization, and priority support.",
        "price": "450",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "450",
          "priceCurrency": "USD",
          "unitText": "month"
        }
      }
    ]
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does it take to build a website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most projects are completed within 5-10 business days. Timelines may vary slightly based on setup requirements and integrations."
      }
    },
    {
      "@type": "Question",
      "name": "What's included in maintenance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ongoing support, bug fixes, performance optimizations, and product updates to ensure everything continues running smoothly."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need technical knowledge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Setup and configuration are handled for you. The product is designed to be intuitive and easy to use without technical expertise."
      }
    }
  ]
};

const Index = () => {
  usePageTracking();
  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden bg-background lg:snap-y lg:snap-mandatory">
      <SEOHead 
        canonical="/"
        title="Custom Websites for Service Professionals"
        description="Websites that capture leads and book appointments automatically. Built for service professionals who want more clients without more admin. Delivered in 5-10 days."
        keywords="custom website, lead capture, appointment booking, service business website, AI website, web design agency"
        schemaJson={[organizationSchema, websiteSchema, professionalServiceSchema, faqSchema]}
      />
      <SkipToContent />
      <Navbar />
      <main id="main-content" role="main" aria-label="Main content">
        <section className="lg:snap-start" aria-labelledby="hero-heading"><Hero /></section>
        <section className="lg:snap-start" aria-labelledby="how-we-think-heading"><HowWeThink /></section>
        <section className="lg:snap-start" aria-labelledby="portfolio-heading"><Portfolio /></section>
        <section className="lg:snap-start" aria-labelledby="tools-heading"><Tools /></section>
        <section className="lg:snap-start" aria-labelledby="pricing-heading"><Pricing /></section>
        <section className="lg:snap-start" aria-labelledby="faq-heading"><FAQ /></section>
        <section className="lg:snap-start" aria-labelledby="contact-heading"><Contact /></section>
      </main>
      <Footer />
      <WhatsAppButton variant="floating" />
    </div>
  );
};

export default Index;
