import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HowWeThink } from "@/components/sections/HowWeThink";
import { Tools } from "@/components/sections/Tools";
import { Portfolio } from "@/components/sections/Portfolio";
import { SocialProof } from "@/components/sections/SocialProof";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SEO } from "@/components/SEO";
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO canonical="/" />
      <Navbar />
      <Hero />
      <HowWeThink />
      <Portfolio />
      <Tools />
      <Pricing />
      <SocialProof />
      <HowItWorks />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
