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
    "prepare-your-domain": "Your domain is the foundation of your website. Learn how to prepare it correctly for a faster launch and smoother handoff.",
    "set-up-your-email": "Configure professional email for your business website. Complete guide to email setup and best practices.",
    "configure-scheduling": "Set up automated scheduling for your website. Learn to integrate calendars and booking systems.",
    "plan-your-content": "Plan and organize content for your new website. Guidelines for effective copywriting and structure.",
    "organize-your-forms": "Design and set up forms that convert visitors into leads. Best practices for form optimization.",
    "gather-your-assets": "Collect and prepare images, logos, and brand assets for your website build.",
    "define-your-services": "Structure your service offerings for maximum clarity and conversion on your website.",
    "prepare-for-launch": "Final checklist and preparation steps before launching your new website.",
  };

  const guideDescription = guideDescriptions[guide.slug] || "Practical, step-by-step guidance for your website setup.";

  // Guide content mapping
  const guideContent: Record<string, React.ReactNode> = {
    "prepare-your-domain": (
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Before we can launch your website, you'll need access to your domain (yourwebsite.com). This does not mean you need technical expertise or to configure anything yourself. It simply ensures you own the domain and can connect it when your site is ready.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            If you already have a domain, great. If not, we'll help you choose and purchase one correctly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step 1: Choose Your Domain</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">If you don't already own a domain, start here.</p>
          
          <h3 className="text-lg font-semibold mb-3">Best practices:</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
            <li>Keep it simple and readable</li>
            <li>Avoid hyphens, numbers, or extra words</li>
            <li>Use .com whenever possible</li>
            <li>Match your business name or primary service</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-3">Examples</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>smithconstruction.com</li>
            <li>atlasadvisory.com</li>
            <li>greenvalleylandscaping.com</li>
          </ul>
          
          <p className="text-muted-foreground leading-relaxed">
            If your exact name isn't available, we recommend small, intentional variations rather than forcing complexity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step 2: Purchase the Domain</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">We recommend using one of the following registrars:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Google Domains</li>
            <li>Namecheap</li>
            <li>GoDaddy</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Purchase the domain under your name or business, not a third party. This ensures you retain full ownership.
          </p>
          <p className="text-muted-foreground leading-relaxed bg-muted/50 p-4 rounded-lg">
            <span className="font-semibold">Tip:</span> Domain purchases typically cost $10–$20 per year.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step 3: Ensure You Have Login Access</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Once purchased, make sure you can log in to your domain provider.</p>
          <p className="text-muted-foreground leading-relaxed mb-3">You will need:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>The email address tied to the account</li>
            <li>The account password</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-3">
            If someone else (a previous developer, agency, or employee) purchased the domain for you, ask them to either:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Transfer ownership, or</li>
            <li>Grant you admin access</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed font-medium">Without this, we can't connect your site.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step 4: Do Not Change DNS Settings Yet</h2>
          <p className="text-muted-foreground leading-relaxed mb-4 font-medium">This is important.</p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            <li className="flex items-center gap-2">
              <span className="text-destructive">❌</span> Do not edit DNS records
            </li>
            <li className="flex items-center gap-2">
              <span className="text-destructive">❌</span> Do not point the domain anywhere
            </li>
            <li className="flex items-center gap-2">
              <span className="text-destructive">❌</span> Do not try to "connect" it yourself
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            We'll handle all technical configuration when your site is ready to go live. Making changes early can cause downtime or delays.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step 5: Share Access When Requested</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When your website is complete and ready for launch, we'll ask for temporary access or specific DNS permissions.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">At that point, we will:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Connect the domain</li>
            <li>Verify security (SSL)</li>
            <li>Ensure everything works correctly before going live</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed font-medium">You remain the owner of the domain at all times.</p>
        </section>

        <section className="bg-muted/30 p-6 rounded-xl border border-border/50">
          <h2 className="text-2xl font-bold mb-4">Final Checklist</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Before we begin building, make sure you can check these off:</p>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-center gap-3">
              <span className="text-primary">✓</span> Domain name chosen
            </li>
            <li className="flex items-center gap-3">
              <span className="text-primary">✓</span> Domain purchased under your ownership
            </li>
            <li className="flex items-center gap-3">
              <span className="text-primary">✓</span> Login access confirmed
            </li>
            <li className="flex items-center gap-3">
              <span className="text-primary">✓</span> No DNS changes made
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-6 font-medium">
            Once this is done, you're ready to move forward without delays.
          </p>
        </section>
      </div>
    ),
    "set-up-your-email": (
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Before launching your website, you'll need a professional email address connected to your domain (for example: hello@yourbusiness.com).
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">This email will be used for:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Lead notifications</li>
            <li>Booking confirmations</li>
            <li>Internal alerts from your website</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            You don't need to configure servers or understand email infrastructure. You just need an active inbox and access.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step 1: Decide Which Email You'll Use</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We strongly recommend using a domain-based email address instead of Gmail, Yahoo, or Outlook.
          </p>
          
          <h3 className="text-lg font-semibold mb-3">Good examples</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
            <li>hello@yourbusiness.com</li>
            <li>info@yourbusiness.com</li>
            <li>contact@yourbusiness.com</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-3">Avoid</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Personal emails</li>
            <li>Temporary inboxes</li>
            <li>Shared logins without access control</li>
          </ul>
          
          <p className="text-muted-foreground leading-relaxed">
            If you already have a business email, great. If not, continue to the next step.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step 2: Choose an Email Provider</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">We recommend one of the following:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Google Workspace (most common)</li>
            <li>Microsoft 365</li>
            <li>Zoho Mail</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Google Workspace is preferred for reliability, deliverability, and ease of integration.
          </p>
          <p className="text-muted-foreground leading-relaxed bg-muted/50 p-4 rounded-lg">
            <span className="font-semibold">Tip:</span> Email plans typically cost $6–$12 per month.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step 3: Create the Inbox</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Once you choose a provider:</p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
            <li>Create the email address you want to use</li>
            <li>Make sure you can send and receive emails</li>
            <li>Confirm you have login access</li>
          </ol>
          <p className="text-muted-foreground leading-relaxed font-medium">
            At this stage, you do not need to connect anything to the website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step 4: Keep Your Email Simple</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You don't need to configure anything for your website.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">Do not:</p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            <li className="flex items-center gap-2">
              <span className="text-destructive">❌</span> Set up SMTP or email servers
            </li>
            <li className="flex items-center gap-2">
              <span className="text-destructive">❌</span> Connect forms manually
            </li>
            <li className="flex items-center gap-2">
              <span className="text-destructive">❌</span> Create forwarding rules or automations
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Just make sure your inbox is active and receiving emails.
          </p>
          <p className="text-muted-foreground leading-relaxed font-medium">
            Your website will handle the rest without custom email setup.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step 5: Share Access When Requested</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When your site is ready to go live, we'll ask for one of the following:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Temporary email login access, or</li>
            <li>App-specific credentials provided by your email provider</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-3">We will:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Connect website forms</li>
            <li>Configure notifications</li>
            <li>Verify delivery and reliability</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed font-medium">You keep full control of the inbox at all times.</p>
        </section>

        <section className="bg-muted/30 p-6 rounded-xl border border-border/50">
          <h2 className="text-2xl font-bold mb-4">Final Checklist</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Before launch, make sure the following are complete:</p>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-center gap-3">
              <span className="text-primary">✓</span> Business email address created
            </li>
            <li className="flex items-center gap-3">
              <span className="text-primary">✓</span> Inbox can send and receive messages
            </li>
            <li className="flex items-center gap-3">
              <span className="text-primary">✓</span> Login access available
            </li>
            <li className="flex items-center gap-3">
              <span className="text-primary">✓</span> No manual configuration done
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-6 font-medium">
            Once this is complete, your website will be able to capture and deliver inquiries without issues.
          </p>
        </section>
      </div>
    ),
    "configure-scheduling": (
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Your website uses scheduling to convert serious inquiries into booked conversations automatically.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You won't be setting up software or connecting tools yourself. Instead, you'll define how you want meetings to work, and we'll handle the technical setup as part of your site.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">By the end of this guide, you'll know:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>What type of meetings your site should allow</li>
            <li>When people can book</li>
            <li>How much context you want before a meeting is confirmed</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step 1: Decide What Can Be Booked</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Start by defining what kind of appointment visitors should be able to schedule.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">Most businesses choose one primary option, such as:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Discovery Call</li>
            <li>Initial Consultation</li>
            <li>Estimate or Strategy Session</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Avoid offering multiple booking types unless absolutely necessary. A single, clear option converts better and keeps scheduling simple.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">Ask yourself:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>What is the first conversation I want to have with a new lead?</li>
            <li>How long does that conversation usually take?</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step 2: Set Your Availability Rules</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Next, decide when people are allowed to book time with you.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You don't need to be overly specific, just clear.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">Consider:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Days of the week you're available</li>
            <li>General time windows (for example, mornings only)</li>
            <li>Buffer time between meetings, if needed</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Your website will only show availability that fits these rules. You stay in control of your calendar.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step 3: Choose the Right Meeting Length</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Shorter meetings reduce friction and increase show-up rates.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">Common options:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>15 minutes for quick qualification</li>
            <li>30 minutes for standard discovery</li>
            <li>45–60 minutes for higher-consideration services</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed font-medium">
            Pick the shortest length that still allows a productive conversation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step 4: Decide What You Need to Know Before the Call</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Before a meeting is confirmed, your site can collect key details from the visitor.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">Typical questions include:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>What are you looking to accomplish?</li>
            <li>What problem are you trying to solve?</li>
            <li>Timeline or urgency</li>
            <li>Budget range (optional)</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            This ensures conversations are productive and prevents unqualified calls from reaching your calendar.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Step 5: What Happens Next</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Once you've made these decisions, you're done.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">We'll:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
            <li>Configure the scheduling system</li>
            <li>Connect it to your website</li>
            <li>Ensure bookings flow smoothly into your calendar</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            You don't need to install software or manage integrations. Scheduling will be fully handled as part of your site build.
          </p>
        </section>

        <section className="bg-muted/30 p-6 rounded-xl border border-border/50">
          <h2 className="text-2xl font-bold mb-4">Final Note</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Your website isn't just booking time — it's protecting your time.
          </p>
          <p className="text-muted-foreground leading-relaxed font-medium">
            Clear rules, thoughtful qualification, and controlled availability create better conversations and better outcomes.
          </p>
        </section>
      </div>
    ),
  };

  const defaultContent = (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-muted-foreground leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Step 1: Getting Started</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Lorem ipsum dolor sit amet consectetur</li>
          <li>Adipiscing elit sed do eiusmod tempor</li>
          <li>Incididunt ut labore et dolore magna</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Step 2: Configuration</h2>
        <p className="text-muted-foreground leading-relaxed">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Step 3: Final Steps</h2>
        <p className="text-muted-foreground leading-relaxed">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.
        </p>
      </section>
    </div>
  );

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
              {guide.slug === "prepare-your-domain" 
                ? "Your domain is the foundation of your website. Getting it set up correctly before we begin ensures a faster launch, fewer delays, and a smoother handoff once your site is live."
                : guide.slug === "set-up-your-email"
                ? "Your website relies on email to deliver inquiries, booking confirmations, and notifications. Setting this up correctly ensures nothing gets missed and your system works reliably from day one."
                : guide.slug === "configure-scheduling"
                ? "Scheduling is one of the most important parts of your website. It determines who gets through, when they book, and how prepared they are before you speak."
                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              {guide.slug === "prepare-your-domain" 
                ? "This guide walks you through exactly what you need to do—and what you don't need to worry about—before we start building."
                : guide.slug === "set-up-your-email"
                ? "This guide explains what you need, what to avoid, and how we'll help once your site is ready."
                : guide.slug === "configure-scheduling"
                ? "This guide walks you through the decisions you'll make so we can configure scheduling correctly during your build."
                : null}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="pb-16 px-4">
          <div className="max-w-3xl mx-auto">
            {guideContent[guide.slug] || defaultContent}
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
