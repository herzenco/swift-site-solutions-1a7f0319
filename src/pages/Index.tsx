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

const Index = () => {
  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden bg-background lg:snap-y lg:snap-mandatory">
      <SEO canonical="/" />
      <Navbar />
      <section className="lg:snap-start"><Hero /></section>
      <section className="lg:snap-start"><HowWeThink /></section>
      <section className="lg:snap-start"><Portfolio /></section>
      <section className="lg:snap-start"><Tools /></section>
      <section className="lg:snap-start"><Pricing /></section>
      <section className="lg:snap-start"><FAQ /></section>
      <section className="lg:snap-start"><Contact /></section>
      <section className="lg:snap-start"><Footer /></section>
    </div>
  );
};

export default Index;
