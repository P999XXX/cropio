import { FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StepThreeFormData } from "../StepThreeForm";
import { AsYouType, CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import { countryToDigits } from "./countryData";
import FormErrorMessage from "@/components/forms/FormErrorMessage";
import { AlertCircle, X } from "lucide-react";
import { useState } from "react";

interface PhoneNumberInputProps {
  form: UseFormReturn<StepThreeFormData>;
  selectedCountry: CountryCode;
}

const PhoneNumberInput = ({ form, selectedCountry }: PhoneNumberInputProps) => {
  const [showWarningMessage, setShowWarningMessage] = useState(true);

  const handlePhoneNumberChange = (value: string) => {
    const formatter = new AsYouType(selectedCountry);
    const formattedNumber = formatter.input(value);
    form.setValue('phoneNumber', formattedNumber);
    setShowWarningMessage(true);
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

  const maxDigits = countryToDigits[selectedCountry] || 15;
  const currentValue = form.watch("phoneNumber");
  const showWarning = currentValue && !isValidForCountry(currentValue, selectedCountry) && showWarningMessage;

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
        <div className="w-full text-warning-foreground bg-warning/20 text-[11px] mt-1 flex items-center justify-between gap-1 px-2 py-1 rounded">
          <div className="flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5 text-warning-foreground" />
            This phone number format doesn't match the selected country format. Is that correct
          </div>
          <button
            type="button"
            onClick={() => setShowWarningMessage(false)}
            className="text-warning-foreground hover:text-warning-foreground/80 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </FormItem>
  );
};

export default PhoneNumberInput;