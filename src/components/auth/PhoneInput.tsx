import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { parsePhoneNumberFromString, AsYouType, CountryCode } from 'libphonenumber-js';

interface PhoneInputProps {
  form: UseFormReturn<StepTwoFormData>;
}

const countryToDigits: { [key: string]: number } = {
  "DE": 11, // Germany
  "AT": 10, // Austria
  "CH": 9,  // Switzerland
  "GB": 10, // Great Britain
  "US": 10, // USA
  "FR": 9,  // France
  "IT": 10, // Italy
  "ES": 9,  // Spain
  "NL": 9,  // Netherlands
  "BE": 9,  // Belgium
  "DK": 8,  // Denmark
  "SE": 9,  // Sweden
  "NO": 8,  // Norway
  "FI": 9,  // Finland
  "PL": 9,  // Poland
  "CZ": 9,  // Czech Republic
  "HU": 9,  // Hungary
  "GR": 10, // Greece
  "PT": 9,  // Portugal
  "IE": 9,  // Ireland
  "LU": 9,  // Luxembourg
  "RO": 9,  // Romania
  "SK": 9,  // Slovakia
  "SI": 8,  // Slovenia
  "HR": 9,  // Croatia
  "BG": 9,  // Bulgaria
  "IS": 7,  // Iceland
  "MT": 8,  // Malta
  "CY": 8,  // Cyprus
  "EE": 8,  // Estonia
  "LV": 8,  // Latvia
  "LT": 8,  // Lithuania
};

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

  const handlePhoneNumberChange = (value: string) => {
    if (selectedCountry) {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      const maxDigits = countryToDigits[selectedCountry.country] || 10;
      
      // Limit the input to the maximum number of digits for the selected country
      const limitedDigits = digitsOnly.slice(0, maxDigits);
      
      const formatter = new AsYouType(selectedCountry.country as CountryCode);
      const formattedNumber = formatter.input(limitedDigits);
      form.setValue('phoneNumber', formattedNumber);
    }
  };

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
                    // Clear phone number when country changes
                    form.setValue('phoneNumber', '');
                  }
                }} 
                value={field.value}
              >
                <FormControl>
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
                </FormControl>
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
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input 
                  placeholder={`Enter ${countryToDigits[userCountry] || 10} digits`}
                  type="tel"
                  {...field}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                />
              </FormControl>
              <FormMessage className="text-xs text-destructive" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PhoneInput;