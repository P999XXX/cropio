import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/forms/FormInput";
import { ArrowLeft, ArrowRight, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignupStore } from "@/store/signupStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  vatNumber: z.string().min(1, "VAT number is required"),
  taxNumber: z.string().min(1, "Tax number is required"),
  documents: z.any(),
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
      vatNumber: formData.vatNumber || "",
      taxNumber: formData.taxNumber || "",
      currency: formData.currency || "USD",
    },
  });

  const handleSubmit = (values: StepFourFormData) => {
    updateFormData(values);
    onSubmit(values);
  };

  return (
    <div className="space-y-6 md:bg-card md:p-6 md:rounded-lg md:border md:border-border md:max-w-2xl md:mx-auto">
      <h3 className="text-lg font-semibold text-left md:text-center">Bank & Tax Information</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              form={form}
              name="bankName"
              label="Bank Name"
              placeholder="Enter bank name"
            />
            <FormInput
              form={form}
              name="bankAddress"
              label="Bank Address"
              placeholder="Enter bank address"
            />
          </div>

          <FormInput
            form={form}
            name="bankAccountHolder"
            label="Account Holder"
            placeholder="Enter account holder name"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              form={form}
              name="iban"
              label="IBAN"
              placeholder="Enter IBAN number"
            />
            <FormInput
              form={form}
              name="bic"
              label="BIC/SWIFT"
              placeholder="Enter BIC/SWIFT code"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              form={form}
              name="vatNumber"
              label="VAT Number"
              placeholder="Enter VAT number"
            />
            <FormInput
              form={form}
              name="taxNumber"
              label="Tax Number"
              placeholder="Enter tax number"
            />
          </div>

          <div className="space-y-3">
            <Label>Currency</Label>
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

          <div className="space-y-2">
            <Label>Company Documents</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4">
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                multiple
                className="hidden"
                id="company-documents"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  form.setValue('documents', files);
                }}
              />
              <label
                htmlFor="company-documents"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Upload company documents (VAT & Tax verification)
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  PDF, DOC, DOCX up to 10MB each
                </span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4 pt-2">
            <Button 
              type="submit" 
              variant="primary"
              className="w-full sm:w-auto order-1 sm:order-2"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Complete Registration"}
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

export default StepFourForm;