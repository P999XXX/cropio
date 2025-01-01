import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "default" | "lg";
  "aria-label"?: string;
}

const LoadingSpinner = ({ 
  className, 
  size = "default",
  "aria-label": ariaLabel = "Loading" 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <Loader2 
      className={cn(
        "animate-spin text-primary",
        sizeClasses[size],
        className
      )}
      aria-label={ariaLabel}
    />
  );
};

export default LoadingSpinner;