import { TeamMember } from "@/types/team";
import { TeamTableHeader } from "./table/TeamTableHeader";
import { TeamTable } from "./table/TeamTable";
import { ViewModeToggle } from "./table/ViewModeToggle";
import { TablePagination } from "./table/TablePagination";
import { useTeamTable } from "./hooks/useTeamTable";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileSortDropdown } from "./table/MobileSortDropdown";
import { LoadingState } from "./table/LoadingState";
import { EmptyTeamState } from "./table/EmptyTeamState";
import { TeamMembersGrid } from "./table/TeamMembersGrid";
import { memo } from "react";

interface TeamMembersTableProps {
  teamMembers: TeamMember[];
  isLoading: boolean;
  onInvite: () => void;
}

export const TeamMembersTable = memo(({ teamMembers, isLoading, onInvite }: TeamMembersTableProps) => {
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
    return <LoadingState />;
  }

  const showSortButton = isMobile || viewMode === "grid";
  const hasMembers = teamMembers.length > 0;

  return (
    <div className="space-y-2 team-members-table w-full">
      {hasMembers && (
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between bg-card rounded-lg p-2 shadow-sm w-full">
          <TeamTableHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            roleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            sortConfig={sortConfig}
            onSort={handleSort}
            showSortButton={showSortButton}
          />
          
          {!isMobile && (
            <ViewModeToggle 
              viewMode={viewMode} 
              onViewModeChange={setViewMode}
            />
          )}
        </div>
      )}

      {paginatedMembers.length === 0 ? (
        <EmptyTeamState onInvite={onInvite} />
      ) : !isMobile && viewMode === "list" ? (
        <TeamTable 
          members={paginatedMembers}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      ) : (
        <div className="animate-fade-in">
          <TeamMembersGrid 
            members={paginatedMembers}
            viewMode={viewMode}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
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
});

TeamMembersTable.displayName = "TeamMembersTable";