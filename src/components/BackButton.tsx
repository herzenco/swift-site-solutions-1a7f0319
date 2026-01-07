import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BackButtonProps extends React.ComponentProps<typeof Button> {}

export const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>((
  { className, onClick, ...props },
  ref,
) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // Navigate to parent route in URL hierarchy
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      pathSegments.pop();
      const parentPath = pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '/';
      navigate(parentPath);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="sticky top-[72px] z-40 bg-background/80 backdrop-blur-sm border-b border-border/30">
      <div className="container-tight px-4 sm:px-6 lg:px-8 py-2">
        <Button
          ref={ref}
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className={cn(
            "gap-1.5 text-muted-foreground hover:text-foreground -ml-2",
            className,
          )}
          {...props}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>
    </div>
  );
});

BackButton.displayName = "BackButton";
