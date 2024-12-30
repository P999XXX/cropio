import { FormLabel } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "./StepTwoForm";
import { countries } from "./phone/countries";
import { useState } from "react";
import { CountryCode } from 'libphonenumber-js';
import PhoneNumberInput from "./phone/PhoneNumberInput";
import CountrySelector from "./phone/CountrySelector";

interface PhoneInputProps {
  form: UseFormReturn<StepTwoFormData>;
}

const PhoneInput = ({ form }: PhoneInputProps) => {
  const [userCountry, setUserCountry] = useState<CountryCode>("DE");

  // Set default country code on mount
  useState(() => {
    const defaultCountry = countries.find(c => c.country === 'DE');
    if (defaultCountry) {
      form.setValue('countryCode', defaultCountry.value);
    }
  });

  const selectedCountry = countries.find(
    (country) => country.value === form.watch("countryCode")
  );

  const handleCountryChange = (countryCode: CountryCode) => {
    setUserCountry(countryCode);
    form.setValue('phoneNumber', '');
  };

  return (
    <div className="space-y-1">
      <FormLabel className="!text-foreground">Phone Number</FormLabel>
      <div className="flex gap-2">
        <CountrySelector
          form={form}
          onCountryChange={handleCountryChange}
          selectedCountry={selectedCountry}
        />
        <PhoneNumberInput 
          form={form}
          selectedCountry={userCountry}
        />
      </div>
    </div>
  );
};

export default PhoneInput;