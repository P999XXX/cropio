import { FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StepThreeFormData } from "../StepThreeForm";
import { AsYouType, CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { countryToDigits } from "./countryData";
import FormErrorMessage from "@/components/forms/FormErrorMessage";

interface PhoneNumberInputProps {
  form: UseFormReturn<StepThreeFormData>;
  selectedCountry: CountryCode;
}

const PhoneNumberInput = ({ form, selectedCountry }: PhoneNumberInputProps) => {
  const handlePhoneNumberChange = (value: string) => {
    // Create a formatter for the selected country
    const formatter = new AsYouType(selectedCountry);
    const formattedNumber = formatter.input(value);
    
    // Only update if the number is valid for the country or empty
    if (value === '' || isValidForCountry(value, selectedCountry)) {
      form.setValue('phoneNumber', formattedNumber);
    }
  };

  const isValidForCountry = (value: string, country: CountryCode): boolean => {
    try {
      // Try to parse the phone number
      const phoneNumber = parsePhoneNumber(value, country);
      return phoneNumber.isValid();
    } catch {
      // If parsing fails, check if it's just digits and spaces
      return /^[0-9\s]*$/.test(value);
    }
  };

  // Get the maximum digits allowed for the selected country
  const maxDigits = countryToDigits[selectedCountry] || 15;

  return (
    <FormItem className="flex-1">
      <FormControl>
        <Input
          placeholder={`Enter your phone no.`}
          maxLength={maxDigits}
          {...form.register("phoneNumber", {
            required: "Phone number is required",
            validate: {
              validFormat: (value) => 
                isValidForCountry(value, selectedCountry) || 
                "Please enter a valid phone number for the selected country"
            }
          })}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
          className={`auth-input text-[0.875rem] ${form.formState.errors.phoneNumber ? 'border-destructive' : ''}`}
        />
      </FormControl>
      <FormErrorMessage message={form.formState.errors.phoneNumber?.message} />
    </FormItem>
  );
};

export default PhoneNumberInput;