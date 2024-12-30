import { Leaf } from "lucide-react";

const SignUpHeader = () => {
  return (
    <div className="space-y-2 text-center mb-8">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Register for Free</h1>
      <p className="text-[14px] text-muted-foreground flex items-center justify-center gap-2">
        <Leaf className="h-4 w-4" />
        Lets change agri business together!
      </p>
    </div>
  );
};

export default SignUpHeader;