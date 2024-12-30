import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AuthProviders from "./AuthProviders";
import { AlertCircle } from "lucide-react";
import { memo } from "react";

const stepOneSchema = z.object({
  role: z.enum(["buyer", "supplier"], {
    required_error: "Choose your role",
  }),
});

type StepOneFormData = z.infer<typeof stepOneSchema>;

interface StepOneFormProps {
  onSubmit: (role: "buyer" | "supplier") => void;
  onGoogleSignUp: () => void;
  onLinkedInSignUp: () => void;
}

// Preload and cache images
const SUPPLIER_IMAGE = "/lovable-uploads/0aaa1e70-1712-4d31-a2b1-af6c7d6d14df.png";
const BUYER_IMAGE = "/lovable-uploads/977f591c-307c-470a-a365-6a048c8b3e26.png";

// Preload images
const supplierImage = new Image();
supplierImage.src = SUPPLIER_IMAGE;
const buyerImage = new Image();
buyerImage.src = BUYER_IMAGE;

// Memoize the radio option component
const RadioOption = memo(({ 
  value, 
  imageSrc, 
  label 
}: { 
  value: string; 
  imageSrc: string; 
  label: string;
}) => (
  <FormItem>
    <FormControl>
      <RadioGroupItem
        value={value}
        className="peer sr-only"
        id={value}
      />
    </FormControl>
    <label
      htmlFor={value}
      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-transparent p-2 hover:border-primary hover:bg-transparent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-[#F8FEF5] [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-[#F8FEF5] dark:hover:border-primary dark:peer-data-[state=checked]:bg-primary/10 dark:[&:has([data-state=checked])]:bg-primary/10 w-full transition-colors"
    >
      <div className="mb-0.5 h-20 w-20 md:h-24 md:w-24 flex items-center justify-center">
        <img 
          src={imageSrc}
          alt={label}
          className="h-14 w-14 md:h-16 md:w-16 dark:invert"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={64}
          height={64}
        />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </label>
  </FormItem>
));

RadioOption.displayName = 'RadioOption';

const StepOneForm = ({
  onSubmit,
  onGoogleSignUp,
  onLinkedInSignUp,
}: StepOneFormProps) => {
  const form = useForm<StepOneFormData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      role: undefined,
    },
  });

  const handleSubmit = (data: StepOneFormData) => {
    onSubmit(data.role);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-2"
                >
                  <RadioOption value="supplier" imageSrc={SUPPLIER_IMAGE} label="Supplier" />
                  <RadioOption value="buyer" imageSrc={BUYER_IMAGE} label="Buyer" />
                </RadioGroup>
              </FormControl>
              <div className="text-center text-sm text-destructive flex items-center justify-center gap-x-1">
                {form.formState.errors.role && (
                  <>
                    <AlertCircle className="h-3.5 w-3.5" />
                    <FormMessage />
                  </>
                )}
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="auth-button">
          Continue
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <AuthProviders
          onGoogleSignUp={onGoogleSignUp}
          onLinkedInSignUp={onLinkedInSignUp}
          selectedRole={form.watch("role")}
        />
      </form>
    </Form>
  );
};

export default memo(StepOneForm);