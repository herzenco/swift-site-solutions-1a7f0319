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
  { id: 1, title: "", description: "" },
  { id: 2, title: "", description: "" },
  { id: 3, title: "", description: "" },
];

const latestBlog = [
  { id: 1, title: "", description: "" },
  { id: 2, title: "", description: "" },
  { id: 3, title: "", description: "" },
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
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Clarity Before Complexity
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A knowledge hub designed to help you understand, evaluate, and make informed decisions—whether you're exploring Xyren or already working with us.
            </p>
          </div>
        </section>

        {/* How-To Section */}
        <section className="pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold">How-To</h2>
              <Link 
                to="/resources/how-to" 
                className="inline-flex items-center text-sm font-medium text-primary hover:gap-2 transition-all group"
              >
                View all
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {latestHowTo.map((item) => (
                <div
                  key={item.id}
                  className="group p-6 rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all duration-300 min-h-[140px]"
                >
                  <h3 className="text-lg font-medium mb-2 text-foreground">{item.title || "—"}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold">Blog</h2>
              <Link 
                to="/resources/blog" 
                className="inline-flex items-center text-sm font-medium text-primary hover:gap-2 transition-all group"
              >
                View all
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {latestBlog.map((item) => (
                <div
                  key={item.id}
                  className="group p-6 rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all duration-300 min-h-[140px]"
                >
                  <h3 className="text-lg font-medium mb-2 text-foreground">{item.title || "—"}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pb-24 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold">FAQ</h2>
              <Link 
                to="/resources/faq" 
                className="inline-flex items-center text-sm font-medium text-primary hover:gap-2 transition-all group"
              >
                View all
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item) => (
                <AccordionItem 
                  key={item.id} 
                  value={`faq-${item.id}`}
                  className="border border-border/50 rounded-xl px-6 bg-card/30 data-[state=open]:bg-card/50 transition-colors"
                >
                  <AccordionTrigger className="text-left py-5 hover:no-underline">
                    <span className="text-foreground font-medium">{item.question || "—"}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
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
