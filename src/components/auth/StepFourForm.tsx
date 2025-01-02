import { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CardDescription } from "@/components/ui/card";
import { ArrowLeft, Upload } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import FormInput from "@/components/forms/FormInput";
import { CurrencySwitcher } from "../CurrencySwitcher";

const stepFourSchema = z.object({
  bankDetails: z.object({
    accountName: z.string().min(1, "Account name is required"),
    accountNumber: z.string().min(1, "Account number is required"),
    bankName: z.string().min(1, "Bank name is required"),
    swiftCode: z.string().min(1, "SWIFT/BIC code is required"),
  }),
  vatNumber: z.string().min(1, "VAT number is required"),
  taxNumber: z.string().min(1, "Tax number is required"),
  documents: z.object({
    vatDocument: z.any(),
    taxDocument: z.any(),
  }),
});

export type StepFourFormData = z.infer<typeof stepFourSchema>;

interface StepFourFormProps {
  onSubmit: (values: StepFourFormData) => Promise<void>;
  isLoading: boolean;
  onBack: () => void;
}

const StepFourForm = ({ onSubmit, isLoading, onBack }: StepFourFormProps) => {
  const isMobile = useIsMobile();
  const form = useForm<StepFourFormData>({
    resolver: zodResolver(stepFourSchema),
    defaultValues: {
      bankDetails: {
        accountName: "",
        accountNumber: "",
        bankName: "",
        swiftCode: "",
      },
      vatNumber: "",
      taxNumber: "",
      documents: {
        vatDocument: null,
        taxDocument: null,
      },
    },
  });

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Bank Details</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <FormInput
              form={form}
              name="bankDetails.accountName"
              label="Account Name"
              placeholder="Enter account name"
            />
            <FormInput
              form={form}
              name="bankDetails.accountNumber"
              label="Account Number"
              placeholder="Enter account number"
            />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <FormInput
              form={form}
              name="bankDetails.bankName"
              label="Bank Name"
              placeholder="Enter bank name"
            />
            <FormInput
              form={form}
              name="bankDetails.swiftCode"
              label="SWIFT/BIC Code"
              placeholder="Enter SWIFT/BIC code"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Tax Information</h3>
          <div className="grid gap-3 md:grid-cols-2">
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
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Documents</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">VAT Document</label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById('vatDocument')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload VAT Document
                </Button>
                <input
                  id="vatDocument"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      form.setValue('documents.vatDocument', file);
                    }
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tax Document</label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById('taxDocument')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Tax Document
                </Button>
                <input
                  id="taxDocument"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      form.setValue('documents.taxDocument', file);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4" 
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );

  return (
    <div className={`${isMobile ? 'rounded-lg step-four-form bg-background space-y-3' : 'rounded-lg step-four-form bg-card border border-border shadow-sm p-6'} ${isMobile ? 'step-four-form-mobile' : 'step-four-form-desktop md:min-w-[500px]'}`}>
      <Button
        variant="ghost"
        size="fit"
        className="text-foreground hover:bg-transparent hover:text-foreground/80 p-0"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </Button>
      <CardDescription className="text-muted-foreground mb-5">
        Financial Information
      </CardDescription>
      {formContent}
    </div>
  );
};

export default StepFourForm;