export interface StepOneFormData {
  role: "buyer" | "supplier";
}

export interface StepTwoFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  countryCode: string;
  phoneNumber: string;
}

export interface StepThreeFormData {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}