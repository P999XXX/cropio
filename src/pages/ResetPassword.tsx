import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import PasswordInput from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";

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

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) throw error;

      toast.success("Password updated successfully!");
      navigate("/signin");
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className={`container mx-auto px-4 ${isMobile ? 'pt-12' : 'pt-20'} flex items-${isMobile ? 'start' : 'center'} justify-center min-h-[calc(100vh-64px)]`}>
        <div className={`max-w-md w-full ${isMobile ? 'mt-8' : 'my-8'}`}>
          <div className={`space-y-2 ${isMobile ? 'text-left' : 'text-center'} mb-6`}>
            <h1 className="text-2xl md:text-3xl font-bold">Reset Password</h1>
            <p className="text-muted-foreground">Create a new password for your account</p>
          </div>

          <div className="md:block hidden">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>
                  Please enter your new password below
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <PasswordInput
                      form={form}
                      name="password"
                      label="New Password"
                      description="Password must contain at least 8 characters, including uppercase, lowercase, and numbers"
                    />

                    <PasswordInput
                      form={form}
                      name="confirmPassword"
                      label="Confirm New Password"
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Updating password..." : "Update Password"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-center w-full text-muted-foreground">
                  Remember your password?{" "}
                  <a href="/signin" className="text-primary hover:underline font-medium">
                    Sign in
                  </a>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="md:hidden block space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <PasswordInput
                  form={form}
                  name="password"
                  label="New Password"
                  description="Password must contain at least 8 characters, including uppercase, lowercase, and numbers"
                />

                <PasswordInput
                  form={form}
                  name="confirmPassword"
                  label="Confirm New Password"
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Updating password..." : "Update Password"}
                </Button>
              </form>
            </Form>
            <div className="text-sm text-center text-muted-foreground">
              Remember your password?{" "}
              <a href="/signin" className="text-primary hover:underline font-medium">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
