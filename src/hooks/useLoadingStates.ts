import { useState } from "react";

export interface LoadingStates {
  isSigningIn: boolean;
  isGoogleSigningIn: boolean;
  isLinkedInSigningIn: boolean;
  isResettingPassword: boolean;
}

const initialLoadingStates: LoadingStates = {
  isSigningIn: false,
  isGoogleSigningIn: false,
  isLinkedInSigningIn: false,
  isResettingPassword: false,
};

export const useLoadingStates = () => {
  const [loadingStates, setLoadingStates] = useState<LoadingStates>(initialLoadingStates);

  const setLoading = (key: keyof LoadingStates, value: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: value }));
  };

  return { loadingStates, setLoading };
};