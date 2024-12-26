import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "./StepTwoForm";
import { countries } from "./phone/countries";
import CountryDisplay from "./phone/CountryDisplay";
import { useEffect, useState } from "react";
import { CountryCode } from 'libphonenumber-js';
import PhoneNumberInput from "./phone/PhoneNumberInput";

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

  return (
    <div className="space-y-2">
      <FormLabel>Phone Number</FormLabel>
      <div className="flex gap-2">
        <FormField
          control={form.control}
          name="countryCode"
          render={({ field }) => (
            <FormItem className="w-[110px] shrink-0">
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  const country = countries.find(c => c.value === value);
                  if (country) {
                    setUserCountry(country.country as CountryCode);
                    form.setValue('phoneNumber', '');
                  }
                }} 
                value={field.value}
              >
                <SelectTrigger className="h-10">
                  <SelectValue>
                    {selectedCountry && (
                      <CountryDisplay 
                        country={selectedCountry} 
                        showLabel={false}
                      />
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-background min-w-[200px]">
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      <CountryDisplay country={country} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-destructive" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={() => (
            <PhoneNumberInput 
              form={form}
              selectedCountry={userCountry}
            />
          )}
        />
      </div>
    </div>
  );
};

export default PhoneInput;