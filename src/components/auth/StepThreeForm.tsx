import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/forms/FormInput";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PhoneInput from "./PhoneInput";
import CountrySelect from "./form-sections/CountrySelect";
import { useSignupStore } from "@/store/signupStore";

const stepThreeSchema = z.object({
  companyName: z.string()
    .min(3, "Company name must be at least 3 characters")
    .regex(/^[a-zA-Z\s]{3,}$/, "Company name must contain only letters and be at least 3 characters"),
  companyStreet: z.string()
    .min(3, "Street address must be at least 3 characters"),
  companyPostalCode: z.string()
    .min(1, "Postal code is required")
    .regex(/^\d+$/, "Postal code must contain only numbers"),
  companyPlace: z.string()
    .min(3, "Place must be at least 3 characters"),
  companyCountry: z.string()
    .min(1, "Country is required"),
  phoneNumber: z.string()
    .min(1, "Phone number is required"),
  countryCode: z.string()
    .min(1, "Country code is required"),
});

export type StepThreeFormData = z.infer<typeof stepThreeSchema>;

interface StepThreeFormProps {
  onSubmit: (values: StepThreeFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const StepThreeForm = ({ onSubmit, onBack, isLoading }: StepThreeFormProps) => {
  const { formData, updateFormData } = useSignupStore();

  const form = useForm<StepThreeFormData>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      companyName: formData.companyName || "",
      companyStreet: formData.companyStreet || "",
      companyPostalCode: formData.companyPostalCode || "",
      companyPlace: formData.companyPlace || "",
      companyCountry: formData.companyCountry || "",
      phoneNumber: formData.phoneNumber || "",
      countryCode: formData.countryCode || "",
    },
  });

  const handleSubmit = (values: StepThreeFormData) => {
    updateFormData(values);
    onSubmit(values);
  };

  return (
    <div className="space-y-6 md:bg-card md:p-6 md:rounded-lg md:border md:border-border md:max-w-2xl md:mx-auto">
      <h3 className="text-lg font-semibold text-left md:text-center">Company Information</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormInput
            form={form}
            name="companyName"
            label="Company Name"
            placeholder="Enter company name"
          />

          <FormInput
            form={form}
            name="companyStreet"
            label="Street and Number"
            placeholder="Enter street address"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              form={form}
              name="companyPostalCode"
              label="Postal Code"
              placeholder="Enter postal code"
            />
            <FormInput
              form={form}
              name="companyPlace"
              label="Place"
              placeholder="Enter city/place"
            />
          </div>

          <CountrySelect form={form} />

          <PhoneInput form={form} />

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4 pt-2">
            <Button 
              type="submit" 
              variant="primary"
              className="w-full sm:w-auto order-1 sm:order-2"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Continue"}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StepThreeForm;