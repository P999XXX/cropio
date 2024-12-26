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

const stepOneSchema = z.object({
  role: z.enum(["buyer", "supplier"]),
});

type StepOneFormData = z.infer<typeof stepOneSchema>;

interface StepOneFormProps {
  onSubmit: (role: "buyer" | "supplier") => void;
  onGoogleSignUp: () => void;
  onLinkedInSignUp: () => void;
}

const StepOneForm = ({
  onSubmit,
  onGoogleSignUp,
  onLinkedInSignUp,
}: StepOneFormProps) => {
  const form = useForm<StepOneFormData>({
    resolver: zodResolver(stepOneSchema),
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
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-transparent p-2 hover:border-primary hover:bg-transparent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-[#F8FEF5] [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-[#F8FEF5] dark:hover:border-primary dark:peer-data-[state=checked]:bg-primary/10 dark:[&:has([data-state=checked])]:bg-primary/10 w-full transition-colors"
                    >
                      <div className="mb-0.5 h-20 w-20 md:h-24 md:w-24 flex items-center justify-center">
                        <img 
                          src="/lovable-uploads/0aaa1e70-1712-4d31-a2b1-af6c7d6d14df.png" 
                          alt="Supplier" 
                          className="h-14 w-14 md:h-16 md:w-16"
                        />
                      </div>
                      <span className="text-sm font-medium">Supplier</span>
                    </label>
                  </FormItem>
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
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-transparent p-2 hover:border-primary hover:bg-transparent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-[#F8FEF5] [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-[#F8FEF5] dark:hover:border-primary dark:peer-data-[state=checked]:bg-primary/10 dark:[&:has([data-state=checked])]:bg-primary/10 w-full transition-colors"
                    >
                      <div className="mb-0.5 h-20 w-20 md:h-24 md:w-24 flex items-center justify-center">
                        <img 
                          src="/lovable-uploads/977f591c-307c-470a-a365-6a048c8b3e26.png" 
                          alt="Buyer" 
                          className="h-14 w-14 md:h-16 md:w-16"
                        />
                      </div>
                      <span className="text-sm font-medium">Buyer</span>
                    </label>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
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

export default StepOneForm;