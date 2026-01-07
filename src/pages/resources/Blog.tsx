import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/BackButton";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Category = "Website Systems" | "Marketing & Conversion" | "Automation & AI" | "Trends & Strategy";

interface BlogPost {
  id: string;
  title: string;
  category: Category;
  excerpt: string;
  slug: string;
}

const categories: Category[] = [
  "Website Systems",
  "Marketing & Conversion",
  "Automation & AI",
  "Trends & Strategy",
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

type SortOption = "recent" | "category";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredPosts = useMemo(() => {
    let posts = [...blogPosts];

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      posts = posts.filter((post) => selectedCategories.includes(post.category));
    }

    // Sort
    if (sortBy === "category") {
      posts.sort((a, b) => a.category.localeCompare(b.category));
    }
    // "recent" keeps default order (already sorted by most recent)

    return posts;
  }, [searchQuery, selectedCategories, sortBy]);

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

  return (
    <>
      <SEO
        title="Blog | Insights on Websites, Marketing, and Automation"
        description="Strategic thinking on how modern websites drive growth, efficiency, and leverage for service businesses. Written to help operators make smarter decisions."
        canonical="/resources/blog"
        keywords="website strategy, marketing systems, automation, AI, service business, lead conversion, web design insights"
      />
      <Navbar />
      <BackButton />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-32 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Insights on Websites, Marketing, and Automation
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-2">
              Strategic thinking on how modern websites drive growth, efficiency, and leverage for service businesses.
            </p>
            <p className="text-sm text-muted-foreground/70">
              Written to help operators make smarter decisions, not chase trends.
            </p>
          </div>
        </section>

        {/* Blog Controls */}
        <section className="pb-8 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search and Sort Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/30 border-border/50 focus:border-primary/50"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-card/30 border-border/50 min-w-[140px] justify-between">
                    {sortBy === "recent" ? "Most Recent" : "Category"}
                    <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("recent")}>
                    Most Recent
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("category")}>
                    Category
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                    selectedCategories.includes(category)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card/30 text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {category}
                </button>
              ))}
              {selectedCategories.length > 0 && (
                <button
                  onClick={() => setSelectedCategories([])}
                  className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-24 px-4">
          <div className="max-w-4xl mx-auto">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No articles match your search.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategories([]);
                  }}
                  className="mt-4 text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group p-6 rounded-xl border border-border/30 bg-card/20 hover:border-border/60 hover:bg-card/40 transition-all duration-300"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Category Tag */}
                      <span
                        className={cn(
                          "inline-flex self-start px-3 py-1 rounded-full text-xs font-medium border",
                          getCategoryColor(post.category)
                        )}
                      >
                        {post.category}
                      </span>

                      {/* Title */}
                      <h2 className="text-xl md:text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-muted-foreground leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* CTA */}
                      <span className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform mt-2">
                        Read article →
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
