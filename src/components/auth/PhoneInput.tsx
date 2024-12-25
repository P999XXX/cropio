import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "./StepTwoForm";

interface PhoneInputProps {
  form: UseFormReturn<StepTwoFormData>;
}

const PhoneInput = ({ form }: PhoneInputProps) => {
  return (
    <div className="space-y-2">
      <FormLabel>Phone Number</FormLabel>
      <div className="flex gap-2">
        <FormField
          control={form.control}
          name="countryCode"
          render={({ field }) => (
            <FormItem className="w-[110px] shrink-0">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-gray-800 min-w-[120px]">
                  <SelectItem value="+49">DE (+49)</SelectItem>
                  <SelectItem value="+43">AT (+43)</SelectItem>
                  <SelectItem value="+41">CH (+41)</SelectItem>
                  <SelectItem value="+44">UK (+44)</SelectItem>
                  <SelectItem value="+1">US/CA (+1)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Enter phone number" type="tel" {...field} />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PhoneInput;