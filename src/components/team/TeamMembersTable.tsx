import { TeamMember } from "@/types/team";
import { TeamTableHeader } from "./table/TeamTableHeader";
import { TeamCard } from "./card/TeamCard";
import { TeamTable } from "./table/TeamTable";
import { ViewModeToggle } from "./table/ViewModeToggle";
import { TablePagination } from "./table/TablePagination";
import { useTeamTable } from "./hooks/useTeamTable";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileSortDropdown } from "./table/MobileSortDropdown";
import { UserX } from "lucide-react";

interface TeamMembersTableProps {
  teamMembers: TeamMember[];
  isLoading: boolean;
}

export const TeamMembersTable = ({ teamMembers, isLoading }: TeamMembersTableProps) => {
  const isMobile = useIsMobile();
  const {
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    sortConfig,
    handleSort,
    paginatedMembers,
    totalPages,
  } = useTeamTable(teamMembers);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-2 team-members-table w-full">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between bg-card rounded-lg p-2 shadow-sm w-full">
        <TeamTableHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
        />
        
        {!isMobile && (
          <ViewModeToggle 
            viewMode={viewMode} 
            onViewModeChange={setViewMode}
          />
        )}
      </div>

      {isMobile && (
        <div className="px-2">
          <MobileSortDropdown 
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>
      )}

      {paginatedMembers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-card rounded-lg border gap-3">
          <UserX className="h-8 w-8 text-muted-foreground/50" strokeWidth={1.5} />
          <p className="text-muted-foreground text-[0.775rem]">No member found</p>
        </div>
      ) : !isMobile && viewMode === "list" ? (
        <TeamTable 
          members={paginatedMembers}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      ) : (
        <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {paginatedMembers.map((member) => (
            <TeamCard 
              key={member.id} 
              member={member} 
              viewMode={viewMode}
              onSort={handleSort}
              sortConfig={sortConfig}
            />
          ))}
        </div>
      )}

      {paginatedMembers.length > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};