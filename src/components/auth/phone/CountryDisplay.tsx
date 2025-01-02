import ReactCountryFlag from "react-country-flag";
import { CountryOption } from "./countries";

interface CountryDisplayProps {
  country: CountryOption;
  showLabel?: boolean;
  showPrefix?: boolean;
}

const CountryDisplay = ({ 
  country, 
  showLabel = true, 
  showPrefix = true 
}: CountryDisplayProps) => {
  return (
    <div className="flex items-center gap-2">
      <ReactCountryFlag
        countryCode={country.country}
        svg
        style={{
          width: '1.2em',
          height: '1.2em',
        }}
      />
      {showLabel && (
        <span>
          {country.label} {showPrefix && `(${country.value})`}
        </span>
      )}
      {!showLabel && showPrefix && (
        <span>{country.value}</span>
      )}
    </div>
  );
};

export default CountryDisplay;