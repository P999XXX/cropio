export interface CountryDigits {
  [key: string]: number;
}

export interface CountryExamples {
  [key: string]: string;
}

export const countryToDigits: CountryDigits = {
  "DE": 11, // Germany
  "AT": 10, // Austria
  "CH": 10, // Switzerland
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

export const countryToExample: CountryExamples = {
  "DE": "15112345678", // Germany
  "AT": "0664123456", // Austria
  "CH": "0791015615", // Switzerland (updated)
  "GB": "07911123456", // Great Britain
  "US": "2125550123", // USA
  "FR": "612345678", // France
  "IT": "3123456789", // Italy
  "ES": "612345678", // Spain
  "NL": "612345678", // Netherlands
  "BE": "0470123456", // Belgium
  "DK": "20123456", // Denmark
  "SE": "0701234567", // Sweden
  "NO": "41234567", // Norway
  "FI": "0401234567", // Finland
  "PL": "512345678", // Poland
  "CZ": "601234567", // Czech Republic
  "HU": "0201234567", // Hungary
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