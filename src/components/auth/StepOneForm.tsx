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
    <Card className="md:min-w-[500px]">
      <CardHeader className="pb-2">
        <CardDescription>
          Choose your account type to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <div className="grid gap-4">
          <Button
            variant="outline"
            onClick={() => onSubmit("buyer")}
            className="h-auto bg-background hover:bg-secondary/10 p-0 overflow-hidden"
          >
            <div className="flex flex-col w-full">
              <div className="relative w-full h-32">
                <img 
                  src="https://images.unsplash.com/photo-1452378174528-3090a4bba7b2"
                  alt="Buyers"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
              </div>
              <div className="p-4 space-y-2">
                <span className="font-semibold">I'm a Buyer</span>
                <p className="text-sm text-muted-foreground">
                  I want to purchase products
                </p>
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            onClick={() => onSubmit("supplier")}
            className="h-auto bg-background hover:bg-secondary/10 p-0 overflow-hidden"
          >
            <div className="flex flex-col w-full">
              <div className="relative w-full h-32">
                <img 
                  src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
                  alt="Suppliers"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
              </div>
              <div className="p-4 space-y-2">
                <span className="font-semibold">I'm a Supplier</span>
                <p className="text-sm text-muted-foreground">
                  I want to sell products
                </p>
              </div>
            </div>
          </Button>
        </div>

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
          onGoogleSignUp={onGoogleSignUp}
          onLinkedInSignUp={onLinkedInSignUp}
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

export default StepOneForm;