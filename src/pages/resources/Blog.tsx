import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { usePageTracking } from "@/hooks/usePageTracking";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/BackButton";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
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
  categorySlug: string;
}

interface CategorySection {
  name: Category;
  slug: string;
  description: string;
}

const categoryData: CategorySection[] = [
  {
    name: "Website Systems",
    slug: "website-systems",
    description: "Websites as infrastructure, operations, and systems.",
  },
  {
    name: "Marketing & Conversion",
    slug: "marketing-conversion",
    description: "Demand capture, trust-building, and turning traffic into action.",
  },
  {
    name: "Automation & AI",
    slug: "automation-ai",
    description: "Lead handling, scheduling, workflows, and emerging AI use cases.",
  },
  {
    name: "Trends & Strategy",
    slug: "trends-strategy",
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
    categorySlug: "website-systems",
  },
  {
    id: "2",
    title: "The Real Cost of 'Just a Website' vs. a Booking System",
    category: "Website Systems",
    excerpt: "A breakdown of hidden costs, missed opportunities, and what you're actually paying for when you choose friction over flow.",
    slug: "cost-of-just-a-website",
    categorySlug: "website-systems",
  },
  {
    id: "3",
    title: "The Shift From Custom Websites to Website Systems",
    category: "Website Systems",
    excerpt: "How service businesses are moving beyond one-off builds toward integrated systems that compound over time.",
    slug: "shift-to-website-systems",
    categorySlug: "website-systems",
  },
  // Marketing & Conversion
  {
    id: "4",
    title: "Why Most Service Business Websites Don't Convert (And It's Not the Design)",
    category: "Marketing & Conversion",
    excerpt: "The structural issues that kill conversions before a visitor ever reaches your contact page.",
    slug: "why-websites-dont-convert",
    categorySlug: "marketing-conversion",
  },
  {
    id: "5",
    title: "What Happens Before Someone Books a Call",
    category: "Marketing & Conversion",
    excerpt: "The invisible journey from first visit to booked appointment—and the friction points most businesses never see.",
    slug: "before-booking-a-call",
    categorySlug: "marketing-conversion",
  },
  {
    id: "6",
    title: "Why More Traffic Won't Fix a Broken Website Funnel",
    category: "Marketing & Conversion",
    excerpt: "The math behind why doubling traffic to a 1% conversion site still leaves you with the same problem.",
    slug: "traffic-wont-fix-funnel",
    categorySlug: "marketing-conversion",
  },
  {
    id: "7",
    title: "Trust Is Built Before the First Conversation",
    category: "Marketing & Conversion",
    excerpt: "How your website either pre-qualifies leads or forces you to start every call from scratch.",
    slug: "trust-before-conversation",
    categorySlug: "marketing-conversion",
  },
  // Automation & AI
  {
    id: "8",
    title: "Where AI Actually Helps on a Website (And Where It Doesn't)",
    category: "Automation & AI",
    excerpt: "A practical breakdown of AI applications that add value versus the ones that just add noise.",
    slug: "where-ai-helps",
    categorySlug: "automation-ai",
  },
  {
    id: "9",
    title: "The Quiet Automation Stack Behind High-Performing Service Websites",
    category: "Automation & AI",
    excerpt: "The unsexy backend systems that make lead capture, routing, and follow-up run without manual effort.",
    slug: "quiet-automation-stack",
    categorySlug: "automation-ai",
  },
  // Trends & Strategy
  {
    id: "10",
    title: "What 'Modern' Websites Actually Mean in 2026",
    category: "Trends & Strategy",
    excerpt: "Cutting through the buzzwords to define what actually matters in website strategy this year.",
    slug: "modern-websites-2026",
    categorySlug: "trends-strategy",
  },
];

type SortOption = "recent" | "relevant";

const CategoryCarousel = ({ 
  category, 
  posts,
  getCategoryColor 
}: { 
  category: CategorySection; 
  posts: BlogPost[];
  getCategoryColor: (category: Category) => string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollability, 300);
    }
  };

  return (
    <div className="relative">
      {/* Category Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-2">{category.name}</h2>
          <p className="text-muted-foreground text-sm">{category.description}</p>
        </div>
        <Link 
          to={`/resources/blog/${category.slug}`}
          className="text-sm text-muted-foreground hover:text-primary transition-colors hidden sm:block"
        >
          View all →
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-background/90 border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card hover:border-border"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
        )}

        {/* Cards Container */}
        <div 
          ref={scrollRef}
          onScroll={checkScrollability}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {posts.slice(0, 5).map((post) => (
            <Link
              key={post.id}
              to={`/resources/blog/${post.categorySlug}/${post.slug}`}
              className="group/card flex-shrink-0 w-[320px] p-5 rounded-xl border border-border/30 bg-card/20 hover:border-border/60 hover:bg-card/40 transition-all duration-300"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="flex flex-col gap-3 h-full">
                {/* Category Tag */}
                <span
                  className={cn(
                    "inline-flex self-start px-2.5 py-1 rounded-full text-xs font-medium border",
                    getCategoryColor(post.category)
                  )}
                >
                  {post.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold tracking-tight leading-snug group-hover/card:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-grow">
                  {post.excerpt}
                </p>

                {/* CTA */}
                <span className="inline-flex items-center text-sm font-medium text-primary group-hover/card:translate-x-1 transition-transform mt-auto pt-2">
                  Read article →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && posts.length > 3 && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-background/90 border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card hover:border-border"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};

const Blog = () => {
  usePageTracking();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

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

  const getPostsByCategory = (category: Category) => {
    return blogPosts.filter((post) => post.category === category);
  };

  // Filtered posts for search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    
    const query = searchQuery.toLowerCase();
    let posts = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
    );

    if (sortBy === "relevant") {
      // Sort by title match first, then category match
      posts.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(query) ? 0 : 1;
        const bTitle = b.title.toLowerCase().includes(query) ? 0 : 1;
        return aTitle - bTitle;
      });
    }

    return posts;
  }, [searchQuery, sortBy]);

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
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Insights on Websites, Marketing, and Automation
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Strategic thinking on how modern websites drive growth, efficiency, and leverage for service businesses.
            </p>
          </div>
        </section>

        {/* Secondary Navigation - De-emphasized */}
        <section className="pb-8 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/20 border-border/30 focus:border-border/60 text-sm"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    {sortBy === "recent" ? "Most Recent" : "Most Relevant"}
                    <ChevronDown className="h-4 w-4 ml-1.5 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border">
                  <DropdownMenuItem onClick={() => setSortBy("recent")}>
                    Most Recent
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("relevant")}>
                    Most Relevant
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </section>

        {/* Search Results or Category Sections */}
        {searchResults ? (
          <section className="pb-24 px-4">
            <div className="max-w-5xl mx-auto">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-sm text-primary hover:underline"
                >
                  Clear search
                </button>
              </div>
              
              {searchResults.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No articles match your search.</p>
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map((post) => (
                    <Link
                      key={post.id}
                      to={`/resources/blog/${post.categorySlug}/${post.slug}`}
                      className="group p-5 rounded-xl border border-border/30 bg-card/20 hover:border-border/60 hover:bg-card/40 transition-all duration-300"
                    >
                      <div className="flex flex-col gap-3 h-full">
                        <span
                          className={cn(
                            "inline-flex self-start px-2.5 py-1 rounded-full text-xs font-medium border",
                            getCategoryColor(post.category)
                          )}
                        >
                          {post.category}
                        </span>
                        <h3 className="text-lg font-semibold tracking-tight leading-snug group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                          {post.excerpt}
                        </p>
                        <span className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform mt-auto pt-2">
                          Read article →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="pb-24 px-4">
            <div className="max-w-5xl mx-auto space-y-16">
              {categoryData.map((category) => {
                const posts = getPostsByCategory(category.name);
                if (posts.length === 0) return null;
                
                return (
                  <CategoryCarousel
                    key={category.name}
                    category={category}
                    posts={posts}
                    getCategoryColor={getCategoryColor}
                  />
                );
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Blog;
