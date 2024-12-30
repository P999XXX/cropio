import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import AuthProviders from "./AuthProviders";
import { useIsMobile } from "@/hooks/use-mobile";
import SignUpHeader from "./SignUpHeader";

interface StepOneFormProps {
  onSubmit: (role: "buyer" | "supplier") => void;
  onGoogleSignUp: () => void;
  onLinkedInSignUp: () => void;
}

const StepOneForm = ({ onSubmit, onGoogleSignUp, onLinkedInSignUp }: StepOneFormProps) => {
  const isMobile = useIsMobile();

  const content = (
    <>
      <div className="grid gap-4">
        <Button
          variant="outline"
          onClick={() => onSubmit("buyer")}
          className="h-24 bg-background border-input hover:bg-background hover:border-2 hover:border-primary transition-all"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-foreground">I'm a Buyer</span>
            <span className="text-sm text-muted-foreground">
              I want to purchase products
            </span>
          </div>
        </Button>
        <Button
          variant="outline"
          onClick={() => onSubmit("supplier")}
          className="h-24 bg-background border-input hover:bg-background hover:border-2 hover:border-primary transition-all"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-foreground">I'm a Supplier</span>
            <span className="text-sm text-muted-foreground">
              I want to sell products
            </span>
          </div>
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className={`px-2 text-muted-foreground ${isMobile ? 'bg-background' : 'bg-card'}`}>
            Or continue with
          </span>
        </div>
      </div>

      <AuthProviders
        onGoogleSignUp={onGoogleSignUp}
        onLinkedInSignUp={onLinkedInSignUp}
        variant="signup"
      />
    </>
  );

  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Register for Free</h1>
          <p className="text-[14px] text-muted-foreground flex items-center justify-center gap-2">
            <Leaf className="h-4 w-4" />
            Lets change agri business together!
          </p>
        </div>
        <CardDescription className="text-muted-foreground text-center mb-4">
          Choose your account type to get started
        </CardDescription>
        {content}
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <a href="/signin" className="text-primary hover:underline font-medium">
            Sign in
          </a>
        </div>
      </div>
    );
  }

  return (
    <Card className="md:min-w-[500px]">
      <CardHeader className="pb-2">
        <SignUpHeader />
        <CardDescription>
          Choose your account type to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        {content}
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center w-full text-muted-foreground">
          Already have an account?{" "}
          <a href="/signin" className="text-primary hover:underline font-medium">
            Sign in
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StepOneForm;