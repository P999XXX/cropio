import { FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "../StepTwoForm";
import { AsYouType, CountryCode } from 'libphonenumber-js';
import { countryToDigits, countryToExample } from "./countryData";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

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
          className={form.formState.errors.phoneNumber ? 'border-destructive' : ''}
        />
      </FormControl>
      <FormErrorMessage message={form.formState.errors.phoneNumber?.message} />
    </FormItem>
  );
};

export default PhoneNumberInput;