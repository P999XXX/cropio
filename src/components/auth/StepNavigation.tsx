import { Check } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  steps: string[];
}

const StepNavigation = ({ currentStep, steps }: StepNavigationProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center border-2 
                ${
                  index + 1 < currentStep
                    ? "bg-primary border-primary text-primary-foreground"
                    : index + 1 === currentStep
                    ? "border-primary text-primary"
                    : "border-secondary text-muted-foreground"
                }`}
            >
              {index + 1 < currentStep ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <span className="text-xs">{index + 1}</span>
              )}
            </div>
            <span
              className={`text-[0.65rem] mt-1 whitespace-nowrap md:text-xs ${
                index + 1 === currentStep ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-6 md:w-10 h-[2px] mx-1 md:mx-2 ${
                index + 1 < currentStep ? "bg-primary" : "bg-secondary"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepNavigation;