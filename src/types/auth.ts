export interface StepTwoFormData {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  countryCode?: string;
  phoneNumber?: string;
  acceptTerms?: boolean;
  acceptPrivacy?: boolean;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  email: string;
  password: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}