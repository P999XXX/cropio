import { Leaf } from "lucide-react";

const SignUpHeader = () => {
  return (
    <div className="flex items-center gap-0.5 md:justify-center justify-start">
      <Leaf className="h-3.5 w-3.5 text-muted-foreground" />
      <h1 className="text-base font-medium text-muted-foreground">
        Let's change agri business together!
      </h1>
    </div>
  );
};

export default SignUpHeader;