import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "./PhoneInput";
import FormInput from "@/components/forms/FormInput";
import { ArrowLeft } from "lucide-react";

const stepTwoSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  companyName: z.string().min(5, "Company name must be at least 5 characters"),
  countryCode: z.string(),
  phoneNumber: z.string(),
});

export type StepTwoFormData = z.infer<typeof stepTwoSchema>;

interface StepTwoFormProps {
  onSubmit: (values: StepTwoFormData) => void;
  isLoading: boolean;
  onBack: () => void;
}

const StepTwoForm = ({ onSubmit, isLoading, onBack }: StepTwoFormProps) => {
  const form = useForm<StepTwoFormData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      countryCode: "+49",
      phoneNumber: "",
    },
  });

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    onBack();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          form={form}
          name="companyName"
          label="Company Name"
          placeholder="Enter company name"
        />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormInput
            form={form}
            name="firstName"
            label="First Name"
            placeholder="Enter first name"
          />
          <FormInput
            form={form}
            name="lastName"
            label="Last Name"
            placeholder="Enter last name"
          />
        </div>

        <PhoneInput form={form} />

        <div className="space-y-3">
          <Button type="submit" className="auth-button w-full">
            Continue
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StepTwoForm;