import { useState, useEffect } from "react";
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
  .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
  .regex(/[A-Z]/, "Passwort muss mindestens einen Großbuchstaben enthalten")
  .regex(/[a-z]/, "Passwort muss mindestens einen Kleinbuchstaben enthalten")
  .regex(/[0-9]/, "Passwort muss mindestens eine Zahl enthalten");

const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const [firstName, setFirstName] = useState("");

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const getFirstName = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', session.user.id)
          .single();
        
        if (profile?.first_name) {
          setFirstName(profile.first_name);
        }
      }
    };
    
    getFirstName();
  }, []);

  const onSubmit = async (values: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) throw error;

      toast.success("Passwort wurde erfolgreich aktualisiert!");
      navigate("/signin");
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Fehler beim Zurücksetzen des Passworts");
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
            <h1 className="text-2xl md:text-3xl font-bold">
              {firstName ? `Hallo ${firstName}!` : "Passwort zurücksetzen"}
            </h1>
            <p className="text-muted-foreground">Erstellen Sie ein neues Passwort für Ihr Konto</p>
          </div>

          <div className="md:block hidden">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>
                  Bitte geben Sie Ihr neues Passwort ein
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <PasswordInput
                      form={form}
                      name="password"
                      label="Neues Passwort"
                      description="Passwort muss mindestens 8 Zeichen lang sein und Groß-, Kleinbuchstaben sowie Zahlen enthalten"
                    />

                    <PasswordInput
                      form={form}
                      name="confirmPassword"
                      label="Passwort bestätigen"
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Passwort wird aktualisiert..." : "Passwort aktualisieren"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-center w-full text-muted-foreground">
                  Passwort bereits bekannt?{" "}
                  <a href="/signin" className="text-primary hover:underline font-medium">
                    Anmelden
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
                  label="Neues Passwort"
                  description="Passwort muss mindestens 8 Zeichen lang sein und Groß-, Kleinbuchstaben sowie Zahlen enthalten"
                />

                <PasswordInput
                  form={form}
                  name="confirmPassword"
                  label="Passwort bestätigen"
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Passwort wird aktualisiert..." : "Passwort aktualisieren"}
                </Button>
              </form>
            </Form>
            <div className="text-sm text-center text-muted-foreground">
              Passwort bereits bekannt?{" "}
              <a href="/signin" className="text-primary hover:underline font-medium">
                Anmelden
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;