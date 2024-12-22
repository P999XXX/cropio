import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShoppingCart, Truck } from "lucide-react";

const stepTwoSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
  confirmPassword: z.string(),
  role: z.enum(["buyer", "supplier"]),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const stepOneSchema = z.object({
  role: z.enum(["buyer", "supplier"]),
});

export type SignUpFormData = z.infer<typeof stepTwoSchema>;

interface SignUpFormProps {
  onSubmit: (values: SignUpFormData) => Promise<void>;
  isLoading: boolean;
  step: 1 | 2;
  onRoleSelect?: (role: "buyer" | "supplier") => void;
  initialRole?: "buyer" | "supplier";
}

const SignUpForm = ({
  onSubmit,
  isLoading,
  step,
  onRoleSelect,
  initialRole,
}: SignUpFormProps) => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(step === 1 ? stepOneSchema : stepTwoSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: initialRole || "buyer",
      companyName: "",
    },
  });

  const handleStepOne = (data: { role: "buyer" | "supplier" }) => {
    if (onRoleSelect) {
      onRoleSelect(data.role);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(step === 1 ? handleStepOne : onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>I am a</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem
                        value="buyer"
                        className="peer sr-only"
                        id="buyer"
                      />
                    </FormControl>
                    <label
                      htmlFor="buyer"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <ShoppingCart className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Buyer</span>
                    </label>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem
                        value="supplier"
                        className="peer sr-only"
                        id="supplier"
                      />
                    </FormControl>
                    <label
                      htmlFor="supplier"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Truck className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">Supplier</span>
                    </label>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {step === 2 && (
          <>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {step === 1
            ? "Continue"
            : isLoading
            ? "Creating account..."
            : "Create account"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;