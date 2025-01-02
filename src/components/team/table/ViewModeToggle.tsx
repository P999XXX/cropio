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
        variant="ghost"
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className={`${viewMode === "grid" ? "bg-primary/5" : "bg-background"} hover:bg-primary/5 hover:text-foreground w-9 h-9 view-mode-toggle-grid`}
      >
        <Grid3X3 className={`h-4 w-4 ${viewMode !== "grid" ? "opacity-50" : ""} transition-opacity`} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewModeChange("list")}
        className={`${viewMode === "list" ? "bg-primary/5" : "bg-background"} hover:bg-primary/5 hover:text-foreground w-9 h-9 view-mode-toggle-list`}
      >
        <LayoutList className={`h-4 w-4 ${viewMode !== "list" ? "opacity-50" : ""} transition-opacity`} />
      </Button>
    </div>
  );
};