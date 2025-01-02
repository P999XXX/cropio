import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/forms/FormInput";
import { ArrowLeft } from "lucide-react";
import PhoneInput from "./PhoneInput";
import CountrySelect from "./form-sections/CountrySelect";

const stepThreeSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyStreet: z.string().min(1, "Street address is required"),
  companyPostalCode: z.string().min(1, "Postal code is required"),
  companyPlace: z.string().min(1, "Place is required"),
  companyCountry: z.string().min(1, "Country is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  countryCode: z.string().min(1, "Country code is required"),
});

export type StepThreeFormData = z.infer<typeof stepThreeSchema>;

interface StepThreeFormProps {
  onSubmit: (values: StepThreeFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const StepThreeForm = ({ onSubmit, onBack, isLoading }: StepThreeFormProps) => {
  const form = useForm<StepThreeFormData>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      companyName: "",
      companyStreet: "",
      companyPostalCode: "",
      companyPlace: "",
      companyCountry: "",
      phoneNumber: "",
      countryCode: "",
    },
  });

  return (
    <div className="space-y-6 bg-card p-6 rounded-lg border border-border">
      <Button
        variant="ghost"
        size="sm"
        className="text-foreground hover:bg-transparent hover:text-foreground/80 p-0"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </Button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            form={form}
            name="companyName"
            label="Company Name"
            placeholder="Enter company name"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              form={form}
              name="companyStreet"
              label="Street and Number"
              placeholder="Enter street address"
            />
            <FormInput
              form={form}
              name="companyPostalCode"
              label="Postal Code"
              placeholder="Enter postal code"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              form={form}
              name="companyPlace"
              label="Place"
              placeholder="Enter city/place"
            />
            <CountrySelect form={form} />
          </div>

          <PhoneInput form={form} />

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StepThreeForm;