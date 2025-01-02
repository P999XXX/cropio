import { FormLabel } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { StepThreeFormData } from "./StepThreeForm";
import { countries } from "./phone/countries";
import { useEffect, useState } from "react";
import { CountryCode } from 'libphonenumber-js';
import PhoneNumberInput from "./phone/PhoneNumberInput";
import CountrySelector from "./phone/CountrySelector";
import { supabase } from "@/integrations/supabase/client";

interface PhoneInputProps {
  form: UseFormReturn<StepThreeFormData>;
}

const PhoneInput = ({ form }: PhoneInputProps) => {
  const [userCountry, setUserCountry] = useState<CountryCode>("DE");

  useEffect(() => {
    // Watch for changes in companyCountry and update phone country code accordingly
    const subscription = form.watch((value, { name }) => {
      if (name === 'companyCountry') {
        const country = countries.find(c => c.country === value.companyCountry);
        if (country) {
          form.setValue('countryCode', country.value);
          setUserCountry(country.country as CountryCode);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

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
    form.setValue('phoneNumber', '');
    // Also update the company country when phone prefix is changed
    form.setValue('companyCountry', countryCode);
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