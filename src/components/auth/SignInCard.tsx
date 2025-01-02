import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import SignInForm, { SignInFormData } from "./SignInForm";

interface SignInCardProps {
  onSubmit: (values: SignInFormData) => Promise<void>;
  isLoading: boolean;
  onGoogleSignIn: () => void;
  onLinkedInSignIn: () => void;
  onForgotPassword: () => void;
}

const SignInCard = ({
  onSubmit,
  isLoading,
  onForgotPassword,
}: SignInCardProps) => {
  return (
    <Card className="md:min-w-[500px] md:bg-white">
      <CardHeader className="pb-2">
        <CardDescription>
          Enter your email and password to sign in
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <SignInForm 
          onSubmit={onSubmit} 
          isLoading={isLoading} 
          onForgotPassword={onForgotPassword}
        />
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center w-full text-muted-foreground">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary hover:underline font-medium">
            Sign up
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignInCard;