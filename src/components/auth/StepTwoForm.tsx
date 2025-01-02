import { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CardDescription } from "@/components/ui/card";
import PasswordInput from "./PasswordInput";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import FormInput from "@/components/forms/FormInput";

const stepTwoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type StepTwoFormData = z.infer<typeof stepTwoSchema>;

interface StepTwoFormProps {
  onSubmit: (values: StepTwoFormData) => Promise<void>;
  isLoading: boolean;
  onBack: () => void;
}

const StepTwoForm = ({ onSubmit, isLoading, onBack }: StepTwoFormProps) => {
  const isMobile = useIsMobile();
  const form = useForm<StepTwoFormData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
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
        </div>

        <FormInput
          form={form}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        <div className="space-y-3">
          <PasswordInput
            form={form}
            name="password"
            label="Password"
            description="Password must be at least 8 characters and contain uppercase, lowercase, and numbers"
          />
          <PasswordInput
            form={form}
            name="confirmPassword"
            label="Confirm Password"
          />
        </div>

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
    <div className={`${isMobile ? 'rounded-lg step-two-form bg-background space-y-3' : 'rounded-lg step-two-form bg-card border border-border shadow-sm p-6'} ${isMobile ? 'step-two-form-mobile' : 'step-two-form-desktop md:min-w-[500px]'}`}>
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
        Create your account
      </CardDescription>
      {formContent}
    </div>
  );
};

export default StepTwoForm;