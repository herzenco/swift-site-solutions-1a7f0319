import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEO } from "@/components/SEO";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Placeholder data - will be replaced with actual content
const latestHowTo = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

const latestBlog = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

const faqItems = [
  {
    id: 1,
    question: "How long does it take?",
    answer: "Most projects are completed within 5–10 business days. Timelines may vary slightly based on setup requirements and integrations, but the process is designed to be fast and repeatable.",
  },
  {
    id: 2,
    question: "What's included in maintenance?",
    answer: "Ongoing support, bug fixes, performance optimizations, and product updates to ensure everything continues running smoothly within the supported framework.",
  },
  {
    id: 3,
    question: "Can I customize the tools?",
    answer: "The tools are configurable within a predefined framework. You can adjust settings, workflows, and supported integrations, but we do not offer custom-built features or one-off development. This ensures consistency, speed, and reliability.",
  },
  {
    id: 4,
    question: "Do I need technical knowledge?",
    answer: "No. Setup and configuration are handled for you. The product is designed to be intuitive and easy to use without technical expertise.",
  },
  {
    id: 5,
    question: "Can I cancel anytime?",
    answer: "Yes. There are no long-term commitments. You can cancel at any time.",
  },
];

// Skeleton placeholder component
const SkeletonBar = ({ width = "w-3/4", height = "h-4" }: { width?: string; height?: string }) => (
  <div className={`${width} ${height} rounded bg-muted/40 animate-pulse`} />
);

const Resources = () => {
  return (
    <>
      <SEO
        title="Resources | Xyren"
        description="Clarity, education, and guidance. A knowledge hub for people evaluating or using Xyren."
      />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Clear Answers. <span className="text-gradient">Practical Guidance.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A reference for understanding the system, setting expectations, and getting the most out of your website.
            </p>
          </div>
        </section>

        {/* How-To Section - Primary Focus */}
        <section className="pb-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-semibold">How-To</h2>
              <Link 
                to="/resources/how-to" 
                className="inline-flex items-center text-sm font-medium text-primary hover:gap-2 transition-all group"
              >
                View all
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              Step-by-step guides covering the most common questions we're asked—from setup basics to understanding how the system works.
            </p>
            
            {/* Horizontal scroll container for larger cards */}
            <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
              {latestHowTo.map((item, index) => (
                <div
                  key={item.id}
                  className="group flex-shrink-0 w-[320px] md:w-[380px] p-8 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all duration-300 snap-start"
                >
                  {/* Step number */}
                  <span className="text-xs font-mono text-muted-foreground/60 tracking-widest mb-6 block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Skeleton placeholders */}
                  <div className="space-y-4">
                    <SkeletonBar width="w-4/5" height="h-5" />
                    <div className="space-y-2 pt-2">
                      <SkeletonBar width="w-full" height="h-3" />
                      <SkeletonBar width="w-2/3" height="h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section - Secondary */}
        <section className="pb-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-medium text-foreground/90">Blog</h2>
              <Link 
                to="/resources/blog" 
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
              >
                View all
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl text-sm">
              Short explanations and breakdowns that help you understand the thinking behind how Xyren is built and why certain decisions matter.
            </p>
            
            {/* Tighter grid with smaller cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {latestBlog.map((item) => (
                <div
                  key={item.id}
                  className="group p-5 rounded-xl border border-border/30 bg-card/20 hover:bg-card/40 hover:border-border/50 transition-all duration-300"
                >
                  {/* Skeleton placeholders - editorial style */}
                  <div className="space-y-3">
                    <SkeletonBar width="w-3/4" height="h-4" />
                    <SkeletonBar width="w-full" height="h-3" />
                    <SkeletonBar width="w-1/2" height="h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Anchor Section */}
        <section className="pb-32 px-4 pt-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">FAQ</h2>
              <p className="text-muted-foreground">
                Answers to the most common questions about working with Xyren.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item) => (
                <AccordionItem 
                  key={item.id} 
                  value={`faq-${item.id}`}
                  className="border border-border/40 rounded-xl px-6 bg-card/20 data-[state=open]:bg-card/40 data-[state=open]:border-border/60 transition-all duration-200"
                >
                  <AccordionTrigger className="text-left py-5 hover:no-underline">
                    <span className="text-foreground/90 font-medium">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Resources;
