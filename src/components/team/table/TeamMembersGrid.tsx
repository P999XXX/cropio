import { TeamMember } from "@/types/team";
import { TeamCard } from "../card/TeamCard";

interface TeamMembersGridProps {
  members: TeamMember[];
  viewMode: "grid" | "list";
  sortConfig: {
    key: keyof TeamMember;
    direction: "asc" | "desc";
  };
  onSort: (key: keyof TeamMember) => void;
}

export const TeamMembersGrid = ({ 
  members,
  onSort 
}: TeamMembersGridProps) => {
  return (
    <div className="grid gap-1 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full">
      {members.map((member) => (
        <TeamCard 
          key={member.id} 
          member={member}
          onInvite={() => {}} // Pass empty function since it's required by TeamCard
        />
      ))}
    </div>
  );
};