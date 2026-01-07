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

// How-To guides data (first 4 from Phase 1)
const howToGuides = [
  { slug: "prepare-your-domain", number: "01", title: "How to Prepare Your Domain", description: "Your domain is the foundation. Learn what to do before we start building.", featured: true },
  { slug: "set-up-your-email", number: "02", title: "How to Set Up Your Email", description: "Configure professional email so inquiries and confirmations arrive reliably." },
  { slug: "configure-scheduling", number: "03", title: "How to Configure Scheduling", description: "Define when and how visitors can book time with you." },
  { slug: "plan-your-content", number: "04", title: "What We Need Before We Start", description: "The key inputs we collect upfront so your site can be built quickly and correctly." },
];

// Latest blog posts
const latestBlog = [
  { id: "1", title: "Your Website Isn't a Marketing Asset. It's an Operating System.", category: "Website Systems", excerpt: "Why treating your website like a brochure misses the point—and what changes when you see it as infrastructure.", slug: "website-as-operating-system" },
  { id: "4", title: "Why Most Service Business Websites Don't Convert (And It's Not the Design)", category: "Marketing & Conversion", excerpt: "The structural issues that kill conversions before a visitor ever reaches your contact page.", slug: "why-websites-dont-convert" },
  { id: "8", title: "Where AI Actually Helps on a Website (And Where It Doesn't)", category: "Automation & AI", excerpt: "A practical breakdown of AI applications that add value versus the ones that just add noise.", slug: "where-ai-helps" },
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
        title="Resources"
        description="Guides, FAQs, and insights to help you prepare for your website build. Understand the process, set expectations, and get the most out of your Xyren website."
        canonical="/resources"
        keywords="website guides, FAQ, how-to guides, website setup, Xyren resources"
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
              {howToGuides.map((guide) => (
                <Link
                  key={guide.number}
                  to={`/resources/how-to/${guide.slug}`}
                  className={`group flex-shrink-0 w-[320px] md:w-[380px] p-8 rounded-2xl border transition-all duration-300 snap-start flex flex-col ${
                    guide.featured
                      ? 'border-primary/40 bg-primary/[0.03] hover:bg-primary/[0.06] hover:border-primary/60'
                      : 'border-border/50 bg-card/30 hover:bg-card/50 hover:border-border'
                  }`}
                >
                  {guide.featured && (
                    <span className="absolute -top-2.5 left-4 px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase bg-primary text-primary-foreground rounded">
                      Recommended first
                    </span>
                  )}
                  {/* Step number */}
                  <span className="text-xs font-mono text-primary/60 tracking-widest mb-4 block">
                    {guide.number}
                  </span>
                  
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                    {guide.description}
                  </p>
                  <span className="inline-flex items-center text-sm text-primary mt-4">
                    Read guide
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
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
              {latestBlog.map((post) => (
                <Link
                  key={post.id}
                  to={`/resources/blog/${post.slug}`}
                  className="group p-5 rounded-xl border border-border/30 bg-card/20 hover:bg-card/40 hover:border-border/50 transition-all duration-300"
                >
                  <div className="flex flex-col gap-3 h-full">
                    <span className="text-xs font-medium text-primary/70">{post.category}</span>
                    <h3 className="text-base font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center text-sm text-primary mt-auto pt-2">
                      Read article →
                    </span>
                  </div>
                </Link>
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
