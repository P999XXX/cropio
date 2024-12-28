import { UserX } from "lucide-react";

export const EmptyTeamState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-card rounded-lg border gap-3">
      <UserX className="h-8 w-8 text-muted-foreground/50" strokeWidth={1.5} />
      <p className="text-muted-foreground text-[0.775rem]">No member found</p>
    </div>
  );
};