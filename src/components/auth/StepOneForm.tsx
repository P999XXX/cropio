import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AuthProviders from "./AuthProviders";

interface StepOneFormProps {
  onSubmit: (role: "buyer" | "supplier") => void;
  onGoogleSignUp: () => void;
  onLinkedInSignUp: () => void;
}

const StepOneForm = ({ onSubmit, onGoogleSignUp, onLinkedInSignUp }: StepOneFormProps) => {
  return (
    <Card className="md:min-w-[500px] bg-card">
      <CardHeader className="pb-2">
        <CardDescription className="text-muted-foreground">
          Choose your account type to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <div className="grid gap-4">
          <Button
            variant="outline"
            onClick={() => onSubmit("buyer")}
            className="h-24 bg-background border-input"
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
            className="h-24 bg-background border-input"
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
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <AuthProviders
          onGoogleSignUp={onGoogleSignUp}
          onLinkedInSignUp={onLinkedInSignUp}
          variant="signup"
        />
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center w-full">
          <span className="text-muted-foreground">Already have an account?</span>{" "}
          <a href="/signin" className="text-primary hover:text-primary/90 font-medium">
            Sign in
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StepOneForm;