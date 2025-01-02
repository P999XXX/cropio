import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { errorToastStyle } from "@/utils/toast-styles";
import { useSignupStore } from "@/store/signupStore";
import { checkEmailExists } from "@/utils/validation";
import { stepTwoSchema, type StepTwoFormData } from "../schemas/stepTwoSchema";

export const useStepTwoForm = (onSubmit: (values: StepTwoFormData) => void) => {
  const [emailExists, setEmailExists] = useState(false);
  const { formData, updateFormData } = useSignupStore();

  const form = useForm<StepTwoFormData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      email: formData.email || "",
      password: formData.password || "",
      confirmPassword: formData.confirmPassword || "",
      acceptTerms: formData.acceptTerms || false,
      acceptPrivacy: formData.acceptPrivacy || false,
    },
  });

  useEffect(() => {
    const subscription = form.watch(async (value, { name }) => {
      if (name === 'email' && value.email) {
        const exists = await checkEmailExists(value.email);
        setEmailExists(exists);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const handleSubmit = async (values: StepTwoFormData) => {
    try {
      const exists = await checkEmailExists(values.email);
      
      if (exists) {
        toast.error("This email is already registered", errorToastStyle);
        return;
      }

      updateFormData(values);
      await onSubmit(values);
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error(error.message || "An error occurred during signup", errorToastStyle);
    }
  };

  return { form, emailExists, handleSubmit };
};