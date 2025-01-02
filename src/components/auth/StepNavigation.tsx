import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StepNavigationProps {
  currentStep: number;
  steps: string[];
  onStepClick: (step: number) => void;
  canNavigateToStep?: (step: number) => boolean;
}

const StepNavigation = ({ 
  currentStep, 
  steps, 
  onStepClick,
  canNavigateToStep = (step) => step < currentStep 
}: StepNavigationProps) => {
  if (currentStep === 1) return null;
  
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isClickable = canNavigateToStep(stepNumber);
        
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn(
                  "w-[1.95rem] h-[1.95rem] p-0 rounded-full flex items-center justify-center border-2",
                  isClickable ? "cursor-pointer" : "cursor-not-allowed",
                  stepNumber < currentStep
                    ? "bg-primary border-primary text-primary-foreground hover:bg-primary/90"
                    : stepNumber === currentStep
                    ? "border-primary text-primary hover:bg-primary/10"
                    : "border-secondary text-muted-foreground hover:bg-secondary/10"
                )}
                onClick={() => isClickable && onStepClick(stepNumber)}
                disabled={!isClickable}
              >
                {stepNumber < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-sm">{stepNumber}</span>
                )}
              </Button>
              <span
                className={cn(
                  "text-[0.65rem] mt-1 whitespace-nowrap md:text-xs",
                  stepNumber === currentStep 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-6 md:w-10 h-[2px] mx-1 md:mx-2 -mt-5",
                  index + 1 < currentStep ? "bg-primary" : "bg-secondary"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepNavigation;