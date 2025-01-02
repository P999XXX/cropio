import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);
          setError("Your password reset link has expired. Please request a new one.");
          setTimeout(() => {
            navigate('/signin?error=expired_token');
          }, 2000);
          return;
        }

        if (!session) {
          setError("Invalid or expired reset link. Please request a new one.");
          setTimeout(() => {
            navigate('/signin?error=invalid_token');
          }, 2000);
          return;
        }
      } catch (error) {
        console.error("Session check error:", error);
        setError("An unexpected error occurred. Please try again.");
        setTimeout(() => {
          navigate('/signin?error=unexpected');
        }, 2000);
      }
    };

    checkSession();
  }, [navigate]);

  const onSubmit = async (values: ResetPasswordFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (updateError) {
        throw updateError;
      }

      await supabase.auth.signOut();
      toast.success("Password successfully updated! Please sign in with your new password.", successToastStyle);
      navigate('/signin');
    } catch (error: any) {
      console.error("Password update error:", error);
      setError(error.message || "Failed to update password. Please try again.");
      toast.error(error.message || "Failed to update password. Please try again.", errorToastStyle);
    } finally {
      setIsLoading(false);
    }
  };

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Alert variant="destructive" className="border-2 border-destructive/20 bg-destructive/10 dark:bg-destructive/20 shadow-sm">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="ml-2 text-destructive font-medium">{error}</AlertDescription>
          </Alert>
        )}
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