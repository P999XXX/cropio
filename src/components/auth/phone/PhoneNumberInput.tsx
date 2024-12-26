import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../StepTwoForm";
import { AsYouType, CountryCode } from 'libphonenumber-js';
import { countryToDigits, countryToExample } from "./countryData";

interface PhoneNumberInputProps {
  form: UseFormReturn<StepTwoFormData>;
  selectedCountry: CountryCode;
}

const PhoneNumberInput = ({ form, selectedCountry }: PhoneNumberInputProps) => {
  const handlePhoneNumberChange = (value: string) => {
    // Remove any non-digit characters
    const digitsOnly = value.replace(/\D/g, '');
    const maxDigits = countryToDigits[selectedCountry] || 10;
    
    // Limit the input to the maximum number of digits for the selected country
    const limitedDigits = digitsOnly.slice(0, maxDigits);
    
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
              const requiredDigits = countryToDigits[selectedCountry] || 10;
              return digitsOnly.length === requiredDigits || 
                `Phone number must be exactly ${requiredDigits} digits for ${selectedCountry}`;
            }
          })}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
        />
      </FormControl>
      <FormMessage className="text-xs text-destructive" />
    </FormItem>
  );
};

export default PhoneNumberInput;