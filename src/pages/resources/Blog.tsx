import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/BackButton";

const Blog = () => {
  return (
    <>
      <SEO
        title="Blog"
        description="Insights on website strategy, lead conversion, and building an effective online presence for service businesses. Learn how to get more from your website."
        canonical="/resources/blog"
        keywords="website strategy, lead conversion, service business tips, online presence, web design insights"
      />
      <Navbar />
      <BackButton />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Intro Section */}
        <section className="pt-32 pb-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Deeper thinking, explanations, and strategy. These are thoughtful essays on the decisions, patterns, and approaches that shape effective digital presence—not a content feed.
            </p>
          </div>
        </section>

        {/* Articles List */}
        <section className="pb-24 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {/* Placeholder articles - content to be added later */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-border/30 bg-card/20"
                >
                  <div className="h-5 w-2/3 bg-muted/30 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-muted/20 rounded" />
                    <div className="h-3 w-full bg-muted/20 rounded" />
                    <div className="h-3 w-1/2 bg-muted/20 rounded" />
                  </div>
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

export default Blog;
