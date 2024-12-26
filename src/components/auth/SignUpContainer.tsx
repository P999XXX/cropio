import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { StepOneFormData, StepTwoFormData, StepThreeFormData } from "@/types/auth";
import ThankYouDialog from "./ThankYouDialog";

interface SignUpContainerProps {
  children: React.ReactNode;
}

export const useSignUpState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<"buyer" | "supplier">("buyer");
  const [showThankYou, setShowThankYou] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [formData, setFormData] = useState<{
    stepOne?: StepOneFormData;
    stepTwo?: StepTwoFormData;
    stepThree?: StepThreeFormData;
  }>({});
  
  const navigate = useNavigate();

  const handleStepOne = (data: StepOneFormData) => {
    setSelectedRole(data.role);
    setFormData(prev => ({ ...prev, stepOne: data }));
    setCurrentStep(2);
  };

  const handleBack = () => {
    if (currentStep === 3) {
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
  };

  const handleStepTwo = (values: StepTwoFormData) => {
    setFormData(prev => ({ ...prev, stepTwo: values }));
    setCurrentStep(3);
  };

  const handleStepThree = async (values: StepThreeFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: formData.stepTwo?.firstName,
            last_name: formData.stepTwo?.lastName,
            company_name: formData.stepTwo?.companyName,
            role: selectedRole,
          },
        },
      });

      if (error) throw error;

      setUserEmail(values.email);
      setShowThankYou(true);
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast.error(error.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    currentStep,
    selectedRole,
    showThankYou,
    setShowThankYou,
    userEmail,
    handleStepOne,
    handleBack,
    handleStepTwo,
    handleStepThree,
  };
};

const SignUpContainer = ({ children }: SignUpContainerProps) => {
  const {
    showThankYou,
    setShowThankYou,
    userEmail,
  } = useSignUpState();

  return (
    <>
      {children}
      <ThankYouDialog
        open={showThankYou}
        onOpenChange={setShowThankYou}
        userEmail={userEmail}
      />
    </>
  );
};

export default SignUpContainer;