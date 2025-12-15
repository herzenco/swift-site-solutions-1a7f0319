import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProjectPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "questions" | "contact" | "success";

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

export const ProjectPlanModal = ({ open, onOpenChange }: ProjectPlanModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("questions");
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
    
    // For hasWebsite question with "Yes" options, don't auto-advance (wait for URL input)
    const isWebsiteQuestion = questionId === "hasWebsite";
    const needsUrl = option.startsWith("Yes");
    
    if (isWebsiteQuestion && needsUrl) {
      // Don't auto-advance, wait for URL input
      return;
    }
    
    // Auto-advance to next question
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setStep("contact"), 300);
    }
  };

  const handleContinueWithUrl = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("contact");
    }
  };

  const handleBack = () => {
    if (step === "contact") {
      setStep("questions");
      setCurrentQuestion(questions.length - 1);
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const notes = `Business: ${formData.businessType}\nGoal: ${formData.primaryGoal}\nHas website: ${formData.hasWebsite}${formData.websiteUrl ? ` (${formData.websiteUrl})` : ""}\nChallenge: ${formData.biggestChallenge}\nTimeline: ${formData.timeline}\nPreference: ${formData.preference}`;

      const { error } = await supabase.from("leads").insert({
        full_name: formData.name,
        email: formData.email,
        notes: notes,
        source: "project_plan_modal",
      });

      if (error) throw error;

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

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation
    setTimeout(() => {
      setStep("questions");
      setCurrentQuestion(0);
      setFormData({
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
    }, 300);
  };

  const currentQ = questions[currentQuestion];
  const progress = step === "contact" ? 100 : ((currentQuestion + 1) / (questions.length + 1)) * 100;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border/50 p-0 overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {step === "questions" && (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                  <DialogTitle className="text-xl sm:text-2xl font-semibold">
                    {currentQ.question}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                  {currentQ.options.map((option) => (
                    <button
                      key={option}
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

                {/* URL input for website question when "Yes" option is selected */}
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
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                )}

                {currentQuestion > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
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
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-xl sm:text-2xl font-semibold">
                    Almost done. Where should we send your plan?
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground mt-2">
                    We'll review your answers and send a clear plan within 24 hours.
                  </DialogDescription>
                </DialogHeader>

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
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-8 h-8 text-primary" />
                </motion.div>

                <DialogTitle className="text-xl sm:text-2xl font-semibold mb-3">
                  Thanks. We're on it.
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  We'll review this and send your project plan within 24 hours.
                </DialogDescription>

                <Button
                  variant="outline"
                  className="mt-8"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};
