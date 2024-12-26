import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/forms/FormInput";
import { ArrowLeft } from "lucide-react";

const stepTwoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
});

export type StepTwoFormData = z.infer<typeof stepTwoSchema>;

interface StepTwoFormProps {
  onSubmit: (values: StepTwoFormData) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
}

const StepTwoForm = ({ onSubmit, onBack, isLoading }: StepTwoFormProps) => {
  const form = useForm<StepTwoFormData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="mb-2 -ml-4 h-8 bg-transparent hover:bg-transparent md:bg-[#F1F1F1] md:hover:bg-[#E5E5E5] dark:md:bg-secondary/20 dark:md:hover:bg-secondary/30"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <FormInput
          form={form}
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
        />

        <FormInput
          form={form}
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
        />

        <FormInput
          form={form}
          name="companyName"
          label="Company Name"
          placeholder="Enter your company name"
        />

        <Button type="submit" className="auth-button" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
};

export default StepTwoForm;