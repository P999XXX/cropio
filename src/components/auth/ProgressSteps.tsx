import { Progress } from "@/components/ui/progress";

interface ProgressStepsProps {
  currentStep: number;
  totalSteps?: number;
}

const ProgressSteps = ({ currentStep, totalSteps = 4 }: ProgressStepsProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <Progress 
        value={progress} 
        className="h-1 bg-secondary dark:bg-secondary/20"
      />
    </div>
  );
};

export default ProgressSteps;