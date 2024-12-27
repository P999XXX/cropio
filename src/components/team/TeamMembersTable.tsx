import { useState } from "react";
import { TeamMember } from "@/types/team";
import { TeamTableHeader } from "./table/TeamTableHeader";
import { Grid3X3, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeamCard } from "./card/TeamCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface TeamMembersTableProps {
  teamMembers: TeamMember[];
  isLoading: boolean;
}

export const TeamMembersTable = ({ teamMembers, isLoading }: TeamMembersTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const isMobile = useIsMobile();
  
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TeamMember;
    direction: "asc" | "desc";
  }>({ key: "created_at", direction: "desc" });

  const handleSort = (key: keyof TeamMember) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const filteredAndSortedMembers = teamMembers
    .filter((member) => {
      const searchableEmail = member.status === "accepted" 
        ? member.profile?.email 
        : member.email;
      
      const searchableName = member.status === "accepted"
        ? `${member.profile?.first_name || ''} ${member.profile?.last_name || ''}`
        : '';

      const matchesSearch =
        searchableEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchableName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = roleFilter === "all" || member.role === roleFilter;
      
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 team-members-table">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <TeamTableHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
        />
        
        {!isMobile && (
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="w-8 h-8"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="w-8 h-8"
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className={`grid gap-4 ${
        viewMode === "grid" 
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
          : "grid-cols-1"
      }`}>
        {filteredAndSortedMembers.map((member) => (
          <TeamCard 
            key={member.id} 
            member={member} 
            viewMode={viewMode}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        ))}
      </div>
    </div>
  );
};