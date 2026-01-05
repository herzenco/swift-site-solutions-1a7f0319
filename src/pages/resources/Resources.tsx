import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEO } from "@/components/SEO";
import { BookOpen, Lightbulb, HelpCircle, ArrowRight } from "lucide-react";

const resourceSections = [
  {
    title: "How-To Guides",
    description: "Step-by-step, practical guidance for domains, websites, booking systems, and setup.",
    icon: BookOpen,
    link: "/resources/how-to",
    linkText: "Explore Guides",
  },
  {
    title: "Blog",
    description: "Insights, strategy, and explanations on building effective digital presence.",
    icon: Lightbulb,
    link: "/resources/blog",
    linkText: "Read Articles",
  },
  {
    title: "FAQ",
    description: "Direct answers to common questions about websites, timelines, pricing, and fit.",
    icon: HelpCircle,
    link: "/resources/faq",
    linkText: "View FAQ",
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

        {/* Resource Sections */}
        <section className="pb-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {resourceSections.map((section) => (
                <Link
                  key={section.title}
                  to={section.link}
                  className="group relative flex flex-col p-8 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all duration-300"
                >
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-4">
                    <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      {section.linkText}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Resources;
