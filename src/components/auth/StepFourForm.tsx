import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useSignupStore } from "@/store/signupStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import BankingFields from "./form-sections/BankingFields";

const stepFourSchema = z.object({
  bankName: z.string()
    .min(3, "Bank name must be at least 3 characters")
    .regex(/^[a-zA-Z\s]{3,}$/, "Bank name must contain only letters and be at least 3 characters"),
  bankAddress: z.string().min(1, "Bank address is required"),
  bankAccountHolder: z.string().min(1, "Account holder name is required"),
  iban: z.string()
    .min(18, "IBAN must be at least 18 characters")
    .transform(val => val.toUpperCase())
    .refine(val => /^[A-Z0-9]+$/.test(val), "IBAN must contain only letters and numbers"),
  bic: z.string()
    .transform(val => val.toUpperCase())
    .refine(
      (value) => value.length === 8 || value.length === 11,
      "BIC/SWIFT must be exactly 8 or 11 characters"
    )
    .refine(val => /^[A-Z]+$/.test(val), "BIC/SWIFT must contain only uppercase letters"),
  currency: z.enum(["USD", "EUR"], {
    required_error: "Please select a currency",
  }),
});

export type StepFourFormData = z.infer<typeof stepFourSchema>;

interface StepFourFormProps {
  onSubmit: (values: StepFourFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const StepFourForm = ({ onSubmit, onBack, isLoading }: StepFourFormProps) => {
  const { formData, updateFormData } = useSignupStore();

  const form = useForm<StepFourFormData>({
    resolver: zodResolver(stepFourSchema),
    defaultValues: {
      bankName: formData.bankName || "",
      bankAddress: formData.bankAddress || "",
      bankAccountHolder: formData.bankAccountHolder || "",
      iban: formData.iban || "",
      bic: formData.bic || "",
      currency: formData.currency || "USD",
    },
  });

  const handleSubmit = (values: StepFourFormData) => {
    updateFormData(values);
    onSubmit(values);
  };

  return (
    <div className="space-y-6 pt-8 md:bg-card md:p-6 md:rounded-lg md:border md:border-border md:max-w-2xl md:mx-auto md:mt-8">
      <h3 className="text-lg font-semibold text-left md:text-center">Bank Information</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <BankingFields form={form} />

          <div className="space-y-3">
            <Label className="text-[0.775rem] text-foreground">Currency</Label>
            <RadioGroup
              defaultValue={form.getValues("currency")}
              onValueChange={(value) => form.setValue("currency", value as "USD" | "EUR")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="USD" id="usd" />
                <Label htmlFor="usd" className="cursor-pointer">US Dollar (USD)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="EUR" id="eur" />
                <Label htmlFor="eur" className="cursor-pointer">Euro (EUR)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between gap-3 pt-8">
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              className="w-full md:w-[48%]"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              className="w-full md:w-[48%]"
              disabled={isLoading}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StepFourForm;
