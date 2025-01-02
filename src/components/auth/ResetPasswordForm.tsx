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
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const [urlError, setUrlError] = useState<string | null>(null);

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

        if (!window.location.hash) {
          setUrlError("Invalid password reset link. Please request a new one.");
          return;
        }

        if (type !== 'recovery' || !access_token || !refresh_token) {
          setUrlError("Invalid password reset link. Please request a new one.");
          return;
        }

        const { data: { session }, error: sessionError } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (sessionError || !session) {
          console.error("Session error:", sessionError);
          setUrlError("Your password reset link has expired. Please request a new one.");
          return;
        }

        console.log("Session established successfully");
        setSessionChecked(true);
      } catch (error) {
        console.error("Session check error:", error);
        setUrlError("An error occurred. Please try again.");
      }
    };

    checkSession();
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

  if (urlError) {
    return (
      <div className="px-4 md:px-0">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{urlError}</AlertDescription>
        </Alert>
        <Button 
          className="w-full bg-primary hover:bg-primary-hover text-primary-foreground h-10"
          onClick={() => window.location.href = '/sign-in'}
        >
          Back to Sign In
        </Button>
      </div>
    );
  }

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