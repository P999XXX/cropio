import { FormLabel } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "./StepTwoForm";
import { countries } from "./phone/countries";
import { useEffect, useState } from "react";
import { CountryCode } from 'libphonenumber-js';
import PhoneNumberInput from "./phone/PhoneNumberInput";
import CountrySelector from "./phone/CountrySelector";

interface PhoneInputProps {
  form: UseFormReturn<StepTwoFormData>;
}

const PhoneInput = ({ form }: PhoneInputProps) => {
  const [userCountry, setUserCountry] = useState<CountryCode>("DE");

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        const countryCode = data.country as CountryCode;
        const country = countries.find(c => c.country === countryCode);
        if (country) {
          form.setValue('countryCode', country.value);
          setUserCountry(countryCode);
        }
      })
      .catch(error => {
        console.error('Error fetching country:', error);
      });
  }, []);

  const selectedCountry = countries.find(
    (country) => country.value === form.watch("countryCode")
  );

  const handleCountryChange = (countryCode: CountryCode) => {
    setUserCountry(countryCode);
    form.setValue('phoneNumber', '');
  };

  return (
    <div className="space-y-2">
      <FormLabel>Phone Number</FormLabel>
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