export interface CountryDigits {
  [key: string]: number;
}

export interface CountryExamples {
  [key: string]: string;
}

export const countryToDigits: CountryDigits = {
  "DE": 11, // Germany (including prefix 0)
  "AT": 11, // Austria (including prefix 0)
  "CH": 10, // Switzerland (including prefix 0)
  "GB": 11, // Great Britain (including prefix 0)
  "US": 10, // USA
  "FR": 10, // France (including prefix 0)
  "IT": 11, // Italy (including prefix)
  "ES": 11, // Spain (including prefix)
  "NL": 10, // Netherlands (including prefix)
  "BE": 10, // Belgium (including prefix)
  "DK": 8,  // Denmark
  "SE": 10, // Sweden (including prefix)
  "NO": 8,  // Norway
  "FI": 10, // Finland (including prefix)
  "PL": 9,  // Poland
  "CZ": 9,  // Czech Republic
  "HU": 9,  // Hungary
  "GR": 10, // Greece
  "PT": 9,  // Portugal
  "IE": 10, // Ireland (including prefix)
  "LU": 9,  // Luxembourg
  "RO": 10, // Romania (including prefix)
  "SK": 9,  // Slovakia
  "SI": 9,  // Slovenia (including prefix)
  "HR": 9,  // Croatia
  "BG": 10, // Bulgaria (including prefix)
  "IS": 7,  // Iceland
  "MT": 8,  // Malta
  "CY": 8,  // Cyprus
  "EE": 8,  // Estonia
  "LV": 8,  // Latvia
  "LT": 8,  // Lithuania
};

export const countryToExample: CountryExamples = {
  "DE": "01512345678", // Germany
  "AT": "06641234567", // Austria
  "CH": "0791234567", // Switzerland
  "GB": "07911123456", // Great Britain
  "US": "2125550123", // USA
  "FR": "0612345678", // France
  "IT": "03451234567", // Italy
  "ES": "0612345678", // Spain
  "NL": "0612345678", // Netherlands
  "BE": "0470123456", // Belgium
  "DK": "20123456", // Denmark
  "SE": "0701234567", // Sweden
  "NO": "41234567", // Norway
  "FI": "0401234567", // Finland
  "PL": "512345678", // Poland
  "CZ": "601234567", // Czech Republic
  "HU": "201234567", // Hungary
  "GR": "6912345678", // Greece
  "PT": "912345678", // Portugal
  "IE": "0871234567", // Ireland
  "LU": "621234567", // Luxembourg
  "RO": "0712345678", // Romania
  "SK": "0912345678", // Slovakia
  "SI": "031234567", // Slovenia
  "HR": "0911234567", // Croatia
  "BG": "0897123456", // Bulgaria
  "IS": "6123456", // Iceland
  "MT": "21234567", // Malta
  "CY": "96123456", // Cyprus
  "EE": "51234567", // Estonia
  "LV": "21234567", // Latvia
  "LT": "61234567", // Lithuania
};