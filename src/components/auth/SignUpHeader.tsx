import { Leaf } from "lucide-react";

const SignUpHeader = () => {
  return (
    <div className="flex items-center gap-1 md:justify-center justify-start">
      <Leaf className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
      <h1 className="text-base md:text-xl font-medium text-muted-foreground">
        Let's change agri business together!
      </h1>
    </div>
  );
};

export default SignUpHeader;