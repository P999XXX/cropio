import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import PasswordInput from "@/components/auth/PasswordInput";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/toast-styles";
import { useNavigate, useSearchParams } from "react-router-dom";

interface ResetPasswordFormProps {
  isMobile: boolean;
}

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and numbers"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = ({ isMobile }: ResetPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useState(() => {
    if (error) {
      const errorMessage = error === 'expired_token' 
        ? "Your password reset link has expired. Please request a new one."
        : "Invalid reset link. Please request a new one.";
      
      toast.error(errorMessage, {
        ...errorToastStyle,
        duration: 5000,
      });
    }
  });

  const onSubmit = async (values: ResetPasswordFormData) => {
    setIsLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (updateError) throw updateError;

      toast.success("Password successfully updated! Please sign in with your new password.", {
        ...successToastStyle,
        duration: 5000,
      });
      
      setTimeout(() => {
        navigate('/signin');
      }, 1000);
      
    } catch (error: any) {
      console.error("Password update error:", error);
      toast.error(error.message || "Failed to update password. Please try again.", errorToastStyle);
    } finally {
      setIsLoading(false);
    }
  };

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <PasswordInput
          form={form}
          name="password"
          label="New Password"
        />
        <PasswordInput
          form={form}
          name="confirmPassword"
          label="Confirm Password"
        />
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? "Updating Password..." : "Update Password"}
        </Button>
      </form>
    </Form>
  );

  return isMobile ? (
    <div className="px-4">{formContent}</div>
  ) : (
    <Card className="w-full">
      <CardContent className="pt-6">
        {formContent}
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;