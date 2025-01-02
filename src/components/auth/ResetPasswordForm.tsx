import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/forms/FormInput";
import { toast } from "sonner";

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

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
        // Get the URL fragment
        const fragment = new URLSearchParams(window.location.hash.substring(1));
        const type = fragment.get('type');
        const access_token = fragment.get('access_token');
        const refresh_token = fragment.get('refresh_token');

        console.log("Recovery flow check:", { type, hasAccessToken: !!access_token, hasRefreshToken: !!refresh_token });

        // Verify this is a recovery flow and we have the necessary tokens
        if (type !== 'recovery' || !access_token || !refresh_token) {
          console.error("Invalid recovery flow");
          toast.error("Invalid password reset link. Please request a new one.");
          navigate('/signin');
          return;
        }

        // Set the session with the recovery tokens
        const { data: { session }, error: sessionError } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (sessionError || !session) {
          console.error("Session error:", sessionError);
          toast.error("Your password reset link has expired. Please request a new one.");
          navigate('/signin');
          return;
        }

        console.log("Session established successfully");
        setSessionChecked(true);
      } catch (error) {
        console.error("Session check error:", error);
        toast.error("An error occurred. Please try again.");
        navigate('/signin');
      }
    };

    // Only run if we have a URL fragment
    if (window.location.hash) {
      checkSession();
    } else {
      console.error("No URL fragment found");
      toast.error("Invalid password reset link. Please request a new one.");
      navigate('/signin');
    }
  }, [navigate]);

  const onSubmit = async (values: ResetPasswordFormData) => {
    if (!sessionChecked) {
      toast.error("Please wait while we verify your session.");
      return;
    }

    setIsLoading(true);
    try {
      // Get the current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        throw new Error("Session expired. Please request a new reset link.");
      }

      // Update the password
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        throw error;
      }

      // Sign out after successful password update
      await supabase.auth.signOut();
      toast.success("Password successfully updated! Please sign in with your new password.");
      navigate('/signin');
    } catch (error: any) {
      console.error("Password update error:", error);
      toast.error(error.message || "Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          form={form}
          name="password"
          label="New Password"
          type="password"
          placeholder="Enter your new password"
        />
        <FormInput
          form={form}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your new password"
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Updating Password..." : "Update Password"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;