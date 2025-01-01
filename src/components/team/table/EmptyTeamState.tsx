import { UserPlus, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyTeamStateProps {
  onInvite: () => void;
}

export const EmptyTeamState = ({ onInvite }: EmptyTeamStateProps) => {
  return (
    <Card className="flex flex-col items-center justify-center h-64 gap-3 border-dashed">
      <UserX className="h-8 w-8 text-muted-foreground/50" strokeWidth={1.5} />
      <p className="text-muted-foreground text-[0.775rem]">No member found</p>
      <Button 
        onClick={onInvite}
        variant="outline"
        className="flex items-center gap-2 text-[0.775rem]"
      >
        <UserPlus className="h-4 w-4" />
        Invite Member
      </Button>
    </Card>
  );
};