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
  onSubmit?: (email: string) => Promise<void>;
}

const ResetPasswordForm = ({ isMobile, onSubmit }: ResetPasswordFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        console.error("Session error:", error);
        setIsTokenValid(false);
        toast.error("Your password reset link has expired. Please request a new one.");
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
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

  const handleSubmit = async (values: ResetPasswordFormData) => {
    if (!isTokenValid) {
      toast.error("Your password reset link has expired. Please request a new one.");
      navigate("/signin");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        if (error.message.includes("expired")) {
          toast.error("Your password reset link has expired. Please request a new one.");
          navigate("/signin");
          return;
        }
        throw error;
      }

      // Sign out after password reset to ensure clean state
      await supabase.auth.signOut();
      
      toast.success("Password successfully updated! Please sign in with your new password.");
      navigate("/signin");
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isTokenValid) {
    return null;
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating password..." : "Update Password"}
          </Button>
        </form>
      </Form>
      <div className="text-sm text-center text-muted-foreground mt-4">
        Already know your password?{" "}
        <a href="/signin" className="text-primary hover:underline font-medium">
          Sign in
        </a>
      </div>
    </>
  );
};

export default ResetPasswordForm;