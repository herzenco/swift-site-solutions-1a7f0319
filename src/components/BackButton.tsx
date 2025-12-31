import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BackButtonProps extends React.ComponentProps<typeof Button> {}

export const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>((
  { className, onClick, ...props },
  ref,
) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Always send users back to the homepage for use-case pages
    navigate("/");
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      onClick={handleBack}
      className={cn(
        "fixed top-20 left-4 md:top-24 md:left-6 z-40 gap-2 text-muted-foreground hover:text-foreground bg-background/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none",
        className,
      )}
      {...props}
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </Button>
  );
});

BackButton.displayName = "BackButton";
