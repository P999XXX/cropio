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

interface ResetPasswordFormProps {
  isMobile: boolean;
}

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

const ResetPasswordForm = ({ isMobile }: ResetPasswordFormProps) => {
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
        const fragment = new URLSearchParams(window.location.hash.substring(1));
        const type = fragment.get('type');
        const access_token = fragment.get('access_token');
        const refresh_token = fragment.get('refresh_token');

        console.log("Recovery flow check:", { type, hasAccessToken: !!access_token, hasRefreshToken: !!refresh_token });

        if (type !== 'recovery' || !access_token || !refresh_token) {
          console.error("Invalid recovery flow");
          toast.error("Invalid password reset link. Please request a new one.", errorToastStyle);
          return;
        }

        const { data: { session }, error: sessionError } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (sessionError || !session) {
          console.error("Session error:", sessionError);
          toast.error("Your password reset link has expired. Please request a new one.", errorToastStyle);
          return;
        }

        console.log("Session established successfully");
        setSessionChecked(true);
      } catch (error) {
        console.error("Session check error:", error);
        toast.error("An error occurred. Please try again.", errorToastStyle);
      }
    };

    if (window.location.hash) {
      checkSession();
    } else {
      console.error("No URL fragment found");
      toast.error("Invalid password reset link. Please request a new one.", errorToastStyle);
    }
  }, []);

  const onSubmit = async (values: ResetPasswordFormData) => {
    if (!sessionChecked) {
      toast.error("Please wait while we verify your session.", errorToastStyle);
      return;
    }

    setIsLoading(true);
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        throw new Error("Session expired. Please request a new reset link.");
      }

      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        throw error;
      }

      await supabase.auth.signOut();
      toast.success("Password successfully updated! Please sign in with your new password.", successToastStyle);
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
          description="Enter your new password"
        />
        <PasswordInput
          form={form}
          name="confirmPassword"
          label="Confirm Password"
          description="Confirm your new password"
        />
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary-hover text-primary-foreground h-10"
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