import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SEO } from "@/components/SEO";
import { BackButton } from "@/components/BackButton";
import { ArrowLeft, ArrowRight } from "lucide-react";

const guides = [
  { slug: "prepare-your-domain", number: "01", title: "How to Prepare Your Domain" },
  { slug: "set-up-your-email", number: "02", title: "How to Set Up Your Email" },
  { slug: "configure-scheduling", number: "03", title: "How to Configure Scheduling" },
  { slug: "plan-your-content", number: "04", title: "How to Plan Your Content" },
  { slug: "organize-your-forms", number: "05", title: "How to Organize Your Forms" },
  { slug: "gather-your-assets", number: "06", title: "How to Gather Your Assets" },
  { slug: "define-your-services", number: "07", title: "How to Define Your Services" },
  { slug: "prepare-for-launch", number: "08", title: "How to Prepare for Launch" },
];

const HowToGuide = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const currentIndex = guides.findIndex((g) => g.slug === slug);
  const guide = guides[currentIndex];
  
  const prevGuide = currentIndex > 0 ? guides[currentIndex - 1] : null;
  const nextGuide = currentIndex < guides.length - 1 ? guides[currentIndex + 1] : null;

  if (!guide) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Guide not found</h1>
            <Link to="/resources/how-to" className="text-primary hover:underline">
              Back to How-To Guides
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Generate unique descriptions based on guide
  const guideDescriptions: Record<string, string> = {
    "prepare-your-domain": "Learn how to prepare your domain for a new website. Step-by-step guidance on DNS settings and domain configuration.",
    "set-up-your-email": "Configure professional email for your business website. Complete guide to email setup and best practices.",
    "configure-scheduling": "Set up automated scheduling for your website. Learn to integrate calendars and booking systems.",
    "plan-your-content": "Plan and organize content for your new website. Guidelines for effective copywriting and structure.",
    "organize-your-forms": "Design and set up forms that convert visitors into leads. Best practices for form optimization.",
    "gather-your-assets": "Collect and prepare images, logos, and brand assets for your website build.",
    "define-your-services": "Structure your service offerings for maximum clarity and conversion on your website.",
    "prepare-for-launch": "Final checklist and preparation steps before launching your new website.",
  };

  const guideDescription = guideDescriptions[guide.slug] || "Practical, step-by-step guidance for your website setup.";

  return (
    <>
      <SEO
        title={guide.title}
        description={guideDescription}
        canonical={`/resources/how-to/${guide.slug}`}
        keywords={`${guide.title.replace("How to ", "")}, website setup, guide`}
      />
      <Navbar />
      <BackButton />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-32 pb-12 px-4">
          <div className="max-w-3xl mx-auto">
            <Link 
              to="/resources/how-to" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              All How-To Guides
            </Link>
            
            <span className="text-sm font-mono text-primary/60 block mb-4">
              Guide {guide.number}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {guide.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="pb-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>Overview</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              
              <h2>Step 1: Getting Started</h2>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </p>
              <ul>
                <li>Lorem ipsum dolor sit amet consectetur</li>
                <li>Adipiscing elit sed do eiusmod tempor</li>
                <li>Incididunt ut labore et dolore magna</li>
              </ul>

              <h2>Step 2: Configuration</h2>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
              </p>

              <h2>Step 3: Final Steps</h2>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="pb-24 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between gap-4 pt-8 border-t border-border/40">
              {prevGuide ? (
                <Link
                  to={`/resources/how-to/${prevGuide.slug}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                  <div className="text-left">
                    <span className="text-xs block mb-0.5">Previous</span>
                    <span className="text-sm font-medium text-foreground">{prevGuide.title}</span>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              
              {nextGuide ? (
                <Link
                  to={`/resources/how-to/${nextGuide.slug}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-right"
                >
                  <div>
                    <span className="text-xs block mb-0.5">Next</span>
                    <span className="text-sm font-medium text-foreground">{nextGuide.title}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HowToGuide;
