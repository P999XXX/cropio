import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CartButton = () => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-8 w-8 md:h-9 md:w-9 text-foreground hover:text-foreground hover:bg-secondary/80"
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="sr-only">Shopping cart</span>
    </Button>
  );
};