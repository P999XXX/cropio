import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import FormInput from "@/components/forms/FormInput";
import PasswordInput from "./PasswordInput";
import { ArrowLeft } from "lucide-react";

const stepTwoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
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
  const form = useForm<StepTwoFormData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Card className="md:min-w-[500px]">
      <CardHeader className="pb-2">
        <Button
          variant="ghost"
          className="w-fit h-8 px-2 mb-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <CardDescription>
          Complete your registration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
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
              name="companyName"
              label="Company Name"
              placeholder="Enter your company name"
            />

            <FormInput
              form={form}
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />

            <PasswordInput
              form={form}
              name="password"
              label="Password"
              description="Password must be at least 8 characters"
            />

            <PasswordInput
              form={form}
              name="confirmPassword"
              label="Confirm Password"
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center w-full text-muted-foreground">
          Already have an account?{" "}
          <a href="/signin" className="text-primary hover:underline font-medium">
            Sign in
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StepTwoForm;