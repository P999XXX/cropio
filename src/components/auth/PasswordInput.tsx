import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "./StepTwoForm";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

interface PasswordInputProps {
  form: UseFormReturn<StepTwoFormData>;
  name: "password" | "confirmPassword";
  label: string;
  description?: string;
  className?: string;
}

const PasswordInput = ({ form, name, label, description, className }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="!text-foreground">{label}</FormLabel>
          {description && (
            <FormDescription className="text-xs">{description}</FormDescription>
          )}
          <FormControl>
            <div className="relative">
              <Input
                placeholder={`${name === "password" ? "Enter" : "Confirm"} your password`}
                type={showPassword ? "text" : "password"}
                className={className}
                aria-invalid={!!form.formState.errors[name]}
                aria-describedby={`${name}-error`}
                {...field}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </FormControl>
          <FormErrorMessage 
            message={form.formState.errors[name]?.message} 
            id={`${name}-error`}
          />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;