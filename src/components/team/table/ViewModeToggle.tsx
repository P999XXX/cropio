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
        variant="outline"
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className={`${viewMode === "grid" ? "bg-secondary/10" : "bg-background"} border-secondary hover:bg-secondary/10 hover:text-foreground w-9 h-9`}
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onViewModeChange("list")}
        className={`${viewMode === "list" ? "bg-secondary/10" : "bg-background"} border-secondary hover:bg-secondary/10 hover:text-foreground w-9 h-9`}
      >
        <LayoutList className="h-4 w-4" />
      </Button>
    </div>
  );
};