import { FormLabel } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "./StepTwoForm";
import { countries } from "./phone/countries";
import { useEffect, useState } from "react";
import { CountryCode } from 'libphonenumber-js';
import PhoneNumberInput from "./phone/PhoneNumberInput";
import CountrySelector from "./phone/CountrySelector";
import { supabase } from "@/integrations/supabase/client";

interface PhoneInputProps {
  form: UseFormReturn<StepTwoFormData>;
}

const PhoneInput = ({ form }: PhoneInputProps) => {
  const [userCountry, setUserCountry] = useState<CountryCode>("DE");

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('detect-country');
        
        if (error) throw error;
        
        if (data?.country) {
          const countryCode = data.country as CountryCode;
          const country = countries.find(c => c.country === countryCode);
          if (country) {
            form.setValue('countryCode', country.value);
            setUserCountry(countryCode);
          }
        }
      } catch (error) {
        console.debug('Could not detect country, using default:', error);
        const defaultCountry = countries.find(c => c.country === 'DE');
        if (defaultCountry) {
          form.setValue('countryCode', defaultCountry.value);
        }
      }
    };

    detectCountry();
  }, [form]);

  const selectedCountry = countries.find(
    (country) => country.value === form.watch("countryCode")
  );

  const handleCountryChange = (countryCode: CountryCode) => {
    setUserCountry(countryCode);
    // Clear the phone number when country changes to avoid validation issues
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