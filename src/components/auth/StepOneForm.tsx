import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface StepOneFormProps {
  onSubmit: (role: "buyer" | "supplier") => void;
}

const StepOneForm = ({ onSubmit }: StepOneFormProps) => {
  const isMobile = useIsMobile();

  const content = (
    <div className="grid gap-4">
      <Button
        variant="outline"
        onClick={() => onSubmit("buyer")}
        className="h-28 px-6 bg-background border-input hover:bg-background hover:border-2 hover:border-primary transition-all"
      >
        <div className="flex flex-col items-center gap-2">
          <img 
            src="/lovable-uploads/977f591c-307c-470a-a365-6a048c8b3e26.png" 
            alt="Buyer Icon" 
            className="h-10 w-10 mb-1 object-contain"
          />
          <span className="font-semibold text-foreground">I'm a Buyer</span>
        </div>
      </Button>
      <Button
        variant="outline"
        onClick={() => onSubmit("supplier")}
        className="h-28 px-6 bg-background border-input hover:bg-background hover:border-2 hover:border-primary transition-all"
      >
        <div className="flex flex-col items-center gap-2">
          <img 
            src="/lovable-uploads/0aaa1e70-1712-4d31-a2b1-af6c7d6d14df.png" 
            alt="Supplier Icon" 
            className="h-10 w-10 mb-1 object-contain"
          />
          <span className="font-semibold text-foreground">I'm a Supplier</span>
        </div>
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <div className="space-y-4 pt-8">
        <h3 className="text-lg font-semibold mb-4">Choose Your Account Type</h3>
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
    <Card className="md:min-w-[500px] mt-8">
      <CardHeader>
        <h3 className="text-lg font-semibold mb-4 text-left md:text-center">Choose Your Account Type</h3>
      </CardHeader>
      <CardContent className="space-y-4">
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