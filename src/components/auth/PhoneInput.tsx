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
import ReactCountryFlag from "react-country-flag";
import { UseFormReturn } from "react-hook-form";
import { StepTwoFormData } from "./StepTwoForm";

interface PhoneInputProps {
  form: UseFormReturn<StepTwoFormData>;
}

interface CountryOption {
  value: string;
  label: string;
  country: string;
}

const countries: CountryOption[] = [
  { value: "+49", label: "Deutschland", country: "DE" },
  { value: "+43", label: "Österreich", country: "AT" },
  { value: "+41", label: "Schweiz", country: "CH" },
  { value: "+44", label: "Großbritannien", country: "GB" },
  { value: "+1", label: "USA/Kanada", country: "US" },
  { value: "+33", label: "Frankreich", country: "FR" },
  { value: "+39", label: "Italien", country: "IT" },
  { value: "+34", label: "Spanien", country: "ES" },
  { value: "+31", label: "Niederlande", country: "NL" },
  { value: "+32", label: "Belgien", country: "BE" },
  { value: "+45", label: "Dänemark", country: "DK" },
  { value: "+46", label: "Schweden", country: "SE" },
  { value: "+47", label: "Norwegen", country: "NO" },
  { value: "+358", label: "Finnland", country: "FI" },
  { value: "+48", label: "Polen", country: "PL" },
  { value: "+420", label: "Tschechien", country: "CZ" },
  { value: "+36", label: "Ungarn", country: "HU" },
  { value: "+30", label: "Griechenland", country: "GR" },
  { value: "+351", label: "Portugal", country: "PT" },
  { value: "+353", label: "Irland", country: "IE" },
  { value: "+352", label: "Luxemburg", country: "LU" },
  { value: "+40", label: "Rumänien", country: "RO" },
  { value: "+421", label: "Slowakei", country: "SK" },
  { value: "+386", label: "Slowenien", country: "SI" },
  { value: "+385", label: "Kroatien", country: "HR" },
  { value: "+359", label: "Bulgarien", country: "BG" },
  { value: "+354", label: "Island", country: "IS" },
  { value: "+356", label: "Malta", country: "MT" },
  { value: "+357", label: "Zypern", country: "CY" },
  { value: "+372", label: "Estland", country: "EE" },
  { value: "+371", label: "Lettland", country: "LV" },
  { value: "+370", label: "Litauen", country: "LT" },
];

const PhoneInput = ({ form }: PhoneInputProps) => {
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-10">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        {selectedCountry && (
                          <ReactCountryFlag
                            countryCode={selectedCountry.country}
                            svg
                            style={{
                              width: '1.2em',
                              height: '1.2em',
                            }}
                          />
                        )}
                        <span>{field.value}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-gray-800 min-w-[200px]">
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      <div className="flex items-center gap-2">
                        <ReactCountryFlag
                          countryCode={country.country}
                          svg
                          style={{
                            width: '1.2em',
                            height: '1.2em',
                          }}
                        />
                        <span>
                          {country.label} ({country.value})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Enter phone number" type="tel" {...field} />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PhoneInput;