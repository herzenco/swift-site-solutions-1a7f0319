import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/BackButton";
import { ArrowRight, Clock, CheckCircle2, Zap, Target } from "lucide-react";

const guides = [
  { slug: "prepare-your-domain", number: "01", title: "How to Prepare Your Domain", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt." },
  { slug: "set-up-your-email", number: "02", title: "How to Set Up Your Email", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip." },
  { slug: "configure-scheduling", number: "03", title: "How to Configure Scheduling", description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat." },
  { slug: "plan-your-content", number: "04", title: "How to Plan Your Content", description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt." },
  { slug: "organize-your-forms", number: "05", title: "How to Organize Your Forms", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor." },
  { slug: "gather-your-assets", number: "06", title: "How to Gather Your Assets", description: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit." },
  { slug: "define-your-services", number: "07", title: "How to Define Your Services", description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit." },
  { slug: "prepare-for-launch", number: "08", title: "How to Prepare for Launch", description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet consectetur." },
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
        title="How-To Guides | Xyren Resources"
        description="Practical, step-by-step guidance for domains, websites, booking systems, and digital setup."
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
                Simple, actionable walkthroughs covering common setup steps and preparation tasks.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {guides.map((guide) => (
                <Link
                  key={guide.number}
                  to={`/resources/how-to/${guide.slug}`}
                  className="group relative p-6 rounded-2xl border border-border/40 bg-card/30 hover:bg-card/60 hover:border-border/60 transition-all duration-300"
                >
                  <span className="text-xs font-mono text-primary/60 mb-4 block">
                    {guide.number}
                  </span>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {guide.description}
                  </p>
                  <span className="inline-flex items-center text-sm text-primary/80 group-hover:text-primary transition-colors">
                    Read guide
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
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
