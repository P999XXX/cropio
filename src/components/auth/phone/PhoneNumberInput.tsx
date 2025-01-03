import { FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StepThreeFormData } from "../StepThreeForm";
import { AsYouType, CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { countryToDigits } from "./countryData";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface PhoneNumberInputProps {
  form: UseFormReturn<StepThreeFormData>;
  selectedCountry: CountryCode;
}

const PhoneNumberInput = ({ form, selectedCountry }: PhoneNumberInputProps) => {
  const handlePhoneNumberChange = (value: string) => {
    // Create a formatter for the selected country
    const formatter = new AsYouType(selectedCountry);
    const formattedNumber = formatter.input(value);
    form.setValue('phoneNumber', formattedNumber);
  };

  const isValidForCountry = (value: string, country: CountryCode): boolean => {
    try {
      if (!value) return true;
      const phoneNumber = parsePhoneNumber(value, country);
      return phoneNumber.isValid();
    } catch {
      return false;
    }
  };

  // Get the maximum digits allowed for the selected country
  const maxDigits = countryToDigits[selectedCountry] || 15;

  const currentValue = form.watch("phoneNumber");
  const showWarning = currentValue && !isValidForCountry(currentValue, selectedCountry);

  return (
    <FormItem className="flex-1 phone-input-container">
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
      {showWarning && (
        <Alert variant="destructive" className="mt-2 py-2 px-3">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs ml-2">
            This phone number format doesn't match the selected country format
          </AlertDescription>
        </Alert>
      )}
    </FormItem>
  );
};

export default PhoneNumberInput;