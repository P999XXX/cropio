import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "./PasswordInput";
import AgreementCheckbox from "./AgreementCheckbox";
import PhoneInput from "./PhoneInput";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const stepTwoSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
  confirmPassword: z.string(),
  companyName: z.string().min(5, "Company name must be at least 5 characters"),
  countryCode: z.string(),
  phoneNumber: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  acceptPrivacy: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type StepTwoFormData = z.infer<typeof stepTwoSchema>;

interface StepTwoFormProps {
  onSubmit: (values: StepTwoFormData) => Promise<void>;
  isLoading: boolean;
}

const StepTwoForm = ({ onSubmit, isLoading }: StepTwoFormProps) => {
  const form = useForm<StepTwoFormData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      countryCode: "+49",
      phoneNumber: "",
      acceptTerms: false,
      acceptPrivacy: false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-foreground">Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormErrorMessage message={form.formState.errors.companyName?.message} />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-foreground">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormErrorMessage message={form.formState.errors.firstName?.message} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-foreground">Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormErrorMessage message={form.formState.errors.lastName?.message} />
              </FormItem>
            )}
          />
        </div>

        <PhoneInput form={form} />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-foreground">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormErrorMessage message={form.formState.errors.email?.message} />
            </FormItem>
          )}
        />

        <PasswordInput
          form={form}
          name="password"
          label="Password"
          description="Password must contain at least 8 characters, including uppercase, lowercase, and numbers"
        />

        <PasswordInput
          form={form}
          name="confirmPassword"
          label="Confirm Password"
        />

        <AgreementCheckbox
          form={form}
          name="acceptTerms"
          linkText="terms and conditions"
          linkHref="/terms"
        />

        <AgreementCheckbox
          form={form}
          name="acceptPrivacy"
          linkText="privacy policy"
          linkHref="/privacy"
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </Form>
  );
};

export default StepTwoForm;