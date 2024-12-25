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
                  <SelectItem value="+33">FR (+33)</SelectItem>
                  <SelectItem value="+39">IT (+39)</SelectItem>
                  <SelectItem value="+34">ES (+34)</SelectItem>
                  <SelectItem value="+31">NL (+31)</SelectItem>
                  <SelectItem value="+32">BE (+32)</SelectItem>
                  <SelectItem value="+45">DK (+45)</SelectItem>
                  <SelectItem value="+46">SE (+46)</SelectItem>
                  <SelectItem value="+47">NO (+47)</SelectItem>
                  <SelectItem value="+358">FI (+358)</SelectItem>
                  <SelectItem value="+48">PL (+48)</SelectItem>
                  <SelectItem value="+420">CZ (+420)</SelectItem>
                  <SelectItem value="+36">HU (+36)</SelectItem>
                  <SelectItem value="+30">GR (+30)</SelectItem>
                  <SelectItem value="+351">PT (+351)</SelectItem>
                  <SelectItem value="+353">IE (+353)</SelectItem>
                  <SelectItem value="+352">LU (+352)</SelectItem>
                  <SelectItem value="+40">RO (+40)</SelectItem>
                  <SelectItem value="+421">SK (+421)</SelectItem>
                  <SelectItem value="+386">SI (+386)</SelectItem>
                  <SelectItem value="+385">HR (+385)</SelectItem>
                  <SelectItem value="+359">BG (+359)</SelectItem>
                  <SelectItem value="+354">IS (+354)</SelectItem>
                  <SelectItem value="+356">MT (+356)</SelectItem>
                  <SelectItem value="+357">CY (+357)</SelectItem>
                  <SelectItem value="+372">EE (+372)</SelectItem>
                  <SelectItem value="+371">LV (+371)</SelectItem>
                  <SelectItem value="+370">LT (+370)</SelectItem>
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