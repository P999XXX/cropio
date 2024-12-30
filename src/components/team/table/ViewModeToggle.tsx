import { Button } from "@/components/ui/button";
import { Grid3X3, LayoutList } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export const ViewModeToggle = ({ viewMode, onViewModeChange }: ViewModeToggleProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={viewMode === "grid" ? "secondary" : "outline"}
        size="icon"
        onClick={() => onViewModeChange("grid")}
        className="w-8 h-8 border-secondary hover:bg-secondary/10 hover:text-foreground"
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "list" ? "secondary" : "outline"}
        size="icon"
        onClick={() => onViewModeChange("list")}
        className="w-8 h-8 border-secondary hover:bg-secondary/10 hover:text-foreground"
      >
        <LayoutList className="h-4 w-4" />
      </Button>
    </div>
  );
};