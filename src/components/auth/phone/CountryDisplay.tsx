import ReactCountryFlag from "react-country-flag";
import { CountryOption } from "./countries";

interface CountryDisplayProps {
  country: CountryOption;
  showLabel?: boolean;
}

const CountryDisplay = ({ country, showLabel = true }: CountryDisplayProps) => {
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
      {showLabel ? (
        <span>
          {country.label} ({country.value})
        </span>
      ) : (
        <span>{country.value}</span>
      )}
    </div>
  );
};

export default CountryDisplay;