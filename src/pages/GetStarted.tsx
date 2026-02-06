import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Check, Zap, Calendar, Bot } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { sendLeadToZapier } from "@/lib/zapier";
import { z } from "zod";

const createUUID = (): string => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = (globalThis as any).crypto;
    if (c?.randomUUID) return c.randomUUID();

    if (c?.getRandomValues) {
      const bytes = new Uint8Array(16);
      c.getRandomValues(bytes);
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;

      const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
      return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex
        .slice(6, 8)
        .join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 16).join("")}`;
    }
  } catch {
    // ignore
  }

  return `fallback-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const projectPlanContactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  websiteUrl: z.string().trim().max(255, "URL too long").optional(),
});

type Step = "intro" | "questions" | "contact" | "success";

interface FormData {
  businessType: string;
  primaryGoal: string;
  hasWebsite: string;
  websiteUrl: string;
  biggestChallenge: string;
  timeline: string;
  preference: string;
  name: string;
  email: string;
}

const questions = [
  {
    id: "businessType",
    question: "What type of business do you run?",
    options: [
      "Service business",
      "Real estate",
      "Local services",
      "Coaching / Consulting",
      "Other",
    ],
  },
  {
    id: "primaryGoal",
    question: "What's your primary goal for the website?",
    options: [
      "Book more calls",
      "Capture inquiries",
      "Automate follow-up",
      "Improve conversions",
      "Not sure yet",
    ],
  },
  {
    id: "hasWebsite",
    question: "Do you currently have a website?",
    options: [
      "No, starting fresh",
      "Yes, but it's outdated",
      "Yes, but it's not converting",
    ],
  },
  {
    id: "biggestChallenge",
    question: "What's your biggest challenge right now?",
    options: [
      "Manual follow-ups",
      "Missed leads",
      "No real system in place",
      "Poor design",
      "Not sure",
    ],
  },
  {
    id: "timeline",
    question: "When do you need to launch?",
    options: [
      "ASAP",
      "Within a month",
      "1–3 months",
      "Just exploring",
    ],
  },
  {
    id: "preference",
    question: "What best describes what you want?",
    options: [
      "Simple + reliable",
      "Automation + AI",
      "Growth + SEO",
      "Want a recommendation",
    ],
  },
];

const GetStarted = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    businessType: "",
    primaryGoal: "",
    hasWebsite: "",
    websiteUrl: "",
    biggestChallenge: "",
    timeline: "",
    preference: "",
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionSelect = (questionId: string, option: string) => {
    setFormData((prev) => ({ ...prev, [questionId]: option }));
    
    const isWebsiteQuestion = questionId === "hasWebsite";
    const needsUrl = option.startsWith("Yes");
    
    if (isWebsiteQuestion && needsUrl) {
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    } else {
      setStep("contact");
    }
  };

  const handleContinueWithUrl = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    } else {
      setStep("contact");
    }
  };

  const handleBack = () => {
    if (step === "contact") {
      setStep("questions");
      setCurrentQuestion(questions.length - 1);
    } else if (step === "questions" && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (step === "questions" && currentQuestion === 0) {
      setStep("intro");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const contactValidation = projectPlanContactSchema.safeParse({
        name: formData.name,
        email: formData.email,
        websiteUrl: formData.websiteUrl || undefined,
      });

      if (!contactValidation.success) {
        const firstError = contactValidation.error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
        return;
      }

      const leadId = createUUID();
      
      const questionnaireAnswers = {
        businessType: formData.businessType,
        primaryGoal: formData.primaryGoal,
        hasWebsite: formData.hasWebsite,
        websiteUrl: formData.websiteUrl || null,
        biggestChallenge: formData.biggestChallenge,
        timeline: formData.timeline,
        preference: formData.preference,
        submittedAt: new Date().toISOString(),
      };
      
      const notes = `Business: ${formData.businessType}\nGoal: ${formData.primaryGoal}\nHas website: ${formData.hasWebsite}${formData.websiteUrl ? ` (${formData.websiteUrl})` : ""}\nChallenge: ${formData.biggestChallenge}\nTimeline: ${formData.timeline}\nPreference: ${formData.preference}`;

      const leadScore = 
        (formData.timeline === "ASAP" ? 15 : formData.timeline === "Within a month" ? 10 : 5) +
        (formData.hasWebsite.startsWith("Yes") ? 5 : 10) +
        (formData.preference.includes("Automation") ? 10 : 5) +
        10;

      const leadPayload = {
        id: leadId,
        full_name: contactValidation.data.name,
        email: contactValidation.data.email,
        website: (contactValidation.data.websiteUrl || "").trim() ? contactValidation.data.websiteUrl : null,
        notes,
        source: "get_started_page",
        questionnaire_answers: questionnaireAnswers,
        intent_signals: {
          completedQuestionnaire: true,
          submittedAt: new Date().toISOString(),
        },
        lead_score: leadScore,
        qualification_status: leadScore >= 30 ? "warm" : "cool",
      };

      const { error } = await supabase.from("leads").insert(leadPayload);

      if (error && error.code !== "23505") throw error;

      sendLeadToZapier(error ? { ...leadPayload, id: undefined } : leadPayload);

      if (!error && formData.websiteUrl.trim()) {
        supabase.functions
          .invoke("enrich-lead", {
            body: { leadId, url: formData.websiteUrl.trim() },
          })
          .catch((err) => {
            console.error("Lead enrichment error:", err);
          });
      }

      setStep("success");
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = step === "intro" ? 0 : step === "contact" ? 100 : ((currentQuestion + 1) / (questions.length + 1)) * 100;

  return (
    <>
      <SEOHead
        title="Get Started"
        description="Answer a few quick questions and get a free project plan for your website. No sales pitch — just a clear plan tailored to your business."
        canonical="/get-started"
      />
      <Navbar />
      
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <div className="container max-w-3xl mx-auto px-4 py-12 md:py-20">
          {/* Progress bar */}
          {step !== "intro" && step !== "success" && (
            <div className="h-1 bg-muted rounded-full mb-8 overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-foreground">Let's build your </span>
                  <span className="text-gradient">lead-generating website</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  We build websites for service businesses that capture leads, book appointments, and follow up automatically. Launched in 5–10 days.
                </p>

                <Card className="bg-card/50 border-border/50 mb-10">
                  <CardContent className="p-6 sm:p-8">
                    <h2 className="text-lg font-semibold mb-6 text-foreground">What you'll get:</h2>
                    <div className="grid sm:grid-cols-3 gap-6 text-left">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Fast turnaround</p>
                          <p className="text-sm text-muted-foreground">Live in 5–10 days</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Built-in booking</p>
                          <p className="text-sm text-muted-foreground">Capture leads 24/7</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Auto follow-up</p>
                          <p className="text-sm text-muted-foreground">Never miss a lead</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => setStep("questions")}
                >
                  Start your project plan
                  <ArrowRight className="w-5 h-5" />
                </Button>
                
                <p className="mt-4 text-sm text-muted-foreground">
                  Takes about 60 seconds. No sales pitch.
                </p>
              </motion.div>
            )}

            {step === "questions" && (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6 sm:p-8">
                    <p className="text-sm text-muted-foreground mb-2">
                      Question {currentQuestion + 1} of {questions.length}
                    </p>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-foreground">
                      {currentQ.question}
                    </h2>

                    <div className="space-y-3">
                      {currentQ.options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleOptionSelect(currentQ.id, option)}
                          className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                            formData[currentQ.id as keyof FormData] === option
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border/50 bg-background/50 text-muted-foreground hover:border-primary/50 hover:bg-background"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {currentQ.id === "hasWebsite" && formData.hasWebsite.startsWith("Yes") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 space-y-3"
                      >
                        <Input
                          type="url"
                          placeholder="Enter your website URL (e.g., https://example.com)"
                          value={formData.websiteUrl}
                          onChange={(e) => setFormData((prev) => ({ ...prev, websiteUrl: e.target.value }))}
                          className="bg-background/50 border-border/50 h-12"
                        />
                        <Button
                          onClick={handleContinueWithUrl}
                          variant="hero"
                          className="w-full"
                          type="button"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    )}

                    <button
                      onClick={handleBack}
                      className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-foreground">
                      Almost done. Where should we send your plan?
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      We'll review your answers and send a clear plan within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                        className="bg-background/50 border-border/50 h-12"
                      />
                      <Input
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                        className="bg-background/50 border-border/50 h-12"
                      />

                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Get my project plan"}
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </form>

                    <button
                      onClick={handleBack}
                      className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8"
                >
                  <Check className="w-10 h-10 text-primary" />
                </motion.div>

                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-foreground">
                  Thanks. We're on it.
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  We'll review this and send your project plan within 24 hours.
                </p>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = "/"}
                >
                  Back to home
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default GetStarted;
