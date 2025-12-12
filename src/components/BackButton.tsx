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
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
    onClick?.(new MouseEvent("click") as any);
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      onClick={handleBack}
      className={cn(
        "fixed top-24 left-6 z-40 gap-2 text-muted-foreground hover:text-foreground",
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
