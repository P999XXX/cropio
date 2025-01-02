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
  const handlePhoneNumberChange = (value: string) => {
    const formatter = new AsYouType(selectedCountry);
    const formattedNumber = formatter.input(value);
    form.setValue('phoneNumber', formattedNumber);
  };

  const maxDigits = countryToDigits[selectedCountry] || 15;

  return (
    <FormItem className="flex-1">
      <FormControl>
        <Input
          placeholder="Enter your phone no."
          maxLength={maxDigits}
          {...form.register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9\s-()]+$/,
              message: "Please enter a valid phone number"
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