import { Leaf } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SignUpHeaderProps {
  step?: number;
}

const SignUpHeader = ({ step }: SignUpHeaderProps) => {
  const isMobile = useIsMobile();

  // Hide header on mobile for steps 2-5
  if (isMobile && step && step > 1) {
    return null;
  }

  const alignmentClass = isMobile ? "text-left" : "text-center";

  return (
    <div className={`space-y-2 mb-8 ${alignmentClass}`}>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">Register for Free</h1>
      <p className={`text-[14px] text-muted-foreground flex items-center gap-2 ${isMobile ? "" : "justify-center"}`}>
        <Leaf className="h-4 w-4" />
        Lets change agri business together!
      </p>
    </div>
  );
};

export default SignUpHeader;