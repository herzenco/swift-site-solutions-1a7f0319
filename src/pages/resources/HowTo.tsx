import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/BackButton";

const HowTo = () => {
  return (
    <>
      <SEO
        title="How-To Guides | Xyren Resources"
        description="Practical, step-by-step guidance for domains, websites, booking systems, and digital setup."
      />
      <Navbar />
      <BackButton />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Intro Section */}
        <section className="pt-32 pb-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              How-To Guides
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Practical, instructional guides designed to walk you through specific tasks and decisions. These are evergreen resources—built to remain useful regardless of when you find them.
            </p>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="pb-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Placeholder cards - content to be added later */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-border/30 bg-card/20"
                >
                  <div className="h-4 w-3/4 bg-muted/30 rounded mb-3" />
                  <div className="h-3 w-full bg-muted/20 rounded mb-2" />
                  <div className="h-3 w-2/3 bg-muted/20 rounded" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HowTo;
