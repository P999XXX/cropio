import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export const ChatButton = () => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-8 w-8 md:h-9 md:w-9 text-foreground hover:text-foreground hover:bg-secondary/80"
    >
      <MessageSquare className="h-4 w-4" />
      <span className="sr-only">Open chat</span>
    </Button>
  );
};