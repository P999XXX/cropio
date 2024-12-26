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
import { ShoppingCart, Truck } from "lucide-react";
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
    defaultValues: {
      role: "buyer",
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
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
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-transparent p-4 hover:border-primary hover:bg-transparent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary w-full"
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
                      className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-transparent p-4 hover:border-primary hover:bg-transparent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary w-full"
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

        <Button type="submit" className="w-full">
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