import { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import FormInput from "@/components/forms/FormInput";
import PhoneInput from "./PhoneInput";

const stepThreeSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyAddress: z.string().min(1, "Company address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  countryCode: z.string().min(1, "Country code is required"),
});

export type StepThreeFormData = z.infer<typeof stepThreeSchema>;

interface StepThreeFormProps {
  onSubmit: (values: StepThreeFormData) => Promise<void>;
  isLoading: boolean;
  onBack: () => void;
}

const StepThreeForm = ({ onSubmit, isLoading, onBack }: StepThreeFormProps) => {
  const isMobile = useIsMobile();
  const form = useForm<StepThreeFormData>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      companyName: "",
      companyAddress: "",
      phoneNumber: "",
      countryCode: "",
    },
  });

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          form={form}
          name="companyName"
          label="Company Name"
          placeholder="Enter your company name"
        />

        <FormInput
          form={form}
          name="companyAddress"
          label="Company Address"
          placeholder="Enter your company address"
        />

        <PhoneInput form={form} />

        <Button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4" 
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Continue"}
        </Button>
      </form>
    </Form>
  );

  return (
    <div className={`${isMobile ? 'rounded-lg step-three-form bg-background space-y-3' : 'rounded-lg step-three-form bg-card border border-border shadow-sm p-6'} ${isMobile ? 'step-three-form-mobile' : 'step-three-form-desktop md:min-w-[500px]'}`}>
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
        Company Information
      </CardDescription>
      {formContent}
    </div>
  );
};

export default StepThreeForm;