import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/forms/FormInput";
import { ArrowLeft, Upload } from "lucide-react";
import CurrencySwitcher from "../CurrencySwitcher";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const stepFourSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  bankAddress: z.string().min(1, "Bank address is required"),
  bankAccountHolder: z.string().min(1, "Account holder name is required"),
  iban: z.string().min(1, "IBAN is required"),
  bic: z.string().min(1, "BIC/SWIFT is required"),
  vatNumber: z.string().min(1, "VAT number is required"),
  taxNumber: z.string().min(1, "Tax number is required"),
  documents: z.any(),
});

export type StepFourFormData = z.infer<typeof stepFourSchema>;

interface StepFourFormProps {
  onSubmit: (values: StepFourFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const StepFourForm = ({ onSubmit, onBack, isLoading }: StepFourFormProps) => {
  const form = useForm<StepFourFormData>({
    resolver: zodResolver(stepFourSchema),
    defaultValues: {
      bankName: "",
      bankAddress: "",
      bankAccountHolder: "",
      iban: "",
      bic: "",
      vatNumber: "",
      taxNumber: "",
    },
  });

  return (
    <div className="space-y-6 bg-card p-6 rounded-lg border border-border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="space-y-2">
            <Label>Currency</Label>
            <CurrencySwitcher />
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

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              className="w-full sm:w-auto order-1 sm:order-2"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Complete Registration"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StepFourForm;