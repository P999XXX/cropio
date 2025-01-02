import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../StepTwoForm";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import PersonalInfoFields from "./PersonalInfoFields";
import CompanyEmailFields from "./CompanyEmailFields";
import PhoneInput from "../PhoneInput";
import PasswordFields from "./PasswordFields";
import AgreementFields from "./AgreementFields";

interface StepTwoFormContentProps {
  form: UseFormReturn<StepTwoFormData>;
  onSubmit: (values: StepTwoFormData) => Promise<void>;
  isLoading: boolean;
}

const StepTwoFormContent = ({ form, onSubmit, isLoading }: StepTwoFormContentProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <PersonalInfoFields form={form} />
        <CompanyEmailFields form={form} />
        <PhoneInput form={form} />
        <PasswordFields form={form} />
        <AgreementFields form={form} />

        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4" 
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>

        <div className="text-sm text-center text-muted-foreground pt-2">
          Already have an account?{" "}
          <a href="/signin" className="text-primary hover:underline font-medium">
            Sign in
          </a>
        </div>
      </form>
    </Form>
  );
};

export default StepTwoFormContent;