import { useParams, Link } from "react-router-dom";
import { usePageTracking } from "@/hooks/usePageTracking";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/BackButton";
import { cn } from "@/lib/utils";

type Category = "Website Systems" | "Marketing & Conversion" | "Automation & AI" | "Trends & Strategy";

interface BlogPost {
  id: string;
  title: string;
  category: Category;
  excerpt: string;
  slug: string;
}

interface CategoryInfo {
  slug: string;
  name: Category;
  description: string;
}

const categoryMapping: CategoryInfo[] = [
  {
    slug: "website-systems",
    name: "Website Systems",
    description: "Websites as infrastructure, operations, and systems.",
  },
  {
    slug: "marketing-conversion",
    name: "Marketing & Conversion",
    description: "Demand capture, trust-building, and turning traffic into action.",
  },
  {
    slug: "automation-ai",
    name: "Automation & AI",
    description: "Lead handling, scheduling, workflows, and emerging AI use cases.",
  },
  {
    slug: "trends-strategy",
    name: "Trends & Strategy",
    description: "Strategic thinking, tradeoffs, and where websites are heading.",
  },
];

const blogPosts: BlogPost[] = [
  // Website Systems
  {
    id: "1",
    title: "Your Website Isn't a Marketing Asset. It's an Operating System.",
    category: "Website Systems",
    excerpt: "Why treating your website like a brochure misses the point—and what changes when you see it as infrastructure.",
    slug: "website-as-operating-system",
  },
  {
    id: "2",
    title: "The Real Cost of 'Just a Website' vs. a Booking System",
    category: "Website Systems",
    excerpt: "A breakdown of hidden costs, missed opportunities, and what you're actually paying for when you choose friction over flow.",
    slug: "cost-of-just-a-website",
  },
  {
    id: "3",
    title: "The Shift From Custom Websites to Website Systems",
    category: "Website Systems",
    excerpt: "How service businesses are moving beyond one-off builds toward integrated systems that compound over time.",
    slug: "shift-to-website-systems",
  },
  // Marketing & Conversion
  {
    id: "4",
    title: "Why Most Service Business Websites Don't Convert (And It's Not the Design)",
    category: "Marketing & Conversion",
    excerpt: "The structural issues that kill conversions before a visitor ever reaches your contact page.",
    slug: "why-websites-dont-convert",
  },
  {
    id: "5",
    title: "What Happens Before Someone Books a Call",
    category: "Marketing & Conversion",
    excerpt: "The invisible journey from first visit to booked appointment—and the friction points most businesses never see.",
    slug: "before-booking-a-call",
  },
  {
    id: "6",
    title: "Why More Traffic Won't Fix a Broken Website Funnel",
    category: "Marketing & Conversion",
    excerpt: "The math behind why doubling traffic to a 1% conversion site still leaves you with the same problem.",
    slug: "traffic-wont-fix-funnel",
  },
  {
    id: "7",
    title: "Trust Is Built Before the First Conversation",
    category: "Marketing & Conversion",
    excerpt: "How your website either pre-qualifies leads or forces you to start every call from scratch.",
    slug: "trust-before-conversation",
  },
  // Automation & AI
  {
    id: "8",
    title: "Where AI Actually Helps on a Website (And Where It Doesn't)",
    category: "Automation & AI",
    excerpt: "A practical breakdown of AI applications that add value versus the ones that just add noise.",
    slug: "where-ai-helps",
  },
  {
    id: "9",
    title: "The Quiet Automation Stack Behind High-Performing Service Websites",
    category: "Automation & AI",
    excerpt: "The unsexy backend systems that make lead capture, routing, and follow-up run without manual effort.",
    slug: "quiet-automation-stack",
  },
  // Trends & Strategy
  {
    id: "10",
    title: "What 'Modern' Websites Actually Mean in 2026",
    category: "Trends & Strategy",
    excerpt: "Cutting through the buzzwords to define what actually matters in website strategy this year.",
    slug: "modern-websites-2026",
  },
];

const BlogCategory = () => {
  usePageTracking();
  const { category: categorySlug } = useParams<{ category: string }>();

  const categoryInfo = categoryMapping.find((c) => c.slug === categorySlug);
  const posts = categoryInfo 
    ? blogPosts.filter((post) => post.category === categoryInfo.name)
    : [];

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case "Website Systems":
        return "bg-primary/10 text-primary border-primary/20";
      case "Marketing & Conversion":
        return "bg-accent/10 text-accent border-accent/20";
      case "Automation & AI":
        return "bg-secondary/80 text-secondary-foreground border-secondary";
      case "Trends & Strategy":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  if (!categoryInfo) {
    return (
      <>
        <Navbar />
        <BackButton />
        <main id="main-content" className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Category not found</h1>
            <Link to="/resources/blog" className="text-primary hover:underline">
              ← Back to blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${categoryInfo.name} | Xyren Blog`}
        description={categoryInfo.description}
        canonical={`/resources/blog/${categorySlug}`}
        keywords={`${categoryInfo.name.toLowerCase()}, website strategy, service business`}
      />
      <Navbar />
      <BackButton />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-32 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/resources/blog" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              ← All articles
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {categoryInfo.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {categoryInfo.description}
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="pb-24 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-muted-foreground mb-8">
              {posts.length} article{posts.length !== 1 ? 's' : ''}
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/resources/blog/post/${post.slug}`}
                  className="group block"
                >
                  <article className="p-6 rounded-xl border border-border/30 bg-card/20 hover:border-border/60 hover:bg-card/40 transition-all duration-300 h-full">
                    <div className="flex flex-col gap-3 h-full">
                      <span
                        className={cn(
                          "inline-flex self-start px-2.5 py-1 rounded-full text-xs font-medium border",
                          getCategoryColor(post.category)
                        )}
                      >
                        {post.category}
                      </span>
                      <h2 className="text-xl font-semibold tracking-tight leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform mt-auto pt-2">
                        Read article →
                      </span>
                    </div>
                  </article>
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

export default BlogCategory;
