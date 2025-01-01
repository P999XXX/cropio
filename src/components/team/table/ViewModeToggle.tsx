import { Button } from "@/components/ui/button";
import { Grid2X2, List } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
}

export const ViewModeToggle = ({ viewMode, onViewModeChange }: ViewModeToggleProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={viewMode === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("list")}
        className={`h-9 px-2.5 bg-success text-success-foreground hover:bg-success-hover ${
          viewMode === "list" ? "bg-success-hover" : ""
        }`}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className={`h-9 px-2.5 bg-success text-success-foreground hover:bg-success-hover ${
          viewMode === "grid" ? "bg-success-hover" : ""
        }`}
      >
        <Grid2X2 className="h-4 w-4" />
      </Button>
    </div>
  );
};