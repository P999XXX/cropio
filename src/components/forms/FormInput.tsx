import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className={`h-auto py-2 text-[0.775rem] ${className}`}
            />
          </FormControl>
          {description && (
            <FormDescription className="text-xs">{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;