import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/BackButton";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "Website Systems" | "Marketing & Conversion" | "Automation & AI" | "Trends & Strategy";

interface BlogPost {
  id: string;
  title: string;
  category: Category;
  categorySlug: string;
  excerpt: string;
  slug: string;
  content: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  // Website Systems
  {
    id: "1",
    title: "Your Website Isn't a Marketing Asset. It's an Operating System.",
    category: "Website Systems",
    categorySlug: "website-systems",
    excerpt: "Why treating your website like a brochure misses the point—and what changes when you see it as infrastructure.",
    slug: "website-as-operating-system",
    readTime: "5 min read",
    content: `Most service businesses treat their website like a digital brochure—something to check off the list, update once a year, and hope for the best.

But here's the truth: your website isn't a marketing asset. It's an operating system.

## The Brochure Mindset

When you think of your website as a brochure, you focus on:
- How it looks
- What it says about you
- Whether it's "modern" enough

These things matter, but they're table stakes. They don't create leverage.

## The Operating System Mindset

When you think of your website as an operating system, you focus on:
- How it captures and qualifies leads automatically
- How it schedules appointments without your involvement
- How it builds trust before the first conversation
- How it compounds value over time

This shift changes everything.

## What Changes

Instead of asking "Does our website look professional?" you start asking:
- "How many qualified leads did our website generate this week?"
- "What's our visitor-to-booking conversion rate?"
- "How much time did we save on lead qualification?"

These are operational questions. And operational thinking leads to operational results.

## The Bottom Line

Your competitors are still thinking about websites as brochures. When you start thinking about yours as an operating system, you create an unfair advantage that compounds over time.`,
  },
  {
    id: "2",
    title: "The Real Cost of 'Just a Website' vs. a Booking System",
    category: "Website Systems",
    categorySlug: "website-systems",
    excerpt: "A breakdown of hidden costs, missed opportunities, and what you're actually paying for when you choose friction over flow.",
    slug: "cost-of-just-a-website",
    readTime: "6 min read",
    content: `"We just need a simple website." 

We hear this all the time. And on the surface, it makes sense. Why overcomplicate things?

But there's a hidden cost to "simple" that most service businesses don't calculate until it's too late.

## The Visible Cost

A basic website costs less upfront. Maybe $3,000-$5,000 for something decent. You get some pages, a contact form, maybe a phone number prominently displayed.

## The Invisible Cost

What you don't see is what you're losing every single day:

**Missed Leads**
- 60% of website visitors never fill out a contact form
- They leave, and you never know they existed

**Qualification Time**
- Every lead requires a phone call to determine fit
- That's 15-30 minutes per lead, regardless of quality

**Scheduling Friction**
- Back-and-forth emails to find a time
- No-shows because there's no automated reminder system

**Trust Deficit**
- Starting every call from scratch because your website didn't pre-qualify

## The Math

Let's say you get 100 website visitors per week. With a basic website:
- 5 fill out the form (5% conversion)
- 3 actually respond to follow-up
- 1 becomes a customer

With a booking system:
- 15 book directly (15% conversion with lower friction)
- 12 show up (automated reminders)
- 4-5 become customers

Same traffic. 4-5x the results.

## The Real Question

It's not "How much does a website cost?"

It's "How much is the friction costing you every week?"`,
  },
  {
    id: "3",
    title: "The Shift From Custom Websites to Website Systems",
    category: "Website Systems",
    categorySlug: "website-systems",
    excerpt: "How service businesses are moving beyond one-off builds toward integrated systems that compound over time.",
    slug: "shift-to-website-systems",
    readTime: "5 min read",
    content: `The website industry is going through a quiet revolution.

For decades, the model was simple: hire a designer, get a custom website, launch it, and maybe update it every few years.

That model is dying.

## The Old Way

Custom websites were treated as projects:
- Big upfront investment
- Launch and forget
- Redesign every 3-5 years
- No connection to operations

## The New Way

Website systems are treated as infrastructure:
- Continuous optimization
- Integrated with booking, CRM, and follow-up
- Evolving based on data
- Core to how the business operates

## Why This Matters

When your website is a project, it depreciates. The moment it launches, it starts getting outdated.

When your website is a system, it appreciates. Every optimization, every integration, every improvement compounds over time.

## The Compounding Effect

Month 1: Basic booking integration saves 5 hours/week
Month 3: Lead scoring identifies hot prospects automatically
Month 6: Automated follow-up recovers 30% of abandoned bookings
Month 12: The system generates leads while you sleep

This is the shift. From one-time projects to compounding systems.`,
  },
  // Marketing & Conversion
  {
    id: "4",
    title: "Why Most Service Business Websites Don't Convert (And It's Not the Design)",
    category: "Marketing & Conversion",
    categorySlug: "marketing-conversion",
    excerpt: "The structural issues that kill conversions before a visitor ever reaches your contact page.",
    slug: "why-websites-dont-convert",
    readTime: "7 min read",
    content: `You've invested in a beautiful website. Professional photos. Clean design. Clear messaging.

And yet... conversions are flat.

Before you blame the design, let's look at what's actually killing your conversions.

## The Real Problems

**1. Friction in the Funnel**

Every step between "interested" and "booked" is a potential drop-off. Most websites have 5-7 friction points:
- Finding the contact page
- Filling out a form
- Waiting for a response
- Scheduling a call
- Confirming the appointment

Each step loses 20-40% of interested prospects.

**2. No Trust Acceleration**

Visitors don't know you. They're skeptical. And your website probably isn't doing enough to build trust before asking for their contact info.

Trust elements that work:
- Real results with specific numbers
- Client testimonials with full names and companies
- Process transparency
- Risk reversal (guarantees, free consultations)

**3. Unclear Next Steps**

"Contact us" is not a clear next step. It's a vague invitation that puts all the work on the visitor.

Clear next steps:
- "Book your free 15-minute strategy call"
- "Get your custom quote in 24 hours"
- "Schedule a walkthrough this week"

## The Fix

Don't redesign. Restructure.

Map every step from first visit to booked appointment. Identify the friction. Remove it systematically.

That's where conversions live.`,
  },
  {
    id: "5",
    title: "What Happens Before Someone Books a Call",
    category: "Marketing & Conversion",
    categorySlug: "marketing-conversion",
    excerpt: "The invisible journey from first visit to booked appointment—and the friction points most businesses never see.",
    slug: "before-booking-a-call",
    readTime: "5 min read",
    content: `Most service businesses obsess over what happens during the sales call.

But the call is just the tip of the iceberg. What happens before determines everything.

## The Invisible Journey

**Stage 1: Discovery (0-10 seconds)**
- "Is this relevant to me?"
- "Does this look legitimate?"
- "Should I keep scrolling?"

90% of visitors make this decision in under 10 seconds.

**Stage 2: Evaluation (10 seconds - 3 minutes)**
- "What exactly do they offer?"
- "Have they solved problems like mine?"
- "Can I trust them?"

This is where most websites lose people. Too much jargon, not enough specifics.

**Stage 3: Consideration (3-10 minutes)**
- "What would working with them look like?"
- "What are the risks?"
- "Is this the right time?"

By this stage, they're interested. Now they need confidence.

**Stage 4: Decision (10+ minutes)**
- "How do I take the next step?"
- "What happens after I reach out?"
- "Am I making the right choice?"

Most websites make this step harder than it needs to be.

## The Optimization Opportunity

Each stage has specific friction points and specific solutions. The businesses that understand this journey—and optimize for it—convert 3-5x better than those that don't.`,
  },
  {
    id: "6",
    title: "Why More Traffic Won't Fix a Broken Website Funnel",
    category: "Marketing & Conversion",
    categorySlug: "marketing-conversion",
    excerpt: "The math behind why doubling traffic to a 1% conversion site still leaves you with the same problem.",
    slug: "traffic-wont-fix-funnel",
    readTime: "4 min read",
    content: `The most common response to a underperforming website? "We need more traffic."

It's intuitive. More visitors = more leads, right?

Not exactly.

## The Math Problem

Let's say your website converts at 1% and you get 1,000 visitors/month. That's 10 leads.

Now let's say you double your traffic to 2,000 visitors/month. You get... 20 leads.

But here's what you probably spent to get that traffic:
- More ad spend
- More content creation
- More SEO investment
- More time

You 2x'd your input to 2x your output. That's not leverage. That's a treadmill.

## The Alternative

What if instead of doubling traffic, you doubled conversions?

Same 1,000 visitors, but now converting at 2%. That's 20 leads.

And here's the magic: conversion improvements are usually cheaper than traffic acquisition, and they apply to ALL future traffic.

## The Compounding Effect

Month 1: Fix friction, go from 1% to 2%
Month 3: Add social proof, go from 2% to 3%
Month 6: Implement booking system, go from 3% to 5%

Now your 1,000 visitors generate 50 leads instead of 10.

Then add more traffic.

## The Order Matters

Fix the funnel first. Scale traffic second.

The businesses that understand this outperform their competitors by orders of magnitude.`,
  },
  {
    id: "7",
    title: "Trust Is Built Before the First Conversation",
    category: "Marketing & Conversion",
    categorySlug: "marketing-conversion",
    excerpt: "How your website either pre-qualifies leads or forces you to start every call from scratch.",
    slug: "trust-before-conversation",
    readTime: "5 min read",
    content: `Every sales call starts in one of two places:

**Position A:** "So, tell me about your company..."

**Position B:** "I've seen your work, I understand your process, I think we're a good fit—let's talk specifics."

The difference? What happened on your website before the call.

## The Trust Deficit

When your website doesn't build trust, every call starts at zero. You spend the first 15 minutes:
- Explaining who you are
- Proving your credibility
- Overcoming basic objections

That's exhausting. And it doesn't scale.

## The Trust Surplus

When your website builds trust effectively, prospects arrive pre-sold:
- They've seen your results
- They understand your process
- They've already decided you're credible

Now your calls are about fit and specifics, not convincing and proving.

## How to Build Trust Before the Call

**1. Show Real Results**
Not "we help businesses grow." But "we helped [Company] increase bookings by 47% in 90 days."

**2. Reveal Your Process**
Mystery creates doubt. Transparency creates confidence.

**3. Use Social Proof Strategically**
Testimonials with names, photos, and specific outcomes. Not generic praise.

**4. Address Objections Proactively**
FAQ sections, guarantee language, risk reversal.

**5. Demonstrate Expertise**
Content that shows you understand their problems deeply.

## The ROI of Trust

Pre-sold prospects:
- Convert at higher rates
- Pay higher prices
- Require less convincing
- Refer more readily

Trust isn't soft—it's the hardest working asset on your website.`,
  },
  // Automation & AI
  {
    id: "8",
    title: "Where AI Actually Helps on a Website (And Where It Doesn't)",
    category: "Automation & AI",
    categorySlug: "automation-ai",
    excerpt: "A practical breakdown of AI applications that add value versus the ones that just add noise.",
    slug: "where-ai-helps",
    readTime: "6 min read",
    content: `Everyone's talking about AI. But most of what you hear is hype.

Let's cut through it and look at where AI actually creates value on a website—and where it's just noise.

## Where AI Actually Helps

**1. Intelligent Lead Qualification**
AI can analyze visitor behavior and form responses to score leads automatically. This means your team focuses on hot prospects, not tire-kickers.

**2. Smart Scheduling**
AI-powered scheduling that considers your availability, the prospect's timezone, and optimal meeting times. Less back-and-forth, more booked calls.

**3. Personalized Content**
Showing different content based on where a visitor came from, what they've looked at, and what stage of the journey they're in.

**4. Chatbots (Done Right)**
Not the annoying popup kind. The kind that answers specific questions, captures information, and knows when to hand off to a human.

**5. Follow-up Optimization**
AI that learns which follow-up messages work best and when to send them.

## Where AI Doesn't Help

**1. Replacing Human Connection**
For high-ticket services, people want to talk to people. AI should enable that, not replace it.

**2. Generic Chatbots**
"Hi! How can I help you today?" followed by useless responses. These hurt more than they help.

**3. Over-Personalization**
When it gets creepy. There's a line between helpful and invasive.

**4. Complexity for Complexity's Sake**
If a simple form works better, use a simple form. AI isn't always the answer.

## The Right Question

Not "How can we add AI?" but "What problems do we have that AI might solve better than traditional approaches?"

Start with the problem. Then evaluate the solution.`,
  },
  {
    id: "9",
    title: "The Quiet Automation Stack Behind High-Performing Service Websites",
    category: "Automation & AI",
    categorySlug: "automation-ai",
    excerpt: "The unsexy backend systems that make lead capture, routing, and follow-up run without manual effort.",
    slug: "quiet-automation-stack",
    readTime: "5 min read",
    content: `The best service websites don't look different on the surface.

The magic is in what you don't see—the automation stack running quietly behind the scenes.

## The Stack

**Layer 1: Capture**
- Forms that collect the right information
- Chatbots that engage at the right moments
- Exit-intent popups that recover abandoning visitors

**Layer 2: Qualify**
- Lead scoring based on responses and behavior
- Automatic tagging and segmentation
- Priority routing to the right team member

**Layer 3: Schedule**
- Integrated calendars that show real-time availability
- Automatic timezone detection
- Buffer time and meeting type logic

**Layer 4: Confirm**
- Immediate confirmation emails
- SMS reminders at 24h and 1h before
- Calendar invites with meeting details

**Layer 5: Follow Up**
- Automated sequences for no-shows
- Re-engagement campaigns for cold leads
- Win-back flows for lost opportunities

## The Compound Effect

Each layer saves time. But together, they create leverage.

A website with this stack running generates and nurtures leads while you sleep. It follows up when you forget. It qualifies automatically so your team only talks to ready buyers.

That's the quiet advantage.`,
  },
  // Trends & Strategy
  {
    id: "10",
    title: "What 'Modern' Websites Actually Mean in 2026",
    category: "Trends & Strategy",
    categorySlug: "trends-strategy",
    excerpt: "Cutting through the buzzwords to define what actually matters in website strategy this year.",
    slug: "modern-websites-2026",
    readTime: "5 min read",
    content: `"Modern website" has become meaningless. Everyone claims to build them. Few can define what makes a website modern in 2026.

Let's fix that.

## What Modern Actually Means

**1. Operationally Integrated**
A modern website isn't a standalone brochure. It's connected to your:
- Booking system
- CRM
- Email marketing
- Payment processing
- Analytics

Everything flows. Nothing lives in silos.

**2. Conversion-Optimized**
Not just "pretty" or "professional." Designed around a clear goal with measurable performance.

Key metrics:
- Visitor-to-lead conversion rate
- Lead-to-booking conversion rate
- Time-to-first-response

**3. Continuously Improving**
Launch isn't the finish line. Modern websites are iterated based on data:
- A/B testing key pages
- Analyzing user behavior
- Optimizing based on results

**4. Mobile-Native**
Not "mobile-responsive" as an afterthought. Designed for mobile first, because that's where most traffic comes from.

**5. Fast**
Sub-3-second load times. Not negotiable. Speed affects everything from user experience to SEO.

**6. Accessible**
Usable by everyone, including people with disabilities. This is both ethical and practical—accessible sites perform better.

## What Modern Doesn't Mean

- Trendy design that ages poorly
- Complex animations that slow things down
- Technology for technology's sake
- Features nobody asked for

## The Test

Can you measure your website's impact on revenue? 

If yes, it might be modern. If no, it's probably just a brochure with better fonts.`,
  },
];

const BlogPost = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  
  const post = blogPosts.find(
    (p) => p.categorySlug === category && p.slug === slug
  );

  const getCategoryColor = (cat: Category) => {
    switch (cat) {
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

  if (!post) {
    return (
      <>
        <SEO title="Article Not Found | Blog" />
        <Navbar />
        <BackButton />
        <main className="min-h-screen bg-background pt-32 pb-24 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/resources/blog"
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Get related posts from the same category
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <SEO
        title={`${post.title} | Blog`}
        description={post.excerpt}
        canonical={`/resources/blog/${category}/${slug}`}
      />
      <Navbar />
      <BackButton />
      <main id="main-content" className="min-h-screen bg-background">
        <article className="pt-32 pb-16 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-12">
              <Link
                to="/resources/blog"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
              
              <div className="flex items-center gap-4 mb-6">
                <span
                  className={cn(
                    "inline-flex px-3 py-1 rounded-full text-xs font-medium border",
                    getCategoryColor(post.category)
                  )}
                >
                  {post.category}
                </span>
                <span className="text-sm text-muted-foreground">{post.readTime}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </header>

            {/* Content */}
            <div className="prose prose-lg prose-invert max-w-none">
              {post.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-2xl font-bold mt-12 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={idx} className="text-lg font-semibold mt-8 mb-2">
                      {paragraph.replace(/\*\*/g, '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                  return (
                    <ul key={idx} className="list-disc pl-6 my-4 space-y-2">
                      {items.map((item, i) => (
                        <li key={i} className="text-muted-foreground">
                          {item.replace('- ', '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="text-muted-foreground leading-relaxed my-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="pb-24 px-4 border-t border-border/30">
            <div className="max-w-3xl mx-auto pt-16">
              <h2 className="text-2xl font-semibold mb-8">More from {post.category}</h2>
              <div className="grid gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    to={`/resources/blog/${related.categorySlug}/${related.slug}`}
                    className="group p-5 rounded-xl border border-border/30 bg-card/20 hover:border-border/60 hover:bg-card/40 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
