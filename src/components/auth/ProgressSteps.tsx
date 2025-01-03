import { Progress } from "@/components/ui/progress";

interface ProgressStepsProps {
  currentStep: number;
  totalSteps?: number;
}

const ProgressSteps = ({ currentStep, totalSteps = 4 }: ProgressStepsProps) => {
  return (
    <div className="w-full mb-8 flex gap-2 px-5">
      {[...Array(totalSteps)].map((_, index) => (
        <Progress 
          key={index}
          value={currentStep > index ? 100 : 0}
          className={`h-1 flex-1 ${
            currentStep > index 
              ? "bg-success/50 dark:bg-success/40" 
              : "bg-secondary dark:bg-secondary/20"
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressSteps;