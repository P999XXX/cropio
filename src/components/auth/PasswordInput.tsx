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
import FormErrorMessage from "@/components/forms/FormErrorMessage";

interface PasswordInputProps {
  form: UseFormReturn<any>;
  name: string;
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
      render={({ field, fieldState }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-foreground text-sm font-medium">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder={`${name === "password" ? "Enter" : "Confirm"} your password`}
                type={showPassword ? "text" : "password"}
                className={`h-10 px-3 py-2 text-sm ${fieldState.error ? 'border-destructive' : ''} ${className}`}
                {...field}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </FormControl>
          <FormDescription className="text-xs text-muted-foreground">
            Password must be at least 8 characters and contain uppercase, lowercase, and numbers
          </FormDescription>
          <FormErrorMessage message={fieldState.error?.message} />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;