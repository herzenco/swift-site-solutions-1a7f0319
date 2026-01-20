import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEOHead } from "@/components/SEOHead";
import { BackButton } from "@/components/BackButton";
import { ArrowRight } from "lucide-react";

interface RelatedResource {
  title: string;
  link: string;
}

interface ResourcePageTemplateProps {
  title: string;
  description: string;
  intro: string;
  children: React.ReactNode;
  relatedResources?: RelatedResource[];
}

export const ResourcePageTemplate = ({
  title,
  description,
  intro,
  children,
  relatedResources,
}: ResourcePageTemplateProps) => {
  return (
    <>
      <SEOHead title={`${title} | Xyren Resources`} description={description} />
      <Navbar />
      <BackButton />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Title Section */}
        <section className="pt-32 pb-8 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {intro}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16 px-4">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
            {children}
          </div>
        </section>

        {/* Related Resources */}
        {relatedResources && relatedResources.length > 0 && (
          <section className="pb-24 px-4">
            <div className="max-w-3xl mx-auto">
              <div className="border-t border-border/30 pt-12">
                <h2 className="text-xl font-semibold mb-6">Related Resources</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedResources.map((resource) => (
                    <Link
                      key={resource.link}
                      to={resource.link}
                      className="group flex items-center justify-between p-4 rounded-xl border border-border/30 bg-card/20 hover:bg-card/40 transition-colors"
                    >
                      <span className="font-medium">{resource.title}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};
