import { Button } from "@/components/ui/button";
import { Grid3X3, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewModeToggleProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export const ViewModeToggle = ({ viewMode, onViewModeChange }: ViewModeToggleProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className={cn(
          "w-9 h-9",
          viewMode === "grid" && "bg-primary/5 border-primary/30"
        )}
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onViewModeChange("list")}
        className={cn(
          "w-9 h-9",
          viewMode === "list" && "bg-primary/5 border-primary/30"
        )}
      >
        <LayoutList className="h-4 w-4" />
      </Button>
    </div>
  );
};