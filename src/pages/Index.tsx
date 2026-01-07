import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HowWeThink } from "@/components/sections/HowWeThink";
import { Tools } from "@/components/sections/Tools";
import { Portfolio } from "@/components/sections/Portfolio";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SEO } from "@/components/SEO";
import { SkipToContent } from "@/components/SkipToContent";
import { usePageTracking } from "@/hooks/usePageTracking";

const Index = () => {
  usePageTracking();
  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden bg-background lg:snap-y lg:snap-mandatory">
      <SEO 
        canonical="/"
        title="Custom Websites for Service Professionals"
        description="Websites that capture leads and book appointments automatically. Built for service professionals who want more clients without more admin. Delivered in 5-10 days."
        keywords="custom website, lead capture, appointment booking, service business website, AI website, web design agency"
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
    </div>
  );
};

export default Index;
