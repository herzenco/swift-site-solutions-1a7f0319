import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/BackButton";
import { ArrowRight, Clock, CheckCircle2, Zap, Target } from "lucide-react";

const phases = [
  {
    label: "Before We Build",
    description: "Foundation work that makes the build faster and smoother.",
    guides: [
      { slug: "prepare-your-domain", number: "01", title: "How to Prepare Your Domain", description: "Your domain is the foundation. Learn what to do before we start building.", cta: "Start here", featured: true },
      { slug: "set-up-your-email", number: "02", title: "How to Set Up Your Email", description: "Configure professional email so inquiries and confirmations arrive reliably.", cta: "Read guide" },
      { slug: "configure-scheduling", number: "03", title: "How to Configure Scheduling", description: "Define when and how visitors can book time with you.", cta: "Read guide" },
      { slug: "plan-your-content", number: "04", title: "What We Need Before We Start", description: "The key inputs we collect upfront so your site can be built quickly and correctly.", cta: "Read guide" },
    ],
  },
  {
    label: "During the Build",
    description: "What happens behind the scenes and how feedback works.",
    guides: [
      { slug: "organize-your-forms", number: "05", title: "What Happens During the Build", description: "What goes on while we build your site and what you can expect.", cta: "See what to expect" },
      { slug: "gather-your-assets", number: "06", title: "Review, Revisions, and Launch", description: "How feedback works, what to expect during revisions, and what happens on launch day.", cta: "Learn how this works" },
    ],
  },
  {
    label: "After Launch",
    description: "How to use your site as a system and keep it working well.",
    guides: [
      { slug: "define-your-services", number: "07", title: "Life After Launch", description: "How to use your website as a system and get the most value from it over time.", cta: "Learn how this works" },
      { slug: "prepare-for-launch", number: "08", title: "Making Updates Without Breaking the System", description: "What kinds of updates make sense, how to think about changes, and when to leave things alone.", cta: "Best practices" },
    ],
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Faster Website Launch",
    description: "With everything prepared ahead of time, your site moves from concept to completion without unnecessary delays.",
  },
  {
    icon: CheckCircle2,
    title: "Fewer Back-and-Forth Questions",
    description: "Clear preparation means fewer interruptions and a smoother build process from start to finish.",
  },
  {
    icon: Target,
    title: "Clear Expectations",
    description: "Understanding what's needed upfront sets the stage for a predictable, professional experience.",
  },
  {
    icon: Clock,
    title: "Better Outcomes from Day One",
    description: "A well-prepared project leads to a polished result that works correctly from the moment it launches.",
  },
];

const HowTo = () => {
  return (
    <>
      <SEO
        title="How-To Guides"
        description="Step-by-step guides for domain setup, email configuration, scheduling, and website preparation. Get everything ready for a fast, smooth website build."
        canonical="/resources/how-to"
        keywords="domain setup guide, email configuration, scheduling setup, website preparation, how to guides"
      />
      <Navbar />
      <BackButton />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Step-by-Step Setup.{" "}
              <span className="text-gradient">No Guesswork.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              These guides help you prepare everything needed for a fast, smooth website build. Get the essentials in place so your project can move forward quickly and correctly.
            </p>
          </div>
        </section>

        {/* How-To Guide Grid */}
        <section className="pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">How-To Guides</h2>
              <p className="text-muted-foreground max-w-xl">
                Clear setup guidance that removes friction, shortens timelines, and keeps your website build on track.
              </p>
            </div>

            {/* Phase-based sections */}
            <div className="space-y-16">
              {phases.map((phase, phaseIndex) => (
                <div key={phase.label}>
                  {/* Phase label */}
                  <div className="mb-6 flex items-center gap-4">
                    <span className="text-xs font-medium tracking-wider text-primary/70 uppercase">
                      {phase.label}
                    </span>
                    <div className="flex-1 h-px bg-border/40" />
                  </div>

                  {/* Cards grid */}
                  <div className={`grid gap-6 ${
                    phase.guides.length === 4 
                      ? 'sm:grid-cols-2 lg:grid-cols-4' 
                      : 'sm:grid-cols-2'
                  }`}>
                    {phase.guides.map((guide) => (
                      <Link
                        key={guide.number}
                        to={`/resources/how-to/${guide.slug}`}
                        className={`group relative p-6 rounded-2xl border transition-all duration-300 flex flex-col h-full ${
                          guide.featured
                            ? 'border-primary/40 bg-primary/[0.03] hover:bg-primary/[0.06] hover:border-primary/60'
                            : phaseIndex === 2
                              ? 'border-border/30 bg-card/20 hover:bg-card/40 hover:border-border/50'
                              : 'border-border/40 bg-card/30 hover:bg-card/60 hover:border-border/60'
                        }`}
                      >
                        {guide.featured && (
                          <span className="absolute -top-2.5 left-4 px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase bg-primary text-primary-foreground rounded">
                            Recommended first
                          </span>
                        )}
                        <span className="text-xs font-mono text-primary/60 mb-4 block">
                          {guide.number}
                        </span>
                        <h3 className={`text-lg font-semibold mb-3 group-hover:text-primary transition-colors ${
                          phase.guides.length === 4 ? 'min-h-[3.5rem]' : ''
                        }`}>
                          {guide.title}
                        </h3>
                        <p className={`text-sm leading-relaxed mb-4 flex-grow ${
                          phaseIndex === 2 ? 'text-muted-foreground/80' : 'text-muted-foreground'
                        }`}>
                          {guide.description}
                        </p>
                        <span className={`inline-flex items-center text-sm transition-colors mt-auto ${
                          guide.featured
                            ? 'text-primary font-medium'
                            : 'text-primary/80 group-hover:text-primary'
                        }`}>
                          {guide.cta}
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What These Guides Help With */}
        <section className="pb-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-3xl border border-border/30 bg-card/20 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
                What These Guides Help With
              </h2>

              <div className="grid sm:grid-cols-2 gap-8">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1.5">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HowTo;
