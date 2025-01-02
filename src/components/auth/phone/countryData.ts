export interface CountryDigits {
  [key: string]: number;
}

export interface CountryExamples {
  [key: string]: string;
}

export const countryToDigits: CountryDigits = {
  "DE": 11, // Germany (including prefix 0)
  "AT": 11, // Austria (including prefix 0)
  "CH": 11, // Switzerland (including prefix 0)
  "GB": 11, // Great Britain (including prefix 0)
  "US": 11, // USA (including area code)
  "FR": 11, // France (including prefix 0)
  "IT": 11, // Italy (including prefix 0)
  "ES": 11, // Spain (including prefix 0)
  "NL": 11, // Netherlands (including prefix 0)
  "BE": 11, // Belgium (including prefix 0)
  "DK": 11, // Denmark (including prefix 0)
  "SE": 11, // Sweden (including prefix 0)
  "NO": 11, // Norway (including prefix 0)
  "FI": 11, // Finland (including prefix 0)
  "PL": 11, // Poland (including prefix 0)
  "CZ": 11, // Czech Republic (including prefix 0)
  "HU": 11, // Hungary (including prefix 0)
  "GR": 11, // Greece (including prefix 0)
  "PT": 11, // Portugal (including prefix 0)
  "IE": 11, // Ireland (including prefix 0)
  "LU": 11, // Luxembourg (including prefix 0)
  "RO": 11, // Romania (including prefix 0)
  "SK": 11, // Slovakia (including prefix 0)
  "SI": 11, // Slovenia (including prefix 0)
  "HR": 11, // Croatia (including prefix 0)
  "BG": 11, // Bulgaria (including prefix 0)
  "IS": 11, // Iceland (including prefix 0)
  "MT": 11, // Malta (including prefix 0)
  "CY": 11, // Cyprus (including prefix 0)
  "EE": 11, // Estonia (including prefix 0)
  "LV": 11, // Latvia (including prefix 0)
  "LT": 11, // Lithuania (including prefix 0)
};

export const countryToExample: CountryExamples = {
  "DE": "01512345678", // Germany
  "AT": "06641234567", // Austria
  "CH": "07912345678", // Switzerland
  "GB": "07911234567", // Great Britain
  "US": "12125550123", // USA
  "FR": "06123456789", // France
  "IT": "03451234567", // Italy
  "ES": "06123456789", // Spain
  "NL": "06123456789", // Netherlands
  "BE": "04701234567", // Belgium
  "DK": "02012345678", // Denmark
  "SE": "07012345678", // Sweden
  "NO": "04123456789", // Norway
  "FI": "04012345678", // Finland
  "PL": "05123456789", // Poland
  "CZ": "06012345678", // Czech Republic
  "HU": "02012345678", // Hungary
  "GR": "06912345678", // Greece
  "PT": "09123456789", // Portugal
  "IE": "08712345678", // Ireland
  "LU": "06212345678", // Luxembourg
  "RO": "07123456789", // Romania
  "SK": "09123456789", // Slovakia
  "SI": "03123456789", // Slovenia
  "HR": "09123456789", // Croatia
  "BG": "08971234567", // Bulgaria
  "IS": "06123456789", // Iceland
  "MT": "02123456789", // Malta
  "CY": "09612345678", // Cyprus
  "EE": "05123456789", // Estonia
  "LV": "02123456789", // Latvia
  "LT": "06123456789", // Lithuania
};