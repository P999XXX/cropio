import { UserPlus, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyTeamStateProps {
  onInvite: () => void;
}

export const EmptyTeamState = ({ onInvite }: EmptyTeamStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-card rounded-lg border gap-3">
      <UserX className="h-8 w-8 text-muted-foreground/50" strokeWidth={1.5} />
      <p className="text-muted-foreground text-[0.775rem]">No member found</p>
      <Button 
        onClick={onInvite}
        className="flex items-center gap-2 text-[0.775rem] md:h-fit md:py-2"
      >
        <UserPlus className="h-4 w-4" />
        Invite Member
      </Button>
    </div>
  );
};