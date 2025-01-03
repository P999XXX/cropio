import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormErrorMessage from "./FormErrorMessage";

interface FormInputProps {
  form: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  description?: string;
  className?: string;
  rules?: Record<string, any>;
}

const FormInput = ({ 
  form, 
  name, 
  label, 
  placeholder, 
  type = "text", 
  description, 
  className,
  rules 
}: FormInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormItem className="space-y-1 mt-0">
          <FormLabel className="text-[0.775rem] text-foreground">{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className={`h-auto py-2 text-[0.875rem] ${fieldState.error ? 'border-destructive' : ''} ${className}`}
            />
          </FormControl>
          {description && (
            <FormDescription className="text-[0.775rem]">{description}</FormDescription>
          )}
          <FormErrorMessage message={fieldState.error?.message} />
        </FormItem>
      )}
    />
  );
};

export default FormInput;