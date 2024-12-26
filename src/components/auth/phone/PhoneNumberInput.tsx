import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "@/types/auth";
import { AsYouType, CountryCode } from 'libphonenumber-js';
import { countryToDigits, countryToExample } from "./countryData";
import { AlertTriangle } from "lucide-react";

interface PhoneNumberInputProps {
  form: UseFormReturn<StepTwoFormData>;
  selectedCountry: CountryCode;
}

const PhoneNumberInput = ({ form, selectedCountry }: PhoneNumberInputProps) => {
  const requiredDigits = countryToDigits[selectedCountry] || 10;

  const handlePhoneNumberChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    const limitedDigits = digitsOnly.slice(0, requiredDigits);
    const formatter = new AsYouType(selectedCountry);
    const formattedNumber = formatter.input(limitedDigits);
    form.setValue('phoneNumber', formattedNumber);
  };

  return (
    <FormItem className="flex-1">
      <FormControl>
        <Input 
          placeholder={`Example: ${countryToExample[selectedCountry] || '1234567890'}`}
          type="tel"
          {...form.register('phoneNumber', {
            validate: (value) => {
              const digitsOnly = value.replace(/\D/g, '');
              return digitsOnly.length === requiredDigits || 
                `Phone number must be exactly ${requiredDigits} digits for ${selectedCountry}`;
            }
          })}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
        />
      </FormControl>
      <FormMessage className="text-[11px] text-destructive flex items-center gap-1">
        {form.formState.errors.phoneNumber?.message && (
          <>
            <AlertTriangle className="h-3 w-3" />
            <span>{form.formState.errors.phoneNumber?.message}</span>
          </>
        )}
      </FormMessage>
    </FormItem>
  );
};

export default PhoneNumberInput;