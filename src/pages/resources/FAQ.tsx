import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEOHead } from "@/components/SEOHead";
import { BackButton } from "@/components/BackButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <>
      <SEOHead
        title="Frequently Asked Questions"
        description="Answers to common questions about Xyren websites, pricing, timelines, and what's included. Everything you need to know before getting started."
        canonical="/resources/faq"
        keywords="Xyren FAQ, website pricing, website timeline, web design questions"
      />
      <Navbar />
      <BackButton />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Intro Section */}
        <section className="pt-32 pb-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Answers to common questions—before and after working with Xyren. If you're wondering about pricing, timelines, fit, or process, start here.
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="pb-24 px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {/* Placeholder FAQ items - content to be added later */}
              {[1, 2, 3, 4, 5].map((i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-border/30 rounded-xl px-6 bg-card/20 data-[state=open]:bg-card/40 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <div className="h-4 w-3/4 bg-muted/30 rounded" />
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-muted/20 rounded" />
                      <div className="h-3 w-full bg-muted/20 rounded" />
                      <div className="h-3 w-2/3 bg-muted/20 rounded" />
                    </div>
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

export default FAQ;
