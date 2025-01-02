import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { countries } from "../phone/countries";
import ReactCountryFlag from "react-country-flag";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CountrySelectProps {
  form: UseFormReturn<any>;
}

const CountrySelect = ({ form }: CountrySelectProps) => {
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('detect-country');
        
        if (error) throw error;
        
        if (data?.country) {
          const countryCode = data.country;
          const country = countries.find(c => c.country === countryCode);
          if (country) {
            form.setValue('companyCountry', countryCode);
          }
        }
      } catch (error) {
        console.debug('Could not detect country, using default:', error);
        form.setValue('companyCountry', 'DE');
      }
    };

    detectCountry();
  }, [form]);

  return (
    <FormField
      control={form.control}
      name="companyCountry"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Country</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <ScrollArea className="h-[200px]">
                {countries.map((country) => (
                  <SelectItem key={country.country} value={country.country}>
                    <div className="flex items-center gap-2">
                      <ReactCountryFlag
                        countryCode={country.country}
                        svg
                        style={{
                          width: '1.2em',
                          height: '1.2em',
                        }}
                      />
                      {country.label}
                    </div>
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default CountrySelect;