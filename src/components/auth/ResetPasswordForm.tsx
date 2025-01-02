import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "./PasswordInput";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  isMobile: boolean;
}

const ResetPasswordForm = ({ isMobile }: ResetPasswordFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Get the recovery token from the URL hash
        const fragment = new URLSearchParams(window.location.hash.substring(1));
        const type = fragment.get('type');
        const accessToken = fragment.get('access_token');
        const refreshToken = fragment.get('refresh_token');

        // Verify this is a recovery flow and we have the necessary tokens
        if (type !== 'recovery' || !accessToken || !refreshToken) {
          console.error("Invalid recovery flow");
          toast.error("Invalid password reset link. Please request a new one.");
          navigate('/signin');
          return;
        }

        // Set the session with the recovery tokens
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (sessionError) {
          console.error("Session error:", sessionError);
          toast.error("Your password reset link has expired. Please request a new one.");
          navigate('/signin');
          return;
        }

        // Verify the session is active
        const { data: { session }, error: verifyError } = await supabase.auth.getSession();
        
        if (verifyError || !session) {
          console.error("Session verification error:", verifyError);
          toast.error("Unable to verify your session. Please request a new reset link.");
          navigate('/signin');
          return;
        }

        setSessionChecked(true);
      } catch (error) {
        console.error("Session check error:", error);
        toast.error("Unable to verify your session. Please try again.");
        navigate('/signin');
      }
    };

    checkSession();
  }, [navigate]);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormData) => {
    if (!sessionChecked) {
      toast.error("Please wait while we verify your session.");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        throw error;
      }

      await supabase.auth.signOut();
      toast.success("Password successfully updated! Please sign in with your new password.");
      navigate('/signin');
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  if (!sessionChecked) {
    return null;
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-3">
            <PasswordInput
              form={form}
              name="password"
              label="New Password"
              description="Password must be at least 8 characters and contain uppercase, lowercase, and numbers"
            />

            <PasswordInput
              form={form}
              name="confirmPassword"
              label="Confirm Password"
            />
          </div>

          <Button type="submit" className="w-full mt-3" variant="primary" disabled={isLoading}>
            {isLoading ? "Updating password..." : "Update Password"}
          </Button>
        </form>
      </Form>
      <div className="text-sm text-center text-muted-foreground mt-3">
        Already know your password?{" "}
        <a href="/signin" className="text-primary hover:underline font-medium">
          Sign in
        </a>
      </div>
    </>
  );
};

export default ResetPasswordForm;