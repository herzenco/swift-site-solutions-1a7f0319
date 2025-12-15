import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Phone, FileText, Rocket, CheckCircle2 } from "lucide-react";

interface HeroWorkflowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "process" | "form" | "success";

const processSteps = [
  {
    number: 1,
    title: "Discovery Call",
    description: "We gather all requirements for your website and system.",
    icon: Phone,
  },
  {
    number: 2,
    title: "Design Draft",
    description: "We design the first draft and send it to gather your feedback.",
    icon: FileText,
  },
  {
    number: 3,
    title: "Adjust & Deliver",
    description: "We refine based on feedback and deliver your finished site.",
    icon: Rocket,
  },
];

export const HeroWorkflowModal = ({ open, onOpenChange }: HeroWorkflowModalProps) => {
  const [step, setStep] = useState<Step>("process");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    website: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate brief delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    setIsSubmitting(false);
    setStep("success");
    
    // Redirect to Calendly after showing success
    setTimeout(() => {
      window.open("https://calendly.com/herzenco/website-consultation", "_blank");
      onOpenChange(false);
      // Reset for next time
      setStep("process");
      setFormData({ fullName: "", email: "", phone: "", website: "", notes: "" });
    }, 2000);
  };

  const handleClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      // Reset state when closing
      setTimeout(() => {
        setStep("process");
        setFormData({ fullName: "", email: "", phone: "", website: "", notes: "" });
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-background border-border">
        <AnimatePresence mode="wait">
          {step === "process" && (
            <motion.div
              key="process"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-foreground">
                  How We Work
                </DialogTitle>
                <p className="text-muted-foreground mt-2">
                  Our simple 3-step process to get you live.
                </p>
              </DialogHeader>

              <div className="space-y-4 mb-8">
                {processSteps.map((item, index) => (
                  <motion.div
                    key={item.number}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Step {item.number}: {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={() => setStep("form")}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-foreground">
                  Tell Us About You
                </DialogTitle>
                <p className="text-muted-foreground mt-2">
                  Quick details so we can prepare for your call.
                </p>
              </DialogHeader>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="John Smith"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Current Website (optional)</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yoursite.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Anything else we should know?</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Tell us about your business, goals, or any specific requirements..."
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Book Your Call"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </motion.div>
              
              <DialogTitle className="text-2xl font-bold text-foreground mb-3">
                You're All Set!
              </DialogTitle>
              <p className="text-muted-foreground">
                Redirecting you to schedule your discovery call...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
