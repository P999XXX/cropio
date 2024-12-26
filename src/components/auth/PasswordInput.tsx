import { useState } from "react";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "./StepTwoForm";

interface PasswordInputProps {
  form: UseFormReturn<StepTwoFormData>;
  name: "password" | "confirmPassword";
  label: string;
  description?: string;
}

const PasswordInput = ({ form, name, label, description }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="!text-foreground">{label}</FormLabel>
          {description && (
            <FormDescription className="text-xs">{description}</FormDescription>
          )}
          <FormControl>
            <div className="relative">
              <Input
                placeholder={`${name === "password" ? "Enter" : "Confirm"} your password`}
                type={showPassword ? "text" : "password"}
                {...field}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage className="text-[10px] text-destructive flex items-center gap-1">
            {form.formState.errors[name]?.message && (
              <>
                <AlertTriangle className="h-3 w-3" />
                <span>{form.formState.errors[name]?.message}</span>
              </>
            )}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;