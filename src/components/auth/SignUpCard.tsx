import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import SignUpForm, { SignUpFormData } from "./SignUpForm";
import AuthProviders from "./AuthProviders";

interface SignUpCardProps {
  onSubmit: (values: SignUpFormData) => Promise<void>;
  isLoading: boolean;
  onGoogleSignIn: () => void;
  onLinkedInSignIn: () => void;
}

const SignUpCard = ({
  onSubmit,
  isLoading,
  onGoogleSignIn,
  onLinkedInSignIn,
}: SignUpCardProps) => {
  return (
    <Card className="md:min-w-[500px]">
      <CardHeader className="pb-2">
        <CardDescription>
          Create your account to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <SignUpForm 
          onSubmit={onSubmit} 
          isLoading={isLoading} 
        />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <AuthProviders
          onGoogleSignUp={onGoogleSignIn}
          onLinkedInSignUp={onLinkedInSignIn}
          variant="signup"
        />
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

export default SignUpCard;