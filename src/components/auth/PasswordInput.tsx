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
import { UseFormReturn, Path } from "react-hook-form";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

interface PasswordInputProps<T> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  description?: string;
  className?: string;
}

const PasswordInput = <T extends Record<string, any>>({ 
  form, 
  name, 
  label, 
  description, 
  className 
}: PasswordInputProps<T>) => {
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
                placeholder={`${String(name) === "password" ? "Enter" : "Confirm"} your password`}
                type={showPassword ? "text" : "password"}
                className={className}
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
          <FormErrorMessage message={form.formState.errors[name]?.message as string} />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;