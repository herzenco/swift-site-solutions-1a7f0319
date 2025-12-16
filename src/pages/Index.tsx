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
    <div className="h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-background">
      <SEO canonical="/" />
      <Navbar />
      <section className="snap-start"><Hero /></section>
      <section className="snap-start"><HowWeThink /></section>
      <section className="snap-start"><Portfolio /></section>
      <section className="snap-start"><Tools /></section>
      <section className="snap-start"><Pricing /></section>
      <section className="snap-start"><FAQ /></section>
      <section className="snap-start"><Contact /></section>
      <section className="snap-start"><Footer /></section>
    </div>
  );
};

export default Index;
