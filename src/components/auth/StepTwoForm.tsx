import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PersonalFields from "./form-sections/PersonalFields";
import PasswordFields from "./form-sections/PasswordFields";
import AgreementFields from "./form-sections/AgreementFields";
import { useStepTwoForm } from "./hooks/useStepTwoForm";
import type { StepTwoFormData } from "./schemas/stepTwoSchema";

interface StepTwoFormProps {
  onSubmit: (values: StepTwoFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const StepTwoForm = ({ onSubmit, onBack, isLoading }: StepTwoFormProps) => {
  const { form, emailExists, handleSubmit } = useStepTwoForm(onSubmit);

  return (
    <div className="space-y-6 pt-8 md:bg-card md:p-6 md:rounded-lg md:border md:border-border md:max-w-2xl md:mx-auto md:mt-8">
      <h3 className="text-[1.25rem] font-semibold text-left md:text-center">Account Information</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <PersonalFields form={form} emailExists={emailExists} />
          <PasswordFields form={form} />
          <AgreementFields form={form} />

          <div className="flex flex-col-reverse md:flex-row md:justify-between gap-3 pt-8">
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              className="w-full text-[0.775rem]"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              className="w-full text-[0.775rem]"
              disabled={isLoading || emailExists}
            >
              {isLoading ? "Creating account..." : "Continue"}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StepTwoForm;
