import { create } from 'zustand';

interface SignupStore {
  formData: {
    role?: 'buyer' | 'supplier';
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: boolean;
    acceptPrivacy?: boolean;
    companyName?: string;
    companyStreet?: string;
    companyPostalCode?: string;
    companyPlace?: string;
    companyCountry?: string;
    phoneNumber?: string;
    countryCode?: string;
    bankName?: string;
    bankAddress?: string;
    bankAccountHolder?: string;
    iban?: string;
    bic?: string;
    vatNumber?: string;
    taxNumber?: string;
    documents?: File[];
    currency?: 'USD' | 'EUR';
  };
  updateFormData: (data: Partial<SignupStore['formData']>) => void;
  clearFormData: () => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  formData: {},
  updateFormData: (data) => 
    set((state) => ({ 
      formData: { ...state.formData, ...data } 
    })),
  clearFormData: () => set({ formData: {} }),
}));